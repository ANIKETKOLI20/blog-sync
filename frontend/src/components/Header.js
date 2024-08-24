import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <h1 className="text-2xl">
          <Link to="/">Blog Application</Link>
        </h1>
      </div>
    </header>
  );
}

export default Header;
