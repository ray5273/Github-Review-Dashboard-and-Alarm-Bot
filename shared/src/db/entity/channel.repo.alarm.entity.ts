import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class ChannelRepoAlarm {
    @Column()
    channel_name!: string

    @PrimaryColumn()
    channel_id!: string

    @PrimaryColumn()
    repo_id!: number

    @Column()
    repo_name!: string

    @Column()
    repo_is_internal!: boolean

    @Column()
    repo_owner!: string
}