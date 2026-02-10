const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sales Leaderboard API",
            version: "1.0.0",
            description:
                "API that records sales transactions and generates a ranked leaderboard",
        },
        servers: [
            {
                url: "https://sales-leaderboard-api.onrender.com",
                description: "Production",
            },
            {
                url: "http://localhost:3000",
                description: "Local",
            },
        ],
    },
    apis: [
        "./src/routes/*.js",
        "./src/controllers/*.js",
    ],
};

module.exports = swaggerJSDoc(swaggerOptions);
