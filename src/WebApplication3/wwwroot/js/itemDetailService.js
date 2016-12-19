apps.service('itemdetailservice', function ($http) {
    
    this.getAllItemDetails = function () {
        return $http.get("/api/ItemDetails");
    }

    //save
    this.saveItemDetail = function (ItemDetail) {
        var request = $http({
            method: 'post',
            url: '/api/ItemDetails/',
            data: ItemDetail
        });
        return request;
    }

    //get single record by Id
    this.get = function (newId) {       
        return $http.get("/api/ItemDetails/" + newId);
    }

    ////update Employee records
    //this.update = function (newId, Contact) {
    //    debugger;
    //    var updaterequest = $http({
    //        method: 'put',
    //        url: "/api/Contacts/" + newId,
    //        data: Contact
    //    });
    //    return updaterequest;
    //}

    ////delete record
    this.delete = function (UpdateId) {
        debugger;
        var deleterecord = $http({
            method: 'delete',
            url: "/api/ItemDetails/" + UpdateId
        });
        return deleterecord;
    }
});