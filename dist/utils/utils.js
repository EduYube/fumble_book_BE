"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creationError = exports.errorMessage = void 0;
const mongoose_1 = require("mongoose");
const errorMessage = (res, message) => {
    res.status(401).send(message);
};
exports.errorMessage = errorMessage;
const creationError = (e, res) => {
    if (e instanceof mongoose_1.mongo.MongoError) {
        (0, exports.errorMessage)(res, e.errmsg + 'mongoError');
    }
    else {
        (0, exports.errorMessage)(res, e.message + 'createUserError');
    }
};
exports.creationError = creationError;
