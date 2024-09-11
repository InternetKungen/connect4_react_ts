import { useEffect, useRef } from 'react';

const useSound = (sound: string, volume: number = 1, loopStart?: number) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(sound);
    audioRef.current.volume = volume;

    if (loopStart !== undefined) {
      audioRef.current.loop = true; // Loopa ljudet
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
    // Skapa en ny instans av ljudet för att kunna spela det snabbt flera gånger
    const newAudio = new Audio(sound);
    newAudio.volume = volume;
    newAudio.play();

    if (loopStart !== undefined) {
      newAudio.loop = true;
      newAudio.addEventListener('timeupdate', () => {
        if (newAudio.currentTime >= newAudio.duration) {
          newAudio.currentTime = loopStart;
        }
      });
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
