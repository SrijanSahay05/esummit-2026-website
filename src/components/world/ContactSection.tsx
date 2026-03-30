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
              href="#arcadeCarousel"
              className="btn btn-primary pixel-btn btn-large"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
              }}
            >
              <span>{'\u25B6'} REGISTER NOW</span>
            </a>
            <div className="social-links">
              {[
                {
                  id: 'IG',
                  ariaLabel: 'Instagram',
                  href: 'https://www.instagram.com/pieds_bitspilani/',
                  icon: (
                    <svg viewBox="0 0 16 16" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="12" height="12" rx="3"/>
                      <circle cx="8" cy="8" r="2.5" strokeWidth="1.2"/>
                      <rect x="11" y="4" width="1" height="1" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
                {
                  id: 'TW',
                  ariaLabel: 'Twitter / X',
                  href: 'https://x.com/BITS_PIEDS',
                  icon: (
                    <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.6 2h2L9.7 7.6 15 14H11L8 9.9 4.5 14H2.5l5.3-6-5-6H7l2.7 3.8L12.6 2zm-.7 10.8h1.1L4.2 3.2H3L11.9 12.8z"/>
                    </svg>
                  ),
                },
                {
                  id: 'LI',
                  ariaLabel: 'LinkedIn',
                  href: 'https://www.linkedin.com/company/pilani-innovation-entrepreneurship-development-society-pieds-bits-pilani/posts/?feedView=all',
                  icon: (
                    <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                      <rect x="4" y="7" width="1.5" height="5"/>
                      <rect x="4" y="4.5" width="1.5" height="1.5"/>
                      <path d="M7.5 7h1.5v.75C9.4 7.28 10 7 10.7 7 12 7 12.5 7.9 12.5 9.5V12H11V9.5c0-.8-.25-1.1-.8-1.1s-.85.38-.85 1.1V12H7.5V7z"/>
                    </svg>
                  ),
                },
                {
                  id: 'EM',
                  ariaLabel: 'Email',
                  href: 'mailto:ignite@pieds-bitspilani.org',
                  icon: (
                    <svg viewBox="0 0 16 16" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="3" width="14" height="10" rx="1"/>
                      <path d="M1 4l7 5 7-5" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
              ].map(({ id, ariaLabel, href, icon }) => (
                <a
                  key={id}
                  href={href}
                  className="social-link"
                  aria-label={ariaLabel}
                  target={id !== 'EM' ? '_blank' : undefined}
                  rel={id !== 'EM' ? 'noopener noreferrer' : undefined}
                  onMouseEnter={playHoverSound}
                  onClick={() => { playClickSound(); }}
                >
                  <span className="social-pixel">{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
