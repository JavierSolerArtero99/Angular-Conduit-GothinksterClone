function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'home/home.html',
    title: 'Home',
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

export default HomeConfig;
