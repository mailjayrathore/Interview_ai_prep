const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("node:path");

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS is needed only during local development.
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }));
}

// API routes
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../../Frontend/dist");

    app.use(express.static(frontendPath));

    app.get(/.*/, (req, res, next) => {
        if (req.path.startsWith("/api/")) {
            return next();
        }

        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

module.exports = app;
