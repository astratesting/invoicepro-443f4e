import { BarChart3, FileCheck2, Link2, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';

const features = [
  { icon: FileCheck2, title: 'Invoice OCR preview', text: 'Upload PDF or image invoices and review extracted vendor, due date, line items, and amount before approval.' },
  { icon: TrendingUp, title: 'Cash flow forecast', text: 'See receivables, payables, runway, and month-end cash position from real-time invoice activity.' },
  { icon: Sparkles, title: 'AI anomaly detection', text: 'Simulated ML flags duplicate vendors, unusual amounts, late-payment risk, and sudden spend spikes.' },
  { icon: Link2, title: 'QuickBooks + Xero', text: 'Demo OAuth connection flow syncs accounting status and keeps finance teams in one workspace.' }
];

const pricing = [
  { name: 'Free Trial', price: '$0', detail: '14 days', cta: 'Start trial', perks: ['50 invoices', 'OCR preview', 'Forecast dashboard'] },
  { name: 'Pro', price: '$49', detail: '/mo', cta: 'Choose Pro', perks: ['500 invoices/mo', 'AI anomaly detection', 'QuickBooks and Xero demo sync'] },
  { name: 'Enterprise', price: 'Custom', detail: 'volume pricing', cta: 'Contact sales', perks: ['Unlimited teams', 'Custom invoice limits', 'Priority onboarding'] }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="grid-bg overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">Built for SMB accounting managers</div>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-ink md:text-6xl">Automate invoice intake and forecast cash before surprises hit.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">InvoicePro turns uploaded invoices into structured data, highlights anomalies, and shows future cash flow in one finance dashboard. Demo-ready Clerk auth, simulated OCR, simulated ML, and accounting OAuth flow included.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/sign-up" className="rounded-full bg-brand-600 px-6 py-3 text-center font-semibold text-white shadow-soft hover:bg-brand-700">Start 14-day free trial</a>
              <a href="/dashboard" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-slate-800 hover:border-brand-500">View live dashboard</a>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div><p className="text-sm font-semibold text-slate-500">Projected cash</p><p className="text-3xl font-black text-ink">$284,900</p></div>
              <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">+18% runway</div>
            </div>
            <div className="mt-6 h-56 rounded-2xl bg-gradient-to-br from-brand-50 to-white p-4">
              <div className="flex h-full items-end gap-3">
                {[44, 58, 52, 77, 70, 88, 82].map((height, index) => <div key={index} className="flex-1 rounded-t-xl bg-brand-500" style={{ height: `${height}%` }} />)}
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3"><ShieldCheck className="text-amber-600" /><div><p className="font-bold text-amber-900">Anomaly found</p><p className="text-sm text-amber-800">Vendor Atlas Supply invoice is 2.7x higher than 90-day average.</p></div></div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between gap-6"><div><p className="font-bold text-brand-600">Core workflow</p><h2 className="text-3xl font-black text-ink">From invoice upload to board-ready forecast.</h2></div><BarChart3 className="hidden text-brand-600 md:block" size={42} /></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{features.map((feature) => <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><feature.icon className="mb-4 text-brand-600" /><h3 className="font-bold text-ink">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p></div>)}</div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 text-center"><p className="font-bold text-brand-600">Pricing</p><h2 className="text-3xl font-black text-ink">Start lean, scale invoice volume.</h2></div>
        <div className="grid gap-6 lg:grid-cols-3">{pricing.map((plan) => <div key={plan.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><h3 className="text-xl font-black text-ink">{plan.name}</h3><div className="mt-4 flex items-end gap-2"><span className="text-4xl font-black">{plan.price}</span><span className="pb-1 text-slate-500">{plan.detail}</span></div><a href="/sign-up" className="mt-6 block rounded-full bg-ink px-5 py-3 text-center font-semibold text-white">{plan.cta}</a><ul className="mt-6 space-y-3 text-sm text-slate-600">{plan.perks.map((perk) => <li key={perk}>• {perk}</li>)}</ul></div>)}</div>
      </section>
    </main>
  );
}
