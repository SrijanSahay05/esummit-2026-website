'use client';

interface LoadingScreenProps {
  progress: number;
  hidden: boolean;
}

export default function LoadingScreen({ progress, hidden }: LoadingScreenProps) {
  return (
    <div id="loading-screen" className={hidden ? 'hidden' : ''}>
      <img
        src="/images/E-Summit_Logo_new.svg"
        alt="E-Summit 2026"
        className="logo"
      />
      <div className="loading-bar-container">
        <div
          className="loading-bar-fill"
          id="loading-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="loading-text">LOADING WORLD...</div>
    </div>
  );
}
