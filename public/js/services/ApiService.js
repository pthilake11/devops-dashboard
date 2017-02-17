angular.module('ApiService', []).factory('ApiService', ['$http', '$q', function ($http, $q) {
    return {

    getApplications : function()
    {
        return $http.get('/api/applications');
    },

    getApplicationById : function(appId)
    {
        return $http.get('/api/application/'+ appId);
    },

     getStatsById : function(appId,statId)
    {
        return $http.get('/api/application/'+ appId + '/stat/'+ statId);
    },

    getTrendsById : function(appId,trendId)
    {
        return $http.get('/api/application/'+ appId +'/trend/'+ trendId);
    }

}
}]);