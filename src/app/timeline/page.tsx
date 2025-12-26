'use client';

import { useState } from 'react';
import Link from 'next/link';
import { timeline } from '@/lib/content-loader';

const categories = [
  { id: 'all', label: 'All Events' },
  { id: 'airborne', label: 'Airborne' },
  { id: 'beach', label: 'Beach Landings' },
  { id: 'naval', label: 'Naval' },
  { id: 'command', label: 'Command' },
  { id: 'civilian', label: 'Civilian' },
];

export default function TimelinePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredEvents = selectedCategory === 'all'
    ? timeline
    : timeline.filter(e => e.category === selectedCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      airborne: 'bg-purple-500',
      beach: 'bg-yellow-500',
      naval: 'bg-blue-500',
      command: 'bg-green-500',
      civilian: 'bg-red-500',
      german: 'bg-gray-500',
      air: 'bg-cyan-500',
      resistance: 'bg-orange-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Timeline</h1>
          <p className="text-[var(--foreground-muted)]">
            Follow the key events from D-Day through the Liberation of Paris.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[var(--accent-gold)] text-black'
                  : 'bg-[var(--background-secondary)] hover:bg-[var(--background-secondary)]/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--border)]" />

          <div className="space-y-6">
            {filteredEvents.map((event, idx) => (
              <div key={event.id} className="relative pl-12">
                {/* Timeline dot */}
                <div className={`absolute left-2 w-5 h-5 rounded-full ${getCategoryColor(event.category)} border-4 border-[var(--background)]`} />

                <div className="card p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm font-mono text-[var(--accent-gold)]">
                      {formatDate(event.date)}
                    </span>
                    {event.time && (
                      <span className="text-sm font-mono text-[var(--foreground-muted)]">
                        {event.time}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded ${getCategoryColor(event.category)} text-white`}>
                      {event.category}
                    </span>
                    {event.importance === 'major' && (
                      <span className="text-xs px-2 py-0.5 rounded bg-[var(--accent-gold)]/20 text-[var(--accent-gold)]">
                        Major Event
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-[var(--foreground-muted)] text-sm mb-3">{event.description}</p>

                  {event.location && (
                    <p className="text-xs text-[var(--foreground-muted)]">
                      📍 {event.location}
                    </p>
                  )}

                  {event.relatedModules.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[var(--border)]">
                      <span className="text-xs text-[var(--foreground-muted)]">Related modules: </span>
                      {event.relatedModules.map((moduleId, idx) => (
                        <Link
                          key={moduleId}
                          href={`/modules/${moduleId}`}
                          className="text-xs text-[var(--accent-gold)] hover:underline"
                        >
                          {moduleId}{idx < event.relatedModules.length - 1 ? ', ' : ''}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
