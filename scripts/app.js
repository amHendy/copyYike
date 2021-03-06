var Yike = angular.module('Yike',['ngRoute','Controllers']);

Yike.config(['$routeProvider',function($routeProvider){
	
	$routeProvider.when('/today',{
		templateUrl:'./views/today.html',
		controller:'todayController'
	})
	.when('/older',{
		templateUrl:'./views/older.html',
		controller:'olderController'
	})
	.when('/author',{
		templateUrl:'./views/author.html',
		controller:'authorController'
	})
	.when('/category',{
		templateUrl:'./views/category.html',
		controller:'categoryController'
	})
	.when('/favourite',{
		templateUrl:'./views/favourite.html',
		controller:'favouriteController'
	})
	.when('/settings',{
		templateUrl:'./views/settings.html',
		controller:'settingsController'
	})
	.when('/author/:id',{
		templateUrl:'./views/center.html',
		controller:'centerController'
	})
	.when('/column/:id',{
		templateUrl:'./views/list.html',
		controller:'listController'
	})
	.otherwise({
		redirectTo:"/today"
	})

}]);

Yike.run(['$rootScope',function($rootScope){
	// 设置类名初始值
	$rootScope.collapsed = false;

	// 全局方法,导航动画
	$rootScope.toggle = function(){

		$rootScope.collapsed = !$rootScope.collapsed;

		// 获取所有导航

		var navs = document.querySelectorAll('.navs dd');

		if($rootScope.collapsed){
			// console.log('打开');
			for(var i=0; i<navs.length; i++){
				navs[i].style.transform = 'translate(0)';
				navs[i].style.transitionDelay = '0.2s';
				navs[i].style.transitionDuration = (i+1) * 0.15 + 's';
			}
		}else{
			var len = navs.length-1;
			for(var j = len; j>0; j--){
				// console.log(len-j);
				navs[j].style.transform='translate(-100%)';
				navs[j].style.transitionDelay = '';
				navs[j].style.transitionDuration = (len - j) * 0.15 +'s';
			}
		}
	}
}])