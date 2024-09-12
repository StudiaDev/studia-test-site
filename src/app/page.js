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
  const [chapters, setChapters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/course');
        const data = await res.json();

        console.log('Fetched data:', data);

        if (!data || !data.user || !data.course || !data.chapters) {
          console.error('No data found or some data is missing');
          setError('No data found');
          return;
        }

        setUser(data.user);
        setCourse(data.course);
        setChapters(data.chapters);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchUserData();
  }, []);

  console.log('User state:', user);
  console.log('Course state:', course);
  console.log('Chapters state:', chapters);

  // find chapter that matches the ID from the course
  const courseChapter = chapters.find(chapter => chapter._id === course?.chapters?.[0]);

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
              <div className="elements">
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
