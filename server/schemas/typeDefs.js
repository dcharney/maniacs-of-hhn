const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        favoritePost: [Post]
        favoriteAttraction: [Attraction]
    }

    type Attraction {
        _id: ID
        name: String
        logo: String
        location: String
        category: String
        year: Int
        description: String
        comments: [Comment]
    }

    type Post {
        _id: ID
        category: String
        image: String
        title: String
        content: String
        comments: [Comment]
        createdAt: String
    }

    type Comment {
        _id: ID
        username: String
        commentBody: String
        createdAt: String
        replies: [Reply]
    }

    type Reply {
        _id: ID
        username: String
        replyBody: String
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;