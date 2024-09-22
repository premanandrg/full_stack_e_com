import React from 'react';
import '../components/AdminFooter.css';

const Footer = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userRole = currentUser ? currentUser.role : null;

  return (
    <footer className={`admin-footer ${userRole === 'seller' ? 'blue-footer' : 'red-footer'}`}>
      <p>© 2024 GoCart. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
