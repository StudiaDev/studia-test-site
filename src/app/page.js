"use client";
import "../styles/style.css";
import Header from "@/components/header";
import { AuthInput } from "@/components/auth/input";
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [activationCode, setActivationCode] = useState("");
  const [authState, setAuthState] = useState("default"); // 'default', 'loading', 'error', 'activated'
  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [chapterText, setChapterText] = useState("");

  const { toast } = useToast()

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
        console.error("Error:", data.error);
        setError(data.error || "An error occurred");
        setAuthState("default");
        toast({
          title: "Incorrect Activation Code",
        })
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
      setAuthState("default");
      toast({
        title: "Error Fetching Data",
        description: "Make sure you have a stable internet connection."
      })
    }
  };

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
      <Toaster />
    </main>
  );
}
