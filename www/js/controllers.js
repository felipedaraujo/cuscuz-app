angular.module('starter.controllers', [])
.controller('AppCtrl', ['$scope', function($scope) {
}])
.controller('ExploreCtrl',
  ['$scope', '$state', '$ionicModal', '$http',
  function($scope, $state, $ionicModal, $http) {

  if(typeof window.ga !== "undefined") { window.ga.trackView("Explore"); }

  $http.get('js/recipes.json').then(function(response) {
      $scope.items = response.data;
  });

  $scope.openRecipe = function(item) {
    if(typeof window.ga !== "undefined") { window.ga.trackEvent("Open Recipe", null, null, 25); }

    $scope.recipe = item;

    $scope.openModal();
  };

  $scope.openModal = function() {
    $ionicModal.fromTemplateUrl('views/recipe.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };
}])
.controller('ShopCtrl',
  ['$scope', '$state', '$ionicModal', '$ionicLoading', '$firebaseObject',
  function($scope, $state, $ionicModal, $ionicLoading, $firebaseObject) {

  if(typeof window.ga !== "undefined") { window.ga.trackView("Shop"); }

  $scope.subscribed = false;
  $scope.error      = false;

  $scope.subscribeNow = function() {
    if(typeof window.ga !== "undefined") { window.ga.trackEvent("Kit Subscription", null, null, 25); }

    openModal();
    fetchSubscriber()
  };

  function openModal() {
    $ionicModal.fromTemplateUrl('views/subscribe.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  function fetchSubscriber() {
    var key = firebase.database().ref('subscribers/').push().key;
    var ref = firebase.database().ref('subscribers/' + key);

    $ionicLoading.show({template: 'Carregando...'});

    $firebaseObject(ref).$loaded(function(response) {
      $ionicLoading.hide();
      $scope.newUser = response;
    }, function(error) {
      $ionicLoading.hide();
      console.log('Error', error);
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.subscribe = function() {
    if(typeof window.ga !== "undefined") { window.ga.trackEvent("Newsletter Subscription", null, null, 25); }

    $ionicLoading.show({template: 'Enviando...'});

    $scope.newUser.$save().then(function() {
      $ionicLoading.hide();
      $scope.subscribed = true;
    }).catch(function() {
      $ionicLoading.hide();
      $scope.error = true;
    });
  }
}])
.controller('ProfileCtrl', ['$scope', '$state', function($scope, $state) {
  if(typeof window.ga !== "undefined") { window.ga.trackView("Profile"); }
}]);
