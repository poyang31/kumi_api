"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = new Schema({
    author: String,
    content: String,
    created_at: Number,
    updated_at: Number,
});
