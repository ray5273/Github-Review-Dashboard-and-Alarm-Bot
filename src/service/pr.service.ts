import "reflect-metadata";
import {initDatabase} from "../database";
import {Prs} from '../entity/pr.entity';
import {DataSource, Repository} from "typeorm";
import {Repos} from "../entity/repo.entity";

export class PrService {
    private instance: Repository<Prs>;

    constructor(dataSource: DataSource) {
        this.instance = dataSource.getRepository(Prs);
    }

    async getPrList() : Promise<Prs[]>{
        return this.instance.find();
    }

    async getPrListByRepoId(repoId: number) : Promise<Prs[]>{
        return this.instance.find({where: {repo_id: repoId}})}

    async getPrListByPrId(prId: number) : Promise<Prs[]>{
        return this.instance.find({where: {pr_id: prId}})
    }

    async CreatePrs(githubPrResponse: any[], repoId: number) : Promise<Prs[]>{
        var prs: Prs[] = [];
        for (let pr of githubPrResponse) {
            let prEntity = new Prs();
            prEntity.author = pr.user.login;
            prEntity.repo_id = repoId
            prEntity.pr_name = pr.title;
            prEntity.pr_id = pr.number;
            prEntity.base_branch = pr.base.ref;
            prEntity.is_closed = pr.state == "closed" ? true : false;
            prEntity.created_at = pr.created_at;
            prs.push(prEntity);
        }

        return this.instance.save(prs);
    }
}