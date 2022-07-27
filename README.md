# Primer proyecto Be desarrollado con Express y TS

Here we could find the steps that I as developer made to create a BE proyect

### NPM dependency installations

All the npm installations are based on [npm official website](https://www.npmjs.com/).

Fisrt of all, we need our principal techs:
- Express
- Mongoose -as DDBB operator 
- Typescript -as dev dep

To continue, we'll install some libraries to help us with security, token for users and node utilities:

- bcrypt
- body-parser
- express-validator
- dotenv
- jsonwebtoken
- nodemon -as dev dep
- ts-node -as dev dep
  
Finally, we should install some libraries to make our code more legible and clean:

- Eslint -as dev dep
- Prettier -as dev dep
- eslint-config-prettier -as dev dep

All this libraries will be shown at **package.json** file. Following the instructions for a correct installation and usage of each dependency

### Project stucture creation

I will try to follow de SOLID and Clean Code/Architecture rules in this project. According to this, I will split *./src* folder in the following:

- controller -> where I code the business logic for the different data-types (Collections in MongoDB) 
- data -> here i define the models 
- db/schemas -> In this level, I locate the Mongo schemas for my data-types and the connection between Mongo and my project
- middleware -> Custom middlewares to check a correct login, f.e.
- routes -> here I put API url and methods to my ddbb
- utils -> as its name says, utils folder.
- validator -> Where we place all the validators for the app inputs

Also, I need a file named *index.ts* which will be the main file of this project where I define the core variables of DB

As a good practice, I define *.env* file where I put the different static variables (as hostname, port, token secret, etc...)

## First steps

1. Configure *.env*, *index.ts* and a file named *connection.ts* located in **db** where I set the URI, PORT, parser and init the API
2. Define de first API router and controller in **routes** and **controller**. At the same time, I define the user schema (as Mongo needs)
