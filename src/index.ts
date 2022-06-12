declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

import { start } from './server';
import { JwtPayload } from './types/jwt-payload';

start();