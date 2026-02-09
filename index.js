const express = require("express");
const app = express();

app.use(express.json());


const salesData = { "Ram Sharma": { totalSales: 500000, deals: 12 }, };

app.get("/", (req, res) => {
    res.send("Sales Leaderboard API is running");
});

app.post("/sales", (req, res) => {
    const { agent, amount } = req.body;

    if (!agent || !amount) {
        return res.status(400).json({ message: "Agent and amount are required" });
    }

    if (!salesData[agent]) {
        salesData[agent] = { totalSales: 0, deals: 0 };
    }

    salesData[agent].totalSales += amount;
    salesData[agent].deals += 1;

    res.json({ message: "Sale added successfully" });
});

app.get("/leaderboard", (req, res) => {
    const leaderboard = Object.entries(salesData)
        .map(([name, data]) => ({
            name,
            totalSales: data.totalSales,
            totalDeals: data.deals
        }))
        .sort((a, b) => b.totalSales - a.totalSales)
        .map((agent, index) => ({
            rank: index + 1,
            ...agent
        }));

    res.json(leaderboard);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
