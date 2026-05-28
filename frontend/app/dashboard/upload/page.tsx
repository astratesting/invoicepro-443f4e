'use client';

import { useState } from 'react';
import { CheckCircle2, UploadCloud } from 'lucide-react';

const sample = {
  vendor: 'Atlas Supply Co.',
  invoiceNumber: 'INV-2048',
  amount: '$18,420.00',
  dueDate: '2026-06-12',
  confidence: '96%',
  lineItems: ['Steel office shelving — $7,900', 'Warehouse labels — $1,120', 'Distribution equipment — $9,400']
};

export default function UploadPage() {
  const [processed, setProcessed] = useState(false);

  return (
    <main className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-3xl border border-dashed border-brand-200 bg-white p-8 shadow-sm">
        <UploadCloud className="text-brand-600" size={40} />
        <h1 className="mt-5 text-3xl font-black text-ink">Upload invoice</h1>
        <p className="mt-3 text-slate-600">Drop a PDF, PNG, or JPG invoice. Demo engine simulates OCR extraction and sends structured data to review.</p>
        <label className="mt-8 block rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
          <input type="file" className="sr-only" onChange={() => setProcessed(true)} accept=".pdf,.png,.jpg,.jpeg" />
          <span className="font-bold text-brand-600">Choose invoice file</span>
          <span className="mt-2 block text-sm text-slate-500">Simulated OCR runs locally for demo</span>
        </label>
        <button onClick={() => setProcessed(true)} className="mt-5 w-full rounded-full bg-brand-600 px-5 py-3 font-semibold text-white">Run simulated OCR</button>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between"><h2 className="text-2xl font-black text-ink">OCR preview</h2>{processed && <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700"><CheckCircle2 size={16} /> Extracted</span>}</div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">{Object.entries(sample).slice(0, 5).map(([key, value]) => <div key={key} className="rounded-2xl border border-slate-200 p-4"><p className="text-xs font-black uppercase tracking-wide text-slate-400">{key}</p><p className="mt-1 font-bold text-ink">{value as string}</p></div>)}</div>
        <div className="mt-5 rounded-2xl border border-slate-200 p-4"><p className="text-xs font-black uppercase tracking-wide text-slate-400">Line items</p><ul className="mt-3 space-y-2 text-sm text-slate-700">{sample.lineItems.map((item) => <li key={item}>• {item}</li>)}</ul></div>
        <button className="mt-6 rounded-full bg-ink px-5 py-3 font-semibold text-white">Approve and save invoice</button>
      </section>
    </main>
  );
}
