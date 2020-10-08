export default class MotorbikeComments {
    constructor(AppConstants, $http) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
    }

    // Add a comment to a motorbike
    add(slug, payload) {
        return this._$http({
            url: `${this._AppConstants.api}/motorbikes/${slug}/comments`,
            method: 'POST',
            data: { comment: { body: payload } }
        }).then((res) => res.data.comment);

    }

    getAll(slug) {
        return this._$http({
            url: `${this._AppConstants.api}/motorbikes/${slug}/comments`,
            method: 'GET',
        }).then((res) => res.data.comments);

    }

    destroy(commentId, motorbikeSlug) {
        return this._$http({
            url: `${this._AppConstants.api}/motorbikes/${motorbikeSlug}/comments/${commentId}`,
            method: 'DELETE',
        });
    }
}
