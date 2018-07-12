$(document).ready(function() {
	// first load on delay
	// $('#line1').hide().delay(3000).show(2200);
	// $('#line2').hide().delay(5000).show(2200);
	// $('#welcome-button').hide().delay(10000).show(2200);

	// $('#welcome-button').hide().delay(8000).show(2200);

	//responsive manipulator
	$('.fa-bars').on('click',function () {
		var x = document.getElementById("nav-bar");
		if (x.className === 'nav-bar')
			x.className += ' responsive';
		else
			x.className = 'nav-bar';
	})
	


	// jquery for front page
	// $('#greet').click(function() {
	// 	var audio = document.getElementById('audio');
	// 	if (audio.paused) {
 //            audio.play();
 //        }else{
 //            audio.pause();
 //            audio.currentTime = 0
 //        }
	// })
});