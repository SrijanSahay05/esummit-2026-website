'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import anime from 'animejs';
import BronzeMedallionSVG, { type BronzeMedallionRefs } from '@/components/svg/BronzeMedallionSVG';
import { gemEvents } from '@/lib/data/gem-events';
import { BP } from '@/lib/constants';
import { getLocalFraction } from '@/lib/utils';
import QuestModal from './QuestModal';

const BP2_TOTAL_SECTIONS = 5;

interface BP2RadialHUDProps {
  visible: boolean;
  scrollFraction: number;
}

const BP2RadialHUD: React.FC<BP2RadialHUDProps> = ({ visible, scrollFraction }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [sectionFrac, setSectionFrac] = useState(0);
  const [questIndex, setQuestIndex] = useState<number | null>(null);
  const animatedInRef = useRef(false);
  const reducedMotion = useRef(false);

  const ringOuter = useRef<SVGGElement>(null);
  const ringGold = useRef<SVGGElement>(null);
  const ringTicks = useRef<SVGGElement>(null);
  const ringInnerTicks = useRef<SVGGElement>(null);
  const ringAccent = useRef<SVGGElement>(null);

  const medallionRefs: BronzeMedallionRefs = {
    ringOuter,
    ringGold,
    ringTicks,
    ringInnerTicks,
    ringAccent,
  };

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Entrance animation
  useEffect(() => {
    if (visible && !animatedInRef.current) {
      animatedInRef.current = true;
      if (!reducedMotion.current) {
        anime({
          targets: '.bp2-hud-container',
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutExpo',
        });
        anime({
          targets: '.bp2-progress-bar',
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 500,
          delay: 400,
          easing: 'easeOutCubic',
        });
      }
    }
    if (!visible) {
      animatedInRef.current = false;
    }
  }, [visible]);

  // Update on scroll
  useEffect(() => {
    if (!visible) return;

    const local = getLocalFraction(scrollFraction, BP.GEM_START, BP.GEM_END);
    const sectionProgress = local * BP2_TOTAL_SECTIONS;
    const current = Math.min(Math.floor(sectionProgress), BP2_TOTAL_SECTIONS - 1);
    const frac = sectionProgress - current;

    setActiveSection(current);
    setSectionFrac(frac);

    // Rotate rings
    const rot1 = local * 360;
    const rot2 = local * -200;
    const rot3 = local * 280;
    const rot4 = local * -150;
    const rot5 = local * 320;

    if (ringOuter.current) ringOuter.current.style.transform = `rotate(${rot1}deg)`;
    if (ringGold.current) ringGold.current.style.transform = `rotate(${rot2}deg)`;
    if (ringTicks.current) ringTicks.current.style.transform = `rotate(${rot3}deg)`;
    if (ringInnerTicks.current) ringInnerTicks.current.style.transform = `rotate(${rot4}deg)`;
    if (ringAccent.current) ringAccent.current.style.transform = `rotate(${rot5}deg)`;
  }, [visible, scrollFraction]);

  const handleExplore = useCallback((questIdx: number) => {
    setQuestIndex(questIdx);
  }, []);

  const closeQuest = useCallback(() => {
    setQuestIndex(null);
  }, []);

  // Animation layer data for sections 1-4
  const eventLayers = [
    { icon: '\uD83D\uDE80', title: 'STUDENT-\nPRENEUR', subtitle: 'FLAGSHIP  \u2022  COMPETITION', quest: 0 },
    { icon: '\uD83D\uDCE6', title: 'DROP-\nSHIPPING', subtitle: 'FLAGSHIP  \u2022  COMPETITION', quest: 1 },
    { icon: '\uD83C\uDFDB', title: 'STARTUP\nEXPO', subtitle: 'FLAGSHIP  \u2022  SHOWCASE', quest: 2 },
    { icon: '\uD83E\uDDE9', title: 'SOLVE FOR\nPILANI', subtitle: 'FLAGSHIP  \u2022  CHALLENGE', quest: 3 },
  ];

  return (
    <>
      <div id="bp2-section" className={visible ? 'visible' : ''}>
        <div className="bp2-hud-container" id="bp2-hud-container">
          <BronzeMedallionSVG refs={medallionRefs} />

          <div className="bp2-inner-canvas">
            {/* Section 0: Intro */}
            <div className={`bp2-anim-layer ${activeSection === 0 ? 'active' : ''}`} data-bp2-anim="0">
              <div className="bp2-event-icon">{'\u2694'}</div>
              <div className="bp2-event-inner-title">
                CHOOSE YOUR<br />QUEST
              </div>
              <div className="bp2-event-inner-subtitle">SCROLL TO EXPLORE</div>
            </div>

            {/* Sections 1-4: Events */}
            {eventLayers.map((layer, i) => (
              <div
                key={i + 1}
                className={`bp2-anim-layer ${activeSection === i + 1 ? 'active' : ''}`}
                data-bp2-anim={i + 1}
              >
                <div className="bp2-event-icon">{layer.icon}</div>
                <div className="bp2-event-inner-title">
                  {layer.title.split('\n').map((line, j) => (
                    <React.Fragment key={j}>
                      {j > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </div>
                <div className="bp2-event-inner-subtitle">{layer.subtitle}</div>
                <button
                  className="bp2-explore-btn"
                  data-quest={layer.quest}
                  onClick={() => handleExplore(layer.quest)}
                >
                  {'\u25B6'} EXPLORE MORE
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="bp2-progress-bar">
          {Array.from({ length: BP2_TOTAL_SECTIONS }, (_, i) => (
            <div key={i} className="bp2-progress-segment">
              <div
                className="bp2-fill"
                style={{
                  width:
                    i < activeSection
                      ? '100%'
                      : i === activeSection
                        ? `${sectionFrac * 100}%`
                        : '0%',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <QuestModal
        event={questIndex !== null ? gemEvents[questIndex] ?? null : null}
        questIndex={questIndex ?? 0}
        onClose={closeQuest}
      />
    </>
  );
};

export default BP2RadialHUD;
