import "reflect-metadata";
import {Reviews} from '../entity/reviews.entity';
import {DataSource, Repository} from "typeorm";
import {Users} from "../entity/user.entity";
import {Prs} from "../entity/pr.entity";


export class ReviewService {
    private instance: Repository<Reviews>;
    constructor(dataSource: DataSource) {
        this.instance = dataSource.getRepository(Reviews);
    }
    async getReviewList(): Promise<Reviews[]> {
        return this.instance.find();
    }

    async getReviewListByPrId(prId: number): Promise<Reviews[]> {
        return this.instance.find({where: {pr_id: prId}})
    }

    async getReviewListByRepoId(repoId: number) : Promise<Reviews[]>{
        return this.instance.find({where: {repo_id: repoId}})
    }

    async getReviewListByReviewer(reviewer: string) : Promise<Reviews[]>{
        return this.instance.find({where: {reviewer: reviewer}})
    }
    async getReviewListByState(state: string) : Promise<Reviews[]>{
        return this.instance.find({where: {state: state}})
    }
    // by reviwer,pr_id,repo_id
    async getReviewListByReviewerAndPrIdAndRepoId(reviewer: string, prId: number, repoId: number) : Promise<Reviews[]>{
        return this.instance.find({where: {reviewer: reviewer, pr_id: prId, repo_id: repoId}})
    }


    async createReviews(githubReviewResponse: any[], prId: number, repoId : number) : Promise<Reviews[]>{
        var reviews : Reviews[] = [];
        for (let review of githubReviewResponse) {
            let reviewEntity = new Reviews();
            reviewEntity.review_id = review.id;
            reviewEntity.pr_id = prId;
            reviewEntity.reviewer = review.user.login;
            reviewEntity.repo_id = repoId;
            reviewEntity.state = review.state;
            reviewEntity.submitted_at = review.submitted_at ? review.submitted_at : null;
            reviews.push(reviewEntity);
        }

        return this.instance.save(reviews);
    }

    async getReviewedUsersByPrId(prId: number, repoId: number, allUsers: Users[]) : Promise<Set<Users>>{
        let reviewedUsers : Set<Users> = new Set<Users>();
        try {
            let reviews = await this.instance.find({where: {pr_id: prId, repo_id: repoId}})
            for (let review of reviews) {
                let user = new Users();
                allUsers.find((user) => {
                    if (user.github_id == review.reviewer) {
                        reviewedUsers.add(user);
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
        return reviewedUsers;
    }

}
