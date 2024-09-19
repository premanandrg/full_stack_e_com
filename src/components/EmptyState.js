// src/components/EmptyState.js
import React from 'react';
 
const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {/* You can use an SVG or a simple text icon here */}
        <span role="img" aria-label="empty" className="empty-icon">
          🛒
        </span>
      </div>
      <h2>No Products Found</h2>
      <p>We couldn't find any products matching your criteria. Please try searching for something else.</p>
    </div>
  );
};

export default EmptyState;
