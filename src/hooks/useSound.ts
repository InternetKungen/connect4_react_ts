import { useEffect, useRef } from 'react';

const useSound = (sound: string, volume: number = 1, loopStart?: number) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef<boolean>(false);

  useEffect(() => {
    audioRef.current = new Audio(sound);
    audioRef.current.volume = volume;

    if (loopStart !== undefined) {
      audioRef.current.loop = true; // Loop ljudet
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current && audioRef.current.currentTime >= audioRef.current.duration) {
          audioRef.current.currentTime = loopStart; // Återgå till loopStart vid slutet
        }
      });
    } else {
      audioRef.current.loop = false; // Ingen loop om loopStart inte är satt
    }
  }, [sound, volume, loopStart]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Spela från början
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