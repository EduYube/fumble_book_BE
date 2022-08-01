"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable linebreak-style */
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const v1_1 = __importDefault(require("./routes/v1"));
const connection_1 = __importDefault(require("./db/connection"));
dotenv_1.default.config({ path: __dirname + '\\.env' });
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
(0, v1_1.default)(app);
(0, connection_1.default)().then((connected) => {
    if (connected) {
        app.listen(PORT, () => {
            console.log('runing on ', PORT);
        });
    }
    else {
        console.log('Error trying to connect with MongoDB');
    }
});
app.use((req, res) => {
    res.status(400).send(res);
});
