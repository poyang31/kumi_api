"use strict";
// Check "UUID" exists in request.
// (for Kumi only)

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Import native utils
const {isObjectPropExists} = require("../utils/native");

// Export (function)
module.exports = (req, res, next) => {
    // Check auth exists
    if (!isObjectPropExists(req, "uuid")) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
        return;
    }
    next();
};
