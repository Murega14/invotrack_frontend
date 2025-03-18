'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [updateMessage, setUpdateMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const API_BASE_URL = "https://invotrack-2.onrender.com";

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/v1/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load user profile');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('access_token');
      await axios.put(`${API_BASE_URL}/api/v1/user/update`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setUser({
        ...user,
        name: formData.name,
        email: formData.email
      });
      setUpdateMessage('Profile updated successfully');
      setEditMode(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setUpdateMessage('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
      
      // Clear error after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      await axios.delete(`${API_BASE_URL}/api/v1/user/delete`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      sessionStorage.removeItem('token');
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete account');
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8D5]">
        <div className="w-16 h-16 border-4 border-t-[#205781] border-r-[#4F959D] border-b-[#98D2C0] border-l-[#F6F8D5] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8D5] text-[#205781]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#205781] text-white p-6">
            <h1 className="text-2xl font-bold mb-2">User Profile</h1>
            <p className="text-[#98D2C0]">Manage your account information</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
              {error}
            </div>
          )}
          
          {updateMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 m-4 rounded">
              {updateMessage}
            </div>
          )}
          
          <div className="p-6 border-b border-gray-200">
            {!editMode ? (
              <div>
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-[#4F959D] rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{user?.name}</h2>
                      <p className="text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-[#F6F8D5] p-4 rounded">
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{user?.name}</p>
                    </div>
                    <div className="bg-[#F6F8D5] p-4 rounded">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    {user?.phone_number && (
                      <div className="bg-[#F6F8D5] p-4 rounded">
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{user?.phone_number}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setEditMode(true)}
                    className="bg-[#4F959D] hover:bg-[#205781] text-white font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Edit Profile
                  </button>
                  <button 
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-white hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded border border-red-300 transition duration-300"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#4F959D]"
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#4F959D]"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-[#98D2C0] hover:bg-[#4F959D] text-[#205781] font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setFormData({
                        name: user.name,
                        email: user.email
                      });
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
          
          <div className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Account Info</h3>
            <p className="text-gray-600">
              ID: {user?.id}
            </p>
          </div>
        </div>
      </div>
      
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-[#205781] mb-4">Delete Account</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}