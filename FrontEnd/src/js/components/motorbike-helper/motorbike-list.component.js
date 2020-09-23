class MotorbikeListCtrl {
    constructor($scope, $state) {
        'ngInject';

        this._$scope = $scope;
        this._$state = $state;
        this._$scope.openDetails = function () {
            //aqui esta el problema, no me detecta bien el componente html
            //aqui esta el problema, no me detecta bien el componente html
            //aqui esta el problema, no me detecta bien el componente html
            //aqui esta el problema, no me detecta bien el componente html
            //aqui esta el problema, no me detecta bien el componente html
            //aqui esta el problema, no me detecta bien el componente html
            //aqui esta el problema, no me detecta bien el componente html
            //aqui esta el problema, no me detecta bien el componente html
            console.log("Se ha llamado a openDetails() desde el CONTROLADOR DE LA LISTA")
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