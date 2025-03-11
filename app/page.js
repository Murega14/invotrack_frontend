// app/page.js
import Link from 'next/link';
import HeroSection from './components/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-xl font-bold">Invotrack</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <Link href="#" className="hover:text-gray-700">Home</Link>
              <Link href="#" className="hover:text-gray-700">Services</Link>
              <Link href="#" className="hover:text-gray-700">About Us</Link>
            </div>

            {/* Auth Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="#" className="hover:text-gray-700 font-medium">Sign up</Link>
              <Link href="#" className="hover:text-gray-700 font-medium">Log in</Link>
              <button className="rounded-full p-2 bg-gray-900 text-white hover:bg-gray-700">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 relative">
        <HeroSection />
      </main>
    </div>
  );
}
