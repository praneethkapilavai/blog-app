import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AuthorProfile = () => {
  return (
    <div className="author-profile container mt-5 mb-5">
      <div className="d-flex flex-column align-items-center">
        {/* Navigation Tabs */}
        <ul className="nav nav-pills justify-content-center mb-4 gap-3">
          <li className="nav-item">
            <NavLink 
              to="articles" 
              className={({isActive}) => `nav-link fw-medium px-4 py-2 rounded-pill shadow-sm ${isActive ? 'active bg-primary text-white' : 'bg-white text-secondary border'}`}
            >
              Articles
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="newarticle" 
              className={({isActive}) => `nav-link fw-medium px-4 py-2 rounded-pill shadow-sm ${isActive ? 'active bg-primary text-white' : 'bg-white text-secondary border'}`}
            >
              Add New Article
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Nested component rendering */}
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthorProfile