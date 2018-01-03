//2016 李元鹏 微信通用js
//2017.2.9
//API接口
var WWW = "/api";
/*var WWW = "http://192.168.6.80:8890/v3.0b";*/
//图片服务器地址
var IMG_web = "http://img.cdn.gzhxyc.com/";
var API = {
//	获取地区
	MISC : {
//		地区列表
		regions:WWW+'/misc/regions/',
//		授权登录获取用户信息
		myauthor : WWW + '/misc/oauth/login/<code>/',
	},
	NEWS : {
//		单位资讯
		govnews:WWW + '/news/111/',
//		资讯列表
		news:WWW+'/news/101/',
//		党政建设
		partynews:WWW+'/news/20/',	
//		便民消息
		ConvenienceNews:WWW+'/news/231/',
//		资讯搜索
		searchnews:WWW+'/news/<column_id>/search/<keyword>/',
//		资讯详情
		article:WWW+'/news/article/<art_id>/',/*加入详情id*/
//		部门列表
		govs:WWW+'/news/110/',
//		单位公告列表--本地服务
		unit:WWW+'/news/121/',
//		本地视频列表--乡村旅游
		videoList:WWW+'/news/131/',
//		景点介绍--乡村旅游
		sceneList:WWW+'/news/132/',
//		民族风情--乡村旅游
		nationstyList:WWW+'/news/133/',
//		民生政策列表
		PeoplePolicyList:WWW+'/news/221/',
//		信息大发布
		publish:WWW + '/news/251/',
//		信访资讯列表
		LetterList:WWW+'/news/141/',
//		部门详情
		gov:WWW+'/news/gov/',
//		部门监督列表
		govSupervises:WWW+'/news/gov/<gov_id>/supervises/',
//		获取政府部门信息
		govinfo:WWW + "/news/gov/<gov_id>/info/",
//		新banners接口
		banners:WWW + "/news/get_banner/<position>/",
//		农业学习
		VideoList:WWW + "/news/video/"
	},
//	商品
	MALL : {
//		商品列表
		goods:WWW + '/mall/goods/',
//		搜索商品
		search:WWW + '/mall/search/<keyword>/',
//		商品详情
		shopDetail:WWW + '/mall/<goods_id>/detail/',
//		商品收藏
		favorite:WWW + '/mall/<goods_id>/favorite/',
//		取消商品收藏
		unfavorite:WWW + '/mall/<goods_id>/favorite/',
//		我的收藏
		favorites:WWW+'/mall/favorites/',
//		购买商品
		buy:WWW + '/mall/<goods_id>/buy/',
//		我的订单
		orders:WWW+'/mall/orders/',
//      订单查询
  		paysearch:WWW + '/mall/orders/<order_id>/query/',
//		支付订单
		pay:WWW + '/mall/orders/<goods_id>/pay/',
//		取消订单
     	unorders:WWW + '/mall/orders/<order_id>/delete/',
//		确定收货
		confirm:WWW + 'post /mall/orders/<order_id>/confirm/',
//      商品搜索
		search:WWW + '/mall/search/<keyword>/',
//		确认收货
		confirm : WWW + '/mall/orders/<order_id>/confirm/',
	},
//	监督
	SUPERVISE:{
//		回音壁列表
		exposures:WWW+'/supervise/exposures/',
		exposDetail:WWW + '/supervise/exposures/',//需要加id
		policysList:WWW + '/supervise/policys/',
		
	},
//	项目
	PROJECTS:{
//		民生资金列表
		FundsList : WWW + '/projects/column/1/',
//		民生项目列表
		ProjectList : WWW + '/projects/column/2/',
//		民生物资列表
		GoodsList : WWW + '/projects/column/3/',
//		民生扶贫资金列表
		PoorFundsList : WWW + '/projects/column/4/',
//      项目介绍
		projectIndroduce : WWW + '/projects/<project_id>/info/',
//		项目流程
		projectStep : WWW + '/projects/<project_id>/steps/',
//      项目进度
		projectProgress : WWW + '/projects/<project_id>/progresses/',
//      项目流程详情
		item_detail : WWW + '/projects/<project_id>/steps/<step_id>/',
//      项目进度详情
		project_detail : WWW + '/projects/<project_id>/progress/<progress_id>/',
//		项目搜索
		project_search : WWW +'/projects/<column_id>/search/',
		
	},
	MINE :{
//		授权登录获取用户信息
		myauthor : WWW + '/mine/oauth/login/<code>/',
//		获取我的基本资料
		myprofile : WWW+'/mine/profile/',
//      获取我的排名列表
		ranking : WWW + '/mine/ranking/',
//      获取我的荣誉
		honor : WWW +  '/mine/honors/',
	},
//   信访	
	LETTERS:{
//    信访列表
		letter : WWW + '/letters/',
	},
//  人才市场
	JOBS:{
//  求职列表
		labors : WWW + '/jobs/labors/',
		employs : WWW + '/jobs/employs/',
		search : WWW + '/jobs/search/<type>/<keyword>/',
	},
//	村村公告
	VILLAGE:{
		//村列表
		VillageLists : WWW + '/villages/',
		//搜索村列表
		SearchVillageLists : WWW + '/villages/search/<keyword>/',
		//村详情
		VillageDetail : WWW + '/villages/<village_id>/',
		//村资讯列表
		VillageDetaiList:WWW + '/villages/<village_id>/news/',
		//村资讯列表搜索
		VillageDetaiListSearch:WWW + '/villages/<village_id>/news/',
		//村二维码
		VillageCode : WWW + '/villages/<village_id>/qrcode/',
	}
};

