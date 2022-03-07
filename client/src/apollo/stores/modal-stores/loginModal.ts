import { makeVar } from "@apollo/client";

const isLoginModalVar = makeVar(false);

export const loginModalHandler = (open: boolean) => {
  isLoginModalVar(open);
};

export default isLoginModalVar;
