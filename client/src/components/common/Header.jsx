import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top insane-header shadow-lg">
      <div className="container-fluid px-4 py-2">
        <Link className="navbar-brand fw-bold fs-3 text-gradient d-flex align-items-center gap-2" to="/">
          <i className="bi bi-rocket-takeoff-fill text-primary"></i>
          <span>BlogFlow</span>
        </Link>
        <button className="navbar-toggler custom-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <NavLink className="nav-link fs-5 fw-medium custom-nav-link" to="/">
                <i className="bi bi-house-door me-2"></i>Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fs-5 fw-medium custom-nav-link" to="/signin">
                <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
              </NavLink>
            </li>
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <Link className="btn rounded-pill px-4 py-2 fw-bold insane-btn text-white" to="/signup">
                <i className="bi bi-person-plus-fill me-2"></i>Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header