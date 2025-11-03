import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container-fluid position-relative p-0">
      <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
        <NavLink to="/" className="navbar-brand p-0">
          <h1 className="m-0">
            <i className="fa fa-map-marker-alt me-3"></i>Travela
          </h1>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/aboutus"
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/ourservices"
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/travelpackages"
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
            >
              Packages
            </NavLink>

            <NavLink
              to="/ourblogs"
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
            >
              Blog
            </NavLink>

            <NavLink
              to="/contactus"
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
            >
              Contact
            </NavLink>
          </div>

          <NavLink
            to="/travelpackages"
            className="btn btn-primary rounded-pill py-2 px-4 ms-lg-4"
          >
            Book Now
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
