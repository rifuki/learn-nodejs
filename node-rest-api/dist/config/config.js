"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/** Server Port */
var SERVER_PORT = Number(process.env.SERVER_PORT);
var SERVER_HOST = String(process.env.SERVER_HOST);
/** End Server Port */
/** MongoDB */
var MONGO_USERNAME = String(process.env.MONGO_USERNAME);
var MONGO_PASSWORD = String(process.env.MONGO_PASSWORD);
var MONGO_HOST = String(process.env.MONGO_HOST);
var MONGO_PORT = Number(process.env.MONGO_PORT);
var MONGO_DB = String(process.env.MONGO_DB);
var MONGO_URL = "mongodb://".concat(MONGO_USERNAME, ":").concat(MONGO_PASSWORD, "@").concat(MONGO_HOST, ":").concat(MONGO_PORT, "/").concat(MONGO_DB);
/** End MongoDB */
exports.default = {
    server: {
        host: SERVER_HOST,
        port: SERVER_PORT,
    },
    mongo: {
        db: MONGO_DB,
        url: MONGO_URL,
    },
};
