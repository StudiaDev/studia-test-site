import { AuthInput } from "@/components/auth/input";

export function Auth({ setActivationCode, authState, setAuthState }) {
    return (
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
    )
}