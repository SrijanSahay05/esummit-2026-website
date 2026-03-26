'use client';

import { WORLD_ABOUT_CARDS } from '@/lib/data/world-data';

export default function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="maze-bg">
        <div className="maze-line maze-h" style={{ top: '8%', left: '5%', width: '15%' }} />
        <div className="maze-line maze-v" style={{ top: '8%', left: '5%', height: '20%' }} />
        <div className="maze-line maze-h" style={{ top: '28%', left: '5%', width: '10%' }} />
        <div className="maze-line maze-h" style={{ top: '15%', right: '5%', width: '12%' }} />
        <div className="maze-line maze-v" style={{ top: '15%', right: '5%', height: '25%' }} />
        <div className="maze-line maze-h" style={{ bottom: '10%', left: '8%', width: '18%' }} />
        <div className="maze-line maze-v" style={{ bottom: '10%', right: '12%', height: '15%' }} />
        <div className="maze-line maze-h" style={{ bottom: '25%', right: '12%', width: '10%' }} />
      </div>
      <div className="section-ghost sg-1">{'\u15E3'}</div>
      <div className="section-ghost sg-2">{'\u15E3'}</div>
      <div className="section-pac">{'\u1567'}</div>
      <div className="section-dot sd-1">{'\u00B7'}</div>
      <div className="section-dot sd-2">{'\u00B7'}</div>
      <div className="section-dot sd-3">{'\u25CF'}</div>
      <div className="section-dot sd-4">{'\u00B7'}</div>
      <div className="section-dot sd-5">{'\u00B7'}</div>
      <div className="container">
        <div className="section-header">
          <div className="level-badge">{'\u25C6'} WORLD 1-1 {'\u25C6'}</div>
          <h2 className="section-title">ABOUT E-SUMMIT</h2>
          <div className="title-underline" />
        </div>
        <div className="about-grid">
          {WORLD_ABOUT_CARDS.map((card) => (
            <div key={card.title} className="about-card pixel-card">
              <div className="card-corner tl">{'\u250C'}</div>
              <div className="card-corner tr">{'\u2510'}</div>
              <div className="card-corner bl">{'\u2514'}</div>
              <div className="card-corner br">{'\u2518'}</div>
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="card-hp">
                <span className="hp-label">HP</span>
                <div className="hp-bar">
                  <div className="hp-fill" style={{ width: `${card.hpPercent}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
