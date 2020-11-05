import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        user(username: String!): User
        users: [User]
    }
    type User {
        id: ID!
        idsocial: String
        username: String
        email: String
        image: String
        hash: String
        salt: String
        isAdmin: Boolean
        karmaLvl: Int
    }
`;

export default typeDefs;