apps.service('itemservice', function ($http) {

    this.getAllItems = function () {
        return $http.get("/api/Items");
    }

    //save
    this.save = function (Item) {
        var request = $http({
            method: 'post',
            url: '/api/Items/',
            data: Item
        });
       
        return request;
    }

    ////update 
    this.update = function (newId, Item) {
        
        var updaterequest = $http({
            method: 'put',
            url: "/api/Items/" + newId,
            data: Item
        });
        return updaterequest;
    }

    //delete record
    this.delete = function (UpdateId) {       
        var deleterecord = $http({
            method: 'delete',
            url: "/api/Items/" + UpdateId
        });
        return deleterecord;
    }

});