"use strict";function _classCallCheck(s,i){if(!(s instanceof i))throw new TypeError("Cannot call a class as a function")}function _defineProperties(s,i){for(var n=0;n<i.length;n++){var e=i[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(s,e.key,e)}}function _createClass(s,i,n){return i&&_defineProperties(s.prototype,i),n&&_defineProperties(s,n),s}require(["../js/libs/config.js"],function(){require(["jquery","cookie"],function(o,s){new(function(){function i(s){_classCallCheck(this,i),this.url=s.url,this.init(),this.load()}return _createClass(i,[{key:"init",value:function(){var s=JSON.parse(o.cookie("goods")),i=[];for(var n in s)isNaN(n)||i.push(n);0<i.length?(o(".white-space").css("display","none"),o(".already-select").html("已选".concat(i.length,"件"))):o(".white-space").css("display","block")}},{key:"load",value:function(){var i=this;o.ajax({url:this.url,success:function(s){i.res=s,i.getcookie()}})}},{key:"getcookie",value:function(){this.goods=JSON.parse(o.cookie("goods")),this.display()}},{key:"display",value:function(){for(var s="",i=0,n=0;n<this.res.length;n++)for(var e=0;e<this.goods.length;e++){if(this.res[n].goodsId===this.goods[e].id)o(".cart-list").html(s+='<div class="cart-item-cont">\n                                            <div class="cart-good-items clearfix">\n                                                <div class="select">\n                                                    <a href="#" class="m-icons m-icons-check-active select-icon"></a>\n                                                </div>\n                                                <div class="image">\n                                                    <img src="'.concat(this.res[n].src,'"/>\n                                                </div>\n                                                <div class="name">\n                                                    <p class="good-name">').concat(this.res[n].name,'</p>\n                                                </div>\n                                                <div class="price">\n                                                    <span>￥').concat(this.res[n].price,'</span>\n                                                </div>\n                                                <div class="num">\n                                                    <div class="c-edit">\n                                                        <div class="num-reduce-add" index="').concat(this.res[n].goodsId,'">\n                                                            <div class="minus-btn">\n                                                                <a class="m-icons m-icons-reduce"></a>\n                                                            </div>\n                                                            <input type="number" class="count-input" value="').concat(this.goods[e].num,'" min=1>\n                                                            <div class="minus-btn">\n                                                                <a class="m-icons m-icons-add"></a>\n                                                            </div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class="subtotal">\n                                                    <span>￥').concat(Number(this.res[n].price)*this.goods[e].num,'</span>\n                                                </div>\n                                                <div class="del" index="').concat(this.res[n].goodsId,'">\n                                                    <a href="#" class="m-icons m-icons-check-active select-icon"></a>\n                                                </div>\n                                            </div>\n                                        </div>')),i+=Number(this.res[n].price)*this.goods[e].num,o(".t-f-price").html("<span>合计：</span>￥".concat(i))}this.changeNum(),this.remove()}},{key:"changeNum",value:function(){var s=this;o(".cart-list").on("input",".count-input",function(){s.changeId=o(this).parent().attr("index"),console.log(s.changeId),s.num=o(this).val(),s.changeCookie()})}},{key:"remove",value:function(){var s=this;o(".cart-list").on("click",".del a",function(){s.removeId=o(this).parent().attr("index"),o(this).parent().parent().parent().remove(),s.removeCookie()})}},{key:"changeCookie",value:function(){for(var s=0;s<this.goods.length;s++)this.goods[s].id===this.changeId&&(this.goods[s].num=this.num);o.cookie("goods",JSON.stringify(this.goods))}},{key:"removeCookie",value:function(){for(var s=0;s<this.goods.length;s++)this.goods[s].id===this.removeId&&this.goods.splice(s,1);o.cookie("goods",JSON.stringify(this.goods))}}]),i}())({url:"../../data/shop_list/shop_list.json"})})});