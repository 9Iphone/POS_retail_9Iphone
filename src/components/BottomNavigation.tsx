import React from 'react';
import { Package, BarChart3, Settings, Home } from 'lucide-react';

interface BottomNavigationProps {
  onInventoryClick: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ onInventoryClick }) => {
  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-xs mx-auto">
        <button
          onClick={onInventoryClick}
          className="w-full py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors flex items-center justify-center"
        >
          <Package size={20} className="mr-2" />
          Inventory
        </button>
      </div>
    </div>
  );
};