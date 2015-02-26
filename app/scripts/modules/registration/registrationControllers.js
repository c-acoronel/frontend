'use strict';
 
angular.module('Registration')
 
.controller('RegistrationController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', 'RegistrationService',
    function ($scope, $rootScope, $location, AuthenticationService, RegistrationService) {
 
          $scope.register = function () {
            $scope.dataLoading = true;
            RegistrationService.Register($scope.newUser, function(response) {
                if(response.success) {
					//Set credential so user get login
                    AuthenticationService.Login($scope.newUser.email, $scope.newUser.password, function(response) {
                        if(response.success){
                            $location.path('/expenses');        
                        }
                        else {
                            console.log('User created but cannot complete login');
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                            $scope.newUser = "";
                        }        
                     });
                } else {
                    $scope.error = error.message;
                    $scope.dataLoading = false;
                    $scope.newUser = "";
                }
            });
        };
    }]);