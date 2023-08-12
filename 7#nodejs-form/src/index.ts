import http, { ServerResponse } from "http";
import fs from "fs";
import url from "url";
import queryString from "querystring";

const SERVER_PORT = 80;

class Form_Get {
    public static main(): void {
        http.createServer((request: any, response: ServerResponse): void => {
            const getUrl = request.url;

            const urlParse = url.parse(getUrl, true).query;
            const keyword = urlParse.keyword;
            if (keyword) {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(`Anda mencari : ${keyword}`);
                response.end();
            }
            fs.readFile("./src/pages/search.html", (err, data): void => {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(data);
                response.end();
            });
        }).listen(SERVER_PORT);
    }
}

// Form_Get.main();

class Form_Post {
    public static main(): void {
        http.createServer((request: any, response: ServerResponse): void => {
            if (request.url === "/login" && request.method === "GET") {
                fs.readFile(`./src/pages/login.html`, (err, file): void => {
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(file);
                    response.end();
                });
            } else if (request.url === "/login" && request.method === "POST") {
                let requestBody = "";

                request.on("data", (data: any) => {
                    requestBody += data;
                });
                request.on("end", (data: any) => {
                    const formData = queryString.parse(requestBody);
                    console.log(formData);
                });
                response.end();
            } else {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write("404 Not Found");
                response.end();
            }
        }).listen(SERVER_PORT);
    }
}

Form_Post.main();
