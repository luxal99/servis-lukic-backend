import {DatabaseConfig} from "../database/DatabaseConfig";
import * as mysql from "mysql";
import * as bcrypt from "bcrypt";
import {User} from "../models/User";
import {Observable} from "rxjs";

export class AuthService {

    protected connection;

    constructor() {
        this.connection = new DatabaseConfig().getConnection()
    }

    auth(user: User): Observable<User> {
        return new Observable<User>((subscriber) => {
            const sql = `select * from user where username ='${user.username}'`;

            this.connection.query(sql, async (err, result) => {

                if (result.length > 0) {
                    if (await bcrypt.compare(user.password, result[0].password)) {
                        subscriber.next(result[0]);
                        subscriber.complete();
                    } else {
                        subscriber.next(null)
                    }
                } else {
                    subscriber.next(null)
                }
            })
        })


    }
}
