window.$ 		= require('jquery');
window.fancybox = require('fancybox');
window.Api 		= require('./zillow/api');
Api.target 		= {};

Api.initialize($, 'zillow.com/api/v1');

$('#zpidlookup').on('click', submitZpidLookup);
$('.houselist').on('click', '.listing', buildMap);

function submitZpidLookup(evt){
	evt.preventDefault();
	
	$('.houselist').find('li').remove();

	Api.target.address    	= $('#address').val();
	Api.target.citystate  	= $('#citystate').val();
	Api.target.zip 	   		= $('#zip').val();
	
	Api.addressLookup(Api.endpoints.getsearchresults, Api.apiKey, Api.target.address, Api.target.zip).done(function(resp){
		var zpid_response 	= Api.xml2json(resp).searchresults.response.results.result;
		var zpid 			= Api.target.zpid = zpid_response.zpid;

		Api.getComps(Api.endpoints.comps, Api.apiKey, zpid, 25).done(function(resp){
			var json 			= Api.xml2json(resp);
			var compsResp 		= json.comps.response.properties;

			window.$scope.compsdata = compsResp.comparables.comp;
			window.$scope.$apply();

			$('.address').slideUp(100);
			$('#addresssearch').slideDown(100);
		});
	});
}

function displayListingInfo() {
	var map 	= Api.target.map;
	var marker 	= Api.target.marker;
}

function buildMap(evt){
	evt.preventDefault();
	var $target = $(evt.currentTarget);

	Api.target.zpid 			= $target.find('#zpid').html();
	Api.target.address 			= $target.find('.street').html().trim();
	Api.target.citystatezipcode = $target.find('.citystatezipcode').html().trim();

	var long = $target.data('long');
	var lat = $target.data('lat');

	var myLatlng = {lat: lat, lng: long};
	var mapOptions = {
	  zoom: 16,
	  center: myLatlng,
	};

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var marker = new google.maps.Marker({
	    position: myLatlng,
	    map: map,
	    title: Api.target.address
	});

	Api.target.map 		= map;
	Api.target.marker 	= marker;

	google.maps.event.addListener(marker, 'click', displayListingInfo);

	Api.getPhotos(Api.endpoints.getphotos, Api.apiKey, Api.target.zpid).done(function(resp){
		var resp 			= Api.xml2json(resp).updatedPropertyDetails.response;
		var photoLink 		= resp.links.photoGallery;

		$('#photos .photoLink').attr('href', photoLink);
	});
}