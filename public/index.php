<!DOCTYPE html>
<html lang="en">
<head>
	<link rel="stylesheet" type="text/css" href="./styles/css/styles.css">
	<meta charset="UTF-8">
	<title>zillow</title>
</head>
<body ng-app='CompsApp'>
	<div class="wrapper">
		<div id="comps" ng-controller="ZillowController">
			<input id="address" class='address' type="text" placeholder="Enter your address" value="9770 Hillside Drive">
			<input id="citystate" class='address' type="text" placeholder="Enter your city and state" value="Roswell GA">
			<input id="zip" class='address' type="text" placeholder="Enter your zip code" value="30076">
			<input id="zpidlookup" type="submit" value="Search Comps">

			<input id="addresssearch" class='address' type="text" ng-model="query" autofocus placeholder="Seach listings...">
			<ul class='houselist'>
				<li class='listing' ng-repeat="comp in compsdata | filter:query" data-lat='{{comp.address.latitude}}' data-long='{{comp.address.longitude}}'>
					<h4 class='street'>
						{{comp.address.street}}
					</h4>
					<p class='citystatezipcode'>
						{{comp.address.city}}, {{comp.address.state}} {{comp.address.zipcode}}
					</p>
					<p class='info'>
						Zestimate: <span>{{comp.zestimate.amount['__text'] | currency:'$':0}}</span> | Zpid: <span id='zpid'>{{comp.zpid}}</span>
					</p>
				</li>
			</ul>	
		</div>
		<div id="map"></div>
		<div id="photos">
			<a class="photoLink" href="#">gallery</a>
		</div>
	</div>

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDi1ZZxwAYZsDKiz5D0CFm3tGTuHNmGtNc&language=en" type="text/javascript"></script>
	<script src='./js/vendors/angular/angular.min.js'></script>
	<script src='./js/main.js'></script>
	<script src='./js/vendors/x2js/xml2json.js'></script>
	<script src='./dist/app.bundle.js'></script>
</body>
</html>