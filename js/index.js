require(["config"], function() {

	//实现动态加载商品品牌到页面
	require(["jquery", "template", "load"], function($, template) {
		require(["bootstrap"],function(boot){
			
		});
//		$(".carousel").curousel({interval:3000});
		var product = [];
		$.getJSON("/js/list.json", function(data) {
			var num = data.length;
			for (var i = 0; i < num; i++) {
				console.log(data[i].eng_name);
				product[i] = data[i].eng_name;
			}
			$(".charactor .brand").children("#a_meun").innerHTML = product[0];
			//			console.log($(".charactor .brand").children("#a_meun"));
		});
		
		//实现倒计时功能
		var settime = new Date(2017, 7, 30);
		setInterval(function() {
			var now = new Date();
			var result = settime - now;
			var day = ("0" + Math.floor(result / (24 * 60 * 60 * 1000))).slice(-2);
			var hours = ("0" + Math.floor((result - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000))).slice(-2);
			var minutes = ("0" + Math.floor((result - day * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000) / (60 * 1000))).slice(-2);
			var seconds = ("0" + Math.floor((result - day * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000)).slice(-2);
			a = day + "天" + hours + "时" + minutes + "分" + seconds + "秒";
			$(".today_sale .settime").children("span").eq(1).text(day + "天" + hours + "时" + minutes + "分" + seconds + "秒");

		}, 1000);
		
		//创建商品模板
		$(function(){
				$.getJSON("/js/list.json",function(data){
					var html=template("cart_template",data);
					$(html).appendTo(".product_list");
				});
			});
			
		
		
		
	});

});	
		
	