import * as dotenv from "dotenv";
import express = require('express');
import * as bodyParser from "body-parser";
import * as cors from "cors";
import {DatabaseConfig} from "./database/DatabaseConfig";
import {PostController} from "./controllers/PostController";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.listen(process.env.PORT, async () => {
    const connection = new DatabaseConfig().getConnection().connect();
    new PostController(app, connection);
    console.log(`Listen on PORT ${process.env.PORT},and connected to DB ${process.env.DB_NAME}`)
})


