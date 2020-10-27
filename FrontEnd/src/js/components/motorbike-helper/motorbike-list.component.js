class MotorbikeListCtrl {
    constructor(Motorbikes, $scope) {
        'ngInject';

        this._Motorbikes = Motorbikes;
        this._$scope = $scope;
        this._$scope.openDetails = function () {
            $state.go("app.motorbikeDetails", { id: this.motorbike["slug"] });
        };
        this.$onInit = function () {
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

        this._Motorbikes
            .query(queryConfig)
            .then((res) => {
                this.loading = false;
                (res.motorbike) ? this.motorbikes = res.motorbike : this.motorbikes = res.motorbikes;
                console.log(this.motorbikes);
                this.listConfig.totalPages = Math.ceil(res.motorbikesCount / this.limit);
            })
    }
}

let MotorbikeList = {
    bindings: {
        limit: '=',
        listConfig: '=',
    },
    controller: MotorbikeListCtrl,
    templateUrl: 'components/motorbike-helper/motorbike-list.html'
}

export default MotorbikeList;