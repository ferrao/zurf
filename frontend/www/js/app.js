// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('zurf', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // if none of the bellow states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

  $stateProvider.state('login', {
    url: "/login",
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('forgot-password', {
    url: "/forgot",
    templateUrl: 'templates/forgot-password.html',
  })

  // abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  .state('tab.ranking', {
      url: '/ranking',
      views: {
        'tab-ranking': {
          templateUrl: 'templates/ranking.html',
          controller: 'UserListCtrl'
        }
      }
    })
    .state('tab.break-list-fav', {
      url: '/favorites',
      views: {
        'tab-break-list-fav': {
          templateUrl: 'templates/surf-break-list-fav.html',
          controller: 'BreakListCtrl'
        }
      }
    })
    .state('tab.break-detail-fav', {
      url: '/favorites/:id',
      views: {
        'tab-break-list-fav': {
          templateUrl: 'templates/surf-break-detail.html',
          controller: 'BreakDetailCtrl'
        }
      }
    })

  .state('tab.regions', {
    url: '/regions',
    views: {
      'tab-regions': {
        templateUrl: 'templates/regions.html',
        controller: 'RegionsCtrl'
      }
    }
  })

  .state('tab.regions.break-list', {
      url: '/breaks',
      views: {
        'tab-regions@tab': {
          templateUrl: 'templates/surf-break-list.html',
          controller: 'BreakListCtrl'
        }
      }
    })
    .state('tab.regions.break-detail', {
      url: '/breaks/:id',
      views: {
        'tab-regions@tab': {
          templateUrl: 'templates/surf-break-detail.html',
          controller: 'BreakDetailCtrl'
        }
      }
    });
});