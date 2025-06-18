import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Minus, Package, Search, ArrowLeft, Edit3, Save, X, AlertTriangle } from 'lucide-react';

interface StockManagementPageProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onBack: () => void;
}

export const StockManagementPage: React.FC<StockManagementPageProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onBack,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
  });

  const categories = ['Main', 'Appetizer', 'Salad', 'Pizza', 'Dessert', 'Beverage'];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleStockUpdate = (product: Product, change: number) => {
    const newStock = Math.max(0, (product.stock || 0) + change);
    onUpdateProduct({
      ...product,
      stock: newStock,
      inStock: newStock > 0,
    });
  };

  const handleEditSave = () => {
    if (editingProduct) {
      onUpdateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      onAddProduct({
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        category: newProduct.category || 'Main',
        stock: parseInt(newProduct.stock) || 0,
        inStock: parseInt(newProduct.stock) > 0,
      });
      setNewProduct({ name: '', price: '', category: '', stock: '' });
      setShowAddForm(false);
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'text-red-600 bg-red-50', label: 'Out of Stock' };
    if (stock < 10) return { color: 'text-yellow-600 bg-yellow-50', label: 'Low Stock' };
    return { color: 'text-green-600 bg-green-50', label: 'In Stock' };
  };

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
                Stock Management
              </h1>
              <p className="text-gray-600 text-sm">Add, edit, and manage your product inventory</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center font-medium"
          >
            <Plus size={20} className="mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6 bg-white border-b border-gray-200">
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
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock || 0);
            const isEditing = editingProduct?.id === product.id;

            return (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Product Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="text-lg font-semibold text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none w-full"
                        />
                      ) : (
                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      )}
                      <div className="flex items-center mt-1">
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.01"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                            className="text-gray-600 border-b border-gray-300 focus:border-blue-500 outline-none w-20"
                          />
                        ) : (
                          <span className="text-gray-600">${product.price.toFixed(2)}</span>
                        )}
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{product.category}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (isEditing) {
                          handleEditSave();
                        } else {
                          setEditingProduct(product);
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
                    </button>
                  </div>

                  {/* Stock Status */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${stockStatus.color}`}>
                    {product.stock === 0 && <AlertTriangle size={14} className="mr-1" />}
                    {stockStatus.label}
                  </div>

                  {/* Stock Management */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Current Stock</span>
                      <span className="text-2xl font-bold text-gray-800">{product.stock || 0}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleStockUpdate(product, -1)}
                        disabled={!product.stock}
                        className="flex-1 py-3 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-medium"
                      >
                        <Minus size={18} className="mr-2" />
                        Remove
                      </button>
                      <button
                        onClick={() => handleStockUpdate(product, 1)}
                        className="flex-1 py-3 px-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center font-medium"
                      >
                        <Plus size={18} className="mr-2" />
                        Add
                      </button>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStockUpdate(product, 5)}
                        className="flex-1 py-2 px-3 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        +5
                      </button>
                      <button
                        onClick={() => handleStockUpdate(product, 10)}
                        className="flex-1 py-2 px-3 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        +10
                      </button>
                      <button
                        onClick={() => handleStockUpdate(product, 25)}
                        className="flex-1 py-2 px-3 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        +25
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Initial Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  disabled={!newProduct.name || !newProduct.price}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};