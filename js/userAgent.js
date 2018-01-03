/**
 * 配置页面参数
 * 当他们不属于微信浏览器的时候，为这个页面添加头部
 * @name {String} 页面的名称
 * @title {String} 页面的标题
 * **/
var html = [
	{name:"location_detail",title:""},
	{name:"people_funds_detail",title:""},
	{name:"people_policy_detail",title:""},
	{name:"people_letter",title:""},
	{name:"reply_detail",title:""}
];
/**
 * @trident {String} IE内核
 * @presto {String} opera 内核
 * @webkit {String} 谷歌和苹果内核
 * @gecko {String} 火狐内核
 * @safari {String} safari 内核
 * @mobile {String} 是否是移动端
 * @android {String} 是否是安卓设备
 * @iphone {string} 是否是iphone移动设备
 * @ipad {String} 是否是ipad设备
 * **/
var browser = {
	version : function(){
		var u = navigator.userAgent;
		return{
			trident : u.indexOf("Trident") > -1,//IE内核
			presto : u.indexOf("Presto") > -1,//opera内核
			webkit : u.indexOf("AppleWebkit") > -1,//谷歌和苹果内核
			gecko : u.indexOf("Gecko") > -1,//火狐浏览器
			safari : u.indexOf("Safari") > -1,//是否是safari浏览器
			mobile : !!u.match(/AppleWebkit.*Mobile.*/),//判断是否为终端设备
			android : u.indexOf("Android")>-1,//判断是否是android设备
			iphone : u.indexOf("iPhone")>-1,//判断是否是iphone设备
			ipad : u.indexOf("iPad") > -1//是否是iPad设备
		}
	}()
};
/**
 * 获取路径
 * @base {String} 服务器地址
 * @helpStore {String} 帮扶商场路径
 * @index {String} 多彩金海湖路劲
 * @supervision {String} 民生监督
 * @templete {String} 模板路径
 * @my {String} 我的
 * @talents_market {String} 人力市场
 * @css{String} css样式
 * @js{string} js
 * @img{String} img
 * **/
var serverPath = {
	base : location.protocol+"//" +location.host+"/",
	helpStore : function(){
		var path = this.base + "container/help_store/";
		return path;
	},
	index : function(){
		var path = this.base + "container/index/";
		return path;
	}, 
	supervision : function(){
		var path = this.base + "container/people_supervision/";
		return path;
	}, 
	templete : function(){
		var path = this.base + "container/templete/";
		return path;
	},
	my : function(){
		var path = this.base + "container/my/";
		return path;
	},
	talents_market : function(){
		var path = this.base +"container/talents_market/";
		return path;
	},
	local_info : function(){
		var path = this.base +"container/localInfo/";
		return path;
	},
	css : function(){
		var path = this.base + "css/";
		return path;
	}, 
	js : function(){
		var path = this.base + "js/";
		return path;
	}, 
	img : function(){
		var path = this.base + "img/";
		return path;
	}
}
/**
 * 图片默认路劲
 * @avator {String} 头像默认路径
 * @banner {String} banner图片默认路径
 * **/
var defaultPath = {
	avator :serverPath.img()+"icon/avator_default.png",
	banner :serverPath.img()+"icon/banner.png",
	dot : "\'"
}
//加载无数据的时候 增加的html内容
function notdata(data){
	return function(){
		var notData = "<div class='notData'>"+
							"<span class='notDataIcon'><i>!</i></span>"+
							"<span>"+data+"</span>"
					   "<div>";
		return notData;
	}
}
//网络出错时候数据展示形式
/**
 * @data {String} 传入的数据
 * **/
function netError(data){
	var netError = "<div class='serverError'>"+
						"<p>"+data+"</p>"+
						"<i class='icon wx-dianji'></i>"+
					"</div>"
		return netError;			
}
/**
 * 授权 跳转地址
 * **/
function auth(){
	var url = serverPath.base + "index.html";	
	return url;
}

//禁止pc端登录
if(browser.version.mobile||browser.version.iphone||browser.version.android||browser.version.ipad){
	
}else{
	/*window.location.href =serverPath.base+"container/valid/validPage.html"*/
	//window.location.replace('http://www.hxyc.webportal.cc/');
}