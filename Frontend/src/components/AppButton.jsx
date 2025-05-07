import React from 'react';

const AppButton = ({ children, onClick, type = 'button', className = '', disabled = false }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition duration-200 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default AppButton;
