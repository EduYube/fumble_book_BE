"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    data: {
        name: { type: String, required: true },
        race: { type: String, required: false },
        charclass: { type: String, required: false },
        level: { type: Number, required: true },
        user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    },
});
const Characters = (0, mongoose_1.model)('character', schema);
exports.default = Characters;
