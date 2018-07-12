(function(){

'use strict';
var app = angular.module('contentApp', ['ngRoute']);

$(document).ready(function() {
	$('#line1').hide().delay(3000).show(2200);
	$('#line2').hide().delay(5000).show(2200);
	$('#welcome-button').hide().delay(10000).show(2200);
	$('#greet').hide().delay(12000).show(2200);
	
	$('#greet').click(function() {
		var audio = document.getElementById('audio');
		if (audio.paused) {
            audio.play();
        }else{
            audio.pause();
            audio.currentTime = 0
        }
	})
});
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

app.controller('homeController',function($scope, $location) {
	$scope.about = function() {
		$location.path('/about');
	} 
})
app.controller('aboutController',function($scope, $location) {
	$scope.projects = function() {
		$location.path('/projects');
	} 
})
app.controller('projectsController',function($scope, $location) {

})

})(); //end self-invoke angular