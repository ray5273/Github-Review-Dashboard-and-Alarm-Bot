import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Prs {
    @PrimaryColumn()
    repo_id!: number

    @Column()
    pr_name!: string

    @PrimaryColumn()
    pr_id!: number

    @Column()
    author!: string

    @Column()
    base_branch!: string
}