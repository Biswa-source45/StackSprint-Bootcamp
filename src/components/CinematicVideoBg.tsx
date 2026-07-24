import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  className?: string;
};

export default function CinematicVideoBg({ src, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;
    let isResetting = false;

    const checkTime = () => {
      if (!video) return;
      const duration = video.duration;
      const currentTime = video.currentTime;

      if (duration > 0 && !isResetting) {
        // Fade in over 0.5s at the start (opacity 0 to 1)
        if (currentTime <= 0.5) {
          setOpacity(currentTime / 0.5);
        }
        // Fade out over 0.5s before the end (opacity 1 to 0)
        else if (currentTime >= duration - 0.5) {
          const remaining = duration - currentTime;
          setOpacity(Math.max(0, remaining / 0.5));
        }
        // Fully visible in middle
        else {
          setOpacity(1);
        }
      }

      rafId = requestAnimationFrame(checkTime);
    };

    const handleEnded = () => {
      isResetting = true;
      setOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => { });
          isResetting = false;
        }
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    rafId = requestAnimationFrame(checkTime);

    video.play().catch(() => { });

    return () => {
      cancelAnimationFrame(rafId);
      if (video) {
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, [src]);

  return (
    <div
      className={className ?? 'absolute w-full pointer-events-none overflow-hidden z-0'}
      style={{ top: '300px', inset: 'auto 0 0 0' }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover transition-opacity duration-100 ease-linear"
        style={{ opacity }}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      />
      {/* Gradient overlay on video */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white via-transparent pointer-events-none" />
    </div>
  );
}
