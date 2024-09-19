import React from 'react';

function CategorySection() {
  const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Books'];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
      {categories.map((category, index) => (
        <div key={index} style={{ textAlign: 'center', padding: '10px' }}>
          <img src={`https://via.placeholder.com/100`} alt={category} />
          <div>{category}</div>
        </div>
      ))}
    </div>
  );
}

export default CategorySection;
