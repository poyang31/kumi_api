"use strict";
// Check the "secret.key" whether safe or not.

// Import fs
const fs = require("fs");

// Import constant
const constant = require("./const");

// Detect the command for generate secret
const generateCommand = process.env.RUNTIME_ENV === "container" ?
    "touch ./secret.key && " +
    "docker run -v $PWD/secret.key:/workplace/secret.key $APP_IMAGE_NAME " +
    "npm run new-secret" :
    "npm run new-secret";

// Check if "secret.key" exists
let hmacSecret;
try {
    hmacSecret = fs.readFileSync(constant.SECRET_FILENAME).toString();
} catch (e) {
    if (e.code !== "ENOENT") {
        throw e;
    }
    throw new Error(`
        JWT secret is NOT EXISTS,
        please generate one with "${generateCommand}"
    `);
}

// Check length
if (hmacSecret.length < 2048) {
    throw new Error(`
        JWT secret is NOT SAFE,
        please generate one with "${generateCommand}"
    `);
}

// Export hmacSecret (string)
module.exports = hmacSecret;
