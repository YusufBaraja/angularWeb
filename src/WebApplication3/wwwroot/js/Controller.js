myapp.controller('crudcontroller', function ($scope, crudservice) {

    //Loads all Employee records when page loads
    loadEmployees();
    function loadEmployees() {
        var EmployeeRecords = crudservice.getAllEmployees();
        EmployeeRecords.then(function (d) {     //success
            $scope.Contacts = d.data;
        },
        function () {
            swal("Oops..", "Error occured while loading", "error"); //fail
        });
    }

    //save form data
    $scope.save = function () {
        debugger;
        var Contact = {
            
            Name: $scope.Name,
            Address: $scope.Address,
            PhoneNumber: $scope.PhoneNumber,
           
        };
        var saverecords = crudservice.save(Contact);
        saverecords.then(function (d) {
           // $scope.Id = d.data.Id;
            loadEmployees();
            // swal("Insert Succes!");
            //alertify.alert("Insert Succes!");
            alert("insert succes!");
        },
        function () {
            swal("Oops..", "Error occured while saving", 'error');
        });
    }

    //get single record by ID

    $scope.get = function (Contact) {
        debugger;
        var singlerecord = crudservice.get(Contact.id);
        singlerecord.then(function (d) {
            // debugger;
            var record = d.data;
            $scope.newId = record.id;
            $scope.newName = record.name;
            $scope.newPhoneNumber = record.phoneNumber;
            $scope.newAddress = record.address;
            
        },
        function () {
            swal("Oops...", "Error occured while getting record", "error");
        });
    }


    //update Employee data
    $scope.update = function () {
        debugger;
        var Contact = {
            Id:$scope.newId,
            Name: $scope.newName,
            PhoneNumber: $scope.newPhoneNumber,
            Address: $scope.newAddress
        };
        debugger;
        var updaterecords = crudservice.update($scope.newId, Contact);
        updaterecords.then(function (d) {
            loadEmployees();
            alert("Update Success");
        },
        function () {
            swal("Opps...", "Error occured while updating", "error");
        });
    }

    //delete Employee record
    $scope.delete = function (newId) {
        debugger;

              

            var deleterecord = crudservice.delete($scope.newId);
            deleterecord.then(function (d) {
                var Contact = {
                    //Name: '',
                    //PhoneNumber: '',
                    //Address: ''
                };
                loadEmployees();
                alert("Delete Sucess!");
            });
        
        
    }
});