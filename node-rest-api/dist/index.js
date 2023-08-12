"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var http_1 = __importDefault(require("http"));
var config_1 = __importDefault(require("./config/config"));
var log_1 = __importDefault(require("./library/log"));
var user_router_1 = __importDefault(require("./routes/user.router"));
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(config_1.default.mongo.url, { authSource: "admin" })
    .then(function () {
    StartServer();
    log_1.default.success("".concat(config_1.default.mongo.db, " is Connected"));
})
    .catch(function (error) { return console.log(error); });
var StartServer = function () {
    /** Initialize App */
    var app = (0, express_1.default)();
    /** End Initialize App */
    /** Midleeware */
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    /** End Middleware */
    /** Logging */
    app.use(function (request, response, next) {
        log_1.default.warn("INCOMING --> URL:[\"".concat(request.url, "\"] -- Method:[\"").concat(request.method, "\"] -- IP:[\"").concat(request.socket.remoteAddress, "\"]"));
        response.on("finish", function () {
            var statusCodeAllowed = [200, 201];
            if (statusCodeAllowed.includes(response.statusCode)) {
                log_1.default.info("INCOMING --> URL:[\"".concat(request.url, "\"] -- Method:[\"").concat(request.method, "\"] -- IP:[\"").concat(request.socket.remoteAddress, "\"] -- Status:[\"").concat(response.statusCode, "\"]"));
            }
            else if (response.statusCode === 304) {
                log_1.default.warn("INCOMING --> URL:[\"".concat(request.url, "\"] -- Method:[\"").concat(request.method, "\"] -- IP:[\"").concat(request.socket.remoteAddress, "\"] -- Status:[\"").concat(response.statusCode, "\"]"));
            }
            else {
                log_1.default.error("INCOMING --> URL:[\"".concat(request.url, "\"] -- Method:[\"").concat(request.method, "\"] -- IP:[\"").concat(request.socket.remoteAddress, "\"] -- Status:[\"").concat(response.statusCode, "\"]"));
            }
        });
        next();
    });
    /** End Logging */
    /** Rules of API */
    app.use(function (request, response, next) {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
        if (request.method === "OPTIONS") {
            response.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
            response.status(200).json({});
        }
        next();
    });
    /** End Rules of API */
    /** Routes */
    app.use("/", user_router_1.default);
    app.get("/ping", function (request, response) {
        return response.status(200).json({ msg: "PONG" });
    });
    app.use(function (request, response) {
        return response.status(404).json({ msg: "404 not found" });
    });
    /** End Routes */
    http_1.default.createServer(app).listen(config_1.default.server.port, config_1.default.server.host, function () {
        return console.log("Server is Beating Up at http://localhost:".concat(config_1.default.server.port));
    });
};
