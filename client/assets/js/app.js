(function() {
  'use strict';


  var app =  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'ngStorage',
    'angular-clipboard',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ]);
  app.config(config);
  app.run(run);


  // This controller works to use data submitted by user for use in this controller. -JMS

  app.controller('colorCalcCtrl', function($scope) {
    $scope.list = [];

    $scope.addCard = function() {
      // Push the user generated hex colors to the history cards -JMS
      $scope.list.push({bColor: $scope.bColor, rColor: $scope.rColor, sassFunc: $scope.sassFunc});
      //console.log($scope.list);

      // Add values to local storage in case there is a page refresh that happens before the user is completed their process. -JMS 2015-11-11
      $scope.$storage = $scope.bColor;
      $scope.$storage = $scope.rColor;


      // CREATE a new firebase installation and add data from the card to the json object on the server. -JMS 2015-11-27
      var myFirebaseRef = new Firebase("https://dazzling-torch-5971.firebaseio.com/");

      // Create a callback which logs the current auth state
      function authDataCallback(authData) {
        if (authData) {
          //console.log("User " + authData.uid + " is logged in with " + authData.provider);
          var userId = authData.uid;
          myFirebaseRef.child('users').child(userId).push({
            uid: authData.uid,
            bColor: $scope.bColor,
            rColor: $scope.rColor,
            sassFunc: $scope.sassFunc
          });
        } else {
          //console.log("User is logged out");
        }
      }


      // Register the callback to be fired every time auth state changes
      myFirebaseRef.onAuth(authDataCallback);





      // Reset the input and current card to default color values -JMS
      $scope.bColor = '';
      $scope.rColor = '';
    };

    $scope.getColor = function () {
      function getColorFunction(colorString, hslDifferences, mode) {

        // default mode: sass
        var mode = typeof mode !== 'undefined' ? mode : "sass";

        var colorFunction = colorString;

        // H
        if (hslDifferences[0] !== 0) { // if hue changes
          var invH = hslDifferences[0] * -1;
          var hueFunction = ( mode == "sass" ) ? "adjust-hue" : "spin";
          colorFunction = hueFunction + "( " + colorFunction + ", " + invH + "deg )";
        }

        // S
        if (hslDifferences[1] < 0) { // if second color is more saturated
          var absS = Math.abs(hslDifferences[1]);
          colorFunction = "saturate( " + colorFunction + ", " + absS + " )";
        } else if (hslDifferences[1] > 0) { // if second color is less saturated
          colorFunction = "desaturate( " + colorFunction + ", " + hslDifferences[1] + " )";
        }

        // L
        if (hslDifferences[2] < 0) { // if second color is lighter
          var absL = Math.abs(hslDifferences[2]);
          colorFunction = "lighten( " + colorFunction + ", " + absL + " )";
        } else if (hslDifferences[2] > 0) { // if second color is darker
          colorFunction = "darken( " + colorFunction + ", " + hslDifferences[2] + " )";
        }

        // Logs the hslDifferences to the console in an array. -JMS
        return ( colorFunction );

      }

      function getColorDifferences(start, end) {
        var differences = [];
        var startColor = Color(start);
        var endColor = Color(end);
        var startColorHSL = startColor.hslArray();
        var endColorHSL = endColor.hslArray();
        for (var i = 0; i < 3; i++) {
          differences[i] = startColorHSL[i] - endColorHSL[i];
        }
        return ( differences );
      }

      // Variables from the forked repo starting on line :57 -JMS
      var startColor = $scope.bColor;
      //alert(startColor);
      var endColor = $scope.rColor;
      var differences = getColorDifferences(startColor, endColor);

      $scope.sassFunc = getColorFunction(startColor, differences);
    };

  });

  // Custom filter to reverse the order of the array so that the latest entry resides on top. -JMS
  app.filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });


  app.controller('SampleCtrl', function ($scope, $firebaseAuth) {
    var ref = new Firebase("https://dazzling-torch-5971.firebaseio.com/");

    // create an instance of the authentication service
    var auth = $firebaseAuth(ref);

    // login with Facebook
    auth.$authWithOAuthPopup("facebook").then(function (authData) {
      //console.log("Logged in as:", authData.uid);
    }).catch(function (error) {
      //console.log("Authentication failed:", error);
    });
  });


  app.controller('MyController', ['$scope', function ($scope) {
    $scope.textToCopy = 'I can copy by clicking!';

    $scope.success = function () {
      //console.log('Copied!');
    };

    $scope.fail = function (err) {
      //console.error('Error!', err);
    };
  }]);


  app.directive('colorValidation', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {

        modelCtrl.$parsers.push(function (inputValue) {

          //var transformedInput = inputValue.toLowerCase().replace(/^(?!#)/g, '#');
          //alert(transformedInput);

          // [TODO] This only uses hex colors now. I can't get it to check for simple_colors anymore. -JMS 2015-11-11
          if (inputValue.indexOf('#') != 0) {
            var transformedInput = '#' + inputValue.toLowerCase();
            //alert(tranformedInput);
          } else {
            var transformedInput = inputValue.toLowerCase();
          }
          //if (transformedInput != inputValue) {
          //  modelCtrl.$setViewValue(transformedInput);
          //  modelCtrl.$render();
          //}

          return transformedInput;
        });
      }
    };
  });

  app.directive('sassColorCard', function() {
    return {
      templateUrl: 'color-card.html'
    }
  });
  // Keep this semicolon -JMS
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
