"use client";
import "../styles/style.css"
import Header from "@/components/header";
import { AuthInput } from "@/components/auth/input";
import React, { useState, useEffect } from 'react'; 

export default function Home() {
  const [activationCode, setActivationCode] = useState('');
  const [authState, setAuthState] = useState('listening');

  return (
    <main className={`dark ${authState === 'load' ? 'blurred' : ''}`}>
      <div className="auth-page-wrapper">
        <Header />
        <div className="auth-content-wrapper-col">
          <h2>Activate your test lecture.</h2>
          <p className="paragraph-text bottom-pad">Enter the 6-digit authorization code that was provided to you in the onboarding email.</p>
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
      <div class='footer'>
        <img src='/images/logo.svg' class="small-image" />
        <div class="footer-subtext">Bite-sized lectures adapted to your learning style.</div>
        <div class="copyright">© 2024, Developed by passionate students in Texas.</div>
      </div>
    </main>
  );
}
