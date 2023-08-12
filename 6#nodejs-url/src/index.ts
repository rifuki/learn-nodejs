import http, {
    IncomingHttpHeaders,
    IncomingMessage,
    ServerResponse,
} from "http";
import url from "url";
import fs from "fs";

const { log } = console;
const SERVER_PORT = 80;

class Parse_URL {
    public static main(args?: Array<string>): void {
        const address: string = `https://www.petanikode.com/search.php?year=2018&month=february`;
        const urlParse = url.parse(address, true);

        const protocol = urlParse.protocol;
        const hostname = urlParse.hostname;
        const pathname = urlParse.pathname;
        const params = urlParse.search;
        const query = urlParse.query;

        log(`protocol: ${protocol}`);
        log(`hostname: ${hostname}`);
        log(`pathname: ${pathname}`);
        log(`params  : ${params}`);

        log(query);
    }
}

class Static_Server {
    public static main(args?: Array<string>): void {
        http.createServer((request: any, response: ServerResponse): void => {
            const urlParse: { pathname: string | null } = url.parse(
                request.url,
                true
            );
            const pathname: string = String(urlParse.pathname);
            console.log(pathname);
            if (pathname === "/favicon.ico") return;

            fs.readFile(
                `./src/pages/${pathname}`,

                (err, file): void => {
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(file);
                    response.end();
                }
            );
        }).listen(SERVER_PORT);
    }
}

Static_Server.main();
