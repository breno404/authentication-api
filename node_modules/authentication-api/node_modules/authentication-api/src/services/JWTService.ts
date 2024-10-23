import env from '@/config/env';
import jwt from 'jsonwebtoken';

const JWT_SECRET = env.JWT_SECRET
const JWT_REFRESH_SECRET = env.JWT_REFRESH_SECRET

function createToken(payload: any, secret: string, expiresIn: string) {

    return jwt.sign(payload, secret, { expiresIn });
}

export const generateAccessToken = (payload: any) => createToken(payload, JWT_SECRET, '15m')
export const generateRefreshToken = (payload: any) => createToken(payload, JWT_REFRESH_SECRET, '7d');

export const verifyAccessToken = (token: string, cb: (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => any) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) cb(err, undefined);
        else cb(null, decoded);
    });
}

export const verifyRefreshToken = (token: string, cb: (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => any) => {
    jwt.verify(token, JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) cb(err, undefined);
        else cb(null, decoded);
    });
}

export type JWTService = {
    generateAccessToken: (payload: any) => string;
    generateRefreshToken: (payload: any) => string;
    verifyAccessToken: (token: string, cb: (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => any) => void;
    verifyRefreshToken: (token: string, cb: (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => any) => void;
}

export default {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}