import React, { useState } from 'react';
import { Header } from './Header';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'COD'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(27, 94, 32); // Brand Green
    doc.text('GRAND SUPERMARKET', 14, 22);
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('Order Summary', 14, 30);
    
    // Customer Details
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(`Name: ${formData.name}`, 14, 45);
    doc.text(`Phone: ${formData.phone}`, 14, 52);
    doc.text(`Address: ${formData.address}`, 14, 59);
    doc.text(`Payment Method: ${formData.paymentMethod}`, 14, 66);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 73);

    // Items Table
    const tableData = items.map(item => [
      item.name,
      item.variant,
      `Rs. ${item.price}`,
      item.quantity.toString(),
      `Rs. ${item.price * item.quantity}`
    ]);

    autoTable(doc, {
      startY: 85,
      head: [['Product', 'Variant', 'Price', 'Qty', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [27, 94, 32] },
      foot: [['', '', '', 'Grand Total:', `Rs. ${totalPrice}`]],
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
    });

    return doc;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsSubmitting(true);

    try {
      // 1. Generate PDF
      const pdf = generatePDF();
      pdf.save(`Order_${formData.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`);

      // 2. Prepare WhatsApp Message
      let message = `*New Order - Grand Supermarket* 🛒\n\n`;
      message += `*Customer Details:*\n`;
      message += `Name: ${formData.name}\n`;
      message += `Phone: ${formData.phone}\n`;
      message += `Address: ${formData.address}\n`;
      message += `Payment: ${formData.paymentMethod}\n\n`;
      
      message += `*Order Items:*\n`;
      items.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${item.variant})\n`;
        message += `   ${item.quantity} x ₹${item.price} = ₹${item.quantity * item.price}\n`;
      });
      
      message += `\n*Total Amount: ₹${totalPrice}*`;

      // 3. Open WhatsApp
      const whatsappUrl = `https://wa.me/918006271000?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // 4. Clear Cart
      clearCart();
      
      // Reset form
      setFormData({ name: '', phone: '', address: '', paymentMethod: 'COD' });
      
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-8">
          Your Cart
          <small className="font-hindi text-gray-500 text-lg font-normal ml-2">आपकी कार्ट</small>
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <a href="/products" className="inline-block bg-brand-green text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {items.map(item => (
                    <li key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-md flex-shrink-0 flex items-center justify-center p-2">
                        <img src={item.imageUrl} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-heading font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.variant}</p>
                        <p className="font-bold text-brand-green mt-1">₹{item.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-right sm:w-24">
                          <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-2xl font-bold text-brand-green">₹{totalPrice}</span>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green outline-none"
                        placeholder="9876543210"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green outline-none resize-none"
                        placeholder="House No, Street, Landmark, Parikshit Garh"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        required
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green outline-none bg-white"
                      >
                        <option value="COD">Cash on Delivery (COD)</option>
                        <option value="UPI">UPI (Pay on Delivery)</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-8 bg-brand-green text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-green-800 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order via WhatsApp'}
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    You will be redirected to WhatsApp to confirm your order. An order summary PDF will also be downloaded.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <FloatingWhatsApp />
    </div>
  );
}
