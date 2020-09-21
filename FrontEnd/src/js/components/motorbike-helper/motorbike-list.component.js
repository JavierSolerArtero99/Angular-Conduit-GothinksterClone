class MotorbikeListCtrl {
    constructor(Motorbikes, $scope) {
        'ngInject';

        this._$scope = $scope;
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