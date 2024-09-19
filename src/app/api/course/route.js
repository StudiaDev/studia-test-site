import { connectToDatabase } from "../../../lib/mongodb"
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();

    // get the code from the query parameter
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return new Response('Code is required', { status: 400 });
    }

    // find user by the code
    const user = await db.collection('users').findOne({ code: code });

    if (!user) {
      return new Response('No user found with this code', { status: 404 });
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
    const textLink = chapter.textFile.replace('/view?usp=drive_link', '').replace('/view?usp=sharing', '').replace('file/d/', 'uc?export=download&id=');
    console.log(textLink);
    const response = await fetch(textLink);

    // check if response is OK
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON: ${response.statusText}`);
    }

    // parse JSON content
    const jsonContent = await response.json();
    

    // return data
    return new Response(JSON.stringify({ user, course, chapter, chapterText: jsonContent }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
