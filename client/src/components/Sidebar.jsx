import React, { useState } from 'react';
import {
  Menu,
  X,
  BarChart3,
  Users,
  Calendar,
  Briefcase,
  Target,
  Zap,
  Settings,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuth();
  const location = useLocation();

  const roleMenus = {
    'Sales Representative': [
      { label: 'Dashboard', icon: BarChart3, path: '/dashboard/sales-rep' },
      { label: 'Customers', icon: Users, path: '/customers' },
      { label: 'Activities', icon: Calendar, path: '/activities' },
      { label: 'Opportunities', icon: Target, path: '/opportunities' },
      { label: 'Performance', icon: Zap, path: '/performance' },
    ],
    'Sales Manager': [
      { label: 'Dashboard', icon: BarChart3, path: '/dashboard/sales-manager' },
      { label: 'Team Performance', icon: Users, path: '/team-performance' },
      { label: 'Territory', icon: Briefcase, path: '/territory' },
      { label: 'Leads', icon: Target, path: '/leads' },
      { label: 'Forecasts', icon: BarChart3, path: '/forecasts' },
    ],
    'Account Manager': [
      { label: 'Dashboard', icon: BarChart3, path: '/dashboard/account-manager' },
      { label: 'Customers', icon: Users, path: '/customers' },
      { label: 'Account Plans', icon: Briefcase, path: '/account-plans' },
      { label: 'Renewals', icon: Calendar, path: '/renewals' },
      { label: 'Satisfaction', icon: Zap, path: '/satisfaction' },
    ],
    'Marketing Team': [
      { label: 'Dashboard', icon: BarChart3, path: '/dashboard/marketing' },
      { label: 'Campaigns', icon: Target, path: '/campaigns' },
      { label: 'Leads', icon: Users, path: '/leads' },
      { label: 'Analytics', icon: BarChart3, path: '/analytics' },
      { label: 'Content', icon: Briefcase, path: '/content' },
    ],
    'Product Manager': [
      { label: 'Dashboard', icon: BarChart3, path: '/dashboard/product' },
      { label: 'Products', icon: Briefcase, path: '/products' },
      { label: 'Roadmap', icon: Calendar, path: '/roadmap' },
      { label: 'Feedback', icon: Users, path: '/feedback' },
      { label: 'Features', icon: Zap, path: '/features' },
    ],
    'Executive Leadership': [
      { label: 'Dashboard', icon: BarChart3, path: '/dashboard/executive' },
      { label: 'Revenue Analytics', icon: BarChart3, path: '/revenue' },
      { label: 'KPIs', icon: Target, path: '/kpis' },
      { label: 'Regional Performance', icon: Users, path: '/regional' },
      { label: 'Forecasts', icon: Calendar, path: '/forecasts' },
    ],
  };

  const menuItems = roleMenus[user?.role] || [];
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`fixed left-0 top-16 h-full bg-gray-900 text-white w-64 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:h-screen md:top-0 z-40`}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="text-sm font-medium text-gray-300">{user?.name}</div>
          <div className="text-xs text-gray-500 mt-1">{user?.role}</div>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button className="flex items-center space-x-3 w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition">
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

