angular.module('starter.controllers', [])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.controller('AlbumCtrl', function($scope, Chats, $cordovaSQLite,$ionicModal,$ionicLoading,$location) {
                  
      /*Chats.all().then(function(res){
        $scope.result = res;
      })*/

        
            //$timeout(console.log('hola mundo'),600)
            
           
        
      
        console.log('AlbumCtrl')
        var selector = function (){
          
        var sel = "SELECT * FROM album";
        $cordovaSQLite.execute(db, sel).then(function(res) {
           
           $scope.items = [];
            
              console.log("SELECTED -> " + res.rows.item(0).nombre );
               
               console.log(res.rows.length)
               for(var i = 0; i < res.rows.length; i++){
                      $scope.items.push({nombre: res.rows.item(i).nombre,
                                         numero: res.rows.item(i).numero
                            })
                    }
                  
              
        });

      }

      

    selector()

 
        
      
    
          $ionicModal.fromTemplateUrl('templates/modal.html', {
              scope: $scope
            }).then(function(modal) {
              $scope.modal = modal;
              console.log($scope.modal)
            });

       $scope.createContact = function(nuevo) {
        console.log(nuevo)
        $scope.modal.hide(); 

        query = "INSERT INTO album (nombre, numero) VALUES (?,?)";
        $cordovaSQLite.execute(db, query,[nuevo.nombre,nuevo.numero.toString()]).then(function(res) {
    
              console.log("SELECTED -> " + res.insertId);
              selector()
              //insert(nuevo)

              
        }, function (err) {
            console.error(err);
        });

         nuevo.nombre = nuevo.numero = ''
       
       }  

       var insert = function (nuevo,num){
        console.log(num)
        num ++
        query = "INSERT INTO albunes (album,laminita,tengo,repetidas) VALUES (?,?,?,?)"
        //for (var i = 1; i = nuevo.numero; i++) {
          
           $cordovaSQLite.execute(db, query,[nuevo.nombre,num.toString(),false,'0']).then(function(res) {
            console.log("SELECTED -> " + res.insertId); 

            if (num < nuevo.numero) {
              
              insert(nuevo,num)
            }else if(num = (nuevo.numero -1)) {
                $ionicLoading.hide()
                $location.path('/tab/chats');
            }
                         
              
        }, function (err) {
            console.error(err);
        });
        //};

       }




       $scope.albumItem = function(item){

          Chats.prueba(item)
          console.log('QUEEEE')

        var query = "SELECT * FROM albunes WHERE album = ?",
            result;
        $cordovaSQLite.execute(db, query,[item.nombre]).then(function(res) {
          
             
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).album );
                
               //= res.rows.item(0).nombre //=  (0).nombre
               console.log(res.rows.length)

               $location.path('/tab/chats');     
               
            } else {
                console.log("No results found");
                  
                      $ionicLoading.show({
                        template: 'Cargando el Album...'
                      });
                    
                insert(item,0)
                //$ionicLoading
            }
        }, function (err) {
            console.error(err);
        });

         
        
       }



      $scope.onItemDelete = function(item) {
        var sel = "DELETE from album WHERE nombre = ?";
        $cordovaSQLite.execute(db, sel, [item.nombre]).then(function(res) {
           
            $scope.items.splice($scope.items.indexOf(item),1)
            if(res.rows.length > 0) {
              console.log("SELECTED -> " + res.rows.item(0).nombre );
                
                
               
            } else {
                console.log("No results found");
                
            }
        }, function (err) {
            console.error(err);
        });

        var sel = "DELETE from albunes WHERE album = ?";
        $cordovaSQLite.execute(db, sel,[item.nombre]).then(function(res) {
           
           //$scope.items = [];
            if(res.rows.length > 0) {
              console.log("SELECTED -> " + res.rows.item(0).nombre );
                   
               
            } else {
                console.log("No results found");
                
            }
        }, function (err) {
            console.error(err);
        });

        };
})

.controller('ChatsCtrl', function($scope, Chats, $cordovaSQLite) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  console.log('controller 2')

  localStorage.setItem("lastname", "Smith");
  
  $scope.$on('$ionicView.enter', function(e) {
    
    var param = Chats.prueba('')
    console.log(param)
    select(param)
   
  });

        var select = function (param) {

        var query = "SELECT * FROM albunes WHERE album = ? AND tengo = ?";
       $cordovaSQLite.execute(db, query, [param.nombre,false]).then(function(res) {
           
           $scope.items = [];
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).album );
                
                //= res.rows.item(0).nombre //=  (0).nombre
               console.log(res.rows.length)
               for(var i = 0; i < res.rows.length; i++){
                      $scope.items.push({nombre: res.rows.item(i).album,
                                         numero: res.rows.item(i).laminita
                            })
                    }

                    
               
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
     }
  
    $scope.tengoItem = function(item){

          
          var query = "UPDATE albunes SET tengo = ? WHERE album = ? AND laminita = ?";      
          $cordovaSQLite.execute(db, query, [true,item.nombre,item.numero]).then(function(res) {
           $scope.items.splice($scope.items.indexOf(item),1)
           console.log(res,item)
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).laminita );                   
               
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    } 

  /*$scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };*/


})

.controller('HomeCtrl', function($scope, $stateParams, Chats) {
  //$scope.chat = Chats.get($stateParams.chatId);
  console.log('jiihom')
})

.controller('AccountCtrl', function($scope, $cordovaSQLite, Chats) {
  $scope.$on('$ionicView.enter', function(e) {
    
    var param = Chats.prueba('')
    console.log(param)
    select(param)
   
  });

        var select = function (param) {

        var query = "SELECT * FROM albunes WHERE album = ? AND tengo = ?";
       $cordovaSQLite.execute(db, query, [param.nombre,true]).then(function(res) {
           
           $scope.items = [];
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).album );
                
                //= res.rows.item(0).nombre //=  (0).nombre
               console.log(res.rows.length)
               for(var i = 0; i < res.rows.length; i++){
                      $scope.items.push({nombre: res.rows.item(i).album,
                                         numero: res.rows.item(i).laminita,
                                         repetidas: res.rows.item(i).repetidas
                            })
                    }

                    
               
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
     }

    $scope.masRepetidas = function(item){
    //this.dataService.save(item);
    //this.dataService.create()
    var array = item.repetidas;
    ++array;
    var query = "UPDATE albunes SET repetidas = ? WHERE album = ? AND laminita = ?";     
        console.log(item)
        //this.constructor(this.dataService,this.zone); 
        item.repetidas = array; 

        $cordovaSQLite.execute(db, query, [item.repetidas.toString(),item.nombre,item.numero]).then(function(res) {
           
           console.log(res,item)
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).laminita );                   
               
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
        
    }
  
    $scope.menosRepetidas = function(item){
    //this.dataService.save(item);
    //this.dataService.create()
    var array = item.repetidas;
    if (array == '0') {
      array = '0'
    } else{
      --array;
    };    
              
    item.repetidas = array; 
        
    var query = "UPDATE albunes SET repetidas = ? WHERE album = ? AND laminita = ?";      
          $cordovaSQLite.execute(db, query, [item.repetidas.toString(),item.nombre,item.numero]).then(function(res) {
           
           console.log(res,item)
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).laminita );                   
               
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }
  
});
