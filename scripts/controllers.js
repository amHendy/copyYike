angular.module('Controllers',[])

// 侧边导航
.controller('NavsController',['$scope',function($scope){
	$scope.navs=[
		{link:'#!/today',text:'今日一刻',icon:'icon-home'},
		{link:'#!/older',text:'往期内容',icon:'icon-file-empty'},
		{link:'#!/author',text:'热门作者',icon:'icon-pencil'},
		{link:'#!/category',text:'栏目浏览',icon:'icon-menu'},
		{link:'#!/favourite',text:'我的喜欢',icon:'icon-heart'},
		{link:'#!/settings',text:'设置',icon:'icon-cog'}
	]
}])

// 今日一刻
.controller('todayController',['$scope', '$http', '$filter', '$rootScope',  function($scope,$http,$filter,$rootScope){
	// 获取计算机时间
	var today = $filter('date')( new Date,'yyyy-MM-dd');

	$rootScope.title = '今日一刻';
	$rootScope.index = 0;
	$rootScope.loaded = false;

	$http({
		url:'./api/today.php',//利用服务器代理，解决跨域问题
		method:'get',
		params :{today : today}
	}).then(function onSuccess(info){
		// console.log(info);
		var data = info.data;
		$rootScope.loaded = true;
		// 日期
		$scope.date = data.date;
		// 文章数据
		$scope.posts = data.posts;
	})
}])
// 往期内容
.controller('olderController',['$scope', '$http', '$rootScope',function($scope,$http,$rootScope){

	$rootScope.title = '往期内容';
	$rootScope.index = 1;
	$rootScope.loaded = false;

	$http({
		url:'./api/older.php',
	})
	.then(function onSuccess(info){
		// console.log(info);
		$rootScope.loaded = true;
		var data = info.data;

		$scope.date = data.date;
		$scope.posts = data.posts;
	})
}])

// 热门作者

.controller('authorController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){

	$rootScope.title = '热门作者';
	$rootScope.index = 2;
	$rootScope.loaded = false;

	$http({
		url:'./api/author.php'
	})
	.then(function onSuccess(info){
		
		$rootScope.loaded = true;
		var data =  info.data

		// 推荐
		$scope.rec = data.rec;
		// 全部
		$scope.all = data.all;
		// console.log(info);
		// console.log($scope.all);
	})
}])


// 栏目浏览
.controller('categoryController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){

		$rootScope.title = '栏目浏览';
		$rootScope.index = 3;
		$rootScope.loaded =false;

		$http({
			url:'./api/category.php'
		})
		.then(function onSuccess(info){

			 $rootScope.loaded = true;

			 var data = info.data;
			 $scope.columns = data.columns;
			 // console.log(info);

		})
}])

// 我的喜欢
.controller('favouriteController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){

		$rootScope.title = '我的喜欢';
		$rootScope.index = 4;
		$rootScope.loaded = false;

		$http({
			url:'./api/favourite.php'
		})
		.then( function onSuccess( info ){

			$rootScope.loaded = true;

			var data = info.data;

			// $scope.date = info.date;
			$scope.posts = data.posts;
			console.log(info)
		})
}])

// 设置

.controller('settings',['$scope','$rootScope',function($scope,$rootScope){

	$rootScope.title='设置';
	$rootScope.index = 5;
	$rootScope.loaded = true;

}])

// 个人主页
.controller('centerController',['$scope','$http', '$rootScope' ,'$routeParams',function($scope,$http,$rootScope,$routeParams){

	$rootScope.title='个人主页';
	$rootScope.index = 2;
	$rootScope.loaded = false;

	var autId = $routeParams.id;

	$http({
		url:'./api/center.php',
		params:{autId:autId}
	})
	.then(function onSuccess(info){

		$rootScope.loaded = true;

		$scope.author = info.data.author;
		$scope.posts = info.data.posts;
	})

}])

// 文章列表

.controller('listController',['$scope','$http','$rootScope', '$routeParams',function($scope,$http,$rootScope,$routeParams){

	$rootScope.title = '文章列表';
	$rootScope.index = 3;
	$rootScope.loaded = false;

	var listId = $routeParams.id;

	$http({
		url:'./api/list.php',
		params:{listId:listId}
	})
	.then(function onSuccess(info){
		$rootScope.loaded = true;
		// console.log(info);
		$scope.column = info.data.column;
		$scope.posts = info.data.posts;
	})
}])



