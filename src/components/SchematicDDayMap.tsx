'use client';

interface SchematicDDayMapProps {
  className?: string;
}

export default function SchematicDDayMap({ className }: SchematicDDayMapProps) {
  return (
    <svg
      viewBox="0 0 1000 562"
      className={className}
      style={{ background: 'linear-gradient(to bottom, #1a3a5c 0%, #1a3a5c 35%, #2d4a3e 35%, #2d4a3e 100%)' }}
    >
      {/* Water texture/waves */}
      <defs>
        <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M0 10 Q25 5, 50 10 T100 10"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        </pattern>
        <linearGradient id="channelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a2540" />
          <stop offset="100%" stopColor="#1a4a6c" />
        </linearGradient>
        <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d5a4e" />
          <stop offset="100%" stopColor="#2a3f32" />
        </linearGradient>
      </defs>

      {/* English Channel */}
      <rect x="0" y="0" width="1000" height="250" fill="url(#channelGradient)" />
      <rect x="0" y="0" width="1000" height="250" fill="url(#waves)" />

      {/* Channel label */}
      <text x="500" y="80" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="24" fontWeight="bold">
        ENGLISH CHANNEL
      </text>

      {/* Arrow showing invasion direction */}
      <path
        d="M500 120 L500 200"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="3"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.3)" />
        </marker>
      </defs>

      {/* Coastline - irregular beach line */}
      <path
        d="M0 250
           Q50 245, 100 252
           Q150 248, 180 255
           L200 252
           Q250 248, 300 255
           Q350 250, 400 258
           Q450 252, 500 260
           Q550 255, 600 262
           Q650 258, 700 265
           Q750 260, 800 268
           Q850 262, 900 270
           Q950 265, 1000 270
           L1000 280
           Q950 275, 900 280
           Q850 272, 800 278
           Q750 270, 700 275
           Q650 268, 600 272
           Q550 265, 500 270
           Q450 262, 400 268
           Q350 260, 300 265
           Q250 258, 200 262
           L180 265
           Q150 258, 100 262
           Q50 255, 0 260
           Z"
        fill="#c2a873"
        stroke="#a89060"
        strokeWidth="2"
      />

      {/* Normandy land */}
      <rect x="0" y="270" width="1000" height="292" fill="url(#landGradient)" />

      {/* Land texture - field patterns */}
      <g opacity="0.15">
        {[...Array(12)].map((_, i) => (
          <line
            key={`field-h-${i}`}
            x1="0"
            y1={300 + i * 25}
            x2="1000"
            y2={300 + i * 25}
            stroke="#1a2f1a"
            strokeWidth="1"
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <line
            key={`field-v-${i}`}
            x1={66 * i}
            y1="270"
            x2={66 * i}
            y2="562"
            stroke="#1a2f1a"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Beach zone labels - positioned at actual beach line (~45% = 253px) */}
      <g>
        {/* Utah Beach - x: 15% = 150px */}
        <rect x="110" y="230" width="80" height="24" rx="4" fill="#b8860b" />
        <text x="150" y="247" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold">UTAH</text>

        {/* Omaha Beach - x: 35% = 350px */}
        <rect x="310" y="235" width="80" height="24" rx="4" fill="#b8860b" />
        <text x="350" y="252" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold">OMAHA</text>

        {/* Gold Beach - x: 52% = 520px */}
        <rect x="480" y="240" width="80" height="24" rx="4" fill="#b8860b" />
        <text x="520" y="257" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold">GOLD</text>

        {/* Juno Beach - x: 65% = 650px */}
        <rect x="610" y="245" width="80" height="24" rx="4" fill="#b8860b" />
        <text x="650" y="262" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold">JUNO</text>

        {/* Sword Beach - x: 78% = 780px */}
        <rect x="740" y="250" width="80" height="24" rx="4" fill="#b8860b" />
        <text x="780" y="267" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold">SWORD</text>
      </g>

      {/* Key cities/locations on land */}
      <g fill="rgba(255,255,255,0.5)" fontSize="11">
        {/* Cherbourg - northwest */}
        <circle cx="50" cy="320" r="4" />
        <text x="60" y="324">Cherbourg</text>

        {/* Carentan - behind Utah/Omaha */}
        <circle cx="250" cy="380" r="3" />
        <text x="260" y="384">Carentan</text>

        {/* Bayeux - behind Gold */}
        <circle cx="500" cy="370" r="3" />
        <text x="510" y="374">Bayeux</text>

        {/* Caen - behind Sword, major objective */}
        <circle cx="820" cy="400" r="5" fill="rgba(255,100,100,0.6)" />
        <text x="835" y="404" fill="rgba(255,200,200,0.7)">Caen</text>
      </g>

      {/* Cotentin Peninsula outline on west */}
      <path
        d="M0 250 Q20 200, 30 150 Q40 100, 20 50 L0 50"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
        strokeDasharray="5,5"
      />

      {/* Pegasus Bridge marker */}
      <g>
        <rect x="845" y="295" width="6" height="15" fill="#4a90d9" />
        <text x="860" y="305" fill="rgba(150,200,255,0.7)" fontSize="9">Pegasus Br.</text>
      </g>

      {/* Pointe du Hoc marker */}
      <g>
        <polygon points="300,260 305,250 310,260" fill="#ff6b6b" />
        <text x="290" y="245" fill="rgba(255,150,150,0.7)" fontSize="9">Pt. du Hoc</text>
      </g>

      {/* Compass rose */}
      <g transform="translate(920, 500)">
        <circle cx="0" cy="0" r="25" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <text x="0" y="-12" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="bold">N</text>
        <path d="M0 -8 L3 5 L0 2 L-3 5 Z" fill="rgba(255,255,255,0.5)" />
      </g>

      {/* Scale bar */}
      <g transform="translate(50, 530)">
        <rect x="0" y="0" width="100" height="4" fill="rgba(255,255,255,0.4)" />
        <rect x="0" y="0" width="50" height="4" fill="rgba(255,255,255,0.7)" />
        <text x="0" y="18" fill="rgba(255,255,255,0.5)" fontSize="9">0</text>
        <text x="50" y="18" fill="rgba(255,255,255,0.5)" fontSize="9">10km</text>
        <text x="100" y="18" fill="rgba(255,255,255,0.5)" fontSize="9">20km</text>
      </g>

      {/* Title */}
      <text x="500" y="545" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="12">
        NORMANDY COAST - JUNE 6, 1944
      </text>
    </svg>
  );
}
