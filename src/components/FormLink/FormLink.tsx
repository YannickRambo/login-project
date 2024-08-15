import { Link } from "react-router-dom";
import "./FormLink.css"

interface FormLinkProps {
    description: string,
    path: string,
    linkText: string,
}

export function FormLink({ description, path, linkText }: FormLinkProps) {
    return (
        <div className="link-container">
            <p>{description} <Link className="link" to={path}>{linkText}</Link></p>
        </div>
    );
}