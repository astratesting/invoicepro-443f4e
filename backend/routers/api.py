from datetime import datetime
from random import random

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db
from models import Analytics, Integration, Invoice, User

router = APIRouter(prefix="/api", tags=["invoicepro"])


class InvoiceCreate(BaseModel):
    vendor: str
    amount: float
    due_date: str
    user_id: int = 1


class IntegrationConnect(BaseModel):
    provider: str
    user_id: int = 1


def ensure_demo_user(db: Session) -> User:
    user = db.query(User).filter(User.id == 1).first()
    if user:
        return user
    user = User(id=1, email="demo@invoicepro.com", name="Demo Finance Lead", password_hash="demo", plan="Pro")
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def simulate_ocr(invoice: InvoiceCreate) -> dict:
    anomaly_score = min(0.98, max(0.08, invoice.amount / 25000 + random() * 0.12))
    return {
        "vendor": invoice.vendor,
        "amount": invoice.amount,
        "due_date": invoice.due_date,
        "ocr_text": f"Extracted invoice for {invoice.vendor}; amount ${invoice.amount:,.2f}; due {invoice.due_date}",
        "anomaly_score": round(anomaly_score, 2),
        "flags": ["amount-spike"] if anomaly_score > 0.75 else []
    }


@router.get("/health")
def health():
    return {"status": "ok", "service": "invoicepro-api"}


@router.get("/invoices")
def list_invoices(db: Session = Depends(get_db)):
    ensure_demo_user(db)
    invoices = db.query(Invoice).order_by(Invoice.created_at.desc()).all()
    return invoices


@router.post("/invoices")
def create_invoice(payload: InvoiceCreate, db: Session = Depends(get_db)):
    ensure_demo_user(db)
    extracted = simulate_ocr(payload)
    invoice = Invoice(user_id=payload.user_id, status="extracted", **extracted)
    db.add(invoice)
    db.commit()
    db.refresh(invoice)
    return {"invoice": invoice, "ocr_preview": extracted}


@router.delete("/invoices/{invoice_id}")
def delete_invoice(invoice_id: int, db: Session = Depends(get_db)):
    invoice = db.query(Invoice).filter(Invoice.id == invoice_id).first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    db.delete(invoice)
    db.commit()
    return {"deleted": invoice_id}


@router.get("/forecast")
def forecast(db: Session = Depends(get_db)):
    ensure_demo_user(db)
    rows = [
        {"period": "Jun", "inflow": 98000, "outflow": 73000},
        {"period": "Jul", "inflow": 121000, "outflow": 84000},
        {"period": "Aug", "inflow": 116000, "outflow": 91000},
        {"period": "Sep", "inflow": 143000, "outflow": 94000},
    ]
    cash = 196000
    enriched = []
    for row in rows:
        cash += row["inflow"] - row["outflow"]
        enriched.append({**row, "projected_cash": cash})
    return {"starting_cash": 196000, "forecast": enriched, "month_end_cash": cash}


@router.get("/anomalies")
def anomalies():
    return [
        {"severity": "high", "type": "amount-spike", "message": "Atlas Supply invoice is 2.7x above vendor baseline", "confidence": 0.91},
        {"severity": "medium", "type": "duplicate-risk", "message": "Acme Cloud invoice matches amount and due date of prior record", "confidence": 0.77},
        {"severity": "low", "type": "late-payment", "message": "Northstar Labs likely pays 9 days past terms", "confidence": 0.68},
    ]


@router.get("/integrations")
def integrations(db: Session = Depends(get_db)):
    ensure_demo_user(db)
    existing = db.query(Integration).all()
    if existing:
        return existing
    defaults = [Integration(user_id=1, provider="QuickBooks", status="connected", external_company="InvoicePro Demo LLC", connected_at=datetime.utcnow()), Integration(user_id=1, provider="Xero", status="disconnected")]
    db.add_all(defaults)
    db.commit()
    return db.query(Integration).all()


@router.post("/integrations/connect")
def connect_integration(payload: IntegrationConnect, db: Session = Depends(get_db)):
    ensure_demo_user(db)
    provider = payload.provider.lower()
    if provider not in {"quickbooks", "xero"}:
        raise HTTPException(status_code=400, detail="Provider must be QuickBooks or Xero")
    integration = db.query(Integration).filter(Integration.provider.ilike(payload.provider)).first()
    if not integration:
        integration = Integration(user_id=payload.user_id, provider=payload.provider)
        db.add(integration)
    integration.status = "connected"
    integration.external_company = "InvoicePro Demo LLC"
    integration.connected_at = datetime.utcnow()
    db.commit()
    db.refresh(integration)
    return {"oauth_url": f"https://oauth.example/{provider}/authorize", "integration": integration}


@router.get("/analytics")
def analytics(db: Session = Depends(get_db)):
    ensure_demo_user(db)
    rows = db.query(Analytics).all()
    if not rows:
        rows = [Analytics(user_id=1, period="2026-Q2", inflow=336000, outflow=248000, projected_cash=284000)]
        db.add_all(rows)
        db.commit()
    return {"invoice_limit": 500, "invoices_processed": 428, "plan": "Pro", "rows": db.query(Analytics).all()}
