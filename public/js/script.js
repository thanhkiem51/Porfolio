$(document).ready(function() {
	//responsive manipulator
	$('.fa-bars').on('click',function () {
		var x = document.getElementById("nav-bar");
		if (x.className === 'nav-bar')
			x.className += ' responsive';
		else
			x.className = 'nav-bar';
	})
	

	// jquery for front page
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