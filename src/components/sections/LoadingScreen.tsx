'use client';

interface LoadingScreenProps {
  progress: number;
  hidden: boolean;
  /** True once canvas frames are ready — reveals the start button */
  ready?: boolean;
  /** Called when user clicks "Initialize System" */
  onStart?: () => void;
}

export default function LoadingScreen({
  progress,
  hidden,
  ready,
  onStart,
}: LoadingScreenProps) {
  return (
    <div id="loading-screen" className={hidden ? 'hidden' : ''}>
      <img
        src="/images/E-Summit_Logo_new.svg"
        alt="E-Summit 2026"
        className="logo"
      />

      {ready ? (
        <button className="start-btn" onClick={onStart}>
          <span className="start-btn-arrow">{'\u25B6'}</span>
          Initialize System
        </button>
      ) : (
        <>
          <div className="loading-bar-container">
            <div
              className="loading-bar-fill"
              id="loading-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="loading-text">LOADING WORLD...</div>
        </>
      )}
    </div>
  );
}
