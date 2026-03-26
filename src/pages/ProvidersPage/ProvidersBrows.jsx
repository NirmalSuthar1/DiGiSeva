import NavigationBar from "../../components/Navigation/NavigationBar";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProvidersBrows.css";
import Footer from "../../components/Footer/Footer";

function ProvidersBrows() {
    const { ptype } = useParams();
    const [providers, setProviders] = useState([]);
    const [service, setService] = useState([]);

    const GetData = async () => {
        try {
            const providersRes = await fetch(`http://localhost:5000/providers?serviceId=${ptype}`);
            const providersData = await providersRes.json();
            setProviders(providersData);

            const serviceRes = await fetch(`http://localhost:5000/services/${ptype}`);
            const serviceData = await serviceRes.json();
            setService(serviceData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        GetData();
    }, [ptype]);

    if (providers.length === 0) return <div className="text-center mt-5">Loading...</div>;

    return (
        <>
        <div className="providers-page">
            <NavigationBar />

            <div className="container py-5 mt-4">
                {/* Header Section */}
                <div className="mb-5 d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-4">
                    <div className="header-left">
                        <nav aria-label="breadcrumb" className="custom-breadcrumb">
                            <ol>
                                <li><Link to="/">HOME</Link></li>
                                <li><Link to={`/services/${service.categoryId}`}>{service.categoryId == 1 ? "TECHNICAL SERVICES" : "NON-TECHNICAL SERVICES"}</Link></li>
                                <li className="active">{service.title?.toUpperCase() || ''}</li>
                            </ol>
                        </nav>
                        <h1 className="page-title mt-4">Expert {service.title ? service.title + 's' : 'Professionals'}</h1>
                        <p className="page-subtitle text-muted mt-2 mb-0" style={{ maxWidth: '650px' }}>
                            Connect with vetted mobile specialists who turn complex ideas into seamless digital experiences. Scalable, secure, and user-centric solutions.
                        </p>
                    </div>
                    <div className="header-right d-flex gap-3">
                        <button className="btn btn-light d-flex align-items-center gap-2 px-4 py-2 shadow-sm border border-secondary-subtle" style={{ borderRadius: '30px', fontWeight: 'bold' }}>
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
                            </svg>
                            Filter
                        </button>
                        <button className="btn btn-dark px-4 py-2 text-white" style={{ borderRadius: '30px', fontWeight: 'bold', backgroundColor: '#2b2b36', border: 'none' }}>
                            Post a Requirement
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="row g-4 mb-5 pb-4">
                    {providers.map((provider, index) => {
                        // mock tags corresponding to the mock image examples for specific roles/cycles
                        const tags = ["Java", "Security", "Scalability"];
                        if (index % 3 === 0) { tags[0] = "SwiftUI"; tags[1] = "Flutter"; tags[2] = "ARKit"; }
                        else if (index % 3 === 1) { tags[0] = "React Native"; tags[1] = "Firebase"; tags[2] = "AWS"; }
                        else if (index % 3 === 2) { tags[0] = "Kotlin"; tags[1] = "Jetpack Compose"; tags[2] = "SQLite"; }

                        return (
                            <div key={provider.pid} className="col-12 col-md-6 col-lg-4">
                                <div className="provider-card p-3">
                                    <div className="card-image-wrapper position-relative">
                                        <img src={provider.image} className="card-img" alt={provider.name} />
                                        {index === 0 && (
                                            <span className="badge bg-white text-dark position-absolute top-0 end-0 m-3 px-3 py-2 shadow-sm" style={{ borderRadius: '20px', fontSize: '0.65rem', fontWeight: '800', letterSpacing: '0.5px' }}>TOP RATED</span>
                                        )}
                                    </div>
                                    <div className="card-body px-2 pt-4 pb-1">
                                        <div className="d-flex justify-content-between align-items-start mb-1">
                                            <div>
                                                <h5 className="card-name fw-bold mb-0">{provider.name}</h5>
                                                <p className="card-role text-secondary mb-0 mt-1" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{provider.role}</p>
                                            </div>
                                            <div className="text-end">
                                                <div className="exp-years fw-bolder" style={{ lineHeight: 1 }}>{provider.experience}+</div>
                                                <div className="exp-text text-muted mt-1" style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.5px' }}>YEARS EXP.</div>
                                            </div>
                                        </div>

                                        <div className="d-flex gap-2 mt-4 flex-wrap">
                                            {tags.map((tag, i) => (
                                                <span key={i} className="skill-tag">{tag}</span>
                                            ))}
                                        </div>

                                        <p className="mt-3 mb-0 text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {provider.description || "Experienced professional delivering high-quality results."}
                                        </p>

                                        <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                                            <div className="contact-info d-flex align-items-center gap-2 fw-bold text-dark" style={{ fontSize: '0.85rem' }}>
                                                <svg width="14" height="14" fill="#333" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                                </svg>
                                                +91 {provider.contact}
                                            </div>
                                            <div className="action-btn-circle">
                                                <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Banner */}
                <div className="bottom-cta p-5 rounded-5 text-center text-white mt-2 mb-5 mx-0 mx-md-4">
                    <h2 className="fw-bold mb-3 mt-4" style={{ letterSpacing: '-1px', fontSize: '2.4rem' }}>Need a custom technical team?</h2>
                    <p className="mb-5 mx-auto text-light" style={{ maxWidth: '550px', fontSize: '1.05rem', opacity: 0.8, lineHeight: 1.6 }}>
                        We help businesses hire elite app development teams on demand. From MVP to enterprise scale.
                    </p>
                    <div className="d-flex gap-3 justify-content-center flex-wrap mb-4">
                        <button className="btn btn-light px-4 py-2 fw-bold" style={{ borderRadius: '30px', fontSize: '0.95rem' }}>
                            Schedule a Consultation
                        </button>
                        <button className="btn btn-outline-light px-4 py-2 fw-bold" style={{ borderRadius: '30px', border: '1px solid rgba(255,255,255,0.3)', fontSize: '0.95rem' }}>
                            View Enterprise Plans
                        </button>
                    </div>
                </div>

            </div>
        </div>
    <Footer />
        </>
    );
}

export default ProvidersBrows;