<?php
/*
Class will get passed the data for the API 	through its constructor. 
The constructor will implment delegation to automatically  create the url for the correct endpoint
*/

$base 		= 'http://www.zillow.com/webservice/';
$endpoint 	= $_POST['endpoint'];
$apiKey 	= $_POST['apiKey'];
$suffix 	= '.htm?';


$curl 		= curl_init();

switch($endpoint){
	case 'GetSearchResults':
		$address	= $_POST['address'];
		$address 	= urlencode($address);
		$zip 		= $_POST['zip'];
		$url 		= $base.$endpoint.$suffix.'zws-id='.$apiKey.'&address='.$address.'&citystatezip='.$zip;
	break;
	case 'GetComps':
		$zpid 		= $_POST['zpid'];
		$count 	= $_POST['count'];
		$url 	= $base.$endpoint.$suffix.'zws-id='.$apiKey.'&zpid='.$zpid.'&count='.$count;
	break;
	case 'GetUpdatedPropertyDetails':
		$zpid 		= $_POST['zpid'];
		$url = $base.$endpoint.$suffix.'zws-id='.$apiKey.'&zpid='.$zpid;
	break;
};

curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $url);
curl_setopt($curl, CURLOPT_URL, $url);

if($result = curl_exec($curl) !== false){
	return $result;
} else {
	return 'error';
};