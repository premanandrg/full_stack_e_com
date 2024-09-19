import React from 'react';
import './Card.css';

const Card = ({ title, count, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
};

export default Card;
