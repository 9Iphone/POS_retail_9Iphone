import React from 'react';
import { CartItem } from '../types';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  onManageStock: () => void;
  total: number;
  tax: number;
  grandTotal: number;
}

export const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  onManageStock,
  total,
  tax,
  grandTotal,
}) => {
  return (
    <div className="bg-gray-50 border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <ShoppingCart size={24} className="mr-2" />
            CART
          </h2>
          {items.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-red-500 hover:text-red-700 p-1"
              title="Clear Cart"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
            <p>Your cart is empty</p>
            <p className="text-sm">Add items to get started</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 text-sm">{item.product.name}</h3>
                  <p className="text-gray-600 text-xs">${item.product.price.toFixed(2)} each</p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-red-400 hover:text-red-600 p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="font-semibold text-gray-800">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Totals & Actions */}
      <div className="bg-white border-t border-gray-200 p-4 space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8.5%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClearCart}
            disabled={items.length === 0}
            className="py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="py-3 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            PAY
          </button>
        </div>

        <button 
          onClick={onManageStock}
          className="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Manage Stock
        </button>
      </div>
    </div>
  );
};