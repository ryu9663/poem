import { gql } from "@apollo/client";
import todoVar from "../stores/isLogin";

export const GET_POEMS = gql`
  query Poems {
    poems {
      id
      poem {
        title
        text
      }
      author
      timestamp
    }
  }
`;

export const CREATE_POEMS = gql`
  mutation create($title: String!, $text: String!, $author: String!) {
    createPoem(title: $title, text: $text, author: $author) {
      poem {
        title
        text
      }
      author
      timestamp
    }
  }
`;
