 /**
 * @ngdoc overview
 * @name services.UserService
 * @description An empty module description. Please fill in a high level description of this module.
 */
angular.module( 'services.UserService', [
        'restangular'
])


 /**
 * @ngdoc service
 * @name services.UserService
 * @description An empty service description. Please fill in a high level description of this service.
 */
.service('UserService', ['$q', '$timeout', 'Restangular',  function($q, $timeout, Restangular) { return {

	currentUser: { 
//		id: '',
//		name: ''
//		login: false
	},

    addUser: function( newUser ) {

    	console.log('services.UserService.addUser: ' + JSON.stringify(newUser, null, '\t'));
	    
	    var self = this;
	    var deferred = $q.defer();

	    var request = Restangular.one('user').one('v1.0.0').one('create');
        //This is because the API does not follow the HTTP Spec, so we have to PUT to create a new document
        _.extend(request, newUser);
        console.log('request ' + JSON.stringify(request, null, '\t'));
		request.post().then(
            function(data) {
              self.currentUser = data;
              deferred.resolve(data);
            },

            function(error) {
                deferred.reject(error);
            }
        );

        return deferred.promise;
    }

};
}]);
