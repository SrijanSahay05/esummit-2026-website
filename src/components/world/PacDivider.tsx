'use client';

export default function PacDivider() {
  return (
    <div className="pac-divider">
      <div className="pac-dots">
        <span className="pac-char">{'\u1567'}</span>
        <span className="dot">{'\u00B7'}</span><span className="dot">{'\u00B7'}</span><span className="dot">{'\u00B7'}</span>
        <span className="dot">{'\u00B7'}</span><span className="dot">{'\u00B7'}</span><span className="dot">{'\u00B7'}</span>
        <span className="dot big">{'\u25CF'}</span>
        <span className="dot">{'\u00B7'}</span><span className="dot">{'\u00B7'}</span><span className="dot">{'\u00B7'}</span>
        <span className="dot">{'\u00B7'}</span><span className="dot">{'\u00B7'}</span><span className="dot">{'\u00B7'}</span>
        <span className="ghost ghost-red">{'\u15E3'}</span>
        <span className="ghost ghost-pink">{'\u15E3'}</span>
        <span className="ghost ghost-cyan">{'\u15E3'}</span>
        <span className="ghost ghost-orange">{'\u15E3'}</span>
      </div>
    </div>
  );
}
