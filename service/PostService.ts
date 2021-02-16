import {Post} from "../models/Post";
import {DatabaseConfig} from "../database/DatabaseConfig";
import {Observable} from "rxjs";
import {User} from "../models/User";

export class PostService {

    protected connection;

    constructor() {
        this.connection = new DatabaseConfig().getConnection()
    }

    async delete(id: number) {
        const sql = `delete from post where id = ${id}`;

        try {
            this.connection.query(sql, () => {
            })
        } catch (e) {
            throw new Error(e)
        }
    }

    get(): Observable<User[]> {
        return new Observable<User[]>(subscriber => {
            const sql = 'select * from post';

            try {
                this.connection.query(sql, (err, result) => {
                    if (err) throw new Error(err);
                    subscriber.next(result)
                })
            } catch (e) {
                throw new Error(e);
            }
        })
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

    async update(post: Post) {
        const sql =
            `update post set title = '${post.title}', description = '${post.description}' ,image = '${post.image}' where id = ${post.id}`;
        try {
            this.connection.query(sql, () => {
            })
        } catch (e) {
            throw new Error(e)
        }
    }
}
