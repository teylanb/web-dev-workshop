// Import the Redis library to interact with a Redis database
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize a connection to Redis
const redis = Redis.fromEnv(); // Set up Redis using environment settings

// Define a function called POST to handle incoming POST requests
export const POST = async (request: Request) => {
  // Read the information sent by the user and assign it to the variable called email
  const email = await request.json();

  // Add the new email to the beginning of the "emails" list in Redis
  const result = await redis.lpush("emails", email);

  // Return a response to the client with the result of the operation
  return new NextResponse(JSON.stringify({ result }), { status: 200 });
};
