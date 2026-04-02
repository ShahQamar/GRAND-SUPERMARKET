import { Menu, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" onClick={(e) => handleNavigate(e, '/')} className="font-heading font-bold text-xl text-brand-green tracking-tight">
              GRAND SUPERMARKET
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" onClick={(e) => handleNavigate(e, '/')} className="text-gray-700 hover:text-brand-green font-medium">Home</a>
            <a href="/products" onClick={(e) => handleNavigate(e, '/products')} className="text-brand-green font-medium">Products</a>
          </nav>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <a 
              href="/cart"
              onClick={(e) => handleNavigate(e, '/cart')}
              className="relative flex items-center justify-center p-2 text-gray-700 hover:text-brand-green transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-orange rounded-full">
                  {totalItems}
                </span>
              )}
            </a>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-brand-green hover:bg-gray-100 h-12 w-12 flex items-center justify-center"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" onClick={(e) => handleNavigate(e, '/')} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-brand-green hover:bg-gray-50">Home</a>
            <a href="/products" onClick={(e) => handleNavigate(e, '/products')} className="block px-3 py-3 rounded-md text-base font-medium text-brand-green bg-green-50">Products</a>
          </div>
        </div>
      )}
    </header>
  );
}
