(function(){
'use strict';

//Set up templates and angular controllers for each route
var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	//routing for each page template
	$routeProvider 
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
		.when('/projects/mangaBrowser/mangaList', {
			templateUrl: 'templates/projects/manga_list.html',
			controller: 'mangaListController'
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

/*You can just jump to controller for certain templates by looking up controller name above*/ 

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
	var map;
	var labels = [];
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

	function loadMapShapes() {
		// load US state outline polygons from a GeoJson file
	  	map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/states.js', { idPropertyName: 'STATE' });
		google.maps.event.addListenerOnce(map.data, 'addfeature', function() {
			google.maps.event.trigger(document.getElementById('data'),'change');
		});
	}

	function changeStaff(value) {
		$.ajax({
	        url: "/mapProject/update",
	        type: "POST",
	        data: { option : value },
	        complete: function (result) {
	        	// console.log(result);
	        },
	        error: function(result) {
	            console.log(result);
	        }
		})
	}

	function clearColorAndLabel() {
		map.data.forEach(function(row) {
	    	row.setProperty('color', undefined);
	  	});
	  	for (var i = 0; i < labels.length; i++) {
	    	labels[i].setMap(null);
	  	}
	  	labels=[];
	}
	function loadColorAndLabel() {
		$.ajax({
	        url: "/mapProject/fetch",
	        type: "GET",
	        complete: function (result) {
	        	var records= setColor(result.responseJSON);
	        	var mapLabel;
	            for (let i=0;i<records.length;i++) {
					map.data
						.getFeatureById(records[i].stateID)
						.setProperty('color', records[i].color);
					mapLabel= new MapLabel({
				        text: records[i].state + '(' +records[i].ready+')',
				        position: new google.maps.LatLng(records[i].lat, records[i].long),
				        map: map,
				        fontSize: 12
				    });
				    labels.push(mapLabel);
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
		//disable indicators on map for customized labels
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
		//preset zoom option and default view to US
		var mapOption = {
			center: {lat: 40, lng: -100},
			minZoom:5,
			zoom: 5,
			maxZoom: 6,
			styles: mapStyle,
			// types: ['(regions)'],
			disableDefaultUI: true
		};

		map = new google.maps.Map(document.getElementById('map'), mapOption);
		map.data.setStyle(styleFeature);
		var selectBox = document.getElementById('data');

		loadMapShapes();
		  // setTimeout( function() { loadColorData();},1000);
		google.maps.event.addDomListener(selectBox, 'change', function() {
			changeStaff(selectBox.options[selectBox.selectedIndex].value);
			clearColorAndLabel();
			loadColorAndLabel();
		});		
	}
	initMap();
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

	//function used to show/update the menu contributors list
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

		//if user put it their name, add their name to contributor lists
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

	// get menu and print out the content when the page is loaded for the first time(in this case, when the controller are init)
	showMenu();
	showContributors();
});

// Controller for manga list page
app.controller('mangaListController', function($scope) {

});

// Controller for manga chapter page
app.controller('mangaBrowserController', function($scope) {

});


})(); //end self-invoke angular