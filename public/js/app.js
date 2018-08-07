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
		.when('/projects/mapData', {
			templateUrl: 'templates/projects/map.html',
			controller: 'mapDataController'
		})
		.when('/projects/foodMenu', {
			templateUrl: 'templates/projects/food_menu.html',
			controller: 'foodMenuController'
		})
		.when('/projects/mangaBrowser/:name/:chapter', {
			templateUrl: 'templates/projects/manga_browser.html',
			controller: 'mangaBrowserController'
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
	$scope.mapData = function() {
		$location.path('/projects/mapData');
	} 
	$scope.foodMenu = function() {
		$location.path('/projects/foodMenu');
	} 

});

//controller for Google map visualization page
app.controller('mapDataController',function($scope) {
		/* Get color code for states*/
	function setColor(records) {
		for (let i=0;i<records.length;i++) {
			if (records[i].ready>records[i].threshold3)
				records[i].color='yellow';
			else if (records[i].ready>records[i].threshold2)
				records[i].color='green';
			else if (records[i].ready>records[i].threshold1)
				records[i].color='orange';
			else 
				records[i].color='red';
		}
		return records;
	}

	function loadMapShapes(map) {
		// load US state outline polygons from a GeoJson file
	  	map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/states.js', { idPropertyName: 'STATE' });
	}

	function loadColorData(map) {
		$.ajax({
	        url: "/mapProject/fetch",
	        type: "GET",
	        complete: function (result) {
	        	var records= setColor(result.responseJSON);

	            for (let i=0;i<records.length;i++) {
					if (records[i].stateID!=0) { //if the place is not on the map
						map.data
							.getFeatureById(records[i].stateID)
							.setProperty('color', records[i].color);
						// console.log(map.data.getFeatureById(records[i].stateID));
					}
				}
	        },
	        error: function(result) {
	            console.log(result);
	        }
		})
	}

	function styleFeature(feature) {
	  // delta represents where the value sits between the min and max
	  var color = feature.getProperty('color');

	  var outlineWeight = 2, zIndex = 1;
	  if (feature.getProperty('state') === 'hover') {
	    outlineWeight = zIndex = 2;
	  }

	  return {
	    strokeWeight: outlineWeight,
	    strokeColor: 'black',
	    zIndex: zIndex,
	    fillColor: color,
	    fillOpacity: 0.75,
	  };
	}


	function initMap() {
		var mapStyle = [{
		  'stylers': [{'visibility': 'off'}]
		}, {
		  'featureType': 'landscape',
		  'elementType': 'geometry',
		  'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
		}, {
		  'featureType': 'water',
		  'elementType': 'geometry',
		  'stylers': [{'visibility': 'on'}, {'color': '#bfd4ff'}]
		}];
		var mapOption = {
			center: {lat: 40, lng: -100},
			minZoom:4,
			zoom: 4,
			maxZoom: 5,
			styles: mapStyle,
			disableDefaultUI: true
		};
		var map = new google.maps.Map(document.getElementById('map'), mapOption);

	  	map.data.setStyle(styleFeature);
		// map.data.addListener('mouseover', mouseInToRegion);
		// map.data.addListener('mouseout', mouseOutOfRegion);

		loadMapShapes(map);
	  	// setTimeout( function() { loadColorData();},1000);
	}
	google.maps.event.addDomListener(window, 'load', initMap);
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

app.controller('mangaBrowserController', function($scope) {

});


})(); //end self-invoke angular