import React from 'react';

export const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">🛡️ Paysurance AI</h1>
          <p className="text-sm opacity-90">When Work Stops, Pay Doesn't</p>
        </div>

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
    </nav>
  );
};

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};

export const Button = ({ children, onClick, className = '', variant = 'primary', disabled = false }) => {
  const baseClass =
    'px-4 py-2 rounded font-medium transition disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export const Badge = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
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
      {label && <label className="block text-sm font-medium mb-2 text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
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
