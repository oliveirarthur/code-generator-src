# Code Generator

## Stack

- Frontend
	- web
		- Angular
		- TypeScript
		- Yarn
- Infra
	- docker
	- docker-compose

## Instalation

- clone the project
	- `git clone git@github.com:oliveirarthur/code-generator.git`
- install dependencies
	- `yarn install`
- get the containers up and running
	- `docker-compose up --build`

## Default development addresses

- Web frontend
	- http://localhost:4200

## Deploy

- when deploying for the **first time**
	- generate a new ssh key to access github repository
		- `echo /dev/zero | ssh-keygen -f ${PWD}/deploy/.ssh/id_rsa -t rsa -b 4096 -q -N ""`
	- place the content of the generated *id_rsa.pub* file into github
		- `cat ${PWD}/deploy/.ssh/id_rsa.pub`
- build the production ready release
	- `docker-compose run web yarn run build --delete-output-path false`
- commits and pushes the new release to the remote
	- `docker-compose run deploy`
