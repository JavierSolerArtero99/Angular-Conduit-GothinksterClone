import marked from 'marked';

class MotorbikeCtrl {

    constructor(motorbikes, User, $scope) {
        'ngInject';
        this._$scope = $scope;
        this._$scope.motorbikes = motorbikes;
        this.currentUser = User.current;
    }
}

export default MotorbikeCtrl;