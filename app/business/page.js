"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlusCircle, ArrowLeft } from 'lucide-react';

export default function BusinessList() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        
        // Get the token from local storage
        const token = sessionStorage.getItem('access_token');
        
        if (!token) {
          router.push('/login');
          return;
        }
        
        const response = await fetch(`${apiBaseUrl}/api/v1/businesses`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }
        
        const data = await response.json();
        setBusinesses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [router]);

  const handleAddBusiness = () => {
    router.push('/businesses/new');
  };

  return (
    <div className="min-h-screen bg-[#F6F8D5] flex flex-col">
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#205781]"></div>
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
              className="flex items-center justify-center bg-[#205781] text-white p-6 rounded-full hover:bg-[#4F959D] transition-all duration-300 transform hover:scale-105"
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
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-[#98D2C0] hover:shadow-lg transition-shadow"
                >
                  <div className="bg-[#98D2C0] p-4">
                    <h2 className="text-xl font-semibold text-[#205781] truncate">{business.name}</h2>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Email:</span> {business.email}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-medium">Phone:</span> {business.phone_number}
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
    </div>
  );
}