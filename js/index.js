require(["config"],function(){
	
	//实现动态加载商品品牌到页面
	require(["jquery","template","load"],function($,template){
		var product=[];
		$.getJSON("/js/list.json",function(data){
			var num =data.length;
			for(var i=0;i<num;i++){
				console.log(data[i].eng_name);
				product[i]=data[i].eng_name;
			}
			$(".charactor .brand").children("#a_meun").innerHTML=product[0];
//			console.log($(".charactor .brand").children("#a_meun"));
		});	
		
		
		
	});
});





