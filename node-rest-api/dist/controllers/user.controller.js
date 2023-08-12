"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUser = exports.insertUser = exports.getUser = exports.getUsers = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var user_model_1 = __importDefault(require("../models/user.model"));
var getUsers = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, response.status(200).json(users)];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var getUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = request.params._id;
                return [4 /*yield*/, user_model_1.default.findOne({
                        _id: new mongoose_1.default.Types.ObjectId(_id),
                    })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, response.status(200).json(user)];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var insertUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, role, refresh_token, isUsernameExist, user, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = request.body, username = _a.username, password = _a.password, role = _a.role, refresh_token = _a.refresh_token;
                return [4 /*yield*/, user_model_1.default.findOne({ username: username })];
            case 1:
                isUsernameExist = _b.sent();
                if (isUsernameExist)
                    return [2 /*return*/, response
                            .status(400)
                            .json({ msg: "".concat(username, " is already taken") })];
                user = new user_model_1.default({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    username: username,
                    password: password,
                    role: role,
                    refresh_token: refresh_token,
                });
                return [4 /*yield*/, user.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, response
                        .status(201)
                        .json({ msg: "".concat(username, " succefully added") })];
            case 3:
                error_3 = _b.sent();
                return [2 /*return*/, response.status(422).json({ msg: error_3 === null || error_3 === void 0 ? void 0 : error_3._message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.insertUser = insertUser;
var editUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, _a, username, password, role, refresh_token, isUsernameExist, userFromDatabase, user, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _id = request.params._id;
                _a = request.body, username = _a.username, password = _a.password, role = _a.role, refresh_token = _a.refresh_token;
                return [4 /*yield*/, user_model_1.default.find({ username: username })];
            case 1:
                isUsernameExist = _b.sent();
                if (isUsernameExist.length !== 0)
                    return [2 /*return*/, response
                            .status(400)
                            .json({ msg: "username is already taken" })];
                return [4 /*yield*/, user_model_1.default.findOne({
                        _id: new mongoose_1.default.Types.ObjectId(_id),
                    })];
            case 2:
                userFromDatabase = _b.sent();
                return [4 /*yield*/, user_model_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(_id) }, { username: username, password: password, role: role, refresh_token: refresh_token })];
            case 3:
                user = _b.sent();
                if (user.acknowledged && user.modifiedCount >= 1)
                    return [2 /*return*/, response.status(200).json({
                            msg: "".concat(userFromDatabase.username, " successfully edited"),
                        })];
                return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                console.log(error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.editUser = editUser;
var deleteUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, findUser, _idFromDatabase, isSameUser, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                _id = request.params._id;
                return [4 /*yield*/, user_model_1.default.findOne({
                        _id: new mongoose_1.default.Types.ObjectId(_id),
                    })];
            case 1:
                findUser = _a.sent();
                _idFromDatabase = String(findUser === null || findUser === void 0 ? void 0 : findUser._id).split("\"");
                isSameUser = _idFromDatabase[0] === _id;
                if (!isSameUser)
                    return [2 /*return*/, response.status(400).json({ msg: "id: ".concat(_id, " not found") })];
                return [4 /*yield*/, user_model_1.default.deleteOne({
                        _id: new mongoose_1.default.Types.ObjectId(_id),
                    })];
            case 2:
                user = _a.sent();
                if (user.acknowledged && user.deletedCount >= 1)
                    return [2 /*return*/, response
                            .status(200)
                            .json({ msg: "".concat(findUser === null || findUser === void 0 ? void 0 : findUser.username, " successfully deleted") })];
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
