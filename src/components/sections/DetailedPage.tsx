'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTilt3D } from '@/hooks/useTilt3D';

const QUEST_TEXT =
  "Adventurer! You stand at the gates of a world full of possibilities... " +
  "Epic quests await you: workshops to sharpen your skills, competitions to prove your worth, " +
  "and legendary founders to meet. Will you accept the challenge and register your quest?";

const WELCOME_BACK_TEXT =
  "Welcome back, brave adventurer! You have returned from the world beyond... " +
  "Scroll below to discover more about the event — epic quests, legendary speakers, " +
  "and treasures await you on this very page. The journey continues!";

const CHAR_DELAY = 30; // ms per character

type DialogVariant = 'quest' | 'welcome-back';

interface DetailedPageProps {
  visible: boolean;
  onEnter: () => void;
  variant?: DialogVariant;
}

export default function DetailedPage({ visible, onEnter, variant = 'quest' }: DetailedPageProps) {
  const isWelcomeBack = variant === 'welcome-back';
  const dialogText = isWelcomeBack ? WELCOME_BACK_TEXT : QUEST_TEXT;

  const { cardRef, specularRef } = useTilt3D<HTMLDivElement>({
    maxRotateX: 8,
    maxRotateY: 12,
    hoverScale: 1.02,
    springFactor: 0.1,
    perspective: 1400,
  });

  const [displayed, setDisplayed] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  // Handle mount/unmount with exit animation delay
  useEffect(() => {
    if (visible) {
      setMounted(true);
    } else if (mounted) {
      // Start exit animation, then unmount after it completes
      setShowBox(false);
      const exitTimer = setTimeout(() => {
        setMounted(false);
        setDisplayed('');
        setTypingDone(false);
        indexRef.current = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);
      }, 450); // matches transition duration
      return () => clearTimeout(exitTimer);
    }
  }, [visible]);

  // Start entrance animation once mounted
  useEffect(() => {
    if (mounted && visible) {
      setDisplayed('');
      setTypingDone(false);
      indexRef.current = 0;
      const t = setTimeout(() => setShowBox(true), 50);
      return () => clearTimeout(t);
    }
  }, [mounted, visible]);

  // Typewriter tick
  useEffect(() => {
    if (!showBox) return;
    intervalRef.current = setInterval(() => {
      if (indexRef.current < dialogText.length) {
        indexRef.current++;
        setDisplayed(dialogText.slice(0, indexRef.current));
      } else {
        setTypingDone(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, CHAR_DELAY);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showBox]);

  // Skip to end on click inside the dialog
  const handleSkip = useCallback(() => {
    if (!typingDone) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayed(dialogText);
      setTypingDone(true);
    }
  }, [typingDone]);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        background: showBox ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0)',
        transition: 'background 0.4s ease',
      }}
    >
      {/* Dialog box with 3D tilt */}
      <div
        ref={cardRef}
        onClick={handleSkip}
        style={{
          pointerEvents: 'all',
          position: 'relative',
          width: 'min(94vw, 920px)',
          minHeight: 'min(70vh, 520px)',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(10, 8, 20, 0.95)',
          border: '6px solid #F5C842',
          borderRadius: 6,
          padding: 'clamp(24px, 4vw, 48px)',
          boxShadow:
            '0 0 0 3px #000, 0 0 60px rgba(245,200,66,0.3), 0 0 120px rgba(245,200,66,0.1), inset 0 0 60px rgba(245,200,66,0.05)',
          imageRendering: 'pixelated',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          opacity: showBox ? 1 : 0,
          visibility: showBox ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s ease',
        }}
      >
        {/* Specular reflection overlay */}
        <div
          ref={specularRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 6,
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 10,
            transition: 'opacity 0.3s ease',
          }}
        />
        {/* Corner decorations */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => {
          const isTop = pos.includes('top');
          const isLeft = pos.includes('left');
          return (
            <div
              key={pos}
              style={{
                position: 'absolute',
                [isTop ? 'top' : 'bottom']: -4,
                [isLeft ? 'left' : 'right']: -4,
                width: 18,
                height: 18,
                background: '#FFD700',
                border: '3px solid #B8860B',
                imageRendering: 'pixelated',
              }}
            />
          );
        })}

        {/* Decorative top bar with pixel pattern */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 20,
            right: 20,
            height: 2,
            background: 'repeating-linear-gradient(90deg, #F5C842 0px, #F5C842 4px, transparent 4px, transparent 8px)',
            opacity: 0.3,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            marginBottom: 'clamp(16px, 3vw, 28px)',
            borderBottom: '3px solid rgba(245,200,66,0.3)',
            paddingBottom: 'clamp(12px, 2vw, 20px)',
          }}
        >
          <span style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
            {isWelcomeBack ? '\uD83C\uDFF0' : '\u2694\uFE0F'}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-pixel), monospace',
              fontSize: 'clamp(1.8rem, 2.2vw, 2.2rem)',
              color: '#F5C842',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textShadow: '0 0 12px rgba(245,200,66,0.6), 0 0 30px rgba(245,200,66,0.2)',
            }}
          >
            {isWelcomeBack ? 'Welcome Back!' : 'Quest Available!'}
          </span>
          <span style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
            {isWelcomeBack ? '\uD83C\uDF1F' : '\u2728'}
          </span>
        </div>

        {/* Decorative side accents */}
        <div style={{ position: 'absolute', top: 60, left: 12, display: 'flex', flexDirection: 'column', gap: 6, opacity: 0.25 }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ width: 4, height: 4, background: '#F5C842' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', top: 60, left: 12, display: 'flex', flexDirection: 'column', gap: 6, opacity: 0.25 }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ width: 4, height: 4, background: '#F5C842' }} />
          ))}
        </div>

        {/* Typewriter text */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(8px, 2vw, 20px) clamp(12px, 3vw, 40px)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-pixel), monospace',
              fontSize: 'clamp(0.65rem, 1.5vw, 1rem)',
              lineHeight: 2.2,
              color: '#fff',
              letterSpacing: '0.05em',
              textAlign: 'center',
              maxWidth: 700,
            }}
          >
            {displayed}
            {!typingDone && (
              <span
                style={{
                  display: 'inline-block',
                  width: 'clamp(8px, 1.2vw, 12px)',
                  height: 'clamp(14px, 2vw, 20px)',
                  background: '#F5C842',
                  marginLeft: 3,
                  animation: 'dialogCursorBlink 0.5s step-end infinite',
                  verticalAlign: 'middle',
                }}
              />
            )}
          </div>
        </div>

        {/* Pixel divider before actions */}
        <div
          style={{
            width: '60%',
            height: 2,
            margin: '0 auto',
            marginTop: 'clamp(8px, 1.5vw, 16px)',
            background: 'repeating-linear-gradient(90deg, #F5C842 0px, #F5C842 6px, transparent 6px, transparent 12px)',
            opacity: 0.3,
          }}
        />

        {/* Arrow hint to skip */}
        {!typingDone && (
          <div
            style={{
              textAlign: 'center',
              marginTop: 'clamp(12px, 2vw, 20px)',
              fontFamily: 'var(--font-pixel), monospace',
              fontSize: 'clamp(0.5rem, 1vw, 0.65rem)',
              color: 'rgba(245,200,66,0.5)',
              letterSpacing: '0.1em',
              animation: 'dialogSkipPulse 1.5s ease-in-out infinite',
            }}
          >
            CLICK TO SKIP {'\u25BC'}
          </div>
        )}

        {/* Action area */}
        {typingDone && (
          <div style={{ textAlign: 'center', marginTop: 'clamp(16px, 3vw, 28px)' }}>
            {isWelcomeBack ? (
              <div
                style={{
                  fontFamily: 'var(--font-pixel), monospace',
                  fontSize: 'clamp(0.55rem, 1.2vw, 0.75rem)',
                  color: '#F5C842',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  animation: 'dialogScrollHint 1.5s ease-in-out infinite',
                }}
              >
                {'\u25BC'} Scroll Down to Explore {'\u25BC'}
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEnter();
                }}
                style={{
                  fontFamily: 'var(--font-pixel), monospace',
                  fontSize: 'clamp(0.65rem, 1.4vw, 0.9rem)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: 'clamp(14px, 2vw, 20px) clamp(32px, 5vw, 56px)',
                  background: 'linear-gradient(180deg, #FFD700 0%, #B8860B 100%)',
                  color: '#1a1a2e',
                  border: '4px solid #B8860B',
                  borderBottom: '6px solid #8B6508',
                  borderRadius: 3,
                  cursor: 'pointer',
                  fontWeight: 700,
                  imageRendering: 'pixelated',
                  boxShadow: '0 0 30px rgba(255,215,0,0.4), 0 4px 0 #6B4C00',
                  animation: 'dialogBtnPulse 1.5s ease-in-out infinite',
                  transition: 'transform 0.1s ease',
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(2px)';
                }}
                onMouseUp={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                {'\u25B6'} Enter the World
              </button>
            )}
          </div>
        )}

        {/* Decorative bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 20,
            right: 20,
            height: 2,
            background: 'repeating-linear-gradient(90deg, #F5C842 0px, #F5C842 4px, transparent 4px, transparent 8px)',
            opacity: 0.3,
          }}
        />
      </div>

      <style>{`
        @keyframes dialogCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes dialogBtnPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(255,215,0,0.4), 0 4px 0 #6B4C00; }
          50% { box-shadow: 0 0 50px rgba(255,215,0,0.7), 0 0 80px rgba(255,215,0,0.2), 0 4px 0 #6B4C00; }
        }
        @keyframes dialogSkipPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes dialogScrollHint {
          0%, 100% { opacity: 0.7; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}
