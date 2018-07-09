(function(){

'use strict';
var app = angular.module('contentApp', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider //routing for each page template
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
		.when('/delamar', {
			templateUrl: 'templates/projects/delamar.html',
		})
		// .when('/backend', {
		// 	templateUrl: 'templates/projects/delamar.html',
		// })
		// .when('/arrow hail', {
		// 	templateUrl: 'templates/projects/delamar.html',
		// })
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
app.controller('aboutController',function($scope, $location) {
	$scope.projects = function() {
		$location.path('/projects');
	} 
})
app.controller('projectsController',function($scope, $location) {
	$scope.pj1 = function() {
		$location.path('/delamar');
	} 
})

})(); //end self-invoke angular