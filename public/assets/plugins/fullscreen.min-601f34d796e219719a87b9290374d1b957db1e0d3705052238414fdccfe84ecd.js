!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,o){return void 0===o&&(o="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(o)}:e(window.jQuery)}(function(e){e.FE.PLUGINS.fullscreen=function(t){function o(){return t.$box.hasClass("fr-fullscreen")}function n(){a=t.helpers.scrollTop(),t.$box.toggleClass("fr-fullscreen"),e("body").toggleClass("fr-fullscreen"),c=e('<div style="display: none;"></div>'),t.$box.after(c),t.helpers.isMobile()&&(t.$tb.data("parent",t.$tb.parent()),t.$tb.prependTo(t.$box),t.$tb.data("sticky-dummy")&&t.$tb.after(t.$tb.data("sticky-dummy"))),f=t.opts.height,d=t.opts.heightMax,u=t.opts.zIndex,t.opts.height=t.o_win.innerHeight-(t.opts.toolbarInline?0:t.$tb.outerHeight()),t.opts.zIndex=9990,t.opts.heightMax=null,t.size.refresh(),t.opts.toolbarInline&&t.toolbar.showInline();for(var o=t.$box.parent();!o.is("body");)o.data("z-index",o.css("z-index")).css("z-index","9990"),o=o.parent();t.events.trigger("charCounter.update"),t.$win.trigger("scroll")}function r(){t.$box.toggleClass("fr-fullscreen"),e("body").toggleClass("fr-fullscreen"),t.$tb.prependTo(t.$tb.data("parent")),t.$tb.data("sticky-dummy")&&t.$tb.after(t.$tb.data("sticky-dummy")),t.opts.height=f,t.opts.heightMax=d,t.opts.zIndex=u,t.size.refresh(),e(t.o_win).scrollTop(a),t.opts.toolbarInline&&t.toolbar.showInline(),t.events.trigger("charCounter.update"),t.opts.toolbarSticky&&t.opts.toolbarStickyOffset&&(t.opts.toolbarBottom?t.$tb.css("bottom",t.opts.toolbarStickyOffset).data("bottom",t.opts.toolbarStickyOffset):t.$tb.css("top",t.opts.toolbarStickyOffset).data("top",t.opts.toolbarStickyOffset));for(var o=t.$box.parent();!o.is("body");)o.data("z-index")&&(o.css("z-index",""),o.css("z-index")!=o.data("z-index")&&o.css("z-index",o.data("z-index")),o.removeData("z-index")),o=o.parent();t.$win.trigger("scroll")}function s(){o()?r():n(),i(t.$tb.find('.fr-command[data-cmd="fullscreen"]'))}function i(e){var n=o();e.toggleClass("fr-active",n).attr("aria-pressed",n),e.find("> *:not(.fr-sr-only)").replaceWith(n?t.icon.create("fullscreenCompress"):t.icon.create("fullscreen"))}function l(){return!!t.$wp&&(t.events.$on(e(t.o_win),"resize",function(){o()&&(r(),n())}),t.events.on("toolbar.hide",function(){if(o()&&t.helpers.isMobile())return!1}),void t.events.on("destroy",function(){o()&&r()},!0))}var a,c,f,d,u;return{_init:l,toggle:s,refresh:i,isActive:o}},e.FE.RegisterCommand("fullscreen",{title:"Fullscreen",undo:!1,focus:!1,accessibilityFocus:!0,forcedRefresh:!0,toggle:!0,callback:function(){this.fullscreen.toggle()},refresh:function(e){this.fullscreen.refresh(e)},plugin:"fullscreen"}),e.FE.DefineIcon("fullscreen",{NAME:"expand"}),e.FE.DefineIcon("fullscreenCompress",{NAME:"compress"})});