//常用函数封装
var HuaXia = (function(doc){
	//测试函数
	var test = function(){
		console.log('这是函数封装测试');
		var a = '123123';
		return a
	}
	//初始化页面加载
	var init = function(){
		var div = document.createElement('div');
		div.className = "wx_tip";
		div.id = "wx_tip";
		div.style.display = "none";
		document.body.appendChild(div);
	}
	init();
	//页面页面跳转,url:地址，id页面参数
	var detail_jump = function(url,id){
		if(id){
			window.location.href = url+'?id='+id;
		}else{
			window.location.href = url;
		}
	}
	//追加dom元素函数，ev-追加dom的元素对象，dom-需要创建dom的类型，html-创建dom元素的内容，obj-创建dom元素需要的属性元素
//	obj = ['class','mui-table-view-cell','id','1'];
	var Addhtml = function(ev,dom,html,obj){
		var  Dom = document.createElement(""+dom+"");
		if(obj){
			for(var i=0;i<obj.length;i++){
				if(i%2==0){
					Dom.setAttribute(''+obj[i]+'',''+obj[i+1]+'');
				}else{
					continue;
				}
			}	
		}else{	
		}
		Dom.innerHTML = html;
		ev.appendChild(Dom);
	}
	
//	获取地址栏参数id
	var getURL_id = function(id){
		var url = window.location.href;
		var arr = url.split('?')[1];
		if(arr){
			var id = decodeURI(arr.split('=')[1]);
		}else{
			var id  = 0;
		}
		return id;
	}
//	获取地址栏参数方法二
	var GetQueryString = function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     	var r = window.location.search.substr(1).match(reg);
     	if(r!=null)return  decodeURI(r[2]); return null;
	}
//	ajax获取数据
//	parameter - {username:username,passwords:passwords}
//	async 判断是否同步 true false
	var Ajax = function(obj,callback){
		var Data = new Object();
		$.ajax({
			type:obj.type,
			url:obj.url,
			async:true,
			data:obj.data,
			dataType:'json',
			cache:obj.cache?false:true,
			timeout:30000,
			beforeSend: function(xhr) {
			      xhr.setRequestHeader("X-Region-Id", localStorage.getItem("x_region_id"));
			      /*xhr.setRequestHeader("x_access_tk", '123123');*/
			      //xhr.setRequestHeader("X-Timestamp",Date.now());
			      /*xhr.setRequestHeader("x_check_code", "123456");*/
			  },
			success:function(data){
				sessionStorage.removeItem("time");
				callback(data.result);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log('网络出错');
				console.log(XMLHttpRequest);
				if(textStatus=='error'){
					document.documentElement.style.height = '100%';
						document.getElementsByTagName("body")[0].style.height = '100%';
						document.getElementsByTagName("body")[0].innerHTML = netError("网络出错,点击刷新!!");
						mui("body").on("tap",".serverError",function(){
						    window.location.reload();
					});
						return;
				}
				var LastTime = parseInt(sessionStorage.getItem("time"));
				if(LastTime==3){
					sessionStorage.removeItem("time");
				}else{
					var a = sessionStorage.getItem("time")?LastTime:0;
					if(!a==0){
						b = a+1;
						sessionStorage.setItem("time",b);
					}else{
						b = 1;
						sessionStorage.setItem("time",b);
					}
					HuaXia.Ajax(obj,function(data){
						callback(data)
					})
				}
				// if(!sessionStorage.getItem("time")==1){
				// 	sessionStorage.setItem("time",1);
				// 	var btnArray = ['加载失败'];
				// 	mui.confirm('是否重新加载', btnArray, function(e) {
				// 		if (e.index == 1) {
				// 			window.location.reload();
				// 		}
				// 	})
				// 	setTimeout(function(){
				// 		sessionStorage.removeItem("time");
				// 	},1000);
				// }
				// document.documentElement.style.height = '100%';
                // document.getElementsByTagName("body")[0].style.height = '100%';
                // document.getElementsByTagName("body")[0].innerHTML = netError("网络出错,点击刷新!!");
                // mui("body").on("tap",".serverError",function(){
                //     window.location.reload();
                // });
			}
		});
	}
	
//	图片添加
	var addimgs = function(obj,files,imgArr){
		var ul=obj.parentNode.parentNode;
		for(var i=0;i<files.length;i++){
		    var img = ul.querySelectorAll('img');
		    if(img.length>3){
		        mui.alert('最多上传四张图片');
		        break;
		    }else{
		    	imgArr.push(files[i]);
		        var img=document.createElement('img');
		        var reader=new FileReader();
		            reader.readAsDataURL(files[i]);
		            reader.onload=function(evt){
		            img.setAttribute('src',evt.target.result);
		        }
		        var src=window.URL.createObjectURL(files[i]);                    
		        var value = ["class","img-see"];
		        var html = "<img src='"+src+"' /><span class='delete' onclick = 'deletes(this,"+files[i].lastModified+")'>&times;</span>";
		        HuaXia.Addhtml(ul,'div',html,value);
		    }
		}
				var value1 = ['class','img-view'];
		        var html1 = '<div class="issue_add_btn img">'+'<span class="icon wx-zengjia"></span></div>'+
		                    '<input class="demo_form_input img" type="file" name="file[]" multiple="multiple" accept="image/*" onchange="add(this,this.files);" /></div>';
		        HuaXia.Addhtml(ul,'div',html1,value1);
		        obj.parentNode.remove();
		        return imgArr;
}

//	图片删除
	var deleteimgs = function(obj,index,imgArr){
		for(var i=0;i<imgArr.length;i++){
			if(imgArr[i].lastModified == index)
				imgArr.splice(i,1);
			}
			var div = obj.parentNode;
			div.remove();
			return imgArr;
	}
//	图片压缩
//	oldfile-图片元数组--可能是多维数组
//	newfile-图片push数组--必须是一维数组进行压缩处理
//	如果压缩的只有一维数组,那么oldfile==newfile
	var img_compression  = function(newfile,oldfile,callback){
		var arr = new Array();
		for(var i=0;i<newfile.length;i++){
			var file = newfile[i];
			//判断类型是不是图片  
			var reader = new FileReader();  
			reader.readAsDataURL(file); 
			reader.onload = function (e) {  
				var img = new Image,  
	            width = 1200,
	            canvas = document.createElement("canvas");
	            drawer = canvas.getContext("2d");
	            img.src = e.target.result;
	            canvas.width = width;
	            canvas.height = img.height *(width/img.width);
	            drawer.drawImage(img,0,0,canvas.width,canvas.height);
	            img.src = canvas.toDataURL("image/jpeg", 0.75);
				arr.push(img.src);
			}				
		}
		/*HuaXia.Timefor(arr,newfile.length,oldfile);*/
		
		var Timefor = function(arr,length,Length){
			var imgbase64 = new Array();
			if(arr.length == length){
				imgbase64 = arr;
				callback(imgbase64);
			}else{
				setTimeout(function(){
					return arr*length*Length*Timefor(arr,length,Length);
				},1000); 
			}
		}
		Timefor(arr,newfile.length,oldfile);
	}
	
//	递归判断图片文件压缩情况
	var Timefor = function(arr,length,Length){
		var imgbase64 = new Array();
		if(arr.length == length){
			/*for(var i=0;i<Length.length;i++){
				imgbase64.push(arr.splice(0,Length[i]));
			}*/
			imgbase64 = arr;
			callback(imgbase64);
		}else{
			setTimeout(function(){
				return arr*length*Length*Timefor(arr,length,Length);
			},1000); 
		}
	}
	
//	轮播图图片遍历(type:1为无文本，type:2为有文本)
	var Eachbanners = function(data,type){
		if(!data){
			return;
		}
		if(data.length!=0){
			var parent = document.getElementById('banners')||document.getElementById('slider');
			var a = document.querySelector('.mui-slider-group.mui-slider-loop');
			var b = document.querySelector('.mui-slider-indicator');
			parent.removeChild(a);
			parent.removeChild(b);
		}
		var ul = document.getElementById('banners')||document.getElementById('slider');
//		轮播图
		var dom1 = 'div';
		var obj1 = ['class','mui-slider-group mui-slider-loop'];
		var html1 = '';
//		轮播点
		var dom2 = 'div';
		if(type==1){
			var obj2 = ['class','mui-slider-indicator mui-text-center'];
		}else{
			var obj2 = ['class','mui-slider-indicator mui-text-center','style','bottom:30px'];
		}
		
		var html2 = '';
		for(var i=0;i<data.length;i++){
			var default_img = 'img/icon/banner.png';
			var img1 = data[data.length-1].cover?IMG_web+data[data.length-1].cover:default_img;
			var img0 = data[0].cover?IMG_web+data[0].cover:default_img;
			var img2 = data[i].cover?IMG_web+data[i].cover:default_img;
//			轮播图加载
			if(type==1){
				if(i==0){
					html1 = html1 + '<div class="mui-slider-item mui-slider-item-duplicate">'+
								'<a href="news.html?id='+data[data.length-1]._id+'">'+
								'<img src="'+img1+'" /></a></div>'+
								'<div class="mui-slider-item"><a href="news.html?id='+data[i]._id+'">'+
								'<img src="'+img2+'" /></a></div>';
				}else if(i==(data.length-1)){
					html1 = html1 + '<div class="mui-slider-item"><a href="news.html?id='+data[0]._id+'">'+
								    '<img src="'+img2+'" /></a></div>'+
									'<div class="mui-slider-item mui-slider-item-duplicate">'+
									'<a href="news.html?id='+data[i]._id+'">'+
									'<img src="'+img0+'" /></a></div>';
								
				}else{
					html1 = html1 + '<div class="mui-slider-item"><a href="news.html?id='+data[i]._id+'">'+
								    '<img src="'+img2+'" /></a></div>';
				}
			}else{
				if(i==0){
					html1 = html1 + '<div class="mui-slider-item mui-slider-item-duplicate">'+
								'<a href="news.html?id='+data[data.length-1]._id+'">'+
								'<img src="'+img1+'" /></a>'+
								'<div class="inline_bg"></div><p>'+data[data.length-1].title+'</p></div>'+
								'<div class="mui-slider-item"><a href="news.html?id='+data[i]._id+'">'+
								'<img src="'+img2+'" /></a>'+
								'<div class="inline_bg"></div><p>'+data[i].title+'</p></div>';
				}else if(i==(data.length-1)){
					html1 = html1 + '<div class="mui-slider-item"><a href="news.html?id='+data[0]._id+'">'+
								    '<img src="'+img2+'" /></a>'+
								    '<div class="inline_bg"></div><p>'+data[i].title+'</p></div>'+
									'<div class="mui-slider-item mui-slider-item-duplicate">'+
									'<a href="news.html?id='+data[i]._id+'">'+
									'<img src="'+img0+'" /></a>'+
									'<div class="inline_bg"></div><p>'+data[0].title+'</p></div>';
								
				}else{
					html1 = html1 + '<div class="mui-slider-item"><a href="news.html?id='+data[i]._id+'">'+
								    '<img src="'+img2+'" /></a>'+
								    '<div class="inline_bg"></div><p>'+data[i].title+'</p></div>';
				}
			}
			
			
//			轮播点加载
			if(i==0){
				html2 = html2 + '<div class="mui-indicator mui-active"></div>';
			}else{
				html2 = html2 + '<div class="mui-indicator"></div>';
			}
		}
		HuaXia.Addhtml(ul,dom1,html1,obj1);
		HuaXia.Addhtml(ul,dom2,html2,obj2);
	}
	
//	时间戳格式转换
//调用方式format('yyyy-MM-dd h:m:s')
	var format = function(format,type) {
		var d = new Date(format*1000);
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var day = d.getDate();
		if(type==1){
			// var tt=new Date(parseInt(format) * 1000).toLocaleString().replace("/", "-").replace("/", "-").slice(0,9);
			var tt = year + '-' + month + '-' + day;
		}else{
			// var tt=new Date(parseInt(format) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
			var tt = year + '-' + month + '-' + day;
		}
		return tt;  
		}
	var format2 = function(t){
		if(!t)return;
		var d = new Date(t*1000);
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var day = d.getDate();
		var hours = d.getHours();
		var minutes = d.getMinutes();
		var seconds = d.getSeconds();
		var str = year + '-' + month + '-' + day + '  ' + hours + ':' + minutes + ':' + seconds;
		console.log(str);
		return str;
	};
//	数据图片遍历有无操作
	var ImgIF = function(img,type){
		var IMG;
		if(!img){
			switch(type)
				{
				case 1:
				  IMG = serverPath.img()+'icon/avator_default.png';
				  break;
				case 2:
				  IMG = serverPath.img()+'img/icon/banner.png';
				  break;
				default:
				 console.log('没有这种类型');
				}
		}else{
			IMG = img;
		}
		return IMG;
	}
//	去除长文本编辑器产生的标签
	var delChtml = function(s){
		var dd=s.replace(/<\/?.+?>/g,"");
		var dds=dd.replace(/ /g,"");//dds为得到后的内容
		return dds;
	}
//  从接口取数据判断
	var GIFD = function(data){
		switch (data){
			case undefined:
				return '';
				break;
			case '':
				return '';
				break;
			case null:
				return '';
				break;
			default:
				//判断数据类型(只考虑字符串和数组)
				if(typeof(data)=='object'){
					if(data.length==0){
						return '';
					}else{
						return data;
					}
				}else{
					return data;
				}
				break;
		}
	}
//	创建等待界面
	var CreatReading = function(){
		$('body').append('<div id="mask" class="mask"></div>');
		$('body').append('<div id="Wait" class="Wait"><div class="loader"></div></div>');
		$("#mask").css("height",$(document).height());     
		$("#mask").css("width",$(document).width());  
		$("#Wait").css("top",$(document).height()/2-40);
		$("#Wait").css("left",$(document).width()/2-40);
		$("#Wait").show();
		$("#mask").show();
	}
//	关闭等待界面
	var CloseReading = function(){
		$("#mask").remove();
		$("#Wait").remove();
	}
	/**
	 * @params obj {obj} 地区对象
	 * **/
	var fillRegion =  function(obj){
		if(typeof obj =="string"){
			obj = $.parseJSON(obj);
		}
		mui.each(obj.result.provinces,function(index,item){
				var ul = document.createElement('ul');
				ul.className = 'mui-table-view mui-table-view-chevron';
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell mui-collapse mui-active';
				var a = document.createElement('a');
				a.className = 'mui-navigate-right';
				a.innerText =item.name ;
				li.appendChild(a);
				ul.appendChild(li);
				mui.each(item.regions,function(index,item){
					var subUl = document.createElement('ul');
					subUl.className = 'mui-table-view mui-table-view-chevron';
					var subLi = document.createElement('li');
					subLi.className = 'mui-table-view-cell';
					var subA = document.createElement('a');
					subA.id = item._id;
					subA.innerText = item.prefecture+item.name;
					subLi.appendChild(subA);
					subUl.appendChild(subLi);
					li.appendChild(subUl);
				});
				document.getElementsByClassName('locationSelect')[0].appendChild(ul);
			});
	}
	/**
	 * mask层调用
	 * 
	 * **/
	var DJmask = function(){
		var maskHtml='<div id="dj-mask"></div>';								
		$(maskHtml).appendTo("body");
		djMaskDomLoaded=$("#dj-mask");
		djMaskDomLoaded.css(this.maskBackgroundCss());
	}
	/**
	 * mask层调用样式
	 * 
	 * **/
	var maskBackgroundCss = function(){
				var css={//遮罩的黑色透明背景样式
						"background":"transparent",						
						"width":"100%",
						"height":document.body.scrollHeight,//文档的高度
						"position": "absolute",
						"top": "0px",
						"left": "0px",
						"z-index": "1001",
						/*"display":"none"*/
					};
				return css;
	}
	/**
	 * input为空显示
	 * @params
	 * **/
	var InputEmpty = function(){
		jQuery("#wx_tip").html("输入内容不可为空!!").slideDown('slow',function(){
 				var _this = jQuery(this);
 				setTimeout(function(){
 					_this.slideToggle("fast");
 				},2000);
 		});
	}
	/**
	 * 判断是否授权登录
	 * 
	 * **/
	var Author = function(callback){
		
		// var info = {
		// 	"user": {
		// 		"status": 0,
		// 		"region_id": null,
		// 		"name": "Treasure",
		// 		"times": {
		// 			"timed": 1497433040,
		// 			"logined": 1497433040,
		// 			"stop_elapse": 0,
		// 			"stoped": 0
		// 		},
		// 		"online": 0,
		// 		"status_desc": null,
		// 		"sex": 1,
		// 		"nick": "Treasure",
		// 		"avatar": "http://wx.qlogo.cn/mmopen/rlTMAIXLHhbficm2Iz86NibHtbFuxdEOAwCyC76d4S3HEbBjv6blzLIYJ71QOJIib7zXqOZqibyhcMe1pj0SLh0smF0iaFDd5hwiax/0",
		// 		"receiver": {
		// 			"phone": "18785187439",
		// 			"ent_name": "华夏云城2",
		// 			"name": "Treasure",
		// 			"address": "贵阳"
		// 		},
		// 		"oauth": [
		// 			{
		// 				"province": "贵州",
		// 				"openid": "oUahZwl_tNi0xHG444dBD2Ydj2WE",
		// 				"headimgurl": "http://wx.qlogo.cn/mmopen/rlTMAIXLHhbficm2Iz86NibHtbFuxdEOAwCyC76d4S3HEbBjv6blzLIYJ71QOJIib7zXqOZqibyhcMe1pj0SLh0smF0iaFDd5hwiax/0",
		// 				"language": "zh_CN",
		// 				"city": "贵阳",
		// 				"country": "中国",
		// 				"sex": 1,
		// 				"type": "wechat",
		// 				"unionid": "orvCFwUDGdxwcbTf2IuKXkI9m5oU",
		// 				"privilege": [],
		// 				"_id": "orvCFwUDGdxwcbTf2IuKXkI9m5oU",
		// 				"nickname": "Treasure"
		// 			}
		// 		],
		// 		"gov_name": "华夏云城2",
		// 		"_id": "594103d046e0fb00016b25ff",
		// 		"type": 1,
		// 		"honor": {
		// 			"score": 0,
		// 			"title": "荣誉村民"
		// 		},
		// 		"desc": ""
		// 	}
		// }
		// window.localStorage.setItem('userinfo',JSON.stringify(info));
		var UserInfo = window.localStorage.getItem('userinfo');
		if(!UserInfo){
			var curr_url = window.location.href;
			/*var idx = curr_url.indexOf('?');
			if (idx > 0)
				curr_url = curr_url.substr(0, idx);
			*/
			var appid='wx8f946df8474a0749',redirect_uri;
			if(!curr_url.indexOf('code')==-1){
				redirect_uri = encodeURIComponent(curr_url.split('?')[0]);
   			}else{
    			redirect_uri = encodeURIComponent(curr_url);
   			}
			var URL ="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
			window.location.href = URL;
		}else{
			callback();
		}
	}
	/*
	*检索致贫原因
	*
	 */
	var GetCau = function(code){
		var arr = ['其他', '因病', '因残', '','因灾', '缺土地', '缺水', '缺技术', '缺劳力', '缺资金', '交通条件落后', '因学'];
        var str = '';
        code.forEach(function(item){
        	str += arr[item];
		})
        return str || '未知';
	}
	var IsonLine = function(){
		if(navigator.onLine){
			return true;
		}else{
			document.documentElement.style.height = '100%';
			document.getElementsByTagName("body")[0].style.height = '100%';
			document.getElementsByTagName("body")[0].innerHTML = netError("网络出错,点击刷新!!");
			mui("body").on("tap",".serverError",function(){
				window.location.reload();
			});
			return false;
		}
	}
	return {
		test : test,
		init : init,
		Detail_jump :detail_jump,
		Addhtml : Addhtml,
		getURL_id : getURL_id,
		Ajax : Ajax,
		addimgs  : addimgs,
		deleteimgs : deleteimgs,
		Timefor : Timefor,
		img_compression : img_compression,
		Eachbanners : Eachbanners,
		format : format,
		format2 : format2,
		ImgIF : ImgIF,
		delChtml : delChtml,
		GIFD : GIFD,
		CreatReading : CreatReading,
		CloseReading : CloseReading,
		GetQueryString : GetQueryString,
		fillRegion : fillRegion,
		maskBackgroundCss : maskBackgroundCss,
		DJmask : DJmask,
		InputEmpty : InputEmpty,
		Author : Author,
		GetCau : GetCau,
		IsonLine : IsonLine,
	}
})(document)




