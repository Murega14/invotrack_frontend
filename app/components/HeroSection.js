"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import invoice from '../../public/invoices.jpg';


export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides array
  const slides = [
    {
      id: 1,
      title: "All Your Invoices in One Place",
      description:
        "Manage invoices efficiently with an intuitive dashboard and automated status updates.",
      image: invoice,
    },
    {
      id: 2,
      title: "Seamless Customer Management",
      description:
        "Easily register and manage your customers, keeping track of payments and outstanding balances.",
      image: null,
    },
    {
      id: 3,
      title: "M-Pesa Payment Integration",
      description:
        "Process payments securely with M-Pesa, ensuring quick and reliable transactions.",
      image: null,
    },
    {
      id: 4,
      title: "Automated Reports & PDF Invoices",
      description:
        "Generate professional invoices in PDF format and track financial insights in real-time.",
      image: null,
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div key={slides[currentSlide].id} className="transition-opacity duration-500">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <div className="mt-4 h-px w-64 bg-gray-300"></div>
          <p className="mt-6 text-gray-600">{slides[currentSlide].description}</p>
          <button className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition-all">
            Get Started
          </button>
        </div>

        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Slider Controls */}
      <div className="mt-8 flex justify-center space-x-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)} // Allow manual selection
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentSlide ? "bg-teal-500 scale-110" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
