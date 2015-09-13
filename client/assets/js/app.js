(function() {
  'use strict';


  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
    // The original controller from 
    .controller('directoryController', function($scope) {
      $scope.list = [
        {name: 'Scott', age: 29},
        {name: 'Ross', age: 29},
        {name: 'Ben', age: 32}, 
        {name: 'Courteny', age: 29}
      ]
    })
    // This conroller works to use data submitted by user for use in this controller. -JMS
    .controller('MyFormCtrl', [function() {
        this.user = {
             name: ''
        };
        this.register = function() {
           console.log('User clicked register', this.user);
        };
    }])
    

    // This conroller works to use data submitted by user for use in this controller. -JMS
    .controller('colorCalcCtrl', ['$scope',function($scope) {
        $scope.chiliSpicy = function() {
          // alert('hi');
          alert($scope.bColor);
      };
    }])
    ;


    // function CTRL ($scope) {
    // $scope.val1 = 3;
    // $scope.val2 = 4;
    // $scope.total = function() {return $scope.val1 + $scope.val2;};
    // }

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }
  
})();
