'use client';
import Link from 'next/link';
import { IDENTITY } from '@/lib/data';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="pro-footer">
      <span>© {year} · {IDENTITY.name.toLowerCase()} · Dakar</span>
      <Link href="/?reset=1" className="pro-footer-back">back to portal →</Link>
    </footer>
  );
}
