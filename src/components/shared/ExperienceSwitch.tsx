'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Variant = 'retro' | 'pro';

export default function ExperienceSwitch({ variant }: { variant: Variant }) {
  const router = useRouter();
  const target: Variant = variant === 'retro' ? 'pro' : 'retro';
  const label = target === 'retro' ? 'retro console' : 'editorial';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    try { localStorage.setItem('mbb.experience', target); } catch {}
    router.push(`/${target}/`);
  };

  return (
    <Link
      href={`/${target}/`}
      onClick={handleClick}
      className={`xp-switch xp-switch-${variant}`}
      aria-label={`Switch to ${label} experience`}
    >
      <span className="xp-switch-icon" aria-hidden>▸</span>
      <span className="xp-switch-short">{target}</span>
      <span className="xp-switch-full">switch to {label}</span>
    </Link>
  );
}
