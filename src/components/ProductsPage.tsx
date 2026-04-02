import { useState } from 'react';
import { Header } from './Header';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { PRODUCTS, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export function ProductsPage() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.variant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            Our Products
            <small className="font-hindi text-gray-500 text-lg font-normal ml-2">हमारे उत्पाद</small>
          </h1>
          
          <div className="w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="relative aspect-square bg-gray-50 p-4 flex items-center justify-center">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain rounded-md mix-blend-multiply"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-heading font-semibold text-gray-900 line-clamp-2 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{product.variant}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-lg text-brand-green">₹{product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-brand-orange text-white p-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        )}
      </main>

      <FloatingWhatsApp />
    </div>
  );
}
