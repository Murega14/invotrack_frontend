"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

  // Environment-aware API base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Password validation function
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const isLongEnough = password.length >= 8;
    
    return hasUpperCase && hasLowerCase && hasNumbers && isLongEnough;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate password for signup
    if (authMode === 'signup' && !validatePassword(formData.password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase letters, and numbers.');
      return;
    }
    
    // Validate phone number for signup
    if (authMode === 'signup' && !/^\d{10}$/.test(formData.phone_number)) {
      setError('Phone number must be 10 digits.');
      return;
    }
    
    setLoading(true);

    try {
      const endpoint = authMode === 'login' 
        ? `${API_BASE_URL}/api/v1/user/login`
        : `${API_BASE_URL}/api/v1/user/signup`;
        
      const payload = authMode === 'login' 
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            phone_number: formData.phone_number,
            password: formData.password,
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Backend returns access_token in the response
      if (data && data.access_token) {
        // Store token in sessionStorage
        sessionStorage.setItem('access_token', data.access_token);
        
        // Session cookie is already set by the backend
        
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      
      // For redirect flow
      if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
        // For development environment, use JSON response with URL
        const response = await fetch(`${API_BASE_URL}/api/v1/user/google_signup`, {
          method: 'POST', // Use POST to get the authorization URL as JSON
          credentials: 'include'
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(data.error || 'Failed to initiate Google signup');
        }

        if (data.authorization_url) {
          window.location.href = data.authorization_url;
        } else {
          throw new Error('Invalid response from server');
        }
      } else {
        // For production, use direct redirect
        window.location.href = `${API_BASE_URL}/api/v1/user/google_signup`;
      }
    } catch (error) {
      setError('Failed to initiate Google signup');
      console.error('Google signup error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/auth/reset-password');
  };

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

            {/* Error Message */}
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 animate-slide-in"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === "signup" && (
                <>
                  <div className="animate-slide-in" style={{ animationDelay: "100ms" }}>
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
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-[#4F959D] transition duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="animate-slide-in" style={{ animationDelay: "200ms" }}>
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
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-[#4F959D] transition duration-300"
                      placeholder="1234567890"
                      pattern="[0-9]{10}"
                      title="Phone number must be 10 digits"
                      required
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Phone number must be 10 digits.
                    </p>
                  </div>
                </>
              )}

              <div className="animate-slide-in" style={{ animationDelay: authMode === "signup" ? "300ms" : "100ms" }}>
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
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-[#4F959D] transition duration-300"
                  placeholder="user@example.com"
                  required
                />
              </div>
              <div className="animate-slide-in" style={{ animationDelay: authMode === "signup" ? "400ms" : "200ms" }}>
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
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-[#4F959D] transition duration-300"
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

              {authMode === "login" && (
                <div className="flex justify-end animate-fade-in" style={{ animationDelay: "300ms" }}>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-[#4F959D] hover:text-[#205781] transition duration-300"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <div className="space-y-3 animate-slide-in" style={{ animationDelay: authMode === "signup" ? "500ms" : "300ms" }}>
                <button
                  type="submit"
                  className="w-full bg-[#205781] hover:bg-[#174668] text-white font-bold py-2 px-4 rounded-lg focus:outline-none transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : authMode === "login"
                    ? "Login"
                    : "Sign Up"}
                </button>

                <div className="flex items-center justify-center my-2">
                  <div className="border-t border-gray-300 flex-grow"></div>
                  <span className="mx-4 text-gray-500 text-sm">OR</span>
                  <div className="border-t border-gray-300 flex-grow"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}