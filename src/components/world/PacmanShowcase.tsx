'use client';

import { useEffect, useRef, useState } from 'react';

/* ── DATA ──────────────────────────────────────────── */
const speakers = [
  { name: 'Sankar Bora', role: 'Cofounder, Myntra', img: 'sankar-bora' },
  { name: 'Abhishek Shah', role: 'Cofounder, D2C Insider', img: 'abhishek-shah' },
  { name: 'Sushil Sharma', role: 'Cofounder & CEO, Marwari Catalysts', img: 'sushil-sharma' },
  { name: 'Vinayak Aggrawal', role: 'Cofounder & CEO, Bitespeed', img: 'vinayak-aggrawal' },
  { name: 'Bhuvan Gupta', role: 'Cofounder & CTO, OfBusiness', img: 'bhuvan-gupta' },
  { name: 'Sumedh Battewar', role: 'Cofounder & CBO, Emotorad', img: 'sumedh-battewar' },
  { name: 'Awais Ahmed', role: 'Cofounder & CEO, Pixxel', img: 'awais-ahmed' },
  { name: 'Rohit Goyal', role: 'Managing Partner, Windrose Capital', img: 'rohit-goyal' },
  { name: 'Siddharth Srigeri', role: 'Partner, Endurance Capital', img: 'siddharth-srigeri' },
  { name: 'Aneesh Pai', role: 'Cofounder, Done Deal', img: 'aneesh-pai' },
  { name: 'Rakesh Verma', role: 'Cofounder, MapmyIndia', img: 'rakesh-verma' },
  { name: 'Rahul Seth', role: 'VC Investor, Antler', img: 'rahul-seth' },
];

// Sponsor/partner logo images (numbered SVGs in /public/images/sponsors/)
const SPONSOR_IMAGES = Array.from({ length: 19 }, (_, i) => i + 1);

const GHOST_COLORS = ['#FF0000', '#FFB8FF', '#00FFFF', '#FFB852'];

/* ── SUB-COMPONENTS ────────────────────────────────── */

function PacmanSVG() {
  return (
    <div className="ps-pacman-wrap">
      <svg className="ps-pacman-svg" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFE000">
          <animate
            attributeName="d"
            values="M30,30 L57,14 A27,27 0 1,1 57,46 Z;M30,30 L58,28 A27,27 0 1,1 58,32 Z;M30,30 L57,14 A27,27 0 1,1 57,46 Z"
            dur="0.32s"
            repeatCount="indefinite"
            calcMode="linear"
          />
        </path>
        <circle cx="31" cy="13" r="4" fill="#000" />
      </svg>
    </div>
  );
}

function GhostSVG({ index }: { index: number }) {
  const color = GHOST_COLORS[index % 4];
  const delay = (index * 0.22).toFixed(2);
  const BODY = 'M4,26 Q4,4 22,4 Q40,4 40,26 L40,50 Q35.5,45 31,50 Q26.5,45 22,50 Q17.5,45 13,50 Q8.5,45 4,50 Z';
  return (
    <div className="ps-ghost-wrap">
      <svg
        className="ps-ghost-svg"
        viewBox="0 0 44 54"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animationDelay: `${delay}s` }}
      >
        <g className="ps-g-normal">
          <path d={BODY} fill={color} />
          <ellipse cx="15" cy="21" rx="6.5" ry="8" fill="white" />
          <ellipse cx="29" cy="21" rx="6.5" ry="8" fill="white" />
          <circle cx="17" cy="22" r="3.8" fill="#222" />
          <circle cx="31" cy="22" r="3.8" fill="#222" />
        </g>
        <g className="ps-g-scared">
          <path d={BODY} fill="#FFFFFF" />
          <rect x="11" y="18" width="6" height="4" fill="white" rx="1" />
          <rect x="27" y="18" width="6" height="4" fill="white" rx="1" />
          <polyline
            points="8,34 11.5,30 15,34 18.5,30 22,34 25.5,30 29,34 32.5,30 36,34"
            stroke="white"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

function Pellets({ index }: { index: number }) {
  const isPower = index % 5 === 0;
  return (
    <span className="ps-pellets">
      <span className="ps-dot" />
      {isPower ? <span className="ps-dot ps-power" /> : <><span className="ps-dot" /><span className="ps-dot" /></>}
      <span className="ps-dot" />
    </span>
  );
}

