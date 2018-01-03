var my = angular.module('my',['public']);

//我的主页控制器
/**
 * scope 作用域
 * myDataService 远程网络服务
 * **/
my.controller('myindex',function($scope,myDataService){
	$('title').html(window.localStorage.getItem('currageArea')||"暂无选定位置")
	$scope.gotohonner = function(){
		window.location.href=serverPath.my() + "my_lce.html";
	}
	$scope.gotorank = function(){
		window.location.href=serverPath.my() +"my_rank.html";
	}
	
	//模拟个人数据

	$scope.userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
	$scope.data = $scope.userinfo.user;
});
//我的资料
/**
 * @params $scope  {Object}  作用域
 * @params myDataService {Object} 网络数据服务
 * @params $q {Object} 延迟服务
 * **/
my.controller('my_data',function($scope,myDataService,$http){
	//	数据拉取
	var data = JSON.parse(window.localStorage.getItem('userinfo'));
	/**
	 * @param data {Object} 为页面增加数据
	 * **/
	$scope.data = data.user;
	$scope.data.avatar = data.user.avatar.indexOf("http")>=0 ?data.user.avatar:IMG_web + data.user.avatar;
	console.log($scope.data);
	//页面的数据绑定初始值
	$scope.name = $scope.data.name?$scope.data.name:"";
	$scope.Receive = $scope.data.receiver.name?$scope.data.receiver.name:'';
	$scope.userAddress = $scope.data.receiver.address?$scope.data.receiver.address:'';
	$scope.tel = $scope.data.receiver.phone?$scope.data.receiver.phone:'';
	$scope.gov_name = $scope.data.gov_name?$scope.data.gov_name:''
	//个人数据存储
	var personData = {
		user_id: JSON.parse(window.localStorage.getItem('userinfo')).user._id,
		avatar:data.user.avatar,
		nick : data.user.name,
		sex : data.user.sex,
		rec_name : data.user.receiver.name,
		rec_address :data.user.receiver.address,
		rec_tel:data.user.receiver.phone,
		ent_name:data.user.gov_name
	}
//	失去焦点事件
	$scope.cancel = function(value,type){
		var checked = 1;
	    //判断提交的数据
		if(type=='nick'){
			if(personData.nick==value||value==''){
				jQuery('input[name=nick]').val(personData.nick);
				checked = 0;
			}else{
				personData.nick = value;
			}
		}else if(type=='rec_name'){
			if(personData.rec_name == value || value==''){
				jQuery('input[name=rec_name]').val(personData.rec_name);
				checked = 0;
			}else{
				personData.rec_name = value;
			}
		}else if(type=='rec_address'){
			if(personData.rec_address == value || value==''){
				jQuery('input[name=rec_address]').val(personData.rec_address);
				checked = 0;
			}else{
				personData.rec_address = value;
			}
		}else if(type=='rec_tel'){
			var re = /^1\d{10}$/;
			if(re.test(value)){
				if(personData.rec_tel == value){
					checked = 0;
				}else{
					personData.rec_tel = value;
				}
			}else{
				mui.alert('请输入正确的手机号');
				checked = 0;
			}
		}else if(type=='gov_name'){
			if(personData.gov_name == value || value==''){
				jQuery('input[name=gov_name]').val(personData.gov_name);
				checked = 0;
			}else{
				personData.ent_name = value;
			}
		}
		var _type = type;
		//数据提交
		if(checked ==1){
			$http({
				method:'post',
				url:API.MINE.myprofile,
	      		data:personData,
			}).then(function successCallback(response) {
				mui.toast('修改成功')
				//判断提交的数据进行缓存
				if(_type=='nick'){
					data.user.name = value;
				}else if(_type=='rec_name'){
					data.user.receiver.name = value;
				}else if(_type=='rec_address'){
					data.user.receiver.address = value;
				}else if(_type=='rec_tel'){
					data.user.receiver.phone = value;
				}else if(_type=='gov_name'){
					data.user.gov_name = value;
				}
				console.log(data);
				window.localStorage.setItem('userinfo',JSON.stringify(data));
			}, function errorCallback(response) {
				mui.toast('修改失败')
			});
		}
	};
//	选择事件
	  if($scope.data.sex==0){
	  	$scope.selectValue =  0;
	  }else if($scope.data.sex==1){
	  	$scope.selectValue =  1;
	  }else if($scope.data.sex==-1){
	  	$scope.selectValue =  2;
	  }
	  $scope.changeSelect = function(value){
	  	personData.sex = value;
	  	$http({
			method:'post',
			url:API.MINE.myprofile,
      		data:personData,
		}).then(function successCallback(response) {
			data.user.sex = personData.sex;
			window.localStorage.setItem('userinfo',JSON.stringify(data));
      		mui.toast('修改成功')
		}, function errorCallback(response) {
			mui.toast('修改失败')
		});
	  };
//	  地址
	$scope.getFile = function(value){
		//图片压索
		var img  = new Image();
		var file = new FileReader();
		file.readAsDataURL(value.files[0]);
		//异步加载图片
		file.onload = function(e){
			var result ="";
			var width = 500;
			console.log(e)
			var canvas = document.createElement("canvas");
			var context = canvas.getContext("2d");
			img.src = e.target.result;
			canvas.width = width;
			canvas.height = img.height * (width/img.width);
			context.drawImage(img,0,0,canvas.width,canvas.height);
			result = canvas.toDataURL('image/jpeg',0.75);
			callback(result);
		}
		var callback = function(result){
			personData.avatar = result;
			personData.avatar = result;
		   $http({
			method:'post',
			url:API.MINE.myprofile,
				 data:personData,
		   }).then(function successCallback(response) {
			    mui.toast('修改成功');
			    data.user.avatar=personData.avatar;
			window.localStorage.setItem('userinfo',JSON.stringify(data));
		   }, function errorCallback(response) {
			mui.toast('修改失败')
		   });
		}
	}
});
/**
 * 我的荣誉
 * @parms $scope
 * **/
