'use client';

import Link from 'next/link';
import { useProgress } from '@/lib/progress-context';
import { modules, learningPaths } from '@/lib/content-loader';

export default function HomePage() {
  const { progress, getTotalProgress, getModuleProgress } = useProgress();

  const recentModules = modules.slice(0, 3);
  const featuredPath = learningPaths.find(p => p.id === 'quick-tour');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-[var(--background-secondary)] to-[var(--background)]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30">
            <span className="text-[var(--accent-gold)] text-sm font-medium">
              Interactive D-Day Study Experience
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Operation <span className="text-[var(--accent-gold)]">Overlord</span>
            <br />
            <span className="text-2xl md:text-3xl font-normal text-[var(--foreground-muted)]">
              Gerry&apos;s Study Room
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto mb-8 leading-relaxed">
            Explore the largest amphibious invasion in history through structured lessons,
            interactive timelines, detailed maps, and engaging quizzes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/start-here" className="btn-primary text-lg px-8 py-3">
              Start Learning
            </Link>
            <Link href="/modules" className="btn-secondary text-lg px-8 py-3">
              Browse Modules
            </Link>
          </div>
        </div>

        {/* Decorative timeline preview */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-between text-xs text-[var(--foreground-muted)] mb-2">
            <span>June 6, 1944</span>
            <span>August 25, 1944</span>
          </div>
          <div className="h-2 bg-[var(--background-secondary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent-olive)] via-[var(--accent-gold)] to-[var(--accent-olive)]"
              style={{ width: '100%' }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-[var(--foreground-muted)]">
            <span>D-Day</span>
            <span>Normandy Campaign</span>
            <span>Liberation of Paris</span>
          </div>
        </div>
      </section>

      {/* Progress Section (only show if user has started) */}
      {getTotalProgress() > 0 && (
        <section className="py-12 px-4 bg-[var(--background-secondary)] border-y border-[var(--border)]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6">
                <div className="text-3xl font-bold text-[var(--accent-gold)]">
                  {getTotalProgress()}%
                </div>
                <div className="text-sm text-[var(--foreground-muted)]">Overall Complete</div>
                <div className="mt-3 progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${getTotalProgress()}%` }} />
                </div>
              </div>
              <div className="card p-6">
                <div className="text-3xl font-bold text-[var(--accent-gold)]">
                  {progress.modulesCompleted.length}
                </div>
                <div className="text-sm text-[var(--foreground-muted)]">Modules Completed</div>
              </div>
              <div className="card p-6">
                <div className="text-3xl font-bold text-[var(--accent-gold)]">
                  {progress.quizAttempts.length}
                </div>
                <div className="text-sm text-[var(--foreground-muted)]">Quizzes Taken</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Learning Path */}
      {featuredPath && (
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Recommended Path</h2>
            <div className="card p-6 md:p-8 border-[var(--accent-gold)]/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="badge badge-command mb-2">Featured</span>
                  <h3 className="text-xl font-bold mb-2">{featuredPath.name}</h3>
                  <p className="text-[var(--foreground-muted)]">{featuredPath.description}</p>
                  <p className="text-sm text-[var(--foreground-muted)] mt-2">
                    Estimated time: {featuredPath.estimatedTime}
                  </p>
                </div>
                <Link href="/start-here" className="btn-primary whitespace-nowrap">
                  Start This Path
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Module Preview */}
      <section className="py-12 px-4 bg-[var(--background-secondary)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Study Modules</h2>
            <Link href="/modules" className="text-[var(--accent-gold)] hover:underline">
              View all {modules.length} modules →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentModules.map(module => (
              <Link key={module.id} href={`/modules/${module.id}`} className="card p-6 group">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-[var(--accent-gold)]/20 flex items-center justify-center text-[var(--accent-gold)] font-bold">
                    {module.number}
                  </span>
                  <span className="text-xs text-[var(--foreground-muted)]">{module.estimatedTime}</span>
                </div>
                <h3 className="font-bold mb-2 group-hover:text-[var(--accent-gold)] transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-[var(--foreground-muted)] line-clamp-2">
                  {module.subtitle}
                </p>
                {getModuleProgress(module.id) > 0 && (
                  <div className="mt-4">
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${getModuleProgress(module.id)}%` }} />
                    </div>
                    <span className="text-xs text-[var(--foreground-muted)]">{getModuleProgress(module.id)}% complete</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Study Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/timeline" className="card p-6 text-center group hover:border-[var(--accent-gold)]/50">
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-[var(--accent-gold)]/10 flex items-center justify-center text-[var(--accent-gold)] font-bold text-lg">T</div>
              <h3 className="font-bold mb-1 group-hover:text-[var(--accent-gold)]">Timeline</h3>
              <p className="text-xs text-[var(--foreground-muted)]">40+ key events</p>
            </Link>
            <Link href="/maps" className="card p-6 text-center group hover:border-[var(--accent-gold)]/50">
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-[var(--accent-gold)]/10 flex items-center justify-center text-[var(--accent-gold)] font-bold text-lg">M</div>
              <h3 className="font-bold mb-1 group-hover:text-[var(--accent-gold)]">Map Room</h3>
              <p className="text-xs text-[var(--foreground-muted)]">Interactive maps</p>
            </Link>
            <Link href="/flashcards" className="card p-6 text-center group hover:border-[var(--accent-gold)]/50">
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-[var(--accent-gold)]/10 flex items-center justify-center text-[var(--accent-gold)] font-bold text-lg">F</div>
              <h3 className="font-bold mb-1 group-hover:text-[var(--accent-gold)]">Flashcards</h3>
              <p className="text-xs text-[var(--foreground-muted)]">80+ cards</p>
            </Link>
            <Link href="/quizzes" className="card p-6 text-center group hover:border-[var(--accent-gold)]/50">
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-[var(--accent-gold)]/10 flex items-center justify-center text-[var(--accent-gold)] font-bold text-lg">Q</div>
              <h3 className="font-bold mb-1 group-hover:text-[var(--accent-gold)]">Quizzes</h3>
              <p className="text-xs text-[var(--foreground-muted)]">120+ questions</p>
            </Link>
          </div>
        </div>
      </section>

      {/* French Perspective Highlight */}
      <section className="py-12 px-4 bg-[var(--background-secondary)]">
        <div className="max-w-5xl mx-auto">
          <div className="card p-6 md:p-8 french-highlight">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-900/30 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg flex-shrink-0">FR</div>
              <div>
                <h2 className="text-xl font-bold mb-2">French Perspective</h2>
                <p className="text-[var(--foreground-muted)] mb-4">
                  Enable the French Perspective toggle (in the header) to highlight content about
                  French civilian experiences, the Resistance, and the impact of liberation on
                  Normandy communities. Perfect for understanding the local human story.
                </p>
                <Link href="/visit-normandy" className="text-[var(--accent-gold)] hover:underline">
                  Plan your visit to Normandy →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Operation Overlord by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[var(--accent-gold)]">156,000</div>
              <div className="text-sm text-[var(--foreground-muted)]">Allied troops on D-Day</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[var(--accent-gold)]">5</div>
              <div className="text-sm text-[var(--foreground-muted)]">Invasion beaches</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[var(--accent-gold)]">7,000</div>
              <div className="text-sm text-[var(--foreground-muted)]">Naval vessels</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[var(--accent-gold)]">11,590</div>
              <div className="text-sm text-[var(--foreground-muted)]">Aircraft sorties</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
