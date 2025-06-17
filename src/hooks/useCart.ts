import { useState, useMemo } from 'react';
import { CartItem, Product } from '../types';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const TAX_RATE = 0.085; // 8.5% tax

  const addToCart = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totals = useMemo(() => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = total * TAX_RATE;
    const grandTotal = total + tax;
    
    return { total, tax, grandTotal };
  }, [items]);

  return {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    ...totals,
  };
};