$(document).ready(function() {
	$('.fa-bars').on('click',function () {
		var x = document.getElementById("nav-bar");
		if (x.className === 'nav-bar')
			x.className += ' responsive';
		else
			x.className = 'nav-bar';
	})

});

var contentApp = angular.module('contentApp', ["ngRoute"]);
contentApp.config(function($routeProvider) {
	routeProvider
	.when("/", {templateUrl: "home.html"})
});
contentApp.controller('mainController', function($scope) {

});


