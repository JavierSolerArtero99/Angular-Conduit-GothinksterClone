const mongoose = require('mongoose');
const Pilot = mongoose.model('Pilot');

const resolvers = {
  Query: {
    pilot: (root, { name }) => {
      return Pilot.findOne({ name: name }).exec();
    },
    pilots: () => {
      return Pilot.find().exec();
    },
  },
  Mutation: {
    createPilot: (root, { input }) => {
      const pilot = new Pilot(input);
      pilot.save();
      return pilot;
    }
  },
};

export default resolvers;