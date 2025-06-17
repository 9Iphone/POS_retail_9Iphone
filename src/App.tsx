import React, { useState } from 'react';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { BottomNavigation } from './components/BottomNavigation';
import { useCart } from './hooks/useCart';
import { products } from './data/products';
import { Product } from './types';

function App() {
  const cart = useCart();
  const [showInventory, setShowInventory] = useState(false);

  const handleProductSelect = (product: Product) => {
    if (product.inStock) {
      cart.addToCart(product);
    }
  };

  const handleCheckout = () => {
    // Here you would implement payment processing
    alert(`Processing payment of $${cart.grandTotal.toFixed(2)}`);
    cart.clearCart();
  };

  const handleInventoryClick = () => {
    alert('Inventory management coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Point of Sale</h1>
          <p className="text-gray-600 text-sm">Touch to select items</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Product Grid */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <ProductGrid 
              products={products} 
              onProductSelect={handleProductSelect}
            />
          </div>
          <BottomNavigation onInventoryClick={handleInventoryClick} />
        </div>

        {/* Cart */}
        <div className="w-80">
          <Cart
            items={cart.items}
            onUpdateQuantity={cart.updateQuantity}
            onRemoveItem={cart.removeFromCart}
            onClearCart={cart.clearCart}
            onCheckout={handleCheckout}
            total={cart.total}
            tax={cart.tax}
            grandTotal={cart.grandTotal}
          />
        </div>
      </div>
    </div>
  );
}

export default App;