//ajax接口数据请求
//详情页跳转函数
function Detail_jump(url,id){
	window.location.href = url+'?id='+id;
}
/**时间转换
 * @time {Int} 格式化时间
 * **/
function formatTime(time){
	var theTime = parseInt(time);// 秒 
	var theTime1 = 0;// 分 
	var theTime2 = 0;// 小时 
	// alert(theTime); 
	if(theTime > 60) { 
		theTime1 = parseInt(theTime/60); 
		theTime = parseInt(theTime%60); 
	// alert(theTime1+"-"+theTime); 
	if(theTime1 > 60) { 
		theTime2 = parseInt(theTime1/60); 
		theTime1 = parseInt(theTime1%60); 
	} 
	} 
	var result = ""; 
	if(parseInt(theTime)<10){
		result = "0" + parseInt(theTime);
	}else{
		result = "" + parseInt(theTime);
	}
	if(theTime1 > 0) { 
		if(theTime1<10){
			result = "0"+parseInt(theTime1)+":"+result;
		}else{
			result = ""+parseInt(theTime1)+":"+result; 
		}
	} 
	if(theTime2 > 0) {
		if(theTime2<10){
			result = "0"+parseInt(theTime2)+":"+result;
		}else{
			result = ""+parseInt(theTime2)+":"+result; 
		}
	} 
	return result; 
}

