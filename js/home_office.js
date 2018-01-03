var homeoffice = angular.module('home_office',['public','ngRoute']);

homeoffice.config(function ($routeProvider){
	$routeProvider
	.when('/',{template:'这是首页页面'})
    .when('/computers',{template:'这是电脑分类页面'})
    .when('/printers',{template:'这是打印机页面'})
    .otherwise({redirectTo:'/'});
});