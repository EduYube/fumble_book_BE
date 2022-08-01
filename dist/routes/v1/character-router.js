"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterRouter = void 0;
const express_1 = require("express");
const character_controller_1 = __importDefault(require("../../controller/v1/character-controller"));
const auth_1 = require("../../middleware/auth");
exports.characterRouter = (0, express_1.Router)();
exports.characterRouter.post('/create', auth_1.checkAuth, character_controller_1.default.createCharacter);
exports.characterRouter.get('/', auth_1.checkAuth, character_controller_1.default.getCharacters);
exports.characterRouter.patch('/:characterId', auth_1.checkAuth, character_controller_1.default.editCharacter);
exports.characterRouter.delete('/:characterId', auth_1.checkAuth, character_controller_1.default.deleteCharacter);
