import "./Container.css";

export function Container({ children }: any) {
    return (
        <div className="container">
            {children}
        </div>
    )
}