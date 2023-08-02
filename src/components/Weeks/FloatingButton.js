import React from 'react';

const FloatingButton = ({ onClick }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#40BAD4',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '50%',
        fontSize:'20px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      +
    </div>
  );
};

export default FloatingButton;
