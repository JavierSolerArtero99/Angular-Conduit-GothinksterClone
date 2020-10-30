const router = require('express').Router();
const mongoose = require('mongoose');
const Motorbike = mongoose.model('Motorbike');
const MotorbikeComment = mongoose.model('MotorbikeComment');
const User = mongoose.model('User');
const faker = require('faker');

/** Genera motos de forma aleatoria asignadoselas a un usuario tambien de forma aleatoria*/
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

/** Elimina la moto pasada por parametro y todos de los comentarios  que estas tienen */
router.delete('/deleteMotorbikeAndFeatures/:slug', async (req, res, next) => {
    try {
        var motorbikeToDelete = await Motorbike.findOne({ slug: req.params.slug }).populate("motorbikeComments")

        // eliminacion en la tabla de comentarios
        for (let i = 0; i < motorbikeToDelete.motorbikeComments.length; i++) {
            await MotorbikeComment.remove({ _id: motorbikeToDelete.motorbikeComments[i]._id })
        }

        //eliminacion de favoritos de todos los usuarios que le han dado like
        var usersLikesMotorbike = await User.find({favoritesMotorbikes: motorbikeToDelete._id})
        for (let i = 0; i < usersLikesMotorbike.length; i++) {
            console.log(usersLikesMotorbike[i].username);            
            await usersLikesMotorbike[i].favoritesMotorbikes.remove(motorbikeToDelete._id)
            await usersLikesMotorbike[i].save()
        }

        await Motorbike.remove({ _id: motorbikeToDelete._id })
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(404);
    }
});

/** Elimina un usuario y todos los datos de este */
router.delete('/deleteUserAndFeatures/:user', async (req, res, next) => {
    try {
        // Busqueda del usuario
        var user = await User.findOne({ username: req.params.user })

        // Restando el numero de favoritos de todas las motos favoritas del usuario
        for (let i = 0; i < user.favoritesMotorbikes.length; i++) {
            var favoiteOne = await Motorbike.findOne({ _id: user.favoritesMotorbikes[i] })
            favoiteOne.favoritesCount--
            await favoiteOne.save()
        }

        // Eliminando el usuario de la lista de seguidos de todos los usuarios
        var userFollowers = await User.find({ following: user._id })
        for (let i = 0; i < userFollowers.length; i++) {
            userFollowers[i].following.remove(user._id)
            await userFollowers[i].save()
        }

        // Eliminando datos de las motos del usuario que afectan a otros usuarios
        var userMotorbikes = await Motorbike.find({ owner: user._id })
        for (let i = 0; i < userMotorbikes.length; i++) {
            // Eliminando comentarios de los usuarios que han comentado en las motos del usuario a borrar
            for (let j = 0; j < userMotorbikes[i].motorbikeComments.length; j++) {
                console.log(userMotorbikes[i].motorbikeComments[j]);
                await MotorbikeComment.remove({ _id: userMotorbikes[i].motorbikeComments[j] })
            }

            // Eliminando la moto de los favoritos de todos los usuarios que le hayan dado like
            let allUserFavoriteMotorbike = await User.find({ favoritesMotorbikes: userMotorbikes[i] })
            for (let j = 0; j < allUserFavoriteMotorbike.length; j++) {
                allUserFavoriteMotorbike[j].favoritesMotorbikes.remove(userMotorbikes[i]._id)
                await allUserFavoriteMotorbike[j].save()
            }

            userMotorbikes[i].remove()
            await userMotorbikes[i].save()
        }

        await user.remove()

        return res.sendStatus(200);

    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
});

module.exports = router;