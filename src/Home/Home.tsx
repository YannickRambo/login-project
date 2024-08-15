import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../components/LogoutIcon";
import "./Home.css";

export function Home() {
    const [name, setName] = useState<string>("");
    const navigate = useNavigate();

    async function getUser() {
        try {
            const response = await fetch("http://localhost:5000/home", {
                credentials: "include",
            });

            if (!response.ok) {
                navigate("/");
            }

            const data = await response.json();

            const capitalizedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);

            setName(capitalizedName);
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    async function handleLogout() {
        try {
            const response = await fetch("http://localhost:5000/logout", {
                credentials: "include",
            });

            if (!response.ok) {
                return;
            }

            navigate("/");
        } catch (error) {
            return error;
        }
    }

    return (
        <main>
            <nav>
                <h1>Welcome, {name}!</h1>
                <button onClick={handleLogout}>Logout <LogoutIcon /></button>
            </nav>
        </main>
    )
}