'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--background-secondary)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-3">About This App</h3>
            <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">
              Overlord: Gerry&apos;s Study Room is an interactive learning platform designed
              to help you explore the history of D-Day and the Normandy Campaign through
              structured modules, interactive timelines, flashcards, and quizzes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/start-here" className="text-[var(--foreground-muted)] hover:text-[var(--accent-gold)] transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/modules" className="text-[var(--foreground-muted)] hover:text-[var(--accent-gold)] transition-colors">
                  All Modules
                </Link>
              </li>
              <li>
                <Link href="/visit-normandy" className="text-[var(--foreground-muted)] hover:text-[var(--accent-gold)] transition-colors">
                  Visit Normandy
                </Link>
              </li>
              <li>
                <Link href="/sources" className="text-[var(--foreground-muted)] hover:text-[var(--accent-gold)] transition-colors">
                  Sources & Credits
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.iwm.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground-muted)] hover:text-[var(--accent-gold)] transition-colors"
                >
                  Imperial War Museums
                </a>
              </li>
              <li>
                <a
                  href="https://www.memorial-caen.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground-muted)] hover:text-[var(--accent-gold)] transition-colors"
                >
                  Mémorial de Caen
                </a>
              </li>
              <li>
                <a
                  href="https://www.dday-overlord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground-muted)] hover:text-[var(--accent-gold)] transition-colors"
                >
                  D-Day Overlord
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--foreground-muted)]">
            Content compiled from public domain sources. Not for commercial use.
          </p>
          <p className="text-xs text-[var(--foreground-muted)] italic">
            Built for Gerry, with love of history (and a little AI mischief).
          </p>
        </div>
      </div>
    </footer>
  );
}
