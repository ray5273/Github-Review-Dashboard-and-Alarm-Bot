import "reflect-metadata";
import { sendGithubRateLimitRequest, sendGithubPullRequestsRequest, sendGithubReviewsRequest } from './githubRestAPIRequest';
import { initDatabase } from './database';
import { UserService } from "./service/user.service";
import { PrService} from "./service/pr.service";
import { ReviewService } from "./service/review.service";
import { RepoService } from "./service/repo.service";
import { ReviewStatusService } from "./service/reviewStatus.service";

async function main() {
    console.log("This is github rest api request service");

    // init database
    const datasource = await initDatabase();

    // instantiate service : datasource 주입하는게 맞는지 정확히 모름.
    const prInstance = new PrService(datasource);
    const reviewInstance = new ReviewService(datasource);
    const repoInstance = new RepoService(datasource);
    const userInstance = new UserService(datasource);
    const reviewStatusInstance = new ReviewStatusService(datasource);


    try {
        const result = await sendGithubRateLimitRequest();
        const users = await userInstance.getUserList();
        const repoLists = await repoInstance.getRepoList()

        for (let repo of repoLists) {
            const pullRequestLists = await sendGithubPullRequestsRequest(repo.owner, repo.name);
            // console.log(pullRequestLists)
            await prInstance.CreatePrs(pullRequestLists, repo.id);

            const prs = await prInstance.getPrListByRepoId(repo.id);

            // github reviews response to reviews entity
            for (let pr of prs) {
                const reviewLists = await sendGithubReviewsRequest(repo.owner, repo.name, pr.pr_id);
                await reviewInstance.CreateReviews(reviewLists, pr.pr_id, repo.id);
                const statuses = await reviewStatusInstance.CreateReviewStatus(users, pr.pr_id, repo.id);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

main();