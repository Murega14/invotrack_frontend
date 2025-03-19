"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import BusinessRegistrationModal from './BusinessRegistrationModal';
import { MdEmail, MdPhone, MdBusiness } from 'react-icons/md';

export default function BusinessList() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const apiBaseUrl = "https://invotrack-2.onrender.com";

  const fetchBusinesses = async () => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem('access_token');
      if (!token) {
        router.push('/auth');
        return;
      }

      const response = await fetch(`${apiBaseUrl}/api/v1/businesses/mine`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch businesses');
      }
      const data = await response.json();
      setBusinesses(Array.isArray(data.business) ? data.business : data);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, [router]);

  const handleAddBusiness = () => {
    setIsModalOpen(true);
  };

  const handleModalSuccess = () => {
    // Refresh the business list after successful registration
    fetchBusinesses();
  };

  return (
    <div className="min-h-screen bg-[#fdfdf8] flex flex-col">
      {/* Header */}
      <header className="bg-[#205781] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Businesses</h1>
          <Link href="/dashboard">
            <button className="flex items-center gap-2 bg-[#4F959D] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all">
              <ArrowLeft size={18} />
              <span>Dashboard</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1897f8]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : businesses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-center mb-8">
              <p className="text-xl text-gray-600 mb-2">You don't have any businesses yet</p>
              <p className="text-gray-500">Start by adding your first business</p>
            </div>
            <button
              onClick={handleAddBusiness}
              className="flex items-center justify-center bg-[#2d90dd] text-white p-6 rounded-full hover:bg-[#4F959D] transition-all duration-300 transform hover:scale-105"
            >
              <PlusCircle size={48} />
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={handleAddBusiness}
                className="flex items-center gap-2 bg-[#205781] text-white px-4 py-2 rounded-md hover:bg-[#4F959D] transition-all"
              >
                <PlusCircle size={18} />
                <span>Add Business</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <div 
                  key={business.id}
                  className="bg-white rounded-lg shadow-xl shadow-black overflow-hidden border border-[#98D2C0] hover:shadow-lg transition-shadow hover:inset-shadow-zinc-800"
                >
                  <div className="bg-[#98D2C0] p-4">
                    <h2 className="text-l font-bold text-[#050505] truncate accent-cyan-400">{business.name}</h2>
                  </div>
                  <div className="p-4">
                    <p className="text-black mb-2 flex items-center gap-2">
                      <MdEmail className="text-[#205781] text-xl" />
                      {business.email}
                    </p>
                    <p className="text-black mb-4 flex items-center gap-2">
                      <MdPhone className="text-[#205781] text-xl" />
                      {business.phone_number}
                    </p>
                    <div className="flex justify-between">
                      <Link href={`/businesses/${business.id}`}>
                        <button className="text-[#205781] hover:text-[#4F959D]">
                          View Details
                        </button>
                      </Link>
                      <Link href={`/businesses/${business.id}/edit`}>
                        <button className="text-[#205781] hover:text-[#4F959D]">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Business Registration Modal */}
      <BusinessRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}