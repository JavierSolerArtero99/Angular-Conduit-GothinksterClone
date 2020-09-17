function CarConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.car', {
      url: '/cars/',
      controller: 'CarCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'car/car.html',
      title: 'Cars',
      resolve: {
        cars: function (Cars, $state) {
          return Cars.getCars().then(
            (cars) => cars,
            (err) => $state.go('app.home')
          )
        }
      }
    });
};

export default CarConfig;
