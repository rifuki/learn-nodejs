"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var fs_1 = __importDefault(require("fs"));
var formidable_1 = __importDefault(require("formidable"));
var mv_1 = __importDefault(require("mv"));
var SERVER_PORT = 80;
var Form_Upload = /** @class */ (function () {
    function Form_Upload() {
    }
    Form_Upload.main = function (args) {
        http_1.default.createServer(function (request, response) {
            if (request.url === "/upload" && request.method === "GET") {
                var pageFile = fs_1.default.readFileSync("./src/pages".concat(request.url, ".html"));
                response.writeHead(200, { "Content-Type": "text/html" });
                response.end(pageFile);
            }
            else if (request.url === "/upload" &&
                request.method === "POST") {
                var form = new formidable_1.default.IncomingForm();
                form.parse(request, function (err, fields, files) {
                    var oldPath = files.uploadFile.filepath;
                    var originalFileName = files.uploadFile.originalFilename;
                    var fileSplitString = originalFileName.split(".");
                    var fileExt = fileSplitString[fileSplitString.length - 1];
                    var newPath = "./dist/images/".concat(files.uploadFile.newFilename, ".").concat(fileExt);
                    console.log(newPath);
                    (0, mv_1.default)(oldPath, newPath, function (err) {
                        if (err)
                            throw err;
                        console.log("file uploaded successfully");
                        return response.end("success mv");
                    });
                    // cp(oldPath, newPath, (err) => {
                    //     if (err) throw err;
                    //     return console.log("success cp");
                    // });
                });
            }
            else {
                response.writeHead(404, { "Content-Type": "text/html" });
                response.end("404 not found");
            }
        }).listen(SERVER_PORT);
        console.log("server is beating up at http://localhost");
    };
    return Form_Upload;
}());
Form_Upload.main();
