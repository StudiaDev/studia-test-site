import { connectToDatabase } from "../../../lib/mongodb";
import { NextResponse } from 'next/server';

async function getUser(db, code) {
  const user = await db.collection('users').findOne({ code: code });
  if (!user) {
    throw { status: 404, message: 'No user found with this code' };
  }
  return user;
}

async function getCourse(db, user) {
  const course = await db.collection('courses').findOne({ _id: user.course });
  if (!course) {
    throw { status: 404, message: 'Course not found' };
  }
  return course;
}

async function getChapter(db, course) {
  const chapter = await db.collection('chapters').findOne({ _id: course.chapter });
  if (!chapter) {
    throw { status: 404, message: 'Chapter not found' };
  }
  return chapter;
}

async function fetchChapterText(chapter) {
  const textLink = chapter.textFile
    .replace('/view?usp=drive_link', '')
    .replace('/view?usp=sharing', '')
    .replace('file/d/', 'uc?export=download&id=');
  console.log(textLink);

  const response = await fetch(textLink);

  if (!response.ok) {
    throw { status: response.status, message: `Failed to fetch JSON: ${response.statusText}` };
  }

  const jsonContent = await response.json();
  return jsonContent;
}

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ status: 0, error: 'Code is required' }, { status: 400 });
    }

    // fetch user, course, chapter, and chapter text using separate functions
    const user = await getUser(db, code);
    const course = await getCourse(db, user);
    const chapter = await getChapter(db, course);
    const chapterText = await fetchChapterText(chapter);

    // return structured response
    return NextResponse.json(
      { status: 1, data: { user, course, chapter, chapterText } },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in API route:', error);
    const statusCode = error.status || 500;
    const errorMessage = error.message || 'Internal Server Error';
    return NextResponse.json({ status: 0, error: errorMessage }, { status: statusCode });
  }
}