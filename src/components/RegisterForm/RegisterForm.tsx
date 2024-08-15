import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormLink } from "../FormLink/FormLink";

export function RegisterForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const user = { name, email, password };

        try {
            const response = await fetch("http://localhost:5000/register", {
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

            if (result) navigate("/");
        } catch (error) {
            return error;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div>
                <label>Name:</label>
                <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>E-mail:</label>
                <input type="email" placeholder="Enter your e-mail" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Register</button>
            <FormLink description="Already have an account?" path="/" linkText="Sign in"/>
        </form>
    );
}