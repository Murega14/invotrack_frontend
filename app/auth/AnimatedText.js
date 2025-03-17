import React from 'react';

const AnimatedText = () => {
  return (
    <div className="w-full flex justify-center mb-8">
      <svg
        className="w-[400px] h-[100px]"
        viewBox="0 0 800 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#205781" />
            <stop offset="100%" stopColor="#4F959D" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-6xl font-bold animate-pulse-text"
          style={{
            fill: "url(#textGradient)",
            filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.3))"
          }}
        >
          Invotrack
        </text>
        <text
          x="50%"
          y="80%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-4xl font-semibold animate-slide-in"
          style={{
            fill: "#4F959D",
            opacity: 0,
            animation: "slideIn 1s ease-out 0.5s forwards"
          }}
        >
          Invoice Management Made Easier
        </text>
      </svg>
    </div>
  );
};

export default AnimatedText;