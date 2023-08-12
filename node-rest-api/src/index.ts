import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import http from "http";
import config from "./config/config";
import Log from "./library/log";
import userRouter from "./routes/user.router";

mongoose.set("strictQuery", false);
mongoose
    .connect(config.mongo.url, { authSource: "admin" })
    .then((): void => {
        StartServer();
        Log.success(`${config.mongo.db} is Connected`);
    })
    .catch((error) => console.log(error));

const StartServer = (): void => {
    /** Initialize App */
    const app: Application = express();
    /** End Initialize App */

    /** Midleeware */
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    /** End Middleware */

    /** Logging */
    app.use(
        (request: Request, response: Response, next: NextFunction): void => {
            Log.warn(
                `INCOMING --> URL:["${request.url}"] -- Method:["${request.method}"] -- IP:["${request.socket.remoteAddress}"]`
            );
            response.on("finish", (): void => {
                const statusCodeAllowed: Array<number> = [200, 201];
                if (statusCodeAllowed.includes(response.statusCode)) {
                    Log.info(
                        `INCOMING --> URL:["${request.url}"] -- Method:["${request.method}"] -- IP:["${request.socket.remoteAddress}"] -- Status:["${response.statusCode}"]`
                    );
                } else if (response.statusCode === 304) {
                    Log.warn(
                        `INCOMING --> URL:["${request.url}"] -- Method:["${request.method}"] -- IP:["${request.socket.remoteAddress}"] -- Status:["${response.statusCode}"]`
                    );
                } else {
                    Log.error(
                        `INCOMING --> URL:["${request.url}"] -- Method:["${request.method}"] -- IP:["${request.socket.remoteAddress}"] -- Status:["${response.statusCode}"]`
                    );
                }
            });
            next();
        }
    );
    /** End Logging */

    /** Rules of API */
    app.use(
        (request: Request, response: Response, next: NextFunction): void => {
            response.header("Access-Control-Allow-Origin", "*");
            response.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-with, Content-Type, Accept, Authorization"
            );
            if (request.method === "OPTIONS") {
                response.header(
                    "Access-Control-Allow-Methods",
                    "GET, POST, PUT, PATCH, DELETE"
                );
                response.status(200).json({});
            }
            next();
        }
    );
    /** End Rules of API */

    /** Routes */
    app.use("/", userRouter);
    app.get("/ping", (request: Request, response: Response): Response => {
        return response.status(200).json({ msg: "PONG" });
    });
    app.use((request: Request, response: Response): Response => {
        return response.status(404).json({ msg: "404 not found" });
    });
    /** End Routes */
    http.createServer(app).listen(
        config.server.port,
        config.server.host,
        (): void =>
            console.log(
                `Server is Beating Up at http://localhost:${config.server.port}`
            )
    );
};
