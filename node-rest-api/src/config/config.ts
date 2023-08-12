import dotenv from "dotenv";
dotenv.config();

/** Server Port */
const SERVER_PORT: number = Number(process.env.SERVER_PORT);
const SERVER_HOST: string = String(process.env.SERVER_HOST);
/** End Server Port */

/** MongoDB */
const MONGO_USERNAME: string = String(process.env.MONGO_USERNAME);
const MONGO_PASSWORD: string = String(process.env.MONGO_PASSWORD);
const MONGO_HOST: string = String(process.env.MONGO_HOST);
const MONGO_PORT: number = Number(process.env.MONGO_PORT);
const MONGO_DB: string = String(process.env.MONGO_DB);
const MONGO_URL: string = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
/** End MongoDB */

export default {
    server: {
        host: SERVER_HOST,
        port: SERVER_PORT,
    },
    mongo: {
        db: MONGO_DB,
        url: MONGO_URL,
    },
};
