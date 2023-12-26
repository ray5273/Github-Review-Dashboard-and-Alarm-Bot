import axios from 'axios';
import {GITHUB_TOKEN, HTTPS_PROXY} from './config';
import { HttpsProxyAgent} from "https-proxy-agent";


let api: any;

// if proxy is not set in .env file, then use default axios.create()
if (String(HTTPS_PROXY) === "") {
     api = axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
} else {
    // if proxy is set in .env file, then use axios.create() with proxy
    const httpsAgent = new HttpsProxyAgent(String(HTTPS_PROXY));
    api = axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
        },
        proxy: false,
        httpsAgent: httpsAgent
    });
}



function getRateLimitURL() {
    return '/rate_limit';
}

function getListOfPullRequestsURL(owner: string, repo: string) {
    return `/repos/${owner}/${repo}/pulls?state`;
}

function getReviewsURL(owner: string, repo: string, pr_number: number) {
    return `/repos/${owner}/${repo}/pulls/${pr_number}/reviews`;
}

export async function sendGithubRateLimitRequest() {
    const response = await api.get(getRateLimitURL());
    return {
        'limit': response.data.resources.core.limit,
        'remaining': response.data.resources.core.remaining,
        'reset': response.data.resources.core.reset
    }
}

export async function sendGithubPullRequestsRequest(owner: string, repo: string) {
    const response = await api.get(getListOfPullRequestsURL(owner, repo));
    return response.data;
}

export async function sendGithubReviewsRequest(owner: string, repo: string, pr_number: number) {
    const response = await api.get(getReviewsURL(owner, repo, pr_number));
    return response.data;
}