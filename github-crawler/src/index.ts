import "reflect-metadata";
import { sendGithubRateLimitRequest, sendGithubPullRequestsRequest, sendGithubReviewsRequest } from './githubRestAPIRequest';
import { initDatabase } from '../../shared/src/db/database';
import { UserService } from "../../shared/src/db/service/user.service";
import { PrService} from "../../shared/src/db/service/pr.service";
import { ReviewService } from "../../shared/src/db/service/review.service";
import { RepoService } from "../../shared/src/db/service/repo.service";
import { ReviewStatusService } from "../../shared/src/db/service/reviewStatus.service";

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
        const allUsers = await userInstance.getUserList();
        const repoLists = await repoInstance.getRepoList()

        for (let repo of repoLists) {
            const pullRequestLists = await sendGithubPullRequestsRequest(repo.owner, repo.name);
            // console.log(pullRequestLists)
            await prInstance.CreatePrs(pullRequestLists, repo.id);

            const prs = await prInstance.getPrListByRepoId(repo.id);

            // github reviews response to reviews entity
            for (let pr of prs) {
                const reviewLists = await sendGithubReviewsRequest(repo.owner, repo.name, pr.pr_id);
                await reviewInstance.createReviews(reviewLists, pr.pr_id, repo.id);

                const repoList = await repoInstance.getRepoListByRepoId(repo.id)
                // pr id에 맞는 requested reviewer 파싱하기
                const reviewers = prInstance.getRequestedReviewersInPr(pr, allUsers, repoList)
                const reviewedUsers = await reviewInstance.getReviewedUsersByPrId(pr.pr_id, repo.id, allUsers);

                // requested reviewer에 reviewed user를 추가한다. ( review status 작성을 위해 )
                reviewedUsers.forEach((reviewedUser) => reviewers.add(reviewedUser))

                const statuses = await reviewStatusInstance.createReviewStatus(reviewers, pr.pr_id, repo.id);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

main();