import { Link } from "react-router-dom";
import { useContext } from "react";  
import { AuthContext } from "../AuthContext.jsx";  
import "./Header.css"; 

const Header = () => {
    const { user, isGuest, logout, guestLogin } = useContext(AuthContext); 

    return (
        <header>
            <nav>
                <div><img src="./logo.png" alt="logo"/></div>
                <ul>
                    
                    <li><Link to="/">Home</Link></li>

                    {user ? (  
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/create-event">Create Event</Link></li>
                            <button onClick={logout}>Logout</button>
                        </>
                    ) : isGuest ? (  
                        <>
                            <li><Link to="/guest-dashboard">Guest Dashboard</Link></li>
                            <button onClick={logout}>Exit Guest Mode</button>
                        </>
                    ) : (  
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <button onClick={guestLogin}>Guest Login</button>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
