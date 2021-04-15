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

export const ADD_POST_COMMENT = gql`
  mutation addPostComment($postId: String!,$commentBody: String!) {
    addPostComment(postId: $postId, commentBody: $commentBody) {
      _id
      username
      commentBody
      createdAt
      replies {
        _id
        username
        replyBody
        createdAt
      }
    }
  }
`;

export const ADD_ATTRACTION_COMMENT = gql`
  mutation addAttractionComment($attractionId: String!,$commentBody: String!) {
    addAttractionComment(attractionId: $attractionId, commentBody: $commentBody) {
      _id
      username
      commentBody
      createdAt
      replies {
        _id
        username
        replyBody
        createdAt
      }
    }
  }
`;

export const ADD_REPLY = gql`
  mutation addReply($commentId: String!,$replyBody: String!) {
    addReply(commentId: $commentId, replyBody: $replyBody) {
      _id
      username
      replyBody
      createdAt
    }
  }
`;

export const SAVE_ATTRACTION = gql`
  mutation saveAttraction($attractionId: ID!) {
    saveAttraction(attractionId: $attractionId) {
      _id
      username
      savedAttractions {
        _id
      }
    }
  }
`;

export const REMOVE_ATTRACTION = gql`
  mutation removeAttraction($attractionId: ID!) {
    removeAttraction(attractionId: $attractionId) {
      _id
      username
      savedAttractions {
        _id
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
	mutation deleteComment ($commentId: ID!) {
		deleteComment(commentId: $commentId) {
			_id
		}
	}
`;

export const DELETE_REPLY = gql`
	mutation deleteReply ($replyId: ID!) {
		deleteReply(replyId: $replyId) {
			_id
		}
	}
`;