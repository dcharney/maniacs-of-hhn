const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }

    type Year {
        _id: ID
        year: String
    }

    type Park {
        _id: ID
        park: String
    }

    type Imap {
        top: Int
        left: Int
    }

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
        park: Park
        year: Year
        description: String
        imap: Imap
        comments: [Comment]
        category: Category
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

    type Rating {
        _id: ID
        username: String
        attractionId: String
        scareFactor: Float
        crowdIndex: Float
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        categories: [Category]
        years: [Year]
        parks: [Park]
        users: [User]
        me: User
        attractions(category: ID, name: String): [Attraction]
        attraction(_id: ID!): Attraction
        posts: [Post]
        post(_id: ID!): Post
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        savePost(postId: ID!) : User
        saveAttraction(attractionId: ID!) : User
        addPostComment(username: String!, commentBody: String!, createdAt: String) : Post
        addAttractionComment(username: String!, commentBody: String!, createdAt: String) : Attraction
        addReply(username: String!, replyBody: String!, createdAt: String) : Comment
        addRating(username: String, attractionId: String, scareFactor: Float, crowdIndex: Float) : Rating
    }
`;

module.exports = typeDefs;