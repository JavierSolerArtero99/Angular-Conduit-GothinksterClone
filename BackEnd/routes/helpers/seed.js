const router = require('express').Router();
const mongoose = require('mongoose');
const Motorbike = mongoose.model('Motorbike');
const User = mongoose.model('User');
const faker = require('faker');

router.post('/generateMotorbikes/:qty', async (req, res, next) => {
    try {
        var toInsert = [];
        var motorbikeNames = [
            "Suzuki",
            "Husqvarna",
            "KTM",
            "Vespa",
            "Ducati",
            "BMW",
            "Kawasaki",
            "Harley-Davidson",
            "Victoria",
            "Bultaco",
            "Triumph",
            "Yamaha",
            "Yamaha",
            "Honda",
            "Derbi",
            "Aprilia",
            "Rieju",
        ];
        var qty = req.params.qty;
        var users = await User.find()
        
        var tags = await Motorbike.find().distinct('motorbikeTags');
        var tag = tags[Math.floor(faker.random.number(tags.length - 1))];

        for (let i = 0; i < qty; i++) {
            var motorbikeName = motorbikeNames[Math.floor(Math.random() * motorbikeNames.length)];
            var owner = users[faker.random.number(users.length - 1)];
            var newMotorbike = new Motorbike({
                name: motorbikeName + " " + faker.lorem.word(),
                cv: Math.floor(faker.random.number(1200)) + "",
                color: faker.vehicle.color(),
                motorbikeTags: [tag],
                owner: owner._id
            });
            toInsert.push(newMotorbike);
        }

        await Motorbike.insertMany(toInsert);
        return res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});



module.exports = router;