apps.controller('ItemDetailController', function ($scope, itemdetailservice) {
    
    //loadItemDetails();
    //function loadItemDetails() {
    //    var EmployeeRecords = itemdetailservice.getAllItemDetails();
    //    EmployeeRecords.then(function (d) {     //success
    //        $scope.ItemDetails = d.data;
    //    },
    //    function () {
    //       //fail
    //    });
    //}

    //save form data
    //$scope.save = function () {
    //    debugger;
    //    var Contact = {

    //        Name: $scope.Name,
    //        Address: $scope.Address,
    //        PhoneNumber: $scope.PhoneNumber,

    //    };
    //    var saverecords = crudservice.save(Contact);
    //    saverecords.then(function (d) {
    //        // $scope.Id = d.data.Id;
    //        loadEmployees();
    //        // swal("Insert Succes!");
    //        //alertify.alert("Insert Succes!");
    //        alert("insert succes!");
    //    },
    //    function () {
    //        swal("Oops..", "Error occured while saving", 'error');
    //    });
    //}

    //get detail record by ID

    //loadItemDetails(undefined);
    //function loadItemDetails(ItemDetail) {
       
    //    var x = (ItemDetail === undefined) ? 0 : ItemDetail.newItemId;
    //     var singlerecord = itemdetailservice.get(x);
    //    singlerecord.then(function (d) {
    //        $scope.ItemDetail = d.data;
    //    },
    //    function () {
    //        alert("error");
    //    });
    //}

    $scope.getData = function (ItemDetail) {
        debugger;
        var x = (ItemDetail === undefined) ? 0 : ItemDetail.newItemId;
        var singlerecord = itemdetailservice.get(x);
        singlerecord.then(function (d) {
            $scope.ItemDetail = d.data;
        },
        function () {
            alert("error");
        });
    }
});