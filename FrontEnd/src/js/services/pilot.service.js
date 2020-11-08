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
                img
                team
                age
                country
                cc
                mundialChapionship
            }
        } 
        `
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
                img
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

    savePilot(pilotInput) {
        console.log("SSE VA A AñADITRRR", pilotInput);
        let createPilot = `
            mutation {
                createPilot(input:{
                    name: "${pilotInput.name}",
                    img: "${pilotInput.img}",
                    team: "${pilotInput.team}",
                    age: ${pilotInput.age},
                    country: "${pilotInput.country}",
                    cc: ${pilotInput.cc},
                    mundialChapionship: ${pilotInput.mundialChapionship}
                    }) {
                        name,
                        img,
                        team,
                        age,
                        country,
                        cc,
                        mundialChapionship
                }
         }`
        return this._GQL.mutate(createPilot)
    }

}