var directive = angular.module("wx_directive",[]);
directive.directive("getFocus",function (){
	return {
		restrict : "AE",
		link : function(scope,element,attrs){
			element[0].focus();
		}
	}
});
directive.directive("wxHeader",function(){
	return {
		restrict : 'E',
		replace : true,
		templateUrl : serverPath.helpStore() + "header.html",
		link : function(scope,element,attr){
			scope.getData = {
				//获取当前页面的标题
				title : '扶贫商城',
				//定位信息
				geolocation : function(){
				
				},
			};
	},
	controller:function($scope){
		$scope.gotoCollect = function(){
			HuaXia.Author(function(){
				window.location.href = serverPath.my() + "my_collect.html";
			})
		}
		$scope.gotoOrder = function(){
			HuaXia.Author(function(){
				window.location.href = serverPath.my() + "my_order.html";
			})
		}
	}
}
});
directive.directive('footer',function(){
	return {
		restrict : 'E',
		replace : true,
		templateUrl : serverPath.templete()+'footer.html',
		link : function(scope,element,attr){
			//处理导航页面颜色点亮
			var navA = element[0].getElementsByTagName('a');
			if(navA.length){
				var pathName = window.location.pathname.split('/');
				pathName = pathName[pathName.length-1].split('.')[0];
				var navConfig = {
					'localIndo':0,
					'main':1,
					'help_store':2,
					'talents_market':3,
					//'suply':,
					'my':4
				};
				navA[navConfig[pathName]].classList.add('active');
			};
			//点击事件
			angular.forEach(navA,function(obj){
				obj.addEventListener('tap',function(){
					if(this.dataset.link=='my.html'){
						var self = this;
						HuaXia.Author(function(){
							var targetId = self.dataset.link;
							window.location.href = targetId;
						})
					}else{
						var targetId = this.dataset.link;
						window.location.href = targetId;
					}
				});
			});
		}
	};
});
