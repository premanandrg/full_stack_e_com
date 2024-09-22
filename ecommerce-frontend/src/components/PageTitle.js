import React from 'react';
import './PageTitle.css'; // Add your styles here

const PageTitle = ({ title }) => {
  return (
    <div className="page-title-container">
      <h1 className="page-title">{title}</h1>
      <hr className="page-title-divider" />
    </div>
  );
};

export default PageTitle;
