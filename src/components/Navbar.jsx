import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Personal Dashboard</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/posts">Posts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/albums">Albums</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/todos">Todos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;