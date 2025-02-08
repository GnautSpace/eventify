import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthContext.jsx";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GuestLogin from "./pages/GuestLogin";
import Home from "./pages/Home";
import EventForm from "./pages/EventForm";
import Header from "./components/Header";
import './App.css';

const App = () => {
    return (
        <Router>
            <AuthProvider>
              <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/guest" element={<GuestLogin />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/create-event" element={<EventForm/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
