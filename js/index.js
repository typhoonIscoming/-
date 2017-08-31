require(["config"], function() {

	//实现动态加载商品品牌到页面
	require(["jquery", "template", "fly", "load"], function($, template, fly) {
		require(["bootstrap"], function(boot) {

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
		$(function() {
			$.getJSON("/js/list.json", function(data) {
				var html = template("cart_template", data);
				$(html).appendTo(".product_list");
				
				//如果列表加载完之后，点击购买按钮，加入购物车
				$(".cart").click(function(e) {
					//获取该商品的名字
					var proName = $(this).parents().children("p").eq(0).children("a").html();
					var len = data.list.length;
					var product = {};
					for (var i = 0; i < len; i++) { //通过名字从list.json中找到对应的商品信息
						if (data.list[i].name == proName) {

							product = { //创建一个已经购买的商品的信息
								pro_id: data.list[i].id,
								pro_name: data.list[i].name,
								pro_eng_name: data.list[i].eng_name,
								pro_imgSrc: data.list[i].imgSrc,
								pro_price: data.list[i].price,
								pro_oldPrice: data.list[i].oldPrice,
								pro_detail: data.list[i].detail,
								pro_amount: 1,
								expires: 10,
								path: "/"
							};

						}
					}
					$.cookie.json = true; // 自动转换
					var _products = $.cookie("products") || [];
					// 查找当前选购商品的ID在数组中已选购商品元素中是否存在
					var index = isExist(product.pro_id, _products);
					if (index === -1) { // 不存在
						// 向数组中添加元素
						_products.push(product);
					} else { // 存在，则修改数量
						_products[index].pro_amount++;
					}
					// 将数组存回到 cookie 中
					$.cookie("products", _products);

					//将购商品信息加载到购物车页面
					
				});

				function isExist(id, products) {
					for (var i = 0, len = products.length; i < len; i++) {
						if (products[i].pro_id == id)
							return i;
					}

					return -1;
				}

			});

		});

		$(function() {
			$.getJSON("/js/list.json", function(data) {
				var html = template("jianhuotuijian", data);
				$(html).appendTo(".tuijian_pro");

			});

		});

	});

});