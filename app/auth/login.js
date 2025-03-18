"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_BASE_URL = "https://invotrack-2.onrender.com";

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
      const endpoint = `${API_BASE_URL}/api/v1/user/login`;
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login Failed');
      }

      if (data && data.access_token) {
        sessionStorage.setItem('access_token', data.access_token);
        router.replace('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/auth/reset-password');
  };

  const handleGoogleSignup = () => {
    try {
      setLoading(true);
      window.location.href = `${API_BASE_URL}/api/v1/user/google_signup`;
    } catch (error) {
      setError('Failed to initiate Google signup');
      console.error('Google signup error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
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
        <div className="animate-slide-in" style={{ animationDelay: "100ms" }}>
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
        <div className="animate-slide-in" style={{ animationDelay: "200ms" }}>
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
        </div>

        <div className="flex justify-end animate-fade-in" style={{ animationDelay: "300ms" }}>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-[#4F959D] hover:text-[#205781] transition duration-300"
          >
            Forgot password?
          </button>
        </div>

        <div className="space-y-3 animate-slide-in" style={{ animationDelay: "300ms" }}>
          <button
            type="submit"
            className="w-full bg-[#205781] hover:bg-[#174668] text-white font-bold py-2 px-4 rounded-lg focus:outline-none transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? "Processing..." : "Login"}
          </button>

          <div className="flex items-center justify-center my-2">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-4 text-gray-500 text-sm opacity-0">OR</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center opacity-0 bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
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
  );
}