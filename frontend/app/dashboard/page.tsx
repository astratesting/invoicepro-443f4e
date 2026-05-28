import { AlertTriangle, ArrowUpRight, CalendarDays, DollarSign, FileCheck2, Link2, UploadCloud } from 'lucide-react';

const forecast = [
  { month: 'Jun', inflow: 98000, outflow: 73000 },
  { month: 'Jul', inflow: 121000, outflow: 84000 },
  { month: 'Aug', inflow: 116000, outflow: 91000 },
  { month: 'Sep', inflow: 143000, outflow: 94000 }
];

const anomalies = [
  { severity: 'High', title: 'Atlas Supply invoice spike', detail: '$18,420 exceeds vendor baseline by 2.7x' },
  { severity: 'Medium', title: 'Duplicate invoice risk', detail: 'INV-1048 matches Acme Cloud amount and due date' },
  { severity: 'Low', title: 'Late collection forecast', detail: 'Northstar Labs likely 9 days past terms' }
];

const invoices = [
  { vendor: 'Atlas Supply', amount: '$18,420', status: 'Review', due: 'Jun 12' },
  { vendor: 'Acme Cloud', amount: '$4,900', status: 'Approved', due: 'Jun 18' },
  { vendor: 'Northstar Labs', amount: '$7,250', status: 'Pending', due: 'Jun 21' }
];

export default function DashboardPage() {
  const monthEndCash = forecast.reduce((cash, row) => cash + row.inflow - row.outflow, 196000);

  return (
    <main>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><p className="font-bold text-brand-600">Finance command center</p><h1 className="text-4xl font-black tracking-tight text-ink">Cash flow forecasting dashboard</h1><p className="mt-2 text-slate-600">Simulated real-time invoice activity, OCR pipeline status, and ML anomaly detection.</p></div>
        <a href="/dashboard/upload" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 font-semibold text-white shadow-soft"><UploadCloud size={18} /> Upload invoice</a>
      </div>
      <section className="grid gap-5 md:grid-cols-4">
        {[{ label: 'Month-end cash', value: `$${monthEndCash.toLocaleString()}`, icon: DollarSign }, { label: 'Invoices processed', value: '428 / 500', icon: FileCheck2 }, { label: 'Average days payable', value: '31.4', icon: CalendarDays }, { label: 'Connected ledgers', value: '2', icon: Link2 }].map((metric) => <div key={metric.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><metric.icon className="mb-4 text-brand-600" /><p className="text-sm font-semibold text-slate-500">{metric.label}</p><p className="mt-2 text-2xl font-black text-ink">{metric.value}</p></div>)}
      </section>
      <section className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-black text-ink">90-day cash forecast</h2><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">Positive runway</span></div>
          <div className="grid h-80 grid-cols-4 items-end gap-5 border-b border-slate-200 pb-4">
            {forecast.map((row) => <div key={row.month} className="flex h-full flex-col justify-end gap-2"><div className="rounded-t-xl bg-brand-500" style={{ height: `${row.inflow / 1600}px` }} /><div className="rounded-t-xl bg-slate-300" style={{ height: `${row.outflow / 1600}px` }} /><p className="text-center text-sm font-bold text-slate-500">{row.month}</p></div>)}
          </div>
          <div className="mt-4 flex gap-6 text-sm text-slate-600"><span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded bg-brand-500" /> Inflow</span><span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded bg-slate-300" /> Outflow</span></div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-ink">AI anomaly detection</h2>
          <div className="mt-5 space-y-4">{anomalies.map((item) => <div key={item.title} className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><div className="flex gap-3"><AlertTriangle className="mt-1 text-amber-600" size={18} /><div><p className="text-xs font-black uppercase tracking-wide text-amber-700">{item.severity}</p><p className="font-bold text-amber-950">{item.title}</p><p className="text-sm text-amber-800">{item.detail}</p></div></div></div>)}</div>
        </div>
      </section>
      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-black text-ink">Recent invoices</h2><a href="/dashboard/upload" className="inline-flex items-center gap-1 text-sm font-bold text-brand-600">Process more <ArrowUpRight size={14} /></a></div>
        <div className="overflow-hidden rounded-2xl border border-slate-200">{invoices.map((invoice) => <div key={invoice.vendor} className="grid grid-cols-4 border-b border-slate-100 px-4 py-3 last:border-b-0"><span className="font-semibold">{invoice.vendor}</span><span>{invoice.amount}</span><span>{invoice.status}</span><span>{invoice.due}</span></div>)}</div>
      </section>
    </main>
  );
}
