import "reflect-metadata";
import {initDatabase} from "../database";
import {Users} from "../entity/user.entity";
import {DataSource, Repository} from "typeorm";
import {Repos} from "../entity/repo.entity";
import {Reviews} from "../entity/reviews.entity";

export class UserService {
    private instance: Repository<Users>;
    constructor(dataSource: DataSource) {
        this.instance = dataSource.getRepository(Users);
    }

    async getUserList(): Promise<Users[]> {
        return this.instance.find();
    }

}