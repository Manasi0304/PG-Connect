import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/property/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error("❌ Error fetching property details:", error);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    if (!property) return <div>Loading...</div>;

    return (
        <div className="property-details">
            <h1>{property.title}</h1>
            <img src={`http://localhost:5000${property.images[0]}`} alt={property.title} />
            <p>📍 {property.location}</p>
            <p>💰 ₹{property.price}</p>
            <p>{property.description}</p>
            {/* Add more details as needed */}
        </div>
    );
}

export default PropertyDetails;