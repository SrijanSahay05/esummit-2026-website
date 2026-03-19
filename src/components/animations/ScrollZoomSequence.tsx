'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion, useIsMobile } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

/**
 * Each frame defines:
 * - src/alt/dimensions: the image
 * - originX/originY: where the clock tower center is in this image (as % of image dimensions)
 * - zoomScale: how much this frame should be scaled UP to match the zoom level of the previous frame
 *   (i.e., if the clock face is 6x larger in the previous frame, zoomScale ≈ 6)
 */
interface ZoomFrame {
  src: string;
  alt: string;
  width: number;
  height: number;
  originX: number; // % — horizontal position of clock tower
  originY: number; // % — vertical position of clock tower
  zoomScale: number; // scale factor to match previous frame's zoom level
}

const DESKTOP_FRAMES: ZoomFrame[] = [
  {
    src: '/images/sections/section-33.png',
    alt: 'BITS Pilani clock tower — close-up of the iconic clock face',
    width: 2470,
    height: 1469,
    originX: 50,
    originY: 50,
    zoomScale: 1, // starting frame — no upscale needed
  },
  {
    src: '/images/sections/section-35.png',
    alt: 'BITS Pilani clock tower — front view showing the full tower at night',
    width: 2470,
    height: 1468,
    originX: 50,
    originY: 32,
    zoomScale: 5.5, // clock face is ~5.5x smaller here vs section-33
  },
  {
    src: '/images/sections/section-34.png',
    alt: "BITS Pilani campus — aerial bird's eye view with clock tower",
    width: 2470,
    height: 1469,
    originX: 50,
    originY: 28,
    zoomScale: 2.2, // clock face is ~2.2x smaller here vs section-35
  },
  {
    src: '/images/sections/section-37.png',
    alt: 'BITS Pilani campus — wide view showing clock tower and rotunda plaza',
    width: 2470,
    height: 1469,
    originX: 50,
    originY: 20,
    zoomScale: 1.8, // clock tower is ~1.8x smaller here vs section-34
  },
  {
    src: '/images/sections/section-38.png',
    alt: 'BITS Pilani campus — widest panoramic view of the full campus at night',
    width: 2470,
    height: 1470,
    originX: 50,
    originY: 18,
    zoomScale: 1.3, // clock tower is ~1.3x smaller here vs section-37
  },
];

const MOBILE_FRAMES: ZoomFrame[] = [
  {
    src: '/images/mobile/frame-1.png',
    alt: 'BITS Pilani clock tower in pixel art with lightning — mobile view',
    width: 757,
    height: 1604,
    originX: 30,
    originY: 30,
    zoomScale: 1,
  },
  {
    src: '/images/mobile/mobile-39.png',
    alt: 'BITS Pilani campus aerial view — portrait orientation',
    width: 2473,
    height: 3686,
    originX: 50,
    originY: 18,
    zoomScale: 3.5,
  },
  {
    src: '/images/mobile/mobile-40.png',
    alt: 'BITS Pilani campus with rotunda — portrait aerial view',
    width: 2473,
    height: 3686,
    originX: 50,
    originY: 18,
    zoomScale: 1.4,
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
  const isMobile = useIsMobile();

  const buildTimeline = useCallback(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const container = containerRef.current;
    const frameSelector = isMobile
      ? '.zoom-frame-mobile'
      : '.zoom-frame-desktop';
    const frameEls =
      container.querySelectorAll<HTMLDivElement>(frameSelector);
    const frameData = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const frameCount = frameEls.length;

    if (frameCount === 0) return;

    // Set initial state
    frameEls.forEach((el, i) => {
      const frame = frameData[i];
      gsap.set(el, {
        opacity: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : frame.zoomScale,
        transformOrigin: `${frame.originX}% ${frame.originY}%`,
        zIndex: frameCount - i, // first frame on top initially
      });
    });

    // Total scroll distance: more scroll = smoother feel
    const scrollLength = frameCount * 150;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${scrollLength}%`,
        pin: true,
        scrub: 0.8, // slight smoothing for natural feel
        anticipatePin: 1,
        onUpdate: (self) => {
          onScrollProgress?.(self.progress);
        },
      },
    });

    for (let i = 0; i < frameCount - 1; i++) {
      const segmentDuration = 1 / (frameCount - 1);
      const segmentStart = i * segmentDuration;

      // How much the outgoing frame needs to scale down to "match" the incoming frame
      // The outgoing frame zooms out by the incoming frame's zoomScale factor
      const outgoingScaleTarget = 1 / frameData[i + 1].zoomScale;

      // Outgoing frame: scale down (zooming out) + fade out
      tl.to(
        frameEls[i],
        {
          scale: outgoingScaleTarget,
          opacity: 0,
          duration: segmentDuration,
          ease: 'power1.inOut',
        },
        segmentStart,
      );

      // Incoming frame: scale from zoomScale → 1 (settling into view) + fade in
      tl.fromTo(
        frameEls[i + 1],
        {
          scale: frameData[i + 1].zoomScale,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: segmentDuration,
          ease: 'power1.inOut',
          onStart: () => {
            // Bring incoming frame to top
            gsap.set(frameEls[i + 1], { zIndex: frameCount + i + 1 });
          },
        },
        segmentStart,
      );
    }

    return tl;
  }, [prefersReducedMotion, isMobile, onScrollProgress]);

  useEffect(() => {
    const tl = buildTimeline();

    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [buildTimeline]);

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
      className="relative h-screen w-full overflow-hidden bg-bg-primary"
      aria-label="Campus zoom-out animation — scroll to explore BITS Pilani campus"
    >
      {/* Desktop frames */}
      {DESKTOP_FRAMES.map((frame, i) => (
        <div
          key={`desktop-${i}`}
          className="zoom-frame-desktop absolute inset-0 hidden will-change-transform md:block"
          style={{
            transformOrigin: `${frame.originX}% ${frame.originY}%`,
          }}
        >
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            className="pixel-art object-cover"
            priority={i <= 1}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Mobile frames */}
      {MOBILE_FRAMES.map((frame, i) => (
        <div
          key={`mobile-${i}`}
          className="zoom-frame-mobile absolute inset-0 block will-change-transform md:hidden"
          style={{
            transformOrigin: `${frame.originX}% ${frame.originY}%`,
          }}
        >
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            className="pixel-art object-cover"
            priority={i <= 1}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2">
        <div className="scroll-indicator font-pixel text-center text-[10px] text-text-muted">
          <span className="block tracking-widest opacity-60">SCROLL</span>
          <span className="mt-1 block animate-bounce text-base">&#9660;</span>
        </div>
      </div>
    </section>
  );
}
