"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const characters_1 = __importDefault(require("../../db/schema/characters"));
const utils_1 = require("../../utils/utils");
const createCharacter = async (req, res) => {
    const { name, race, charclass, level, campaign } = req.body;
    const user = req.session.userId;
    try {
        const character = await characters_1.default.create({
            data: {
                name,
                race,
                charclass,
                level,
                campaign,
                user,
            },
        });
        res.send(character);
    }
    catch (e) {
        (0, utils_1.creationError)(e, res);
    }
};
const getCharacters = async (req, res) => {
    const user = req.session.userId;
    try {
        const characters = await characters_1.default.find({ user }).select({
            __v: 0,
        });
        res.send(characters);
    }
    catch (e) {
        (0, utils_1.errorMessage)(res, e);
    }
};
const editCharacter = async (req, res) => {
    console.log('editCharacter', req.params);
    const characterId = req.params.characterId;
    const { name, race, charclass, level } = req.body;
    try {
        const editedCharacter = await characters_1.default.findById(characterId).select({
            __v: 0,
        });
        console.log(editedCharacter);
        if (editedCharacter) {
            console.log(req.body);
            const data = editedCharacter.data;
            console.log(data);
            data.name = name || data.name;
            data.race = race || data.race;
            data.charclass = charclass || data.charclass;
            data.level = level || data.level;
            res.send(editedCharacter);
        }
        else {
            (0, utils_1.errorMessage)(res, 'Something went wrong, try again in a few minutes');
        }
    }
    catch (e) {
        console.log('catch');
        (0, utils_1.errorMessage)(res, e);
    }
};
const deleteCharacter = async (req, res) => {
    const characterId = req.params.characterId;
    try {
        const deteletedCharacter = await characters_1.default.findByIdAndDelete(characterId);
        if (deteletedCharacter)
            res.send(deteletedCharacter.data.name + ' deleted');
        (0, utils_1.errorMessage)(res, 'Something went wrong, try again in a few minutes');
    }
    catch (e) {
        (0, utils_1.errorMessage)(res, e);
    }
};
exports.default = {
    createCharacter,
    getCharacters,
    editCharacter,
    deleteCharacter,
};
