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