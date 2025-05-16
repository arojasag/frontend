# Frontend

MeetUn Frontend. Find UNAL groups and events, easily. Post your own events and groups.

Frontend Developed with NextJS, set with:

- Typescript
- Tailwind
- EsLinter

Also, aditional tools:

- tRPC, for APIs

> [!TIP]
> Use hot-reload with Docker to develop without worrying about dependencies by
> following [these instructions](#hot-reload-in-docker).

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

> [!IMPORTANT]
> Make sure your `.dockerignore` file is set up correctly to exclude any
> unnecessary files. Like so:

```sh
cat .gitignore .prodignore > .dockerignore
```

The repo contains a dockerfile. You can run the container either with a `dev` or
`prod` build mode.

You should first create the image with:

```sh
docker build --build-args mode=<mode> -t <image_name>
```

`mode` can be:

- `prod`, which means "production"
- `dev`, which means "development"

By default, the `mode` is set to `prod`, so if you want to run the production build,
you may simply run:

```sh
docker build -t <image_name>
```

Then execute the container with:

```sh
docker run -p 3000:3000 <image_name>
```

In dettached mode:

```sh
docker run -d -p 3000:3000 <image_name>
```

## Developing

### Hot-reload in Docker

To enable hot-reload development in Docker, run the container with a volume mount
to sync your local changes:

1. Build in `dev` mode:

    ```sh
    docker build --build-arg mode=dev -t <image_name>
    ```

1. Mount current directory into the container:

    ```sh
    docker run -p 3000:3000 -v $(pwd):/Swarch2A_Frontend <image_name>
    ```

> You may also prefer running it in dettached mode. Like this:

```sh
docker run -d -p 3000:3000 -v $(pwd):/Swarch2A_Frontend <image_name>
```

This will watch for file changes and automatically rebuild.
