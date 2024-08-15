import express from "express";
import cors from "cors";
import { router } from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
}));

app.use("/", router);

app.listen(5000);
