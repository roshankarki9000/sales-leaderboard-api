const express = require("express");
const { body } = require("express-validator");
const { addSale, getLeaderboard } = require("../controllers/salesController");

const router = express.Router();

router.post(
    "/sales",
    [
        body("agent").notEmpty().withMessage("Agent is required"),
        body("amount").isNumeric().withMessage("Amount must be a number")
    ],
    addSale
);

router.get("/leaderboard", getLeaderboard);

module.exports = router;
