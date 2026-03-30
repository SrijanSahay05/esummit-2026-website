'use client';

import { useCallback } from 'react';
import { WORLD_EVENTS } from '@/lib/data/world-data';
import { useAudioSystem } from '@/hooks/useAudioSystem';
import ArcadeCarousel from './ArcadeCarousel';

export default function EventsSection() {
  const { playClickSound, playHoverSound } = useAudioSystem();

  const showScorePopup = useCallback((x: number, y: number, text: string) => {
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = text;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    document.getElementById('scorePopups')?.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
  }, []);

  const handleQBlockClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const block = e.currentTarget;
      if (block.classList.contains('hit')) return;
      block.classList.add('hit');
      playClickSound();
      const rect = block.getBoundingClientRect();
      showScorePopup(rect.left + rect.width / 2, rect.top, '+100');
      setTimeout(() => {
        block.classList.remove('hit');
        block.textContent = '?';
      }, 2500);
    },
    [playClickSound, showScorePopup],
  );

  return (
    <section className="section events-section" id="events">
      <div className="rpg-bg">
        <div className="rpg-sprite rpg-sword" style={{ top: '5%', left: '3%' }}>
          {'\u2694'}
        </div>
        <div className="rpg-sprite rpg-shield" style={{ top: '12%', right: '5%' }}>
          {'\u{1F6E1}'}
        </div>
        <div className="rpg-sprite rpg-potion" style={{ bottom: '8%', left: '8%' }}>
          {'\u{1F9EA}'}
        </div>
        <div className="rpg-sprite rpg-scroll" style={{ bottom: '15%', right: '3%' }}>
          {'\u{1F4DC}'}
        </div>
        <div className="rpg-sprite rpg-gem" style={{ top: '50%', left: '2%' }}>
          {'\u{1F48E}'}
        </div>
        <div className="rpg-sprite rpg-key" style={{ top: '40%', right: '2%' }}>
          {'\u{1F5DD}'}
        </div>
      </div>
      <div className="torch torch-left">
        <div className="torch-flame" />
        <div className="torch-body">{'\u2551'}</div>
      </div>
      <div className="torch torch-right">
        <div className="torch-flame" />
        <div className="torch-body">{'\u2551'}</div>
      </div>
      <div className="container">
        <div className="section-header">
          <div className="level-badge">{'\u25C6'} WORLD 2-1 {'\u25C6'}</div>
          <h2 className="section-title">SELECT YOUR EVENT</h2>
          <div className="title-underline" />
          <p className="section-subtitle">Choose your quest wisely, adventurer!</p>
          <div className="player-hud">
            <div className="hud-item">
              <span className="hud-label">PLAYER 1</span>
              <span className="hud-val">READY</span>
            </div>
            <div className="hud-item">
              <span className="hud-label">COINS</span>
              <span className="hud-val hud-coins">{'\u00D7'}042</span>
            </div>
            <div className="hud-item">
              <span className="hud-label">WORLD</span>
              <span className="hud-val">2-1</span>
            </div>
          </div>
        </div>

        <ArcadeCarousel />

        {/* Mobile Event Cards */}
        <div className="mobile-event-cards" id="mobileEventCards">
          {WORLD_EVENTS.map((event) => (
            <div
              key={event.name}
              className={`retro-card${event.legendary ? ' retro-card-legendary' : ''}`}
            >
              <div className="retro-card-border">
                {event.legendary && (
                  <div className="retro-card-tag">{'\u2605'} LEGENDARY {'\u2605'}</div>
                )}
                <div className="retro-card-header">
                  <span className="retro-card-icon">{event.icon}</span>
                  <span className="retro-card-difficulty">
                    {Array.from({ length: 5 }, (_, j) =>
                      j < event.difficulty ? '\u2605' : '\u2606',
                    ).join('')}
                  </span>
                </div>
                <h3 className="retro-card-name">{event.name}</h3>
                <div className="retro-card-type">{event.type}</div>
                <p className="retro-card-desc">{event.description}</p>
                <div className="retro-card-stats">
                  <span>{'\u23F1'} {event.duration}</span>
                  <span>{'\u{1F465}'} {event.team}</span>
                </div>
                <div className="retro-card-bar">
                  <div
                    className={`retro-card-fill${event.legendary ? ' retro-card-fill-max' : ''}`}
                    style={{ width: `${event.barPercent}%` }}
                  />
                </div>
                <a
                  href={event.link || '#'}
                  className="retro-card-btn"
                  target={event.link ? '_blank' : undefined}
                  rel={event.link ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (!event.link) e.preventDefault();
                    const rect = e.currentTarget.getBoundingClientRect();
                    showScorePopup(rect.left + rect.width / 2, rect.top, 'QUEST ACCEPTED!');
                  }}
                  onMouseEnter={playHoverSound}
                >
                  {'\u25B6'} {event.link ? 'REGISTER' : 'COMING SOON'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="question-blocks">
        {[1, 2, 3].map((n) => (
          <div key={n} className="q-block" onClick={handleQBlockClick}>
            ?
          </div>
        ))}
      </div>
    </section>
  );
}
