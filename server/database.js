import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const database = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}).promise();

export async function createUser(name, email, password) {
    try {
        const [result] = await database.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
        return result.affectedRows;
    } catch (error) {
        return error.sqlMessage;
    }
}

export async function getUserByEmail(email) {
    try {
        const [result] = await database.query("SELECT * FROM users WHERE email = ?", [email]);
        return result;
    } catch (error) {
        return error.sqlMessage;
    }
}

export async function validateUser(email, password) {
    try {
        const [result] = await database.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
        return result;
    } catch (error) {
        return error.sqlMessage;
    }
}




