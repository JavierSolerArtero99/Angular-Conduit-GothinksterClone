import { log } from "gulp-util";

function MotorbikeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.motorbike', {
      url: '/motorbikes/',
      controller: 'MotorbikeCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'motorbike/motorbike.html',
      title: 'Motorbike',
      resolve: {
        motorbikes: function (Motorbikes, $state) {
          return Motorbikes.getMotorbikes().then(
            (motorbikes) => motorbikes,
            (err) => $state.go('app.home')
          )
        }
      }
    })

    .state('app.motorbikeDetails', {
      url: "/motorbikes/:id",
      controller: 'MotorbikeDetailsCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'motorbike/motorbike-details.html',
      title: 'Motorbike Details',
      resolve: {
        motorbike: function (Motorbikes, $state, $stateParams) {
          return Motorbikes.getMotorbike($stateParams.id).then(
            (motorbike) => motorbike,
            (err) => $state.go('app.home')
          )
        }
      }
    })
};

export default MotorbikeConfig;
