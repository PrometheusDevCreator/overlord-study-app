'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from '@/lib/progress-context';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/start-here', label: 'Start Here' },
  { href: '/modules', label: 'Modules' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/maps', label: 'Map Room' },
  { href: '/museum', label: 'Museum' },
  { href: '/videos', label: 'Videos' },
  { href: '/flashcards', label: 'Flashcards' },
  { href: '/quizzes', label: 'Quizzes' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/sources', label: 'Sources' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { progress, toggleFrenchPerspective, getTotalProgress } = useProgress();

  return (
    <header className="sticky top-0 z-50 bg-[var(--background-secondary)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar with logo and settings */}
        <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent-olive)] flex items-center justify-center text-xl font-bold text-[var(--background)]">
              O
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight group-hover:text-[var(--accent-gold)] transition-colors">
                Overlord
              </h1>
              <p className="text-xs text-[var(--foreground-muted)]">Gerry&apos;s Study Room</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Progress indicator */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs text-[var(--foreground-muted)]">Progress</span>
              <div className="w-24 progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${getTotalProgress()}%` }}
                />
              </div>
              <span className="text-xs font-medium">{getTotalProgress()}%</span>
            </div>

            {/* French perspective toggle */}
            <button
              onClick={toggleFrenchPerspective}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                progress.frenchPerspectiveEnabled
                  ? 'bg-blue-900/30 border border-blue-500 text-blue-300'
                  : 'bg-[var(--background)] border border-[var(--border)] text-[var(--foreground-muted)] hover:border-blue-500'
              }`}
              title="Toggle French Perspective highlights"
            >
              French Perspective
              {/* French tricolor flag */}
              <span className="flex h-3 w-5 rounded-sm overflow-hidden border border-white/20">
                <span className="w-1/3 bg-[#0055a4]" />
                <span className="w-1/3 bg-white" />
                <span className="w-1/3 bg-[#ef4135]" />
              </span>
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
          {navItems.map(item => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] border border-[var(--accent-gold)]/30'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
