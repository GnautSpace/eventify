import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";
import "../styles/Login.css";
const Login = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [err, setErr] = useState("");
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, pwd }),
            });

            if (!response.ok) throw new Error("Invalid credentials!");

            const data = await response.json();
            login(data.token);
            localStorage.setItem("token", data.token);

        } catch (error) {
            setErr(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-container">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} required />
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
            {err && <p>{err}</p>}
        </div>
    );
};

export default Login;