/**
 * 根据当前的浏览器,判断是否显示头部
 * 
 * **/
/*window.onload = function(){
	if(browser.version.mobile||browser.version.iphone||browser.version.android||browser.version.ipad){
	var ua = navigator.userAgent.toLowerCase();
	//返回主页
	var wxHome = document.getElementById("wxHome");
	//非微信情况
	var microMessenger = document.getElementById("noMicromessenger");
	//返回上一页
	var wxBack = document.getElementById("wxBack");
	console.log($("#wxBack").parent().html())
	if(ua.match(/MicroMessenger/i) == "micromessenger"){
		if(document.getElementById("noMicromessenger")!=undefined){
			document.getElementById("noMicromessenger").style.display = "none";
			document.getElementById("noMicromessenger").nextElementSibling.style.paddingTop=0;
		}
	}else{
		if(document.getElementById("noMicromessenger")!=undefined){
			document.getElementById("noMicromessenger").style.display = "block";
		}
		if(location.href.indexOf('main')==-1){
			console.log(document.getElementById("wxBack"));
			document.getElementById("wxBack").style.display = "block";
			document.getElementById("wxBack").onclick = function(){
				if(history.back()==undefined){
					window.location.replace(serverPath().base+"index.html");
				}
			}
		}else{
			document.getElementById("wxHome").style.display = "block";
			document.getElementById("wxHome").onclick = function(){
				window.location.replace(serverPath().base+"index.html");
			}
		}
	}
}else{
	window.location.href = "container/valid/validPage.html"
}
}*/

