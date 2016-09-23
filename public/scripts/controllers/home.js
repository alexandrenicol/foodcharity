'use strict';


angular.module('platformProduit')
.controller('HomeController',
  ['$rootScope', '$scope', '$http', '$cookies', '$state', 'NgMap', 
    function ($rootScope, $scope, $http, $cookies, $state, NgMap) {
      console.log('LoginController');
   
      $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDg54T9qfRVJ3K04bSNJUU07HvnImeIiZI";
   
      $scope.userPostcode = "BN15AD";
      
      $scope.updatePostcode = function () {
        console.log('update', $scope.userPostcode);
      };
      
      
      
    }
  ]);
