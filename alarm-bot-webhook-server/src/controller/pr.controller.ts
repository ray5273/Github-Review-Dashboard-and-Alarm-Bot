// src/controller/pr.controller.ts
import { Request, Response } from "express";
import axios from "axios";

export const createPrAlarm = async (req: Request, res: Response) => {
    const data = {
        "channel_id": "<channel_id>",
        "message": "This is a message from a bot",
        "props": {
            "attachments": [
                {
                    "pretext": "Look some text",
                    "text": "This is text"
                }
            ]
        }
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer <token>'
        }
    };

    try {
        const response = await axios.post('http://localhost:8065/api/v4/posts', data, config);
        res.status(200).send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}