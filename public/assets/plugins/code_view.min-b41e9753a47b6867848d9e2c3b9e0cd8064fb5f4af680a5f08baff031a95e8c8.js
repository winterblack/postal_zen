!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,s){return void 0===s&&(s="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(s)}:e(window.jQuery)}(function(e){e.extend(e.FE.DEFAULTS,{codeMirror:!0,codeMirrorOptions:{lineNumbers:!0,tabMode:"indent",indentWithTabs:!0,lineWrapping:!0,mode:"text/html",tabSize:2},codeBeautifierOptions:{end_with_newline:!0,indent_inner_html:!0,extra_liners:["p","h1","h2","h3","h4","h5","h6","blockquote","pre","ul","ol","table","dl"],brace_style:"expand",indent_char:"\t",indent_size:1,wrap_line_length:0},codeViewKeepActiveButtons:["fullscreen"]}),e.FE.PLUGINS.codeView=function(t){function s(){return t.$box.hasClass("fr-code-view")}function i(){return d?d.getValue():h.val()}function n(e){var s=i();t.html.set(s),t.$el.blur(),t.$tb.find(" > .fr-command").not(e).removeClass("fr-disabled").attr("aria-disabled",!1),e.removeClass("fr-active").attr("aria-pressed",!1),t.events.focus(!0),t.placeholder.refresh(),t.undo.saveStep()}function o(s){h||(l(),!d&&t.opts.codeMirror&&"undefined"!=typeof CodeMirror?d=CodeMirror.fromTextArea(h.get(0),t.opts.codeMirrorOptions):t.events.$on(h,"keydown keyup change input",function(){if(t.opts.height)this.removeAttribute("rows");else if(this.rows||(this.rows=1),0===this.value.length)this.rows=1;else{for(this.style.height="auto";this.rows>1&&this.scrollHeight<=this.offsetHeight;)this.rows-=1;for(;this.scrollHeight>this.offsetHeight&&(!t.opts.heightMax||this.offsetHeight<t.opts.heightMax);)this.rows+=1}})),t.undo.saveStep(),t.html.cleanEmptyTags(),t.html.cleanWhiteTags(!0),t.core.hasFocus()&&(t.core.isEmpty()||(t.selection.save(),t.$el.find('.fr-marker[data-type="true"]:first').replaceWith('<span class="fr-tmp fr-sm">F</span>'),t.$el.find('.fr-marker[data-type="false"]:last').replaceWith('<span class="fr-tmp fr-em">F</span>')));var i=t.html.get(!1,!0);t.$el.find("span.fr-tmp").remove(),t.$box.toggleClass("fr-code-view",!0),t.core.hasFocus()&&t.$el.blur(),i=i.replace(/<span class="fr-tmp fr-sm">F<\/span>/,"FROALA-SM"),i=i.replace(/<span class="fr-tmp fr-em">F<\/span>/,"FROALA-EM"),t.codeBeautifier&&(i=t.codeBeautifier.run(i,t.opts.codeBeautifierOptions));var n,o;if(d){n=i.indexOf("FROALA-SM"),o=i.indexOf("FROALA-EM"),n>o?n=o:o-=9,i=i.replace(/FROALA-SM/g,"").replace(/FROALA-EM/g,"");var r=i.substring(0,n).length-i.substring(0,n).replace(/\n/g,"").length,a=i.substring(0,o).length-i.substring(0,o).replace(/\n/g,"").length;n=i.substring(0,n).length-i.substring(0,i.substring(0,n).lastIndexOf("\n")+1).length,o=i.substring(0,o).length-i.substring(0,i.substring(0,o).lastIndexOf("\n")+1).length,d.setSize(null,t.opts.height?t.opts.height:"auto"),t.opts.heightMin&&t.$box.find(".CodeMirror-scroll").css("min-height",t.opts.heightMin),d.setValue(i),d.focus(),d.setSelection({line:r,ch:n},{line:a,ch:o}),d.refresh(),d.clearHistory()}else{n=i.indexOf("FROALA-SM"),o=i.indexOf("FROALA-EM")-9,t.opts.heightMin&&h.css("min-height",t.opts.heightMin),t.opts.height&&h.css("height",t.opts.height),t.opts.heightMax&&h.css("max-height",t.opts.height||t.opts.heightMax),h.val(i.replace(/FROALA-SM/g,"").replace(/FROALA-EM/g,"")).trigger("change");var c=e(t.o_doc).scrollTop();h.focus(),h.get(0).setSelectionRange(n,o),e(t.o_doc).scrollTop(c)}t.$tb.find(" > .fr-command").not(s).filter(function(){return t.opts.codeViewKeepActiveButtons.indexOf(e(this).data("cmd"))<0}).addClass("fr-disabled").attr("aria-disabled",!0),s.addClass("fr-active").attr("aria-pressed",!0),!t.helpers.isMobile()&&t.opts.toolbarInline&&t.toolbar.hide()}function r(e){void 0===e&&(e=!s());var i=t.$tb.find('.fr-command[data-cmd="html"]');e?(t.popups.hideAll(),o(i)):(t.$box.toggleClass("fr-code-view",!1),n(i))}function a(){s()&&r(t.$tb.find('button[data-cmd="html"]')),d&&d.toTextArea(),h.val("").removeData().remove(),h=null,f&&(f.remove(),f=null)}function l(){h=e('<textarea class="fr-code" tabIndex="-1">'),t.$wp.append(h),h.attr("dir",t.opts.direction),t.$box.hasClass("fr-basic")||(f=e('<a data-cmd="html" title="Code View" class="fr-command fr-btn html-switch'+(t.helpers.isMobile()?"":" fr-desktop")+'" role="button" tabIndex="-1"><i class="fa fa-code"></i></button>'),t.$box.append(f),t.events.bindClick(t.$box,"a.html-switch",function(){r(!1)}));var n=function(){return!s()};t.events.on("buttons.refresh",n),t.events.on("copy",n,!0),t.events.on("cut",n,!0),t.events.on("paste",n,!0),t.events.on("destroy",a,!0),t.events.on("html.set",function(){s()&&r(!0)}),t.events.on("form.submit",function(){s()&&(t.html.set(i()),t.events.trigger("contentChanged",[],!0))},!0)}function c(){if(!t.$wp)return!1}var h,d,f;return{_init:c,toggle:r,isActive:s,get:i}},e.FE.RegisterCommand("html",{title:"Code View",undo:!1,focus:!1,forcedRefresh:!0,toggle:!0,callback:function(){this.codeView.toggle()},plugin:"codeView"}),e.FE.DefineIcon("html",{NAME:"code"})});