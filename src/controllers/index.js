"use strict";

// Routes
const routes = [
    require("./auth"),
    require("./sync"),
];

// Load routes
module.exports = (ctx, app) => {
    routes.forEach((c) => c(ctx, app));
};
