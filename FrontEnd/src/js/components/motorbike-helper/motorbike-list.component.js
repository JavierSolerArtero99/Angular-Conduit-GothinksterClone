class MotorbikeListCtrl {
    constructor(Motorbikes, $scope, $state) {
        'ngInject';

        this._$scope = $scope;
        this._$state = $state;
        this._$scope.openDetails = function () {
            $state.go("app.motorbikeDetails", { id: this.motorbike["slug"] });
        };
    }
}

let MotorbikeList = {
    bindings: {
        motorbikes: '='
    },
    controller: MotorbikeListCtrl,
    templateUrl: 'components/motorbike-helper/motorbike-list.html'
}

export default MotorbikeList;