const express = require("express");
const salesRoutes = require("./routes/salesRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Sales Leaderboard API running");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", salesRoutes);
app.use(errorHandler);

module.exports = app;
