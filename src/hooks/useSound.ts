import { useEffect, useRef } from 'react';

const useSound = (sound: string, volume: number = 1, loopStart?: number) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef<boolean>(false);

  useEffect(() => {
    audioRef.current = new Audio(sound);
    audioRef.current.volume = volume;

    if (loopStart !== undefined) {
      audioRef.current.loop = true; 
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current && audioRef.current.currentTime >= audioRef.current.duration) {
          audioRef.current.currentTime = loopStart; 
        }
      });
    } else {
      audioRef.current.loop = false; // No loop if not set
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [sound, volume, loopStart]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Play from start
      audioRef.current.play().catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Sound error:', error);
        }
      });
    }
  };
  const enableSound = () => {
    if (!hasInteracted.current && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      hasInteracted.current = true;
    }
    return { enableSound };
  }

  const stopSound = () => {
    if (audioRef.current) {
      try {
      audioRef.current.pause();
    } catch (error) {
      console.error('Sound error:', error);
    }
    audioRef.current.currentTime = 0;
    }
  };

  return { playSound, stopSound, enableSound };
};

export default useSound;