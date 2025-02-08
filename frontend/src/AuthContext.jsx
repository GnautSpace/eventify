import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isGuest, setIsGuest] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token, role: "user" });
        }

        const guest = localStorage.getItem("guest");
        if (guest) {
            setUser({ role: "guest" });
            setIsGuest(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setUser({ token, role: "user" });
        setIsGuest(false); 
        navigate("/dashboard");
    };

    const guestLogin = () => {
        localStorage.setItem("guest", "true");
        setUser({ role: "guest" });
        setIsGuest(true);
        navigate("/guest-dashboard"); 
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("guest");
        setUser(null);
        setIsGuest(false);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, isGuest, login, guestLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
