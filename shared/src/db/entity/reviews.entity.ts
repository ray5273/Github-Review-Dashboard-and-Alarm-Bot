import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Reviews {
    @PrimaryColumn()
    review_id!: number

    @Column()
    pr_id!: number

    @Column()
    reviewer!: string

    @PrimaryColumn()
    repo_id!: number

    @Column()
    state!: string

    @Column()
    submitted_at!: Date
}