import dotenv from 'dotenv';

dotenv.config()

export default {
    MONGO_URL: process.env.MONGO_URL,
    GITHUB_CLIENTID: process.env.GITHUB_CLIENTID,
    GITHUB_CLIENTSECRET: process.env.GITHUB_CLIENTSECRET,
    GITHUB_CALLBACKURL: process.env.GITHUB_CALLBACKURL,
    PORT: process.env.PORT,
    SECRET_PASS: process.env.SECRET_PASS,
    PRIVATE_KEY: process.env.PRIVATE_KEY
}