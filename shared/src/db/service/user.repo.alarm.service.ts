

// user to channel 추가하는 api
// user to channel 삭제하는 api

import "reflect-metadata";
import {DataSource, Repository} from "typeorm";
import {UserRepoAlarm} from "../entity/user.repo.alarm.entity";

export class UserRepoAlarmService {
    private instance: Repository<UserRepoAlarm>;

    constructor(dataSource: DataSource) {
        this.instance = dataSource.getRepository(UserRepoAlarm);
    }

    async getUserRepoAlarmList() : Promise<UserRepoAlarm[]>{
        return this.instance.find();
    }

    async createUserRepoAlarm(userRepoAlarm: UserRepoAlarm) : Promise<UserRepoAlarm>{
        return this.instance.save(userRepoAlarm);
    }

    async deleteUserRepoAlarmByUserNameAndRepoId(userName: string, repoId: number) : Promise<void>{
        let prs = await this.instance.find({where: {user_name: userName, repo_id: repoId}});
        await this.instance.remove(prs);
    }

}