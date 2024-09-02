// StartPage.tsx
import React from 'react';
import './Startpage.css';

interface StartPageProps {
  onStart: () => void; // Define the type for the onStart function
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Connect-4!</h1>
      <button
        onClick={onStart}
        className="bg-white text-blue-500 font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
      >
        Play
      </button>
    </div>
  );
};

export default StartPage;