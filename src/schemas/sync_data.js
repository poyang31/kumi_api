"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = new Schema({
    _id: String,
    content: String,
}, {
    timestamps: true,
});
