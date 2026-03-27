import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navigation.css'

function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar-modern" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="navbar-modern-inner">

        {/* Brand */}
        <Link to="/" className="brand-logo" onClick={() => setMenuOpen(false)}>
          {/*<div className="brand-icon-wrap">*/}
          {/*  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">*/}
          {/*    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  </svg>*/}
          {/*</div>*/}
          <span className="brand-text">DiGi<span className="brand-accent">Seva</span></span>
        </Link>

        {/* Desktop & Mobile Nav Links */}
        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item-link${isActive ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `nav-item-link${isActive ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>

          <div className="nav-dropdown">
            <span className="nav-item-link dropdown-trigger">
              Services
              <svg className="dropdown-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="dropdown-panel">
              <div className="dropdown-panel-inner">
                <Link className="dropdown-option" to="/services/1" onClick={() => setMenuOpen(false)}>
                  <div className="option-icon-wrap tech">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="option-title">Technical Services</div>
                    <div className="option-desc">IT &amp; digital solutions</div>
                  </div>
                </Link>
                <Link className="dropdown-option" to="/services/0" onClick={() => setMenuOpen(false)}>
                  <div className="option-icon-wrap non-tech">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="option-title">Non-Technical Services</div>
                    <div className="option-desc">Administrative &amp; support</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <span className="nav-item-link disabled-link">Contact</span>
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          <Link to="/" className="btn-get-started">
            Get Started
          </Link>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>

      {/* Mobile overlay */}
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  )
}

export default NavigationBar
