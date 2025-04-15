import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import userRoutes from "./routes/user_routes.js";
import errorHandling from "./middleware/errorHandler.js";
import { createUserTable, createProductTable, createOrderTable, createViewTable, createReviewTable } from "./data/tableGeneration.js";


dotenv.config();
const app = express();
console.log("ENV PORT:", process.env.PORT);
const port = process.env.PORT || 3301;

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api", userRoutes);

//error handling middleware
app.use(errorHandling);

//Create Table before starting server
createUserTable();
createProductTable();
createOrderTable();
createViewTable();
createReviewTable();

//Testing POSTGRES connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`);
});

//server running
app.listen(port, () => {
    console.log(`Server is running on http:localhost:${port}`);
});