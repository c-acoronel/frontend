'use strict';

/**
 * @ngdoc function
 * @name controlexpensesApp.controller:ExpensesCtrl
 * @description ExpensesCtrl Controller of the controlexpensesApp
 */
angular.module('controlexpensesApp')

.controller('ReportController', ['$scope', 'UserService', 'ExpenseService', function( $scope, UserService, ExpenseService) {
//.controller('AboutCtrl', function ($scope) {

	$scope.expenseService = ExpenseService;
	$scope.userService = UserService;

	//$scope.dateTo = new Date();
	//$scope.dateFrom = new Date();

    $scope.expenseReport = [];

    $scope.gridOptions = {
    		data: 'expenseReport.expenses',
    		columnDefs: [
    		             {field:'description', displayName:'Description'}, 
    		             {field:'comment', displayName:'Comment'}, 
    		             {field:'date', displayName:'Date', cellTemplate: '<div class="ngCellText"><span ng-cell-text>{{row.getProperty(col.field) | date:"MM/dd/yyyy h:mm a"}}</span></div>'},
    		             {field:'amount', displayName:'Amount', cellTemplate: '<div class="ngCellText"><span ng-cell-text>{{row.getProperty(col.field) | currency}}</span></div>'},
    					],
			   multiSelect: false,
			   rowTemplate: '<div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-click="loadExpense(row)" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div><div ng-cell></div></div>'
    	};


    $scope.loadReport = function () {
    	$scope.dateFrom = moment($scope.dateFrom).format('YYYY-MM-DD HH:mm:ss'); 
    	$scope.dateTo = moment($scope.dateTo).format('YYYY-MM-DD HH:mm:ss'); 
		
		$scope.expenseService.loadReport($scope.dateFrom, $scope.dateTo).then(
			function(data){
				$scope.expenseReport = data;
        $scope.today();
			},
		    function(error){
	            $scope.error = error.mesage;
	            console.dir(error);
	        }
	    );
	};	


//Datepicker controls.

  $scope.today = function() {
    $scope.dateFrom = new Date();
    $scope.dateTo = new Date();
	//var d = $scope.dateTo;
	//d.setDate(d.getDate()-7);
  };
  $scope.today();

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

 /* $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();*/

  $scope.openDateFrom = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

    $scope.openDateTo = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    startingDay: 1,
    showWeeks : false
  };


  }]);
