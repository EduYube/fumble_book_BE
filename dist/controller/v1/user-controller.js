"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const users_1 = __importDefault(require("../../db/schema/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../../utils/utils");
const createUser = async (req, res) => {
    const { email, first_name, last_name, alias, password } = req.body;
    const hash = await bcrypt_1.default.hash(password, 16);
    try {
        const user = await users_1.default.create({
            data: {
                email,
                first_name,
                last_name,
                alias,
                password: hash,
            },
        });
        res.send(user);
    }
    catch (e) {
        (0, utils_1.creationError)(e, res);
    }
};
const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = await users_1.default.findOne({ email });
        if (!user) {
            throw (0, utils_1.errorMessage)(res, 'user not found');
        }
        const validPassword = await bcrypt_1.default.compare(password, user.data.password);
        if (!validPassword) {
            throw (0, utils_1.errorMessage)(res, 'invalid password');
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
            email: user.data.email,
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.EXPIRES_IN,
        });
        res.send({
            token: token,
            expiresIn: parseInt(process.env.EXPIRES_IN),
        });
    }
    catch (e) {
        (0, utils_1.errorMessage)(res, e.message);
    }
};
exports.default = {
    createUser,
    login,
};
