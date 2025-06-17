import React from 'react';
import { Product } from '../types';
import { Package } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onProductSelect(product)}
          disabled={!product.inStock}
          className={`
            relative h-24 rounded-xl border-2 transition-all duration-200 font-medium text-sm
            ${product.inStock 
              ? 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg hover:scale-105 active:scale-95 text-gray-800' 
              : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <div className="flex flex-col items-center justify-center h-full p-2">
            <Package size={20} className="mb-1 opacity-60" />
            <span className="text-center leading-tight">{product.name}</span>
            <span className="text-xs opacity-75 mt-1">${product.price.toFixed(2)}</span>
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-xl flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-500">OUT OF STOCK</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};