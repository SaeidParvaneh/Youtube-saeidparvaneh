import React from 'react';

interface ButterflyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  subtext?: string;
}

export const ButterflyLogo: React.FC<ButterflyLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  subtext = 'SAEID PARVANEH',
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-sm', sub: 'text-[9px]' },
    md: { icon: 38, text: 'text-base', sub: 'text-[10px]' },
    lg: { icon: 48, text: 'text-xl', sub: 'text-xs' },
    xl: { icon: 64, text: 'text-2xl', sub: 'text-sm' },
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Butterfly Icon Emblem */}
      <div className="relative flex items-center justify-center">
        {/* Subtle background glow */}
        <div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-violet-600/30 blur-md opacity-75 group-hover:opacity-100 transition duration-500"
          aria-hidden="true"
        />

        <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-b from-[#131929] to-[#0A0D14] border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          <svg
            width={current.icon}
            height={current.icon}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-400 transform transition-transform duration-300 hover:scale-105"
          >
            <defs>
              <linearGradient id="spmWingLeft" x1="4" y1="6" x2="24" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
              <linearGradient id="spmWingRight" x1="44" y1="6" x2="24" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
              <linearGradient id="spmBody" x1="24" y1="10" x2="24" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>

            {/* Left Upper Wing */}
            <path
              d="M24 18C20 8 8 6 6 15C4 22 14 26 24 25"
              fill="url(#spmWingLeft)"
              fillOpacity="0.85"
            />
            {/* Left Lower Wing */}
            <path
              d="M23 26C16 28 9 32 10 37C11 41 18 41 23 32"
              fill="url(#spmWingLeft)"
              fillOpacity="0.65"
            />

            {/* Right Upper Wing */}
            <path
              d="M24 18C28 8 40 6 42 15C44 22 34 26 24 25"
              fill="url(#spmWingRight)"
              fillOpacity="0.85"
            />
            {/* Right Lower Wing */}
            <path
              d="M25 26C32 28 39 32 38 37C37 41 30 41 25 32"
              fill="url(#spmWingRight)"
              fillOpacity="0.65"
            />

            {/* Wing Detail Geometric Circuits (AI Music Motif) */}
            <path
              d="M13 14C17 17 21 20 23 22"
              stroke="#E0E7FF"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
            <path
              d="M35 14C31 17 27 20 25 22"
              stroke="#E0E7FF"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
            <circle cx="13" cy="14" r="1.5" fill="#67E8F9" />
            <circle cx="35" cy="14" r="1.5" fill="#E879F9" />

            {/* Center Butterfly Body */}
            <ellipse cx="24" cy="24" rx="2" ry="9" fill="url(#spmBody)" />

            {/* Antennae with glow tips */}
            <path
              d="M23 15C21 11 17 9 15 10"
              stroke="#93C5FD"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M25 15C27 11 31 9 33 10"
              stroke="#D8B4FE"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="15" cy="10" r="1" fill="#BAE6FD" />
            <circle cx="33" cy="10" r="1" fill="#F5D0FE" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-2">
            <span className={`font-en font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-300 ${current.text}`}>
              SPM YOUTUBE AI
            </span>
            <span className="text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              v1.0
            </span>
          </div>
          <span className={`font-en text-slate-400 tracking-widest font-semibold uppercase ${current.sub}`}>
            {subtext}
          </span>
        </div>
      )}
    </div>
  );
};
