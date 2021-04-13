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
export const QUERY_PARKS = gql`
    {
        parks {
            park
        }
    }
`;
export const QUERY_YEARS = gql`
    {
        years {
            year
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
        category { name }
        year { year }
        park { park }
      }
}
`;

export const QUERY_ATTRACTION_BY_ID = gql`
    query attraction($id: ID!) {
        attraction(_id: $id) {
            _id
            name
        }
    }
`;

export const QUERY_POST_BY_ID = gql`
    query post($id: ID!) {
        post(_id: $id) {
            _id
            category
            title
        }
    }
`