import "reflect-metadata";
import {initDatabase} from "../database";
import {Prs} from '../entity/pr.entity';

export class PrService {
    private instance: any;

    constructor() {
        this.instance = initDatabase().getRepository(Prs);
    }

    async getPrList() {
        return this.instance.find();
    }

    async getPrListByRepoId(repoId: number) {
        return this.instance.find({where: {repo_id: repoId}})}

    async getPrListByPrId(prId: number) {
        return this.instance.find({where: {pr_id: prId}})
    }

    async CreatePrs(githubPrResponse: any[], repoId: number) {
        var prs: Prs[] = [];
        for (let pr of githubPrResponse) {
            let prEntity = new Prs();
            prEntity.author = pr.user.login;
            prEntity.repo_id = repoId
            prEntity.pr_name = pr.title;
            prEntity.pr_id = pr.number;
            prEntity.base_branch = pr.base.ref;
            prs.push(prEntity);
        }

        return this.instance.save(prs);
    }
}