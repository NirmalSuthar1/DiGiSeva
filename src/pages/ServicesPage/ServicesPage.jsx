import NavigationBar from "../../components/Navigation/NavigationBar";
import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { Row, Col } from 'reactstrap'
import '../../components/HomeSections/Home.css'
import './ServicesPage.css'
function ServicesPage() {
    const { categoryId } = useParams()
    const [services, setServices] = useState([])

    console.log(categoryId)
    const getData = async () => {
        const response = await fetch(`http://localhost:5000/services?categoryId:eq=${categoryId}`)
        const data = await response.json()
        setServices(data)
        console.log(data)
    }
    useEffect(() => {
        getData()
    }, [categoryId])

    return (
        <>
            <NavigationBar />
            <div className="services-header-banner">
                <h2 className="services-page-title">
                    {categoryId === "1" ? "TECHNICAL SERVICES" : "NON TECHNICAL SERVICES"}
                </h2>
                <p className="services-page-description">
                    {categoryId === "1"
                        ? "Precision-driven solutions for your digital and hardware needs. From expert web development and app creation to cyber security and IT support, our verified technical professionals are equipped to handle your most complex digital challenges."
                        : "Reliable assistance for lifestyle and home management. Whether you need professional cleaning, event planning, tutoring, or general home maintenance, our trusted non-technical experts are ready to make your everyday life easier."
                    }
                </p>
            </div>
            <div className="container mt-5">
                <div className="services-grid">
                    {services.map((service) => (
                        <Link to={`/providers/${service.id}`} key={service.id} className='service-item-card' style={{ textDecoration: 'none' }}>
                            <div className='service-item-image-wrapper'>
                                <img src={service.image} alt={service.title} className='service-item-image' />
                            </div>
                            <div className='service-item-content'>
                                <h3 className='service-item-title'>{service.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ServicesPage