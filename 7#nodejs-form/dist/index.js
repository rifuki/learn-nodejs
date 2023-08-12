"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var fs_1 = __importDefault(require("fs"));
var url_1 = __importDefault(require("url"));
var querystring_1 = __importDefault(require("querystring"));
var SERVER_PORT = 80;
var Form_Get = /** @class */ (function () {
    function Form_Get() {
    }
    Form_Get.main = function () {
        http_1.default.createServer(function (request, response) {
            var getUrl = request.url;
            var urlParse = url_1.default.parse(getUrl, true).query;
            var keyword = urlParse.keyword;
            if (keyword) {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write("Anda mencari : ".concat(keyword));
                response.end();
            }
            fs_1.default.readFile("./src/pages/search.html", function (err, data) {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(data);
                response.end();
            });
        }).listen(SERVER_PORT);
    };
    return Form_Get;
}());
// Form_Get.main();
var Form_Post = /** @class */ (function () {
    function Form_Post() {
    }
    Form_Post.main = function () {
        http_1.default.createServer(function (request, response) {
            if (request.url === "/login" && request.method === "GET") {
                fs_1.default.readFile("./src/pages/login.html", function (err, file) {
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(file);
                    response.end();
                });
            }
            else if (request.url === "/login" && request.method === "POST") {
                var requestBody_1 = "";
                request.on("data", function (data) {
                    requestBody_1 += data;
                });
                request.on("end", function (data) {
                    var formData = querystring_1.default.parse(requestBody_1);
                    console.log(formData);
                });
                response.end();
            }
            else {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write("404 Not Found");
                response.end();
            }
        }).listen(SERVER_PORT);
    };
    return Form_Post;
}());
Form_Post.main();
