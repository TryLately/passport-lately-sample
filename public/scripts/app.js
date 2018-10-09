'use strict'
angular.module('LatelyOauth', ['ngRoute'])
.controller('RootController', function($scope,$location) {
	$scope.location=$location;
	$scope.login = function() {
		window.location.href="/auth/lately"
	}
	$scope.logout = function() {
		window.location.href="/logout"
	}	
})
.controller('ProfileController',function($scope,$http) {
	$http.get('/api/profile').then(function(response) {
		$scope.profile = response.data
	})
})
.controller('DashboardsController',function($scope,$http) {
	$http.get('/api/dashboards').then(function(response) {
		$scope.dashboards = response.data
	})
})	
.controller('GenerateController', function($scope,$http) {
	$scope.urls = {}
	$scope.$watch('urls.selectedURL',function() {
		$scope.urls.enteredURL=''
	})			
	$scope.sampleUrls=[
		'http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships',
		'https://venturebeat.com/2018/08/22/ibm-ai-transparency-factsheets/',
		'http://newsroom.ibm.com/2018-08-13-Travelport-and-IBM-launch-industry-first-AI-travel-platform-to-intelligently-manage-corporate-travel-spend'
	];
	$http.get('/api/dashboards').then(function(response) {
		$scope.dashboards = response.data
	})			
	$scope.submit=function() {

		delete $scope.errorMsg
		$scope.statusMsg = 'Sending..' 

		$http.post('/api/generate',{
			link:$scope.urls.enteredURL || $scope.urls.selectedURL,			
			dashboardId:$scope.selectedDashboard._id,
			campaignId:$scope.selectedCampaign._id,
			alt_link:$scope.urls.altURL
		})
		.then(function(response) {
			$scope.statusMsg = response.data;
		},function(err) {
			$scope.errorMsg = err.data;				
		});

	};
})

/**
Route configuration
**/
.config(function ($routeProvider, $locationProvider) {

$routeProvider

  .when('/app/profile', {  
    templateUrl: '/views/profile.html',
  })  

  .when('/app/dashboards', {  
    templateUrl: '/views/dashboards.html',
  })    

  .when('/app/generate', {    
    templateUrl: '/views/generate.html',
  })  

  .when('/app/login', {    
    templateUrl: '/views/index.html',
  })      

  .otherwise({
    redirectTo:'/app/login',
  });

  $locationProvider.html5Mode(true);      

})

