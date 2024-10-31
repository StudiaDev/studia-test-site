"use client";
import "../styles/style.css";
import Header from "@/components/header";
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { Auth } from "@/pages/auth";
import { Portal } from "@/pages/portal";

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
          title: "Invalid Activation Code",
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
        {authState != "activated" && <Auth
          setActivationCode={setActivationCode}
          authState={authState}
          setAuthState={setAuthState}
        />}
        {authState === "activated" && <Portal 
          course={course}
          chapter={chapter}
          chapterText={chapterText}
        />}
      </div>
      <Toaster />
    </main>
  );
}
