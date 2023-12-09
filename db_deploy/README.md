# Postgres DB Deploy

## Start postgres db
```
$ docker-compose up -d
```

## initialize database with new init.sql file.
```
$ docker-compose down
$ docker volume rm -f db_deploy_db_data
$ docker-compose up -d
```
