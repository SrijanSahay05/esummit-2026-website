'use client';

export default function BitsSection() {
  return (
    <section className="section bits-section">
      <div className="tetris-bg">
        {['t-i', 't-o', 't-t', 't-s', 't-l', 't-j', 't-z'].map((cls, i) => (
          <div
            key={cls}
            className={`tetris-block ${cls}`}
            style={{
              left: ['5%', '15%', '80%', '90%', '40%', '60%', '25%'][i],
              animationDelay: ['0s', '-3s', '-6s', '-9s', '-12s', '-4s', '-8s'][i],
            }}
          />
        ))}
      </div>
      <div className="container">
        <div className="section-header">
          <div className="level-badge">{'\u25C6'} WORLD 1-2 {'\u25C6'}</div>
          <h2 className="section-title">ABOUT BITS PILANI</h2>
          <div className="title-underline" />
        </div>
        <div className="bits-content">
          <div className="pixel-frame">
            <div className="frame-inner">
              <div className="bits-icon">{'\u{1F393}'}</div>
              <p className="bits-text">
                With over half a century of legacy and as an{' '}
                <span className="highlight">Institution of Eminence</span>, BITS Pilani fosters a
                thriving ecosystem that empowers students to transform their innovative ideas into
                successful ventures.
              </p>
              <div className="pixel-divider">
                <span>{'\u00B7 \u00B7 \u00B7 \u00B7 \u00B7 \u25CF \u00B7 \u00B7 \u00B7 \u00B7 \u00B7'}</span>
              </div>
              <p className="bits-text">
                It strongly supports aspiring entrepreneurs with its innovative{' '}
                <span className="highlight">gap year</span> and{' '}
                <span className="highlight">deferred placement</span> policies.
              </p>
              <div className="xp-bar">
                <div className="xp-fill" />
                <span className="xp-text">
                  EXP {'\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591'} 50+ YEARS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
