// src/controller/UserController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../../../shared/src/db/database";
import {UserRepoAlarm} from "../../../shared/src/db/entity/user.repo.alarm.entity";
import {UserRepoAlarmService} from "../../../shared/src/db/service/user.repo.alarm.service";

export const createUserRepoAlarm = async (req: Request, res: Response) => {
    try {
        const userRepoAlarmService = new UserRepoAlarmService(AppDataSource);
        console.log(req.body)
        const userRepo = new UserRepoAlarm();
        userRepo.repo_id = req.body.repo_id;
        userRepo.user_name = req.body.user_name;

        await userRepoAlarmService.createUserRepoAlarm(userRepo);
        console.log(userRepo)
        return res.status(200).send(userRepo);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

export const getUserRepoAlarm = async (req: Request, res: Response) => {
    const userRepoAlarmService = new UserRepoAlarmService(AppDataSource);
    const results = await userRepoAlarmService.getUserRepoAlarmList()
    return res.send(results);
}

export const deleteUserRepoAlarm = async (req: Request, res: Response) => {
    const userRepoAlarmService = new UserRepoAlarmService(AppDataSource);
    const results = await userRepoAlarmService.deleteUserRepoAlarmByUserNameAndRepoId(req.params.user_name, Number(req.params.repo_id)).catch((err) => {
        console.log(err)
    })
    console.log("deleted user : ", results)
    return res.send(results);
}