import gql from 'graphql-tag';

export const QUERY_USERS = gql`
    {
        users {
            _id
            username
            email
        }
    }
`;

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
        }
    }
`;

export const QUERY_CATEGORIES = gql`
    {
        categories {
            name
        }
    }
`;

export const QUERY_ATTRACTIONS_SHORT = gql`
{
    attractions {
        name
        imap {
            top
            left
        }
        category {
            name
        }
      }
}
`;