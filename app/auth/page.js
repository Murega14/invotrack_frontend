"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import AnimatedText from './AnimatedText';

export default function Auth() {
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let endpoint = '';
      let payload = {};

      if (authMode === 'login') {
        endpoint = '/api/v1/user/login';
        payload = {
          email: formData.email,
          password: formData.password,
        };
      } else if (authMode === 'signup') {
        endpoint = '/api/v1/user/signup';
        payload = {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = '/api/v1/user/google_signup';
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/user/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      router.push('/auth');
    } catch (err) {
      setError('Failed to logout');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center">
      <Head>
        <title>Invotrack | {authMode === "login" ? "Login" : "Sign Up"}</title>
        <meta
          name="description"
          content="Invotrack - Invoice Management System"
        />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet"></link>
      </Head>
        <AnimatedText />
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header Section with Project Description */}

          {/* Auth Mode Toggle (Login/Sign Up) */}
          <div className="p-6">
            <div className="flex justify-center mb-6">
              <div className="flex border-b border-[#4F959D] w-full">
                <button
                  onClick={() => setAuthMode("login")}
                  className={`flex-1 py-2 text-center font-medium ${
                    authMode === "login"
                      ? "border-b-2 border-[#205781] text-[#205781]"
                      : "text-gray-500"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthMode("signup")}
                  className={`flex-1 py-2 text-center font-medium ${
                    authMode === "signup"
                      ? "border-b-2 border-[#205781] text-[#205781]"
                      : "text-gray-500"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === "signup" && (
                <>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-[#4F959D]"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone_number"
                      className="block text-gray-700 text-sm font-bold mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-[#4F959D]"
                      placeholder="1234567890"
                      required
                    />
                  </div>
                </>
              )}

              {(authMode === "login" || authMode === "signup") && (
                <>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 text-sm font-bold mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-[#4F959D]"
                      placeholder="user@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-gray-700 text-sm font-bold mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-[#4F959D]"
                      placeholder="••••••••"
                      required
                    />
                    {authMode === "signup" && (
                      <p className="text-gray-500 text-xs mt-1">
                        Password must be at least 8 characters with uppercase,
                        lowercase letters, and numbers.
                      </p>
                    )}
                  </div>
                </>
              )}

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full bg-[#205781] hover:bg-[#174668] text-white font-bold py-2 px-4 rounded-lg focus:outline-none transition duration-300"
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : authMode === "login"
                    ? "Login"
                    : "Sign Up"}
                </button>

                {(authMode === "login" || authMode === "signup") && (
                  <div className="flex items-center justify-center my-2">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <span className="mx-4 text-gray-500 text-sm">OR</span>
                    <div className="border-t border-gray-300 flex-grow"></div>
                  </div>
                )}

                {(authMode === "login" || authMode === "signup") && (
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                    >
                      <path fill="#FBBC05" d="M0 37V11l17 13z" />
                      <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                      <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                      <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                    </svg>
                    Continue with Google
                  </button>
                )}
              </div>
            </form>
          </div>

          
        </div>
      </div>
    </div>
  );
}