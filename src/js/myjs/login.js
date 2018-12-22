require(["../js/libs/config.js"], function(){
	require(["jquery","cookie"], function($, Cookie){
        class Login{
            constructor(){
				this.btn = $(".btn");
				this.user = $("#user");
                this.pass = $("#pass");
                
				this.getcookie();
            }
            getcookie(){
                this.goods = JSON.parse($.cookie("goods1"))
                this.addEvent()
            }
			addEvent(){
				var that = this;
				this.btn.on("click",function(){
					that.userV = that.user.val();
                    that.passV = that.pass.val();
                    for(var i = 0; i < that.goods.length; i++){
                        if(that.userV == that.goods[i].user && that.passV == that.goods[i].pass){
                            alert("登录成功");
                            location.href = index.html;
                            break;
                        }else{
                            alert("用户名或密码错误，请重新输入")
                            break;
                        }
                    }
                })
            }
        }
        new Login();


    })
})