require(["../js/libs/config.js"], function(){
	require(["jquery","swiper"], function(jq , Swiper){

		// nav_menu
		$(".nav_menu").children("ul").children("li").mouseover(function(){
			$(this).children("dl").css("display","block").parent().siblings().children("dl").css("display","none");
		})
		$(".nav_menu").children("ul").children("li").mouseout(function(){
			$(this).children("dl").css("display","none");
		})
	
		//floor_nav
		$(".floor_nav").children("li").click(function(){
			var t = $(".floor").eq($(this).index()).offset().top;
			$("html").animate({
				scrollTop:t
			}) 
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
		})
		
		var $nav = $(".floor_nav");
		$(window).scroll(function(){
			var scrollTop = $(this).scrollTop();
			if(scrollTop >= 800){
				$nav.fadeIn(500);
			}else{
				$nav.fadeOut(500);
			}

			var index = Math.floor((scrollTop-800)/635);
			$(".floor_nav li").eq(index).addClass("active").siblings().removeClass("active");
		})
			
		//swiper
		var mySwiper = new Swiper('.swiper-container', {
			effect : 'fade',
			loop : true,
			autoplay : {
				delay:1500,
				disableOnInteraction: false
			},
			pagination : {
			el: '.swiper-pagination',
			clickable: true,
			},
		});
		$(".swiper-pagination-bullet").hover(function() {
			$(this).click(); //鼠标划上去之后，自动触发点击事件来模仿鼠标划上去的事件
		})

		//楼层数据渲染
		$(function(){
			$.ajax({
				url: "../data/index/home.json",
				success: function(res){
					let homeData = res.data.homepage;
					let good_str = '';
					for (let i = 5; i < homeData.floors.length; i++) {
						let floors = homeData.floors[i].data.items;
						$.each(floors, function (i, ele) {
							$(".floor_pic_r").html(
								good_str += `<dl>
												<a href="">
													<dt><img src="${ele.pic_url}" /><span></span></dt>
													<dd>
														<p>${ele.name}</p>
														<span>${ele.price_min/100}</span>
													</dd>
												</a>
											</dl>`
							)
						})
					}
				}
			})	
		})


		
	})
})




