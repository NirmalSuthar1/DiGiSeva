import NavigationBar from "../../components/Navigation/NavigationBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProvidersBrows.css";

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
        <div className="dotted-background">
            <NavigationBar />
            <div className="container mt-5 pt-3">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Browsing {service.title} from around your city</h2>
                    <p className="text-muted">Hand-picked and verified just for you</p>
                </div>

                <div className="row g-4 pb-5">
                    {/* Notice the second parameter 'index' here to handle the colors */}
                    {providers.map((provider, index) => (
                        <div key={provider.pid} className="col-12 col-md-6 col-lg-4 custom-card-wrapper">

                            <div className="custom-card">
                                {/* Floating Avatar */}
                                <div className="custom-avatar">
                                    <img src={provider.image} alt={provider.name} />
                                </div>

                                {/* Header Info */}
                                <div className="custom-header">
                                    <h2>{provider.name}</h2>
                                    <div className="custom-title">{provider.role}</div>
                                </div>

                                {/* Dynamic Color Band (Cycles 0, 1, 2) */}
                                <div className={`custom-colorband band-${index % 3}`}></div>

                                {/* Description and Stats */}
                                <div className="custom-desc">
                                    <div className="custom-stats">
                                        <span><strong>Exp:</strong> {provider.experience} Years</span>
                                        <span>•</span>
                                        <span><strong>Call:</strong> +91 {provider.contact}</span>
                                    </div>
                                    <p>{provider.description}</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProvidersBrows;