import {Entity, PrimaryColumn, Column} from "typeorm";


// create table users (
//     name varchar(255) not null,
//     github_id varchar(255) not null unique,
//     company_id varchar(255) not null,
//     company_github_id varchar(255),
//     team_name varchar(255) not null,
//     primary key (name, company_id)
// );
@Entity()
export class Users {
    @PrimaryColumn()
    name!: string

    @Column()
    github_id!: string

    @PrimaryColumn()
    company_id!: string

    @Column()
    company_github_id!: string

    @Column()
    team_name!: string
}