export type PoemType = {
  __typename: string;
  id: string;
  poem: {
    __typename: string;
    title: string;
    text: string;
  };
  author: string;
  timestamp: number;
};
