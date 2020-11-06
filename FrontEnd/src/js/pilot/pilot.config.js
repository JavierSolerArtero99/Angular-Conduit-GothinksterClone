function MotorbikeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.pilot', {
      url: '/pilot/',
      controller: 'PilotCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'pilot/pilot.html',
      title: 'Pilot',
      resolve: {
        pilots: function (Pilot, $state) {
          return Pilot.getAll().then(
            (pilots) => pilots,
            (err) => $state.go('app.home')
          )
        }
      }
    })
};

export default MotorbikeConfig;
