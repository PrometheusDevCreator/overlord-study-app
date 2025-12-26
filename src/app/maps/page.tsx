'use client';

import { useState } from 'react';
import Link from 'next/link';
import { historicalMaps } from '@/lib/content-loader';
import ImageWithFallback from '@/components/ImageWithFallback';

interface MapLocation {
  id: string;
  name: string;
  type: 'beach' | 'airborne' | 'city' | 'memorial';
  coordinates: { lat: number; lng: number };
  description: string;
}

const locations: MapLocation[] = [
  {
    id: 'utah',
    name: 'Utah Beach',
    type: 'beach',
    coordinates: { lat: 49.4167, lng: -1.1833 },
    description: 'Westernmost American landing zone. U.S. 4th Infantry Division landed here with relatively light casualties.',
  },
  {
    id: 'omaha',
    name: 'Omaha Beach',
    type: 'beach',
    coordinates: { lat: 49.3667, lng: -0.8667 },
    description: 'The bloodiest beach. U.S. 1st and 29th Infantry Divisions faced fierce resistance from German 352nd Division.',
  },
  {
    id: 'gold',
    name: 'Gold Beach',
    type: 'beach',
    coordinates: { lat: 49.3333, lng: -0.5667 },
    description: 'British 50th (Northumbrian) Infantry Division landed here and advanced toward Bayeux.',
  },
  {
    id: 'juno',
    name: 'Juno Beach',
    type: 'beach',
    coordinates: { lat: 49.3333, lng: -0.4500 },
    description: 'Canadian 3rd Infantry Division faced heavy resistance but advanced the farthest inland on D-Day.',
  },
  {
    id: 'sword',
    name: 'Sword Beach',
    type: 'beach',
    coordinates: { lat: 49.2833, lng: -0.2833 },
    description: 'Easternmost beach. British 3rd Infantry Division aimed to link up with airborne forces and capture Caen.',
  },
];

// Timeline phases for animated map
const timelinePhases = [
  {
    id: 'phase-0',
    time: '00:00 - 00:30',
    title: 'Pathfinders Drop',
    description: 'Elite pathfinder teams mark drop zones with lights and radar beacons',
    alliedPositions: [
      { name: '82nd Pathfinders', x: 20, y: 30 },
      { name: '101st Pathfinders', x: 25, y: 35 },
      { name: '6th Airborne Pathfinders', x: 80, y: 30 },
    ],
    germanPositions: [
      { name: '91st Division', x: 22, y: 45 },
      { name: '716th Division', x: 60, y: 50 },
      { name: '21st Panzer', x: 75, y: 55 },
    ],
  },
  {
    id: 'phase-1',
    time: '00:30 - 03:00',
    title: 'Airborne Assault',
    description: 'Paratroopers of 82nd, 101st, and 6th Airborne divisions drop behind enemy lines',
    alliedPositions: [
      { name: '82nd Airborne', x: 18, y: 35 },
      { name: '101st Airborne', x: 22, y: 40 },
      { name: '6th Airborne', x: 82, y: 32 },
      { name: 'Pegasus Bridge', x: 78, y: 28 },
    ],
    germanPositions: [
      { name: '91st Division', x: 22, y: 45 },
      { name: '716th Division', x: 60, y: 50 },
      { name: '21st Panzer', x: 75, y: 55 },
      { name: '352nd Division', x: 40, y: 55 },
    ],
  },
  {
    id: 'phase-2',
    time: '05:50 - 06:30',
    title: 'Naval Bombardment & H-Hour',
    description: 'Allied warships bombard coastal defenses. First waves hit Utah and Omaha beaches.',
    alliedPositions: [
      { name: 'Utah Beach', x: 15, y: 60 },
      { name: 'Omaha Beach', x: 35, y: 62 },
      { name: '82nd Airborne', x: 18, y: 38 },
      { name: '101st Airborne', x: 22, y: 42 },
      { name: '6th Airborne', x: 82, y: 35 },
    ],
    germanPositions: [
      { name: '709th Division', x: 12, y: 55 },
      { name: '352nd Division', x: 38, y: 55 },
      { name: '716th Division', x: 60, y: 50 },
      { name: '21st Panzer', x: 75, y: 55 },
    ],
  },
  {
    id: 'phase-3',
    time: '07:25 - 09:00',
    title: 'British & Canadian Landings',
    description: 'Gold, Juno, and Sword beaches assaulted. Fighting intensifies at Omaha.',
    alliedPositions: [
      { name: 'Utah Beach', x: 15, y: 55 },
      { name: 'Omaha Beach', x: 35, y: 60 },
      { name: 'Gold Beach', x: 52, y: 62 },
      { name: 'Juno Beach', x: 62, y: 62 },
      { name: 'Sword Beach', x: 75, y: 62 },
      { name: '6th Airborne', x: 82, y: 40 },
    ],
    germanPositions: [
      { name: '709th Division', x: 12, y: 50 },
      { name: '352nd Division', x: 38, y: 52 },
      { name: '716th Division', x: 58, y: 48 },
      { name: '21st Panzer', x: 72, y: 50 },
    ],
  },
  {
    id: 'phase-4',
    time: '13:00 - 21:00',
    title: 'Beachheads Secured',
    description: 'Omaha finally secured. German counterattack by 21st Panzer stopped. Beachheads established.',
    alliedPositions: [
      { name: 'Utah Beachhead', x: 15, y: 48 },
      { name: 'Omaha Beachhead', x: 35, y: 52 },
      { name: 'Gold Beachhead', x: 52, y: 55 },
      { name: 'Juno Beachhead', x: 62, y: 55 },
      { name: 'Sword Beachhead', x: 75, y: 55 },
      { name: 'Airborne Zone', x: 20, y: 38 },
      { name: '6th Airborne Zone', x: 82, y: 42 },
    ],
    germanPositions: [
      { name: '709th (retreating)', x: 10, y: 42 },
      { name: '352nd (weakened)', x: 42, y: 45 },
      { name: '716th (scattered)', x: 58, y: 42 },
      { name: '21st Panzer (halted)', x: 70, y: 45 },
    ],
  },
];

