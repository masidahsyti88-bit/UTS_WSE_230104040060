import express from "express";
import studentRoutes from "./routes/students.routes.js";

const app = express();
app.use(express.json());

app.get("/api/info", (req, res) => {
    res.status(200).json({
        service: "RESTful API UTS Web Service Engineering",
        author: "Syti Masidah",
        nim: "230104040060",
        resource: "students",
        message: "API is running successfully"
    });
});

app.use("/api/students", studentRoutes);

export default app;