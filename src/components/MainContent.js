import React from 'react';
import './MainContent.css';

function MainContent() {
  return (
    <div className="mainContent">
      <div className="banner">
        <img src="banner-image.jpg" alt="Banner" />
      </div>
      <div className="product__listing">
        <h2>Top Deals</h2>
        <div className="products">
          {/* Render Product Cards here */}
        </div>
      </div>
    </div>
  );
}

export default MainContent;
