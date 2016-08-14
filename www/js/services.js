angular.module('starter.services', [])

.factory('Chats', function($cordovaSQLite) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data

  var pass,
      jokes=[]


  return {
    prueba: function(sel) {
      //var pass = []
      if (sel != '') {
        
        pass = sel
      };
      
      //pass[0]=hola
      return pass;
    },
    all: function() {
      db = window.sqlitePlugin.openDatabase({name: "my.db",location: 'default'});  
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
