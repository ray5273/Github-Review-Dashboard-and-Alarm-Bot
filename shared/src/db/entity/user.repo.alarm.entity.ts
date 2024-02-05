import {Entity, PrimaryColumn, Column, ManyToOne} from "typeorm";
import {Repos} from "./repo.entity";

@Entity()
export class UserRepoAlarm {
    @PrimaryColumn()
    user_name!: string

    @PrimaryColumn()
    repo_id!: number

    @Column()
    repo_name!: string

    @Column()
    repo_is_internal!: boolean

    @Column()
    repo_owner!: string
}