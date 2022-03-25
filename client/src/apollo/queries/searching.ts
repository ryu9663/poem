import { gql } from "@apollo/client";

export const GET_POEM_BY_AUTHOR = gql`
  query poemByAuthor($author: String!) {
    poemByAuthor(author: $author) {
      id
      poem {
        text
        title
      }
    }
  }
`;
