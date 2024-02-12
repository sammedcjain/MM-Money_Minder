import { IoMdLogOut } from "react-icons/io";

function Navbar(props) {
  const { user } = props;

  // console.log(user);
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Montserrat:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <nav className="navbar navbar-expand-md">
        <a className="navbar-brand" href="#">
          <img
            style={{ width: "auto", minHeight: "43px" }}
            src="/landing_page/PennyWise_logo2.png"
            alt="logo"
          />{" "}
          <span style={{ fontFamily: "'Dancing Script', cursive" }}>
            PennyWise
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <i
            className="fa-solid fa-grip-lines"
            style={{ color: "#ffffff" }}
          ></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='/user/dashboard'>
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/:user/insights">
                Insights
              </a>
            </li>
            <li className="nav-item dropdown desktop_only">
              {" "}
              <h5>
                <a href="/logout">
                  {" "}
                  <button
                    style={{ color: "white" }}
                    className="btn-dark dropdown-item"
                  >
                    Logout
                  </button>{" "}
                </a>{" "}
              </h5>{" "}
            </li>
          </ul>
          {/* <ul
            className="navbar-nav last_nav"
            style={{ marginRight: "0px", marginLeft: "65px" }}
          >
            <li className="nav-item dropdown desktop_only">
              <a
                className="nav-link dropdown-toggle"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <IoMdLogOut size={30} />
              </a>
              <div className="dropdown-menu" aria-labelledby="userDropdown">
                <h5 className="dropdown-item">Hello {user}</h5>
                <div className="dropdown-divider"></div>
                <h5>
                  <a href="/logout">
                    {" "}
                    <button className="btn-dark dropdown-item">
                      Logout
                    </button>{" "}
                  </a>{" "}
                </h5>
              </div>
            </li>
          </ul> */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
