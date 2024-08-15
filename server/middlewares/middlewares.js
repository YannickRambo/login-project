import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const cookie = req.headers.cookie;

    if (!cookie) {
        return res.status(401).send({ message: "Not authorized" });
    }

    const token = cookie.split("=")[1];

    const decoded = jwt.verify(token, "secret");

    req.name = decoded.name;

    next();
}