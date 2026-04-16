import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const Navbar = ({ user, onLogout }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-gradient-to-r from-primary-900 to-primary-800 dark:from-primary-100 dark:to-primary-200 text-white dark:text-primary-900 px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">🛡️ Paysurance AI</h1>
          <p className="text-sm opacity-90 dark:opacity-75">When Work Stops, Pay Doesn't</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-primary-800 dark:bg-primary-300 hover:bg-primary-700 dark:hover:bg-primary-400 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm">{user.name}</span>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-primary-200 rounded-lg shadow-md dark:shadow-primary-900/20 p-6 ${className}`}>
      {children}
    </div>
  );
};

export const Button = ({ children, onClick, className = '', variant = 'primary', disabled = false }) => {
  const baseClass =
    'px-4 py-2 rounded font-medium transition disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white dark:bg-primary-600 dark:hover:bg-primary-700',
    secondary: 'bg-primary-300 hover:bg-primary-400 text-primary-900 dark:bg-primary-400 dark:hover:bg-primary-500 dark:text-primary-100',
    success: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Badge = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-200',
    success: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
};

export const Input = ({ label, placeholder, type = 'text', value, onChange, className = '' }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent bg-white dark:bg-primary-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${className}`}
      />
    </div>
  );
};

export const Loading = () => {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};
