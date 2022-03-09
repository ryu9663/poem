import { makeVar } from "@apollo/client";

const isSignUpModalVar = makeVar(false);

export const signUpModalHandler = (open: boolean) => {
  isSignUpModalVar(open);
};

export default isSignUpModalVar;
