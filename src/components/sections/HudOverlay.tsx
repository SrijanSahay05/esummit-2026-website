'use client';

import Link from 'next/link';

/**
 * HudOverlay — Cinematic retro HUD frame around the viewport.
 *
 * Renders a vignette + corner brackets + Register button.
 * The wrapper is pointer-events: none; interactive children opt-in.
 * z-index sits above canvas (0) but below interactive overlays (10+).
 */
export default function HudOverlay() {
  return (
    <div className="hud-overlay-wrap">
      {/* Vignette — radial gradient darkening the edges */}
      <div className="hud-vignette" />

      {/* Corner brackets — top-left */}
      <svg className="hud-corner hud-corner--tl" viewBox="0 0 60 60" fill="none">
        <path d="M2 58 V10 Q2 2 10 2 H58" stroke="currentColor" strokeWidth="2" />
        <circle cx="6" cy="6" r="2" fill="currentColor" />
      </svg>

      {/* Corner brackets — top-right */}
      <svg className="hud-corner hud-corner--tr" viewBox="0 0 60 60" fill="none">
        <path d="M58 58 V10 Q58 2 50 2 H2" stroke="currentColor" strokeWidth="2" />
        <circle cx="54" cy="6" r="2" fill="currentColor" />
      </svg>

      {/* Corner brackets — bottom-left */}
      <svg className="hud-corner hud-corner--bl" viewBox="0 0 60 60" fill="none">
        <path d="M2 2 V50 Q2 58 10 58 H58" stroke="currentColor" strokeWidth="2" />
        <circle cx="6" cy="54" r="2" fill="currentColor" />
      </svg>

      {/* Edge tick marks */}
      <div className="hud-tick hud-tick--top" />
      <div className="hud-tick hud-tick--bottom" />
      <div className="hud-tick hud-tick--left" />
      <div className="hud-tick hud-tick--right" />

      {/* Thin border lines along edges */}
      <div className="hud-edge hud-edge--top" />
      <div className="hud-edge hud-edge--bottom" />
      <div className="hud-edge hud-edge--left" />
      <div className="hud-edge hud-edge--right" />

      {/* ── Register button — flush bottom-right ─────────────────── */}
      <Link href="/world" className="hud-register-btn">
        <span className="hud-register-arrow">{'\u25B6'}</span>
        <span className="hud-register-text">REGISTER</span>
      </Link>
    </div>
  );
}
