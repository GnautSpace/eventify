import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Welcome to Event Hub</h1>
                <p>Discover and join amazing events. Connect with like-minded people and make unforgettable memories.</p>
                <div className="home-buttons">
                    {/*<button className="explore-btn">Explore Events</button>*/}
                    <button className="create-btn" onClick={()=>navigate("/create-event")}>Create Event</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
