import { UserProfile } from '@clerk/nextjs';

export default function SettingsPage() {
  return (
    <main>
      <div className="mb-8"><h1 className="text-4xl font-black text-ink">Settings and profile</h1><p className="mt-2 text-slate-600">Manage account, plan, profile, and invoice limits.</p></div>
      <section className="mb-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm font-semibold text-slate-500">Current plan</p><p className="mt-2 text-2xl font-black text-ink">Pro</p><p className="mt-2 text-sm text-slate-600">500 invoices per month</p></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm font-semibold text-slate-500">Usage</p><p className="mt-2 text-2xl font-black text-ink">428 / 500</p><p className="mt-2 text-sm text-slate-600">Resets Jun 30</p></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm font-semibold text-slate-500">Trial status</p><p className="mt-2 text-2xl font-black text-ink">Active</p><p className="mt-2 text-sm text-slate-600">Upgrade anytime</p></div>
      </section>
      <UserProfile />
    </main>
  );
}
