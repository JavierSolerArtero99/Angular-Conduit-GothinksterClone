import { merge } from 'lodash';

// .exec() is used at the end of the GET mongoose queries so it doesn't run twice

const QueryResolvers = {
  Query: {
      message: () => 'Hello World!',
      authenticationError: () => {
        throw new AuthenticationError('must authenticate');
      }
  }
}

import UserResolvers from "../../graphql/resolvers/users/user.resolver";

const resolvers = merge(
  QueryResolvers,
  UserResolvers,
);

export default resolvers;