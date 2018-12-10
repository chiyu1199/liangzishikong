require(["../js/libs/config.js"], function(){
	require(["jquery","swiper"], function(jq , Swiper){
        // nav_menu
        // $(".categories").mouseover(function(){
        //     $(".nav_menu").css("display","block");
        // })

		$(".nav_menu ul li").mouseover(function(){
			$(this).children("dl").css("display","block").parent().siblings().children("dl").css("display","none");
        })
		$(".nav_menu ul li").mouseout(function(){
            $(this).children("dl").css("display","none");
        })
        
        
       



    })
})