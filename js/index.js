require(["config"], function() {

	//实现动态加载商品品牌到页面
	require(["jquery", "template", "fly","load"], function($, template,fly) {
		require(["bootstrap"],function(boot){
			
		});
		
		//实现倒计时功能
		var settime = new Date(2017, 8, 5);
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
					
					//如果列表加载完之后，点击购买按钮，加入购物车
					$(".cart").click(function(e){
						var pro_name=$(this).parents().children("p").eq(0).children("a").html();
						var len=data.list.length;
						var pro_id,pro_imgSrc,pro_price,pro_oldPrice,pro_detail;
						for(var i=0;i<len;i++){
							if(data.list[i].name==pro_name){
								pro_id=data.list[i].id;
								pro_imgSrc=data.list[i].imgSrc;
								pro_price=data.list[i].price;
								pro_oldPrice=data.list[i].oldPrice;
								
							}
						}
						var produc_name=JSON.stringify({"proid":pro_id,"proprice":proprice,"prooldPrice":prooldPrice,"proname":pro_name,"engname":data.eng_name,"imgSrc":data.imgSrc,"amount":1,"expires":7,"path":"/"});
						
						if(!$.cookie("cart_pro")){
							$.cookie("cart_pro",produc_name);
						}
						else{
							//如果存在cookie时，查看是否已经有商品了，如果有，则增加数量
						    var getcookie=$.cookie("cart_pro");
						    if(getcookie.proid==pro_id){
						    	
						    }
						}
					
					});
					
				});
				
				
				
				
			
				
			});	
			
			
			
		
		
		
		$(function(){
			$.getJSON("/js/list.json",function(data){
					var html=template("jianhuotuijian",data);
					$(html).appendTo(".tuijian_pro");
					
				});
				
		});
		
	});		
		
	});

	
	