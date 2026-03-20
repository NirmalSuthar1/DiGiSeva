import { Link, NavLink } from 'react-router-dom'
import './Navigation.css'

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-glass py-3 shadow-sm" style={{ position: 'sticky', top: '0', zIndex: '1000' }}>
      <div className="container-fluid position-relative d-flex align-items-center">

        <div className="navbar-nav d-flex flex-row gap-2">
          <Link to="/" className="nav-link fw-medium">Home</Link>
          <Link to="/about" className="nav-link fw-medium">About</Link>
          <div className="nav-item custom-dropdown">
            <span className="nav-link dropdown-toggle fw-medium" style={{ cursor: "pointer" }}>
              Services
            </span>
            <ul className="custom-dropdown-menu shadow-sm border-0 mt-2">
              <li><Link className="custom-dropdown-item py-2" to="/services/1">Technical Services</Link></li>
              <li><Link className="custom-dropdown-item py-2" to="/services/0">Non-Technical Services</Link></li>
            </ul>
          </div>
          <Link to="/contact" className="nav-link disabled fw-medium">Contact</Link>
        </div>

        <Link to="/" className="navbar-brand position-absolute start-50 translate-middle-x m-0 fw-bold fs-3 " style={{ letterSpacing: '1px' }}>
          DIGI SEVA
        </Link>

        <div className="ms-auto d-none d-lg-block" style={{ width: '150px' }}></div>

      </div>
    </nav>
  )
}

export default NavigationBar
