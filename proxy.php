<?php
/*
Class will get passed the data for the API 	through its constructor. 
The constructor will implment delegation to automatically  create the url for the correct endpoint
*/

class API {
	public $endpoint;
	public $address;
	public $zip;

	public $apiKey;
	public $zpid;
	public $suffix 		= '.htm?';
	public $base 		= 'http://www.zillow.com/webservice/';
	public $fullBase;
	public $count;

	public $http;

	public function __construct($data){
		if(array_key_exists('endpoint', $data)) $this->endpoint = $data['endpoint'];
		if(array_key_exists('address', $data)) 	$this->address 	= urlencode($data['address']);
		if(array_key_exists('zip', $data)) 		$this->zip 		= $data['zip'];
		if(array_key_exists('apiKey', $data)) 	$this->apiKey 	= $data['apiKey'];
		if(array_key_exists('zpid', $data)) 	$this->zpid 	= $data['zpid'];
		if(array_key_exists('count', $data)) 	$this->count 	= $data['count'];

		$this->fullBase 								= $this->base.$this->endpoint.$this->suffix;

		$this->http 									= curl_init();
	}

	public function buildUrl($endpoint){
		switch($endpoint){
			case 'GetSearchResults':
				$url 	= $this->fullBase.'zws-id='.$this->apiKey.'&address='.$this->address.'&citystatezip='.$this->zip;
			break;
			case 'GetComps':
				$url 	= $this->fullBase.'zws-id='.$this->apiKey.'&zpid='.$this->zpid.'&count='.$this->count;
			break;
			case 'GetUpdatedPropertyDetails':
				$url 	= $this->fullBase.'zws-id='.$this->apiKey.'&zpid='.$this->zpid;
			break;
		};

		return $url;
	}

	public function configureRequest($url){
		curl_setopt($this->http, CURLOPT_POST, 1);
		curl_setopt($this->http, CURLOPT_POSTFIELDS, $url);
		curl_setopt($this->http, CURLOPT_URL, $url);
	}

	public function fetch(){
		if($result = curl_exec($this->http) !== false){
			return $result;
		} else {
			return 'error';
		};
	}
}

$api = new Api($_POST);
$url = $api->buildUrl($api->endpoint);
$api->configureRequest($url);

echo $api->fetch();



