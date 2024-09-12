import { connectToDatabase } from "../../../lib/mongodb"
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();

    // fetch user
    // TODO: actually look for specific one
    const user = await db.collection('users').findOne({});

    if (!user) {
      return new Response('No user found', { status: 404 });
    }

    // fetch course document using course id from user
    const course = await db.collection('courses').findOne({ _id: user.course });

    if (!course) {
      return new Response('Course not found', { status: 404 });
    }

    // fetch chapters related to course
    const chapters = await db.collection('chapters')
      .find({ _id: { $in: course.chapters } })
      .toArray();

    // return user, course, and chapters as JSON
    return new Response(JSON.stringify({ user, course, chapters }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
