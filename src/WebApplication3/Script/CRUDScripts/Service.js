myapp.service('crudservice', function ($http) {

    this.getAllEmployees = function () {
          return $http.get("/api/Contacts");
      
    }

    //save
    this.save = function (Contact) {
        var request = $http({
            method: 'post',
            url: '/api/Contacts/',
            data: Contact
        });
        return request;
    }

    //get single record by Id
    this.get = function (newId) {
        //debugger;
        return $http.get("/api/Contacts/" + newId);
    }

    //update Employee records
    this.update = function (newId, Contact) {
        debugger;
        var updaterequest = $http({
            method: 'put',
            url: "/api/Contacts/" + newId,
            data: Contact
        });
        return updaterequest;
    }

    //delete record
    this.delete = function (UpdateId) {
        debugger;
        var deleterecord = $http({
            method: 'delete',
            url: "/api/Contacts/" + UpdateId
        });
        return deleterecord;
    }
});