const mapCategories = [
  { id: 'all', label: 'All Maps' },
  { id: 'overview', label: 'Overview' },
  { id: 'beaches', label: 'Beach Maps' },
  { id: 'airborne', label: 'Airborne' },
  { id: 'german', label: 'German Defenses' },
  { id: 'campaign', label: 'Campaign' },
];

export default function MapsPage() {
  const [activeTab, setActiveTab] = useState<'interactive' | 'historical' | 'animated'>('animated');
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [selectedMapCategory, setSelectedMapCategory] = useState('all');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showAllied, setShowAllied] = useState(true);
  const [showGerman, setShowGerman] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredMaps = selectedMapCategory === 'all'
    ? historicalMaps
    : historicalMaps.filter(m => m.category === selectedMapCategory);

  // Auto-play animation
  const playAnimation = () => {
    setIsPlaying(true);
    let phase = 0;
    const interval = setInterval(() => {
      phase++;
      if (phase >= timelinePhases.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setCurrentPhase(phase);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Map Room</h1>
          <p className="text-[var(--foreground-muted)]">
            Explore D-Day through interactive maps, historical documents, and animated battle progressions.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-[var(--border)]">
          <button
            onClick={() => setActiveTab('animated')}
            className={`px-6 py-3 font-bold transition-all border-b-2 ${
              activeTab === 'animated'
                ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]'
                : 'border-transparent hover:text-[var(--accent-gold)]'
            }`}
          >
            Animated Timeline
          </button>
          <button
            onClick={() => setActiveTab('historical')}
            className={`px-6 py-3 font-bold transition-all border-b-2 ${
              activeTab === 'historical'
                ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]'
                : 'border-transparent hover:text-[var(--accent-gold)]'
            }`}
          >
            Historical Maps
          </button>
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-6 py-3 font-bold transition-all border-b-2 ${
              activeTab === 'interactive'
                ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]'
                : 'border-transparent hover:text-[var(--accent-gold)]'
            }`}
          >
            Location Guide
          </button>
        </div>

        {/* Animated Timeline View */}
        {activeTab === 'animated' && (
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">D-Day: Hour by Hour</h2>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showAllied}
                      onChange={(e) => setShowAllied(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      Allied Forces
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showGerman}
                      onChange={(e) => setShowGerman(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-gray-500"></span>
                      German Forces
                    </span>
                  </label>
                </div>
              </div>

              {/* Animated Map Display */}
              <div className="relative aspect-[16/9] bg-[var(--background-secondary)] rounded-lg overflow-hidden mb-4">
                {/* Background map image */}
                <img
                  src="/images/maps/invasion-overview.jpg"
                  alt="Normandy Map"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />

                {/* Overlay with positions */}
                <div className="absolute inset-0">
                  {/* Allied positions */}
                  {showAllied && timelinePhases[currentPhase].alliedPositions.map((pos, idx) => (
                    <div
                      key={`allied-${idx}`}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    >
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                      <span className="absolute left-5 top-0 text-xs bg-blue-900/80 text-white px-2 py-0.5 rounded whitespace-nowrap">
                        {pos.name}
                      </span>
                    </div>
                  ))}

                  {/* German positions */}
                  {showGerman && timelinePhases[currentPhase].germanPositions.map((pos, idx) => (
                    <div
                      key={`german-${idx}`}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    >
                      <div className="w-4 h-4 bg-gray-500 rounded-full shadow-lg shadow-gray-500/50"></div>
                      <span className="absolute left-5 top-0 text-xs bg-gray-900/80 text-white px-2 py-0.5 rounded whitespace-nowrap">
                        {pos.name}
                      </span>
                    </div>
                  ))}

                  {/* Beach labels */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-bold">
                    <span className="bg-yellow-600/80 px-2 py-1 rounded">UTAH</span>
                    <span className="bg-yellow-600/80 px-2 py-1 rounded">OMAHA</span>
                    <span className="bg-yellow-600/80 px-2 py-1 rounded">GOLD</span>
                    <span className="bg-yellow-600/80 px-2 py-1 rounded">JUNO</span>
                    <span className="bg-yellow-600/80 px-2 py-1 rounded">SWORD</span>
                  </div>
                </div>

                {/* Current phase info overlay */}
                <div className="absolute top-4 left-4 bg-black/70 p-4 rounded-lg max-w-xs">
                  <div className="text-[var(--accent-gold)] font-mono text-sm mb-1">
                    {timelinePhases[currentPhase].time}
                  </div>
                  <h3 className="font-bold text-white mb-1">{timelinePhases[currentPhase].title}</h3>
                  <p className="text-xs text-gray-300">{timelinePhases[currentPhase].description}</p>
                </div>
              </div>

              {/* Timeline Controls */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={playAnimation}
                  disabled={isPlaying}
                  className="btn-primary px-6 disabled:opacity-50"
                >
                  {isPlaying ? 'Playing...' : 'Play Animation'}
                </button>
                <button
                  onClick={() => setCurrentPhase(0)}
                  className="btn-secondary px-6"
                >
                  Reset
                </button>
              </div>

              {/* Phase selector */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {timelinePhases.map((phase, idx) => (
                  <button
                    key={phase.id}
                    onClick={() => setCurrentPhase(idx)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm transition-all ${
                      currentPhase === idx
                        ? 'bg-[var(--accent-gold)] text-black'
                        : 'bg-[var(--background-secondary)] hover:bg-[var(--background-secondary)]/80'
                    }`}
                  >
                    <span className="font-mono text-xs block">{phase.time}</span>
                    <span className="font-bold">{phase.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="card p-4">
              <h3 className="font-bold mb-3">Understanding the Map</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                  <span>Allied Forces</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-gray-500"></span>
                  <span>German Forces</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-yellow-600"></span>
                  <span>Landing Beaches</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-purple-500"></span>
                  <span>Airborne Zones</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Historical Maps View */}
        {activeTab === 'historical' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {mapCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedMapCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedMapCategory === cat.id
                      ? 'bg-[var(--accent-gold)] text-black'
                      : 'bg-[var(--background-secondary)] hover:bg-[var(--background-secondary)]/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredMaps.map(map => (
                <div key={map.id} className="card overflow-hidden">
                  <div className="relative aspect-video bg-[var(--background-secondary)]">
                    <ImageWithFallback
                      src={map.image}
                      alt={map.title}
                      className="w-full h-full object-cover"
                      fallbackText={map.title.slice(0, 20)}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{map.title}</h3>
                    <p className="text-sm text-[var(--foreground-muted)] mb-3">{map.description}</p>
                    <p className="text-xs text-[var(--foreground-muted)]">Credit: {map.credit}</p>
                    {map.relatedModules.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[var(--border)]">
                        <span className="text-xs text-[var(--foreground-muted)]">Related: </span>
                        {map.relatedModules.map((modId, idx) => (
                          <Link
                            key={modId}
                            href={`/modules/${modId}`}
                            className="text-xs text-[var(--accent-gold)] hover:underline"
                          >
                            {modId}{idx < map.relatedModules.length - 1 ? ', ' : ''}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Location Guide */}
        {activeTab === 'interactive' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-3">
              <h2 className="font-bold mb-3">Key Locations</h2>
              {locations.map(location => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedLocation?.id === location.id
                      ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)]/10'
                      : 'border-[var(--border)] hover:border-[var(--accent-gold)]/50'
                  }`}
                >
                  <span className="font-bold">{location.name}</span>
                  <p className="text-xs text-[var(--foreground-muted)] mt-1 capitalize">{location.type}</p>
                </button>
              ))}
            </div>

            <div className="md:col-span-2">
              <div className="card p-6">
                {selectedLocation ? (
                  <>
                    <h3 className="text-xl font-bold mb-4">{selectedLocation.name}</h3>
                    <p className="text-[var(--foreground-muted)] mb-4">{selectedLocation.description}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selectedLocation.coordinates.lat},${selectedLocation.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-block"
                    >
                      Open in Google Maps
                    </a>
                  </>
                ) : (
                  <p className="text-[var(--foreground-muted)]">
                    Select a location to see details
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
