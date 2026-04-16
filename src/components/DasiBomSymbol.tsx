
import React from 'react';

interface DasiBomSymbolProps {
  size?: 'xs' | 'md' | 'lg';
  showBackground?: boolean;
}

export const DasiBomSymbol: React.FC<DasiBomSymbolProps> = ({ size = 'md', showBackground = true }) => {
  const sizeMap = {
    xs: 32,
    md: 64,
    lg: 120,
  };

  const pixelSize = sizeMap[size];

  return (
    <div 
      className={`flex items-center justify-center relative ${
        showBackground ? 'bg-[#FDFBF7] border-2 border-dashed border-[#FFB7C1]/30 shadow-sm' : ''
      }`}
      style={{ 
        width: showBackground ? pixelSize * 1.4 : pixelSize, 
        height: showBackground ? pixelSize * 1.4 : pixelSize,
        borderRadius: '40%' // Slightly irregular circle for organic feel
      }}
    >
      {/* Pencil Texture Filter Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="pencil-texture" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
          </filter>
          
          {/* Rough Edge Filter */}
          <filter id="rough-edge">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>
        </defs>
      </svg>

      <svg 
        viewBox="0 0 100 100" 
        width={pixelSize} 
        height={pixelSize} 
        className="filter"
        style={{ filter: 'url(#pencil-texture) url(#rough-edge)' }}
      >
        {/* Sun (해) - Pinkish Pastel */}
        <circle 
          cx="50" 
          cy="30" 
          r="18" 
          fill="#FFB7C1" 
          stroke="#2D3436" 
          strokeWidth="1.5"
          strokeDasharray="2 1"
        />
        
        {/* Sun Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="30"
            x2={50 + 28 * Math.cos((angle * Math.PI) / 180)}
            y2={30 + 28 * Math.sin((angle * Math.PI) / 180)}
            stroke="#FFB7C1"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
        ))}

        {/* Sprout Stem (새싹 줄기) */}
        <path 
          d="M50 48 Q50 65 50 85" 
          stroke="#2D3436" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round" 
        />

        {/* Two Sprout Leaves / Faces (마주 보고 웃는 얼굴) */}
        {/* Left Leaf */}
        <g transform="translate(50, 65) rotate(-20)">
          <path 
            d="M0 0 C-20 -10 -25 15 0 20 Z" 
            fill="#98FB98" 
            stroke="#2D3436" 
            strokeWidth="1.5" 
          />
          {/* Smile */}
          <path d="M-12 8 Q-8 12 -4 8" stroke="#2D3436" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>

        {/* Right Leaf */}
        <g transform="translate(50, 65) rotate(20) scale(-1, 1)">
          <path 
            d="M0 0 C-20 -10 -25 15 0 20 Z" 
            fill="#98FB98" 
            stroke="#2D3436" 
            strokeWidth="1.5" 
          />
          {/* Smile */}
          <path d="M-12 8 Q-8 12 -4 8" stroke="#2D3436" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
