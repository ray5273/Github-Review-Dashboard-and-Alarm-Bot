import "reflect-metadata";
import {initDatabase} from "../database";
import {Reviews} from '../entity/reviews.entity';


export class ReviewService {
    private instance: any;
    constructor() {
        this.instance = initDatabase().getRepository(Reviews);
    }
    async getReviewList() {
        return this.instance.find();
    }

    async getReviewListByPrId(prId: number) {
        return this.instance.find({where: {pr_id: prId}})
    }

    async getReviewListByRepoId(repoId: number) {
        return this.instance.find({where: {repo_id: repoId}})
    }

    async getReviewListByReviewer(reviewer: string) {
        return this.instance.find({where: {reviewer: reviewer}})
    }
    async getReviewListByState(state: string) {
        return this.instance.find({where: {state: state}})
    }

    async CreateReviews(githubReviewResponse: any[], prId: number) {
        var reviews : Reviews[] = [];
        for (let review of githubReviewResponse) {
            let reviewEntity = new Reviews();
            reviewEntity.review_id = review.id;
            reviewEntity.pr_id = prId;
            reviewEntity.reviewer = review.user.login;
            reviewEntity.repo_id = review.id;
            reviewEntity.state = review.state;
            reviewEntity.submitted_at = review.submitted_at;
            reviews.push(reviewEntity);
        }

        return this.instance.save(reviews);
    }

}
