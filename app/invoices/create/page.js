"use client"
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function CreateInvoice() {
    const [formData, setFormData] = useState({
        business_id: '',
        due_date: '',
        items: [{
            description: '',
            quantity: '',
            unit_price: ''
        }]
    });
    const [message, setMessage] = useState({
        type: '',
        text: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...formData.items];
        updatedItems[index] = { ...updatedItems[index], [name]: value};
        setFormData({ ...formData, items: updatedItems });
    };

    const addNewItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, {
                description: '',
                quantity: '',
                unit_price: ''
            }]
        });
    };

    const removeItem = (index) => {
        const updatedItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: updatedItems });
    };

    const calculateSubtotal = () => {
        return formData.items.reduce((sum, item) => {
            const quantity = parseFloat(item.quantity) || 0;
            const unitPrice = parseFloat(item.unit_price) || 0;
            return sum + (quantity * unitPrice);
        }, 0).toFixed(2);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            const formattedData = {
                ...formData,
                due_date: formatDate(formData.due_date)
            };

            const response = await fetch('https://invotrack-2.onrender.com/api/v1/invoices/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
                },
                body: JSON.stringify(formattedData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({
                    type: 'success',
                    text: `Invoice ${data.invoice_number} created`
                });

                setFormData({
                    business_id: '',
                    due_date: '',
                    items: [{description: '', quantity: '', unit_price: ''}]
                });
            } else {
                setMessage({
                    type: 'error',
                    text: data.error || data.message || 'Failed to create invoice'
                });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: 'An error occured submitting the invoice'
            });
            console.error('Error submitting invoice', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black">
          <header className="bg-black text-white p-4">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">New Invoice</h1>
            </div>
          </header>
    
          <main className="container mx-auto p-4 mt-6">
            {message.text && (
              <div className={`p-4 mb-6 rounded-md ${
                message.type === 'success' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-white'
              }`}>
                {message.text}
              </div>
            )}
    
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-black">
              <div className="bg-gray-200 p-4 border-b">
                <div className="flex space-x-4">
                  <button className="bg-white px-4 py-2 text-black rounded-md font-medium">Basic Form</button>
                </div>
              </div>
    
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6 bg-gray-100 p-4 rounded-md">
                    <div>
                      <label className="text-sm font-medium text-black mb-2">From</label>
                      <textarea 
                        className="w-full h-24 p-2 border border-black rounded-md" 
                        placeholder="Your Company or Name\nAddress"
                      ></textarea>
                    </div>
    
                    <div>
                      <label className="text-sm font-medium text-black mb-2">Bill To</label>
                      <textarea 
                        className="w-full h-24 p-2 border border-black rounded-md" 
                        placeholder="Your customer's billing address"
                      ></textarea>
                    </div>
                  </div>
    
                  {/* Right Column */}
                  <div className="space-y-6 bg-gray-100 p-4 rounded-md">
                    <div>
                      <label className="text-sm font-medium text-black mb-2">Invoice #</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-black rounded-md"
                        defaultValue="100" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Invoice Date</label>
                      <input 
                        type="date" 
                        className="w-full p-2 border border-black rounded-md"
                        defaultValue={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Due Date</label>
                      <input 
                        type="date" 
                        className="w-full p-2 border border-black rounded-md"
                        value={formData.due_date}
                        onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
    
                {/* Invoice Items Section */}
                <div className="mt-8 bg-gray-100 p-4 rounded-md">
                  <div className="grid grid-cols-12 gap-4 mb-2 font-medium text-black">
                    <div className="col-span-6">Description</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-2">Unit Price</div>
                    <div className="col-span-1">Tax</div>
                    <div className="col-span-1"></div>
                  </div>
    
                  {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 mb-2">
                      <div className="col-span-6">
                        <textarea 
                          name="description"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border border-black rounded-md"
                          placeholder="Description"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <input 
                          type="number" 
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border border-black rounded-md"
                          placeholder="Quantity"
                          min="1"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <input 
                          type="number" 
                          name="unit_price"
                          value={item.unit_price}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border border-black rounded-md"
                          placeholder="Unit Price"
                          min="0.01"
                          step="0.01"
                          required
                        />
                      </div>
                      <div className="col-span-1">
                        <div className="bg-gray-300 p-2 text-center rounded-md text-xs">Add a Tax</div>
                      </div>
                      <div className="col-span-1">
                        {formData.items.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => removeItem(index)}
                            className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
    
                  <button 
                    type="button"
                    onClick={addNewItem}
                    className="w-full bg-gray-300 py-2 mt-4 rounded-md hover:bg-gray-400 transition"
                  >
                    Add New Item
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      );
    
    
}