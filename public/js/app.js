(function(){
'use strict';

//Set up templates and angular controllers for each route
var app = angular.module('app', ['ngRoute']);
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
		// .when('/projects/mapProject', {
		// 	templateUrl: 'templates/projects/map.html',
		// 	controller: 'mapProjectController'
		// })
		.when('/projects/foodMenu', {
			templateUrl: 'templates/projects/food_menu.html',
			controller: 'foodMenuController'
		})
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
	$('#greet').hide().delay(7000).show(2200);
	$('#welcome-button').hide().delay(10000).show(2200);

	//play audio button
	$scope.greet = function() {
		var audio = document.getElementById('audio');
		if (audio.paused) {
	           audio.play();
	       }else{
	           audio.pause();
	           audio.currentTime = 0;
	       }
	};
});



// controller for About page
app.controller('aboutController',function($scope, $location) {
	$scope.projects = function() {
		$location.path('/projects');
	} 
});

//controller for projects page
app.controller('projectsController',function($scope, $location) {
	// $scope.mapProject = function() {
	// 	$location.path('/projects/mapProject');
	// } 
	$scope.foodMenu = function() {
		$location.path('/projects/foodMenu');
	} 

});

//controller for food menu
app.controller('foodMenuController',function($scope,$http) {
	// filtering menu to print them out in separated section
	$scope.isEntree = function(menu) {
		return menu.type == 'entrée';
	};
	$scope.isSide = function(menu) {
		return menu.type == 'side';
	};
	$scope.isDrink = function(menu) {
		return menu.type == 'drink';
	};
	$scope.isDessert = function(menu) {
		return menu.type == 'dessert';
	};

	//function used to show/update the menu
	function showMenu() {
		$http({
			method: 'GET',
			url:'/menuProject/getMenu'
		}).then( function success(res) {
			$scope.menu = res.data;
		}, function error(res) {
			console.log(res);
		});
	}
	function showContributors() {
		$http({
			method: 'GET',
			url:'/menuProject/getContributors'
		}).then( function success(res) {
			$scope.contributorList = res.data;
		}, function error(res) {
			console.log(res);
		});
	}
	// add item to menu
	$scope.addItem = function(item,calories,type,contributor) {

		if (item==null) {
			alert('Item name is required');
			return;
		}
		if (calories==null || isNaN(calories)) {
			alert('Calories count must be a number');
			return;
		}
		$http({
			method: 'POST',
			url:'/menuProject/addFood',
			data: {
				item: item,
				calories: calories,
				type: type
			}
		}).then( function success(res) {
			console.log(res);
			showMenu();
		}, function error(res) {
			console.log(res);
		});

		if (contributor!=null) {
			$http({
				method: 'POST',
				url:'/menuProject/addContributor',
				data: {
					contributor: contributor
				}
			}).then( function success(res) {
				console.log(res);
				showContributors();
			}, function error(res) {
				console.log(res);
			});
		}
	}

	// get menu and print out the content when the page is loaded
	showMenu();
	showContributors();


});

})(); //end self-invoke angular