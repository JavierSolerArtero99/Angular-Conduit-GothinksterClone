import marked from 'marked';

class PilotCtrl {

    constructor(pilots, User, $scope) {
        'ngInject';

        this._$scope = $scope;
        this._$scope.pilots = pilots;
        this.pilots = pilots;
    }
}

export default PilotCtrl;