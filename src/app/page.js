"use client";
import "../styles/style.css";
import Header from "@/components/header";
import { AuthInput } from "@/components/auth/input";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [activationCode, setActivationCode] = useState("");
  const [authState, setAuthState] = useState("listening"); // 'listening', 'loading', 'error', 'activated'
  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [chapterText, setChapterText] = useState("");

  useEffect(() => {
    if (authState === "loading") {
      handleActivation();
    }
  }, [authState]);

  const handleActivation = async () => {
    try {
      const res = await fetch(`/api/course?code=${activationCode}`);
      const data = await res.json();

      if (data.status === 1) {
        // Success
        const { user, course, chapter, chapterText } = data.data;

        setUser(user);
        setCourse(course);
        setChapter(chapter);
        setChapterText(chapterText);
        setAuthState("activated");
        setError(null);
      } else {
        // Error
        console.error("Error:", data.error);
        setError(data.error || "An error occurred");
        setAuthState("error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
      setAuthState("error");
    }
  };

  if (authState === "listening" || authState === "error") {
    return (
      <main className={`dark ${authState === "loading" ? "blurred" : ""}`}>
        <div className="auth-page-wrapper">
          <Header />
          <div className="auth-content-wrapper-col">
            <h2>Activate your test lecture.</h2>
            <p className="paragraph-text bottom-pad">
              Enter the 6-digit authorization code that was provided to you in the onboarding email.
            </p>
            <AuthInput
              setActivationCode={setActivationCode}
              authState={authState}
              setAuthState={setAuthState}
            />
            {error && <div className="error">{error}</div>}
            <div className="homepage-text">
              <p className="homepage-lead">Looking for our home page?</p>
              <p className="homepage-trail">Click here.</p>
            </div>
          </div>
        </div>
        <div className="footer">
          <img src="/images/logo.svg" className="small-image" />
          <div className="footer-subtext">
            Bite-sized lectures adapted to your learning style.
          </div>
          <div className="copyright">
            © 2024, Developed by passionate students in Texas.
          </div>
        </div>
      </main>
    );
  } else if (authState === "loading") {
    return (
      <main className="dark blurred">
        <div className="loading-overlay">Loading...</div>
      </main>
    );
  } else if (authState === "activated") {
    return (
      <main className="dark">
        <div className="activation-success">
          <h2>Activation successful</h2>
        </div>
      </main>
    );
  }

  return null;
}
