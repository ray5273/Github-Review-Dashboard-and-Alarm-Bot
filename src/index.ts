import "reflect-metadata";
import { sendGithubRateLimitRequest, sendGithubPullRequestsRequest, sendGithubReviewsRequest } from './githubRestAPIRequest';
import { initDatabase } from './database';
import { PrService} from "./service/pr.service";
import { ReviewService } from "./service/review.service";
import { RepoService } from "./service/repo.service";

async function main() {
    console.log("This is github rest api request service");

    const prInstance = new PrService();
    const reviewInstance = new ReviewService();
    const repoInstance = new RepoService();

    try {
        const datasource = await initDatabase();
        const result = await sendGithubRateLimitRequest();
        console.log(result)

        const repoLists = await repoInstance.getRepoList()
        console.log(repoLists)

        for (let repo of repoLists) {
            const pullRequestLists = await sendGithubPullRequestsRequest(repo.owner, repo.name);
            // console.log(pullRequestLists)
            await prInstance.CreatePrs(pullRequestLists, repo.id);

            const prs = await prInstance.getPrListByRepoId(repo.id);
            console.log(prs)

            // github reviews response to reviews entity
            for (let pr of prs) {
                const reviewLists = await sendGithubReviewsRequest(repo.owner, repo.name, pr.pr_id);
                console.log(reviewLists)
                await reviewInstance.CreateReviews(reviewLists, pr.pr_id);
            }
        }


    } catch (error) {
        console.log(error);
    }
}

main();