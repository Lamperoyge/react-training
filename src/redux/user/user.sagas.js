import { put, takeLatest, all, call } from "redux-saga/effects";

//ACTION TYPES
import {
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
  CHECK_USER_SESSION,
  SIGN_OUT_START,
  SIGN_UP_START,
} from "./user.types";

//ACTIONS

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.action";

//FIREBASE UTILS
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

export function* getSnapshotFromAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

//SIGN IN
export function* signInWithGoogle() {
  const { user } = yield auth.signInWithPopup(googleProvider);
  yield getSnapshotFromAuth(user);
}

export function* onGoogleSignInStart() {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
  const { user } = yield auth.signInWithEmailAndPassword(email, password);
  yield getSnapshotFromAuth(user);
}

export function* onEmailSignInStart() {
  yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
}

//CHECK AUTH USER
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* checkUserSession() {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

//SIGN OUT
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    put(signOutFailure(error));
  }
}
export function* onSignOutStart() {
  yield takeLatest(SIGN_OUT_START, signOut);
}

//SIGN UP

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    console.log(user);
    // yield createUserProfileDocument(user, {displayName});
    // yield signInWithEmail({payload: {email, password}});
    // yield signUpSuccess();
    yield all([
      call(createUserProfileDocument, user, { displayName }),
      call(signInWithEmail, { payload: { email, password } }),
      call(put, signUpSuccess),
    ]);
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(SIGN_UP_START, signUp);
}
//SAGAS COLLECTION
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(checkUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
  ]);
}
