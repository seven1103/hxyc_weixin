var talents = angular.module("talents",["public"]);
talents.controller("talentsIndexCtrl",function($scope,$window,$location){
	var width = angular.element($window)[0].innerWidth;
	//设置图片高度
	var getHeight = width*9/16;
	$scope.setimgheight = {
		height : getHeight +"px",
	};

});

talents.controller('talentsCtrl',function($scope) {
	$('title').html(window.localStorage.getItem('currageArea')||"暂无选定位置")
	/*求职详情跳转*/
	mui("#apply").on("tap",".mui-table-view-cell",function(){
		var id = this.getAttribute("value");
		location.href = serverPath.talents_market()+"apply_detail.html?id="+id;
	});
	/*招聘屏信息跳转*/
	mui("#resuit").on("tap",".mui-table-view-cell",function(){
		var id = this.getAttribute("value");
		location.href = serverPath.talents_market()+"resuit_detail.html?id="+id;
	});
});

/*求职详情控制器*/
talents.controller("applyDetailCtrl",function($scope,$window,setimgheight,dataServic){
		$scope.setimgheight = setimgheight;
	var id = HuaXia.getURL_id();
	dataServic.applyData(id).then(function(result) {
		if(result.code!=0){
			document.getElementsByTagName("body")[0].innerHTML(notdata('页面被删除或移至其他页面!'));
		}else{
			$scope.data = result.result.labor;
			var propertyList = ['一般贫困户','低保户','五保户','低保贫困户','一般农户','五保贫困户'];
			var whyArr=["其他","因病","因残","因灾","缺土地","缺水","缺技术","缺劳力","缺资金","交通条件落后"]
			var eduArr = ['未知','文盲或半文盲','小学','初中','高中','大专及以上','学龄前儿童'];
			$scope.data.family.property = propertyList[$scope.data.family.property]||'未知';
			$scope.data.family.cause = whyArr[$scope.data.family.cause]||'未知';
			$scope.data.edu = eduArr[$scope.data.edu]||'未知';
			var tags = ['','','',''];
			for(var i=0;i<$scope.data.tags.length;i++){
				switch ($scope.data.tags[i]) {
					case 0:
						tags[0] = 'active';
						break;
					case 1:
						tags[1] = 'active';
						break;
					case 2:
						tags[2] = 'active';
						break;
					case 3:
						tags[3] = 'active';
						break;
					default:
						break;
				}
			}
			$scope.tags = tags;
		}
	
	},function(res){
		var html = "<div class='serverError'>"+
						"<p>网络连接失败,重新刷新!!</p>"+
						"<i class='icon wx-dianji'></i>"+
					"</div>"
		var e = angular.element(document.documentElement).css("height","100%");
		var e = angular.element(document.querySelector("body")).html(html).css("height","100%");
		angular.element(document.querySelector(".wx-dianji")).on("click",function(){
			window.location.reload();
		});
	});
	
});
/*招聘页面*/
talents.controller("resuitDetailCtrl",function($scope,$window,setimgheight,dataServic){
	$scope.setimgheight = setimgheight;
	var id = HuaXia.getURL_id();
	dataServic.resuitData(id).then(function(result){
			$scope.data = result.result.employ;
		
		/*
		 *@params object->result.employ.tags
		 *@params data ->当前数据
		 * @params index ->索引
		 * @params array ->当前对象
		 * data == array[index]
		 * */
		/*var ele = angular.element(document.getElementById("apply_welfare"));
		console.log(ele[0].childNodes);
		angular.forEach(result.employ.tags,function(data,index,array){
			
		});*/
	},function(res){
		var html = "<div class='serverError'>"+
						"<p>网络连接失败,重新刷新!!</p>"+
						"<i class='icon wx-dianji'></i>"+
					"</div>"
		var e = angular.element(document.documentElement).css("height","100%");
		var e = angular.element(document.querySelector("body")).html(html).css("height","100%");
		angular.element(document.querySelector(".wx-dianji")).on("click",function(){
			window.location.reload();
		});
	});
});

/*搜索页面*/
talents.controller("talentSearchCtrl",function($scope){
	$scope.cancle = function(){
		history.back()
	}
});

talents.factory("dataServic",function($http,$q){
	return{
		/*
		 * 求职网络请求
		 * @params $q angular网路异步请求
		 * 			  defer()声明一个延迟对象
		 * 			      在注册一个承诺promise,相当于盒子，用来装数据	
		 * @params $http angular网络请求
		 * */
		applyData:function(id){
			var deferred = $q.defer();
			var promised = deferred.promise;
			$http.get(API.JOBS.labors + id + '/')
			.success(function(data,status,headers,config){
				deferred.resolve(data);
			})
			.error(function(reason){
				deferred.reject(reason);
				console.log(reason)
			});
			return promised;
		},
		//招聘网路请求
		resuitData : function(id){
			var deferred = $q.defer();
			var promised = deferred.promise;
			$http.get(API.JOBS.employs + id + '/')
			.success(function(data,status,headers,config){
				deferred.resolve(data);
				console.log(headers)
			})
			.error(function(reason){
				deferred.reject(reason);
				console.log(reason)
			});
			return promised;
		}
	}
	
	
});
/*图片响应*/
talents.factory("setimgheight",function($window){
	var width = angular.element($window)[0].innerWidth;
	var setimgheight = {
		"height" : width*9/16 +"px",
		"width" : "100%",
		"object-fit" : "cover",
	};
	return setimgheight;
});

/*图片操作*/
talents.filter("getUrl",function(){
	return function(arr){
		if(!arr){
			return ;
		}
		if(arr.indexOf("http://")==-1||arr.indexOf("https://")==-1){
			return IMG_web + arr;
		}
	}
});
//返回务工文本
talents.filter("getText",function(){
	return function(text){
		switch(text){
		case 0:
			return "包吃";
			break;
		case 1:
			return "包住";
			break;
		case 2:
			return "五险";
			break;
		case 3:
			return "一金";
			break;
				
		}
	}
});
/*
*过滤致贫原因
*/
talents.filter("causes",function(){
	return function(code){
		var arr = ['其他', '因病', '因残', '','因灾', '缺土地', '缺水', '缺技术', '缺劳力', '缺资金', '交通条件落后', '因学','自身发展动力不足'];
        var str = '';
        if(code){
        	 code.forEach(function(item){
				str += arr[item]+' ';
			})
			return str || '未知';
		}

	}
})