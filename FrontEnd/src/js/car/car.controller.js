import marked from 'marked';

class CarCtrl {
    constructor(cars, User, $scope) {
        'ngInject';

        this._$scope = $scope;
        this._$scope.cars = cars;
        this.currentUser = User.current;
    }
}

export default CarCtrl;