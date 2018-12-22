require(["../js/libs/config.js"], function(){
	require(["jquery","cookie"], function($ , Cookie){
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

        //商品列表数据渲染
        $(function(){
			$.ajax({
				url : "../../data/shop_list/shop_list.json",
				success : function(res){
					let str = '';
					for (let i = 5; i < 10; i++) {
                        $(".main_l_list").html(
                            str += `<dl>
                                        <a href=""><img src="${res[i].src}"/></a>
                                        <a href=""><p>${res[i].name}${res[i].name}</p></a>
                                        <span>￥${res[i].price}</span>
                                    </dl> `
                        )
                    }
                    
                    // let shop_list = "";
                    // for (let i = 0; i < res.length; i++) {
                    //     $(".main_shoplist").html(
                    //         shop_list += `<dl index="${res[i].goodsId}">
                    //                         <a href=""><img src="${res[i].src}"/></a>
                    //                         <button>加入购物车</button>
                    //                         <p>￥${res[i].price}<span>￥${res[i].del}</span></p>
                    //                         <dd><a href="">${res[i].name}${res[i].name}</a></dd>
                    //                     </dl>`
                    //     )
                    // }

                    //点击存储cookie
                    $(".main_shoplist dl button").click(function(){
                        this.id = $(this).parent().attr("index");

                        if($.cookie("goods")){
                            this.goods = JSON.parse($.cookie("goods"))
                            var onoff = true;
                            for(var i = 0; i < this.goods.length; i++){
                                if(this.id === this.goods[i].id){
                                    this.goods[i].num ++;
                                    onoff = false;
                                }
                            }
                            if(onoff){
                                this.goods.push({
                                    id : this.id,
                                    num : 1
                                })
                            }
                        }else{
                            this.goods = [{
                                id : this.id,
                                num : 1
                            }]
                        }
                        $.cookie("goods", JSON.stringify(this.goods))
                        console.log(this.goods)
                    })
				}
			})
        })


        class Page{
            constructor(options){
                this.url = options.url;
                this.list = options.list;
                this.left = options.left;
                this.right = options.right;
                this.pagelist = options.pagelist;
                this.num = options.num;
                
                this.index = 0;
                
                this.load()
            }
            load(){
                var that = this;
                $.ajax({
                    url:this.url,
                    success:function(res){
                        that.res = res;
                        that.createPage()
                        that.display()
                    }
                })
            }
            createPage(){
                this.maxNum = Math.ceil(this.res.length / this.num);
                this.pagelist.html("");
                for(var i=0;i<this.maxNum;i++){
                    this.pagelist.append($("<li>"+ (i+1) +"</li>"))
                }
                
                this.pagelist.find("li").eq(this.index).addClass("active").siblings().removeClass("active")
                
                this.addEvent()
            }
            addEvent(){
                var that = this;
                this.left.on("click",function(){
                    that.changeIndex("l")
                })
                this.right.on("click",function(){
                    that.changeIndex("r")
                })
            }
            changeIndex(type){
                if(type == "l"){
                    if(this.index == 0){
                        this.index = this.maxNum-1
                    }else{
                        this.index--
                    }
                }else{
                    if(this.index == this.maxNum-1){
                        this.index = 0
                    }else{
                        this.index++
                    }
                }
                this.pagelist.find("li").eq(this.index).addClass("active").siblings().removeClass("active")
                this.display()
            }
            display(){
                var str = "";
                for(var i=this.index*this.num;i<this.index*this.num+this.num;i++){
                    if(i < this.res.length){
                        str += `<dl index="${this.res[i].goodsId}">
                                    <a href=""><img src="${this.res[i].src}"/></a>
                                    <button>加入购物车</button>
                                    <p>￥${this.res[i].price}<span>￥${this.res[i].del}</span></p>
                                    <dd><a href="">${this.res[i].name}${this.res[i].name}</a></dd>
                                </dl>`
                    }
                }
                this.list.html(str)
            }
        }
        
        new Page({
            url:"../../data/shop_list/shop_list.json",
            list:$(".main_shoplist"),
            left:$("#btnL"),
            right:$("#btnR"),
            pagelist:$("#page"),
            num:25
        })
        

    })
})