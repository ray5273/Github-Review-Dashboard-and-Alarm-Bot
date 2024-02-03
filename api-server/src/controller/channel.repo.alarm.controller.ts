// src/controller/UserController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../../../shared/src/db/database";
import {ChannelRepoAlarmService} from "../../../shared/src/db/service/channel.repo.alarm.service";
import {ChannelRepoAlarm} from "../../../shared/src/db/entity/channel.repo.alarm.entity";

export const createChannelRepoAlarm = async (req: Request, res: Response) => {
    try {
        const channelRepoAlarmService = new ChannelRepoAlarmService(AppDataSource);
        console.log(req.body)
        const channelRepo = new ChannelRepoAlarm();
        channelRepo.channel_id = req.body.channel_id;
        channelRepo.repo_id = req.body.repo_id;
        channelRepo.channel_name = req.body.channel_name;

        await channelRepoAlarmService.createChannelRepoAlarm(channelRepo);
        console.log(channelRepo)
        return res.status(200).send(channelRepo);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

export const getChannelRepoAlarm = async (req: Request, res: Response) => {
    const channelRepoAlarmService = new ChannelRepoAlarmService(AppDataSource);
    const results = await channelRepoAlarmService.getChannelRepoAlarmList()
    return res.send(results);
}

export const deleteChannelRepoAlarm = async (req: Request, res: Response) => {
    const channelRepoAlarmService = new ChannelRepoAlarmService(AppDataSource);
    const results = await channelRepoAlarmService.deleteChannelRepoAlarmByChannelIdAndRepoId(req.params.channel_id, Number(req.params.repo_id)).catch((err) => {
        console.log(err)
    })
    console.log("deleted user : ", results)
    return res.send(results);
}