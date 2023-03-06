# Server For Basic Todo App

This is a basic todo app that uses a node server built with ExpressJs and a PostgreSQL database using Sequelize as an ORM. To run this app you will need git to clone the repo, and either node and postgres installed locally or docker installed.

You can download git [here](https://git-scm.com/downloads) and node [here](https://nodejs.org/en/download/). To install postgres you can follow the instructions [here](https://www.postgresql.org/download/). To install docker you can follow the instructions [here](https://docs.docker.com/get-docker/).

## Running the app locally

To run the app locally you will need to have node and postgres installed. Once you have those installed you can clone the repo and install the dependencies.

```bash
git clone https://github.com/XavierFabregat/DockerExpress.git

cd DockerExpress

npm install
```

Once you have the dependencies installed you will need to create a database. You can do this by running the following command in your terminal inside the psql shell.

```bash
CREATE DATABASE [DATABSE NAME HERE];
```

Once you have created the database you will need to create a .env file in the root directory of the project. This file will contain the database credentials. You can use the .env.example file as a template.

```bash
# Development local

DEV_POSTGRES_USER = [YOUR POSTGRES USERNAME]
DEV_POSTGRES_PASSWORD = [YOUR POSTGRES PASSWORD]
DEV_POSTGRES_DB = [YOUR POSTGRES DATABASE NAME]

# Run server in development mode

PORT = [THE PORT YOU WANT TO RUN THE SERVER ON]
HOST = [THE HOST YOU WANT TO RUN THE SERVER ON]
NODE_ENV = development
```

Once you have created the .env file you can run the server with the following command.

```bash
npm run dev # Runs the server in development mode with nodemon
npm run start # Runs the server in production mode with node
```

To populate the database with some data you can run the following command.

```bash
npm run seed
```

The app is build in TypeScript so the folder that contains the source code is in the src folder. The compiled code is in the dist folder. The server is run from the dist folder. If you want to edit the code you will need to run the following command to compile the code.

```bash
npm run build:dev # Compiles the code in watch mode
npm run build # Compiles the code normally
```

## Running the app with docker

To run the app with docker you will need to have docker installed. Once you have docker installed you can compose the app with the following command.

```bash
docker-compose up
```

NOTE: Docker support is still not fully implemented. The app will run but the database will not be connected to the server. This is because the database is not running in a docker container. I will be adding this feature in the future.



