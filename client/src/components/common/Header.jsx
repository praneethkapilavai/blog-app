import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Show, UserButton } from '@clerk/react'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-3">
      <div className="container-fluid px-4">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4 text-primary" to="/">
          <i className="bi bi-box-seam-fill me-2"></i>
          <span className="text-dark">Blog</span>Flow
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-2">
            
            <li className="nav-item me-3">
              <NavLink className="nav-link fw-medium text-secondary" to="/">
                Home
              </NavLink>
            </li>
            
            <Show when="signed-out">
              <li className="nav-item">
                <NavLink to="/signin" className="btn btn-light text-dark fw-medium px-4 rounded-pill">
                  Sign In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signup" className="btn btn-primary fw-medium px-4 rounded-pill shadow-sm">
                  Sign Up
                </NavLink>
              </li>
            </Show>
            
            <Show when="signed-in">
              <li className="nav-item ms-3">
                <div className="border border-2 border-primary rounded-circle p-1 d-flex">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </li>
            </Show>
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header