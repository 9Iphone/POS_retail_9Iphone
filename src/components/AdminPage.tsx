import React from 'react';
import { ArrowLeft, Package, BarChart3, Settings, Users, FileText, DollarSign, Shield } from 'lucide-react';

interface AdminPageProps {
  onBack: () => void;
  onNavigateToStock: () => void;
  onNavigateToInventory: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  onBack,
  onNavigateToStock,
  onNavigateToInventory,
}) => {
  const adminSections = [
    {
      title: 'Stock Management',
      description: 'Add, edit, and manage product inventory',
      icon: Package,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      action: onNavigateToStock,
    },
    {
      title: 'Inventory Overview',
      description: 'View current stock levels and product information',
      icon: BarChart3,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      action: onNavigateToInventory,
    },
    {
      title: 'Sales Reports',
      description: 'View sales analytics and performance metrics',
      icon: FileText,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      action: () => alert('Sales Reports - Coming Soon!'),
    },
    {
      title: 'Financial Overview',
      description: 'Track revenue, expenses, and profit margins',
      icon: DollarSign,
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600',
      action: () => alert('Financial Overview - Coming Soon!'),
    },
    {
      title: 'User Management',
      description: 'Manage staff accounts and permissions',
      icon: Users,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      action: () => alert('User Management - Coming Soon!'),
    },
    {
      title: 'System Settings',
      description: 'Configure POS system preferences and settings',
      icon: Settings,
      color: 'bg-gray-500',
      hoverColor: 'hover:bg-gray-600',
      action: () => alert('System Settings - Coming Soon!'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
                <Shield size={28} className="mr-3 text-indigo-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm">Manage all aspects of your POS system</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            Administrator
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Sales</p>
                <p className="text-2xl font-bold text-gray-900">$1,247.50</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign size={24} className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Orders Today</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Package size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Staff</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Admin Functions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <button
                key={index}
                onClick={section.action}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 text-left group hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${section.color} ${section.hoverColor} transition-colors group-hover:scale-110`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-900">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-500 group-hover:text-gray-700">
                  <span>Access {section.title.toLowerCase()}</span>
                  <ArrowLeft size={16} className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-full">
                  <DollarSign size={16} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Sale completed - $24.99</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Package size={16} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Stock updated - Burger Deluxe</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Package size={16} className="text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Low stock alert - Greek Salad</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};