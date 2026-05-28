from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    password_hash = Column(String(255), nullable=False)
    plan = Column(String(50), default="Free Trial")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    invoices = relationship("Invoice", back_populates="owner")


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    vendor = Column(String(255), nullable=False)
    amount = Column(Float, nullable=False)
    due_date = Column(String(50), nullable=False)
    status = Column(String(50), default="extracted")
    ocr_text = Column(Text, nullable=False)
    anomaly_score = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="invoices")


class Integration(Base):
    __tablename__ = "integrations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    provider = Column(String(50), nullable=False)
    status = Column(String(50), default="disconnected")
    external_company = Column(String(255), nullable=True)
    connected_at = Column(DateTime(timezone=True), nullable=True)


class Analytics(Base):
    __tablename__ = "analytics"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    period = Column(String(50), nullable=False)
    inflow = Column(Float, nullable=False)
    outflow = Column(Float, nullable=False)
    projected_cash = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
