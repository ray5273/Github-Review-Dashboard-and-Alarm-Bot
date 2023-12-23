import "reflect-metadata";
import {Users} from "../entity/user.entity";
import {DataSource, Repository} from "typeorm";

export class UserService {
    private instance: Repository<Users>;
    constructor(dataSource: DataSource) {
        this.instance = dataSource.getRepository(Users);
    }

    async getUserList(): Promise<Users[]> {
        return this.instance.find();
    }
    async createUser(user: Users): Promise<Users> {
        return this.instance.save(user);
    }

}