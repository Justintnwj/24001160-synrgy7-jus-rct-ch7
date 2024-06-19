import React from "react";

export default function Header() {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-xl">
        <div className="rectangle">

        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">BCR</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-1">
              <li className="nav-item-our">
                <a className="nav-link font" href="#">Our Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link font" href="#">Why Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link font" href="#">Testimony</a>
              </li>
              <li className="nav-item">
                <a className="nav-link font" href="#">FAQ</a>
              </li>
              <li className="nav-item">
                <button className="registerButton">
                  <a href="domain.tld/about">Register</a>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
