require(["config"],function(){
	require(["jQuery","template","load"],function($,template){
		$.getJSON("/js/list.json",function(data){
			var html=template("pro_detail",{list:data});
			$(html).appendTo("");
		})
	})
})
