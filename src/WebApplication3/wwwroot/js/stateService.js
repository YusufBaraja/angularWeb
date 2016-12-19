apps.service('stateservice', function ($http) {

    this.getAllStates = function () {
        return $http.get("/api/States");
    }

    //get 2 column record by State Id
    this.get = function (newId) {
        //debugger;
        return $http.get("/api/States/" + newId);
    }

    this.save = function (State) {
        var request = $http({
            method: 'post',
            url: '/api/States/',
            data: State
        });
        
        return request;
    }

    ////update 
    this.update = function (newId, Item) {
       
        var updaterequest = $http({
            method: 'put',
            url: "/api/States/" + newId,
            data: Item
        });
        
        return updaterequest;
    }

    //delete record
    this.delete = function (UpdateId) {
           var deleterecord = $http({
            method: 'delete',
            url: "/api/States/" + UpdateId
        });
        return deleterecord;
    }


});