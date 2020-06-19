import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils.js";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.action";
const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    emailSignInStart(email, password);
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
        <div className="buttons">
          <CustomButton type="submit">SIGN IN</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
