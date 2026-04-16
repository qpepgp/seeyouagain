
import React from 'react';

interface DasiBomSymbolProps {
  size?: 'xs' | 'md' | 'lg';
  showBackground?: boolean;
}

export const DasiBomSymbol: React.FC<DasiBomSymbolProps> = ({ size = 'md', showBackground = true }) => {
  const sizeMap = {
    xs: 24,
    md: 48,
    lg: 96,
  };

  const pixelSize = sizeMap[size];

  return (
    <div 
      className={`flex items-center justify-center relative ${
        showBackground ? 'bg-[#FFFDF5] border border-dashed border-[#FFB7C1] shadow-sm' : ''
      }`}
      style={{ 
        width: showBackground ? pixelSize * 1.5 : pixelSize, 
        height: showBackground ? pixelSize * 1.5 : pixelSize,
        borderRadius: '50%'
      }}
    >
      {/* Pencil Texture Filter Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="pencil-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" stitchTiles="stitch" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"/>
          </filter>
        </defs>
      </svg>

      <svg 
        viewBox="0 0 100 100" 
        width={pixelSize} 
        height={pixelSize} 
        className="filter"
        style={{ filter: 'url(#pencil-texture)' }}
      >
        {/* Sun (해) - Pinkish Pastel #FFB7C1 */}
        <circle 
          cx="50" 
          cy="35" 
          r="18" 
          fill="#FFB7C1" 
          stroke="#2D3436" 
          strokeWidth="1"
        />
        
        {/* Sun Rays - Hand drawn feel */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="35"
            x2={50 + 26 * Math.cos((angle * Math.PI) / 180)}
            y2={35 + 26 * Math.sin((angle * Math.PI) / 180)}
            stroke="#FFB7C1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}

        {/* Sprout Stem (새싹 줄기) */}
        <path 
          d="M50 53 Q52 70 50 85" 
          stroke="#2D3436" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round" 
        />

        {/* Two Sprout Leaves / Faces (마주 보고 웃는 얼굴) #98FB98 */}
        {/* Left Face */}
        <g transform="translate(50, 68) rotate(-15)">
          <path 
            d="M0 0 C-15 -5 -20 15 0 20 Z" 
            fill="#98FB98" 
            stroke="#2D3436" 
            strokeWidth="1.2" 
          />
          {/* Eye */}
          <circle cx="-8" cy="8" r="1" fill="#2D3436" />
          {/* Smile */}
          <path d="M-10 12 Q-7 15 -4 12" stroke="#2D3436" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        </g>

        {/* Right Face */}
        <g transform="translate(50, 68) rotate(15) scale(-1, 1)">
          <path 
            d="M0 0 C-15 -5 -20 15 0 20 Z" 
            fill="#98FB98" 
            stroke="#2D3436" 
            strokeWidth="1.2" 
          />
          {/* Eye */}
          <circle cx="-8" cy="8" r="1" fill="#2D3436" />
          {/* Smile */}
          <path d="M-10 12 Q-7 15 -4 12" stroke="#2D3436" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
