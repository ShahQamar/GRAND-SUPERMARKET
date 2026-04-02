/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ProductsPage } from './components/ProductsPage';
import { CartPage } from './components/CartPage';
import { CartProvider } from './context/CartContext';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // Simple router
  let content;
  if (currentPath === '/cart') {
    content = <CartPage />;
  } else if (currentPath === '/products') {
    content = <ProductsPage />;
  } else {
    // Default to Products page for this demo
    content = <ProductsPage />;
  }

  return (
    <CartProvider>
      {content}
    </CartProvider>
  );
}
