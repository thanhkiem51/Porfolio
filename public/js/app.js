(function(){

'use strict';
var app = angular.module('contentApp', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider
	//home page route
	.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'homeController'
	})
	.when('/about', {
		templateUrl: 'templates/about.html',
		controller: 'aboutController'
	})
	.when('/projects', {
		templateUrl: 'templates/projects.html',
		controller: 'projectsController'
	})
	.otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode(true);
});

app.controller('navController', function($scope, $location) {
	// $scope.$location = $location;
	$scope.home = function() {
		$location.path('/home');
	} 
	$scope.about = function() {
		$location.path('/about');
	} 
	$scope.projects = function() {
		$location.path('/projects');
	} 
})

app.controller('homeController',function($scope) {

})

})(); //end self-invoke angular