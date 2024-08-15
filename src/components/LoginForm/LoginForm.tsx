import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormLink } from "../FormLink/FormLink";

export function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const user = { email, password };

        try {
            const response = await fetch("http://localhost:5000/login", {
                credentials: "include",
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const error = await response.json();
                setError(error.message);
                return;
            }

            const result = await response.json();

            const [searchedUser] = result.user;

            if (searchedUser) navigate("/home");
        } catch (error) {
            console.error(error);
            return;
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            <h1>Sign in</h1>
            <div>
                <label>E-mail:</label>
                <input type="email" placeholder="Enter your e-mail" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
            <FormLink description="Don't have an account?" path="/register" linkText="Sign up" />
        </form>
    )
}