import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          value={email}
          required={true}
          name="email"
          label={"Email"}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          value={password}
          required={true}
          name="password"
          label={"Password"}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <CustomButton type="submit">SIGN IN</CustomButton>
      </form>
    </div>
  );
};

export default SignIn;
