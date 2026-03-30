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
                { label: 'IG', ariaLabel: 'Instagram', href: 'https://www.instagram.com/pieds_bitspilani/' },
                { label: 'TW', ariaLabel: 'Twitter', href: 'https://x.com/BITS_PIEDS' },
                { label: 'LI', ariaLabel: 'LinkedIn', href: 'https://www.linkedin.com/company/pilani-innovation-entrepreneurship-development-society-pieds-bits-pilani/posts/?feedView=all' },
                { label: 'EM', ariaLabel: 'Email', href: 'mailto:ignite@pieds-bitspilani.org' },
              ].map(({ label, ariaLabel, href }) => (
                <a
                  key={label}
                  href={href}
                  className="social-link"
                  aria-label={ariaLabel}
                  target={label !== 'EM' ? '_blank' : undefined}
                  rel={label !== 'EM' ? 'noopener noreferrer' : undefined}
                  onMouseEnter={playHoverSound}
                  onClick={() => {
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
