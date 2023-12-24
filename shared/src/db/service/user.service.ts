import "reflect-metadata";
import {Users} from "../entity/user.entity";
import {DataSource, DeleteResult, Repository} from "typeorm";

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

    async deleteUser(name: string, company_id: string): Promise<DeleteResult> {
        let userEntity = await this.instance.findOne({where: {name: name, company_id: company_id}});
        if (userEntity === null) {
            return Promise.reject("User not found");
        }
        return this.instance.delete(userEntity).catch((err) => {
            return Promise.reject(err);
        })
    }
}