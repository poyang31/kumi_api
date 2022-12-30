"use strict";

// Import modules
const {Router: expressRouter} = require("express");
const {issueAuthToken} = require("../utils/kumi_token");

// Export routes mapper (function)
module.exports = (ctx, r) => {
    const router = expressRouter();

    // Get client
    router.get("/client", (_, res) => {
        const secret = issueAuthToken(ctx);
        res.send({secret});
    });

    // Mount router
    r.use("/auth", router);
};
