'use client';

import { useState, useEffect } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--background, #0d1117)' }}
    >
      {/* Animated searchlight effects - bright and focused */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Searchlight 1 - sweeping from left */}
        <div
          className={`absolute w-[300px] h-[300px] rounded-full opacity-[0.5] ${mounted ? 'animate-searchlight-1' : ''}`}
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(212,165,116,0.5) 20%, transparent 50%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {/* Searchlight 2 - sweeping from right */}
        <div
          className={`absolute w-[250px] h-[250px] rounded-full opacity-[0.45] ${mounted ? 'animate-searchlight-2' : ''}`}
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(212,165,116,0.4) 25%, transparent 55%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {/* Searchlight 3 - slower sweep */}
        <div
          className={`absolute w-[350px] h-[350px] rounded-full opacity-[0.35] ${mounted ? 'animate-searchlight-3' : ''}`}
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(212,165,116,0.3) 30%, transparent 55%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Overlord Symbol - matching nav style with gradient khaki */}
        <button
          onClick={onEnter}
          className="group relative cursor-pointer focus:outline-none"
          aria-label="Enter Overlord Study App"
        >
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-lg scale-110 group-hover:scale-125 transition-all duration-700"
            style={{
              border: '3px solid rgba(212,165,116,0.3)',
              borderRadius: '16px'
            }}
          />

          {/* Main symbol container - matching nav gradient */}
          <div
            className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-lg shadow-2xl group-hover:shadow-[0_0_40px_rgba(212,165,116,0.3)] transition-all duration-500 flex items-center justify-center"
            style={{
              background: 'linear-gradient(to bottom right, var(--accent-gold, #d4a574), var(--accent-olive, #4a5d4a))',
            }}
          >
            {/* The O symbol */}
            <span
              className="relative text-6xl md:text-7xl lg:text-8xl font-bold select-none"
              style={{
                fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
                color: 'var(--background, #0d1117)',
              }}
            >
              O
            </span>
          </div>

          {/* Outer decorative ring */}
          <div
            className="absolute -inset-6 rounded-lg group-hover:border-[var(--accent-gold)]/40 transition-colors duration-500"
            style={{
              border: '1px solid rgba(212,165,116,0.15)',
              borderRadius: '20px'
            }}
          />
        </button>

        {/* Title below symbol */}
        <div className="mt-8 text-center">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest"
            style={{
              fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
              letterSpacing: '0.3em',
              color: 'var(--foreground, #e6edf3)',
              textShadow: '2px 2px 8px rgba(0,0,0,0.5)'
            }}
          >
            OVERLORD
          </h1>
          <p
            className="mt-2 text-sm md:text-base tracking-wider"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: 'var(--foreground-muted, #8b949e)'
            }}
          >
            Click to Enter
          </p>
        </div>
      </div>

      {/* Copyright footer */}
      <div className="absolute bottom-8 text-center">
        <p
          className="text-xs md:text-sm tracking-wide"
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            letterSpacing: '0.1em',
            color: 'var(--foreground-muted, #8b949e)',
            opacity: 0.6
          }}
        >
          &copy; ELAN / Prometheus Education Systems 2025
        </p>
      </div>

      {/* CSS for searchlight animations */}
      <style jsx>{`
        @keyframes searchlight-1 {
          0% { transform: translate(-150%, -50%); }
          50% { transform: translate(50%, -50%); }
          100% { transform: translate(-150%, -50%); }
        }
        @keyframes searchlight-2 {
          0% { transform: translate(150%, -50%); }
          50% { transform: translate(-50%, -50%); }
          100% { transform: translate(150%, -50%); }
        }
        @keyframes searchlight-3 {
          0% { transform: translate(-50%, -150%); }
          50% { transform: translate(-50%, 50%); }
          100% { transform: translate(-50%, -150%); }
        }
        .animate-searchlight-1 {
          animation: searchlight-1 10s ease-in-out infinite;
        }
        .animate-searchlight-2 {
          animation: searchlight-2 8s ease-in-out infinite;
          animation-delay: -2s;
        }
        .animate-searchlight-3 {
          animation: searchlight-3 12s ease-in-out infinite;
          animation-delay: -4s;
        }
      `}</style>
    </div>
  );
}
