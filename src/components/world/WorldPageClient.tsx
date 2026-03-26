'use client';

import { useRef } from 'react';
import '@/styles/world.css';
import { useParallax } from '@/hooks/useParallax';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import DotGridOverlay from './DotGridOverlay';
import StarField from './StarField';
import SpriteLayer from './SpriteLayer';
import PixelMoon from './PixelMoon';
import NebulaBackground from './NebulaBackground';
import BubbleNav from './BubbleNav';
import HeroSection from './HeroSection';
import PacDivider from './PacDivider';
import AboutSection from './AboutSection';
import PipeDivider from './PipeDivider';
import BitsSection from './BitsSection';
import GhostParade from './GhostParade';
import EventsSection from './EventsSection';
import PiedsSection from './PiedsSection';
import ContactSection from './ContactSection';
import AudioToggle from './AudioToggle';
import CursorTrail from './CursorTrail';
import KonamiEasterEgg from './KonamiEasterEgg';

export default function WorldPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  useParallax(containerRef);
  useScrollReveal(containerRef);

  return (
    <div className="world-page" ref={containerRef}>
      <DotGridOverlay />
      <StarField />
      <SpriteLayer />
      <PixelMoon />
      <NebulaBackground />
      <BubbleNav />
      <HeroSection />
      <PacDivider />
      <AboutSection />
      <PipeDivider />
      <BitsSection />
      <GhostParade />
      <EventsSection />
      <PiedsSection />
      <ContactSection />
      <AudioToggle />
      <CursorTrail />
      <KonamiEasterEgg />
      <div id="scorePopups" />
    </div>
  );
}
