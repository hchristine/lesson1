import { Response, Request } from 'express';
import { User } from './user.model';
import { sendToken } from './users.utils';

export function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = new User({
        name,
        email,
        password
    });
    user.save()
        .then(() => {
            res.status(201).json(user);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
}

export function getUser(req: Request, res: Response) {
    User
        .findWithPosts()
        .then((users) => {
            res.json(users);
        })
        .catch(() => {
            res.status(404).send();
        });
}

export async function signUp(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });


    if (userExists) {
        return res.status(401).send({ message: 'User already exists!!!!!' });
    }

    User.register({
        email,
        password
    }).then(async (doc) => {
        sendToken(res, { email, userId: String(doc._id) });
    });
}

export function login(req: Request, res: Response) {
    const { email, password } = req.body;
    User
        .findOne({
            email,
            password
        })
        .then((user) => {
            if (user) {
                sendToken(res, { email, userId: String(user._id) });
            }
            else {
                res.status(401).send();
            }
        })
        .catch(() => {
            res.status(500).send();
        });
}