'use client';

import { normandySites } from '@/lib/content-loader';

const typeIcons: Record<string, string> = {
  cemetery: '🪦',
  museum: '🏛️',
  beach: '🏖️',
  memorial: '🎖️',
  battlefield: '⚔️',
};

export default function VisitNormandyPage() {
  // Group by type
  const groupedSites = normandySites.reduce((acc, site) => {
    if (!acc[site.type]) {
      acc[site.type] = [];
    }
    acc[site.type].push(site);
    return acc;
  }, {} as Record<string, typeof normandySites>);

  const typeOrder = ['beach', 'museum', 'cemetery', 'memorial', 'battlefield'];
  const sortedTypes = typeOrder.filter(type => groupedSites[type]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Visit Normandy</h1>
          <p className="text-[var(--foreground-muted)]">
            Planning a trip to Normandy? Here are the key sites to visit to walk in the footsteps of history.
          </p>
        </div>

        {/* Trip Planning Tips */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Trip Planning Tips</h2>
          <div className="space-y-3 text-[var(--foreground-muted)]">
            <p>
              <strong>Best time to visit:</strong> Late spring (May-June) offers pleasant weather and commemorative events around the D-Day anniversary.
            </p>
            <p>
              <strong>Getting there:</strong> Fly into Paris CDG or Caen-Carpiquet. Car rental recommended for flexibility.
            </p>
            <p>
              <strong>How long:</strong> Allow 3-5 days minimum to visit the major sites. A week allows for deeper exploration.
            </p>
            <p>
              <strong>Guided tours:</strong> Consider hiring a local guide for battlefield tours - they provide invaluable context and access to lesser-known sites.
            </p>
          </div>
        </div>

        {/* Suggested Itinerary */}
        <div className="card p-6 mb-8 border-[var(--accent-gold)]/30">
          <h2 className="text-xl font-bold mb-4">Suggested 3-Day Itinerary</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-[var(--accent-gold)]">Day 1: American Sector</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Utah Beach, Sainte-Mère-Église, Airborne Museum, Pointe du Hoc, Omaha Beach, American Cemetery
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--accent-gold)]">Day 2: British & Canadian Sectors</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Gold Beach, Arromanches (Mulberry Harbor), Juno Beach Centre, Sword Beach, Pegasus Bridge
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--accent-gold)]">Day 3: Caen & Reflection</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Mémorial de Caen, Bayeux (including the tapestry), British Cemetery, German Cemetery at La Cambe
              </p>
            </div>
          </div>
        </div>

        {/* Sites by Type */}
        <div className="space-y-8">
          {sortedTypes.map(type => (
            <div key={type}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>{typeIcons[type]}</span>
                <span className="capitalize">{type === 'cemetery' ? 'Cemeteries' : `${type}s`}</span>
              </h2>
              <div className="grid gap-4">
                {groupedSites[type].map(site => (
                  <div key={site.id} className="card p-5">
                    <h3 className="font-bold mb-2">{site.name}</h3>
                    <p className="text-sm text-[var(--foreground-muted)] mb-2">{site.description}</p>

                    <div className="bg-[var(--background-secondary)] p-3 rounded-lg mb-3">
                      <p className="text-sm">
                        <strong>What it teaches:</strong> {site.whatItTeaches}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-[var(--foreground-muted)]">
                      <span>📍 {site.location}</span>
                      {site.visitTips && (
                        <span>💡 {site.visitTips}</span>
                      )}
                    </div>

                    {site.website && (
                      <a
                        href={site.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--accent-gold)] hover:underline mt-3 inline-block"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Resources */}
        <div className="mt-12 card p-6">
          <h2 className="text-xl font-bold mb-4">Useful Resources</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-bold">Normandy Tourism</h3>
              <a href="https://en.normandie-tourisme.fr" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent-gold)] hover:underline">
                en.normandie-tourisme.fr
              </a>
            </div>
            <div>
              <h3 className="font-bold">D-Day Beaches Official Site</h3>
              <a href="https://www.normandy-landing-beaches.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent-gold)] hover:underline">
                normandy-landing-beaches.com
              </a>
            </div>
            <div>
              <h3 className="font-bold">American Battle Monuments Commission</h3>
              <a href="https://www.abmc.gov" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent-gold)] hover:underline">
                abmc.gov
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
