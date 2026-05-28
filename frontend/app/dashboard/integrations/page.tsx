'use client';

import { useState } from 'react';
import { CheckCircle2, Link2 } from 'lucide-react';

const providers = [
  { name: 'QuickBooks', detail: 'Sync customers, vendors, and invoice status through simulated OAuth.' },
  { name: 'Xero', detail: 'Connect company ledger and mark approved invoices for export.' }
];

export default function IntegrationsPage() {
  const [connected, setConnected] = useState<string[]>(['QuickBooks']);

  function toggle(provider: string) {
    setConnected((current) => current.includes(provider) ? current.filter((item) => item !== provider) : [...current, provider]);
  }

  return (
    <main>
      <h1 className="text-4xl font-black text-ink">Accounting integrations</h1>
      <p className="mt-2 text-slate-600">Simulated OAuth flow for QuickBooks and Xero. MVP-ready connection states without moving live accounting data.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {providers.map((provider) => {
          const isConnected = connected.includes(provider.name);
          return <div key={provider.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="rounded-2xl bg-brand-50 p-3 text-brand-600"><Link2 /></span><h2 className="text-2xl font-black text-ink">{provider.name}</h2></div>{isConnected && <CheckCircle2 className="text-emerald-600" />}</div><p className="mt-5 text-slate-600">{provider.detail}</p><div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Status: <span className="font-bold text-ink">{isConnected ? 'Connected to demo company' : 'Disconnected'}</span></div><button onClick={() => toggle(provider.name)} className="mt-6 rounded-full bg-brand-600 px-5 py-3 font-semibold text-white">{isConnected ? 'Disconnect' : `Connect ${provider.name}`}</button></div>;
        })}
      </div>
    </main>
  );
}
