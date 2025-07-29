import React from 'react';
import elementPlus from '../assets/element-plus.png';

const AddServiceButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="add-service-button"
      style={{ 
        direction: 'rtl',
        background: 'linear-gradient(135deg, #004AAD 0%, #0056cc 100%)',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '25px',
        fontWeight: '600',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0, 74, 173, 0.3)'
      }}
    >
      <img
        src={elementPlus}
        alt="Add"
        style={{ width: '16px', height: '16px' }}
      />
      <span style={{ marginRight: '8px' }}>اضافه خدمه</span>
    </button>
  );
};

export default AddServiceButton;