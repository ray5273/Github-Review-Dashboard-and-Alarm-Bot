import axios from 'axios';
import { GITHUB_TOKEN } from './config';

const api = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
    }
});

function getRateLimitURL() {
    return '/rate_limit';
}

function getListOfPullRequestsURL(owner: string, repo: string) {
    return `/repos/${owner}/${repo}/pulls?state=all`;
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