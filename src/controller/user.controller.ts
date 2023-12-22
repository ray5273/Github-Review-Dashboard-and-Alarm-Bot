// src/controller/UserController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { UserService } from "../service/user.service";
import { Users } from "../entity/user.entity";

export const createUser = async (req: Request, res: Response) => {
    try {
        const userInstance = new UserService(AppDataSource);
        console.log(req.body)
        const user = new Users();
        user.name = req.body.name;
        user.github_id = req.body.github_id;
        user.company_id = req.body.company_id;
        user.company_github_id = req.body.company_github_id;
        user.team_name = req.body.team_name;
        await userInstance.createUser(user);
        console.log(user)
        return res.status(200).send(user);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

export const getUser = async (req: Request, res: Response) => {
    const userInstance = new UserService(AppDataSource);
    const results = await userInstance.getUserList()
    return res.send(results);
}
