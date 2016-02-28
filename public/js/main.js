var CompsModule = angular.module('CompsApp', []);

CompsModule.controller('ZillowController', ['$scope', ZillowController]);

function ZillowController($scope){
	window.$scope = $scope;
}