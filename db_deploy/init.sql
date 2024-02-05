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
    is_internal boolean not null,
    owner varchar(255) not null
);

create table prs (
    repo_id integer not null,
    pr_name varchar(255) not null,
    pr_id integer not null,
    author varchar(255) not null,
    base_branch varchar(255) not null,
    is_closed boolean not null,
    created_at timestamp not null,
    html_url varchar(255) not null,
    requested_reviewers TEXT[] not null,
    requested_teams TEXT[] not null,
    alarm_sent boolean not null,
    foreign key (repo_id) references repos(id),
    primary key (repo_id, pr_id)
);

create table reviews (
    review_id integer not null ,
    pr_id integer not null,
    reviewer varchar(255) not null,
    repo_id integer not null,
    state varchar(255) not null,
    submitted_at timestamp,
    primary key (review_id, repo_id)
);

create table review_status (
    pr_id integer not null,
    reviewer varchar(255) not null,
    repo_id integer not null,
    status varchar(255) not null,
    primary key (pr_id, reviewer, repo_id)
);

create table user_repo_alarm (
    user_name varchar(255) not null,
    repo_id integer not null,
    repo_name varchar(255) not null,
    repo_is_internal boolean not null,
    repo_owner varchar(255) not null,
    primary key (user_name, repo_id)
);

create table channel_repo_alarm (
    channel_name varchar(255) not null,
    channel_id varchar(255) not null,
    repo_id integer not null,
    repo_name varchar(255) not null,
    repo_is_internal boolean not null,
    repo_owner varchar(255) not null,
    primary key (channel_id, repo_id)
);