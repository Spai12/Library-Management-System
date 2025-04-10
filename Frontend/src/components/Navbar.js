import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './Logoutbutton';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/dashboard" className="text-xl font-bold">Library System</a>
        <div className="hidden md:flex space-x-4">
          <NavLink to="/books" className="hover:bg-gray-700 px-3 py-2 rounded" activeClassName="bg-gray-900">Books</NavLink>
          <NavLink to="/users" className="hover:bg-gray-700 px-3 py-2 rounded" activeClassName="bg-gray-900">Users</NavLink>
          <NavLink to="/loans" className="hover:bg-gray-700 px-3 py-2 rounded" activeClassName="bg-gray-900">Loans</NavLink>
          <NavLink to="/inventory" className="hover:bg-gray-700 px-3 py-2 rounded" activeClassName="bg-gray-900">Inventory</NavLink>
          <NavLink to="/popular-books" className="hover:bg-gray-700 px-3 py-2 rounded" activeClassName="bg-gray-900">Popular Books</NavLink>
          <NavLink to="/export" className="hover:bg-gray-700 px-3 py-2 rounded" activeClassName="bg-gray-900">Export Data</NavLink>
          <LogoutButton />
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none focus:text-gray-400"
          >
            ☰
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <NavLink to="/books" className="block px-3 py-2 rounded hover:bg-gray-700" activeClassName="bg-gray-900">Books</NavLink>
          <NavLink to="/users" className="block px-3 py-2 rounded hover:bg-gray-700" activeClassName="bg-gray-900">Users</NavLink>
          <NavLink to="/loans" className="block px-3 py-2 rounded hover:bg-gray-700" activeClassName="bg-gray-900">Loans</NavLink>
          <NavLink to="/inventory" className="block px-3 py-2 rounded hover:bg-gray-700" activeClassName="bg-gray-900">Inventory</NavLink>
          <NavLink to="/popular-books" className="block px-3 py-2 rounded hover:bg-gray-700" activeClassName="bg-gray-900">Popular Books</NavLink>
          <NavLink to="/export" className="block px-3 py-2 rounded hover:bg-gray-700" activeClassName="bg-gray-900">Export Data</NavLink>
          <LogoutButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
