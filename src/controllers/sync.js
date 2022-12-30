"use strict";

// Import modules
const {Router: expressRouter} = require("express");
const {StatusCodes} = require("http-status-codes");

const schemaSyncData = require("../schemas/sync_data");
const middlewareAccess = require("../middleware/access");

// Export routes mapper (function)
module.exports = (ctx, r) => {
    const router = expressRouter();
    router.use(middlewareAccess);

    // Get sync data
    router.get("/data", async (req, res) => {
        const SyncData = ctx.database.model("User", schemaSyncData);
        const syncData = await SyncData.findOne({author: req.uuid}).exec();
        if (!syncData) {
            res.sendStatus(StatusCodes.NOT_FOUND);
            return;
        }
        res.send(syncData);
    });

    // Put sync data
    router.put("/data", async (req, res) => {
        const {content} = req.body;
        if (!content) {
            res.sendStatus(StatusCodes.BAD_REQUEST);
            return;
        }

        const SyncData = ctx.database.model("User", schemaSyncData);
        const syncData = new SyncData({author: req.uuid, content});

        const status = await syncData.save();

        res.sendStatus(
            status ?
                StatusCodes.OK :
                StatusCodes.INTERNAL_SERVER_ERROR,
        );
    });

    // Mount router
    r.use("/sync", router);
};
