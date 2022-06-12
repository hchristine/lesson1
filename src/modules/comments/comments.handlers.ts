import { Request, Response } from 'express';
import { Comment } from './comment.model';

export function createComment(req: Request, res: Response) {
    const { postId, text } = req.body;
    const comment = new Comment({
        postId,
        text
    });
    comment.save().then(() => {
        res.status(201).json(comment);
    })
        .catch(() => {
            res.status(404).send();
        });
}

export function updateComment(req: Request, res: Response) {
    const { text } = req.body;
    Comment.updateOne({ _id: req.params.id }, {
        $set: { text }
    })
        .then((doc) => {
            res.json({
                ok: true
            });
        })
        .catch(() => {
            res.status(404).send();
        });
}

export function deleteComment(req: Request, res: Response) {
    Comment.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: "Deleted."
        })
    })
        .catch(() => {
            res.status(404).send();
        });
}