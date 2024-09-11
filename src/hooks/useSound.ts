import { useEffect, useRef } from 'react';

const useSound = (sound: string, options?: any) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(sound);
  }, [sound]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return playSound;
};

export default useSound;
