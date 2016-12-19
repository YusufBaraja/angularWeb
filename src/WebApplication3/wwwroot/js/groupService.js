apps.service('groupservice', function ($http) {

    this.getAllGroups = function () {
        return $http.get("/api/Groups");
    }

    this.get = function (newId) {
        //debugger;
        return $http.get("/api/Groups/" + newId);
    }

    //save
    this.save = function (Group) {
        var request = $http({
            method: 'post',
            url: '/api/Groups/',
            data: Group
        });
        return request;
    }

    //update 
    this.update = function (newId, Group) {
        var updaterequest = $http({
            method: 'put',
            url: "/api/Groups/" + newId,
            data: Group
        });
        return updaterequest;
    }
});