my.controller('my_honner',function($scope){
	mui('.my-head').on('tap','span:nth-child(1)',function(){
		window.location.href=serverPath.my() +"my_lce.html";
	});
	mui('.my-head').on('tap','span:nth-child(2)',function(){
		window.location.href=serverPath.my() +"my_rank.html";
	});
	
//	数据拉取
	var Data =JSON.parse(window.localStorage.getItem("userinfo"));
	var data = Data.user;
		console.log(data);
		$scope.score = data.honor.score;
		$scope.tonext = data.honor.next_score - data.honor.score;
		$scope.usertitle = data.honor.title;
		$scope.nexttx = data.honor.next_title;
		$scope.rank = data.honor.rank;
		/*var userid = data.user._id;*/
		var start_score = data.honor.start_score;
		var next_score = data.honor.next_score;
	//	当前进度条
		var progress = [($scope.score-start_score)/(next_score-start_score)]*100;
		
		$('#progress').css('width',progress+'%');
});
/**
 * 我的收藏控制器
 * @parms $scope
 * **/
my.controller('my_collect',function($scope){

	
});
/**
 * 我的订单
 * @parms $scope
 * **/
my.controller('my_order',function($scope){

});

/**
 * 数据拉取服务
 * @param $q {Object} 
 * @param $http {Object}
 * **/

my.factory("myDataService",function($q,$http){
	return {
		getData : function(){
			var deferred = $q.defer();
			var promised = deferred.promise;
			$http.get(API.MINE.myprofile)
			.success(function(data,status,header,config){
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject(data);
			});
			return promised;
		},
		postData : function(value){
			var deferred = $q.defer();
			var promised = deferred.promise;
			$http({
				method : "post",
				url : API.MINE.myprofile,
				data : value,
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},    
			    transformRequest: function (data) {
			    　			console.log(data)
			    }
			}).success(function(data,status,header,config){
				deferred.resolve(data);
			}).error(function(res){
				deferred.reject(res);
			});
			return promised;
		}
	}
	
});