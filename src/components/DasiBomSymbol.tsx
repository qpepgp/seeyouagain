
import React from 'react';

interface DasiBomSymbolProps {
  size?: 'xs' | 'md' | 'lg';
  showBackground?: boolean;
}

export const DasiBomSymbol: React.FC<DasiBomSymbolProps> = ({ size = 'md', showBackground = true }) => {
  const sizeMap = {
    xs: 24,
    md: 48,
    lg: 100,
  };

  const pixelSize = sizeMap[size];

  return (
    <div 
      className={`flex items-center justify-center relative ${
        showBackground ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#FFB7C1]/20' : ''
      }`}
      style={{ 
        width: showBackground ? pixelSize * 1.6 : pixelSize, 
        height: showBackground ? pixelSize * 1.6 : pixelSize,
        borderRadius: '38%' // Soft, rounded square/circle hybrid
      }}
    >
      {/* Soft Glow Filter */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* Subtle Paper Texture */}
          <filter id="subtle-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      <svg 
        viewBox="0 0 100 100" 
        width={pixelSize} 
        height={pixelSize} 
        className="drop-shadow-sm"
      >
        {/* Warm Sun - Softened edges and warmer pink */}
        <circle 
          cx="50" 
          cy="32" 
          r="16" 
          fill="#FFB7C1" 
          opacity="0.9"
        />
        
        {/* Soft Sun Rays - Rounded and thicker for comfort */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="32"
            x2={50 + 24 * Math.cos((angle * Math.PI) / 180)}
            y2={32 + 24 * Math.sin((angle * Math.PI) / 180)}
            stroke="#FFB7C1"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
          />
        ))}

        {/* Sprout Stem - Smooth, elegant curve */}
        <path 
          d="M50 50 C 50 65, 52 75, 50 88" 
          stroke="#4A4A4A" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round" 
        />

        {/* Two Sprout Leaves / Faces - Simplified, rounded, and friendly */}
        {/* Left Face */}
        <path 
          d="M50 65 C 35 60, 25 75, 50 82" 
          fill="#98FB98" 
          stroke="#4A4A4A" 
          strokeWidth="1.5" 
          strokeLinejoin="round"
        />
        {/* Eye & Smile (Left) */}
        <circle cx="40" cy="71" r="1.2" fill="#4A4A4A" />
        <path d="M37 75 Q 40 78, 43 75" stroke="#4A4A4A" strokeWidth="1" fill="none" strokeLinecap="round" />

        {/* Right Face */}
        <path 
          d="M50 65 C 65 60, 75 75, 50 82" 
          fill="#98FB98" 
          stroke="#4A4A4A" 
          strokeWidth="1.5" 
          strokeLinejoin="round"
        />
        {/* Eye & Smile (Right) */}
        <circle cx="60" cy="71" r="1.2" fill="#4A4A4A" />
        <path d="M57 75 Q 60 78, 63 75" stroke="#4A4A4A" strokeWidth="1" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
};
