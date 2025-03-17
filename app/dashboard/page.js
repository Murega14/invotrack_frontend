import React from 'react';
import { User, CreditCard, Building2, FileText, ChevronRight, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  // Sample data from your endpoint
  const dashboardData = {
    outstanding_invoices: 12,
    total_paid: 8750.50,
    total_unpaid: 3249.75
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-[#205781] to-[#4F959D] text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">InvoiceManager</h1>
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
            <a href="/businesses" className="flex items-center space-x-3">
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

      {/* Main content area */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#205781]">Dashboard Overview</h1>
          <div className="bg-[#F6F8D5] px-4 py-2 rounded-lg">
            <span className="text-[#205781] font-medium">Welcome back!</span>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#98D2C0]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Outstanding Invoices</p>
                <h2 className="text-3xl font-bold text-[#205781] mt-1">{dashboardData.outstanding_invoices}</h2>
              </div>
              <div className="bg-[#98D2C0] bg-opacity-20 p-3 rounded-full">
                <AlertCircle size={24} className="text-[#205781]" />
              </div>
            </div>
            <div className="mt-4">
              <a href="/invoices" className="text-[#4F959D] text-sm flex items-center">
                View all invoices <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#4F959D]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Total Paid</p>
                <h2 className="text-3xl font-bold text-[#205781] mt-1">Ksh {dashboardData.total_paid.toLocaleString()}</h2>
              </div>
              <div className="bg-[#4F959D] bg-opacity-20 p-3 rounded-full">
                <CheckCircle2 size={24} className="text-[#205781]" />
              </div>
            </div>
            <div className="mt-4">
              <a href="/payments" className="text-[#4F959D] text-sm flex items-center">
                View payment history <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#F6F8D5]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Total Unpaid</p>
                <h2 className="text-3xl font-bold text-[#205781] mt-1">Ksh {dashboardData.total_unpaid.toLocaleString()}</h2>
              </div>
              <div className="bg-[#F6F8D5] bg-opacity-70 p-3 rounded-full">
                <DollarSign size={24} className="text-[#205781]" />
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
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#205781] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center">
                <div className="bg-[#98D2C0] bg-opacity-20 p-2 rounded-full mr-4">
                  <FileText size={20} className="text-[#205781]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Invoice #INV-2023-0042</p>
                  <p className="text-sm text-gray-500">Sent to Client A</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#205781]">Ksh 1,250.00</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center">
                <div className="bg-[#4F959D] bg-opacity-20 p-2 rounded-full mr-4">
                  <CheckCircle2 size={20} className="text-[#205781]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Payment Received</p>
                  <p className="text-sm text-gray-500">From Client B</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#205781]">Ksh 8750.00</p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-[#F6F8D5] p-2 rounded-full mr-4">
                  <AlertCircle size={20} className="text-[#205781]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Invoice #INV-2023-0041</p>
                  <p className="text-sm text-gray-500">Overdue by 5 days</p>
                </div>
              </div>
              <div className="text-right">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#205781] mb-4">Invoice Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F6F8D5] bg-opacity-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-[#205781]">Ksh 3,250.00</p>
              </div>
              <div className="bg-[#98D2C0] bg-opacity-20 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Last Month</p>
                <p className="text-2xl font-bold text-[#205781]">Ksh 4,870.00</p>
              </div>
              <div className="bg-[#4F959D] bg-opacity-20 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-[#205781]">Ksh 1,890.00</p>
              </div>
              <div className="bg-[#205781] bg-opacity-10 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-2xl font-bold text-[#111212]">Ksh 1,359.75</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#205781] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <a href="/invoices/create" className="bg-[#205781] text-white p-4 rounded-lg flex items-center justify-center hover:bg-opacity-90 transition duration-150">
                <FileText size={20} className="mr-2" />
                Create Invoice
              </a>
              <a href="/payments/record" className="bg-[#4F959D] text-white p-4 rounded-lg flex items-center justify-center hover:bg-opacity-90 transition duration-150">
                <CreditCard size={20} className="mr-2" />
                Record Payment
              </a>
              <a href="/clients" className="bg-[#98D2C0] text-[#205781] p-4 rounded-lg flex items-center justify-center hover:bg-opacity-90 transition duration-150">
                <Building2 size={20} className="mr-2" />
                Manage Clients
              </a>
              <a href="/reports" className="bg-[#F6F8D5] text-[#205781] p-4 rounded-lg flex items-center justify-center hover:bg-opacity-90 transition duration-150">
                <FileText size={20} className="mr-2" />
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