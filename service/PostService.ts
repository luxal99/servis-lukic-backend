import * as mysql from "mysql";
import {Post} from "../models/Post";
import {DatabaseConfig} from "../database/DatabaseConfig";

export class PostService {

    protected connection;
    constructor() {
        this.connection = new DatabaseConfig().getConnection()
    }

    async save(post: Post) {
        const sql = `insert into post(title, description, image)
                     values (?)`;
        const values = [
            post.title,
            post.description,
            post.image
        ];

        try {
            this.connection.query(sql, [values], (err, data, fields) => {
            })
        } catch (e) {
            throw new Error(e)
        }
    }
}
