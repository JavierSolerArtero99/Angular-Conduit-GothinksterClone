import { log } from "gulp-util";

export default class Motorbikes {
    constructor(AppConstants, $http, $q) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
    }

    /* ====================PETICIONES A LA API==================== */

    /*
  Config object spec:
  {
    type: String [REQUIRED] - Accepts "all", "feed"
    filters: Object that serves as a key => value of URL params (i.e. {author:"ericsimons"} )
  }
*/
    query(config) {
        // Create the $http object for this request
        let request = {
            url: this._AppConstants.api + '/motorbikes' + ((config.type === 'feed') ? '/feed' : ''),
            method: 'GET',
            params: config.filters ? config.filters : null
        };
        return this._$http(request).then((res) => res.data);
    }

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

    /**
     * Obtiene el motorbike del slug pasado por parametro
     * @param {*} slug id de la motorbike
     */
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
            (res) => deferred.resolve(res.data.motorbike),
            (err) => deferred.reject(err)
        );

        return deferred.promise;
    }

    favorite(slug) {
        return this._$http({
            url: this._AppConstants.api + '/motorbikes/' + slug + '/favorite',
            method: 'POST'
        })
    }

    unfavorite(slug) {
        return this._$http({
            url: this._AppConstants.api + '/motorbikes/' + slug + '/favorite',
            method: 'DELETE'
        })
    }

    destroy(slug) {
        return this._$http({
            url: this._AppConstants.api + '/motorbikes/' + slug,
            method: 'DELETE'
        })
    }

    save(motorbike) {
        let request = {};
        console.log("GUARDANDO....");
        console.log(motorbike);

        if (motorbike.slug) {
            request.url = `${this._AppConstants.api}/motorbikes/${motorbike.slug}`;
            request.method = 'PUT';
            delete motorbike.slug;

        } else {
            request.url = `${this._AppConstants.api}/motorbikes`;
            request.method = 'POST';
        }

        request.data = { motorbike: motorbike };

        return this._$http(request).then((res) => res.data.motorbike);
    }
}
