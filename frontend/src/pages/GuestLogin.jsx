import { useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";

const GuestLogin = () => {
    const { guestLogin } = useContext(AuthContext);

    return (
        <div>
            <button onClick={guestLogin}>Guest Login</button>
        </div>
    );
};

export default GuestLogin;