window.onload = function(){
	//检查当前浏览器是否支持浏览
	var ua = window.navigator.userAgent.toLowerCase(); 
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){

	}else{
		//window.location.href = serverPath.base + 'container/valid/validPage.html';
	}

	//回到顶部
	var scrollToTopBox = document.getElementById('scrollToTop'); //返回按钮tap
	if(scrollToTopBox){
		scrollToTopBox.addEventListener('tap', function(e) {
			e.stopPropagation(); 
			mui('#refreshContainer').pullRefresh().scrollTo(0, 0, 1000);//滚动到顶部
			scrollToTopBox.classList.add('hide');
			var dom = document.getElementsByClassName('display_block')[0];
			if(dom){
				if(dom.classList.contains('scale-block')){
					dom.classList.remove('scale-block');
				}
			}
		});
		
		document.getElementById('refreshContainer').addEventListener('scrollend', function() {
			if (mui('#refreshContainer').pullRefresh().y <= 100 * (-1) && scrollToTopBox.classList.contains('hide'))
			scrollToTopBox.classList.remove('hide');
			else if (mui('#refreshContainer').pullRefresh().y > 100 * (-1) && !scrollToTopBox.classList.contains('hide'))
			scrollToTopBox.classList.add('hide');
		});
	}
	//地区选择
	$("body").on('click','p>#headerLocation',function(){

			$(".locationMark").toggle();
			$(".locationSelect").slideToggle('fast');
		});
		$(".locationSelect").on('click','a[id]',function(){
			 //数据存储
			 var  x_region_id = $(this).attr("id");
			 var  currageArea = $(this).text();
			 localStorage.setItem('currageArea',currageArea);
			 localStorage.setItem("x_region_id",x_region_id);
			 //页面交互
			 var html = '<i class="icon wx-dingwei"></i>'
			 //$("#headerLocation").html(html+$(this).text());
			 $(".locationMark").toggle();
			 $(".locationSelect").slideToggle('fast');
			  location.reload();
		});
		$(".locationMark").click(function(){
			$(this).toggle();
			$(".locationSelect").slideToggle('fast');
		});
			//判断是否需要加载地区内容
			var dom = document.getElementsByClassName('locationSelect')[0];
			if(dom){
				var api = API.MISC.regions;
				var getRegion = window.sessionStorage.getItem("allRegion");
				if(getRegion){
					var data = JSON.parse(getRegion);
					HuaXia.fillRegion(data);
				}else{
					mui.ajax(api,{
						type : 'get',
						success:function(data){
							window.sessionStorage.setItem('allRegion',JSON.stringify(data));
							HuaXia.fillRegion(data);
						}
					});
				}
			}
			
