import http, {IncomingMessage, ServerResponse} from "http";
import https from "https";
import url from "url";
const { log } = console;

class HttpJson {
    public static main(args?: String[]): void {
        http.createServer((request: IncomingMessage, response: ServerResponse): void => {
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write("{msg: 'Hello World Json!'}");
            response.end();
        }).listen(80);
        console.log(`server is beating up at http://localhost`);
    }
}

class UrlRouting {
    public static main(args?: string[]):void {
        http.createServer((request: IncomingMessage, response: ServerResponse): void => {
            response.writeHead(200, {"Content-Type": "text/html"});
            switch(request.url){
                case "/about":
                    response.write("<p style='text-transform: capitalize;'>this is the about page</p>");
                    break;
                case "/profile":
                    response.write("<p style='text-transform: capitalize;'>this is the profile page</p>");
                    break;
                case "/product":
                    response.write("<p style='text-transform: capitalize;'>this is the product page</p>");
                    break;
                default: 
                    response.write("<p style='text-transform: uppercase; font-size: 100px; text-align: center;'>404 | page not found</p>");
            }
            response.end();
        }).listen(80);  

        console.log(`server is beating up at http://localhost`);
    }
} 

class Query {
    public static main(args?: Array<string>): void {
        http.createServer((request: IncomingMessage, response: ServerResponse): void => {
            response.writeHead(200, {"Content-Type": "text/html"});
            const getUrl: string = String(request.url);
            const urlParse: any = url.parse(getUrl, true);
            const query: {id: string} = urlParse.query;

            console.log(urlParse);
            response.write(`URL: ${getUrl}`);
            response.write("<br/>");
            response.write(`Params : ${query.id}`);
            response.end();
        }).listen(80);
        console.log(`server is beating up http://localhost`)
    }
}

Query.main();