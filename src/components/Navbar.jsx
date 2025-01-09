import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../index.css";

const Navbar = ({ user, onLogout }) => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const navigate = useNavigate();

  // Handle the confirmation of logout
  const handleConfirmLogout = () => {
    onLogout(); // Trigger logout passed as prop
    navigate("/"); // Redirect to login page
  };

  // Handle the logout button click, trigger confirmation
  const handleLogoutClick = () => {
    confirmAlert({
      title: "Confirm Logout",
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: handleConfirmLogout,
        },
        {
          label: "No",
          onClick: () => {}, // Do nothing when "No" is clicked
        },
      ],
    });
  };

  // Handle navbar toggle
  const handleNavbarToggle = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        {/* Hamburger Icon */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavbarCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <NavLink
          className="navbar-brand mx-auto"
          to="/dashboard"
          onClick={handleNavbarToggle}
        >
          <em><strong>Enginite</strong></em>
        </NavLink>

        {/* Collapsible Navbar Links */}
        <div
          className={`collapse navbar-collapse ${
            isNavbarCollapsed ? "" : "show"
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {/* Dashboard Link */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/dashboard"
                onClick={handleNavbarToggle}
              >
                Dashboard
              </NavLink>
            </li>

            {/* Conditional Links Based on User Role */}
            {user?.role === "HR Manager" && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/employee-management"
                    onClick={handleNavbarToggle}
                  >
                    Employee Management
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/leave-management"
                    onClick={handleNavbarToggle}
                  >
                    Leave Management
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/announcements"
                    onClick={handleNavbarToggle}
                  >
                    Announcement
                  </NavLink>
                </li>
              </>
            )}

            {user?.role === "HR Manager" && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/task-assign"
                  onClick={handleNavbarToggle}
                >
                  Task Assign
                </NavLink>
              </li>
            )}

            {user?.role === "Team Lead" && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/task-assign"
                  onClick={handleNavbarToggle}
                >
                  Task Assign
                </NavLink>
              </li>
            )}

            {/* Leave Form */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/apply-leave"
                onClick={handleNavbarToggle}
              >
                Leave Application
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <div className="d-none d-lg-block">
          {" "}
          {/* This hides the logout button on small screens */}
          <button className="btn btn-danger" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>

        {/* Logout Button inside the collapsible for small screens */}
        <div className="d-lg-none">
          {" "}
          {/* This shows the logout button on small screens */}
          <button className="btn btn-danger" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
