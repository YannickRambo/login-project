import { createUser, getUserByEmail, validateUser } from "../database.js";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: "Please, fill the empty fields" });
    }

    const validateEmail = await getUserByEmail(email);

    if (validateEmail.length > 0) {
        return res.status(400).send({ message: "E-mail already registered" });
    }

    try {
        const result = await createUser(name, email, password);

        if (!result) {
            return res.status(400).send({ message: "Couldn't be possible to create this new user" });
        }

        return res.send({ message: "Success" });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
}

export async function authenticateUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Please, fill the empty fields" });
    }

    try {
        const result = await validateUser(email, password);

        if (result.length === 0) {
            return res.status(404).send({ message: "Wrong e-mail or password" })
        }

        const [user] = result;
        const { name } = user;

        const token = jwt.sign({ name }, "secret", { expiresIn: "1d" });
        res.cookie("token", token);

        return res.send({ message: "Success", user: result });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}

export function verifyUser(req, res){
    return res.send({ name: req.name });
}

export function logoutUser(_, res){
    res.clearCookie("token");
    return res.send({ message: "Log out with success" });
}
