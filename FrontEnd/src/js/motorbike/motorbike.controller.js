import marked from 'marked';

class MotorbikeCtrl {

    constructor(motorbikes, User, $scope) {
        'ngInject';

        this._$scope = $scope;
        this._$scope.motorbikes = motorbikes;
        this.currentUser = User.current;
        this.motorbikes = motorbikes;
        this.auxMotorbikes = motorbikes;

        // Filters
        this.filtering = false;
        this.cvFilter = "";
        this.filter = function() {
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

        // solucionar el guardado de las motos no va el filter
        this.cleanFilter = function() {
            this.filtering = false;
            this.motorbikes = this.auxMotorbikes;
        }
    }
}

export default MotorbikeCtrl;