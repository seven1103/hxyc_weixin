var store = angular.module('help_store',["public"]);
store.controller("storeIndexCtrl",function ($scope,$window,$location) {
	$('title').html(window.localStorage.getItem('currageArea')||"暂无选定位置")
	var height = angular.element($window)[0].innerWidth;
	//设置图片高度
	var getHeight = (height/5)*0.6-12;
	$scope.setheight = {
		height : getHeight +"px",
	};
});
store.controller("storePayCtrl",function ($scope,$window,goods_detailService,setimgheight) {
	$scope.setImgHeight = setimgheight;
	/*
	 *@params pay_goods 
	 * */
	//判断当前是否存在商品内容（如果是从分享进来，没有）
	var pay_goods;
	if(JSON.parse(window.sessionStorage.getItem("pay_goods"))){
		pay_goods=JSON.parse(window.sessionStorage.getItem("pay_goods"));
		// console.log(pay_goods);
		show(pay_goods);
	}else{
		var id = HuaXia.GetQueryString('id');
		var aipUrl = API.MALL.shopDetail.replace(/<goods_id>/,id);
		HuaXia.Ajax({
			type:'get',
			url:aipUrl,
		},function(data){
			$scope.$apply(function(){
			    show(data.goods);
			    window.sessionStorage.setItem("pay_goods",JSON.stringify(data.goods));
			})
		})
	}
	function show(pay_goods){
		// console.log(pay_goods.has_fav);
		$scope.data = pay_goods;
		var propertyList = ['一般贫困户','低保户','五保户','低保贫困户','一般农户','五保贫困户'];
		var whyArr= ['其他', '因病', '因残', '','因灾', '缺土地', '缺水', '缺技术', '缺劳力', '缺资金', '交通条件落后', '因学致贫'];
		$scope.data.family.property = propertyList[$scope.data.family.property]||'未知';
		//$scope.data.family.cause = whyArr[$scope.data.family.cause]||'未知';
		$scope.data.family.cause = function(){
			let str = '';
			$scope.data.family.cause.forEach(item => {
			str += whyArr[item];
			});
			return str || '未知';
		};
		var times = pay_goods.delivery.ready==1?'':(HuaXia.format( pay_goods.delivery.start,1) + '至' + HuaXia.format(pay_goods.delivery.end,1));
		$scope.delivery_time = pay_goods.delivery.ready==1?'有现货,可以随时提货':times;
		$scope.timed =pay_goods.delivery.ready==1?'':(HuaXia.format( pay_goods.delivery.start,1) + '至' + HuaXia.format(pay_goods.delivery.end,1));
	}
	//注册跳转商品支付页面
	$scope.pay = function(){
		var userinfo = window.localStorage.getItem('userinfo');
		if(userinfo){
			location.href=serverPath.helpStore()+"good_pay.html";
		}else{
			var btnArray = ['登陆成功才能购买'];
			mui.confirm('是否现在登陆', btnArray, function(e) {
				if (e.index == 1) {
					HuaXia.Author(function(){});
				}	
			})
		}
	}
	//添加收藏
	mui('.footer_nav').on('tap','.footer_love',function(){
		var userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
		if(userinfo){
			if(jQuery(this).find('img').hasClass("wx-wujiaoxing2")==true){
				$scope.$apply(function(){
			    　　　　$scope.data.has_fav = false;
			　　　　})
				delete_love(pay_goods._id);
			}else{
				$scope.$apply(function(){
			    　　　　$scope.data.has_fav = true;
			　　　　})
				add_love(pay_goods._id);
			}
		}else{
			var btnArray = ['登陆成功才能收藏'];
			mui.confirm('是否现在登陆', btnArray, function(e) {
				if (e.index == 1) {
					HuaXia.Author(function(){});
				}	
			})
		}
	})
	
	/*
		 *点击收藏 
		 * @params good_id商品ID
		 * */
		function add_love(id){
			var userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
			HuaXia.Ajax({
				type:'post',
				url:API.MALL.favorite.replace(/<goods_id>/,id),
				data:{
					user_id:userinfo.user._id
				}
			},function(data){
				if(data){
					$("#wx_tip").html("收藏成功").slideDown("slow",function(){
						var _this = $(this);
						setTimeout(function(){
							_this.slideToggle("fast");
						},2000)
					});
				}
			});
		}
		/*
		 *点击收藏取消 
		 * @params good_id商品ID
		 * */
		function delete_love(id){
			var userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
			HuaXia.Ajax({
				type:'delete',
				url:API.MALL.unfavorite.replace(/<goods_id>/,id),
				data:{
					user_id:userinfo.user._id
				}
			},function(data){
				if(data){
					$("#wx_tip").html("取消收藏成功").slideDown("slow",function(){
						var _this = $(this);
						setTimeout(function(){
							_this.slideToggle("fast");
						},2000)
					});
				}
			});
		}
	
	//缓存信息
	if(!window.localStorage.getItem('userinfo')){
			if(HuaXia.GetQueryString('state')==1){
				//获取code
				var code = HuaXia.GetQueryString('code');
				//ajax获取数据
				HuaXia.Ajax({
					type:'get',
				    url:API.MISC.myauthor.replace('<code>',code),
				},function(data){
					/*console.log(data);*/
					window.localStorage.setItem('userinfo',JSON.stringify(data));//还原var str = JSON.stringify(jsObj);  var str1 = JSON.parse(str);  
				})
				
		}
		}
});
store.controller("goodPayCtrl",function($scope,$rootScope){
	/*
	 *@parms pay_goods 需要购买的数据 
	 * */
    var result = window.sessionStorage.getItem("pay_goods");
    	result = eval("("+result+")");
    	var userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
    	var username;
    if(result){
    	$scope.data= result;
    	$scope.data.goods_person = userinfo.user.receiver.name;
    	username = $scope.data.goods_person;
    	$scope.data.goods_phone = userinfo.user.receiver.phone;
    	$scope.data.goods_address = userinfo.user.receiver.address;
    }else{
    	location.href=serverPath.helpStore()+"help_store.html";
    }
	
	/*****************数据绑定**********************/
	$scope.allNum=result.amount - result.sales;
	$scope.good_num =1;
	$scope.good_price =result.price.toFixed(2);
	$scope.good_total_price = ($scope.good_num*$scope.good_price).toFixed(2);
	var timed = HuaXia.format( result.delivery.start,1) + '至' + HuaXia.format( result.delivery.end,1);
	$scope.delivery_time = result.delivery.ready==1?'现货':timed;
	//增加商品
	$scope.addNum = function(){
		var noStart = true;
		if($scope.good_num<$scope.allNum){
			$scope.good_num = $scope.good_num+1;
		}else{
			if(noStart){
				$scope.good_num = $scope.allNum;
				noStart=false;
			}
			mui.toast("最大库存")	;
		}
		$scope.good_total_price = ($scope.good_price*$scope.good_num).toFixed(2);
	}
	//减少商品数目
	$scope.reduceNum = function(){
		if($scope.good_num>0){
			$scope.good_num = $scope.good_num-1;
		}else{
			$scope.good_num =0;
		}
		$scope.good_total_price = ($scope.good_price*$scope.good_num).toFixed(2);
	}
	var goodsnum = $scope.good_num;
	//点击购买
	//提交支付订单
	$scope.pay = function(){
		if(userinfo.user.receiver.phone&&username&&$scope.good_num){
		   HuaXia.Ajax({
			type:'post',
			url:API.MALL.buy.replace(/<goods_id>/,result._id),
			data : {
			 'open_id':userinfo.user.oauth[0].openid,
			 'user_id':userinfo.user._id,
			 'goods_id':result._id,
			 'nums':$scope.good_num,
			 'rec_name':username,
			 'rec_phone':userinfo.user.receiver.phone,
			 'rec_addr':userinfo.user.receiver.address,
			 'ent_name': userinfo.user.receiver.ent_name=='暂无'?'':userinfo.user.receiver.ent_name
			}
		   },function(data){
		   		if(data.msg){
		   			mui.alert(data.msg);
				}else{
		   			window.sessionStorage.setItem('goods_history',1);
		   			location.href=serverPath.my()+"my_order1.html";
				}
		   })
		  }else{
			if(!userinfo.user.receiver.phone){
				mui.alert('收货电话必填，请移驾到个人资料中修改');
			}else if(!username){
				mui.alert('收货地址必填，请移驾到个人资料中修改');
			}else if( $scope.good_num<=0){
				mui.alert('请输入购买数量');
			}

		  }
	}
	/*
	 *@params _id 商品ID 
	 * */
	$scope.go_detail = function(event,index){
			
		console.log(event.target);
	}
});
/*商品搜索*/
store.controller("goodsSearchCtrl",function($scope){
	$scope.cancle = function(){
		history.back()
	}
});

