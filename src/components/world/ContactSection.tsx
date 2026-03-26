'use client';

import { useAudioSystem } from '@/hooks/useAudioSystem';

export default function ContactSection() {
  const { playHoverSound, playClickSound } = useAudioSystem();

  return (
    <section className="section contact-section" id="contact">
      <div className="arcade-scanlines" />
      <div className="container">
        <div className="section-header">
          <div className="level-badge">{'\u25C6'} FINAL BOSS {'\u25C6'}</div>
          <h2 className="section-title">JOIN THE QUEST</h2>
          <div className="title-underline" />
        </div>
        <div className="contact-content">
          <div className="game-over-box pixel-card">
            <div className="card-corner tl">{'\u250C'}</div>
            <div className="card-corner tr">{'\u2510'}</div>
            <div className="card-corner bl">{'\u2514'}</div>
            <div className="card-corner br">{'\u2518'}</div>
            <div className="arcade-header">
              <span>1UP</span>
              <span>HI-SCORE</span>
              <span>2UP</span>
            </div>
            <div className="arcade-scores">
              <span>00</span>
              <span>999999</span>
              <span>00</span>
            </div>
            <p className="insert-coin blink">INSERT COIN TO CONTINUE...</p>
            <h3>READY TO EMBARK ON YOUR ENTREPRENEURIAL JOURNEY?</h3>
            <p>April 2026 {'\u00B7'} BITS Pilani, Pilani Campus</p>
            <div className="lives-display">
              <span className="life">{'\u2665'}</span>
              <span className="life">{'\u2665'}</span>
              <span className="life">{'\u2665'}</span>
              <span className="life-label">x 3 LIVES REMAINING</span>
            </div>
            <a
              href="#"
              className="btn btn-primary pixel-btn btn-large"
              onMouseEnter={playHoverSound}
              onClick={(e) => {
                e.preventDefault();
                playClickSound();
              }}
            >
              <span>{'\u25B6'} REGISTER NOW</span>
            </a>
            <div className="social-links">
              {[
                { label: 'IG', ariaLabel: 'Instagram' },
                { label: 'TW', ariaLabel: 'Twitter' },
                { label: 'LI', ariaLabel: 'LinkedIn' },
                { label: 'EM', ariaLabel: 'Email' },
              ].map(({ label, ariaLabel }) => (
                <a
                  key={label}
                  href="#"
                  className="social-link"
                  aria-label={ariaLabel}
                  onMouseEnter={playHoverSound}
                  onClick={(e) => {
                    e.preventDefault();
                    playClickSound();
                  }}
                >
                  <span className="social-pixel">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
