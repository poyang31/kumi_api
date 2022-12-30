"use strict";
// Validate "X-Kumi-Token" header, but it will not interrupt the request.

// To interrupt the request which without the request,
// please use "access.js" middleware.

// Import modules
const {validateAuthToken} = require("../utils/kumi_token");

// Export (function)
module.exports = (ctx) => function(req, _, next) {
    const tokenCode = req.header("X-Kumi-Token");
    if (!tokenCode) {
        next();
        return;
    }

    const [status, uuid] = validateAuthToken(ctx, tokenCode);
    if (status) {
        req.uuid = uuid;
    }
    next();
};
