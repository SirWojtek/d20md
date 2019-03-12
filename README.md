# d20Site
Side contains helpful tool for d20 players & game masters.

## About
This repository contains two server sides:
* frontend - written using Angular 2 framework,
* backend - written using NodeJS.

## Installation
1. Run `yarn install` in the root directory.
2. Run `yarn install` in `frontend` directory.

## mysql config
`CREATE USER server identified by 'd20mdPassword';`
`grant all privileges on d20md.* to server;`

In `mysql.cfn` change/add:
`max_allowed_packet=8M`
