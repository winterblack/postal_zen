!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,n){return void 0===n&&(n="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(n)}:e(window.jQuery)}(function(e){e.FE.PLUGINS.print=function(e){function t(){var t=e.$el.html(),n=null;e.shared.print_iframe?n=e.shared.print_iframe:(n=document.createElement("iframe"),n.name="fr-print",n.style.position="fixed",n.style.top="0",n.style.left="-9999px",n.style.height="100%",n.style.width="0",n.style.overflow="hidden",n.style["z-index"]="9999",n.style.tabIndex="-1",document.body.appendChild(n),n.onload=function(){setTimeout(function(){e.events.disableBlur(),window.frames["fr-print"].focus(),window.frames["fr-print"].print(),e.$win.get(0).focus(),e.events.disableBlur(),e.events.focus()},0)},e.shared.print_iframe=n);var r=n.contentWindow;r.document.open(),r.document.write("<!DOCTYPE html><html><head><title>"+document.title+"</title>"),Array.prototype.forEach.call(document.querySelectorAll("style"),function(e){e=e.cloneNode(!0),r.document.write(e.outerHTML)});var i=document.querySelectorAll("link[rel=stylesheet]");Array.prototype.forEach.call(i,function(e){var t=document.createElement("link");t.rel=e.rel,t.href=e.href,t.media="print",t.type="text/css",t.media="all",r.document.write(t.outerHTML)}),r.document.write('</head><body style="text-align: '+("rtl"==e.opts.direction?"right":"left")+"; direction: "+e.opts.direction+';"><div class="fr-view">'),r.document.write(t),r.document.write("</div></body></html>"),r.document.close()}return{run:t}},e.FE.DefineIcon("print",{NAME:"print"}),e.FE.RegisterCommand("print",{title:"Print",undo:!1,focus:!1,plugin:"print",callback:function(){this.print.run()}})});