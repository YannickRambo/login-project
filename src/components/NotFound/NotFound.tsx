import { Link } from "react-router-dom";
import "./NotFound.css";

export function NotFound() {
    return (
        <>
            <main className="notFound">
                <div>
                    <h1>404 - Page not found.</h1>
                    <Link to={"/"}>Return to Login page</Link>
                </div>
            </main>
        </>
    )
}