import "reflect-metadata";
import {initDatabase} from "../database";
import {Repos} from '../entity/repo.entity';
import {Repository, DataSource} from "typeorm";


export class RepoService {
    private instance: Repository<Repos>;
    constructor(dataSource: DataSource) {
        this.instance = dataSource.getRepository(Repos);
    }
    async getRepoList(): Promise<Repos[]> {
        return this.instance.find();
    }

    async getRepoListByRepoId(repoId: number): Promise<Repos[]> {
        return this.instance.find({where: {id: repoId}})
    }


    async getRepoListByRepoName(repoName: string): Promise<Repos[]> {
        return this.instance.find({where: {name: repoName}})
    }

    async getRepoListByOwner(owner: string) : Promise<Repos[]>{
        return this.instance.find({where: {owner: owner}})
    }

    async CreateRepos(name:string, isInternal : boolean, owner: string): Promise<Repos[]>{
        var repos : Repos[] = [];
        let repoEntity = new Repos();
        repoEntity.name = name;
        repoEntity.is_internal = isInternal;
        repoEntity.owner = owner;
        repos.push(repoEntity);

        return this.instance.save(repos);
    }
}