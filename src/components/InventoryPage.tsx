import React, { useState } from 'react';
import { Product } from '../types';
import { Package, Search, ArrowLeft, AlertTriangle } from 'lucide-react';

interface InventoryPageProps {
  products: Product[];
  onBack: () => void;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({
  products,
  onBack,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'text-red-600 bg-red-50 border-red-200', label: 'Out of Stock' };
    if (stock < 10) return { color: 'text-yellow-600 bg-yellow-50 border-yellow-200', label: 'Low Stock' };
    return { color: 'text-green-600 bg-green-50 border-green-200', label: 'In Stock' };
  };

  const totalProducts = products.length;
  const inStockProducts = products.filter(p => (p.stock || 0) > 0).length;
  const outOfStockProducts = products.filter(p => (p.stock || 0) === 0).length;
  const lowStockProducts = products.filter(p => (p.stock || 0) > 0 && (p.stock || 0) < 10).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Package size={28} className="mr-3 text-blue-600" />
                Inventory Overview
              </h1>
              <p className="text-gray-600 text-sm">View current stock levels and product information</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-800">{totalProducts}</div>
          <div className="text-sm text-gray-600">Total Products</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{inStockProducts}</div>
          <div className="text-sm text-gray-600">In Stock</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{lowStockProducts}</div>
          <div className="text-sm text-gray-600">Low Stock</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-red-600">{outOfStockProducts}</div>
          <div className="text-sm text-gray-600">Out of Stock</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 pb-6">
        <div className="relative max-w-md">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock || 0);

            return (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  {/* Product Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-gray-600">${product.price.toFixed(2)}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{product.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 border ${stockStatus.color}`}>
                    {product.stock === 0 && <AlertTriangle size={14} className="mr-1" />}
                    {stockStatus.label}
                  </div>

                  {/* Stock Display */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Current Stock</span>
                      <span className="text-2xl font-bold text-gray-800">{product.stock || 0}</span>
                    </div>

                    {/* Stock Level Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          (product.stock || 0) === 0 ? 'bg-red-500' :
                          (product.stock || 0) < 10 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ 
                          width: `${Math.min(100, ((product.stock || 0) / 50) * 100)}%` 
                        }}
                      ></div>
                    </div>

                    <div className="text-xs text-gray-500 text-center">
                      {(product.stock || 0) === 0 ? 'Needs restocking' :
                       (product.stock || 0) < 10 ? 'Running low' : 'Well stocked'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};