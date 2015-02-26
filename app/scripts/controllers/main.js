'use strict';

/**
 * @ngdoc function
 * @name controlexpensesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the controlexpensesApp
 */
angular.module('controlexpensesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.todos = [];
    
    $scope.addTodo = function () {
  		$scope.todos.push($scope.todo);
  		$scope.todo = '';
		};

	$scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };	

  });	
