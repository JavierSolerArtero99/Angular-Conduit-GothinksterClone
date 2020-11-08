import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        pilot(name: String!): Pilot
        pilots: [Pilot]
    }
    extend type Mutation {
        createPilot(input: PilotInput): Pilot
    }
    type Pilot {
        id: ID!
        name: String,
        img: String,
        team: String,
        age: Int,
        country: String,
        cc: Int,
        mundialChapionship: Int
    }
    input PilotInput {
        name: String,
        img: String,
        team: String,
        age: Int,
        country: String,
        cc: Int,
        mundialChapionship: Int
    }
`;

export default typeDefs;