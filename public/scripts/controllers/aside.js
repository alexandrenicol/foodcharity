'use strict';


angular.module('platformProduit')
.controller('AsideController',
  ['$rootScope', '$scope', '$http', '$cookies', '$state', 'SweetAlert',
    function ($rootScope, $scope, $http, $cookies, $state, SweetAlert) {
      console.log('AsideController');
      $scope.state = $state.current.name;
      
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
        $scope.state = toState.name;
      });
      
      
      $scope.menuState = false;
      $scope.menu = function () {
        $scope.menuState = !$scope.menuState;
      };
    }
  ]);
