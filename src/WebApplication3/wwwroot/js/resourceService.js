apps.service('resourceservice', function ($http) {

    this.getAllResources = function () {
        return $http.get("/api/Resources");
    }

    this.get = function (newId) {
        //debugger;
        return $http.get("/api/Resources/" + newId);
    }
});