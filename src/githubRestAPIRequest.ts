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

export async function sendGithubRateLimitRequest() {
    const response = await api.get(getRateLimitURL());
    return {
        'limit': response.data.resources.core.limit,
        'remaining': response.data.resources.core.remaining,
        'reset': response.data.resources.core.reset
    }
}