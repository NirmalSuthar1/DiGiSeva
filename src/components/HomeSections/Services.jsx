import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

function Services() {
    return (
        <section className='container mt-5 mb-5 p-5 Services-type-container' >
            <h1 className='Service-card-Header text-center mb-5 section-title'>Browse Services by Type</h1>
            <Row className="gx-4">
                <Col md="6" className='d-flex justify-content-center mb-4 mb-md-0'>
                    <Link to="/services/1" className='w-100 p-4 shadow-sm d-flex flex-column service-card' style={{ textDecoration: 'none' }}>
                        <div className='service-card-info'>
                            <h5 className='service-card-title'>Technical Services</h5>
                            <p className='service-card-text'>Precision-driven solutions for your gadgets, appliances, and digital needs. From electrical repairs to IT support</p>
                        </div>
                        <div className='service-image-container'>
                            <img
                                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=600"
                                alt="Technical Services"
                                className='service-image'
                            />
                        </div>
                    </Link>
                </Col>
                <Col md="6" className='d-flex justify-content-center'>
                    <Link to="/services/0" className='w-100 p-4 shadow-sm d-flex flex-column service-card' style={{ textDecoration: 'none' }}>
                        <div className='service-card-info'>
                            <h5 className='service-card-title'>Non-Technical Services</h5>
                            <p className='service-card-text'>Reliable assistance for lifestyle and home management. Includes cleaning, tutoring, event planning, and more.</p>
                        </div>
                        <div className='service-image-container'>
                            <img
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800&h=600"
                                alt="Non-Technical Services"
                                className='service-image'
                            />
                        </div>
                    </Link>
                </Col>
            </Row>
        </section>
    )
}

export default Services