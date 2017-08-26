define(["jquery","cookie"],function($){
	$.ajax({
		type:"get",
		url:"/html/header.html",
		async:true,
		success:function(data){
			var _username=$.cookie("loginUser");
			if(_username){
				$(data).filter(".login")
					   .html(`欢迎你:${_username}`).end()
					   .appendTo(".header");
			}
			else{
				$(data).appendTo(".header");
				
			}
		}
	});
	
	$.ajax({
		type:"get",
		url:"/html/footer.html",
		async:true,
		success:function(dataes){
			$(dataes).appendTo(".footer");
			
		}
	});
});