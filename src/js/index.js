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
			if(scrollTop >= 700){
				$nav.fadeIn(500);
			}else{
				$nav.fadeOut(500);
			}
		})
			
		

		//swiper
		var mySwiper = new Swiper('.swiper-container', {
			autoplay:{
				delay:1500,
				disableOnInteraction: false
			},
			pagination: {
			el: '.swiper-pagination',
			clickable: true,
			},
		});
	})
})




