import marked from 'marked';

class CarCtrl {
    constructor(cars, User, $scope) {
        'ngInject';

        this._$scope = $scope;
        this._$scope.cars = cars;
        this.currentUser = User.current;

        // Filters 
        this.filtering = false;
        this.cvFilter = "";
        this.filter = function () {
            console.log("Filtering")
            let aux = [this._$scope.cars[0]]
            this._$scope.cars = aux
        }
    }



}

export default CarCtrl;