/*详情数据逻辑*/
store.factory("goods_detailService",function($http,$q){
	return{
		goodDetail : function(id){
			var deferred = $q.defer();
			var promised = deferred.promise;
			var aipUrl = API.MALL.shopDetail.replace(/<goods_id>/,id);
			$http.get(aipUrl)
			.success(function(data,status,headers,config){
				deferred.resolve(data);
			})
			.error(function(reason){
				deferred.reject(reason);
			});
			return promised;
		}
	}
});
/*图片响应*/
store.factory("setimgheight",function($window){
	var width = angular.element($window)[0].innerWidth;
	var setimgheight = {
		"height" : width*9/16 +"px",
		"width" : "100%",
		"object-fit" : "cover",
	};
	return setimgheight;
});
/*数据过滤器*/
store.filter("getPrice",function(){
	return function(arr){
		if(!isNaN(arr)){
			var int = arr.toString().split(".")[0];
		}
		return int;
	}
});
store.filter("getPriceDec",function(){
	return function(arr){
		if(!isNaN(arr)){
			var inti = arr.toString().split(".")[1];
		}
		return inti||"00";
	}
});
/*图片操作*/
store.filter("getUrl",function(){
	return function(arr){
		if(!arr){
			return;
		}
		if(arr.indexOf("http://")==-1||arr.indexOf("https://")==-1){
			return IMG_web + arr;
		}
	}
})
/*
*过滤致贫原因
*/
store.filter("causes",function(){
	return function(code){
		var arr = ['其他', '因病', '因残', '','因灾', '缺土地', '缺水', '缺技术', '缺劳力', '缺资金', '交通条件落后', '因学致贫','自身发展动力不足'];
        var str = '';
        code.forEach(function(item){
        	str += arr[item]+' ';
		})
        return str || '未知';
	}
})