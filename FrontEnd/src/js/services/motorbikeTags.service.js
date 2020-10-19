export default class MotorbikeTags {
    constructor(JWT, AppConstants, $http, $q) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
    }

    getAll() {
        return this._$http({
            url: this._AppConstants.api + '/motorbikeTags',
            method: 'GET',
        }).then((res) => res.data.tags);
    }
}
