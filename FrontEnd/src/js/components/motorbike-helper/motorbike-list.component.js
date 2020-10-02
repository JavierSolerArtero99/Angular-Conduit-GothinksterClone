class MotorbikeListCtrl {
    constructor($scope, $state) {
        'ngInject';

        this._$scope = $scope;
        this._$state = $state;
        this._$scope.openDetails = function () {
            console.log("Se ha llamado a openDetails() desde el CONTROLADOR DE LA LISTA")
            $state.go("app.motorbikeDetails", { id: this.motorbike["slug"] });
        };

        //Filters
        this.filtering = false;
        this.cvFilter = "";
    }

    filter() {
        this.filtering = true
        this.noResults = false
        let aux = this.motorbikes.filter((element) => element.cv === this.cvFilter);
        this.motorbikes = aux
        console.log("Filtered")
        console.log(aux);

        if (this.motorbikes.length < 1) {
            this.noResults = true
        }
    }

    cleanFilter() {
        this.filtering = false;
        this.motorbikes = cars;
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