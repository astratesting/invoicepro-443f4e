import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { FileText } from 'lucide-react';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/upload', label: 'Upload' },
  { href: '/dashboard/integrations', label: 'Integrations' },
  { href: '/dashboard/settings', label: 'Settings' }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-ink">
          <span className="rounded-xl bg-brand-600 p-2 text-white"><FileText size={20} /></span>
          InvoicePro
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-600">{link.label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <SignedOut>
            <Link href="/sign-in" className="text-sm font-semibold text-slate-700">Sign in</Link>
            <Link href="/sign-up" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft">Start trial</Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
