"use strict";function _classCallCheck(i,s){if(!(i instanceof s))throw new TypeError("Cannot call a class as a function")}function _defineProperties(i,s){for(var t=0;t<s.length;t++){var n=s[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function _createClass(i,s,t){return s&&_defineProperties(i.prototype,s),t&&_defineProperties(i,t),i}require(["../js/libs/config.js"],function(){require(["jquery","cookie"],function(n,i){n(".nav_menu ul li").mouseover(function(){n(this).children("dl").css("display","block").parent().siblings().children("dl").css("display","none")}),n(".nav_menu ul li").mouseout(function(){n(this).children("dl").css("display","none")}),n(function(){n.ajax({url:"../../data/shop_list/shop_list.json",success:function(i){for(var s="",t=5;t<10;t++)n(".main_l_list").html(s+='<dl>\n                                        <a href=""><img src="'.concat(i[t].src,'"/></a>\n                                        <a href=""><p>').concat(i[t].name).concat(i[t].name,"</p></a>\n                                        <span>￥").concat(i[t].price,"</span>\n                                    </dl> "));n(".main_shoplist dl button").click(function(){if(this.id=n(this).parent().attr("index"),n.cookie("goods")){this.goods=JSON.parse(n.cookie("goods"));for(var i=!0,s=0;s<this.goods.length;s++)this.id===this.goods[s].id&&(this.goods[s].num++,i=!1);i&&this.goods.push({id:this.id,num:1})}else this.goods=[{id:this.id,num:1}];n.cookie("goods",JSON.stringify(this.goods)),console.log(this.goods)})}})}),new(function(){function s(i){_classCallCheck(this,s),this.url=i.url,this.list=i.list,this.left=i.left,this.right=i.right,this.pagelist=i.pagelist,this.num=i.num,this.index=0,this.load()}return _createClass(s,[{key:"load",value:function(){var s=this;n.ajax({url:this.url,success:function(i){s.res=i,s.createPage(),s.display()}})}},{key:"createPage",value:function(){this.maxNum=Math.ceil(this.res.length/this.num),this.pagelist.html("");for(var i=0;i<this.maxNum;i++)this.pagelist.append(n("<li>"+(i+1)+"</li>"));this.pagelist.find("li").eq(this.index).addClass("active").siblings().removeClass("active"),this.addEvent()}},{key:"addEvent",value:function(){var i=this;this.left.on("click",function(){i.changeIndex("l")}),this.right.on("click",function(){i.changeIndex("r")})}},{key:"changeIndex",value:function(i){"l"==i?0==this.index?this.index=this.maxNum-1:this.index--:this.index==this.maxNum-1?this.index=0:this.index++,this.pagelist.find("li").eq(this.index).addClass("active").siblings().removeClass("active"),this.display()}},{key:"display",value:function(){for(var i="",s=this.index*this.num;s<this.index*this.num+this.num;s++)s<this.res.length&&(i+='<dl index="'.concat(this.res[s].goodsId,'">\n                                    <a href=""><img src="').concat(this.res[s].src,'"/></a>\n                                    <button>加入购物车</button>\n                                    <p>￥').concat(this.res[s].price,"<span>￥").concat(this.res[s].del,'</span></p>\n                                    <dd><a href="">').concat(this.res[s].name).concat(this.res[s].name,"</a></dd>\n                                </dl>"));this.list.html(i)}}]),s}())({url:"../../data/shop_list/shop_list.json",list:n(".main_shoplist"),left:n("#btnL"),right:n("#btnR"),pagelist:n("#page"),num:25})})});