import React from 'react';

const AnimatedText = () => {
  return (
    <div className="absolute top-0 left-0 w-full flex justify-center mt-8">
      <svg
        className="w-96 h-48" // Increased width and height
        viewBox="0 0 800 200" // Adjusted viewBox to accommodate larger text
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="50%"
          y="40%" // Adjusted y position for larger text
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-6xl font-calligraphy fill-current text-[#205781]" // Increased font size
          style={{
            stroke: "#205781",
            strokeWidth: 2,
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: "draw 5s forwards",
          }}
        >
          Invotrack
        </text>
        <text
          x="50%"
          y="70%" // Adjusted y position for larger text
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-4xl font-calligraphy fill-current text-[#4F959D]" // Increased font size
          style={{
            stroke: "#4F959D",
            strokeWidth: 2,
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: "draw 5s forwards 1s",
          }}
        >
          Invoice Management Made Easier
        </text>
      </svg>
    </div>
  );
};

export default AnimatedText;