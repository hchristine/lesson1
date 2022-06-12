import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../../types/jwt-payload';

const secret = process.env.SECRET;
if (!secret) {
    throw new Error("No JWT secret.")
};
export function sendToken(res: Response, payload: JwtPayload) {
    jwt.sign(payload, secret!, {
        expiresIn: "100h"
    }, (error, token) => {
        if (error) {
            res.status(500).send();
        } else {
            res.json({
                token
            });
        }
    });
}