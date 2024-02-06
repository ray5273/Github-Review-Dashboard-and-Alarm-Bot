import "reflect-metadata";
import { sendGithubRateLimitRequest, sendGithubPullRequestsRequest, sendGithubReviewsRequest } from './githubRestAPIRequest';
import { initDatabase } from '../../shared/src/db/database';
import { UserService } from "../../shared/src/db/service/user.service";
import { PrService} from "../../shared/src/db/service/pr.service";
import { ReviewService } from "../../shared/src/db/service/review.service";
import { RepoService } from "../../shared/src/db/service/repo.service";
import { ReviewStatusService } from "../../shared/src/db/service/reviewStatus.service";
import { createDirectChannel, sendPrAlarmByChannelId } from "./alarm.api";
import {ChannelRepoAlarmService} from "../../shared/src/db/service/channel.repo.alarm.service";
import {UserRepoAlarmService} from "../../shared/src/db/service/user.repo.alarm.service";

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
    const channelRepoAlarmInstance = new ChannelRepoAlarmService(datasource);
    const userRepoAlarmInstance = new UserRepoAlarmService(datasource);


    try {
        const result = await sendGithubRateLimitRequest();
        const allUsers = await userInstance.getUserList();
        const repoLists = await repoInstance.getRepoList();
        // get channel ID list
        const channelRepoAlarmList = await channelRepoAlarmInstance.getChannelRepoAlarmList();
        const userRepoAlarmList = await userRepoAlarmInstance.getUserRepoAlarmList();

        for (let repo of repoLists) {
            const pullRequestLists = await sendGithubPullRequestsRequest(repo.owner, repo.name, repo.is_internal);
            // console.log(pullRequestLists)
            await prInstance.CreatePrs(pullRequestLists, repo.id); // 매번 새로 생성하는듯 하여 updat

            const prs = await prInstance.getPrListByRepoId(repo.id);

            // github reviews response to reviews entity
            for (let pr of prs) {
                const reviewLists = await sendGithubReviewsRequest(repo.owner, repo.name, pr.pr_id, repo.is_internal);
                await reviewInstance.createReviews(reviewLists, pr.pr_id, repo.id);

                const repoList = await repoInstance.getRepoListByRepoId(repo.id)
                // pr id에 맞는 requested reviewer 파싱하기
                const reviewers = prInstance.getRequestedReviewersInPr(pr, allUsers, repoList)
                const reviewedUsers = await reviewInstance.getReviewedUsersByPrId(pr.pr_id, repo.id, allUsers);

                // requested reviewer에 reviewed user를 추가한다. ( review status 작성을 위해 )
                reviewedUsers.forEach((reviewedUser) => reviewers.add(reviewedUser))

                const statuses = await reviewStatusInstance.createReviewStatus(reviewers, pr.pr_id, repo.id);

                if( pr.alarm_sent === false) { // && channel is alarmable
                    // const resp = await sendPrAlarmByChannelId("3oodxybx63rcmnrog4auydbzkc", pr)

                    const botId : string = "5ma3ayf5bibc58ku8mqz4jgc7e"  // TODO : id 확인할 수 있는 metric 확인이 필요함.
                    const userId : string = "8jkc1apzgjnotxi9cd5fp71irr"
                    // if user is alarmable:
                    // const createdDirectChannelId = await createDirectChannel(botId, userId)
                    // console.log(createdDirectChannelId)
                    // const resp1 = await sendPrAlarmByChannelId(createdDirectChannelId, pr)


                    for (let channelRepoAlarm of channelRepoAlarmList) {
                        if (channelRepoAlarm.repo_id === repo.id) {
                            // const resp2 = await sendPrAlarmByChannelId(channelRepoAlarm.channel_id, pr)
                            console.log(channelRepoAlarm.channel_id, pr.pr_name)
                        }
                    }
                    // TODO : 특정 user가 특정 repo들에 대한 알람을 설정하는 db가 필요함.
                    // TODO : 특정 Channel이 특정 repo들에 대한 알람을 설정하는 db가 필요함.
                    // for (let userRepoAlarm of userRepoAlarmList) {
                    //     if (userRepoAlarm.repo_id === repo.id) {
                    //         createdDirectChannelId = await createDirectChannel(botId, userRepoAlarm.user_name)
                    //         const resp3 = await sendPrAlarmByChannelId(userRepoAlarm., pr)
                    //     }
                    // }

                    //update alarm_sent in db
                    await prInstance.UpdateAlarmSentInPr(pr.pr_id, repo.id);

                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

main();