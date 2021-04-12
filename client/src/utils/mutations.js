import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addPostComment($postId: String!,$commentBody: String!) {
    addPostComment(postId: $postId, commentBody: $commentBody) {
      comments {
        _id
        username
        commentBody
        createdAt
      }
    }
  }
`;