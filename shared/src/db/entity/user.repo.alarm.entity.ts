import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class UserRepoAlarm {
    @PrimaryColumn()
    user_name!: string

    @PrimaryColumn()
    repo_id!: number
}