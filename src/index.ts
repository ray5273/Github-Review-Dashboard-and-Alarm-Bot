import "reflect-metadata";
import { sendGithubRateLimitRequest } from './githubRestAPIRequest';
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

        const user = await datasource
            .getRepository(Users)
            .createQueryBuilder("user")
            .where("user.name = :name", { name: "hello" })
            .getOne()

        console.log(user);

        const pr = await datasource
            .getRepository(Prs)
            .createQueryBuilder("pr")
            .where("pr.pr_name = :pr_name", { pr_name: "pr1" })
            .getOne()
        console.log(pr);

        const review = await datasource
            .getRepository(Reviews)
            .createQueryBuilder("review")
            .where("review.reviewer = :reviewer", { reviewer: "sang" })
            .getOne()
        console.log(review);

        const repo = await datasource
            .getRepository(Repos)
            .createQueryBuilder("repo")
            .where("repo.name = :repo_name", { repo_name: "essential" })
            .getOne()
        console.log(repo);



    } catch (error) {
        console.log(error);
    }
}

main();