import React from "react";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="images/logo-1.png" height={35} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a
                  className="nav-link text-danger font-weight-bold"
                  href="/faqs"
                >
                  FAQs
                </a>
              </li>
            </ul>
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <a
                  className="nav-link text-danger font-weight-bold"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-danger font-weight-bold"
                  href="/pay"
                >
                  Pay for a service
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-danger font-weight-bold"
                  href="/privacy"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
