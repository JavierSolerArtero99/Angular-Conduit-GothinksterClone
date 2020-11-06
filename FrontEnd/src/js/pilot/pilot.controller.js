import marked from 'marked';

class PilotCtrl {

    constructor(pilots, User, $scope) {
        'ngInject';

        this._$scope = $scope;
        this._$scope.pilots = pilots;
        this.pilots = pilots;
    }

    $onInit(){
        console.log(this.pilots);
    }
}

export default PilotCtrl;