!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(a,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(a)),e(t)}:e(window.jQuery)}(function(e){if(e.extend(e.FE.DEFAULTS,{imageManagerLoadURL:"https://i.froala.com/load-files",imageManagerLoadMethod:"get",imageManagerLoadParams:{},imageManagerPreloader:"",imageManagerDeleteURL:"",imageManagerDeleteMethod:"post",imageManagerDeleteParams:{},imageManagerPageSize:12,imageManagerScrollOffset:20,imageManagerToggleTags:!0}),e.FE.PLUGINS.imageManager=function(a){function t(){if(!D){var e='<div class="fr-modal-head-line"><i class="fa fa-bars fr-modal-more fr-not-available" id="fr-modal-more-'+a.sid+'" title="'+a.language.translate("Tags")+'"></i><h4 data-text="true">'+a.language.translate("Manage Images")+"</h4></div>";e+='<div class="fr-modal-tags" id="fr-modal-tags"></div>';var t='<img class="fr-preloader" id="fr-preloader" alt="'+a.language.translate("Loading")+'.." src="'+a.opts.imageManagerPreloader+'" style="display: none;">';t+='<div class="fr-image-list" id="fr-image-list"></div>';var r=a.modals.create(H,e,t);D=r.$modal,I=r.$head,P=r.$body}D.data("current-image",a.image.get()),a.modals.show(H),x||L(),o()}function r(){a.modals.hide(H)}function i(){var a=e(window).outerWidth();return a<768?2:a<1200?3:4}function n(){E.empty();for(var e=0;e<F;e++)E.append('<div class="fr-list-column"></div>')}function o(){x.show(),E.find(".fr-list-column").empty(),a.opts.imageManagerLoadURL?e.ajax({url:a.opts.imageManagerLoadURL,method:a.opts.imageManagerLoadMethod,data:a.opts.imageManagerLoadParams,dataType:"json",crossDomain:a.opts.requestWithCORS,xhrFields:{withCredentials:a.opts.requestWithCredentials},headers:a.opts.requestHeaders}).done(function(e,t,r){a.events.trigger("imageManager.imagesLoaded",[e]),s(e,r.response),x.hide()}).fail(function(){var e=this.xhr();v(k,e.response||e.responseText)}):v(O)}function s(e,a){try{E.find(".fr-list-column").empty(),S=0,R=0,U=0,q=e,g()}catch(e){v(z,a)}}function g(){if(R<q.length&&(E.outerHeight()<=P.outerHeight()+a.opts.imageManagerScrollOffset||P.scrollTop()+a.opts.imageManagerScrollOffset>E.outerHeight()-P.outerHeight())){S++;for(var e=a.opts.imageManagerPageSize*(S-1);e<Math.min(q.length,a.opts.imageManagerPageSize*S);e++)l(q[e])}}function l(t){var r=new Image,i=e('<div class="fr-image-container fr-empty fr-image-'+U+++'" data-loading="'+a.language.translate("Loading")+'.." data-deleting="'+a.language.translate("Deleting")+'..">');u(!1),r.onload=function(){i.height(Math.floor(i.width()/r.width*r.height));var n=e("<img/>");if(t.thumb)n.attr("src",t.thumb);else{if(v(_,t),!t.url)return v(A,t),!1;n.attr("src",t.url)}if(t.url&&n.attr("data-url",t.url),t.tag)if(I.find(".fr-modal-more.fr-not-available").removeClass("fr-not-available"),I.find(".fr-modal-tags").show(),t.tag.indexOf(",")>=0){for(var o=t.tag.split(","),s=0;s<o.length;s++)o[s]=o[s].trim(),0===T.find('a[title="'+o[s]+'"]').length&&T.append('<a role="button" title="'+o[s]+'">'+o[s]+"</a>");n.attr("data-tag",o.join())}else 0===T.find('a[title="'+t.tag.trim()+'"]').length&&T.append('<a role="button" title="'+t.tag.trim()+'">'+t.tag.trim()+"</a>"),n.attr("data-tag",t.tag.trim());t.name&&n.attr("alt",t.name);for(var l in t)t.hasOwnProperty(l)&&"thumb"!=l&&"url"!=l&&"tag"!=l&&n.attr("data-"+l,t[l]);i.append(n).append(e(a.icon.create("imageManagerDelete")).addClass("fr-delete-img").attr("title",a.language.translate("Delete"))).append(e(a.icon.create("imageManagerInsert")).addClass("fr-insert-img").attr("title",a.language.translate("Insert"))),T.find(".fr-selected-tag").each(function(e,a){C(n,a.text)||i.hide()}),n.on("load",function(){i.removeClass("fr-empty"),i.height("auto"),R++,f(m(parseInt(n.parent().attr("class").match(/fr-image-(\d+)/)[1],10)+1)),u(!1),R%a.opts.imageManagerPageSize==0&&g()}),a.events.trigger("imageManager.imageLoaded",[n])},r.onerror=function(){R++,i.remove(),f(m(parseInt(i.attr("class").match(/fr-image-(\d+)/)[1],10)+1)),v(j,t),R%a.opts.imageManagerPageSize==0&&g()},r.src=t.thumb||t.url,d().append(i)}function d(){var a,t;return E.find(".fr-list-column").each(function(r,i){var n=e(i);0===r?(t=n.outerHeight(),a=n):n.outerHeight()<t&&(t=n.outerHeight(),a=n)}),a}function m(a){void 0===a&&(a=0);for(var t=[],r=U-1;r>=a;r--){var i=E.find(".fr-image-"+r);i.length&&(t.push(i),e('<div id="fr-image-hidden-container">').append(i),E.find(".fr-image-"+r).remove())}return t}function f(e){for(var a=e.length-1;a>=0;a--)d().append(e[a])}function u(e){if(void 0===e&&(e=!0),!D.is(":visible"))return!0;var t=i();if(t!=F){F=t;var r=m();n(),f(r)}a.modals.resize(H),e&&g()}function c(e){var a={},t=e.data();for(var r in t)t.hasOwnProperty(r)&&"url"!=r&&"tag"!=r&&(a[r]=t[r]);return a}function h(t){var r=e(t.currentTarget).siblings("img"),i=D.data("instance")||a,n=D.data("current-image");if(a.modals.hide(H),i.image.showProgressBar(),n)n.data("fr-old-src",n.attr("src")),n.trigger("click");else{i.events.focus(!0),i.selection.restore();var o=i.position.getBoundingRect(),s=o.left+o.width/2+e(a.doc).scrollLeft(),g=o.top+o.height+e(a.doc).scrollTop();i.popups.setContainer("image.insert",a.$sc),i.popups.show("image.insert",s,g)}i.image.insert(r.data("url"),!1,c(r),n)}function p(t){var r=e(t.currentTarget).siblings("img"),i=a.language.translate("Are you sure? Image will be deleted.");confirm(i)&&(a.opts.imageManagerDeleteURL?a.events.trigger("imageManager.beforeDeleteImage",[r])!==!1&&(r.parent().addClass("fr-image-deleting"),e.ajax({method:a.opts.imageManagerDeleteMethod,url:a.opts.imageManagerDeleteURL,data:e.extend(e.extend({src:r.attr("src")},c(r)),a.opts.imageManagerDeleteParams),crossDomain:a.opts.requestWithCORS,xhrFields:{withCredentials:a.opts.requestWithCredentials},headers:a.opts.requestHeaders}).done(function(e){a.events.trigger("imageManager.imageDeleted",[e]);var t=m(parseInt(r.parent().attr("class").match(/fr-image-(\d+)/)[1],10)+1);r.parent().remove(),f(t),u(!0)}).fail(function(){var e=this.xhr();v(N,e.response||e.responseText)})):v($))}function v(t,r){10<=t&&t<20?x.hide():20<=t&&t<30&&e(".fr-image-deleting").removeClass("fr-image-deleting"),a.events.trigger("imageManager.error",[{code:t,message:B[t]},r])}function M(){var e=I.find(".fr-modal-head-line").outerHeight(),a=T.outerHeight();I.toggleClass(".fr-show-tags"),I.hasClass(".fr-show-tags")?(I.css("height",e+a),T.find("a").css("opacity",1)):(I.css("height",e),T.find("a").css("opacity",0))}function w(){var a=T.find(".fr-selected-tag");a.length>0?(E.find("img").parent().show(),a.each(function(a,t){E.find("img").each(function(a,r){var i=e(r);C(i,t.text)||i.parent().hide()})})):E.find("img").parent().show(),f(m()),g()}function b(t){t.preventDefault();var r=e(t.currentTarget);r.toggleClass("fr-selected-tag"),a.opts.imageManagerToggleTags&&r.siblings("a").removeClass("fr-selected-tag"),w()}function C(e,a){for(var t=e.attr("data-tag").split(","),r=0;r<t.length;r++)if(t[r]==a)return!0;return!1}function L(){x=D.find("#fr-preloader"),E=D.find("#fr-image-list"),T=D.find("#fr-modal-tags"),F=i(),n(),I.css("height",I.find(".fr-modal-head-line").outerHeight()),a.events.$on(e(a.o_win),"resize",function(){u(!!q)}),a.helpers.isMobile()&&(a.events.bindClick(E,"div.fr-image-container",function(a){D.find(".fr-mobile-selected").removeClass("fr-mobile-selected"),e(a.currentTarget).addClass("fr-mobile-selected")}),D.on(a._mousedown,function(){D.find(".fr-mobile-selected").removeClass("fr-mobile-selected")})),a.events.bindClick(E,".fr-insert-img",h),a.events.bindClick(E,".fr-delete-img",p),D.on(a._mousedown+" "+a._mouseup,function(e){e.stopPropagation()}),D.on(a._mousedown,"*",function(){a.events.disableBlur()}),P.on("scroll",g),a.events.bindClick(D,"i#fr-modal-more-"+a.sid,M),a.events.bindClick(T,"a",b)}function y(){if(!a.$wp&&"IMG"!=a.el.tagName)return!1}var D,I,P,x,E,T,q,S,R,U,F,H="image_manager",j=10,k=11,O=12,z=13,_=14,A=15,N=21,$=22,B={};return B[j]="Image cannot be loaded from the passed link.",B[k]="Error during load images request.",B[O]="Missing imageManagerLoadURL option.",B[z]="Parsing load response failed.",B[_]="Missing image thumb.",B[A]="Missing image URL.",B[N]="Error during delete image request.",B[$]="Missing imageManagerDeleteURL option.",{require:["image"],_init:y,show:t,hide:r}},!e.FE.PLUGINS.image)throw new Error("Image manager plugin requires image plugin.");e.FE.DEFAULTS.imageInsertButtons.push("imageManager"),e.FE.RegisterCommand("imageManager",{title:"Browse",undo:!1,focus:!1,modal:!0,callback:function(){this.imageManager.show()},plugin:"imageManager"}),e.FE.DefineIcon("imageManager",{NAME:"folder"}),e.FE.DefineIcon("imageManagerInsert",{NAME:"plus"}),e.FE.DefineIcon("imageManagerDelete",{NAME:"trash"})});