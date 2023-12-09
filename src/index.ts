import { sendGithubRateLimitRequest } from './githubRestAPIRequest';
import { executeQuery } from './database';


async function main() {
    console.log("This is github rest api request service");

    try {
        const response = await sendGithubRateLimitRequest();
        console.log(response);
        const query = "SELECT * FROM users";
        const result = await executeQuery(query);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

main();