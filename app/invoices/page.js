"use client"
import { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Calendar, ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState(null);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);

  const statusOptions = ['all', 'pending', 'paid', 'cancelled', 'overdue'];
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        
        // Get token from localStorage
        const token = sessionStorage.getItem('access_token');
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        // Base URL for fetching invoices
        let url = `${apiBaseUrl}/api/v1/invoices`;
        
        // If status filter is applied and not 'all'
        if (statusFilter && statusFilter !== 'all') {
          url = `${apiBaseUrl}/api/v1/invoices/status/${statusFilter}`;
        }
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        if (response.status === 401) {
          // Handle unauthorized access
          throw new Error('Unauthorized access. Please log in again.');
        }
        
        if (response.status === 422) {
          // Handle validation errors
          const errorData = await response.json();
          throw new Error(`Validation error: ${errorData.message || 'Please check your request'}`);
        }
        
        if (!response.ok) {
          // Handle other errors
          throw new Error(`Failed to fetch invoices: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && Array.isArray(data.invoices)) {
          setInvoices(data.invoices);
        } else if (data.message && data.message.includes('no invoices found')) {
          // Handle case where no invoices are found
          setInvoices([]);
        } else {
          // Handle unexpected response format
          console.error('Unexpected API response format:', data);
          setInvoices([]);
        }
      } catch (err) {
        console.error('Error fetching invoices:', err);
        setError(err.message);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvoices();
  }, [statusFilter, apiBaseUrl]); // Re-fetch when status filter changes

  // Apply date filter client-side
  const filteredInvoices = dateFilter
    ? invoices.filter(invoice => {
        const invoiceDate = new Date(invoice.date_issued);
        const filterDate = new Date(dateFilter);
        return invoiceDate.toDateString() === filterDate.toDateString();
      })
    : invoices;

  const clearFilters = () => {
    setStatusFilter('all');
    setDateFilter(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KSH'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'overdue':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTokenError = () => {
    // Clear token and redirect to login
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#205781] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Invoices</h1>
            <Link href="/dashboard" className="flex items-center text-[#F6F8D5] hover:text-white">
              <ArrowLeft className="mr-2" size={18} />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Section */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => setShowStatusFilter(!showStatusFilter)}
                className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Filter size={16} />
                Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                <ChevronDown size={16} />
              </button>
              
              {showStatusFilter && (
                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <ul className="py-1">
                    {statusOptions.map((status) => (
                      <li key={status}>
                        <button
                          onClick={() => {
                            setStatusFilter(status);
                            setShowStatusFilter(false);
                          }}
                          className={`block px-4 py-2 text-sm w-full text-left hover:bg-[#98D2C0] ${
                            status === statusFilter ? 'bg-[#98D2C0] text-[#205781]' : 'text-gray-700'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Date Filter */}
            <div className="relative">
              <button
                onClick={() => setShowDateFilter(!showDateFilter)}
                className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Calendar size={16} />
                {dateFilter ? format(new Date(dateFilter), 'dd MMM yyyy') : 'Date'}
                <ChevronDown size={16} />
              </button>
              
              {showDateFilter && (
                <div className="absolute mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-4">
                  <input
                    type="date"
                    value={dateFilter || ''}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => setShowDateFilter(false)}
                      className="text-sm text-[#205781] hover:text-[#4F959D]"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Clear Filters */}
            {(statusFilter !== 'all' || dateFilter) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 bg-[#F6F8D5] border border-[#98D2C0] rounded-md px-4 py-2 text-sm font-medium text-[#205781] hover:bg-[#98D2C0]"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>
          
          <Link
            href="/invoices/create"
            className="bg-[#4F959D] hover:bg-[#205781] text-white rounded-md px-4 py-2 text-sm font-medium"
          >
            Create New Invoice
          </Link>
        </div>

        {/* Invoices List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F959D] mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading invoices...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-500">{error}</p>
              {error.includes('Unauthorized') ? (
                <button
                  onClick={handleTokenError}
                  className="mt-4 bg-[#4F959D] hover:bg-[#205781] text-white px-4 py-2 rounded"
                >
                  Go to Login
                </button>
              ) : (
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 text-[#205781] hover:text-[#4F959D]"
                >
                  Try again
                </button>
              )}
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No invoices found with the current filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#F6F8D5]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#205781] uppercase tracking-wider">
                      Invoice Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#205781] uppercase tracking-wider">
                      Recipient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#205781] uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#205781] uppercase tracking-wider">
                      Issue Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#205781] uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#205781] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#205781] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#205781]">
                        {invoice.invoice_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.recipient || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(invoice.date_issued), 'dd MMM yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(invoice.due_date), 'dd MMM yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className="text-[#4F959D] hover:text-[#205781] mr-3"
                        >
                          View
                        </Link>
                        <Link
                          href={`/invoices/${invoice.id}/edit`}
                          className="text-[#4F959D] hover:text-[#205781]"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}