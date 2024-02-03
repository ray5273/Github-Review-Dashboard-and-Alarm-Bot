

// 채널 추가하는 api
// 채널 삭제하는 api
import "reflect-metadata";
import {DataSource, Repository} from "typeorm";
import {ChannelRepoAlarm} from "../entity/channel.repo.alarm.entity";


export class ChannelRepoAlarmService {
    private instance: Repository<ChannelRepoAlarm>;

    constructor(dataSource: DataSource) {
        this.instance = dataSource.getRepository(ChannelRepoAlarm);
    }

    async getChannelRepoAlarmList() : Promise<ChannelRepoAlarm[]>{
        return this.instance.find();
    }

    async createChannelRepoAlarm(channelRepoAlarm: ChannelRepoAlarm) : Promise<ChannelRepoAlarm>{
        return this.instance.save(channelRepoAlarm);
    }
    async deleteChannelRepoAlarmByChannelIdAndRepoId(channelId: string,repoId: number) : Promise<void>{
        let prs = await this.instance.find({where: {channel_id:channelId, repo_id: repoId}});
        await this.instance.remove(prs);
    }

}