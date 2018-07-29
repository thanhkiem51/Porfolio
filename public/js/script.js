$(document).ready(function() {
	//responsive manipulator
	$('.fa-bars').on('click',function () {
		var x = document.getElementById("nav-bar");
		if (x.className === 'nav-bar')
			x.className += ' responsive';
		else
			x.className = 'nav-bar';
	});
});

$(window).on('load',function () {
	//bind play/pause feature to audio button on homepage
	$('#greet').on('click',function() {
		var audio = document.getElementById('audio');
		if (audio.paused) {
	           audio.play();
	       }else{
	           audio.pause();
	           audio.currentTime = 0;
	       }
	});


	$('#test').on('click',function(e) {
		$.get('endpoint', function(data) {
			console.log(data);
		})
		// $.ajax({
		// 	url: "/mapProject/endpoint",
		// 	type: "GET"}).done(function(response) {
		// 		console.log(response);
		// 	})

	})
	// $http.get('/mapdb' ,function(result){
	// 	alert("loaded");
	// 	console.log(result);
	// })
});


