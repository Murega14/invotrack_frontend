"use client"
import React, { useState } from 'react';
import { User, CreditCard, Building2, FileText, ChevronRight, DollarSign, AlertCircle, CheckCircle2, Menu, X } from 'lucide-react';

const Dashboard = () => {
  // Sample data from your endpoint
  const dashboardData = {
    outstanding_invoices: 12,
    total_paid: 8750.50,
    total_unpaid: 3249.75
  };

  // State to control sidebar visibility on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header with hamburger */}
      <div className="md:hidden bg-gradient-to-r from-[#205781] to-[#4F959D] text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">INVOTRACK</h1>
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-lg hover:bg-black hover:bg-opacity-10"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-[#205781] to-[#4F959D] text-white transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">INVOTRACK</h1>
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-1 rounded-lg hover:bg-black hover:bg-opacity-10"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-6">
          <div className="bg-black bg-opacity-10 px-4 py-3 text-white border-l-4 border-[#F6F8D5] font-medium">
            <a href="/dashboard" className="flex items-center space-x-3">
              <User size={20} />
              <span>Dashboard</span>
            </a>
          </div>
          <div className="px-4 py-3 text-white hover:bg-black hover:bg-opacity-10 transition duration-150">
            <a href="/invoices" className="flex items-center space-x-3">
              <FileText size={20} />
              <span>Invoices</span>
            </a>
          </div>
          <div className="px-4 py-3 text-white hover:bg-black hover:bg-opacity-10 transition duration-150">
            <a href="/payments" className="flex items-center space-x-3">
              <CreditCard size={20} />
              <span>Payments</span>
            </a>
          </div>
          <div className="px-4 py-3 text-white hover:bg-black hover:bg-opacity-10 transition duration-150">
            <a href="/business" className="flex items-center space-x-3">
              <Building2 size={20} />
              <span>Businesses</span>
            </a>
          </div>
          <div className="px-4 py-3 text-white hover:bg-black hover:bg-opacity-10 transition duration-150">
            <a href="/user" className="flex items-center space-x-3">
              <User size={20} />
              <span>User Profile</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content area */}
      <div className="md:ml-64 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#205781] mb-4 md:mb-0">Dashboard Overview</h1>
          <div className="bg-[#F6F8D5] px-4 py-2 rounded-lg self-start md:self-auto">
            <span className="text-[#205781] font-medium">Welcome back!</span>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-l-4 border-[#98D2C0]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Outstanding Invoices</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#205781] mt-1">{dashboardData.outstanding_invoices}</h2>
              </div>
              <div className="bg-[#98D2C0] bg-opacity-20 p-2 md:p-3 rounded-full">
                <AlertCircle size={20} className="text-[#205781]" />
              </div>
            </div>
            <div className="mt-4">
              <a href="/invoices" className="text-[#4F959D] text-sm flex items-center">
                View all invoices <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-l-4 border-[#4F959D]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Total Paid</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#205781] mt-1">Ksh {dashboardData.total_paid.toLocaleString()}</h2>
              </div>
              <div className="bg-[#4F959D] bg-opacity-20 p-2 md:p-3 rounded-full">
                <CheckCircle2 size={20} className="text-[#205781]" />
              </div>
            </div>
            <div className="mt-4">
              <a href="/payments" className="text-[#4F959D] text-sm flex items-center">
                View payment history <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-l-4 border-[#F6F8D5]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Total Unpaid</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#205781] mt-1">Ksh {dashboardData.total_unpaid.toLocaleString()}</h2>
              </div>
              <div className="bg-[#F6F8D5] bg-opacity-70 p-2 md:p-3 rounded-full">
                <DollarSign size={20} className="text-[#205781]" />
              </div>
            </div>
            <div className="mt-4">
              <a href="/invoices?status=unpaid" className="text-[#4F959D] text-sm flex items-center">
                View unpaid invoices <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Recent activity section */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-[#205781] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="bg-[#98D2C0] bg-opacity-20 p-2 rounded-full mr-4">
                  <FileText size={18} className="text-[#205781]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Invoice #INV-2023-0042</p>
                  <p className="text-sm text-gray-500">Sent to Client A</p>
                </div>
              </div>
              <div className="pl-10 sm:pl-0 sm:text-right">
                <p className="font-medium text-[#205781]">Ksh 1,250.00</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="bg-[#4F959D] bg-opacity-20 p-2 rounded-full mr-4">
                  <CheckCircle2 size={18} className="text-[#205781]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Payment Received</p>
                  <p className="text-sm text-gray-500">From Client B</p>
                </div>
              </div>
              <div className="pl-10 sm:pl-0 sm:text-right">
                <p className="font-medium text-[#205781]">Ksh 8750.00</p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="bg-[#F6F8D5] p-2 rounded-full mr-4">
                  <AlertCircle size={18} className="text-[#205781]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Invoice #INV-2023-0041</p>
                  <p className="text-sm text-gray-500">Overdue by 5 days</p>
                </div>
              </div>
              <div className="pl-10 sm:pl-0 sm:text-right">
                <p className="font-medium text-[#205781]">Ksh 950.00</p>
                <p className="text-sm text-gray-500">Due date: Mar 12, 2025</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <a href="/activity" className="text-[#4F959D] text-sm flex items-center justify-center">
              View all activity <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
        </div>

        {/* Invoice summary section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#205781] mb-4">Invoice Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F6F8D5] bg-opacity-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-xl md:text-2xl font-bold text-[#205781]">Ksh 3,250.00</p>
              </div>
              <div className="bg-[#98D2C0] bg-opacity-20 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Last Month</p>
                <p className="text-xl md:text-2xl font-bold text-[#205781]">Ksh 4,870.00</p>
              </div>
              <div className="bg-[#4F959D] bg-opacity-20 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl md:text-2xl font-bold text-[#205781]">Ksh 1,890.00</p>
              </div>
              <div className="bg-[#205781] bg-opacity-10 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-xl md:text-2xl font-bold text-[#111212]">Ksh 1,359.75</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#205781] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
              <a href="/invoices/create" className="bg-[#205781] text-white p-3 md:p-4 rounded-lg flex items-center justify-center hover:bg-opacity-90 transition duration-150">
                <FileText size={18} className="mr-2" />
                Create Invoice
              </a>
              <a href="/payments/record" className="bg-[#4F959D] text-white p-3 md:p-4 rounded-lg flex items-center justify-center hover:bg-opacity-90 transition duration-150">
                <CreditCard size={18} className="mr-2" />
                Record Payment
              </a>
              <a href="/clients" className="bg-[#98D2C0] text-[#205781] p-3 md:p-4 rounded-lg flex items-center justify-center hover:bg-opacity-90 transition duration-150">
                <Building2 size={18} className="mr-2" />
                Manage Clients
              </a>
              <a href="/reports" className="bg-[#F6F8D5] text-[#205781] p-3 md:p-4 rounded-lg flex items-center justify-center hover:bg-opacity-90 transition duration-150">
                <FileText size={18} className="mr-2" />
                Generate Reports
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;