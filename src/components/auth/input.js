import React, { useState, useEffect } from 'react'; 
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/shadcn/input-otp"

export function AuthInput({ setActivationCode, authState, setAuthState }) {
    const [value, setValue] = useState('');
    
    useEffect(() => {
        if (value.length === 6) {
            setActivationCode(value)
            setAuthState("load")
        }
    }, [value]);
  
    const handleChange = (e) => {
      setValue(e);
    };
  
    return (
      <InputOTP 
        value={value}
        onChange={handleChange}
        maxLength={6}
        disabled={authState === "load" ? "disabled" : ""}>
        <InputOTPGroup className="auth-numpad">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator className="auth-numpad"/>
        <InputOTPGroup className="auth-numpad">
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>                   
    )
  }