import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="container">
        <div className="footer-content d-flex flex-column flex-md-row justify-content-between align-items-md-center">
          <div className="footer-left mb-4 mb-md-0">
            <h5 className="footer-brand mb-2">DIGI SEVA</h5>
            <p className="footer-copyright mb-0">
              &copy; 2024 DIGI SEVA. ELEVATED SERVICE DELIVERY.
            </p>
          </div>
          
          <div className="footer-right">
            <ul className="footer-links d-flex gap-4 m-0 p-0 list-unstyled">
              <li><Link to="/privacy">PRIVACY POLICY</Link></li>
              <li><Link to="/terms">TERMS OF SERVICE</Link></li>
              <li><Link to="/support">SUPPORT</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;