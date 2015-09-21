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
      $scope.list = [];

      $scope.addCard = function() {
        $scope.list.push({bColor: $scope.bColor, rColor: $scope.rColor});
        // $scope.color.bColor = '';
        // $scope.color.rColor = '';
      }

      $scope.getTextToCopy = function() {
        
        // var color = $(this).css("background-color");
        // alert(color);
        console.log('hi');
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
