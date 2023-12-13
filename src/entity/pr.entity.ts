import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Prs {
    @PrimaryColumn()
    id!: number

    @Column()
    repo_id!: number

    @Column()
    pr_name!: string

    @Column()
    pr_id!: number

    @Column()
    author!: string

    @Column()
    base_branch!: string
}