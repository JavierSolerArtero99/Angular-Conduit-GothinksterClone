var mongoose = require('mongoose');

var PilotSchema = new mongoose.Schema({
    name: String,
    team: String,
    age: Number,
    country: String,
    cc: Number,
    mundialChapionship: Number
}, { timestamps: true });

PilotSchema.methods.toJSONFor = function (user) {
    (this.owner) ? userTo = this.owner : userTo = user
    return {
        name: this.name,
        team: this.team,
        age: this.age,
        country: this.country,
        cc: this.cc,
        mundialChapionship: this.mundialChapionship
    };
};

mongoose.model('Pilot', PilotSchema);