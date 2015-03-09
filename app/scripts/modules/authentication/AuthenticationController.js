'use strict';
 
angular.module('Authentication')
 
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
 
        // reset login status --> logout
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/expenses');
                } else {
                    $scope.error = response.statusText;
                    $scope.dataLoading = false;
                    $scope.username = "";
                    $scope.password = "";
                }
            });
        };

        $scope.register = function () {
            $location.path('/register');
        };

        $scope.logout = function () {
            AuthenticationService.Logout();
            $location.path('/login');
        };

    }]);
