// src/index.ts
import * as dotenv from 'dotenv';
dotenv.config();

import { createServer } from './server';

import { PrismaClient } from '@prisma/client';

import { AuthenticateAndAuthorize } from './api/middleware/AuthenticateAndAuthorize';
import { JwtService } from './security/JwtService';

import { AuthRouter } from './api/routers/AuthRouter';
import { EventRouter } from './api/routers/EventRouter';
import { PlaceRouter } from './api/routers/PlaceRouter';
import { RSVPRouter } from './api/routers/RSVPRouter';
import { UserRouter } from './api/routers/UserRouter';
import { FollowRouter } from './api/routers/FollowRouter';

import { AuthController } from './api/controller/AuthController';
import { EventController } from './api/controller/EventController';
import { PlaceController } from './api/controller/PlaceController';
import { RSVPController } from './api/controller/RSVPController';
import { UserController } from './api/controller/UserController';
import { FollowController } from './api/controller/FollowController';

import { UserPrisma } from './data/data-sources/UserPrisma';
import { EventPrisma } from './data/data-sources/EventPrisma';
import { PlacePrisma } from './data/data-sources/PlacePrisma';
import { RSVPPrisma } from './data/data-sources/RSVPPrisma';
import { FollowPrisma } from './data/data-sources/FollowPrisma';

import { AuthServiceImpl } from './services/auth/AuthServiceImpl';
import { EventServiceImpl } from './services/event/EventServiceImpl';
import { PlaceServiceImpl } from './services/place/PlaceServiceImpl';
import { RSVPServiceImpl } from './services/rsvp/RSVPServiceImpl';
import { UserServiceImpl } from './services/user/UserServiceImpl';
import { FollowServiceImpl } from './services/follow/FollowServiceImpl';

const app = createServer();

const prisma = new PrismaClient();

// Instantiate repositories
const userRepository = new UserPrisma(prisma);
const eventRepository = new EventPrisma(prisma);
const placeRepository = new PlacePrisma(prisma);
const rsvpRepository = new RSVPPrisma(prisma);
const followRepository = new FollowPrisma(prisma);

// Instantiate services
const authService = new AuthServiceImpl(userRepository);
const eventService = new EventServiceImpl(eventRepository);
const placeService = new PlaceServiceImpl(placeRepository);
const rsvpService = new RSVPServiceImpl(rsvpRepository);
const userService = new UserServiceImpl(userRepository);
const followService = new FollowServiceImpl(followRepository);

const jwtService = new JwtService();
const authMiddleware = new AuthenticateAndAuthorize(jwtService);

// Instantiate controllers
const authController = new AuthController(authService);
const eventController = new EventController(eventService);
const placeController = new PlaceController(placeService);
const rsvpController = new RSVPController(rsvpService);
const userController = new UserController(userService);
const friendController = new FollowController(followService);

// Attach routers
app.use('/user', new AuthRouter(authController).routes);
app.use('/events', new EventRouter(eventController, authMiddleware).routes);
app.use('/places', new PlaceRouter(placeController).routes);
app.use('/rsvp', new RSVPRouter(rsvpController, authMiddleware).routes);
app.use('/users', new UserRouter(userController, authMiddleware).routes);
app.use('/follow', new FollowRouter(friendController, authMiddleware).routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));
