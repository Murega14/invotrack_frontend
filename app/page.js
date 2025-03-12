import Head from 'next/head';
import { FaFileInvoiceDollar, FaUserFriends, FaChartLine, FaMobileAlt, FaFilePdf, FaGoogle, FaBell, FaDownload } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#98D2C0] to-[#205781]">
      <Head>
        <title>Invotrack | Invoice Management System</title>
        <meta name="description" content="Simple invoice management system built with Flask and SQLAlchemy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FaFileInvoiceDollar className="text-[#205781] text-2xl mr-2" />
            <h1 className="text-2xl font-bold text-[#205781]">Invotrack</h1>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="font-medium text-gray-700 hover:text-[#4F959D] transition">Features</a>
            <a href="#pricing" className="font-medium text-gray-700 hover:text-[#4F959D] transition">Pricing</a>
            <a href="#contact" className="font-medium text-gray-700 hover:text-[#4F959D] transition">Contact</a>
          </div>
          <div>
            <button className="bg-[#205781] hover:bg-[#4F959D] text-white font-medium py-2 px-6 rounded-full transition duration-300">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center">
        
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-5xl font-bold text-white mb-4">Finally,</h2>
            <h3 className="text-4xl font-bold text-white mb-6">
              a simple way to manage your invoices
            </h3>
            <p className="text-white text-lg mb-8 opacity-90">
              Invotrack helps you create, track, and manage invoices with ease. Get paid faster with automated payment processing and never miss a payment deadline again.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white hover:bg-[#F6F8D5] text-[#205781] font-medium py-3 px-8 rounded-full transition duration-300 flex items-center shadow-lg">
                <FaGoogle className="mr-2" /> Sign Up with Google
              </button>
              <button className="bg-transparent hover:bg-[#4F959D] text-white font-medium py-3 px-8 rounded-full transition duration-300 border-2 border-white">
                Learn More
              </button>
            </div>
          </div>

          
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md mx-auto">
              {/* Dashboard Header */}
              <div className="border-b pb-3 mb-4 flex justify-between items-center">
                <h3 className="font-bold text-[#205781] text-lg">Invoice Dashboard</h3>
                <div className="flex space-x-2">
                  <span className="h-3 w-3 bg-red-500 rounded-full"></span>
                  <span className="h-3 w-3 bg-[#98D2C0] rounded-full"></span>
                  <span className="h-3 w-3 bg-green-500 rounded-full"></span>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#F6F8D5] p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Outstanding</div>
                  <div className="font-bold text-[#205781] text-xl">$12,540</div>
                </div>
                <div className="bg-[#98D2C0] p-3 rounded-lg">
                  <div className="text-sm text-gray-700">Paid</div>
                  <div className="font-bold text-[#205781] text-xl">$28,390</div>
                </div>
              </div>
              
              {/* Invoice List */}
              <div className="space-y-3 mb-6">
                <div className="border rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 transition duration-200">
                  <div>
                    <div className="font-medium">ABC Company</div>
                    <div className="text-sm text-gray-500">#INV-001 · $3,200</div>
                  </div>
                  <div className="bg-[#98D2C0] text-[#205781] px-3 py-1 rounded-full text-sm font-medium">PAID</div>
                </div>
                <div className="border rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 transition duration-200">
                  <div>
                    <div className="font-medium">XYZ Ltd</div>
                    <div className="text-sm text-gray-500">#INV-002 · $4,800</div>
                  </div>
                  <div className="bg-[#F6F8D5] text-[#4F959D] px-3 py-1 rounded-full text-sm font-medium">PENDING</div>
                </div>
                <div className="border rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 transition duration-200">
                  <div>
                    <div className="font-medium">Tech Inc</div>
                    <div className="text-sm text-gray-500">#INV-003 · $2,400</div>
                  </div>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">OVERDUE</div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="bg-[#205781] text-white px-4 py-2 rounded-md flex items-center justify-center flex-1 hover:bg-[#4F959D] transition">
                  <FaFileInvoiceDollar className="mr-2" /> New Invoice
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center justify-center hover:bg-gray-200 transition">
                  <FaDownload className="mr-2" /> Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-16 text-[#205781]">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl text-center">
              <div className="bg-[#F6F8D5] rounded-full h-16 w-16 flex items-center justify-center mb-6 mx-auto">
                <FaFileInvoiceDollar className="text-[#205781] text-2xl" />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-[#205781]">Invoice Management</h4>
              <p className="text-gray-600">Create, view, and update invoices with a simple and intuitive interface.</p>
            </div>
            
            <div className="p-6 rounded-xl text-center">
              <div className="bg-[#F6F8D5] rounded-full h-16 w-16 flex items-center justify-center mb-6 mx-auto">
                <FaUserFriends className="text-[#205781] text-2xl" />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-[#205781]">Customer Management</h4>
              <p className="text-gray-600">Register and manage your customers' information in one place.</p>
            </div>
            
            <div className="p-6 rounded-xl text-center">
              <div className="bg-[#F6F8D5] rounded-full h-16 w-16 flex items-center justify-center mb-6 mx-auto">
                <FaMobileAlt className="text-[#205781] text-2xl" />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-[#205781]">M-Pesa Integration</h4>
              <p className="text-gray-600">Process payments seamlessly with integrated M-Pesa payment solution.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="bg-[#F6F8D5] py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-16 text-[#205781]">More Powerful Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="bg-[#98D2C0] rounded-full h-14 w-14 flex items-center justify-center mb-4">
                <FaChartLine className="text-[#205781] text-xl" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-[#205781]">Business Dashboard</h4>
              <p className="text-gray-600 text-sm">Get a complete overview of your business finances and invoice status.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="bg-[#98D2C0] rounded-full h-14 w-14 flex items-center justify-center mb-4">
                <FaFilePdf className="text-[#205781] text-xl" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-[#205781]">PDF Generation</h4>
              <p className="text-gray-600 text-sm">Generate professional-looking invoice PDFs with a single click.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="bg-[#98D2C0] rounded-full h-14 w-14 flex items-center justify-center mb-4">
                <FaBell className="text-[#205781] text-xl" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-[#205781]">Notifications</h4>
              <p className="text-gray-600 text-sm">Get automated notifications for invoice status updates and payments.</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#4F959D] py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Ready to simplify your invoicing?</h3>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of businesses using Invotrack to manage their invoices and get paid faster.
          </p>
          <button className="bg-white hover:bg-[#F6F8D5] text-[#205781] font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg text-lg">
            Get Started for Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#205781] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex justify-between">
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#98D2C0]">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition">Features</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition">Docs</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#98D2C0]">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition">About</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#98D2C0]">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition">Privacy</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition">Terms</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-[#4F959D] mt-10 pt-8 text-center text-gray-300">
            <p>© 2025 Invotrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}