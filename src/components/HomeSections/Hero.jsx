import React from 'react'
import './Home.css'

const PopularServices = [
    'Website Development',
    'Video Editing',
    'Graphic designer',
    'Digital Marketing',
    'Mechanical Engineer'
]
function Hero() {
    return (
        <>
            <section className='hero-section hero-section-custom'>
                <div className="position-absolute top-0 start-0 w-100 h-100 hero-overlay"></div>
                <div className='container position-relative z-1 px-4 hero-content'>
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            <h1 className='text-white mb-3 hero-title'>
                                Find the Best Local Experts in Your City.
                            </h1>
                            <p className='text-white mb-5 hero-subtitle'>
                                Book trusted, background-verified professionals for all your home, tech, and business needs.
                            </p>

                            <div className="d-flex align-items-center bg-white rounded p-1 mb-4 hero-search-container">
                                <div className="flex-grow-1 px-3">
                                    <input
                                        type="text"
                                        className="form-control border-0 shadow-none fw-medium hero-search-input"
                                        placeholder="Search for any service..."
                                    />
                                </div>
                                <button className="btn btn-dark d-flex align-items-center justify-content-center border-0 rounded hero-search-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                </button>
                            </div>

                            <div className="d-flex flex-wrap align-items-center gap-2 mb-5">
                                {PopularServices.map((service, index) => (
                                    <span key={index} className="badge border border-white border-opacity-50 text-white py-2 px-3 rounded-pill fw-normal d-flex align-items-center popular-service-badge">
                                        {service}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="ms-2" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                        </svg>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Hero