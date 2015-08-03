var GrowthbeatModule;!function(a){var b=function(){function a(){}return a.get=function(a){if(!document.cookie)return null;var b=document.cookie.split("; ");for(var c in b){var d=b[c].split("=");if(d[0]==a)return decodeURIComponent(d[1])}return null},a.set=function(a,b,c){var d=a+"="+encodeURIComponent(b);d+="; path=/",d+="; expires="+new Date((new Date).getTime()+c).toUTCString(),document.cookie=d},a["delete"]=function(a){document.cookie=a+"=; path=/; expires="+new Date(0).toUTCString()},a}();a.CookieUtils=b}(GrowthbeatModule||(GrowthbeatModule={}));var GrowthbeatModule;!function(a){var b=function(){function a(){}return a.parseUrl=function(a){var b=a.match(/^(([^:\/?#]+):\/\/)?([^:\/?#]+)(:([0-9]+))?\/?/);return{scheme:b[2]?b[2]:void 0,domain:b[3]?b[3]:void 0,port:b[5]?parseInt(b[5]):void 0}},a}();a.HttpUtils=b}(GrowthbeatModule||(GrowthbeatModule={}));var GrowthbeatModule;!function(a){var b=function(){function a(){}return a.compile=function(a){return function(b){var c=a;for(var d in b)c=c.replace(new RegExp("\\{"+d+"\\}","gm"),b[d]);return c}},a}();a.Template=b}(GrowthbeatModule||(GrowthbeatModule={}));var GrowthbeatModule;!function(a){var b=function(){function b(){this.opened=!1,this.template=a.Template.compile('<iframe id="growthbeatHeaderView" src="{baseUrl}header/?serviceId={serviceId}&height={height}&backgroundColor={backgroundColor}" allowtransparency="true" style="width: 100%; height: {height}px; border-style: none; position: fixed; top: 0px; padding: 0px; margin: 0px; z-index: 100000;"></iframe><div style="width: 100%; height: {height}px;"></div>')}return b.prototype.show=function(b){var c=this;this.element=document.createElement("div"),this.element.innerHTML=this.template({baseUrl:Growthbeat.options.baseUrl,serviceId:encodeURIComponent(Growthbeat.options.serviceId),height:encodeURIComponent(Growthbeat.options.headerHeight.toString()),backgroundColor:encodeURIComponent(Growthbeat.options.backgroundColor)}),this.iframeElement=this.element.getElementsByTagName("iframe")[0],window.addEventListener("message",function(b){var d=a.HttpUtils.parseUrl(b.origin).domain,e=a.HttpUtils.parseUrl(Growthbeat.options.baseUrl).domain;if(d==e&&b.source==c.iframeElement.contentWindow){var f=JSON.parse(b.data);switch(f.type){case"open":c.opened=!0;break;case"close":c.opened=!1}c.rerender()}},!1),window.addEventListener("resize",function(a){c.rerender()},!1),b.appendChild(this.element)},b.prototype.rerender=function(){this.iframeElement.style.height=(this.opened?window.innerHeight:Growthbeat.options.headerHeight)+"px"},b}();a.HeaderView=b}(GrowthbeatModule||(GrowthbeatModule={}));var GrowthbeatModule;!function(a){var b=function(){function b(){}return b.request=function(b,c,d,e,f){var g=document.createElement("div");g.innerHTML=this.template({method:b,url:c,target:"growthbeatXdmView"+Math.round(1e8*Math.random())});var h=g.getElementsByTagName("form")[0];for(var i in d){var j=document.createElement("input");j.type="hidden",j.name=i,j.value=d[i],h.appendChild(j)}var k=g.getElementsByTagName("iframe")[0];window.addEventListener("message",function(b){var c=a.HttpUtils.parseUrl(b.origin).domain,d=a.HttpUtils.parseUrl(Growthbeat.options.baseUrl).domain;c==d&&b.source==k.contentWindow&&(e(b.data),f.removeChild(g))},!1),f.appendChild(g),h.submit()},b.template=a.Template.compile('<form method="{method}" action="{url}" target="{target}"></form><iframe id="growthbeatXdmView" name="{target}" style="position: absolute; top: -10000px; height: 0px; width: 0px;"></iframe>'),b}();a.Xdm=b}(GrowthbeatModule||(GrowthbeatModule={}));var Growthbeat=function(){function a(){}return a.init=function(a){for(var b in a)this.options[b]=a[b];this.growthbeatElement=document.createElement("div"),this.growthbeatElement.id=this.options.rootElementId,document.body.insertBefore(this.growthbeatElement,document.body.childNodes[0])},a.showHeader=function(){var a=this;GrowthbeatModule.CookieUtils.get(this.options.sessionIdCookieName)?(new GrowthbeatModule.HeaderView).show(this.growthbeatElement):this.getAccount(function(b){return null==b||null==b.id?void a.redirectToLogin():void a.createSession(function(b){return b&&b.id?(GrowthbeatModule.CookieUtils.set(a.options.sessionIdCookieName,b.id,a.options.cookieDuration),void location.reload()):void a.redirectToConnect()})})},a.getAccount=function(a){GrowthbeatModule.Xdm.request("GET",this.options.baseUrl+"xdm/accounts",{serviceId:this.options.serviceId,url:location.href},function(b){var c=JSON.parse(b);a(c)},this.growthbeatElement)},a.createSession=function(a){GrowthbeatModule.Xdm.request("POST",this.options.baseUrl+"xdm/sessions",{serviceId:this.options.serviceId,url:location.href},function(b){var c=JSON.parse(b);a(c)},this.growthbeatElement)},a.redirectToLogin=function(){location.href=this.options.baseUrl+"login?serviceId="+this.options.serviceId},a.redirectToConnect=function(){location.href=this.options.baseUrl+"services/"+this.options.serviceId},a.options={serviceId:void 0,baseUrl:"https://growthbeat.com/",headerHeight:32,rootElementId:"growthbeat",sessionIdCookieName:"growthbeat.sessionId",cookieDuration:6048e5,backgroundColor:"#333549"},a}();