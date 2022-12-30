"use strict";
// Token utils of Kumi.

const {createHmac} = require("crypto");
const {v4: uuidV4} = require("uuid");
const base64url = require("base64url");

/**
 * Issue function (Auth)
 * @param {object} ctx - The context variable from app.js.
 * @return {string}
 */
function issueAuthToken(ctx) {
    const uuid = uuidV4();
    const hashHex = createHmac(
        "sha256",
        ctx.hmac_secret,
    )
        .update(uuid)
        .digest("hex");
    const realToken = [uuid, hashHex].join(";");
    return base64url(realToken);
}

/**
 * Validate function (Auth)
 * @param {object} ctx - The context variable from app.js.
 * @param {string} token - The token to valid.
 * @return {array}
 */
function validateAuthToken(ctx, token) {
    const realToken = base64url.decode(token);
    if (!realToken) {
        return [false, null];
    }
    const [uuid, untruestHash] = realToken.split(";", 2);
    if (!(uuid && untruestHash)) {
        return [false, null];
    }
    const trustedHash = createHmac("sha256", ctx.hmac_secret)
        .update(uuid)
        .digest("hex");
    return [trustedHash === untruestHash, uuid];
}

// Export (object)
module.exports = {
    issueAuthToken,
    validateAuthToken,
};
