import React, { useState } from 'react';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { BottomNavigation } from './components/BottomNavigation';
import { InventoryPage } from './components/InventoryPage';
import { StockManagementPage } from './components/StockManagementPage';
import { useCart } from './hooks/useCart';
import { products as initialProducts } from './data/products';
import { Product } from './types';

function App() {
  const cart = useCart();
  const [currentPage, setCurrentPage] = useState<'pos' | 'inventory' | 'stock'>('pos');
  const [products, setProducts] = useState(initialProducts);

  const handleProductSelect = (product: Product) => {
    if (product.inStock && (product.stock || 0) > 0) {
      cart.addToCart(product);
      // Decrease stock when item is added to cart
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === product.id
            ? { ...p, stock: Math.max(0, (p.stock || 0) - 1), inStock: (p.stock || 0) > 1 }
            : p
        )
      );
    }
  };

  const handleCheckout = () => {
    alert(`Processing payment of $${cart.grandTotal.toFixed(2)}`);
    cart.clearCart();
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
  };

  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: Math.max(...products.map(p => p.id)) + 1,
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  if (currentPage === 'inventory') {
    return (
      <InventoryPage
        products={products}
        onBack={() => setCurrentPage('pos')}
      />
    );
  }

  if (currentPage === 'stock') {
    return (
      <StockManagementPage
        products={products}
        onUpdateProduct={handleUpdateProduct}
        onAddProduct={handleAddProduct}
        onBack={() => setCurrentPage('pos')}
      />
    );
  }

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
          <BottomNavigation onInventoryClick={() => setCurrentPage('inventory')} />
        </div>

        {/* Cart */}
        <div className="w-80">
          <Cart
            items={cart.items}
            onUpdateQuantity={cart.updateQuantity}
            onRemoveItem={cart.removeFromCart}
            onClearCart={cart.clearCart}
            onCheckout={handleCheckout}
            onManageStock={() => setCurrentPage('stock')}
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