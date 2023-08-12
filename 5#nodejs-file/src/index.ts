import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs from "fs";

const SERVER_PORT: number = 80;

class File {
    public static main(args?: Array<string>): void {
        http.createServer(function (
            request: IncomingMessage,
            response: ServerResponse
        ): void {
            fs.readFile(`./src/pages/index.html`, function (err, data): void {
                if (err) throw err;

                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(data);
                response.end();
            });
        }).listen(SERVER_PORT);
        console.log(`server is beating up at http://localhost`);
    }
}

File.main();

class FS_Append {
    public static main(args?: Array<string>): void {
        fs.appendFile(
            "./src/data/mynewfile1.txt",
            "hello append file",
            (err): void => {
                if (err) throw err;
                console.log(`saved!`);
            }
        );
    }
}

FS_Append.main();

class FS_Open {
    public static main(args?: Array<string>): void {
        fs.open("./src/data/mynewfile2.txt", "w+", (err, file): void => {
            if (err) throw err;

            const content = `Hello mynewfile2.txt`;

            fs.writeFile(file, content, (err): void => {
                if (err) throw err;
                console.log("sukses ditulis");
            });

            fs.readFile(
                "./src/data/mynewfile2.txt",
                "utf-8",
                (err, data): void => {
                    if (err) throw err;
                    console.log(data);
                }
            );
            console.log("baca dulu ya!");
        });
    }
}

FS_Open.main();

class FS_Rename {
    public static main(args?: Array<string>): void {
        fs.rename(
            "./src/data/mynewfile1.txt",
            "./src/data/mynewfile5.txt",
            (err): void => {
                if (err) throw err;
                console.log(`success rename`);
            }
        );
    }
}

FS_Rename.main();

class FS_Unlink {
    public static main(args?: Array<string>): void {
        fs.unlink("./src/data/mynewfile2.txt", (err) => {
            if (err) throw err;
            console.log(`File Deleted!`);
        });
    }
}

// FS_Unlink.main();
