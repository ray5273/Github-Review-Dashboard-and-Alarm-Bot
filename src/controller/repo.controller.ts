// src/controller/UserController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { RepoService } from "../service/repo.service";
import { Repos } from "../entity/repo.entity";

export const createRepo = async (req: Request, res: Response) => {
    try {
        const repoInstance = new RepoService(AppDataSource);
        const repos = new Repos();
        repos.name = req.body.name;
        repos.is_internal = req.body.is_internal;
        repos.owner = req.body.owner;
        await repoInstance.CreateRepos(repos.name, repos.is_internal, repos.owner);
        console.log(repos)
        return res.status(200).send();
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

export const getRepos = async (req: Request, res: Response) => {
    const repoInstance = new RepoService(AppDataSource);
    const results = await repoInstance.getRepoList()
    return res.send(results);
}
