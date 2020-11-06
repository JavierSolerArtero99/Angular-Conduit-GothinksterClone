const mongoose = require('mongoose');
const Pilot = mongoose.model('Pilot');

const resolvers = {
    Query: {
      pilot: (root, {name}) => {
        console.log("entrando");
        return Pilot.findOne({name: name}).exec();
      },
      pilots: () => {
        return Pilot.find().exec();
      },
    }
};

export default resolvers;