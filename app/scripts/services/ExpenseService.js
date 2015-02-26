 
 /**
 * @ngdoc overview
 * @name services.ExpenseService
 * @description An empty module description. Please fill in a high level description of this module.
 */
angular.module( 'services.ExpenseService', [
        'restangular'
])

 /**
 * @ngdoc service
 * @name services.ExpenseService
 * @description An empty service description. Please fill in a high level description of this service.
 */
.service('ExpenseService', ['$q', '$timeout', '$http', 'Restangular', 'UserService', 
          function($q, $timeout, $http, Restangular, UserService) { return {

    expensesByUserId: [],
    expensesPerWeek: [],

   /**
     * Loads expense data from the server. Returns a promise.
     * @param expenseId
     * @returns {Promise.promise|*}
     */
    loadExpense: function(expenseId) {
        console.log('services.ExpenseService.loadExpense(' + expenseId + ')');

        var self = this;
        var deferred = $q.defer();
        var request = Restangular.one('expenses').one('v1.0.0').one('expenseId').one(expenseId.toString());

        request.get().then(
            function(data) {
                self.expense = data;
                self.expense.date = new Date(self.expense.date);
                deferred.resolve(data);
            },
            function(error) {
                deferred.reject(error);
            }
        );

        return deferred.promise;
      },


    /**
     * Loads all expenses for a user from the server. Returns a promise.
     * @param userId
     * @returns {Promise.promise|*}
     */
    loadExpensesByUserId: function( userId ) {
        console.log('services.ExpenseService.loadExpensesByUserId(' + userId + ')');
        
        var self = this;
        var deferred = $q.defer();
	      console.log('call to: ' + Restangular.one('expenses').one('v1.0.0').one('getExpenses').one('userId').one(userId).getRestangularUrl());
        var request = Restangular.one('expenses').one('v1.0.0').one('getExpenses').one('userId').one(userId);
        
        request.get().then(
          function(data) {
          	if(data) {
              for(var i = 0; i < data.length; i++) {
                var expense = data[i];
                self.currentExpense = expense;
			          self.currentExpense.date = new Date(self.currentExpense.date);
                self.expensesByUserId.push(self.currentExpense);
              }
          	}
              deferred.resolve(data);
          },
          
          function(error) {
              deferred.reject(error);
          }
        );

      return deferred.promise;
    },
        
        
    /**
     * Creates a new expense with the given parameters
		 * @param description
     * @param date
     * @param comment
     * @param amount
     * @returns {Promise.promise|*}
     */
    createExpense: function( newExpense ) {
        console.log('services.ExpenseService.createExpense: ' + JSON.stringify(newExpense, null, '\t'));

        var self = this;
        var deferred = $q.defer();

        var request = Restangular.one('expenses').one('v1.0.0').one('create').one('userId').one(UserService.currentUser.id.toString());
        //This is because the API does not follow the HTTP Spec, so we have to PUT to create a new document
        _.extend(request, newExpense);
        console.log('request ' + JSON.stringify(request, null, '\t'));
	      request.post().then(
            function(data) {
              deferred.resolve(data);
            },
            function(error) {
              deferred.reject(error);
            }
        );

        return deferred.promise;
    },
		
		
		/**
     * Update an existing expense.
     * @param expense
     * @returns {Promise.promise|*}
     */
    updateExpense: function( expense ) {
        console.log('services.ExpenseService.updateExpense: ' + JSON.stringify(expense, null, '\t'));

        var self = this;
        var deferred = $q.defer();
        var request = Restangular.one('expenses').one('v1.0.0').one('update').one('userId').one(UserService.currentUser.id.toString());

        //This is because the API does not follow the HTTP Spec, so we have to PUT to create a new document
        _.extend(request, expense);
        console.log('request ' + JSON.stringify(request, null, '\t'));
			  request.post().then(
            function(data) {
              self.currentExpense = data;
              self.currentExpense.id = data.id;

              self.loadExpense(self.currentExpense.id).then(
                  function(data) {
                      deferred.resolve(data);
                  },
                  function(data) {
                      deferred.reject(data);
                  }
              );
            },
            function(error) {
                deferred.reject(error);
            }
        );

        return deferred.promise;
    },
		
		
		/**
     * Delete an existing expense.
		 * @param id
     * @returns {Promise.promise|*}
     */
    deleteExpense: function( expenseId ) {
        console.log('services.ExpenseService.deleteExpense: ExpenseId: ' + expenseId);

        var self = this;
        var deferred = $q.defer();
        var request = Restangular.one('expenses').one('v1.0.0').one('delete').one('userId').one(UserService.currentUser.id.toString()).one('expenseId').one(expenseId.toString());
        //This is because the API does not follow the HTTP Spec, so we have to PUT to create a new document
        _.extend(request, expenseId);
        console.log('request ' + JSON.stringify(request, null, '\t'));
	      request.remove().then(
            function(data) {
                deferred.resolve(data);
            },
            function(error) {
                deferred.reject(error);
            }
        );

        return deferred.promise;
    },


    /**
     * Return a report about expenses loaded between to dates
     * @param dateFrom, dateTo
     * @returns {Promise.promise|*}
     */
    loadReport: function( dateFrom, dateTo ) {
        console.log('services.ExpenseService.loadReport: from: ' + dateFrom + ' to: ' + dateTo);

        var self = this;
        var deferred = $q.defer();
        var request = Restangular.one('expenses').one('v1.0.0').one('getExpensesByDateRange').one('userId').one(UserService.currentUser.id.toString()).one('dateFrom').one(dateFrom).one('dateTo').one(dateTo);
        
        request.get().then(
            function(data) {
                deferred.resolve(data);
            },
            function(error) {
                deferred.reject(error);
            }
        );
        return deferred.promise;
    },
	
};
}]);