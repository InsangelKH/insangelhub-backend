## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# InsangelHub

InsangelHub is a project built with NestJS, providing an API that offers various functionalities such as user authentication (login, registration), profile management, CRUD operations for articles, and comment management. It utilizes PostgreSQL as the database and employs TypeORM for data handling. Images are stored in the 'public' folder using the useStaticAssets function.

## InsangelHub frontend

[Frontend](https://github.com/InsangelKH/insangelhub-frontend)

## Features

- [User Authentication:](/src/entities/user/user.service.ts) Enable users to register, log in securely, and manage their profiles.
- [Article Management:](/src/entities/articles/article.service.ts) Create, read, update, and delete articles.
- [Comment System:](/src/entities/comments/comment.service.ts) Implement functionality to add, edit, and delete comments on articles.
- [Database:](/db/data-source.ts) PostgreSQL is used as the primary database for storing data.
- [Static Assets:](/public/images/) Images are stored in the 'public' folder using useStaticAssets for easy accessibility.

## Technologies Used

- NestJS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- PostgreSQL: An advanced open-source relational database.
- TypeORM: An ORM that works with TypeScript and JavaScript, simplifying database interactions.
- Other relevant technologies used should be listed here.
