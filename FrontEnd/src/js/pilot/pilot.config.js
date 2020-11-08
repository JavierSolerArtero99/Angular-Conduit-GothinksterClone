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

    .state('app.pilotDetails', {
      url: "/pilot/:name",
      controller: 'PilotDetailsCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'pilot/pilot-detail.html',
      title: 'Pilot Details',
      resolve: {
        pilot: function (Pilot, $state, $stateParams) {
          return Pilot.getPilot($stateParams.name).then(
            (pilot) => pilot,
            (err) => {
              console.log(err);
              $state.go('app.home')}
          )
        }
      }
    })

};

export default MotorbikeConfig;
