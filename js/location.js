var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function (r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var latitude = r.point.lat;
					var longitude = r.point.lng;
					var url = "http://api.map.baidu.com/geocoder/v2/?location="+latitude+","+longitude+"&output=json&pois=1&ak=CSeKlrvDFM5RUwjfuITWrYAZuzGLG7KI";
					$.ajax({
						type:"get",
						url:url,
						dataType:"jsonp",
						async:true,
						success:function (data){
							console.log(data.result.formatted_address);
						}
						
					});
				}else{
					alert("你当前设备不支持地图功能！！")
				}
		},{
			enableHighAccuracy: true
		});