"use client"
import { useState } from 'react';
import AnimatedText from './AnimatedText';
import Login from './login';
import Signup from './signup';


export default function Auth() {
  const [authMode, setAuthMode] = useState('login');

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12">
      <div className="mb-2">
        <AnimatedText />
      </div>
      
      <div className="max-w-md w-full mx-auto px-4 animate-fade-in">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Auth Mode Toggle (Login/Sign Up) */}
          <div className="p-6">
            <div className="flex justify-center mb-6">
              <div className="flex border-b border-[#4F959D] w-full">
                <button
                  onClick={() => setAuthMode("login")}
                  className={`flex-1 py-2 text-center font-medium transition-all duration-300 ${
                    authMode === "login"
                      ? "border-b-2 border-[#205781] text-[#205781]"
                      : "text-gray-500 hover:text-[#4F959D]"
                  }`}
                  type="button"
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthMode("signup")}
                  className={`flex-1 py-2 text-center font-medium transition-all duration-300 ${
                    authMode === "signup"
                      ? "border-b-2 border-[#205781] text-[#205781]"
                      : "text-gray-500 hover:text-[#4F959D]"
                  }`}
                  type="button"
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Render Login or Signup based on authMode */}
            {authMode === "login" ? <Login /> : <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
}