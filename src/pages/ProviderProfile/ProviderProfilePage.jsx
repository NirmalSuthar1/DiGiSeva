import React, { useState, useEffect } from 'react'
import NavBar from "../../components/Navigation/NavigationBar"
import Footer from "../../components/Footer/Footer"
import { Link, useParams } from "react-router-dom"
import "./ProviderProfilePage.css"

const StarRating = ({ rating }) => {
    return (
        <div className="d-flex align-items-center gap-1">
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill={i <= Math.round(rating) ? "#f5a623" : "#ddd"}>
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
            ))}
        </div>
    )
}

const ProviderProfilePage = () => {
    const { pid } = useParams();
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProvider = async () => {
            try {
                const res = await fetch(`http://localhost:5000/providers?pid=${pid}`);
                const data = await res.json();
                if (data && data.length > 0) {
                    setProvider(data[0]);
                } else {
                    setProvider(null);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching provider data:", error);
                setLoading(false);
            }
        };
        fetchProvider();
    }, [pid]);

    if (loading) {
        return (
            <>
                <NavBar />
                <div className="text-center mt-5 mb-5 py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading profile...</p>
                </div>
                <Footer />
            </>
        )
    }

    if (!provider || Object.keys(provider).length === 0) {
        return (
            <>
                <NavBar />
                <div className="text-center mt-5 mb-5 py-5">
                    <h3>Provider not found</h3>
                    <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <NavBar />
            <div className="profile-page">
                <div className="container py-5 mt-4">

                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb" className="profile-breadcrumb mb-4">
                        <ol>
                            <li><Link to="/">HOME</Link></li>
                            <li><Link to={`/providers/${provider.serviceId || 1}`}>DEVELOPERS</Link></li>
                            <li className="active">{provider.name.toUpperCase()}</li>
                        </ol>
                    </nav>

                    <div className="row g-5">
                        {/* LEFT COLUMN */}
                        <div className="col-lg-4">

                            {/* Profile Card */}
                            <div className="profile-card mb-4">
                                <div className="profile-avatar-wrapper">
                                    <img src={provider.image} alt={provider.name} className="profile-avatar" />
                                    <span className={`availability-badge ${provider.availability === "Available" ? "available" : "busy"}`}>
                                        {provider.availability}
                                    </span>
                                </div>
                                <div className="profile-identity mt-3">
                                    <h2 className="profile-name">{provider.name}</h2>
                                    <p className="profile-role">{provider.role}</p>
                                    <p className="profile-tagline">"{provider.tagline}"</p>
                                    <div className="d-flex align-items-center gap-2 mt-2">
                                        <StarRating rating={provider.rating} />
                                        <span className="rating-score fw-bold">{provider.rating}</span>
                                        <span className="rating-count text-muted">({provider.reviewCount} reviews)</span>
                                    </div>
                                </div>

                                <div className="profile-meta mt-4">
                                    <div className="meta-item">
                                        <svg width="14" height="14" fill="#888" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
                                        <span>{provider.location}</span>
                                    </div>
                                    <div className="meta-item">
                                        <svg width="14" height="14" fill="#888" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>
                                        <span>Responds in {provider.responseTime}</span>
                                    </div>
                                    <div className="meta-item">
                                        <svg width="14" height="14" fill="#888" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2z"/></svg>
                                        <span>{provider.languages.join(" · ")}</span>
                                    </div>
                                </div>

                                <div className="hire-rate mt-4">
                                    <span className="rate-label">Starting at</span>
                                    <span className="rate-value">{provider.hourlyRate}</span>
                                </div>

                                <button className="btn-hire w-100 mt-3">Hire {provider.name.split(" ")[0]}</button>
                                <button className="btn-message w-100 mt-2">Send a Message</button>
                            </div>

                            {/* Stats Card */}
                            <div className="stats-card mb-4">
                                <h6 className="section-label mb-3">AT A GLANCE</h6>
                                <div className="row g-3 text-center">
                                    <div className="col-4">
                                        <div className="stat-number">{provider.experience}+</div>
                                        <div className="stat-label">Yrs Exp.</div>
                                    </div>
                                    <div className="col-4">
                                        <div className="stat-number">{provider.completedJobs}</div>
                                        <div className="stat-label">Jobs Done</div>
                                    </div>
                                    <div className="col-4">
                                        <div className="stat-number">{provider.repeatClients}%</div>
                                        <div className="stat-label">Repeat Hire</div>
                                    </div>
                                </div>
                            </div>

                            {/* Certifications Card */}
                            <div className="cert-card">
                                <h6 className="section-label mb-3">CERTIFICATIONS</h6>
                                {provider.certifications.map((cert, i) => (
                                    <div key={i} className="cert-item">
                                        <div className="cert-icon">🏅</div>
                                        <div>
                                            <div className="cert-name">{cert.name}</div>
                                            <div className="cert-issuer">{cert.issuer} · {cert.year}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="col-lg-8">

                            {/* About */}
                            <div className="content-section mb-4">
                                <h5 className="section-title">About</h5>
                                <p className="about-text">{provider.about}</p>
                            </div>

                            {/* Skills */}
                            <div className="content-section mb-4">
                                <h5 className="section-title">Skills & Expertise</h5>
                                <div className="d-flex flex-wrap gap-2 mt-3">
                                    {provider.skills.map((skill, i) => (
                                        <span key={i} className="skill-chip">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Services */}
                            <div className="content-section mb-4">
                                <h5 className="section-title">Services Offered</h5>
                                <div className="row g-3 mt-1">
                                    {provider.services.map((svc, i) => (
                                        <div key={i} className="col-sm-6">
                                            <div className="serviceProvider-card">
                                                <div className="service-icon">{svc.icon}</div>
                                                <div>
                                                    <div className="service-title">{svc.title}</div>
                                                    <div className="service-desc">{svc.desc}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Experience Timeline */}
                            <div className="content-section mb-4">
                                <h5 className="section-title">Work Experience</h5>
                                <div className="timeline mt-3">
                                    {provider.experience_timeline.map((exp, i) => (
                                        <div key={i} className="timeline-item">
                                            <div className="timeline-dot" />
                                            <div className="timeline-body">
                                                <div className="d-flex justify-content-between align-items-start flex-wrap gap-1">
                                                    <div>
                                                        <div className="timeline-role">{exp.role}</div>
                                                        <div className="timeline-company">{exp.company}</div>
                                                    </div>
                                                    <span className="timeline-year">{exp.year}</span>
                                                </div>
                                                <p className="timeline-desc">{exp.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews */}
                            <div className="content-section">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="section-title mb-0">Client Reviews</h5>
                                    <div className="overall-rating">
                                        <span className="overall-score">{provider.rating}</span>
                                        <div>
                                            <StarRating rating={provider.rating} />
                                            <span className="overall-count">{provider.reviewCount} reviews</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    {provider.reviews.map((rev, i) => (
                                        <div key={i} className="review-card">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div className="d-flex align-items-center gap-3">
                                                    <img src={rev.avatar} alt={rev.name} className="reviewer-avatar" />
                                                    <div>
                                                        <div className="reviewer-name">{rev.name}</div>
                                                        <StarRating rating={rev.rating} />
                                                    </div>
                                                </div>
                                                <span className="review-date">{rev.date}</span>
                                            </div>
                                            <p className="review-text">{rev.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProviderProfilePage
