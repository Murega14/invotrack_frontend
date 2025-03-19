"use client"
import { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Calendar, ChevronDown, X, Mail, Send, Plus } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function Invoices() {
  const [invoices, setInvoices] = useState({ received: [], outgoing: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('outgoing');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState(null);
  const apiBaseUrl = "https://invotrack-2.onrender.com";

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem('access_token');
        if (!token) throw new Error('Authentication token not found');

        let outgoingUrl = `${apiBaseUrl}/api/v1/invoices`;
        let receivedUrl = `${apiBaseUrl}/api/v1/invoices/received`;

        if (statusFilter !== 'all') {
          outgoingUrl = `${apiBaseUrl}/api/v1/invoices/status/${statusFilter}`;
          receivedUrl = `${apiBaseUrl}/api/v1/invoices/received/status/${statusFilter}`;
        }

        const [outgoingResponse, receivedResponse] = await Promise.all([
          fetch(outgoingUrl, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(receivedUrl, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (!outgoingResponse.ok || !receivedResponse.ok) {
          throw new Error(`Failed to fetch invoices`);
        }

        const outgoingData = await outgoingResponse.json();
        const receivedData = await receivedResponse.json();

        setInvoices({
          outgoing: outgoingData.invoices || [],
          received: receivedData.invoices || []
        });
      } catch (err) {
        setError(err.message);
        setInvoices({ outgoing: [], received: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-[#205781] text-white p-5 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Invoices</h1>
          <Link href="/dashboard" className="flex items-center text-white hover:underline">
            <ArrowLeft className="mr-2" size={18} /> Back to Dashboard
          </Link>
        </header>

        <div className="flex border-b bg-gray-50">
          {['outgoing', 'received'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-1/2 py-3 text-center text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab ? 'border-[#205781] text-[#205781]' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'outgoing' ? <Send size={16} className="inline mr-1" /> : <Mail size={16} className="inline mr-1" />} 
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Invoices
            </button>
          ))}
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center text-gray-500">Loading invoices...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : invoices[activeTab].length === 0 ? (
            <div className="text-center text-gray-500">No invoices found.</div>
          ) : (
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-[#F6F8D5]">
                <tr>
                  <th className="border p-3 text-left text-black">Invoice Number</th>
                  <th className="border p-3 text-left text-black">Recipient/Sender</th>
                  <th className="border p-3 text-left text-black">Amount</th>
                  <th className="border p-3 text-left text-black">Issue Date</th>
                  <th className="border p-3 text-left text-black">Due Date</th>
                  <th className="border p-3 text-left text-black">Status</th>
                  <th className="border p-3 text-left text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices[activeTab].map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="border p-3 text-black">{invoice.invoice_number}</td>
                    <td className="border p-3 text-black">{activeTab === 'outgoing' ? invoice.recipient : invoice.sender || 'N/A'}</td>
                    <td className="border p-3 text-black">{invoice.amount}</td>
                    <td className="border p-3 text-black">{format(new Date(invoice.date_issued), 'dd MMM yyyy')}</td>
                    <td className="border p-3 text-black">{format(new Date(invoice.due_date), 'dd MMM yyyy')}</td>
                    <td className="border p-3 text-green-600">{invoice.status}</td>
                    <td className="border p-3">
                      <Link href={`/invoices/${invoice.id}`} className="text-[#121212] hover:underline">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Floating Add Invoice Button */}
      <Link 
        href="/invoices/create" 
        className="fixed bottom-6 right-6 bg-[#4F959D] hover:bg-[#205781] text-white p-4 rounded-full shadow-lg transition duration-200"
        title="Add new invoice"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}
