define(["jquery","cookie","template","fly"],function($){
	$.ajax({
		type:"get",
		url:"/html/header.html",
		async:true,
		success:function(data){
			var _username=$.cookie("loginUser");
			if(_username){
				$(data).filter(".header")
					   .html(`欢迎你:}`).end()
					   .appendTo(".header");
//				var  $.getCookie("loginUser")
//				$(".click_login").text("欢迎您")
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
					
					if($(".login_content").children("div").eq(0).css("display")=="block"){
						$(".login_ul #in a").addClass("current");
					}
					else if($(".login_content").children("div").eq(0).css("display")=="block"){
						$(".login_ul #reg a").addClass("current");
					}
					
					
					//点击登录按钮,实现登录
					var reg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+$/ ,
						pwd=/^\w{1,15}$/;
						
					//获取输入的样式
					
					$(".dengru .login_button").on("click",function(){
						var email_txt=$(".dengru input").eq(0).val(),
							password_txt=$(".dengru input").eq(1).val();
						if(reg.test(email_txt)&&pwd.test(password_txt)){//判断格式
							console.log("格式正确");
							$.getJSON("/js/login_register.json",function(userInfo){
								
								var num=userInfo.length;
								for(var i=0;i<num;i++){
									if(email_txt==userInfo[i].email&&password_txt==userInfo[i].password){
										//保存cookie
										$.cookie("loginUser",{"name":userInfo[i].name,"email":email_txt,"password":password_txt});
										console.log(email_txt)
										$(".login_register").css("display","none");
										$(".login_content").css("display","none");
										
										return;
									}
								}
								
							});
						}
						else{
							alert("密码或邮箱不正确");
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