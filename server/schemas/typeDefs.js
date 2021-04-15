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
        savedAttractions: [Attraction]
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
        comment(_id: ID!): Comment
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        savePost(postId: String) : User
        saveAttraction(attractionId: ID!) : User
        removeAttraction( _id: ID!) : User
        addPostComment(postId: String!, commentBody: String!) : Post
        addAttractionComment(attractionId: String!, commentBody: String!) : Attraction
        addReply(commentId: String!, replyBody: String!) : Comment
        addRating(username: String, attractionId: String, scareFactor: Float, crowdIndex: Float) : Rating
    }
`;

module.exports = typeDefs;