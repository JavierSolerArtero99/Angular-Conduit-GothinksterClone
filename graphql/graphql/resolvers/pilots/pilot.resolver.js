const mongoose = require('mongoose');
const Pilot = mongoose.model('Pilot');

const resolvers = {
    Query: {
      pilot: (root, {name}) => {
        return Pilot.findOne({name: name}).exec();
      },
      pilots: () => {
        return Pilot.find().exec();
      },
    }
};

export default resolvers;