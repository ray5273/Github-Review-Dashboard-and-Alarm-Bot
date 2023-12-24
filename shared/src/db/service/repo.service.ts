import "reflect-metadata";
import {Repos} from '../entity/repo.entity';
import {Repository, DataSource, DeleteResult} from "typeorm";


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
        let repos : Repos[] = [];
        let repoEntity = new Repos();
        repoEntity.name = name;
        repoEntity.is_internal = isInternal;
        repoEntity.owner = owner;
        repos.push(repoEntity);

        return this.instance.save(repos);
    }

    async deleteRepo(id: number): Promise<DeleteResult> {
        let repoEntity = await this.instance.findOne({where: {id: id}});
        if (repoEntity === null) {
            return Promise.reject("Repo not found");
        }
        return this.instance.delete(repoEntity)
    }
}