require(["../js/libs/config.js"], function(){
	require(["jquery","cookie"], function($, Cookie){
        class Car{
            constructor(options){
                this.url = options.url;
                this.init();
                this.load();
            }
            init(){
                let storge = JSON.parse($.cookie("goods"));
                let idArr = [];
                for(var key in storge){
                    if(!isNaN(key)){
                        idArr.push(key)
                    }
                }
                //判断是否有物品
                if(idArr.length > 0){
                    $(".white-space").css("display", "none");
                    $(".already-select").html(`已选${idArr.length}件`);
                }else{
                    $(".white-space").css("display","block");
                }
            }
            load(){
                var that = this;
                $.ajax({
                    url:this.url,
                    success:function(res){
                        that.res = res;
                        that.getcookie();
                    }
                })
            }
            getcookie(){
                this.goods = JSON.parse($.cookie("goods"))
                this.display();
            }
            display(){
                let str = "";
                let total_price = 0;
                for(var i = 0; i < this.res.length; i++){
                    for(var j = 0; j < this.goods.length; j++){
                        if(this.res[i].goodsId === this.goods[j].id){

                            // console.log(this.res[i],this.goods[j].num)
                            
                            $(".cart-list").html(
                                str +=`<div class="cart-item-cont">
                                            <div class="cart-good-items clearfix">
                                                <div class="select">
                                                    <a href="#" class="m-icons m-icons-check-active select-icon"></a>
                                                </div>
                                                <div class="image">
                                                    <img src="${this.res[i].src}"/>
                                                </div>
                                                <div class="name">
                                                    <p class="good-name">${this.res[i].name}</p>
                                                </div>
                                                <div class="price">
                                                    <span>￥${this.res[i].price}</span>
                                                </div>
                                                <div class="num">
                                                    <div class="c-edit">
                                                        <div class="num-reduce-add" index="${this.res[i].goodsId}">
                                                            <div class="minus-btn">
                                                                <a class="m-icons m-icons-reduce"></a>
                                                            </div>
                                                            <input type="number" class="count-input" value="${this.goods[j].num}" min=1>
                                                            <div class="minus-btn">
                                                                <a class="m-icons m-icons-add"></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="subtotal">
                                                    <span>￥${Number(this.res[i].price) * this.goods[j].num}</span>
                                                </div>
                                                <div class="del" index="${this.res[i].goodsId}">
                                                    <a href="#" class="m-icons m-icons-check-active select-icon"></a>
                                                </div>
                                            </div>
                                        </div>`
                                        
                            )
                            //总价合计    
                            let all_price = Number(this.res[i].price) * this.goods[j].num
                            total_price += all_price;
                            $(".t-f-price").html(`<span>合计：</span>￥${total_price}`);
                        }
                    }
                }
                this.changeNum();
                this.remove();
            }
            changeNum(){
                var that = this;
                $(".cart-list").on("input",".count-input",function(){
                    that.changeId = $(this).parent().attr("index");
                    console.log(that.changeId)
                    that.num = $(this).val();

                    that.changeCookie();
                })
            }
            remove(){
                var that = this;
                $(".cart-list").on("click",".del a" , function(){
                    that.removeId = $(this).parent().attr("index");
                    $(this).parent().parent().parent().remove();

                    that.removeCookie();
                })
              
            }
            changeCookie(){
                for(var i = 0; i < this.goods.length; i++){
                    if(this.goods[i].id === this.changeId){
                        this.goods[i].num = this.num;
                    }
                }
                $.cookie("goods",JSON.stringify(this.goods))
            }
            removeCookie(){
                for(var i = 0; i < this.goods.length; i++){
                    if(this.goods[i].id === this.removeId){
                        this.goods.splice(i,1)
                    }
                }
                $.cookie("goods",JSON.stringify(this.goods))
            }
        }

        new Car({
            url : "../../data/shop_list/shop_list.json",
        })

    })
})