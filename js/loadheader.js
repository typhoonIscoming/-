define(["jquery","cookie","template","fly"],function($,cook,temp,f){
	$.ajax({
		type:"get",
		url:"/html/header.html",
		async:true,
		success:function(data){
			var _username=$.cookie("loginUser");
			if(_username){
				$(data).filter(".header")
					   .html(`欢迎你:`).end()
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
			
			
			
			
			
			//获取后台数据,添加到头文件导航中第一个li中
			$.getJSON("/js/list.json",function(data){
				var num=data.list.length;
				var engName;
				var len= $(".brand").children().length
				
				for(var i=0;i<num;i++){
					engName=(data.list)[i].eng_name;
					
					for(var j=0;j<len;j++){
						if($(".brand").children().eq(j).attr("id").slice(0,1)==engName.slice(0,1).toLowerCase()){
					   		
					   		$(".brand").children().eq(j).append(`<a href='#'>${engName}</a>`);
					   }
					}
				}	
			});	
			
			
				//实现楼梯效果
				$(function(){
					var pro_height=$(".brand").css("height");
					console.log(pro_height);
				});
				
			//鼠标移入购物篮上面,显示购物车中的信息,创建模板
			$.ajax({
				type:"get",
				url:"html/cart.html",
				async:true,
				success:function(data){
					$(data).appendTo(".products_detail");
					
					var cook=JSON.parse( $.cookie("products"));
					console.log(cook);
					for(var i=0,len=cook.length;i<len;i++){
						$(`<ul><li><img src="${cook[i].pro_imgSrc}"/></li>
				   <li>${cook[i].pro_name}<p>${cook[i].pro_detail}</p></li>
				   <li>${cook[i].pro_price}</li>
				   <li>数量${cook[i].pro_amount}<li>
				   </ul>`).appendTo(".cart_temp");
						
					}
					
				   //计算总价
//				   var total+=product.pro_price;
				   
//				   $(".pay_blank").children().eq(1).html("¥"+(total+".00").slice(0,6));
					
					
				}
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