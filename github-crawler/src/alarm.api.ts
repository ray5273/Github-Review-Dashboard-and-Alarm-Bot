// src/alarm.api.ts
import axios from "axios";
import { Prs } from "../../shared/src/db/entity/pr.entity";

export const createDirectChannel = async (userId: string, otherUserId: string) => {
    const data =
        [
            userId,
            otherUserId
        ]

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer qtnmcscg97gi9nww9rmux1h4sw' // bot token
        }
    };
    try {
        const response = await axios.post('http://localhost:8065/api/v4/channels/direct', data, config);
        return response.data.id
    } catch (error) {
        console.error(error);
    }
}

export const sendPrAlarmByChannelId = async (channelId:string, Pr:Prs) => {
    const data = {
        "channel_id": channelId,
        "props": {
            "attachments": [
                {
                    "fallback": "test",
                    "color": "#fff200",
                    "pretext": "Review requested from your co-workers",
                    "text": "Development team has requested your review for the following PR.",
                    "title": Pr.pr_name,
                    "title_link": Pr.html_url,
                    "fields": [
                        {
                            "short": false,
                            "title": "Requested Reviewers",
                            "value": Pr.requested_reviewers.toString(),
                        },
                    ],
                    "footer":  Pr.repo_id + " is repoid and " + Pr.created_at.getFullYear() + "년 " + Pr.created_at.getMonth() + "월 " + Pr.created_at.getDay() + "일 ", // add owner/repo name here
                    "footer_icon": "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" // Add github icon here
                }
            ]
        }
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer qtnmcscg97gi9nww9rmux1h4sw' // bot token
        }
    };
    try {
        const response = await axios.post('http://localhost:8065/api/v4/posts', data, config);
        console.log(response)
        // res.status(200).send(response.data);
    } catch (error) {
        console.error(error);
        // res.status(500).send({ message: "Internal Server Error" });
    }
}