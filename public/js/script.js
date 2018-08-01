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
	var records = function() {
		var tmp=null;
		$.ajax({
	        url: "/mapProject/fetch",
	        type: "GET",
	        'async': false,
	        success: function (result) {
	        	tmp = result;
	        },
	        error: function(result) {
	            console.log(result);
	        }
		})
		return tmp;
	}();

	records=setColor(records);
	for (let i=0;i<records.length;i++) {
		console.log(records[i]);
		if (records[i].stateID!=0) { //if the place is not on the map
			
			map.data
				.getFeatureById(records[i].stateID)
				.setProperty('color',records[i].color);
		}

	}
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
	loadColorData(map);
	
}


//

