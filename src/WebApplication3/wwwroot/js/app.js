/// <reference path='./DlhSoft.Kanban.Angular.Components.ts'/>
var KanbanBoard = DlhSoft.Controls.KanbanBoard;
// Prepare data.
var stateX = [];

//var myapp2;
//(function () {
//    myapp2 = angular.module('myangularapp2', []);
//})();



//myapp2.controller('crudcontroller2', function ($scope, crudservice2) {

//    //Loads all Employee records when page loads
//    loadEmployees();
//    function loadEmployees() {
//        var EmployeeRecords = crudservice2.getAllEmployees();
//        EmployeeRecords.then(function (d) {     //success
//            $scope.Contacts = d.data;
//        },
//        function () {
//            swal("Oops..", "Error occured while loading", "error"); //fail
//        });
//    }
//});

//stateX = loadEmployees();


    var state1 = { name: 'New' }
     , state2 = { name: 'In progress', areNewItemButtonsHidden: true },
     state3 = { name: 'Done', areNewItemButtonsHidden: true }
    , state4 = { name: 'Testing', areNewItemButtonsHidden: true };

    
    //debugger;
   

   // stateX.push({ date: '12/1/2011', reading: 3, id: 20055 });
   
    


  //  var states = [state1, state2, state4, state3];
  

    //var resource1 = { name: 'Barry', imageUrl: 'Images/obama.png' }
    //    , resource2 = { name: 'Donald', imageUrl: 'Images/trump.jpg' }
    //    , resource3 = { name: 'Roo', imageUrl: 'Images/rooney.png' };
    //var assignableResources = [resource1, resource2, resource3];

    //var group1 = { name: 'Employee Module', state: state2, assignedResource: resource1 }
    //    , group2 = { name: 'HRD Module', state: state3, assignedResource: resource2 };
//var groups = [group1, group2];
    var states = [];
    var assignableResources = [];
    var groups = [];
    var items = [];
       


    

    //{ name: 'Task 1', group: group1, state: state1, assignedResource: resource1 },
    //{ name: 'Task 2', group: group1, state: state2, assignedResource: resource1 },
    //{ name: 'Bug 1', group: group1, state: state2, assignedResource: resource1, itemType: KanbanBoard.defaultItemTypes.bug },
    //{ name: 'Task 3', group: group1, state: state1, assignedResource: resource2 },
    //{ name: 'Task 4', group: group1, state: state1, assignedResource: resource1 },
    //{ name: 'Task 5', group: group2, state: state1, assignedResource: resource2 },
    //{ name: 'Task 5', group: group2, state: state2, assignedResource: resource3 }
    //Uncomment the following code lines to load more groups and items.

    //for (var i = 3; i <= 10; i++) {
    //   var group : KanbanGroup = { name: 'Story ' + i, assignedResource: resource1 };
    //   groups.push(group);
    //   for (var j = 1; j <= 10; j++) {
    //       var item : KanbanItem = { name: 'Item ' + i + '.' + j, group: group, state: j % 2 == 0 ? state1 : state2, assignedResource: resource1 };
    //       items.push(item);
    //   }
    //}
    var nextIteration = { groups: [], items: [] };
