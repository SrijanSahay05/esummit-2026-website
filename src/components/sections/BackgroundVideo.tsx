'use client';

import React from 'react';

const BackgroundVideo = React.forwardRef<HTMLVideoElement>(
  function BackgroundVideo(_props, ref) {
    return (
      <video
        id="bg-video"
        ref={ref}
        muted
        playsInline
        preload="metadata"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/videos/esummit_video_website.webm" type="video/webm" />
        <source src="/videos/esummit_video_website.mp4" type="video/mp4" />
      </video>
    );
  },
);

BackgroundVideo.displayName = 'BackgroundVideo';

export default BackgroundVideo;
