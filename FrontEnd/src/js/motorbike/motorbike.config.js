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
    });
};

export default MotorbikeConfig;
