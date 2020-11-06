import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import gql from "graphql-tag";

export default class GraphQL {
    constructor(AppConstants, $q, JWT) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$q = $q;
        this._clients = new Map([[this._AppConstants.api_gql + "/graphql/" + this.createClient()]]);
        this._authClient = this.createAuthClient();
        this._JWT = JWT;
    }

    createClient(server = this._AppConstants.api_gql  + "/graphql/") {
        return new ApolloClient({
            link: createHttpLink({uri: server}),
            cache: new InMemoryCache
        })
    }

    createAuthClient() {
        return setContext((_, {headers}) => {
            let token = this._JWT.get();
            return {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                }
            }
        })
    }

    get(query, server = this._AppConstants.api_gql + "/graphql/") {
        let deferred = this._$q.defer();
        if (!this._clients.has(server)) {
            this._clients.set(server, this.createClient(server));   
        }

        this._clients.get(server).query({
            query: gql(query)
        }).then(
            (res) => deferred.resolve(res.data),
            (err) => deferred.reject(err)
        );
        return deferred.promise;
    }

    getAuth(query) {
        let deferred = this._$q.defer();

        this._authClient.query({
            query: gql(query)
        }).then(
            (res) => deferred.resolve(res.data),
            (err) => deferred.reject(err)
        );

        return deferred.promise
    }

}