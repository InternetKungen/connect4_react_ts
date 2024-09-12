import { useEffect, useRef } from 'react';

const useSound = (sound: string, volume: number = 1, loopStart?: number) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      audioRef.current.play();
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { playSound, stopSound };
};

export default useSound;