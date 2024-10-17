'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from 'react';

import "../styles/style.css";

export default function Home() {
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [chapterText, setChapterText] = useState('');
  const [error, setError] = useState(null);
  const [code, setCode] = useState('');                     // user activation code
  const [isActivated, setIsActivated] = useState(false);    // check if user is found

  const [topicIndex, setTopicIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(-1);

  const handleActivation = async () => {
    try {
      const res = await fetch(`/api/course?code=${code}`);
      const data = await res.json();
  
      if (data.status === 1) {
        // Success
        const { user, course, chapter, chapterText } = data.data;
  
        setUser(user);
        setCourse(course);
        setChapter(chapter);
        setChapterText(chapterText);
        setIsActivated(true);
        setError(null);
      } else {
        // Error
        console.error('Error:', data.error);
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  };
  

  if (!isActivated) {
    return (
      <main className="dark">
        <div className="activation-screen">
          <h1>Activate your test lecture.</h1>
          <Input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
          />
          <Button onClick={handleActivation}>Activate</Button>
          {error && <div className="error">{error}</div>}
        </div>
      </main>
    );
  }

  console.log('User state:', user);
  console.log('Course state:', course);
  console.log('Chapter state:', chapter);
  console.log('Chapter text:', chapterText);

  // find chapter that matches the ID from the course
  const courseChapter = chapter && course?.chapter === chapter._id ? chapter : null;

  // LEFT BUTTON
  const handleLeft = () => {
    if (contentIndex > -1) {
      setContentIndex(contentIndex - 1);
    } else if (topicIndex > 0) {
      const prevTopicIndex = topicIndex - 1;
      const prevTopicContentLength =
        chapterText.topic_list[prevTopicIndex].topic_content.length;
      setTopicIndex(prevTopicIndex);
      setContentIndex(prevTopicContentLength - 1);
    }
  };
  
  // RIGHT BUTTON
  const handleRight = () => {
    const currentTopic = chapterText.topic_list[topicIndex];
    if (contentIndex < currentTopic.topic_content.length - 1) {
      setContentIndex(contentIndex + 1);
    } else if (topicIndex < chapterText.topic_list.length - 1) {
      setTopicIndex(topicIndex + 1);
      setContentIndex(-1);
    }
  };
  

  return (
    <main className="dark">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={8}>
          <div className="header-logo elements">
            <img src="/images/logo.svg" alt="Logo" />
            <img src="/images/Studia.svg" alt="Studia" />
            <img src="/images/beta.svg" alt="Beta" />
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25}>
              <div className="elements container">
                <div className="top">
                  <h2 className="headers">Chapter Information</h2>

                  {error ? (
                    <div className="error">Error: {error}</div>
                  ) : courseChapter ? (
                    <Card className="card">
                      <CardHeader>
                        <div className="courseTitle">
                          <img src="/images/ellipse.svg" className="courseTitle-ellipse" />
                          <CardTitle>{courseChapter.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{course.number}: {course.title}</CardDescription>
                        <CardDescription>{course.professor}</CardDescription>
                      </CardContent>
                    </Card>
                  ) : (
                    <div>No data available</div>
                  )}

                  <h2 className="headers">Pipeline</h2>

                  <Card className="card">
                    <CardHeader>
                      <CardTitle>@frontera-beta/v090524</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h5 className="gray-text">Latest frontera build. Main changes include improvements to personality, quality of output, and accuracy.</h5>
                    </CardContent>
                  </Card>
                </div>

                <div className="bottom">
                  <h1>Having a problem? Report it here.</h1>

                  <h5>Report a bug</h5>

                  <div className="report-button">
                    <Input type="text" placeholder="Description" />
                    <Button>Send</Button>
                  </div>

                  <h6>This will be sent directly to our team.</h6>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel>
              <div className="content-display">
                <h2>
                  {contentIndex === -1
                    ? chapterText.topic_list[topicIndex].topic_title
                    : chapterText.topic_list[topicIndex].topic_content[contentIndex]}
                </h2>
                <div className="navigation-buttons">
                  <Button
                    onClick={handleLeft}
                    disabled={topicIndex === 0 && contentIndex === -1}
                  >
                    &larr;
                  </Button>
                  <Button
                    onClick={handleRight}
                    disabled={
                      topicIndex === chapterText.topic_list.length - 1 &&
                      contentIndex ===
                        chapterText.topic_list[topicIndex].topic_content.length - 1
                    }
                  >
                    &rarr;
                  </Button>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
