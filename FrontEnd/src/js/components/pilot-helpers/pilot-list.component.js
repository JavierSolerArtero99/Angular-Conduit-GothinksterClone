class PilotListCtrl {
    constructor(Pilot, $scope) {
        'ngInject';

        this._Pilot = Pilot;
        this._$scope = $scope;
        // this._$scope.openDetails = function () {
        //     $state.go("app.motorbikeDetails", { id: this.motorbike["slug"] });
        // };
        this.$onInit = function () {
            console.log("LIST CONFIG");
            this.setListTo(this.listConfig);
        }
        $scope.$on('setListTo', (ev, newList) => {
            this.setListTo(newList);
        });

        $scope.$on('setPageTo', (ev, pageNumber) => {
            this.setPageTo(pageNumber);
        });

    }

    setListTo(newList) {
        this.list = [];
        this.listConfig = newList;
        this.runQuery();
    }

    setPageTo(pageNumber) {
        this.listConfig.currentPage = pageNumber;
        this.runQuery();
    }

    runQuery() {
        this.loading = true;
        this.listConfig = this.listConfig || {};
        let queryConfig = {
            type: this.listConfig.type || undefined,
            filters: this.listConfig.filters || {}
        }

        queryConfig.filters.limit = this.limit;

        if (!this.listConfig.currentPage) {
            this.listConfig.currentPage = 1;
        }

        queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));

        this._Pilot
            .getAll(queryConfig)
            .then((res) => {
                this.loading = false;
                this.pilots = res.pilots;
                console.log(this.pilots);
            })
    }
}

let PilotList = {
    bindings: {
        limit: '=',
        listConfig: '=',
    },
    controller: PilotListCtrl,
    templateUrl: 'components/pilot-helpers/pilot-list.html'
}

export default PilotList;