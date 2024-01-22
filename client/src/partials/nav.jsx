import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you have React Router installed

const Navbar = ({ user }) => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Montserrat:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <nav className="navbar navbar-expand-md">
        <Link className="navbar-brand" to="/">
          <img style={{ width: 'auto', minHeight: '43px' }} src="/landing_page/PennyWise_logo2.png" alt="logo" />{' '}
          <span style={{ fontFamily: "'Dancing Script', cursive" }}>PennyWise</span>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
          <i className="fa-solid fa-grip-lines" style={{ color: '#ffffff' }}></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/:user/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/:user/insights">
                Insights
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/:user/loans">
                Track Loans
              </Link>
            </li>
            <li className="nav-item mobile_only">
              <h5>
                <Link to="/logout">
                  <button style={{ color: 'white' }} className="btn-dark dropdown-item">
                    Logout
                  </button>
                </Link>
              </h5>
            </li>
          </ul>
          <ul className="navbar-nav last_nav" style={{ margin: '0', marginLeft: '65px' }}>
            <li className="nav-item dropdown desktop_only">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa-solid fa-right-from-bracket fa-lg" style={{ color: '#ffffff' }}></i>
              </a>
              <div className="dropdown-menu" aria-labelledby="userDropdown">
                <h5 className="dropdown-item">Hello {user}</h5>
                <div className="dropdown-divider"></div>
                <h5>
                  <Link to="/logout">
                    <button className="btn-dark dropdown-item">Logout</button>
                  </Link>
                </h5>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
