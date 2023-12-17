import "reflect-metadata";
import {initDatabase} from "../database";
import {ReviewService} from "./review.service";
import {Users} from "../entity/user.entity";
import {Reviews} from '../entity/reviews.entity';
import {ReviewStatus} from '../entity/reviewStatus.entity';
import {DataSource, Repository} from "typeorm";
import {Repos} from "../entity/repo.entity";


const STATUS_PENDING = "pending";
const STATUS_APPROVED = "approved";
const STATUS_CHANGES_REQUESTED = "changes_requested";
const STATUS_COMMENTED = "commented";
const STATUS_DISMISSED = "dismissed";
export class ReviewStatusService {
    private instance: Repository<ReviewStatus>
    private reviewInstance: ReviewService;
    constructor(dataSource: DataSource) {
        this.instance = dataSource.getRepository(ReviewStatus);
        this.reviewInstance = new ReviewService(dataSource);
    }
    async getReviewList() : Promise<ReviewStatus[]>{
        return this.instance.find();
    }

    async getReviewListByPrId(prId: number) : Promise<ReviewStatus[]>{
        return this.instance.find({where: {pr_id: prId}})
    }

    async getReviewListByRepoId(repoId: number) : Promise<ReviewStatus[]>{
        return this.instance.find({where: {repo_id: repoId}})
    }

    async getReviewListByStatus(status: string) : Promise<ReviewStatus[]>{
        return this.instance.find({where: {status: status}})
    }

    async CreateReviewStatus(Users: Users[], prId: number, repoId: number) : Promise<ReviewStatus[]>{

        var reviewStatuses : ReviewStatus[] = [];
        // 특정 PR에 대한 모든 user의 대한 review status를 저장한다.
        for (let user of Users) {
            var reviewStatusByPrId : ReviewStatus = new ReviewStatus();
            const reviewListByUser = await this.reviewInstance.getReviewListByReviewerAndPrIdAndRepoId(user.github_id, prId, repoId);

            reviewStatusByPrId.reviewer = user.name;
            reviewStatusByPrId.pr_id = prId;
            reviewStatusByPrId.status = this.determineReviewStatus(reviewListByUser);
            reviewStatusByPrId.repo_id = repoId;

            reviewStatuses.push(reviewStatusByPrId);
        }

        return this.instance.save(reviewStatuses);
    }

    determineReviewStatus(reviewListByUser: Reviews[]) : string {
        // review status mechanism
        if (reviewListByUser.length == 0) {
            return STATUS_PENDING;
        } else {
            const approved = reviewListByUser.some((review:Reviews) => review.state.toLowerCase() == STATUS_APPROVED)
            if (approved) {
                return STATUS_APPROVED;
            } else {
                const changesRequested = reviewListByUser.some((review:Reviews) => review.state.toLowerCase() == STATUS_CHANGES_REQUESTED)
                if(changesRequested) {
                    return STATUS_CHANGES_REQUESTED;
                } else {
                    const comment = reviewListByUser.some((review:Reviews) =>
                        review.state.toLowerCase() == STATUS_COMMENTED
                        || review.state.toLowerCase() == STATUS_DISMISSED
                        || review.state.toLowerCase() == STATUS_PENDING)

                    if(comment) {
                        return STATUS_COMMENTED;
                    }else {
                        return STATUS_PENDING;
                    }
                }
            }
        }
    }

}
