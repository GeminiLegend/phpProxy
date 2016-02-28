#notes
goal:
pull all comps in a certain zipcode
have to specify zpid to pull comps
use input to specify a zipcode for the api call
<!-- make zipcode input
	make address input
	use my zpid
	this should pull all thier address info and their zpid
	use getearchresults to get ( uses their address and zipcode with my zwsid)
	their address zipcode and zpid
	directly insert that into the getcomps api to return all the comps in their area
	insert that into get comps api to pull comps form surrounding area
	AIzaSyDi1ZZxwAYZsDKiz5D0CFm3tGTuHNmGtNc
 -->
 Clicking search comps should:
 1. fade in comps
 2. fade in the filter bar
 3. hide the search inputs

 Clicking a comp should:
 1. set map display to visible (initially none);

 proxy:
 1. set variables for endpoints
 2. pass those along with the ajax calls
 3. have the proxy determine what endpoint to use for which api call and get the api data