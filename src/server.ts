import { connect } from './database/db';
import express from 'express';
import { router as usersRouter } from './modules/users/users.router';
import { router as postsRouter } from './modules/posts/posts.router';
import { router as commentsRouter } from './modules/comments/comments.router';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

export function start() {
    connect().then(() => {
        app.listen('3000', () => {
            console.log("Listening on port 3000.");
        });
    })
}
