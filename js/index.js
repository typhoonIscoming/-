require(["config"],function(){
	require(["jquery","template","load"],function($,template){
		$.getJSON("/js/list.json",function(data){
			console.log(data);
		})
	})
})
