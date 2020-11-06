export default class Pilots {
    constructor(AppConstants, $http, $q, GraphQLClientService) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
        this._GQL = GraphQLClientService;
    }

    getAll(config) {
        // if (!config.filters.offset) {
        //     config.filters.offset = 0;
        // }
        // if (!config.filters.limit) {
        //     config.filters.limit = 0;
        // }
        let query = `
        query {
            pilots {
                id
                name
                team
                age
                country
                cc
                mundialChapionship
            }
        } 
        `
        console.log("Despues del service");
        return this._GQL.get(query);
    }

    getPilot(name) {
        let deferred = this._$q.defer();
        if (!name.replace(" ", "")) {
            deferred.reject("Pilot name is empty")

            return deferred.promise;
        }
        
        let query = `
        query {
            pilot(name: "${name}"){
                id
                name
                team
                age
                country
                cc
                mundialChapionship
            }
        } 
        `
        return this._GQL.get(query)
    }
}