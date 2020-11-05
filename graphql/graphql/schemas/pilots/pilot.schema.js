import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        pilot(name: String!): Pilot
        pilots: [Pilot]
    }
    type Pilot {
        id: ID!
        name: String,
        team: String,
        age: Int,
        country: String,
        cc: Int,
        mundialChapionship: Int
    }
`;

export default typeDefs;