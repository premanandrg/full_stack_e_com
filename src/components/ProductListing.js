import React from 'react';

function ProductListing({ title }) {
  const products = ['Product 1', 'Product 2', 'Product 3', 'Product 4'];

  return (
    <div style={{ margin: '20px 0' }}>
      <h2>{title}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {products.map((product, index) => (
          <div key={index} style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd' }}>
            <img src={`https://via.placeholder.com/150`} alt={product} />
            <div>{product}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;
