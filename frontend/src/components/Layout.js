import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  return (
    <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <img src="logo192.png" alt="Logo" style={{ marginRight: '12px', marginLeft: '12px', height: '40px', width: '40px', objectFit: 'contain' }} />
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/save">Save</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/fetch">Fetch</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cesium">Cesium</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;