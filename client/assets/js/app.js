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
    .controller('colorCalcCtrl', function($scope) {
      $scope.list = [
        {bColor: 'bColor 01', rColor: 'rColor 01'},
        {bColor: 'bColor 02', rColor: 'rColor 02'},
        {bColor: 'bColor 03', rColor: 'rColor 03'}, 
        {bColor: 'bColor 04', rColor: 'rColor 04'}
      ];

      $scope.addCard = function() {
        $scope.list.push({bColor: $scope.bColor, rColor: $scope.rColor});
        // $scope.color.bColor = '';
        // $scope.color.rColor = '';
      }
    })

    // Custom filter to reverse the order of the array so that the latest entry resides on top. -JMS
    .filter('reverse', function() {
      return function(items) {
        return items.slice().reverse();
      };
    })
    // Keep this semicolon -JMS
    ;


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
