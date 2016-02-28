//Imperative programming vs declarative programming

// returning a module
var Api = {};
// module.exports = Api;
Api.apiKey 		= 'X1-ZWz1f5yx3rj1fv_6sext';
Api.base 		= 'http://www.zillow.com/webservice/'
Api.endpoints 	= {
	comps: 'GetComps',
	getsearchresults: 'GetSearchResults',
	getphotos: 'GetUpdatedPropertyDetails'
};

/*
6614 Hidden Cove Dr
Davie Fl
33314
AIzaSyDi1ZZxwAYZsDKiz5D0CFm3tGTuHNmGtNc
*/

Api.addressLookup = function(endpoint, apiKey, address, zip) {
	return $.ajax({
		url: '../../../proxy.php',
		type: 'POST',
		data: {
			endpoint: endpoint,
			apiKey: apiKey,
			address: address,
			zip: zip
		}
	});
};

Api.xml2json = function(resp){
	var x2js = new X2JS();
	var json = x2js.xml_str2json(resp);
	
	return json;
};

Api.getComps = function(endpoint, apiKey, zpid, count){
	return $.ajax({
		url: '../../../proxy.php',
		type: 'POST',
		data: {
			endpoint: endpoint,
			apiKey: apiKey,
			zpid: zpid,
			count: count
		}
	});
};

Api.getPhotos = function(endpoint, apiKey, zpid){
	return $.ajax({
		url: '../../../proxy.php',
		type: 'POST',
		data: {
			endpoint: endpoint,
			apiKey: apiKey,
			zpid: zpid
		}
	});
};

Api.initialize = function($, baseUrl) {
	// console.log('hi');	

	return {
		addressEndpoint: baseUrl + '/address',
		getApiKey: function(){
			return Api.apiKey;
		}
	};
};

// exporting the initialize method
module.exports = Api;