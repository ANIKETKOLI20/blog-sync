import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center items-center">
        <h1 className="text-3xl font-bold">
          <Link to="/" className="hover:text-gray-300">Blog Application</Link>
        </h1>
      </div>
    </header>
  );
}

export default Header;
