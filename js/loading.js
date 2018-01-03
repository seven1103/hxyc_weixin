var mask = mui.createMask(callback);
var div = document.getElementById('loading');
var callback = function(){
				
		}
var arr2 = new Array();

var Uploadimg = function(arr1,url,length){
	
	
	mask.show();//显示遮罩
	var v_Top = (document.documentElement.clientHeight - 100)/2;
	var v_Left = (document.documentElement.clientWidth -100)/2;
	div.style.display = "block";
	div.style.left=v_Left+'px';
	div.style.top=v_Top+'px';
	//压缩处理

	for(var i=0;i<arr1.length;i++){
			var file = arr1[i];
			//判断类型是不是图片  
			var reader = new FileReader();  
			reader.readAsDataURL(file); 
			reader.onload = function (e) {  
				var img = new Image,  
	            width = 1200,
	            canvas = document.createElement("canvas");
	            drawer = canvas.getContext("2d");
	            img.src = e.target.result;
	            console.log(img.height)
	            canvas.width = width;
	            canvas.height = img.height *(width/img.width);
	            drawer.drawImage(img,0,0,canvas.width,canvas.height);
	            img.src = canvas.toDataURL("image/jpeg", 0.75);
				arr2.push(img.src);
			}				
	}
	Timefor(arr2,arr1.length,length);
}

var callback1 = function(src){
	arr2.push(src);
}

//递归判断file文件
function Timefor(arr,length,Length){
	if(arr.length == length){
		for(var i=0;i<Length.length;i++){
			console.log(arr.splice(0,Length[i]));
		}
		
		mask.close();
		div.style.display="none";
	}else{
		setTimeout(function(){
			return arr*length*Length*Timefor(arr,length,Length);
		},1000); 
	}
}


