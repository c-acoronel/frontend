'use strict';
 
angular.module('Registration')
 
.factory('RegistrationService', ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService', 
    function ($http, $cookieStore, $rootScope, $timeout, UserService) {
        
        var service = {};

        service.Register = function (newUser, callback) {

            //service.SetCredentials(username, password);
            //$http.get('http://localhost:8081/expenses-server/rest/user/v1.0.0/create)
			UserService.addUser(newUser).then(
             	function(data){
					var response = {
						success: true
						}
						callback(response);
				},
				function(error){
					callback(error);
				}
			);
        };

        return service;
    }]);