var apps=angular.module('KanbanBoardSample', ['DlhSoft.Kanban.Angular.Components'])
   
         
        //bind states here
        apps.controller('MainController', function ($scope, stateservice, resourceservice, groupservice, itemservice,itemdetailservice) {           
            //crud part

            // create a proxy to signalr hub on web server
            var hub = $.connection.kanbanHub;
            $.connection.hub.start();

            $scope.addNewGroup = function () {
                var Group = {
                    Name: ""
                };
               
                var saverecords = groupservice.save(Group);
                saverecords.then(function (d) {
                    //  emptyAndLoadData();
                    hub.server.send();
                },
                function () {
                    alert("insert failed");
                });
            }
           

            $scope.updateGroup = function (groupX) {
                  var entity = {
                    Id: groupX.newGroupId,
                    Name:groupX.name
                 
                };
                var updaterecord = groupservice.update(groupX.newGroupId, entity);
                updaterecord.then(function (d) {                  
                    hub.server.send();
                        },
                function () {
                    alert("error when try update data")
                });
              
            }

            
            $scope.updateState = function (stateX) {
              
                var entity = {
                    Id: stateX.newStateId,
                    Name: stateX.name,
                    IsNewHidden:1
                }
                var updatedrecord = stateservice.update(stateX.newStateId, entity);
                updatedrecord.then(function () {
                   
                    hub.server.send();
                   // hub.server.send();
                }, function () {
                    alert("error when try update data")

                });
            }

            $scope.DeleteState = function (stateX) {
                debugger;
                var deleteRecord = stateservice.delete(stateX.newStateId);

                deleteRecord.then(function () {
                    hub.server.send();
                }, function () {
                 });
            }

            $scope.BindDelete = function (stateX) {
                $scope.modalstate = stateX;
            }
               


            $scope.updateItem = function (ItemX) {
               
                var entity = {
                    Id: ItemX.newItemId,
                    Name: ItemX.name,
                    resourceId: ItemX.assignedResource.newResourceId,
                    groupId: ItemX.group.newGroupId,
                    stateId:ItemX.state.newStateId

                };
                var updaterecord = itemservice.update(ItemX.newItemId, entity);
                updaterecord.then(function (d) {
                       hub.server.send();
                },
                function () {
                    alert("error when try update data")
                });

            }

            $scope.addNewState = function (stateName) {
                var StateC = {
                    Name: stateName,
                    isNewHidden:1
                };
               
                var saverecords = stateservice.save(StateC);
                saverecords.then(function (d) {                   
                    hub.server.addState(StateC);
                },
                function () {
                    alert("insert failed");
                });
            }

            // Bind states 
            loadStates();
            var newStates = [];
            function loadStates() {
                var stateRecords = stateservice.getAllStates();
                stateRecords.then(function (d) {
                   //success
                    $scope.Contacts = d.data;
                    
                    for (var i = 0; i < d.data.length; i++) {
                        newStates.push({
                            newStateId:d.data[i].id,
                            name: d.data[i].name,
                            areNewItemButtonsHidden: d.data[i].isNewHidden
                                
                        });
                    }
                    loadResource();
                },
                function () {
                    alert("failed to fetch state");
                });
            }

            //bind resource
            
            var newResource = [];
            function loadResource() {
                var ResourceRecords = resourceservice.getAllResources();
                ResourceRecords.then(function (d) {
                    //success
                   
                    $scope.Contacts = d.data;
                    for (var i = 0; i < d.data.length; i++) {
                        newResource.push({
                            newResourceId: d.data[i].id,
                            name: d.data[i].name,
                            imageUrl: d.data[i].imageUrl

                        });
                    }
                    loadGroups();
                },
                function () {
                    alert("failed to fetch resource");
                });
            }


            ////bind groups
            
            var newGroup = [];
            function loadGroups() {
                var GroupRecords = groupservice.getAllGroups();
                //var stateGroup = stateservice
                GroupRecords.then(function (d) {     //success
                    $scope.Contacts = d.data;
                   
                    for (var i = 0; i < d.data.length; i++) {
                       
                        newGroup.push({
                            newGroupId:d.data[i].id,
                            name: d.data[i].name,
                            state: getState(d.data[i].stateId),
                            resource: getResource(d.data[i].resourceId)

                        }); 
                    }
                    loadItems();
                },
                function () {
                    alert("failed to fetch GROUP");
                });
            }


            ////bind items
            
            var newItems = [];
            function loadItems() {
                var ItemRecords = itemservice.getAllItems();
                ItemRecords.then(function (d) {     //
                 
                    for (var i = 0; i < d.data.length; i++) {
                        newItems.push({
                            newItemId:d.data[i].id,
                            name: d.data[i].name,
                            group:getGroup(d.data[i].groupId),                            
                            state: getState(d.data[i].stateId),
                            assignedResource: getResource(d.data[i].resourceId)

                        });
                    }
                },
                function () {
                    alert("failed to fetch ITEMS");
                });
            }

            function getGroup(id) {
                for (var j = 0; j < newGroup.length; j++) {
                    if (newGroup[j].newGroupId === id) {
                        return newGroup[j];
                    }
                }
            }
            function getState(id) {
                for (var j = 0; j < newStates.length; j++) {
                    if (newStates[j].newStateId === id) {
                        return newStates[j];
                    }
                }
            }
            function getResource(id) {
                for (var j = 0; j < newResource.length; j++) {
                    if (newResource[j].newResourceId === id) {
                        return newResource[j];
                    }
                }
            }

            function emptyAndLoadData() {
                newStates.length = newResource.length = newGroup.length = newItems.length = 0;
                loadStates();
            }

            hub.client.broadcastMessage = function () {
                  emptyAndLoadData();
             };
           
           
            hub.client.refreshUpdateState = function (stateY) {
                
                for (var i = 0; i < newStates.length; i++) {
                    if (newStates[i].newStateId === stateY.Id) {
                        // newStates[i].name = stateY.Name;
                       // newStates[i] = stateY;
                        emptyAndLoadData();
                       
                    }
                }
            };
           


            //when delete item use this
           
            function deleteItems(newId) {
                itemservice.delete(newId);
                hub.server.deleteItem(newId);
            }

            hub.client.refreshDelete=function (itemId) {                              
                for (var i = 0; i < newItems.length; i++) {
                    if (newItems[i].newItemId === itemId) {
                        newItems.splice(i, 1);
                    }
                }
            }

            hub.client.addState = function (stateY) {
               emptyAndLoadData();
               
            }

            //add new item
            hub.client.addNewItem = function (itemY) {
               
                //disini
                
                newItems.push({
                    newItemId: itemY.id,
                    name: itemY.name,
                    group: getGroup(itemY.groupId),
                    state: getState(itemY.stateId),
                    assignedResource: getResource(itemY.resourceId)
                });
              
               // emptyAndLoadData();
            }


            var itemX;
            $scope.getItemDetail = function (ItemDetail) {
                itemX = undefined;
                var x = (ItemDetail === undefined) ? 0 : ItemDetail.newItemId;
                var singlerecord = itemdetailservice.get(x);
                itemX = x;
                               singlerecord.then(function (d) {
                    $scope.ItemDetail = d.data;
                },
                function () {
                    alert("error");
                });
            }

           
            function getItemDetailAfterInsert(itemId) {
            var singlerecord = itemdetailservice.get(itemId);
                singlerecord.then(function (d) {
                    $scope.ItemDetail = d.data;
                                  },
                function () {
                    alert("error");
                });
            }

            $scope.saveItemDetail = function (newId,newDesc) {
                 var ItemDetailx = {
                    ItemId: itemX,
                    Description: newDesc

                };

                 $scope.newDescription = '';
                var saverecords = itemdetailservice.saveItemDetail(ItemDetailx);
                saverecords.then(function (d) {
                    hub.server.addItemDetail(ItemDetailx.ItemId);                                   },
                function () {
                   
                });
            }

            $scope.DeleteItemDetail = function (ItemDetailX) {
                debugger;
                var deleterecords = itemdetailservice.delete(ItemDetailX.id);
                deleterecords.then(function (d) {
                    hub.server.addItemDetail(ItemDetailX.itemId);
                },
                function () {
                });
               
            }

           
            hub.client.refreshItemDetail = function (additemX) {
                getItemDetailAfterInsert(additemX);
            }

            




            $scope.states = newStates;
            $scope.groups = newGroup;
            $scope.items = newItems;
            $scope.assignableResources = newResource;


            // Initialize a newly created item before adding it to the user interface.
            $scope.initializeNewItem = function (item) {
              //  item.assignedResource = resource1;
                console.log('A new item was created.');
              //   emptyAndLoadData();
               
               
            };
            // Allow item deletion by clicking a button in the user interface.
            $scope.deleteItem = function (item) {
               // items.splice(items.indexOf(item), 1);
                console.log('Item ' + item.name + ' was deleted.');
                deleteItems(item.newItemId);
            };
            // Handle changes.
            $scope.onItemStateChanged = function (item, state) {
                console.log('State of ' + item.name + ' was changed to: ' + state.name);
            };
            $scope.onItemGroupChanged = function (item, group) {
                console.log('Group of ' + item.name + ' was changed to: ' + group.name);
            };
            // Move items to the next iteration.
            $scope.nextIteration = nextIteration;
            $scope.moveItemToNextIteration = function (type, index) {
                if (type === DlhSoft.Controls.KanbanBoard.types.group) {
                    // Move an entire group (story) and all its items.
                    var group = groups[index];
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.group === group) {
                            items.splice(i--, 1);
                            nextIteration.items.push(item);
                        }
                    }
                    groups.splice(index, 1);
                    if (nextIteration.groups.indexOf(group) < 0)
                        nextIteration.groups.push(group);
                    console.log('Group ' + group.name + ' and its items were moved to next iteration.');
                }
                else {
                    // Move a single item, and copy the group (story) if needed.
                    var item = items[index];
                    items.splice(index, 1);
                    nextIteration.items.push(item);
                    var group = item.group;
                    if (nextIteration.groups.indexOf(group) < 0)
                        nextIteration.groups.push(group);

                    console.log('Item ' + item.name + ' was moved to next iteration.');
                }

               
               
            };





        });


//# sourceMappingURL=app.js.map