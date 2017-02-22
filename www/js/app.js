var config = {
  apiKey: "AIzaSyBBpz7DzQrDZ8gsyx-Ez_lx8QCDCJx1bkQ",
  authDomain: "cuscuz-app.firebaseapp.com",
  databaseURL: "https://cuscuz-app.firebaseio.com",
  storageBucket: "cuscuz-app.appspot.com",
  messagingSenderId: "614588867206"
};
firebase.initializeApp(config);

angular.module('starter', ['ionic', 'starter.controllers', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if(typeof window.ga !== "undefined") {
      window.ga.startTrackerWithId("UA-34891480-17", 30);
    } else {
      console.log("Google Analytics Unavailable");
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'views/app.html',
    controller: 'AppCtrl'
  })

  .state('app.explore', {
    url: '/explore',
    views: {
      'app-explore': {
        templateUrl: 'views/explore.html',
        controller: 'ExploreCtrl'
      }
    }
  })

  .state('app.shop', {
    url: '/shop',
    views: {
      'app-shop': {
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl'
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'app-profile': {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/explore');
});
