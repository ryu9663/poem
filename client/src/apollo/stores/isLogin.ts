import { makeVar } from "@apollo/client";

// export type LoginType = {isLogin:boolean;}

const isLoginVar = makeVar(false);

export const loginHandler = (isLogin: boolean) => {
  isLoginVar(isLogin);
};

export default isLoginVar;
