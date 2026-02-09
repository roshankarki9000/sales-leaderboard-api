const Sale = require("../models/Sale");

// Add sale
exports.addSale = async (req, res, next) => {
    try {
        const { agent, amount } = req.body;

        const sale = await Sale.create({ agent, amount });
        res.status(201).json(sale);
    } catch (error) {
        next(error);
    }
};

// Get leaderboard
exports.getLeaderboard = async (req, res, next) => {
    try {
        const leaderboard = await Sale.aggregate([
            {
                $group: {
                    _id: "$agent",
                    totalSales: { $sum: "$amount" },
                    totalDeals: { $sum: 1 }
                }
            },
            {
                $sort: {
                    totalSales: -1,
                    totalDeals: -1
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    totalSales: 1,
                    totalDeals: 1
                }
            }
        ]);

        const ranked = leaderboard.map((agent, index) => ({
            rank: index + 1,
            ...agent
        }));

        res.json(ranked);
    } catch (error) {
        next(error);
    }
};
