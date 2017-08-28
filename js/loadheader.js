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
			//实现点击切换页面
			$(".click_login").on("click",function(){
				$.ajax({
					type:"get",
					url:"html/login.html",
					async:true,
					success:function(data){
					$(data).appendTo("body");
					
					if($(".login_content").children("div").eq(0).css("display")=="block"){
						$(".login_ul #in a").addClass("current");
					}
					else if($(".login_content").children("div").eq(0).css("display")=="block"){
						$(".login_ul #reg a").addClass("current");
					}
					$("#in").on("click",function(){
						
						$(".dengru").css("display","block");
						$(".login_ul #in a").addClass("current");
						$(".register").css("display","none");
						$(".login_ul #reg a").removeClass("current");
					});
					$("#reg").on("click",function(){
						$(".dengru").css("display","none");
						$(".login_ul #in a").removeClass("current");
						$(".login_ul #reg a").addClass("current");
						$(".register").css("display","block");
				
					});
					
					$(".login_skip a").on("click",function(){
						$(".dengru").css("display","none");
						$(".login_ul #in a").removeClass("current");
						$(".login_ul #reg a").addClass("current");
						$(".register").css("display","block");
					});
					
					$(".close_tag").on("click",function(){
						$(".login_register").css("display","none");
						$(".login_content").css("display","none");
					});
					
					
					
					//点击登录按钮,实现登录
					var reg=  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
						pwd=/^\w{6,15}$/;
						
					//获取输入的样式
					
					$(".dengru .login_button").on("click",function(){
						var email=$(".dengru input").eq(0).val(),
						password_txt=$(".dengru input").eq(1).val();
						console.log(email);
						if(!reg.test(email)){
							console.log("密码或邮箱不正确");
						}
						else{
							console.log("正确");
						}
					});
							
				}
					
				});
				
			});
			
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