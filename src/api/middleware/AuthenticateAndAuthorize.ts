// src/api/middleware/AuthenticateAndAuthorize.ts
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../security/JwtService';

export interface AuthenticatedUser {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export class AuthenticateAndAuthorize {
  constructor(private readonly jwtService: JwtService) {}

  authenticate() {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
        return;
      }

      const token = authHeader.split(' ')[1];

      try {
        const decoded = await this.jwtService.verify(token);

        if (!decoded || !decoded.userId || !decoded.email) {
          res.status(403).json({ message: 'Invalid token payload' });
          return;
        }

        req.user = {
          id: decoded.userId,
          email: decoded.email,
        };

        next();
      } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
      }
    };
  }
}
