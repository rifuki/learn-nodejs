"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.success = function (args) {
        console.log(chalk_1.default.green("[".concat(new Date().toLocaleString(), "][INFO]"), typeof args === "string" ? chalk_1.default.greenBright(args) : args));
    };
    Log.info = function (args) {
        console.log(chalk_1.default.blue("[".concat(new Date().toLocaleString(), "][INFO]"), typeof args === "string" ? chalk_1.default.blueBright(args) : args));
    };
    Log.warn = function (args) {
        console.log(chalk_1.default.yellow("[".concat(new Date().toLocaleString(), "][INFO]"), typeof args === "string" ? chalk_1.default.yellowBright(args) : args));
    };
    Log.error = function (args) {
        console.log(chalk_1.default.red("[".concat(new Date().toLocaleString(), "][INFO]"), typeof args === "string" ? chalk_1.default.redBright(args) : args));
    };
    return Log;
}());
exports.default = Log;
