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
            this.filtering = true
            this.noResults = false
            this._$scope.cars = cars

            let aux = this._$scope.cars.filter((element) => element.cv === this.cvFilter);
            this._$scope.cars = aux

            if (this._$scope.cars.length < 1) {
                this.noResults = true
            }
        }

        this.cleanFilter = function () {
            this.filtering = false;
            this._$scope.cars = cars;
        }
    }



}

export default CarCtrl;