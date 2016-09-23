'use strict';

/**
 * @ngdoc overview
 * @name userportal2App
 * @description
 * # userportal2App
 *
 * Main module of the application.
 */
angular
  .module('platformProduit', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'oitozero.ngSweetAlert',
    'angularRangeSlider'
  ])
  .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
      
      .state('main', {
        url: '/',
        views: {
          '': {
            templateUrl: './scripts/views/main.html',
            controller: 'MainController'
          },
          'header@main': {
            templateUrl: './scripts/views/Base/header.html'
          },
          'footer@main': {
            templateUrl: './scripts/views/Base/footer.html'
          },
          'content@main': {
            templateUrl: './scripts/views/Base/content.html'
          },
          'aside@main': {
            templateUrl: './scripts/views/Base/aside.html',
            controller: 'AsideController'
          }
        }
      })
    .state('main.home', {
      url: 'home',
      views: {
        content: {
          templateUrl: './scripts/views/home.html',
          controller: 'HomeController'
        }
      }
    })
    .state('main.subscribe', {
      url: 'subscribe',
      views: {
        content: {
          templateUrl: './scripts/views/subscribe.html',
          controller: 'SubscribeController'
        }
      }
    })
    .state('main.login', {
      url: 'login',
      views: {
        content: {
          templateUrl: './scripts/views/login.html',
          controller: 'LoginController'
        }
      }
    })
    .state('main.faq', {
      url: 'faq',
      views: {
        content: {
          templateUrl: './scripts/views/faq.html',
          controller: 'FaqController'
        }
      }
    })
    .state('main.dashboard', {
      url: 'dashboard',
      views: {
        content: {
          templateUrl: './scripts/views/dashboard.html',
          controller: 'DashboardController'
        }
      }
    })
    .state('main.contact', {
      url: 'contact',
      views: {
        content: {
          templateUrl: './scripts/views/contact.html',
          controller: 'ContactController'
        }
      }
    });
  });
