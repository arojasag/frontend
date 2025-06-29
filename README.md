# Frontend

MeetUn Frontend. Find UNAL groups and events, easily. Post your own events and groups.

Frontend Developed with NextJS, set with:

- Typescript
- Tailwind
- EsLinter

Also, aditional tools:

- tRPC

## Table of contents

- [Frontend](#frontend)
  - [Table of contents](#table-of-contents)
  - [Running the frontend](#running-the-frontend)
    - [Running Locally](#running-locally)
    - [Running using Docker](#running-using-docker)
      - [Setting up the needed environment variables](#setting-up-the-needed-environment-variables)
      - [Partially clean enviroment](#partially-clean-enviroment)
      - [Fully clean environment](#fully-clean-environment)

---

## Running the frontend

### Running Locally

After cloning the repo, don't forget to install nodejs dependencies with:

```sh
npm i
```

Then run the following command, to execute the frontend as dev (it's lighter than the deploy build, and doesn't verify ts or eslinter issues):

```sh
npm run dev
```

### Running using Docker

---

> [!IMPORTANT]
> Make sure your `.dockerignore` file is set up correctly to exclude any
> unnecessary files. Like so:

```sh
cat .gitignore .prodignore > .dockerignore
```

#### Setting up the needed environment variables

In order for you to run the project, you need a .env file with various variables.
You can find a good and functional example of a .env file in .env.example, and you
can run the following command to get the environment variables needed:

```sh
cp .env.example .env
```

You can run the project using docker compose, with the following command:

```sh
docker compose up --build mu_fe_local
```

This command runs a container dedicated to run the frontend without the need to run all the project. You should run it with mu_fe_local, otherwise docker will run the service intended to run with all the project.

#### Partially clean enviroment

> [!TIP]
> If you want to have a _almost_ clean build you need to stop
> and remove containers, networks by running:

```sh
docker compose down --remove-orphans
```

#### Fully clean environment

> [!WARNING]
> The following command gives you a clean slate to start from, but it
> remove the volumes too. So any data that you may have, it will be
> removed as well.

```sh
docker compose down --remove-orphans --volumes
```
