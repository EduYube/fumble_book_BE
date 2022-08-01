"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    try {
        const uri = process.env.MONGO_URI;
        await mongoose_1.default.connect(uri);
        return true;
    }
    catch (e) {
        console.log(e.message);
        return false;
    }
};
exports.default = connect;
