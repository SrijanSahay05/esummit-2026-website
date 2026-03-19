'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

/**
 * Zoom sequence frames — ordered from closest (clock face) to widest (full campus).
 * Each frame crossfades into the next as the user scrolls.
 */
const DESKTOP_FRAMES = [
  {
    src: '/images/sections/section-33.png',
    alt: 'BITS Pilani clock tower — close-up of the iconic clock face in pixel art style',
    width: 2470,
    height: 1469,
  },
  {
    src: '/images/sections/section-35.png',
    alt: 'BITS Pilani clock tower — front view showing the full tower at night',
    width: 2470,
    height: 1468,
  },
  {
    src: '/images/sections/section-34.png',
    alt: 'BITS Pilani campus — aerial bird\'s eye view with clock tower and surrounding buildings',
    width: 2470,
    height: 1469,
  },
  {
    src: '/images/sections/section-37.png',
    alt: 'BITS Pilani campus — wide view showing clock tower and the rotunda plaza',
    width: 2470,
    height: 1469,
  },
  {
    src: '/images/sections/section-38.png',
    alt: 'BITS Pilani campus — widest panoramic view of the full campus at night',
    width: 2470,
    height: 1470,
  },
];

const MOBILE_FRAMES = [
  {
    src: '/images/mobile/frame-1.png',
    alt: 'BITS Pilani clock tower in pixel art with lightning — mobile view',
    width: 757,
    height: 1604,
  },
  {
    src: '/images/mobile/mobile-39.png',
    alt: 'BITS Pilani campus aerial view — portrait orientation',
    width: 2473,
    height: 3686,
  },
  {
    src: '/images/mobile/mobile-40.png',
    alt: 'BITS Pilani campus with rotunda — portrait aerial view',
    width: 2473,
    height: 3686,
  },
];

interface ScrollZoomSequenceProps {
  onScrollProgress?: (progress: number) => void;
}

export function ScrollZoomSequence({
  onScrollProgress,
}: ScrollZoomSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const container = containerRef.current;
    const desktopFrames = container.querySelectorAll<HTMLDivElement>(
      '.zoom-frame-desktop',
    );
    const mobileFrames =
      container.querySelectorAll<HTMLDivElement>('.zoom-frame-mobile');

    const frames = window.innerWidth >= 768 ? desktopFrames : mobileFrames;
    const frameCount = frames.length;

    if (frameCount === 0) return;

    // Set initial state: first frame visible, rest hidden
    frames.forEach((frame, i) => {
      gsap.set(frame, {
        opacity: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : 1.1,
      });
    });

    // Create a timeline pinned to the container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${frameCount * 100}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          onScrollProgress?.(self.progress);
        },
      },
    });

    // Crossfade between frames
    for (let i = 0; i < frameCount - 1; i++) {
      const segmentStart = i / (frameCount - 1);
      const segmentEnd = (i + 1) / (frameCount - 1);
      const duration = segmentEnd - segmentStart;

      // Fade out current frame with slight zoom
      tl.to(
        frames[i],
        {
          opacity: 0,
          scale: 0.95,
          duration: duration,
          ease: 'none',
        },
        segmentStart,
      );

      // Fade in next frame with slight zoom settle
      tl.fromTo(
        frames[i + 1],
        {
          opacity: 0,
          scale: 1.1,
        },
        {
          opacity: 1,
          scale: 1,
          duration: duration,
          ease: 'none',
        },
        segmentStart,
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [prefersReducedMotion, onScrollProgress]);

  // Reduced motion fallback: just show the widest shot
  if (prefersReducedMotion) {
    return (
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src={DESKTOP_FRAMES[DESKTOP_FRAMES.length - 1].src}
          alt={DESKTOP_FRAMES[DESKTOP_FRAMES.length - 1].alt}
          fill
          className="pixel-art hidden object-cover md:block"
          priority
        />
        <Image
          src={MOBILE_FRAMES[MOBILE_FRAMES.length - 1].src}
          alt={MOBILE_FRAMES[MOBILE_FRAMES.length - 1].alt}
          fill
          className="pixel-art block object-cover md:hidden"
          priority
        />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      aria-label="Campus zoom-out animation — scroll to explore BITS Pilani campus"
    >
      {/* Desktop frames */}
      {DESKTOP_FRAMES.map((frame, i) => (
        <div
          key={`desktop-${i}`}
          className="zoom-frame-desktop absolute inset-0 hidden will-change-transform md:block"
        >
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            className="pixel-art object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Mobile frames */}
      {MOBILE_FRAMES.map((frame, i) => (
        <div
          key={`mobile-${i}`}
          className="zoom-frame-mobile absolute inset-0 block will-change-transform md:hidden"
        >
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            className="pixel-art object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <div className="font-pixel text-center text-xs text-text-muted opacity-60">
          <span className="block">SCROLL</span>
          <span className="mt-1 block text-lg">&#9660;</span>
        </div>
      </div>
    </section>
  );
}
