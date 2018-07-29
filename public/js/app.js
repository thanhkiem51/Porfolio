(function(){
'use strict';

//Set up templates and angular controllers for each route
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
		.when('/projects/mapProject', {
			templateUrl: 'templates/projects/map.html',
			controller: 'mapProjectController'
		})
		// .when('/backend', {
		// 	templateUrl: 'templates/projects/delamar.html',
		// })

		.otherwise({
			redirectTo: '/'
		});
	$locationProvider.html5Mode(true);
});

//controller for navigation menu, active all the time
app.controller('navController', function($scope, $location) {
	// $scope.$location = $location;
	$scope.home = function() {
		$location.path('/home');
	}; 
	$scope.about = function() {
		$location.path('/about');
	}; 
	$scope.projects = function() {
		$location.path('/projects');
	}; 
});

// controller for home page
app.controller('homeController',function($scope, $location) {
	$scope.about = function() {
		$location.path('/about');
	};
	//delay animation for welcome elements
	$('#line1').hide().delay(2000).show(2200);
	$('#line2').hide().delay(4000).show(2200);
	$('#welcome-button').hide().delay(7000).show(2200);
	$('#greet').hide().delay(10000).show(2200);
});



// controller for About page
app.controller('aboutController',function($scope, $location) {
	$scope.projects = function() {
		$location.path('/projects');
	} 
});

//controller for projects page
app.controller('projectsController',function($scope, $location) {
	$scope.map = function() {
		$location.path('/projects/mapProject');
	} 

});

app.controller('mapProjectController',function($scope) {

	// $('#test').on('click',function(e) {
	// 	var url = "http://localhost:5000/endpoint";
	// 	$.ajax({
	// 		url: url,
	// 		type: "GET",
	// 		success: function (result) {
	// 			console.log(result);
	// 		},
	// 		error: function(result) {
	// 			console.log(result);
	// 		}
	// 	})
	// })

});

})(); //end self-invoke angular