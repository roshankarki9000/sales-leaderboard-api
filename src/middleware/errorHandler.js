const { validationResult } = require("express-validator");

module.exports = (err, req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.status(500).json({
        message: err.message || "Server Error"
    });
};
