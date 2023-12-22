import "reflect-metadata";
import {Prs} from '../entity/pr.entity';
import {DataSource, Repository} from "typeorm";
import {Users} from "../entity/user.entity";
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
            prEntity.html_url = pr.html_url;
            prEntity.requested_reviewers = pr.requested_reviewers.map((reviewer: any) => reviewer.login);
            prEntity.requested_teams = pr.requested_teams.map((team: any) => team.name);
            prs.push(prEntity);
        }

        return this.instance.save(prs);
    }

     getRequestedReviewersInPr(pr:Prs, users:Users[], repos:Repos[]) : Set<Users>{
        var requestedReviewers : Set<Users> = new Set<Users>();
        // 실제 user 처리
        for (let reviewer of pr.requested_reviewers) {
            for (let user of users) {
                if (reviewer == user.github_id) {
                    requestedReviewers.add(user);
                }
            }
        }
        // requested teams 처리
        for (let team of pr.requested_teams) {
            for (let user of users) {
                if (team.toLowerCase().includes(user.team_name.toLowerCase())){
                    requestedReviewers.add(user);
                }
            }
        }

         // TEMP : repository 임시 처리, repo이름에 user의 team_name이 들어가있으면 일단 넣기
         for (let repo of repos) {
             for (let user of users) {
                 if (repo.name.toLowerCase().includes(user.team_name.toLowerCase())){
                     requestedReviewers.add(user);
                 }
             }
         }

        return requestedReviewers;
    }
}