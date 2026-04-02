import { useState, useEffect } from 'react';
import { Header } from './Header';
import { FloatingWhatsApp } from './FloatingWhatsApp';

// Mock product for demonstration
const MOCK_PRODUCT = {
  id: 'prod_123',
  name: 'Aashirvaad Select Premium Sharbati Atta, 5kg',
  hindiName: 'आशीर्वाद सेलेक्ट प्रीमियम शरबती आटा, 5 किलो',
  description: 'Made from 100% MP Sharbati wheat, Aashirvaad Select Atta absorbs more water, keeping your rotis softer for longer. Premium quality for your family.',
  price: 299,
  originalPrice: 350,
  imageUrl: 'https://picsum.photos/seed/atta/600/600',
};

export function ProductPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Product Details Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-6 flex justify-center items-center bg-gray-50">
              <img 
                src={MOCK_PRODUCT.imageUrl} 
                alt={MOCK_PRODUCT.name} 
                className="max-w-full h-auto rounded-lg object-cover"
                loading="lazy"
                width="600"
                height="600"
              />
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div className="mb-2">
                <span className="inline-block bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  15% OFF
                </span>
              </div>
              
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {MOCK_PRODUCT.name}
              </h1>
              <small className="font-hindi text-gray-500 text-base block mb-4">
                {MOCK_PRODUCT.hindiName}
              </small>
              
              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold text-brand-green">₹{MOCK_PRODUCT.price}</span>
                <span className="text-lg text-gray-400 line-through mb-1">₹{MOCK_PRODUCT.originalPrice}</span>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                {MOCK_PRODUCT.description}
              </p>
              
              <a 
                href={`https://wa.me/918006271000?text=Hi%20Grand%20Supermarket!%20I%27d%20like%20to%20order:%20${encodeURIComponent(MOCK_PRODUCT.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-green text-white text-center px-6 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
              >
                Buy Now on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      <FloatingWhatsApp />
    </div>
  );
}
