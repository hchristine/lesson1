import { Request, Response } from 'express'
import { Post } from './post.model';

export function createPost(req: Request, res: Response) {
    const { title, description } = req.body;

    const post = new Post({
        userId: req.user!.userId,// GET MY ID HERE HAHAHAHAHA,
        title,
        description
    });
    post.save().then(() => {
        res.status(201).json(post);
    })
        .catch(() => {
            res.status(404).send();
        });
}

export function getPost(req: Request, res: Response) {
    Post
        .findWithComments()
        .then((posts) => {
            res.json(posts);
        })
        .catch(() => {
            res.status(404).send();
        });
}

export function updatePost(req: Request, res: Response) {
    const { title, description } = req.body;
    Post.updateOne({ _id: req.params.id }, {
        $set: { title, description }
    }).then((doc) => {
        res.json({
            ok: true
        });
    })
        .catch(() => {
            res.status(404).send();
        });
}

export function deletePost(req: Request, res: Response) {
    Post.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: "Deleted."
        })
    })
        .catch(() => {
            res.status(404).send();
        });
}