import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

export function createServer() {
  const app = express(); // Let TypeScript infer the type

  // Trust the X-Forwarded-* headers from reverse proxies like NGINX
  app.set('trust proxy', true);

  // Rate limiting middleware
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: Number(process.env.MAX_REQUESTS_PER_HOUR_PER_IP) || 5000,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(limiter);
  app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(','), credentials: true }));
  app.use(cookieParser());
  app.use(express.json());

  app.get('/appHealth', (req: Request, res: Response): void => {
    res.sendStatus(200);
  });

  return app;
}

/**
 * Middleware to capture outgoing JSON/Send responses and store in `res.locals.responseBody`
 */
export function captureResponseBody(req: Request, res: Response, next: NextFunction) {
  const originalSend = res.send;
  const originalJson = res.json;

  res.send = function (body: any) {
    res.locals.responseBody = body;
    return originalSend.call(this, body);
  };

  res.json = function (body: any) {
    res.locals.responseBody = body;
    return originalJson.call(this, body);
  };

  next();
}

export default createServer;
