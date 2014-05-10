
//mapper obj like zoo obj . hold the function

function initialize() {
  var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(12.885931, -15.726562)
  };
// global
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
//function
  image = 'images/twitter.png';
  infowindows = [];

}

function locateTweet(lattitude, longitude) {

	var myLatLng = new google.maps.LatLng( lattitude , longitude );
  var tweetMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image
  });
   
  google.maps.event.addListener(tweetMarker, 'click', function() {
  	for(var i = 0; i < infowindows.length; i++ ){
      infowindows[i].open(map,tweetMarker);
    }
  });
}

// var marker_1 = new google.ma

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
      'callback=initialize';
  document.body.appendChild(script);
}

// var georssLayer = new google.maps.KmlLayer('http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss');

// google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function() {
	loadScript();
	$('form').on("submit", function(e){
    e.preventDefault();
    $.ajax({
      data: $(this).serialize(),
      dataType: "json",
      url: "/",
      method: "post",
      beforeSend: function(){$('#toolbar').append("<p>Fetching Tweet!</p>") }
    })
    .done(function(msg) {
    	//need to remove old tags, and reset map
    	$('p').remove();
      for(var i=0; i < msg.length; i++){
        // need a function takes coordinates and text global function 
      	locateTweet(msg[i].geo.coordinates[0], msg[i].geo.coordinates[1]);
        infowindows.push( new google.maps.InfoWindow({
          content: "<div id='tweetcontent'><p>" +  msg[i].text + "</p></div>"
        })
        );
      }
    });


	});
});