const express = require("express");
const salesRoutes = require("./routes/salesRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Sales Leaderboard API running");
});

app.use("/", salesRoutes);
app.use(errorHandler);

module.exports = app;
