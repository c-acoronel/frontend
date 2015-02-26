'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Registration', []);


/**
 * @ngdoc overview
 * @name controlexpensesApp
 * @description
 * # controlexpensesApp
 *
 * Main module of the application controlexpensesApp.
 */
angular
  .module('controlexpensesApp', [
    'Configuration',
	  'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'ngGrid',
    'ui.bootstrap',
	  'restangular',
	  'services.UserService',
	  'services.ExpenseService',
    'Authentication',
    'Registration'
  ])
  .config(function ($routeProvider, RestangularProvider, ApplicationProperties) {
    
	    var defaultRoute = '/login';

    RestangularProvider.setBaseUrl(ApplicationProperties.baseUrl);
    //RestangularProvider.setBaseUrl('/hal-ds/rest/cim');
    //By default Restangular appends an objects "id" field to the URL. We rename the field to avoid this.
    RestangularProvider.setRestangularFields({
         id: "$$$$$$$$id"
     });
	
	
	$routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController',
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'ReportController'
      })
	    .when('/expenses', {
		    templateUrl: 'views/expenses.html',
		    controller: 'ExpensesCtrl',
		  })
      .otherwise({ redirectTo: '/login' });
  })



/**
 * @ngdoc method
 * @name controlexpensesApp.run
 * @methodOf controlexpensesApp
 * @description Code in this block is executed after all modules are configured.
 */
.run(['$rootScope', '$location', '$cookieStore', '$http', 'AuthenticationService', 
        function ($rootScope, $location, $cookieStore, $http, AuthenticationService) {
        
     if (!AuthenticationService.isLoggedIn()) {
        $rootScope.isLoggedIn = false;
        //$rootScope.loggedInFailed = false;
        $location.path('/login');
    } else {
        $rootScope.isLoggedIn = true;
        $rootScope.loggedUser = AuthenticationService.getUser();
    }

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

         if ($location.path() === '/register'){
          $location.path('/register');
         }

        // redirect to login page if not logged in
        else if (!$rootScope.globals.currentUser) {
            $rootScope.isLoggedIn = false;
            $location.path('/login');
        }
          else {
              $rootScope.isLoggedIn = true;
              $rootScope.loggedUser = AuthenticationService.getUser();
          }
    });

}])

  
/**
 * @ngdoc method
 * @name controlexpenses.MainController
 * @methodOf controlexpenses.MainController
 * @description The main controller of this module and the application.
 */
.controller( 'MainController', function MainController ( $scope, UserService ) {
        $scope.userService = UserService;

		$scope.oneAtATime = true;

		$scope.status = {
			isFirstOpen: true,
			isFirstDisabled: false
		};

    console.log('controlexpenses.MainController Initialized');
});  