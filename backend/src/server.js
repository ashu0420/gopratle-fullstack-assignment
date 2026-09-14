const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

const requirementRoutes = require("./routes/requirementRoutes");
const errorHandler = require("./middleware/errorHandler");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();

// Middleware
app.use(
    cors({
        origin: "https://gopratle-frontend-eta.vercel.app",
    })
  );
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "GoPratle backend is running",
    });
});
app.use("/api/requirements", requirementRoutes);


app.use(errorHandler);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;