function SpeakerCard({ speaker }: { speaker: typeof speakers[0]; index: number }) {
  const [imgError, setImgError] = useState(false);
  const initials = speaker.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="ps-speaker-card">
      <div className="ps-spk-img-wrap">
        {!imgError ? (
          <img
            className="ps-spk-img"
            src={`/images/speakers/${speaker.img}.png`}
            alt={speaker.name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="ps-spk-img-placeholder">{initials}</div>
        )}
      </div>
      <div>
        <div className="ps-spk-name">{speaker.name}</div>
        <div className="ps-spk-role">{speaker.role}</div>
      </div>
    </div>
  );
}

function SponsorLogo({ num }: { num: number; index: number }) {
  return (
    <div className="ps-sponsor-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/sponsors/${num}.svg`}
        alt={`Sponsor ${num}`}
        className="ps-sponsor-img"
        draggable={false}
      />
    </div>
  );
}

function DotDivider() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const n = Math.ceil(window.innerWidth / 15) + 5;
    ref.current.innerHTML = Array.from({ length: n }, () => '<span></span>').join('');
  }, []);
  return <div className="ps-dot-divider" ref={ref} />;
}

/* ── MAIN COMPONENT ────────────────────────────────── */
export default function PacmanShowcase() {
  const scoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let score = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const el = scoreRef.current;
    if (!el) return;

    function tick() {
      score = Math.min(score + [10, 50, 100, 200][Math.floor(Math.random() * 4)], 99980);
      el!.textContent = String(score).padStart(5, '0');
      timeout = setTimeout(tick, 200 + Math.random() * 500);
    }
    tick();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="pacman-showcase">
      {/* Scoreboard */}
      <div className="ps-scoreboard">
        <div className="ps-score-col">
          <div className="ps-score-label">1UP</div>
          <div className="ps-score-val" ref={scoreRef}>00000</div>
        </div>
        <div className="ps-score-center">
          <div className="ps-hi-score-label">HIGH SCORE</div>
          <div className="ps-hi-score-val">99980</div>
          <div className="ps-ready-txt">&mdash; READY! &mdash;</div>
        </div>
        <div className="ps-score-col">
          <div className="ps-score-label">2UP</div>
          <div className="ps-score-val">00000</div>
        </div>
      </div>

      {/* Past Speakers */}
      <section className="ps-section ps-speakers-section">
        <div className="ps-corridor-label">{"// PAST SPEAKERS"}</div>
        <div className="ps-maze-corridor ps-speaker-corridor">
          <div className="ps-track ps-track--ltr">
            {[0, 1].map(copy => (
              <span key={copy} style={{ display: 'contents' }}>
                <PacmanSVG />
                {speakers.map((s, i) => (
                  <span key={`${copy}-${i}`} style={{ display: 'contents' }}>
                    <Pellets index={i} />
                    <SpeakerCard speaker={s} index={i} />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      <DotDivider />

      {/* Past Sponsors & Partners (merged, images only) */}
      <section className="ps-section ps-sponsors-section">
        <div className="ps-corridor-label">{"// PAST SPONSORS AND PARTNERS"}</div>
        <div className="ps-maze-corridor ps-ghost-corridor">
          <div className="ps-track ps-track--rtl">
            {[0, 1].map(copy => (
              <span key={copy} style={{ display: 'contents' }}>
                {SPONSOR_IMAGES.map((num, i) => (
                  <span key={`${copy}-${i}`} style={{ display: 'contents' }}>
                    <Pellets index={i} />
                    <SponsorLogo num={num} index={i} key={`logo-${copy}-${i}`} />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom HUD */}
      <div className="ps-hud">
        <div className="ps-lives-row">
          <span className="ps-lives-label">LIVES</span>
          {[0, 1, 2].map(i => (
            <svg key={i} className="ps-life-svg" viewBox="0 0 40 40">
              <path d="M20,20 L38,7 A19,19 0 1,1 38,33 Z" fill="#FFE000" />
            </svg>
          ))}
        </div>
        <div className="ps-coin-txt">INSERT COIN</div>
        <div className="ps-stage-txt">STAGE 01</div>
      </div>
    </div>
  );
}
