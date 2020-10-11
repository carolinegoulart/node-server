import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // JWT validation
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  // Token format: Bearer eyJhbGciOiJIUzI1NiIsInR5c
  const [, token] = authHeader.split(' ');

  // verify will throw an error if the token is invalid
  try {
    // compares the token sent by the user (header request) with the
    // token sent
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    // this information will be stored and sent in the next requests
    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token.', 401);
  }
}
