// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      console.log('status')
    }
      if (window.cordova) {
        //db = $cordovaSQLite.openDB({ name: "my.db" }); //device
        db = window.sqlitePlugin.openDatabase({name: "my.db",location: 'default'});
        console.log('device')
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS albunes (album TEXT,laminita TEXT, tengo BOOLEAN, repetidas TEXT)")
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS album (nombre TEXT,numero TEXT)").then(function(res){
              console.log('hola cordova')
            });
      }else{
        db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
        console.log('browser')
      }
    //db = $cordovaSQLite.openDB("my.db")

        if (! AdMob ) { alert( 'admob plugin not ready' ); return; }


        if( /(android)/i.test(navigator.userAgent) ) { 
          console.log('hola')
  admobid = { // for Android
    banner: 'ca-app-pub-4811412181501817/3010853887', //ca-app-pub-4811412181501817/3010853887 prod ca-app-pub-6869992474017983/9375997553 test
    interstitial: 'ca-app-pub-4811412181501817/7441053489' //ca-app-pub-4811412181501817/7441053489 prod ca-app-pub-6869992474017983/1657046752 test
  };
}

  // this will create a banner on startup
  AdMob.createBanner( {
    adId: admobid.banner,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    //isTesting: true,  TODO: remove this line when release
    overlap: false,
    offsetTopBar: false,
    bgColor: 'black'
  } );

  console.log(AdMob)
  // this will load a full screen ad on startup
  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    //isTesting: true,  TODO: remove this line when release
    autoShow: true
  });

      });

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
     .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
  
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'AlbumCtrl'
      }
    }
  })


  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
