const express = require("express");
const { body } = require("express-validator");
const { addSale, getLeaderboard } = require("../controllers/salesController");

const router = express.Router();

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Record a sales transaction
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - agent
 *               - amount
 *             properties:
 *               agent:
 *                 type: string
 *                 example: Roshan Karki
 *               amount:
 *                 type: number
 *                 example: 150000
 *     responses:
 *       201:
 *         description: Sale recorded successfully
 *       400:
 *         description: Validation error
 */
router.post(
    "/sales",
    [
        body("agent").notEmpty().withMessage("Agent is required"),
        body("amount").isNumeric().withMessage("Amount must be a number"),
    ],
    addSale
);

/**
 * @swagger
 * /leaderboard:
 *   get:
 *     summary: Fetch sales leaderboard
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: Ranked leaderboard
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   rank:
 *                     type: number
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Roshan Karki
 *                   totalSales:
 *                     type: number
 *                     example: 300000
 *                   totalDeals:
 *                     type: number
 *                     example: 2
 */
router.get("/leaderboard", getLeaderboard);

module.exports = router;