var publicTemp = angular.module('public',[]);

publicTemp.directive('header',function(){
	return {
		restrict : 'E',
		replace : true,
		templateUrl : serverPath.templete()+'header.html',
		link : function(scope,element,attr){
		},
		controller: function ($scope){
			var add = window.localStorage.getItem('currageArea');
			if(add==null){
				add="暂无选定位置";
			}
			$scope.address = add;
			var pathName = window.location.pathname.split('/');
			pathName = pathName[pathName.length-1].split('.')[0];
			var navConfig = {
					'localInfo':'本地新闻',
					'main':'民生监督',
					'help_store':'扶贫商城',
					'talents_market':'人力市场',
					/*'suply':3,
					'my':4*/
					'my':'我的'
			};
			if(navConfig[pathName]==undefined){
				$scope.title = document.title;
			}else{
				$scope.title = navConfig[pathName];
			}
		}
}
});
publicTemp.directive('footer',function(){
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
					'localInfo':0,
					'main':1,
					'help_store':2,
					'talents_market':3,
					/*'suply':3,
					'my':4*/
					'my':4
				};
				navA[navConfig[pathName]].classList.add('active');
				//底部图片切换处理
				navA[navConfig[pathName]].querySelectorAll('img')[0].classList.add('hide');
				navA[navConfig[pathName]].querySelectorAll('img')[1].classList.remove('hide');
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
publicTemp.directive('getregion',function(){
	return{
		restrict : 'E',
		replace : true,
		templateUrl : serverPath.templete()+'getRegion.html',
		link : function(scope,element,attr){
		},
		controller: function ($scope){
			
		}
	}
})
publicTemp.directive('opention',function(){
	return{
		restrict : 'E',
		replace : true,
		templateUrl : serverPath.templete() + 'opention.html',
		link : function(scope,element,attr){
			var back = element[0].getElementsByTagName('span');
			back[0].addEventListener('tap',function(){
				 window.history.back();
			})
			back[1].addEventListener('tap',function(){
				window.location.href = serverPath.base + 'main.html';
			})
		},
		controller : function(){

		}
	}
})