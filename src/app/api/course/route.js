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

    // fetch chapter related to course
    const chapter = await db.collection('chapters').findOne({ _id: course.chapter });

    if (!chapter) {
      return new Response('Chapter not found', { status: 404 });
    }

    // fetch text file content from Google Drive
    var textLink2 = chapter.textFile.replace('/view?usp=sharing', '');
    const textLink = textLink2.replace('file/d/', 'uc?export=download&id=');
    const response = await fetch(textLink);
    const textContent = await response.text();

    // return data
    return new Response(JSON.stringify({ user, course, chapter, chapterText: textContent }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
