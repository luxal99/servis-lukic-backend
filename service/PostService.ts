import * as mysql from "mysql";
import {Post} from "../models/Post";
import {DatabaseConfig} from "../database/DatabaseConfig";

export class PostService {

    protected connection;

    constructor() {
        this.connection = new DatabaseConfig().getConnection()
    }

    async delete(id: number) {
        const sql = `delete from post where id = ${id}`;

        try {
            this.connection.query(sql, () => {})
        } catch (e) {
            throw new Error(e)
        }
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
            this.connection.query(sql, [values], () => {
            })
        } catch (e) {
            throw new Error(e)
        }
    }
}
