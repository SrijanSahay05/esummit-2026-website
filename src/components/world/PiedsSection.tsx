'use client';

import { WORLD_PIEDS_FEATURES } from '@/lib/data/world-data';

export default function PiedsSection() {
  return (
    <section className="section pieds-section" id="pieds">
      <div className="orbit-ring">
        <div className="satellite sat-1">{'\u{1F6F0}'}</div>
        <div className="satellite sat-2">{'\u{1F6F0}'}</div>
      </div>
      <div className="pixel-planet" />
      <div className="pixel-rocket">{'\u{1F680}'}</div>
      <div className="container">
        <div className="section-header">
          <div className="level-badge">{'\u25C6'} WORLD 3-1 {'\u25C6'}</div>
          <h2 className="section-title">ABOUT PIEDS</h2>
          <div className="title-underline" />
        </div>
        <div className="pieds-content">
          <div className="pieds-card pixel-card">
            <div className="card-corner tl">{'\u250C'}</div>
            <div className="card-corner tr">{'\u2510'}</div>
            <div className="card-corner bl">{'\u2514'}</div>
            <div className="card-corner br">{'\u2518'}</div>
            <div className="pieds-header">
              <div className="pieds-icon">{'\u{1F3D7}\uFE0F'}</div>
              <div>
                <h3>PILANI INNOVATION &amp; ENTREPRENEURSHIP DEVELOPMENT SOCIETY</h3>
                <span className="pieds-since">EST. 2013</span>
              </div>
            </div>
            <div className="pieds-body">
              <p>
                Founded in 2013 at BITS Pilani, PIEDS is a leading non-profit technology business
                incubator. It supports startups with funding, mentorship, advanced labs, and
                workspace.
              </p>
              <div className="pieds-features">
                {WORLD_PIEDS_FEATURES.map((f) => (
                  <div key={f.label} className="pieds-feature">
                    <span className="feature-icon">{f.icon}</span>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
              <p className="pieds-note">
                Backed by government initiatives and BITS alumni network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
