import http, { IncomingMessage, ServerResponse } from "http";
import fs, { cp } from "fs";
import formidable, { Fields, errors } from "formidable";
import mv from "mv";
import IncomingForm from "formidable/Formidable";
import path from "path";

const SERVER_PORT: number = 80;

class Form_Upload {
    public static main(args?: Array<string>): void {
        http.createServer(
            (
                request: IncomingMessage,
                response: ServerResponse<IncomingMessage>
            ): void => {
                if (request.url === "/upload" && request.method === "GET") {
                    const pageFile = fs.readFileSync(
                        `./src/pages${request.url}.html`
                    );
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.end(pageFile);
                } else if (
                    request.url === "/upload" &&
                    request.method === "POST"
                ) {
                    const form = new formidable.IncomingForm();

                    form.parse(request, (err, fields, files: any): void => {
                        const oldPath = files.uploadFile.filepath;
                        const originalFileName: string =
                            files.uploadFile.originalFilename;
                        const fileSplitString = originalFileName.split(".");
                        const fileExt =
                            fileSplitString[fileSplitString.length - 1];
                        const newPath = `./dist/images/${files.uploadFile.newFilename}.${fileExt}`;
                        console.log(newPath);

                        mv(oldPath, newPath, (err: any) => {
                            if (err) throw err;
                            console.log(`file uploaded successfully`);
                            return response.end("success mv");
                        });
                        // cp(oldPath, newPath, (err) => {
                        //     if (err) throw err;
                        //     return console.log("success cp");
                        // });
                    });
                } else {
                    response.writeHead(404, { "Content-Type": "text/html" });
                    response.end("404 not found");
                }
            }
        ).listen(SERVER_PORT);

        console.log(`server is beating up at http://localhost`);
    }
}

Form_Upload.main();
