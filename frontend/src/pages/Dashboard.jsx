import { useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";
import DashboardUI from './DashboardUI';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h2>Dashboard</h2>
            {user?.role === "guest" ? (
                <p>Welcome, Guest!</p>

            ) : (
                
                <DashboardUI/>
            )}
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
