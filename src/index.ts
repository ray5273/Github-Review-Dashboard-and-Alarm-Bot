import "reflect-metadata";
import { sendGithubRateLimitRequest, sendGithubPullRequestsRequest, sendGithubReviewsRequest } from './githubRestAPIRequest';
import { initDatabase } from './database';
import {Users} from './entity/user.entity';
import {Prs} from "./entity/pr.entity";
import {Reviews} from "./entity/reviews.entity";
import {Repos} from "./entity/repo.entity";

async function main() {
    console.log("This is github rest api request service");

    try {
        const datasource = await initDatabase();
        const result = await sendGithubRateLimitRequest();
        console.log(result)

        const repoLists = await datasource.getRepository(Repos).find();
        console.log(repoLists)

        for (let repo of repoLists) {
            const pullRequestLists = await sendGithubPullRequestsRequest("poseidonos", repo.name);
            // console.log(pullRequestLists)
            var prs : Prs[] = [];
            // TODO : github pr response to prs entity
            for (let pr of pullRequestLists) {
                pr.author = pr.user.login;
                pr.repo_id = repo.id;
                pr.pr_name = pr.title;
                pr.pr_id = pr.number;
                pr.base_branch = pr.base.ref;
                prs.push(pr);
            }
            await datasource.getRepository(Prs).save(prs);

            var reviews : Reviews[] = [];
            // TODO : github reviews response to reviews entity
            for (let pr of prs) {
                const reviewLists = await sendGithubReviewsRequest("poseidonos", repo.name, pr.pr_id);
                console.log(reviewLists)
                // for (let review of reviewLists) {
                //     review.pr_id = pr.pr_id;
                //     review.pr_name = pr.title;
                //     review.repo_id = repo.id;
                //     reviews.push(review);
                // }
            }
        }

        const prLists = await datasource.getRepository(Prs).find();
        console.log(prLists)


    } catch (error) {
        console.log(error);
    }
}

main();