/*! rainmakertheme 2015-02-25 */
(function(){$(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o;k=function(a){var b,c;b=function(a){return console.log(a)},c={method:"feed",link:a.link,description:a.message},void 0!==a.actions&&(c.actions=a.actions),void 0!==a.name&&(c.name=a.name),void 0!==a.ref&&(c.ref=a.ref),void 0!==a.photo&&(c.picture=a.photo),FB.ui(c,b)},$("a.social-button.twitter, a[rel=twitter-share]").click(function(){var a,b,c,d;return c=encodeURIComponent($(this).data("message")?$(this).data("message"):$("title").text()),b=encodeURIComponent($(this).data("link")?$(this).data("link"):window.location.search||!window.$memberId?window.location.href:window.location.href+"?_m="+window.$memberId),a=screen.width/2-275,d=screen.height/2-225,window.open("https://twitter.com/share?url="+b+"&text="+c,"twittershare","menubar=0,resizable=1,width=550,height=450,scrollbars=0,location=0,directories=0,toolbar=0,top="+d+",left="+a),!1}),$("a.social-button.gplus, a[rel=gplus-share]").click(function(){var a,b,c;return b=encodeURIComponent($(this).data("link")?$(this).data("link"):window.location.href),a=screen.width/2-275,c=screen.height/2-225,window.open("https://plus.google.com/share?url="+b,"twittershare","menubar=0,resizable=1,width=550,height=450,scrollbars=0,location=0,directories=0,toolbar=0,top="+c+",left="+a),!1}),$("a.social-button.facebook, a[rel=facebook-share]").click(function(){var a;return a={},a.message=$(this).data("message"),a.link=$(this).data("link")?$(this).data("link"):window.location.search||!window.$memberId?window.location.href:window.location.href+"?_m="+window.$memberId,$(this).data("photo")&&(a.photo=$(this).data("photo")),$(this).data("ref")&&(a.ref=$(this).data("ref")),$(this).data("name")&&(a.name=$(this).data("name")),$(this).data("action-name")&&(a.actions="[{'name':'"+$(this).data("action-name")+"','link':'"+($(this).data("action-link")?$(this).data("action-link"):window.location.href)+"'}]"),k(a),!1}),$("span.numberBox").each(function(){$(this).click(function(){$(this).addClass("active"),$(this).parent().siblings().find(".active").removeClass("active")})}),$("span.numberBox").each(function(){$(this).click(function(){var a;a=$(this).data("value"),$('input[name="amount"]').val(a)})}),$('input[name="donationAmount"]').on("keyup blur change focus",function(){var a;a=$(this).val(),$('input[name="amount"]').val(a),$("span.numberBox.active").each(function(){return $(this).removeClass("active")})}),$(".tab").click(function(){var a,b;a=$(this),b=a.data("target"),$(this).siblings().removeClass("active"),$(this).addClass("active"),$("#"+b).is(":visible")?console.log("Do Nothing."):$("div.tab-content:visible").fadeOut("fast",function(){return $("#"+b).fadeIn("fast")})}),$("form#create").on("submit",function(){var a,b,c,d;return c=$("#m").val(),b=$("#d").val(),d=$("#y").val(),a=c+"/"+b+"/"+d,$("input#date_until").val(a)}),n=document.getElementById("menuToggle"),b=document.getElementById("canvas"),o=function(){return $(n).find("i").toggleClass("active"),$(b).toggleClass("show-nav"),!1},c=function(){return $(n).find("i").removeClass("active"),$(b).removeClass("show-nav"),!1},$(n).click(function(){return o()}),$(".sideMenu span.close").click(function(){return c()}),$(document).keyup(function(a){return 27===a.keyCode?c():void 0}),$(document).click(function(a){var b;return b=$(a.target).attr("class"),"show-nav"===b?c():void 0}),$(window).on("load",function(){$(".project-tabs .tab:first-of-type").addClass("in"),$(".cities li:first-of-type").addClass("active"),$("#faq .question:first-of-type").addClass("in"),$(".faq li:first-of-type").addClass("active")}),$("span.image > img").click(function(){var a;return a=$(this).attr("src"),$('input[name="fileUrl"]').val(a)}),l=function(){return $(".image").each(function(){var a,b;return a=$(this).parent().find(".content"),b=$(a).innerHeight(),$(this).innerHeight(b)})},$("ul.tabs li").click(function(){var a;a=$(this).attr("data-target"),$(this).addClass("active").siblings().removeClass("active"),$("div.tab").removeClass("in"),$(a).addClass("in")}),$("ul.faq li").click(function(){var a;a=$(this).attr("data-target"),$(this).addClass("active").siblings().removeClass("active"),$("div.question").removeClass("in"),$(a).addClass("in")}),$(".slider").each(function(){return $(this).unslider({fluid:!0})}),$(".unslider-arrow").click(function(){var a;a=this.className.split(" ")[2],$(this).parent().siblings().find(".slider").data("unslider")[a]()}),$("#video").click(function(){return $("body").css({overflow:"hidden"}),$(".modal").css({opacity:1,height:"auto","z-index":3,display:"inline-block"}),$(".overlay").css({opacity:1,height:"auto","z-index":2,display:"inline-block"})}),$(".modal.video").click(function(){return $(".overlay").css({opacity:0,height:"auto","z-index":0,display:"none"}),$(this).css({opacity:0,height:"auto","z-index":0,display:"none"}),$("body").css({overflow:"visible"})}),d="month",a=[{img:"//rainmakerapp.s3.amazonaws.com/storks/images/tier-2.png",level:"Save A Stork",description:"We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $30/month, you can save a mother from the grief and heartache of abortion.",gifts:["Silver Stork Pendant","Two Shirts"]},{img:"//rainmakerapp.s3.amazonaws.com/storks/images/tier-2.jpg",level:"Save A Bundle",description:"We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $60/month, you can save two mothers from the grief and heartache of abortion.",gifts:["Silver Stork Pendant","Four Shirts"]},{img:"//rainmakerapp.s3.amazonaws.com/storks/images/tier-4.jpg",level:"Be a Superhero",description:"We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $150/month, you can save five mothers from the grief and heartache of abortion.",gifts:["Silver Stork Pendant","Four Shirts"]},{img:"//rainmakerapp.s3.amazonaws.com/storks/images/tier-3.jpg",level:"Save a Flock",description:"We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $350/month, you can save twelve mothers from the grief and heartache of abortion.",gifts:["Silver Stork Pendant","Four Shirts"]}],i=function(){return $('input[name="gift"]').change(function(){var a;return a=$(this).val(),a.indexOf("Four")>-1?($(".sizes.two").fadeOut(),$(".sizes.four").fadeIn()):a.indexOf("Two")>-1?($(".sizes.four").fadeOut(),$(".sizes.two").fadeIn()):$(".sizes").fadeOut()})},j=function(){var b,c,d,e,f,g,h,j,k,l,m,n,o,p,q;if(b=$(".amount input").val(),349>=b?$(".campaign-level").fadeOut():$(".campaign-level").fadeIn(),b>=350&&749>=b){for($(".level").text(a[0].level),$(".description").text(a[0].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" checked></div>'),$(".img").html('<img src="'+a[0].img+'" />'),n=a[0].gifts,e=0,j=n.length;j>e;e++)d=n[e],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}if(b>=750&&1799>=b){for($(".level").text(a[1].level),$(".description").text(a[1].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>'),$(".img").html('<img src="'+a[1].img+'" />'),o=a[1].gifts,f=0,k=o.length;k>f;f++)d=o[f],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value="'+c+'"></div>');return i()}if(b>=1800&&3199>=b){for($(".level").text(a[2].level),$(".description").text(a[2].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift" checked></div>'),$(".img").html('<img src="'+a[2].img+'" />'),p=a[2].gifts,g=0,l=p.length;l>g;g++)d=p[g],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}if(b>=3200){for($(".level").text(a[3].level),$(".description").text(a[3].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>'),$(".img").html('<img src="'+a[3].img+'" />'),q=a[3].gifts,h=0,m=q.length;m>h;h++)d=q[h],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}},f=function(b){var c,d,e,f,g,h,j,k,l,m,n,o,p,q;if(349>=b?$(".campaign-level").fadeOut():$(".campaign-level").fadeIn(),b>=350&&749>=b){for($(".level").text(a[0].level),$(".description").text(a[0].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" checked></div>'),$(".img").html('<img src="'+a[0].img+'" />'),n=a[0].gifts,e=0,j=n.length;j>e;e++)d=n[e],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}if(b>=750&&1799>=b){for($(".level").text(a[1].level),$(".description").text(a[1].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>'),$(".img").html('<img src="'+a[1].img+'" />'),o=a[1].gifts,f=0,k=o.length;k>f;f++)d=o[f],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value="'+c+'"></div>');return i()}if(b>=1800&&3199>=b){for($(".level").text(a[2].level),$(".description").text(a[2].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift" checked></div>'),$(".img").html('<img src="'+a[2].img+'" />'),p=a[2].gifts,g=0,l=p.length;l>g;g++)d=p[g],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}if(b>=3200){for($(".level").text(a[3].level),$(".description").text(a[3].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>'),$(".img").html('<img src="'+a[3].img+'" />'),q=a[3].gifts,h=0,m=q.length;m>h;h++)d=q[h],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}},e=function(b){var c,d,e,f,g,h,j,k,l,m,n,o,p,q;if(29>=b?$(".campaign-level").fadeOut():$(".campaign-level").fadeIn(),b>=30&&59>=b){for($(".level").text(a[0].level),$(".description").text(a[0].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" checked></div>'),$(".img").html('<img src="'+a[0].img+'" />'),n=a[0].gifts,e=0,j=n.length;j>e;e++)d=n[e],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}if(b>=60&&149>=b){for($(".level").text(a[1].level),$(".description").text(a[1].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>'),$(".img").html('<img src="'+a[1].img+'" />'),o=a[1].gifts,f=0,k=o.length;k>f;f++)d=o[f],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}if(b>=150&&349>=b){for($(".level").text(a[2].level),$(".description").text(a[2].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift" checked></div>'),$(".img").html('<img src="'+a[2].img+'" />'),p=a[2].gifts,g=0,l=p.length;l>g;g++)d=p[g],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}if(b>=350){for($(".level").text(a[3].level),$(".description").text(a[3].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>'),$(".img").html('<img src="'+a[3].img+'" />'),q=a[3].gifts,h=0,m=q.length;m>h;h++)d=q[h],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}},g=function(){var b,c,d,e,f,g,h,j,k,l,m,n,o,p,q;if(b=$(".amount input").val(),29>=b?$(".campaign-level").fadeOut():$(".campaign-level").fadeIn(),b>=30&&59>=b){for($(".level").text(a[0].level),$(".description").text(a[0].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" checked></div>'),$(".img").html('<img src="'+a[0].img+'" />'),n=a[0].gifts,e=0,j=n.length;j>e;e++)d=n[e],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}if(b>=60&&149>=b){for($(".level").text(a[1].level),$(".description").text(a[1].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>'),$(".img").html('<img src="'+a[1].img+'" />'),o=a[1].gifts,f=0,k=o.length;k>f;f++)d=o[f],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}if(b>=150&&349>=b){for($(".level").text(a[2].level),$(".description").text(a[2].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift" checked></div>'),$(".img").html('<img src="'+a[2].img+'" />'),p=a[2].gifts,g=0,l=p.length;l>g;g++)d=p[g],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}if(b>=350){for($(".level").text(a[3].level),$(".description").text(a[3].description),$(".gifts").html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>'),$(".img").html('<img src="'+a[3].img+'" />'),q=a[3].gifts,h=0,m=q.length;m>h;h++)d=q[h],c=d.split(" ").join("-"),$(".gifts").append('<div class="col width-33"><label>'+d+'</label><input type="radio" name="gift" class="gift" value='+c+"></div>");return i()}},m={One:"Small",Two:"Small",Three:"Small",Four:"Small"},$(".sizes select").each(function(){return $(this).on("change",function(){var a,b;a=$(this).data("shirt"),b=$(this).val(),m[a]=b})}),$(".amount input").on("keyup keydown keypress blur",function(){return $(".any").parent().addClass("active").parent().siblings(".toggle").find(".active").removeClass("active"),d=$(".frequency.active").data("frequency"),console.log(d),"month"===d?g():j()}),$(".amount-toggle").on("click",function(){var a,b;return a=$(this).data("monthly"),b=$(this).data("yearly"),"month"===d?($(".amount input").val(a),g()):($(".amount input").val(b),j()),$(this).toggleClass("active").parent().siblings(".toggle").find(".active").removeClass("active")}),$(".frequency").on("click",function(){var a,b,c;return d=$(this).data("frequency"),a=$(document).find(".amount-toggle.active").data("monthly"),c=$(document).find(".amount-toggle.active").data("yearly"),$("input[name=gift][value=declineGift]").prop("checked",!0),"month"===d?(a&&$(".amount input").val(a),b=$(".amount input").val(),e(b)):"year"===d&&(c&&$(".amount input").val(c),b=$(".amount input").val(),f(b)),$(this).addClass("active").parent().siblings().find(".frequency").not($(this)).removeClass("active"),!1}),$("a#donateModal").click(function(){var a;return d=$(".frequency.active").data("frequency"),a=$("input[name=gift]:checked").val(),"month"===d&&(d="m"),$rain({action:"donate",amount:$(".amount input").val(),recurring:d,memo:"Gift: "+a+(("Two-Shirts"===a||"Four-Shirts"===a)&&", Shirt Sizes: "+JSON.stringify(m)||""),lockamount:!0,message:"Thank you for your donation!"}),!1}),$(".thanks").click(function(){return $(this).fadeOut()(function(){return $(".overlay").css({opacity:0,height:"auto","z-index":0,display:"none"}),$(".modal").css({opacity:0,height:"auto","z-index":0,display:"none"})})}),$(".upload").on("click",function(){return $(".fundraiser-modal").fadeIn(function(){$(".fundraiser-modal .overlay").fadeIn(),$(".fundraiser-modal .modal").fadeIn()})}),$("button#customPhoto").on("click",function(){return console.log("Setting preference..."),$.ajax({type:"POST",url:"/api/3.0/contacts/me/",async:!1,data:{prop:{"prefer-facebook":0}},success:function(){console.log("You now prefer to use your uploaded photo.")}})}),$("a.button.facebook").on("click",function(){return $.ajax({type:"POST",url:"/api/3.0/contacts/me/",async:!1,data:{prop:{"prefer-facebook":1}},success:function(){return console.log("You now prefer to use your Facebook photo.")}})}),$(".fundraiser-modal .overlay").on("click",function(){return $(".fundraiser-modal").fadeOut()}),h="",$("form#apply").on("submit",function(){$(".form-group").each(function(){var a,b,c;return a=$(this).find("label").text(),c=$(this).find("input:checked").length>0?$(this).find("input:checked").val():$(this).find("input").val(),b="<p><b>"+a+"</b><br>"+c+"</p>",h+=b}),$("input[name=message]").val(h)}),window.setTimeout(function(){return $(".thanks").fadeOut()},2e3),i(),$.fn.isOnScreen=function(){var a,b,c;return c=$(window),b={top:c.scrollTop(),left:c.scrollLeft()},b.right=b.left+c.width(),b.bottom=b.top+c.height(),a=this.offset(),a.right=a.left+this.outerWidth(),a.bottom=a.top+this.outerHeight(),!(b.right<a.left||b.left>a.right||b.bottom<a.top||b.top>a.bottom)},$("a#upload").on("click",function(){$(".upload-new").fadeIn()}),$("span.close-upload").on("click",function(){$(".upload-new").fadeOut()}),$("form#conversation").on("submit",function(){var a,b,c,d;return a=$("#church").val(),c=$("#position").val(),b=$("#phone").val(),d="<strong>Church:</strong> "+a+"<br><strong>Position:</strong> "+c+"<br><strong>Phone:</strong> "+b,$("input[name=message]").val(d)}),$(window).on("scroll",function(){var a,b,c,d,e,f,g,h;return h=$(window).scrollTop(),b=$("#faq").offset(),f=h-b.top,d=$(".questions").offset(),a=$(".answers").width(),e=$(".questions").height(),c=$(".question").offset().left,g=$(".question").offset().top,console.log("WinTop"+(h-$(".footer").offset().top),"Questions Height"+(e+70)),$(".questions").css(Math.abs(h-$(".footer").offset().top)<=e+70?{position:"absolute",top:$(".answers").height()-e+30,left:a+20}:f>=-15?{position:"fixed",top:15,left:d.left,width:a}:{position:"relative",top:0,left:0})}),$("#search").on("click",function(){return $(".search").addClass("active")}),$("*").click(function(a){var b;return b=$(a.target).attr("class"),console.log(b),"search"!==a.target.id&&"icon-search"!==b&&"search"!==b&&"search active"!==b?$(".search").removeClass("active"):void 0})})}).call(this),function(){window.fbAsyncInit=function(){FB.init({appId:"347159378788273",channelUrl:window.facebookChannelFile,status:!0,cookie:!0,xfbml:!0,oauth:!0}),$(document).trigger("facebook:ready")},function(a,b,c){var d,e;e=void 0,d=a.getElementsByTagName(b)[0],a.getElementById(c)||(e=a.createElement(b),e.id=c,e.src="//connect.facebook.net/en_US/all.js",d.parentNode.insertBefore(e,d))}(document,"script","facebook-jssdk"),$(function(){var a;return a=function(){return FB.login(function(a){a.authResponse?$.ajax({url:"/act/session/connectfacebook",type:"POST",data:{"access-token":a.authResponse.accessToken,"user-id":a.authResponse.userId,"--delay-facebook-friend-import":!0,"--json":!0,"--login":!0},success:function(a){1===a.success?$(document).trigger("momentum:facebook-login-success",[a]):$(document).trigger("momentum:facebook-login-error",[a])}}):$(document).trigger("momentum:facebook-login-cancel")},{scope:null==window.facebookLoginScope?"email,user_likes":window.facebookLoginScope}),!1},$(document).on("click","a[rel=facebook-login]",a),$(document).on("momentum:facebook-login",a),$(document).on("momentum:facebook-login-success",function(){console.log("Index: "+window.location.pathname.indexOf("my-storks")),window.location=window.location.pathname.indexOf(!1)?window.location.pathname:"/my-storks/sign-up?step=2"}),$(document).on("momentum:facebook-login-cancel",function(){}),$(document).on("momentum:facebook-login-error",function(a,b){alert("Could not create your account with the system. Please try again later. "+b.message)})})}.call(this);