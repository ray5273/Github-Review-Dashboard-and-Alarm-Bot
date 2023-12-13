import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Reviews {
    @PrimaryColumn()
    pr_id!: number

    @PrimaryColumn()
    reviewer!: string

    @PrimaryColumn()
    repo_id!: number

    @Column()
    status!: string
}