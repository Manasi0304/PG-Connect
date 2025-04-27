import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Property Listing</h1>
            <div className="home-buttons">
                <Link to="/add-property" className="btn">➕ Add New Property</Link>
                <Link to="/properties" className="btn">🏡 View All Properties</Link>
            </div>
        </div>
    );
}

export default Home;
