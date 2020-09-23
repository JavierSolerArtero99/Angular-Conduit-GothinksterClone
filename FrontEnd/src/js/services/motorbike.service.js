import { log } from "gulp-util";

export default class Motorbikes {
    constructor(AppConstants, $http, $q) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
    }

    /* ====================PETICIONES A LA API==================== */

    /**
     * Obtiene todos los coches de la base de datos
     */
    getMotorbikes() {
        return this._$http({
            url: this._AppConstants.api + '/motorbikes/ ',
            method: 'GET',
        }).then(res => {
            return res.data.motorbikes;
        });
    }

    getMotorbike(slug) {
        let deferred = this._$q.defer();

        if (!slug.replace(" ", "")) {
            deferred.reject("Car slug is empty");
            return deferred.promise;
        }

        this._$http({
            url: this._AppConstants.api + '/motorbikes/' + slug,
            method: 'GET'
        }).then(
            (res) =>deferred.resolve(res.data.motorbike),
            (err) => deferred.reject(err)
        );

        return deferred.promise;
    }

    // ..........................................................................................................................................

    // --------------------------peticiones a la base de datos de articulos--------------------------

    destroy(slug) {
        return this._$http({
            url: this._AppConstants.api + '/articles/' + slug,
            method: 'DELETE'
        })
    }

    save(article) {
        let request = {};

        if (article.slug) {
            request.url = `${this._AppConstants.api}/articles/${article.slug}`;
            request.method = 'PUT';
            delete article.slug;

        } else {
            request.url = `${this._AppConstants.api}/articles`;
            request.method = 'POST';
        }

        request.data = { article: article };

        return this._$http(request).then((res) => res.data.article);
    }
}
