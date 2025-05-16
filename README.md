# Frontend

MeetUn Frontend. Find UNAL groups and events, easily. Post your own events and groups.

Frontend Developed with NextJS, set with:

- Typescript
- Tailwind
- EsLinter

Also, aditional tools:

- tRPC, for APIs

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

The repo contains a dockerfile. You can run the container either with a dev build mode or the deploy build mode.

You should first create the image with:

```sh
docker build --build-args mode=<mode> -t <image_name>
```

mode can be:
- prod, which means "production"
- dev, which means "dev"

By default, the mode is set to prod, so if you want to run the production build, you may simply run:

```sh
docker build -t <image_name>
```

Then execute the container with:

```sh
docker run -d -p 3000:3000 <image_name>
```