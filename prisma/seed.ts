// prisma/seed.ts
import { PrismaClient, FollowStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const alice = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'hashedpassword123',
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      password: 'hashedpassword456',
    },
  });

  // Seed Places
  const park = await prisma.place.create({
    data: {
      name: 'Central Park',
      placeId: 'central_park_nyc',
      latitude: 40.785091,
      longitude: -73.968285,
    },
  });

  const museum = await prisma.place.create({
    data: {
      name: 'City Museum',
      placeId: 'city_museum_nyc',
      latitude: 40.779437,
      longitude: -73.963244,
    },
  });

  // Seed Events
  const event1 = await prisma.event.create({
    data: {
      title: 'Picnic in the Park',
      description: 'Let’s enjoy the sun!',
      dateTime: new Date('2025-08-10T10:00:00'),
      placeId: park.id,
      createdById: alice.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Museum Meetup',
      description: 'Explore art and culture.',
      dateTime: new Date('2025-08-15T14:00:00'),
      placeId: museum.id,
      createdById: bob.id,
    },
  });

  // Seed Follows / Friends
  await prisma.follow.create({
    data: {
      followerId: alice.id,
      followingId: bob.id,
      status: FollowStatus.FOLLOWING,
    },
  });

  await prisma.follow.create({
    data: {
      followerId: bob.id,
      followingId: alice.id,
      status: FollowStatus.FRIEND,
    },
  });

  // Seed RSVPs
  await prisma.rSVP.create({
    data: {
      userId: alice.id,
      placeId: park.id,
      eventId: event1.id,
      dateTime: new Date('2025-08-10T10:00:00'),
      going: true,
    },
  });

  await prisma.rSVP.create({
    data: {
      userId: bob.id,
      placeId: museum.id,
      eventId: event2.id,
      dateTime: new Date('2025-08-15T14:00:00'),
      going: false,
    },
  });

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
