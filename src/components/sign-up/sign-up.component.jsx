import React, { useReducer } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import "./sign-up.styles.scss";
import { signUpStart } from "../../redux/user/user.action";
const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function reducer(state, { name, value }) {
  return {
    ...state,
    [name]: value,
  };
}

const SignUp = ({ signUpStart }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { displayName, email, password, confirmPassword } = state;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    signUpStart({ email, password, displayName });
    // try {
    //   const { user } = await auth.createUserWithEmailAndPassword(
    //     email,
    //     password
    //   );
    //   createUserProfileDocument(user, { displayName });
    //   dispatch(initialState);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ name, value });
  };
  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span className="Sign up with your email and password"></span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
          label="Display name"
        />
        <FormInput
          type="text"
          required
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
        />
        <FormInput
          type="password"
          name="password"
          required
          value={password}
          onChange={handleChange}
          label="Password"
        />
        <FormInput
          type="password"
          name="confirmPassword"
          required
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm password"
        />
        <CustomButton type="submit">Sign up</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (payload) => dispatch(signUpStart(payload)),
});
export default connect(null, mapDispatchToProps)(SignUp);
