import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";
import "../styles/Register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [err, setErr] = useState("");
    const { login } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, pwd }),
            });

            if (!response.ok) throw new Error("Registration failed!");

            const data = await response.json();
            alert(`Registration successful!`);
            login(data.token);
        } catch (error) {
            setErr(error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="register-container">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} required />
                <button type="submit" onClick={handleRegister}>Register</button>
            </form>
            {err && <p>{err}</p>}
        </div>
    );
};

export default Register;
