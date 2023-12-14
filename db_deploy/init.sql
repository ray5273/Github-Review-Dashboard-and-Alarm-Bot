-- base tables for the app
create table users (
    name varchar(255) not null,
    github_id varchar(255) not null unique,
    company_id varchar(255) not null,
    company_github_id varchar(255),
    team_name varchar(255) not null,
    primary key (name, company_id)
);

create table repos (
    id serial primary key,
    name varchar(255) not null,
    is_internal boolean not null
--     base_url varchar(255) not null
);

create table prs (
    repo_id integer not null,
    pr_name varchar(255) not null,
    pr_id integer not null,
    author varchar(255) not null,
    base_branch varchar(255) not null,
    foreign key (repo_id) references repos(id),
    primary key (repo_id, pr_id)
);

create table reviews (
    pr_id integer not null,
    reviewer varchar(255) not null,
    repo_id integer not null,
    status varchar(255) not null,
    primary key (pr_id, reviewer, repo_id)
);
