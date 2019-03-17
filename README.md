# d20md
[![Build Status](https://travis-ci.com/SirWojtek/d20md.svg?branch=master)](https://travis-ci.com/SirWojtek/d20md)

Side contains helpful tool for d20 players & game masters.

## About
This repository contains two server sides:
* frontend - written using Angular 2 framework,
* backend - part of backend written using node.js + Express.js
* api - part of backend written using node.js + GraphQL

## Dependencies
* node.js + yarn + gulp + ng-cli
* mysql
* python + lxml (optional, needed to run xml to json scripts)

## Installation
1. Run `yarn` in the root directory.
2. Run `yarn` in `frontend` directory.
3. Use `gulp prepare_db` to fill database with initial content.
4. Command `yarn start` will run backend and frontent.

## mysql config

You may need to add the following line to `mysql.cfn`:
`max_allowed_packet=8M`
