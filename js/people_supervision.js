var people_supervision = angular.module('people_supervision',['public','ngRoute']);

//民生监督主页控制器
people_supervision.controller('supervision',function($scope){
	$('title').html(window.localStorage.getItem('currageArea')||"暂无选定位置")
//	轮播图链接
	mui("#banners").on("tap","a",function(){
		var href = this.getAttribute("href");
		window.location.href = href;
	});
	//进入回音壁详情页
	mui(".supervision-reply-list .mui-table-view").on("tap",".mui-table-view-cell",function(){
		var id = this.getAttribute("id");
		/*if(id){
			window.location.href= serverPath.supervision() + "reply_detail.html?id="+id;
		}*/
	});
//	进入我要曝光页面
	/*document.getElementById('people_publish').addEventListener('tap',function(){
		window.location.href = "people_exposure.html";
	});*/
	var publishclicknum = 0;
				document.querySelector('.box').addEventListener('tap',function(){
					var a = document.getElementById('btn1'),
					b = document.getElementById('btn2');
					if(publishclicknum==0){
						 a.classList.remove('hide');
						 b.classList.remove('hide');
						jQuery("#btn1").animate({opacity:"1",top:"-60px"},1000);
						jQuery("#btn2").animate({opacity:"1",top:"-30px",left:"-60px"},1000);
						publishclicknum=1;
					}else{
						jQuery("#btn1").animate({opacity:"0",top:"0px"},1000);
						jQuery("#btn2").animate({opacity:"0",top:"0px",left:"0px"},1000);
						setTimeout(function(){
							a.classList.add('hide');
							 b.classList.add('hide');
						},1000)
						 
						publishclicknum=0;
					}
				});
	document.getElementById('btn1').addEventListener('tap',function(){
					window.location.href =serverPath.supervision() +  "people_exposure.html";
				});
	document.getElementById('btn2').addEventListener('tap',function(){
					window.location.href =serverPath.supervision() +  "people_zan.html";
				});
	
//	监听民生监督选项卡点击
	mui(".supervision-select-box ul").on("tap","li",function(){
		 var value = this.getAttribute("data-link");
		 window.location.href =serverPath.supervision() + ""+value+"";
	});
});

//民生政策页主控
people_supervision.controller('people_policy',function($scope,$http){
	
	mui('#banners').on('tap','a',function(){
		var href = this.getAttribute('href');
		window.location.href = href;
	});
//	轮播图滚动
	var gallery = mui('.mui-slider');
    gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    
//	点击进入详情页
	mui(".mui-table-view").on('tap','.mui-table-view-cell',function(){
		var id = this.getAttribute('id');
		// window.location.href =serverPath.supervision() +  'people_policy_detail.html?id='+id;
		if(HuaXia.IsonLine){
			window.location.href =serverPath.base + 'news.html?id='+id;
		}
	});
});

