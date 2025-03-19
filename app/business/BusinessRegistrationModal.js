"use client"
import { useState } from "react";
import { X } from "lucide-react";

export default function BusinessRegistrationModal({ isOpen, onClose, onSuccess}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const apiBaseUrl = "https://invotrack-2.onrender.com";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Business name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.phone_number.trim()) {
            newErrors.phone_number = "phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone_number.replace(/\D/g, ''))) {
            newErrors.phone_number = "Phone number must be 10 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validateForm()) return;

        try {
            setIsSubmiting(true);
            const token = sessionStorage.getItem('access_token');
            if (!token) {
                throw new Error('Not authenticated');
            }

            const response = await fetch(`${apiBaseUrl}/api/v1/business/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || 'Failed to register business');
            }

            setFormData({name: '', email: '', phone_number: ''});
            onSuccess();
            onClose();
        } catch (error) {
            setSubmitError(error.message);
            console.error("Registration error", error);
        } finally {
            setIsSubmiting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
            {/* Header */}
            <div className="bg-[#205781] text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Register New Business</h2>
              <button 
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {submitError}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-black font-medium mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-black ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter business name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-black border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter business email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone_number" className="block text-gray-700 font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border text-black rounded-md ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter 10-digit phone number"
                />
                {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmiting}
                  className="px-4 py-2 bg-[#205781] text-white rounded-md hover:bg-[#4F959D] transition-colors disabled:bg-gray-400"
                >
                  {isSubmiting ? 'Registering...' : 'Register Business'}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}