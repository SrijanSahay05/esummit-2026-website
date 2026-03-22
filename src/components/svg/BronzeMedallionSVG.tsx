'use client';

import React from 'react';

export interface BronzeMedallionRefs {
  ringOuter: React.RefObject<SVGGElement | null>;
  ringGold: React.RefObject<SVGGElement | null>;
  ringTicks: React.RefObject<SVGGElement | null>;
  ringInnerTicks: React.RefObject<SVGGElement | null>;
  ringAccent: React.RefObject<SVGGElement | null>;
}

interface BronzeMedallionSVGProps {
  refs: BronzeMedallionRefs;
  className?: string;
}

const BronzeMedallionSVG: React.FC<BronzeMedallionSVGProps> = ({ refs, className }) => {
  return (
    <svg className={className ?? 'bp2-hud-svg'} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Bronze gradients */}
        <linearGradient id="bp2-bronzeOuter" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#b89050" />
          <stop offset="15%" stopColor="#8a6830" />
          <stop offset="35%" stopColor="#6b4c28" />
          <stop offset="55%" stopColor="#a08040" />
          <stop offset="75%" stopColor="#6b4c28" />
          <stop offset="90%" stopColor="#8a6830" />
          <stop offset="100%" stopColor="#5a3c1c" />
        </linearGradient>
        <linearGradient id="bp2-bronzeMid" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#7a5828" />
          <stop offset="25%" stopColor="#5c4020" />
          <stop offset="50%" stopColor="#8a6830" />
          <stop offset="75%" stopColor="#5c4020" />
          <stop offset="100%" stopColor="#6b4c28" />
        </linearGradient>
        <linearGradient id="bp2-bronzeInner" x1="0" y1="0.2" x2="1" y2="0.8">
          <stop offset="0%" stopColor="#9a7838" />
          <stop offset="30%" stopColor="#6b4c28" />
          <stop offset="60%" stopColor="#8a6830" />
          <stop offset="100%" stopColor="#5c4020" />
        </linearGradient>
        <radialGradient id="bp2-centerShine" cx="45%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#c0a050" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bp2-centerDark" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#1e1e28" />
          <stop offset="60%" stopColor="#14141c" />
          <stop offset="100%" stopColor="#0e0e14" />
        </radialGradient>
        <radialGradient id="bp2-glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#c09848" stopOpacity="0" />
          <stop offset="85%" stopColor="#c09848" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c09848" stopOpacity="0" />
        </radialGradient>
        {/* Metal filters */}
        <filter id="bp2-metalFull" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves={3} stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="textured" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feSpecularLighting in="blur" surfaceScale={6} specularConstant={0.45} specularExponent={22} lightingColor="#e8d090" result="specular">
            <feDistantLight azimuth={225} elevation={48} />
          </feSpecularLighting>
          <feComposite in="specular" in2="SourceAlpha" operator="in" result="specClip" />
          <feComposite in="textured" in2="specClip" operator="arithmetic" k1="0" k2="1" k3="0.5" k4="0" result="final" />
          <feComposite in="final" in2="SourceAlpha" operator="in" />
        </filter>
        <filter id="bp2-metalBevel" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
          <feSpecularLighting in="blur" surfaceScale={5} specularConstant={0.5} specularExponent={20} lightingColor="#e8d090" result="specular">
            <feDistantLight azimuth={225} elevation={45} />
          </feSpecularLighting>
          <feComposite in="specular" in2="SourceAlpha" operator="in" result="specClip" />
          <feComposite in="SourceGraphic" in2="specClip" operator="arithmetic" k1="0" k2="1" k3="0.6" k4="0" />
        </filter>
        <filter id="bp2-deepBevel" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feSpecularLighting in="blur" surfaceScale={8} specularConstant={0.4} specularExponent={25} lightingColor="#f0d890" result="specular">
            <feDistantLight azimuth={220} elevation={50} />
          </feSpecularLighting>
          <feComposite in="specular" in2="SourceAlpha" operator="in" result="specClip" />
          <feComposite in="SourceGraphic" in2="specClip" operator="arithmetic" k1="0" k2="1" k3="0.5" k4="0" />
        </filter>
      </defs>

      {/* Hover glow */}
      <circle className="bp2-glow-ring" cx="250" cy="250" r="248" fill="url(#bp2-glowGrad)" />

      {/* Outermost edge */}
      <g ref={refs.ringOuter} style={{ transformOrigin: '250px 250px' }}>
        <circle cx="250" cy="250" r="246" fill="none" stroke="#1a1008" strokeWidth="3" />
        <circle cx="250" cy="250" r="244" fill="none" stroke="#8a6830" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Thick outer ring */}
      <circle cx="250" cy="250" r="237" fill="none" stroke="url(#bp2-bronzeOuter)" strokeWidth="18" filter="url(#bp2-metalFull)" />
      <circle cx="250" cy="250" r="246" fill="none" stroke="#3a2010" strokeWidth="0.8" opacity="0.7" />
      <circle cx="250" cy="250" r="228" fill="none" stroke="#c0a050" strokeWidth="0.5" opacity="0.25" />
      <circle cx="250" cy="250" r="227" fill="none" stroke="#2a1808" strokeWidth="0.8" opacity="0.6" />

      {/* Engraved tick marks (scroll-rotated) */}
      <g ref={refs.ringTicks} style={{ transformOrigin: '250px 250px' }} opacity="0.5">
        {Array.from({ length: 36 }, (_, i) => {
          const angle = i * 10;
          const isMajor = angle % 30 === 0;
          return (
            <line
              key={angle}
              x1="250" y1="10"
              x2="250" y2={isMajor ? '24' : '18'}
              stroke={isMajor ? '#c0a050' : '#8a6830'}
              strokeWidth={isMajor ? '1.5' : '0.6'}
              opacity={isMajor ? '0.6' : '0.3'}
              transform={angle === 0 ? undefined : `rotate(${angle} 250 250)`}
            />
          );
        })}
      </g>

      {/* Middle ornate ring */}
      <g ref={refs.ringGold} style={{ transformOrigin: '250px 250px' }}>
        <circle cx="250" cy="250" r="212" fill="none" stroke="url(#bp2-bronzeMid)" strokeWidth="24" filter="url(#bp2-metalFull)" />
        <circle cx="250" cy="250" r="224" fill="none" stroke="#c0a050" strokeWidth="0.4" opacity="0.2" />
        <circle cx="250" cy="250" r="200" fill="none" stroke="#c0a050" strokeWidth="0.4" opacity="0.2" />
        <circle cx="250" cy="250" r="201" fill="none" stroke="#2a1808" strokeWidth="0.6" opacity="0.5" />
      </g>

      {/* Scrollwork / filigree (scroll-rotated counter) */}
      <g ref={refs.ringInnerTicks} style={{ transformOrigin: '250px 250px' }} filter="url(#bp2-metalBevel)">
        <g fill="none" stroke="#a08040" strokeWidth="1.8" opacity="0.55">
          <path d="M 250 32 Q 270 50, 262 68 Q 254 82, 268 90" />
          <path d="M 250 32 Q 230 50, 238 68 Q 246 82, 232 90" />
          <path d="M 404 96 Q 392 118, 378 112 Q 364 106, 358 120" />
          <path d="M 404 96 Q 398 76, 384 82 Q 370 88, 366 74" />
          <path d="M 468 250 Q 450 270, 432 262 Q 418 254, 410 268" />
          <path d="M 468 250 Q 450 230, 432 238 Q 418 246, 410 232" />
          <path d="M 404 404 Q 382 392, 388 378 Q 394 364, 380 358" />
          <path d="M 404 404 Q 396 382, 382 388" />
          <path d="M 250 468 Q 230 450, 238 432 Q 246 418, 232 410" />
          <path d="M 250 468 Q 270 450, 262 432 Q 254 418, 268 410" />
          <path d="M 96 404 Q 118 392, 112 378 Q 106 364, 120 358" />
          <path d="M 96 404 Q 104 382, 118 388" />
          <path d="M 32 250 Q 50 230, 68 238 Q 82 246, 90 232" />
          <path d="M 32 250 Q 50 270, 68 262 Q 82 254, 90 268" />
          <path d="M 96 96 Q 118 108, 112 122 Q 106 136, 120 142" />
          <path d="M 96 96 Q 104 118, 118 112" />
        </g>
        {/* Rivet dots */}
        <g fill="#7a5828" stroke="#c0a050" strokeWidth="0.6" opacity="0.5">
          <circle cx="250" cy="25" r="4" /><circle cx="250" cy="475" r="4" />
          <circle cx="25" cy="250" r="4" /><circle cx="475" cy="250" r="4" />
          <circle cx="91" cy="91" r="3.5" /><circle cx="409" cy="91" r="3.5" />
          <circle cx="91" cy="409" r="3.5" /><circle cx="409" cy="409" r="3.5" />
        </g>
        <g fill="#3a2818" opacity="0.6">
          <circle cx="250" cy="25" r="1.5" /><circle cx="250" cy="475" r="1.5" />
          <circle cx="25" cy="250" r="1.5" /><circle cx="475" cy="250" r="1.5" />
          <circle cx="91" cy="91" r="1.2" /><circle cx="409" cy="91" r="1.2" />
          <circle cx="91" cy="409" r="1.2" /><circle cx="409" cy="409" r="1.2" />
        </g>
      </g>

      {/* Inner ring */}
      <circle cx="250" cy="250" r="185" fill="none" stroke="url(#bp2-bronzeInner)" strokeWidth="14" filter="url(#bp2-deepBevel)" />
      <circle cx="250" cy="250" r="192" fill="none" stroke="#2a1808" strokeWidth="0.8" opacity="0.6" />
      <circle cx="250" cy="250" r="178" fill="none" stroke="#c0a050" strokeWidth="0.4" opacity="0.2" />
      <circle cx="250" cy="250" r="177" fill="none" stroke="#1a1008" strokeWidth="1" opacity="0.7" />

      {/* Decorative dashed ring */}
      <g ref={refs.ringAccent} style={{ transformOrigin: '250px 250px' }}>
        <circle cx="250" cy="250" r="172" fill="none" stroke="#5c4020" strokeWidth="1.5" strokeDasharray="3 8" opacity="0.35" />
      </g>

      {/* Inner border */}
      <circle cx="250" cy="250" r="165" fill="none" stroke="#6b4c28" strokeWidth="4" filter="url(#bp2-metalBevel)" />
      <circle cx="250" cy="250" r="163" fill="none" stroke="#1a1008" strokeWidth="1.5" />

      {/* Dark center fill */}
      <circle cx="250" cy="250" r="162" fill="url(#bp2-centerDark)" />
      <circle cx="250" cy="250" r="160" fill="url(#bp2-centerShine)" />
      <circle cx="250" cy="250" r="161" fill="none" stroke="#000000" strokeWidth="3" opacity="0.4" />
    </svg>
  );
};

export default BronzeMedallionSVG;
