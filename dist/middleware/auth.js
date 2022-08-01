"use strict";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-namespace */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const utils_1 = require("../utils/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            (0, utils_1.errorMessage)(res, 'Token Unauth');
        }
        const { userId } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.session = {
            userId: userId,
        };
        next();
    }
    catch (e) {
        (0, utils_1.errorMessage)(res, e);
    }
};
exports.checkAuth = checkAuth;
