"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_router_1 = require("./user-router");
const character_router_1 = require("./character-router");
const createRoutesV1 = (app) => {
    app.use('/api/v1/users', user_router_1.userRouter);
    app.use('/api/v1/characters', character_router_1.characterRouter);
};
exports.default = createRoutesV1;
