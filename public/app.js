'use strict'
angular.module('LatelyOauth', [])
.controller('RootController', function($scope) {
	$scope.path=window.location.pathname;
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
			dashboardId:$scope.selectedDashboard._id,
			campaignId:$scope.selectedCampaign._id,
			url:$scope.urls.enteredURL || $scope.urls.selectedURL
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
**
.config(function ($routeProvider, $locationProvider) {

$routeProvider

  .when('/', {  
    reloadOnSearch: false,
    templateUrl: '/index.html',
  })  

  .when('/profile', {  
    reloadOnSearch: false,
    templateUrl: '/profile.html',
  })  

  .when('/dashboards', {  
    reloadOnSearch: false,
    templateUrl: '/dashboards.html',
  })    

  .when('/generate', {    
    templateUrl: '/generate.html',
    reloadOnSearch: false     
  })  

  .otherwise({
    redirectTo:'/',
    reloadOnSearch: false    
  });

 $locationProvider.html5Mode(true);      

})

**/