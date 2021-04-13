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
        _id
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

export const QUERY_ATTRACTION = gql`
    query getAttraction($id: ID! ) {
        attraction(_id: $id) {
            name
            logo
            park { park }
            year { year }
            description
            category { name }
        }
    }
`;