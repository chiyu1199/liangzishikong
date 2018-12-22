require(["../js/libs/config.js"], function(){
	require(["jquery","cookie"], function($, Cookie){
        class Register{
            constructor(){
				this.btn = $(".btn");
				this.user = $("#user");
				this.pass = $("#pass");
				
				this.addEvent()
			}
			addEvent(){
				var that = this;
				this.btn.on("click",function(){
					that.userV = that.user.val();
					that.passV = that.pass.val();
                    that.setCookie();
                })
            }
            setCookie(){
//				读取初始cookie,用来查看是否是第一次注册
				if($.cookie("goods1")){
					this.goods = JSON.parse($.cookie("goods1"))
				}else{
					this.goods = []
				}
				
//				如果第一次注册,之前没有,那么length小于1
				if(this.goods.length < 1){
					this.goods.push({
						user:this.userV,
						pass:this.passV,
						onoff:1
					})
				}else{
//					之前已经注册过
					var that = this;
					var onOff = true;
					$.each(this.goods,function(index,value){
						if(value.user == that.userV){		//发现重复
							alert("用户名重复");
							onOff = false;				//改变状态
						}
					})
					if(onOff){
						this.goods.push({
							user:this.userV,
							pass:this.passV
						})
					}
				}
                $.cookie("goods1",JSON.stringify(this.goods))
                console.log(this.goods)
			}
            


        }
    
        new Register()

    })
})