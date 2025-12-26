'use client';

import { useState } from 'react';
import Link from 'next/link';
import { historicalMaps } from '@/lib/content-loader';
import ImageWithFallback from '@/components/ImageWithFallback';
import SchematicDDayMap from '@/components/SchematicDDayMap';

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

// Timeline phases for animated map - coordinates aligned to schematic Normandy coast
// The map shows: English Channel at top, Normandy coast in middle, inland France at bottom
// X-axis: West (Utah) at ~10% to East (Sword/Caen) at ~90%
// Y-axis: Channel (ships) at ~15%, beaches at ~45%, inland at ~70-85%
const timelinePhases = [
  {
    id: 'phase-0',
    time: '00:00 - 00:30',
    title: 'Pathfinders Drop',
    description: 'Elite pathfinder teams mark drop zones with lights and radar beacons. First Allied soldiers land in France.',
    alliedPositions: [
      { name: '101st Pathfinders', x: 18, y: 58, type: 'airborne' },
      { name: '82nd Pathfinders', x: 12, y: 62, type: 'airborne' },
      { name: '6th Airborne Pathfinders', x: 88, y: 55, type: 'airborne' },
    ],
    germanPositions: [
      { name: '91st Division', x: 15, y: 72 },
      { name: '716th Division', x: 55, y: 65 },
      { name: '21st Panzer', x: 82, y: 70 },
    ],
  },
  {
    id: 'phase-1',
    time: '00:30 - 03:00',
    title: 'Airborne Assault',
    description: 'Over 23,000 paratroopers of 82nd, 101st, and 6th Airborne divisions drop behind enemy lines to secure key objectives.',
    alliedPositions: [
      { name: '82nd Airborne', x: 10, y: 60, type: 'airborne' },
      { name: '101st Airborne', x: 18, y: 58, type: 'airborne' },
      { name: '6th Airborne', x: 88, y: 55, type: 'airborne' },
      { name: 'Pegasus Bridge', x: 85, y: 52, type: 'objective' },
    ],
    germanPositions: [
      { name: '91st Division', x: 15, y: 72 },
      { name: '352nd Division', x: 38, y: 68 },
      { name: '716th Division', x: 55, y: 65 },
      { name: '21st Panzer', x: 82, y: 70 },
    ],
  },
  {
    id: 'phase-2',
    time: '05:50 - 06:30',
    title: 'Naval Bombardment & H-Hour',
    description: 'Over 5,000 Allied ships bombard coastal defenses. First waves land on Utah and Omaha beaches at 06:30.',
    alliedPositions: [
      { name: 'Naval Fleet', x: 50, y: 18, type: 'naval' },
      { name: 'Utah Landing', x: 15, y: 45, type: 'beach' },
      { name: 'Omaha Landing', x: 35, y: 47, type: 'beach' },
      { name: '82nd Airborne', x: 10, y: 60, type: 'airborne' },
      { name: '101st Airborne', x: 18, y: 58, type: 'airborne' },
      { name: '6th Airborne', x: 88, y: 55, type: 'airborne' },
    ],
    germanPositions: [
      { name: '709th Division', x: 12, y: 55 },
      { name: '352nd Division', x: 38, y: 58 },
      { name: '716th Division', x: 55, y: 60 },
      { name: '21st Panzer', x: 82, y: 70 },
    ],
  },
  {
    id: 'phase-3',
    time: '07:25 - 09:00',
    title: 'British & Canadian Landings',
    description: 'Gold, Juno, and Sword beaches assaulted. Fierce fighting continues at Omaha where casualties are highest.',
    alliedPositions: [
      { name: 'Utah', x: 15, y: 48, type: 'beach' },
      { name: 'Omaha', x: 35, y: 50, type: 'beach' },
      { name: 'Gold', x: 52, y: 48, type: 'beach' },
      { name: 'Juno', x: 65, y: 47, type: 'beach' },
      { name: 'Sword', x: 78, y: 46, type: 'beach' },
      { name: '6th Airborne', x: 88, y: 52, type: 'airborne' },
    ],
    germanPositions: [
      { name: '709th Div', x: 12, y: 58 },
      { name: '352nd Div', x: 38, y: 60 },
      { name: '716th Div', x: 55, y: 58 },
      { name: '21st Panzer', x: 80, y: 65 },
    ],
  },
  {
    id: 'phase-4',
    time: '13:00 - 21:00',
    title: 'Beachheads Secured',
    description: 'Omaha finally secured after heavy losses. 21st Panzer counterattack stopped near Sword Beach. 156,000 troops ashore.',
    alliedPositions: [
      { name: 'Utah Beachhead', x: 15, y: 55, type: 'beachhead' },
      { name: 'Omaha Beachhead', x: 35, y: 58, type: 'beachhead' },
      { name: 'Gold Beachhead', x: 52, y: 56, type: 'beachhead' },
      { name: 'Juno Beachhead', x: 65, y: 55, type: 'beachhead' },
      { name: 'Sword Beachhead', x: 78, y: 54, type: 'beachhead' },
      { name: '82nd Zone', x: 10, y: 62, type: 'airborne' },
      { name: '101st Zone', x: 18, y: 60, type: 'airborne' },
      { name: '6th Abn Zone', x: 88, y: 55, type: 'airborne' },
    ],
    germanPositions: [
      { name: '709th (retreating)', x: 10, y: 72 },
      { name: '352nd (weakened)', x: 35, y: 70 },
      { name: '716th (scattered)', x: 55, y: 68 },
      { name: '21st Pz (halted)', x: 78, y: 62 },
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
                {/* Schematic SVG map background */}
                <SchematicDDayMap className="absolute inset-0 w-full h-full" />

                {/* Overlay with positions */}
                <div className="absolute inset-0">
                  {/* Allied positions with type-based styling */}
                  {showAllied && timelinePhases[currentPhase].alliedPositions.map((pos, idx) => {
                    const getMarkerStyle = (type: string) => {
                      switch (type) {
                        case 'airborne':
                          return 'w-5 h-5 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50';
                        case 'beach':
                          return 'w-4 h-4 bg-blue-400 rounded-sm animate-pulse shadow-lg shadow-blue-400/50';
                        case 'naval':
                          return 'w-6 h-3 bg-blue-600 rounded-sm shadow-lg shadow-blue-600/50';
                        case 'objective':
                          return 'w-4 h-4 bg-yellow-400 rotate-45 shadow-lg shadow-yellow-400/50';
                        case 'beachhead':
                          return 'w-5 h-5 bg-green-500 rounded-full shadow-lg shadow-green-500/50';
                        default:
                          return 'w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50';
                      }
                    };
                    const getLabelStyle = (type: string) => {
                      switch (type) {
                        case 'airborne':
                          return 'bg-purple-900/90';
                        case 'beach':
                          return 'bg-blue-800/90';
                        case 'naval':
                          return 'bg-blue-900/90';
                        case 'objective':
                          return 'bg-yellow-900/90';
                        case 'beachhead':
                          return 'bg-green-900/90';
                        default:
                          return 'bg-blue-900/90';
                      }
                    };
                    return (
                      <div
                        key={`allied-${idx}`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                      >
                        <div className={getMarkerStyle(pos.type)}></div>
                        <span className={`absolute left-6 top-0 text-xs ${getLabelStyle(pos.type)} text-white px-2 py-0.5 rounded whitespace-nowrap font-medium`}>
                          {pos.name}
                        </span>
                      </div>
                    );
                  })}

                  {/* German positions */}
                  {showGerman && timelinePhases[currentPhase].germanPositions.map((pos, idx) => (
                    <div
                      key={`german-${idx}`}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    >
                      <div className="w-4 h-4 bg-gray-600 border-2 border-gray-400 rounded-sm shadow-lg shadow-gray-600/50"></div>
                      <span className="absolute left-6 top-0 text-xs bg-gray-800/90 text-gray-200 px-2 py-0.5 rounded whitespace-nowrap font-medium">
                        {pos.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Current phase info overlay */}
                <div className="absolute top-4 left-4 bg-black/80 p-4 rounded-lg max-w-sm border border-white/10">
                  <div className="text-[var(--accent-gold)] font-mono text-sm mb-1">
                    {timelinePhases[currentPhase].time}
                  </div>
                  <h3 className="font-bold text-white mb-1">{timelinePhases[currentPhase].title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{timelinePhases[currentPhase].description}</p>
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
              <h3 className="font-bold mb-3">Map Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500"></span>
                  <span>Airborne</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-sm bg-blue-400"></span>
                  <span>Beach Landing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-3 rounded-sm bg-blue-600"></span>
                  <span>Naval Fleet</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rotate-45 bg-yellow-400"></span>
                  <span>Objective</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-500"></span>
                  <span>Beachhead</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-sm bg-gray-600 border-2 border-gray-400"></span>
                  <span>German Forces</span>
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