//		搜索操作
		var inputs = document.getElementsByClassName('mui-search')[0];
		if(inputs){
				//mui拖动时候
				document.getElementById("refreshContainer").addEventListener("swipeup",function(){
			 		$("#searchSubmit").hide();
					$(".footer.mui-bar").show();
					document.activeElement.blur();//隐藏软键盘
					$("input[type=search]").blur();
			 	});
		}
		$("input[type=search]").focus(function(){
				$("#searchSubmit").show();
				$(".footer.mui-bar").hide();
		}).blur(function(){
				$(".footer.mui-bar").show();
		});

		//获取从定向地址code
		var Url = window.location.href;
		if(!window.localStorage.getItem('userinfo')){
			if(HuaXia.GetQueryString('state')==1){
				//获取code
				HuaXia.CreatReading();
				var code = HuaXia.GetQueryString('code');
				//ajax获取数据
				HuaXia.Ajax({
					type:'get',
				    url:API.MISC.myauthor.replace('<code>',code),
				},function(data){
					/*console.log(data);*/
					if(data.msg){
						alert('获取用户信息失败');
					}else {
						window.localStorage.setItem('userinfo',JSON.stringify(data));//还原var str = JSON.stringify(jsObj);  var str1 = JSON.parse(str);
						HuaXia.CloseReading();
                    }
				})
				
		}
		}
}

$(function () { 
  var isPageHide = false; 
  window.addEventListener('pageshow', function () { 
    if (isPageHide) { 
      window.location.reload(); 
    } 
  }); 
  window.addEventListener('pagehide', function () { 
    isPageHide = true; 
  }); 
})
