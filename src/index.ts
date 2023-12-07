import { sendGithubRateLimitRequest } from './githubRestAPIRequest';


async function main() {
    console.log("This is github rest api request service");

    try {
        const response = await sendGithubRateLimitRequest();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

main();