//民生资金页主控
people_supervision.controller('people_funds',function(){
	mui('.mui-table-view').on('tap','.mui-table-view-cell',function(){
		var id = this.getAttribute('id');
		if(HuaXia.IsonLine){
			window.location.href =serverPath.supervision() +  "people_funds_detail.html?id="+id;
		}
	});
});
//民生项目页主控
people_supervision.controller('people_project',function(){
	mui('.mui-table-view').on('tap','.mui-table-view-cell',function(){
		var id = this.getAttribute("id");
		if(HuaXia.IsonLine){
			window.location.href =serverPath.supervision() +  "people_funds_detail.html?id="+id;
		}
	});
});
//民生物质页主控
people_supervision.controller('people_goods',function(){
	
	mui('.mui-table-view').on('tap','.mui-table-view-cell',function(){
		//wang-edit
		if(HuaXia.IsonLine){
			window.location.href =serverPath.supervision() +  "people_funds_detail.html?id="+id;
		}
	});
});
//农业学习页主控
people_supervision.controller('people_learn',function(){
	
});
//扶贫资金页总控
people_supervision.controller('people_poor',function(){
	mui('.mui-table-view').on('tap','.mui-table-view-cell',function(){
		if(HuaXia.IsonLine){
			window.location.href =serverPath.supervision() +  "people_funds_detail.html?id="+id;
		}
	});
});
//信访信息
people_supervision.controller('letter1',function(){
//	详情页点击事件
	mui('.mui-table-view').on('tap','.mui-table-view-cell',function(){
		var id = this.getAttribute('id');
		window.location.href =serverPath.supervision() +  'people_policy_detail.html?id='+id;
	})
});
people_supervision.controller('letter2',function($scope){

});
//民生资金详情总控制器
people_supervision.controller('fundsList',function($scope){
	$scope.nav = function(ev,index){
		var _this = ev.target;
		type = index;
		//切换高亮样式
		if(_this.tagName === 'A'){
			var As = _this.parentNode.querySelectorAll('a');
			mui.each(As,function(i,item){
				item.classList.remove('active');
			});
			_this.classList.add('active');
		};
		
	}
});
//民生资金详情路由
people_supervision.config( function ($routeProvider) {

	$routeProvider
	.when('/search1', {
		templateUrl: "search_list1.html",
		controller : "search1"
	})
	.when('/search2', {
		templateUrl: "search_list2.html",
		controller : "search2"
	})
	 .otherwise({redirectTo:'/'});

});
//对应列表控制器
//项目介绍
people_supervision.controller('fundslist1',function($scope){
});
//项目流程
people_supervision.controller('fundslist2',function($scope){
	// mui('.interviewBox').on('tap','p',function(){
	// 	var projectId = HuaXia.GetQueryString("id");
	// 	var itemId = this.parentNode.parentNode.parentNode.parentNode.getAttribute('id');
	// 	window.location.href = serverPath.supervision() + 'people_policy_detail.html?itemId='+itemId+'&projectId='+projectId;
	// });
	mui('.interviewBox').on('click','.interviewTimeContent',function(){
		var projectId = HuaXia.GetQueryString("id");
		var itemId = this.getAttribute('id');
		window.location.href = serverPath.supervision() + 'people_policy_detail.html?itemId='+itemId+'&projectId='+projectId;
	})
});
//项目进度
people_supervision.controller('fundslist3',function($scope){
//	进入详情页
	mui('.mui-table-view').on('tap','.mui-table-view-cell',function(){
		var itemId = this.getAttribute("id");
		var progressId = HuaXia.GetQueryString("id");
		window.location.href = serverPath.supervision() + "project_detail.html?itemId="+itemId+"&progressId="+progressId;
	});
});

people_supervision.controller('search1',function($scope){
	$scope.jump = function(){
		if($scope.number&&$scope.ID){
			window.location.href = serverPath.supervision() + "search_detail1.html?id="+$scope.number+"";
		}else{
			mui.alert('请输入完整');
		}
	}
});
people_supervision.controller('search2',function($scope){
	$scope.jump = function(){
		if($scope.number&&$scope.ID){
			window.location.href =serverPath.supervision() +  "search_detail2.html?id="+$scope.number+"";
		}else{
			mui.alert('请输入完整');
		}
	}
});

//网上举报控制器
people_supervision.controller('people_report',function($scope){

})
/**
 * 
 * 获取曝光详情
 * $scope 作用域
 * supervisionService 数据服务层
 * setimgheight
 * **/
people_supervision.controller("replyDetailCtrl",function($scope,supervisionService,setimgheight){
	var id = HuaXia.GetQueryString("id");
	 supervisionService.getReplyDetail(id).then(function(ret){
	 	$scope.data = ret.result;
	 	console.log(ret);
	 });
	 $scope.setImgHeight = setimgheight;
	 $scope.base = IMG_web;
});
/**
 * 数据拉取方法
 * $q
 * $http
 * **/
people_supervision.factory("supervisionService",function($q,$http){
	return {
		getReplyDetail : function(id){
			var deffered = $q.defer();
			var promised = deffered.promise;
			$http.get(API.SUPERVISE.exposDetail+id+"/")
			.success(function(data,header,config){
				deffered.resolve(data);
			})
			.error(function(data){
				deffered.reject(data);
			});
			return promised;
		}
	}
});

/*图片响应*/
people_supervision.factory("setimgheight",function($window){
	var width = angular.element($window)[0].innerWidth;
	var setimgheight = {
		"height" : width*9/16 +"px",
		"width" : "100%",
		"object-fit" : "cover",
	};
	return setimgheight;
});
/**
 * 过滤器
 * @time {Int} 需要格式化的数据 
 * **/
people_supervision.filter("formatTime",function(){
	return function(time){
		if(time==undefined){
			return;
		}
		var year,mouth,day,result;
		year = time.toString().substring(0,4);
		mouth = time.toString().substring(4,6);
		day = time.toString().substring(6,8);
		result = year + "-" + mouth + "-" + day;
		return result;
	}
})
