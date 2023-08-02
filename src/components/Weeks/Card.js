import React from 'react';

const Card = ({ week, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', }}>
      {week}
      <button style={{ marginLeft: '10px' }} className="btn btn-danger" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default Card;
