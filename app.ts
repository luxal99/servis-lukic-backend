import * as bodyParser from "body-parser";
import * as cors from "cors";
import {DatabaseConfig} from "./database/DatabaseConfig";
import {PostController} from "./controllers/PostController";
import {AuthController} from "./controllers/AuthController";
import express = require('express');

const fileUpload = require('express-fileupload');
const app = express();

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.listen(process.env.PORT, async () => {
    const connection = new DatabaseConfig().getConnection().connect();
    new PostController(app);
    new AuthController(app);
    console.log(`Listen on PORT ${process.env.PORT},and connected to DB ${process.env.DB_NAME}`)
})


