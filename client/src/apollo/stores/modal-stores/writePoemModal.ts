import { makeVar } from "@apollo/client";

const writePoemModalVar = makeVar(false);

export const writePoemModalHandler = (open: boolean) => {
  writePoemModalVar(open);
};

export default writePoemModalVar;
