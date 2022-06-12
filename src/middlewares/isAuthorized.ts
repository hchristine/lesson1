import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/jwt-payload';

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(403).send();
        return;
    }
    jwt.verify(req.headers.authorization, process.env.SECRET!, (error, decoded) => {
        if (error) {
            res.status(400).send();
            return;
        }
        req.user = decoded as JwtPayload;
        next();
    })
}