const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4400;
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import routes
const userRoutes = require("./routes/userRoute");
const applicationRoutes = require("./routes/applicationRoutes");

// DB connection
const db = require("./config/database");
db.connect();

// ✅ CORS FIX (IMPORTANT)
app.use(
  cors({
    origin: "https://applicaton-tracker-yld7.vercel.app/", // frontend URL
    credentials: true, // allow cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/application", applicationRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
