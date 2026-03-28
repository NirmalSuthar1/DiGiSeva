import React from 'react';
import './Home.css';

function AboutUs() {
  return (
    <section id="about" className="about-us-section container mt-5 mb-5">
      <div className="about-us-container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="about-us-content">
              <h2 className="about-us-title">About <span>Digi Seva</span></h2>
              <div className="about-us-divider"></div>
              <p className="about-us-text">
                At Digi Seva, we believe that finding reliable local help shouldn't be a hassle, and skilled service providers shouldn't struggle to find work. Born out of a desire to empower our local communities, our platform bridges the gap between traditional word-of-mouth recommendations and modern digital convenience.
              </p>
              <p className="about-us-text">
                We provide a seamless space where customers can easily discover, book, and support trusted neighborhood professionals, while giving those hardworking individuals the digital storefront they need to reach more customers and grow their businesses.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-us-visual">
              <div className="about-us-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Community and Teamwork"
                  className="about-us-img"
                />
                <div className="about-us-badge">
                  <h4>Empowering Local Communities</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
