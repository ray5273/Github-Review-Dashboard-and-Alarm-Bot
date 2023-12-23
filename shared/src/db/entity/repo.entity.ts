import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Repos {
    @PrimaryColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    is_internal!: boolean

    @Column()
    owner!: string
}