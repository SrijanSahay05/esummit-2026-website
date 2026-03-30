'use client';

import { useRef, useEffect } from 'react';
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
import PacmanShowcase from './PacmanShowcase';
import GhostParade from './GhostParade';
import EventsSection from './EventsSection';
import PiedsSection from './PiedsSection';
import ContactSection from './ContactSection';
import AudioToggle from './AudioToggle';
import CursorTrail from './CursorTrail';
import KonamiEasterEgg from './KonamiEasterEgg';

interface WorldPageClientProps {
  onReady?: () => void;
}

export default function WorldPageClient({ onReady }: WorldPageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useParallax(containerRef);
  useScrollReveal(containerRef);

  // Signal parent that the component has mounted and is ready
  useEffect(() => {
    if (onReady) onReady();
  }, [onReady]);

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
      <PacmanShowcase />
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
