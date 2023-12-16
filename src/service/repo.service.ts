import "reflect-metadata";
import {initDatabase} from "../database";
import {Repos} from '../entity/repo.entity';


export class RepoService {
    private instance: any;
    constructor() {
        this.instance = initDatabase().getRepository(Repos);
    }
    async getRepoList() {
        return this.instance.find();
    }

    async getRepoListByRepoId(repoId: number) {
        return this.instance.find({where: {id: repoId}})
    }


    async getRepoListByRepoName(repoName: string) {
        return this.instance.find({where: {name: repoName}})
    }

    async getRepoListByOwner(owner: string) {
        return this.instance.find({where: {owner: owner}})
    }

    async CreateRepos(name:string, isInternal : boolean, owner: string) {
        var repos : Repos[] = [];
        let repoEntity = new Repos();
        repoEntity.name = name;
        repoEntity.is_internal = isInternal;
        repoEntity.owner = owner;
        repos.push(repoEntity);

        return this.instance.save(repos);
    }
}