'use strict';

/**
 * @ngdoc function
 * @name controlexpensesApp.controller:ExpensesCtrl
 * @description ExpensesCtrl Controller of the controlexpensesApp
 */
angular.module('controlexpensesApp')

.controller('ExpensesCtrl', ['$scope', '$http', 'UserService', 'ExpenseService', function( $scope, $http, UserService, ExpenseService) {
    $scope.expenseService = ExpenseService;
	$scope.userService = UserService;
	$scope.date = new Date();
	$scope.expenseList = [];
	$scope.newExpense = {};

    $scope.filterOptions = {
        filterText: ''
    };


    $scope.gridOptionsExpenses = {
		data: 'expenseList',
		columnDefs: [
		             {field:'description', displayName:'Description'}, 
		             {field:'comment', displayName:'Comment'}, 
		             {field:'date', displayName:'Date', cellTemplate: '<div class="ngCellText"><span ng-cell-text>{{row.getProperty(col.field) | date:"MM/dd/yyyy h:mm a"}}</span></div>'},
		             {field:'amount', displayName:'Amount', cellTemplate: '<div class="ngCellText"><span ng-cell-text>{{row.getProperty(col.field) | currency}}</span></div>'},
					],
		   filterOptions: $scope.filterOptions,
		   multiSelect: false,
		   rowTemplate: '<div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-click="setExpense(row)" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div><div ng-cell></div></div>'
	};


	$scope.loadExpenseList = function() {
		$scope.expenseList = $scope.expenseService.loadExpensesByUserId($scope.userService.currentUser.id.toString()).then(
			function(data) {
				console.groupCollapsed('Load expenses for ' + $scope.userService.currentUser.id + ' Complete');
				console.log('Expenses: ' + JSON.stringify(data, null, '\t'));
				console.groupEnd();
				$scope.expenseList = data;
			},
			function(error) {
				console.log('Load expenses Failed: ' + JSON.stringify(error, null, '\t'));
				console.log(error.data);
				$scope.expenseList = [];
			});
	},

    $scope.setExpense = function (row){
		console.log('Expense is: ' + row.entity.id);
		$scope.newExpense = row.entity;
		$scope.editDelete = true;
    };

	$scope.loadExpense = function () {
		$scope.expenseService.loadExpense('10').then(
			function(data){
				  	$scope.newExpense = data;
					console.log('Expense laoded');
				},
			function(error){
                    console.log('Expense loading Error!');
                });		
	}	
		
    $scope.addExpense = function () {
		$scope.newExpense.date = moment($scope.newExpense.date).format('YYYY-MM-DD HH:mm:ss'); 
		$scope.expenseService.createExpense($scope.newExpense).then(
			function(data){
				$scope.loadExpenseList();
				$scope.newExpense = {};
				console.log('Creation Success!');
			},
		    function(error){
	            console.log('Expense creation Error!');
	            console.dir(error);
	        }
	    );
	};	

   $scope.updateExpense = function () {
	$scope.newExpense.date = moment($scope.newExpense.date).format('YYYY-MM-DD HH:mm:ss'); 
	$scope.expenseService.updateExpense($scope.newExpense).then(
		function(data){
			$scope.loadExpenseList();
			$scope.newExpense = {};
			$scope.reset();
			console.log('Update Success!');
		},
	    function(error){
            console.log('Expense Update Error!');
            console.dir(error);
        }
    );
	};	

	$scope.deleteExpense = function (expense) {
		$scope.expenseService.deleteExpense(expense.id).then(
			function(data){
				$scope.loadExpenseList();
				$scope.newExpense = {};
				$scope.reset();
				console.log('Expense delete!');
			},
			function(error){
				console.log('Expense delete Error!');
                console.dir(error);
                //$scope.error = error.message;
			}
		);	
    };	

	$scope.getExpensesPerWeek = function () {
		$scope.expenseList = $scope.expenseService.getExpensesPerWeek($scope.userService.currentUser.id.toString()).then(
			function(data) {
				$scope.expenseList = data;
			},
			function(error) {
				console.log(error.data);
			});
	},

	$scope.reset = function () {
		$scope.editDelete = false;
		$scope.newExpense = {};
	}

	$scope.loadExpenseList();
	$scope.editDelete = false;
	console.log('controlexpenses.ExpenseController Initialized');


//Datepicker controls.


  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    startingDay: 1,
    showWeeks : false
  };


  //Timepicker controls

  $scope.changed = function () {
//    $log.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };
	
  }]);	
 
