'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface RogueCharacterRefs {
  svg: SVGSVGElement | null;
  headGroup: SVGGElement | null;
  leftEyeParts: (SVGEllipseElement | null)[];
  rightEyeParts: (SVGEllipseElement | null)[];
}

const RogueCharacterSVG = forwardRef<RogueCharacterRefs>(
  function RogueCharacterSVG(_props, ref) {
    const svgRef = useRef<SVGSVGElement>(null);
    const headGroupRef = useRef<SVGGElement>(null);

    const leftAmbientRef = useRef<SVGEllipseElement>(null);
    const leftBaseRef = useRef<SVGEllipseElement>(null);
    const leftMidRef = useRef<SVGEllipseElement>(null);
    const leftBrightRef = useRef<SVGEllipseElement>(null);
    const leftCoreRef = useRef<SVGEllipseElement>(null);

    const rightAmbientRef = useRef<SVGEllipseElement>(null);
    const rightBaseRef = useRef<SVGEllipseElement>(null);
    const rightMidRef = useRef<SVGEllipseElement>(null);
    const rightBrightRef = useRef<SVGEllipseElement>(null);
    const rightCoreRef = useRef<SVGEllipseElement>(null);

    useImperativeHandle(ref, () => ({
      svg: svgRef.current,
      headGroup: headGroupRef.current,
      leftEyeParts: [
        leftAmbientRef.current,
        leftBaseRef.current,
        leftMidRef.current,
        leftBrightRef.current,
        leftCoreRef.current,
      ],
      rightEyeParts: [
        rightAmbientRef.current,
        rightBaseRef.current,
        rightMidRef.current,
        rightBrightRef.current,
        rightCoreRef.current,
      ],
    }));

    return (
      <svg
        ref={svgRef}
        className="rogue-svg"
        viewBox="0 0 360 560"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="rogueEyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#b0f8ff" />
            <stop offset="50%" stopColor="#00e8ff" />
            <stop offset="80%" stopColor="#0090b0" />
            <stop offset="100%" stopColor="#004860" stopOpacity={0} />
          </radialGradient>
          <radialGradient id="rogueEyeGlowOuter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00e8ff" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#00e8ff" stopOpacity={0} />
          </radialGradient>
          <linearGradient id="rogueHoodGrad" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#2a2848" />
            <stop offset="40%" stopColor="#1e1c38" />
            <stop offset="100%" stopColor="#161428" />
          </linearGradient>
          <linearGradient id="rogueCapeGrad" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#2a2545" />
            <stop offset="50%" stopColor="#1c1835" />
            <stop offset="100%" stopColor="#141225" />
          </linearGradient>
          <linearGradient id="rogueCapeLining" x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#8a2028" />
            <stop offset="50%" stopColor="#6a1820" />
            <stop offset="100%" stopColor="#4a1018" />
          </linearGradient>
          <linearGradient id="rogueArmorGrad" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#3a3050" />
            <stop offset="50%" stopColor="#2e2842" />
            <stop offset="100%" stopColor="#242038" />
          </linearGradient>
          <linearGradient id="rogueLeatherGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a3848" />
            <stop offset="100%" stopColor="#3a2838" />
          </linearGradient>
          <linearGradient id="rogueBootGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3048" />
            <stop offset="100%" stopColor="#2a2038" />
          </linearGradient>
          <filter id="rogueParticleGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="rogueBigGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="rogueCharShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity={0.4} />
          </filter>
        </defs>

        {/* Cape back */}
        <g className="rogue-cape-sway">
          <path
            d="M 240 160 Q 255 200, 270 260 Q 282 320, 290 380 Q 295 430, 285 480 Q 278 510, 268 525 L 258 530 Q 262 520, 260 490 Q 255 440, 248 380 Q 240 310, 238 240 Z"
            fill="url(#rogueCapeLining)"
            opacity={0.85}
          />
          <path
            d="M 120 160 Q 100 200, 85 260 Q 72 330, 68 400 Q 65 450, 72 500 Q 76 520, 84 535 Q 88 540, 95 538 Q 90 520, 88 490 Q 86 440, 92 380 Q 100 310, 112 240 Z"
            fill="url(#rogueCapeGrad)"
          />
          <path
            d="M 118 165 Q 105 210, 92 270 Q 82 330, 78 395 Q 76 440, 80 490 L 88 488 Q 86 440, 90 385 Q 98 320, 108 260 Q 115 210, 120 175 Z"
            fill="url(#rogueCapeLining)"
            opacity={0.6}
          />
          <path
            d="M 72 500 Q 68 515, 74 530 Q 78 538, 84 535 L 80 520 Z"
            fill="#1c1835"
            opacity={0.8}
          />
          <path
            d="M 285 480 Q 290 500, 282 520 Q 276 530, 268 525 L 275 505 Z"
            fill="#1c1835"
            opacity={0.8}
          />
          <path
            d="M 100 200 Q 95 260, 88 340"
            stroke="#3a3558"
            strokeWidth={1.5}
            fill="none"
            opacity={0.5}
          />
          <path
            d="M 250 195 Q 260 260, 272 340"
            stroke="#8a2830"
            strokeWidth={1.2}
            fill="none"
            opacity={0.4}
          />
        </g>

        {/* Body / Torso */}
        <g filter="url(#rogueCharShadow)">
          <path
            d="M 140 195 L 140 300 Q 140 340, 145 360 L 215 360 Q 220 340, 220 300 L 220 195 Q 200 185, 180 183 Q 160 185, 140 195 Z"
            fill="url(#rogueArmorGrad)"
          />
          <path
            d="M 158 200 L 158 350 L 202 350 L 202 200 Q 190 192, 180 190 Q 170 192, 158 200 Z"
            fill="url(#rogueLeatherGrad)"
            opacity={0.7}
          />
          <path
            d="M 155 210 Q 165 205, 180 203 Q 195 205, 205 210"
            stroke="#4a4060"
            strokeWidth={1.5}
            fill="none"
            opacity={0.6}
          />
          <path
            d="M 150 230 Q 160 225, 180 223 Q 200 225, 210 230"
            stroke="#4a4060"
            strokeWidth={1}
            fill="none"
            opacity={0.4}
          />
          <line x1={150} y1={280} x2={210} y2={280} stroke="#9898a8" strokeWidth={1.5} opacity={0.5} />
          <path
            d="M 142 320 Q 160 328, 180 330 Q 200 328, 218 320"
            stroke="#9898a8"
            strokeWidth={1.5}
            fill="none"
            opacity={0.5}
          />
          <rect x={174} y={208} width={12} height={10} rx={1} fill="#5a4828" stroke="#8a7840" strokeWidth={1} />
          <rect x={177} y={210} width={6} height={6} rx={0.5} fill="#8a7840" />
          <circle cx={180} cy={213} r={1.5} fill="#c0a850" />
          <rect x={142} y={290} width={76} height={10} rx={2} fill="#4a3838" />
          <rect x={142} y={291} width={76} height={2} fill="#5a4848" opacity={0.5} />
          <circle cx={180} cy={295} r={10} fill="#6a6a78" stroke="#8a8a98" strokeWidth={1.5} />
          <circle cx={180} cy={295} r={7} fill="#5a5a68" />
          <line x1={175} y1={290} x2={185} y2={300} stroke="#a0a0b0" strokeWidth={2} strokeLinecap="round" />
          <line x1={185} y1={290} x2={175} y2={300} stroke="#a0a0b0" strokeWidth={2} strokeLinecap="round" />
          <rect x={177} y={230} width={6} height={60} rx={1} fill="#4a3838" />
          <rect x={176} y={248} width={8} height={8} rx={1} fill="#5a5060" stroke="#7a7088" strokeWidth={0.8} />
          <rect x={176} y={265} width={8} height={6} rx={1} fill="#5a5060" stroke="#7a7088" strokeWidth={0.8} />
        </g>

        {/* Arms */}
        <g>
          <path
            d="M 140 198 Q 125 210, 118 240 Q 112 270, 115 300 Q 118 320, 122 340 L 135 340 Q 132 320, 130 300 Q 128 270, 132 240 Q 136 215, 142 205 Z"
            fill="url(#rogueArmorGrad)"
          />
          <path
            d="M 120 250 Q 125 240, 132 238 L 133 268 Q 126 270, 121 265 Z"
            fill="#3a3050"
            stroke="#4a4060"
            strokeWidth={0.8}
            opacity={0.7}
          />
          <rect x={118} y={305} width={18} height={22} rx={3} fill="#3a2838" stroke="#4a3848" strokeWidth={1} />
          <line x1={120} y1={310} x2={134} y2={310} stroke="#5a4858" strokeWidth={1} opacity={0.6} />
          <line x1={120} y1={316} x2={134} y2={316} stroke="#5a4858" strokeWidth={1} opacity={0.6} />
          <line x1={120} y1={322} x2={134} y2={322} stroke="#5a4858" strokeWidth={1} opacity={0.6} />
          <rect x={122} y={312} width={5} height={4} rx={0.5} fill="#7a7088" opacity={0.8} />
        </g>
        <g>
          <path
            d="M 220 198 Q 235 210, 242 240 Q 248 270, 245 300 Q 242 320, 238 340 L 225 340 Q 228 320, 230 300 Q 232 270, 228 240 Q 224 215, 218 205 Z"
            fill="url(#rogueArmorGrad)"
          />
          <path
            d="M 240 250 Q 235 240, 228 238 L 227 268 Q 234 270, 239 265 Z"
            fill="#3a3050"
            stroke="#4a4060"
            strokeWidth={0.8}
            opacity={0.7}
          />
          <rect x={224} y={305} width={18} height={22} rx={3} fill="#3a2838" stroke="#4a3848" strokeWidth={1} />
          <line x1={226} y1={310} x2={240} y2={310} stroke="#5a4858" strokeWidth={1} opacity={0.6} />
          <line x1={226} y1={316} x2={240} y2={316} stroke="#5a4858" strokeWidth={1} opacity={0.6} />
          <line x1={226} y1={322} x2={240} y2={322} stroke="#5a4858" strokeWidth={1} opacity={0.6} />
          <rect x={230} y={308} width={8} height={3} rx={0.5} fill="#8a8a98" opacity={0.5} />
        </g>

        {/* Hands */}
        <g>
          <path d="M 120 338 Q 115 345, 112 355 Q 110 362, 114 365 L 118 360 Q 116 352, 120 345 Z" fill="#1a1828" />
          <path d="M 126 340 Q 122 348, 120 358 Q 118 365, 122 367 L 125 362 Q 124 354, 126 346 Z" fill="#1a1828" />
          <path d="M 132 340 Q 130 350, 128 358 Q 127 364, 130 366 L 133 360 Q 132 352, 133 346 Z" fill="#1a1828" />
        </g>
        <g>
          <path d="M 240 338 Q 245 345, 248 355 Q 250 362, 246 365 L 242 360 Q 244 352, 240 345 Z" fill="#1a1828" />
          <path d="M 234 340 Q 238 348, 240 358 Q 242 365, 238 367 L 235 362 Q 236 354, 234 346 Z" fill="#1a1828" />
          <path d="M 228 340 Q 230 350, 232 358 Q 233 364, 230 366 L 227 360 Q 228 352, 227 346 Z" fill="#1a1828" />
        </g>

        {/* Lower body / skirt armor */}
        <g>
          <path d="M 138 355 L 132 420 Q 135 430, 145 432 L 155 430 L 155 358 Z" fill="#2e2842" />
          <path d="M 155 355 L 155 432 L 180 435 L 205 432 L 205 355 Z" fill="#282240" />
          <path d="M 205 355 L 205 430 L 215 432 Q 225 430, 228 420 L 222 355 Z" fill="#2e2842" />
          <path d="M 140 360 L 220 360" stroke="#8a8a98" strokeWidth={1.5} opacity={0.45} />
          <path d="M 155 358 L 155 430" stroke="#3a3458" strokeWidth={1} opacity={0.4} />
          <path d="M 205 358 L 205 430" stroke="#3a3458" strokeWidth={1} opacity={0.4} />
          <circle cx={148} cy={400} r={1.5} fill="#5a5a68" />
          <circle cx={180} cy={405} r={1.5} fill="#5a5a68" />
          <circle cx={212} cy={400} r={1.5} fill="#5a5a68" />
        </g>

        {/* Legs */}
        <g>
          <rect x={148} y={428} width={24} height={50} rx={4} fill="#242038" />
          <rect x={145} y={428} width={30} height={14} rx={4} fill="#3a3050" stroke="#4a4060" strokeWidth={0.8} />
          <rect x={150} y={431} width={20} height={3} rx={1} fill="#4a4060" opacity={0.5} />
          <rect x={152} y={436} width={16} height={2} rx={1} fill="#4a4060" opacity={0.4} />
        </g>
        <g>
          <rect x={188} y={428} width={24} height={50} rx={4} fill="#242038" />
          <rect x={185} y={428} width={30} height={14} rx={4} fill="#3a3050" stroke="#4a4060" strokeWidth={0.8} />
          <rect x={190} y={431} width={20} height={3} rx={1} fill="#4a4060" opacity={0.5} />
          <rect x={192} y={436} width={16} height={2} rx={1} fill="#4a4060" opacity={0.4} />
        </g>

        {/* Boots */}
        <g>
          <path d="M 146 472 L 146 505 Q 146 515, 152 518 L 172 520 Q 178 518, 178 512 L 178 472 Z" fill="url(#rogueBootGrad)" />
          <rect x={144} y={468} width={36} height={10} rx={3} fill="#3a3048" stroke="#4a4060" strokeWidth={0.8} />
          <line x1={148} y1={485} x2={176} y2={485} stroke="#4a3848" strokeWidth={2} />
          <line x1={148} y1={495} x2={176} y2={495} stroke="#4a3848" strokeWidth={2} />
          <rect x={155} y={483} width={6} height={5} rx={1} fill="#5a5a68" opacity={0.7} />
          <rect x={155} y={493} width={6} height={5} rx={1} fill="#5a5a68" opacity={0.7} />
          <rect x={145} y={516} width={34} height={5} rx={2} fill="#1a1828" />
        </g>
        <g>
          <path d="M 182 472 L 182 505 Q 182 515, 188 518 L 208 520 Q 214 518, 214 512 L 214 472 Z" fill="url(#rogueBootGrad)" />
          <rect x={180} y={468} width={36} height={10} rx={3} fill="#3a3048" stroke="#4a4060" strokeWidth={0.8} />
          <line x1={184} y1={485} x2={212} y2={485} stroke="#4a3848" strokeWidth={2} />
          <line x1={184} y1={495} x2={212} y2={495} stroke="#4a3848" strokeWidth={2} />
          <rect x={192} y={483} width={6} height={5} rx={1} fill="#5a5a68" opacity={0.7} />
          <rect x={192} y={493} width={6} height={5} rx={1} fill="#5a5a68" opacity={0.7} />
          <rect x={181} y={516} width={34} height={5} rx={2} fill="#1a1828" />
        </g>

        {/* Head group (cursor-tracked) */}
        <g ref={headGroupRef} id="rogue-head-group" style={{ transformOrigin: '180px 120px' }}>
          {/* Hood */}
          <g>
            <path
              d="M 110 170 Q 100 120, 115 80 Q 130 45, 155 30 Q 170 22, 180 20 Q 190 22, 205 30 Q 230 45, 245 80 Q 260 120, 250 170 Q 240 190, 220 195 Q 200 200, 180 202 Q 160 200, 140 195 Q 120 190, 110 170 Z"
              fill="url(#rogueHoodGrad)"
            />
            <path
              d="M 115 165 Q 108 125, 120 85 Q 132 52, 152 38 L 140 50 Q 125 68, 118 95 Q 112 130, 118 162 Z"
              fill="#121028"
              opacity={0.4}
            />
            <path
              d="M 170 22 Q 178 15, 185 18 Q 192 14, 196 20 L 190 24 Q 184 20, 178 22 Z"
              fill="#1e1c38"
            />
            <path d="M 135 60 Q 150 50, 170 48" stroke="#3a3558" strokeWidth={1.2} fill="none" opacity={0.5} />
            <path d="M 128 90 Q 148 78, 175 75" stroke="#3a3558" strokeWidth={1} fill="none" opacity={0.4} />
            <path d="M 225 60 Q 210 50, 190 48" stroke="#3a3558" strokeWidth={1.2} fill="none" opacity={0.5} />
            <path
              d="M 128 168 Q 125 140, 130 110 Q 138 78, 155 55 Q 168 40, 180 38 Q 192 40, 205 55 Q 222 78, 230 110 Q 235 140, 232 168 Q 225 185, 210 190 Q 195 195, 180 196 Q 165 195, 150 190 Q 135 185, 128 168 Z"
              fill="none"
              stroke="#c8c8d8"
              strokeWidth={4}
              opacity={0.8}
            />
            <path
              d="M 130 165 Q 127 138, 133 108 Q 140 80, 157 58 Q 170 44, 180 42 Q 190 44, 203 58 Q 220 80, 227 108 Q 233 138, 230 165"
              fill="none"
              stroke="#e8e8f0"
              strokeWidth={1.5}
              opacity={0.4}
            />
            <path
              d="M 135 162 Q 133 135, 138 108 Q 145 82, 160 62 Q 172 48, 180 46 Q 188 48, 200 62 Q 215 82, 222 108 Q 227 135, 225 162 Q 218 178, 205 183 Q 192 188, 180 189 Q 168 188, 155 183 Q 142 178, 135 162 Z"
              fill="#0a0a14"
            />
            <ellipse cx={180} cy={160} rx={12} ry={4} fill="#161428" opacity={0.6} />
            <line x1={180} y1={148} x2={180} y2={158} stroke="#1a1830" strokeWidth={2} opacity={0.4} strokeLinecap="round" />
          </g>

          {/* Glowing eyes */}
          <g className="rogue-eyes-group">
            <ellipse ref={leftAmbientRef} cx={162} cy={128} rx={22} ry={18} fill="url(#rogueEyeGlowOuter)" filter="url(#rogueBigGlow)" />
            <ellipse ref={rightAmbientRef} cx={200} cy={128} rx={22} ry={18} fill="url(#rogueEyeGlowOuter)" filter="url(#rogueBigGlow)" />
            <ellipse ref={leftBaseRef} cx={162} cy={128} rx={14} ry={10} fill="url(#rogueEyeGlow)" />
            <ellipse ref={leftMidRef} cx={162} cy={128} rx={8} ry={6} fill="#60f0ff" />
            <ellipse ref={leftBrightRef} cx={162} cy={127} rx={5} ry={4} fill="#b0faff" />
            <ellipse ref={leftCoreRef} cx={162} cy={126} rx={3} ry={2.5} fill="#ffffff" />
            <ellipse ref={rightBaseRef} cx={200} cy={128} rx={14} ry={10} fill="url(#rogueEyeGlow)" />
            <ellipse ref={rightMidRef} cx={200} cy={128} rx={8} ry={6} fill="#60f0ff" />
            <ellipse ref={rightBrightRef} cx={200} cy={127} rx={5} ry={4} fill="#b0faff" />
            <ellipse ref={rightCoreRef} cx={200} cy={126} rx={3} ry={2.5} fill="#ffffff" />
          </g>
        </g>

        {/* Clasp at neck */}
        <g>
          <polygon points="180,192 186,198 180,204 174,198" fill="#8a7040" stroke="#c0a050" strokeWidth={1} />
          <polygon points="180,194 184,198 180,202 176,198" fill="#c0a850" />
          <circle cx={180} cy={198} r={1.2} fill="#e8d070" />
        </g>

        {/* Cyan magic particles */}
        <g filter="url(#rogueParticleGlow)">
          <circle className="rogue-particle rogue-particle-d1" cx={118} cy={370} r={3} fill="#00e8ff" opacity={0.8} />
          <circle className="rogue-particle-alt rogue-particle-d2" cx={105} cy={390} r={2} fill="#00d0e8" opacity={0.6} />
          <circle className="rogue-particle rogue-particle-d3" cx={125} cy={400} r={2.5} fill="#40f0ff" opacity={0.7} />
          <circle className="rogue-particle-alt rogue-particle-d4" cx={95} cy={410} r={1.8} fill="#00e8ff" opacity={0.5} />
          <rect className="rogue-particle rogue-particle-d5" x={110} y={385} width={3} height={3} fill="#00e8ff" opacity={0.7} transform="rotate(45 111.5 386.5)" />
          <circle className="rogue-particle rogue-particle-d6" cx={130} cy={420} r={1.5} fill="#60f8ff" opacity={0.6} />
          <circle className="rogue-particle rogue-particle-d2" cx={245} cy={375} r={2.5} fill="#00e8ff" opacity={0.7} />
          <circle className="rogue-particle-alt rogue-particle-d3" cx={255} cy={395} r={2} fill="#40f0ff" opacity={0.6} />
          <circle className="rogue-particle rogue-particle-d4" cx={238} cy={405} r={3} fill="#00d0e8" opacity={0.8} />
          <circle className="rogue-particle-alt rogue-particle-d1" cx={260} cy={415} r={1.5} fill="#00e8ff" opacity={0.5} />
          <rect className="rogue-particle rogue-particle-d7" x={248} y={388} width={2.5} height={2.5} fill="#00e8ff" opacity={0.6} transform="rotate(45 249 389)" />
          <circle className="rogue-particle rogue-particle-d5" cx={155} cy={520} r={2} fill="#00e8ff" opacity={0.6} />
          <circle className="rogue-particle-alt rogue-particle-d3" cx={200} cy={522} r={2.5} fill="#40f0ff" opacity={0.5} />
          <circle className="rogue-particle rogue-particle-d8" cx={172} cy={525} r={1.5} fill="#00e8ff" opacity={0.7} />
          <rect className="rogue-particle-alt rogue-particle-d1" x={190} y={518} width={2} height={2} fill="#60f8ff" opacity={0.6} transform="rotate(45 191 519)" />
          <circle className="rogue-particle rogue-particle-d6" cx={140} cy={440} r={1} fill="#80f8ff" opacity={0.5} />
          <circle className="rogue-particle-alt rogue-particle-d4" cx={220} cy={445} r={1.2} fill="#80f8ff" opacity={0.4} />
        </g>

        {/* Ground shadow */}
        <ellipse cx={180} cy={535} rx={65} ry={8} fill="#000000" opacity={0.3} />
      </svg>
    );
  },
);

export default RogueCharacterSVG;
