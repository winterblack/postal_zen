!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(o,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(o)),e(t)}:e(window.jQuery)}(function(e){e.extend(e.FE.POPUP_TEMPLATES,{emoticons:"[_BUTTONS_][_EMOTICONS_]"}),e.extend(e.FE.DEFAULTS,{emoticonsStep:8,emoticonsSet:[{code:"1f600",desc:"Grinning face"},{code:"1f601",desc:"Grinning face with smiling eyes"},{code:"1f602",desc:"Face with tears of joy"},{code:"1f603",desc:"Smiling face with open mouth"},{code:"1f604",desc:"Smiling face with open mouth and smiling eyes"},{code:"1f605",desc:"Smiling face with open mouth and cold sweat"},{code:"1f606",desc:"Smiling face with open mouth and tightly-closed eyes"},{code:"1f607",desc:"Smiling face with halo"},{code:"1f608",desc:"Smiling face with horns"},{code:"1f609",desc:"Winking face"},{code:"1f60a",desc:"Smiling face with smiling eyes"},{code:"1f60b",desc:"Face savoring delicious food"},{code:"1f60c",desc:"Relieved face"},{code:"1f60d",desc:"Smiling face with heart-shaped eyes"},{code:"1f60e",desc:"Smiling face with sunglasses"},{code:"1f60f",desc:"Smirking face"},{code:"1f610",desc:"Neutral face"},{code:"1f611",desc:"Expressionless face"},{code:"1f612",desc:"Unamused face"},{code:"1f613",desc:"Face with cold sweat"},{code:"1f614",desc:"Pensive face"},{code:"1f615",desc:"Confused face"},{code:"1f616",desc:"Confounded face"},{code:"1f617",desc:"Kissing face"},{code:"1f618",desc:"Face throwing a kiss"},{code:"1f619",desc:"Kissing face with smiling eyes"},{code:"1f61a",desc:"Kissing face with closed eyes"},{code:"1f61b",desc:"Face with stuck out tongue"},{code:"1f61c",desc:"Face with stuck out tongue and winking eye"},{code:"1f61d",desc:"Face with stuck out tongue and tightly-closed eyes"},{code:"1f61e",desc:"Disappointed face"},{code:"1f61f",desc:"Worried face"},{code:"1f620",desc:"Angry face"},{code:"1f621",desc:"Pouting face"},{code:"1f622",desc:"Crying face"},{code:"1f623",desc:"Persevering face"},{code:"1f624",desc:"Face with look of triumph"},{code:"1f625",desc:"Disappointed but relieved face"},{code:"1f626",desc:"Frowning face with open mouth"},{code:"1f627",desc:"Anguished face"},{code:"1f628",desc:"Fearful face"},{code:"1f629",desc:"Weary face"},{code:"1f62a",desc:"Sleepy face"},{code:"1f62b",desc:"Tired face"},{code:"1f62c",desc:"Grimacing face"},{code:"1f62d",desc:"Loudly crying face"},{code:"1f62e",desc:"Face with open mouth"},{code:"1f62f",desc:"Hushed face"},{code:"1f630",desc:"Face with open mouth and cold sweat"},{code:"1f631",desc:"Face screaming in fear"},{code:"1f632",desc:"Astonished face"},{code:"1f633",desc:"Flushed face"},{code:"1f634",desc:"Sleeping face"},{code:"1f635",desc:"Dizzy face"},{code:"1f636",desc:"Face without mouth"},{code:"1f637",desc:"Face with medical mask"}],emoticonsButtons:["emoticonsBack","|"],emoticonsUseImage:!0}),e.FE.PLUGINS.emoticons=function(o){function t(){var e=o.$tb.find('.fr-command[data-cmd="emoticons"]'),t=o.popups.get("emoticons");if(t||(t=n()),!t.hasClass("fr-active")){o.popups.refresh("emoticons"),o.popups.setContainer("emoticons",o.$tb);var s=e.offset().left+e.outerWidth()/2,c=e.offset().top+(o.opts.toolbarBottom?10:e.outerHeight()-10);o.popups.show("emoticons",s,c,e.outerHeight())}}function s(){o.popups.hide("emoticons")}function n(){var e="";o.opts.toolbarInline&&o.opts.emoticonsButtons.length>0&&(e='<div class="fr-buttons fr-emoticons-buttons">'+o.button.buildList(o.opts.emoticonsButtons)+"</div>");var t={buttons:e,emoticons:i()},s=o.popups.create("emoticons",t);return o.tooltip.bind(s,".fr-emoticon"),a(s),s}function c(){if(!o.selection.isCollapsed())return!1;var e=o.selection.element(),t=o.selection.endElement();if(e&&o.node.hasClass(e,"fr-emoticon"))return e;if(t&&o.node.hasClass(t,"fr-emoticon"))return t;var s=o.selection.ranges(0),n=s.startContainer;if(n.nodeType==Node.ELEMENT_NODE&&n.childNodes.length>0&&s.startOffset>0){var c=n.childNodes[s.startOffset-1];if(o.node.hasClass(c,"fr-emoticon"))return c}return!1}function i(){for(var e='<div style="text-align: center">',t=0;t<o.opts.emoticonsSet.length;t++)0!==t&&t%o.opts.emoticonsStep==0&&(e+="<br>"),e+='<span class="fr-command fr-emoticon" tabIndex="-1" data-cmd="insertEmoticon" title="'+o.language.translate(o.opts.emoticonsSet[t].desc)+'" role="button" data-param1="'+o.opts.emoticonsSet[t].code+'">'+(o.opts.emoticonsUseImage?'<img src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/'+o.opts.emoticonsSet[t].code+'.svg"/>':"&#x"+o.opts.emoticonsSet[t].code+";")+'<span class="fr-sr-only">'+o.language.translate(o.opts.emoticonsSet[t].desc)+"&nbsp;&nbsp;&nbsp;</span></span>";return o.opts.emoticonsUseImage&&(e+='<p style="font-size: 12px; text-align: center; padding: 0 5px;">Emoji free by <a class="fr-link" tabIndex="-1" href="http://emojione.com/" target="_blank" rel="nofollow" role="link" aria-label="Open Emoji One website.">Emoji One</a></p>'),e+="</div>"}function a(t){o.events.on("popup.tab",function(s){var n=e(s.currentTarget);if(!o.popups.isVisible("emoticons")||!n.is("span, a"))return!0;var c,i,a,f=s.which;if(e.FE.KEYCODE.TAB==f){if(n.is("span.fr-emoticon")&&s.shiftKey||n.is("a")&&!s.shiftKey){var d=t.find(".fr-buttons");c=!o.accessibility.focusToolbar(d,!!s.shiftKey)}if(c!==!1){var r=t.find("span.fr-emoticon:focus:first, span.fr-emoticon:visible:first, a");n.is("span.fr-emoticon")&&(r=r.not("span.fr-emoticon:not(:focus)")),i=r.index(n),i=s.shiftKey?((i-1)%r.length+r.length)%r.length:(i+1)%r.length,a=r.get(i),o.events.disableBlur(),a.focus(),c=!1}}else if(e.FE.KEYCODE.ARROW_UP==f||e.FE.KEYCODE.ARROW_DOWN==f||e.FE.KEYCODE.ARROW_LEFT==f||e.FE.KEYCODE.ARROW_RIGHT==f){if(n.is("span.fr-emoticon")){var l=n.parent().find("span.fr-emoticon");i=l.index(n);var m=o.opts.emoticonsStep,u=Math.floor(l.length/m),p=i%m,h=Math.floor(i/m),E=h*m+p,g=u*m;e.FE.KEYCODE.ARROW_UP==f?E=((E-m)%g+g)%g:e.FE.KEYCODE.ARROW_DOWN==f?E=(E+m)%g:e.FE.KEYCODE.ARROW_LEFT==f?E=((E-1)%g+g)%g:e.FE.KEYCODE.ARROW_RIGHT==f&&(E=(E+1)%g),a=e(l.get(E)),o.events.disableBlur(),a.focus(),c=!1}}else e.FE.KEYCODE.ENTER==f&&(n.is("a")?n[0].click():o.button.exec(n),c=!1);return c===!1&&(s.preventDefault(),s.stopPropagation()),c},!0)}function f(t,s){var n=c(),i=o.selection.ranges(0);n?(0===i.startOffset&&o.selection.element()===n?e(n).before(e.FE.MARKERS+e.FE.INVISIBLE_SPACE):i.startOffset>0&&o.selection.element()===n&&i.commonAncestorContainer.parentNode.classList.contains("fr-emoticon")&&e(n).after(e.FE.INVISIBLE_SPACE+e.FE.MARKERS),o.selection.restore(),o.html.insert('<span class="fr-emoticon fr-deletable'+(s?" fr-emoticon-img":"")+'"'+(s?' style="background: url('+s+');"':"")+">"+(s?"&nbsp;":t)+"</span>&nbsp;"+e.FE.MARKERS,!0)):o.html.insert('<span class="fr-emoticon fr-deletable'+(s?" fr-emoticon-img":"")+'"'+(s?' style="background: url('+s+');"':"")+">"+(s?"&nbsp;":t)+"</span>&nbsp;",!0)}function d(){o.popups.hide("emoticons"),o.toolbar.showInline()}function r(){var t=function(){for(var e=o.el.querySelectorAll(".fr-emoticon:not(.fr-deletable)"),t=0;t<e.length;t++)e[t].className+=" fr-deletable"};t(),o.events.on("html.set",t),o.events.on("keydown",function(t){if(o.keys.isCharacter(t.which)&&o.selection.inEditor()){var s=o.selection.ranges(0),n=c();o.node.hasClass(n,"fr-emoticon-img")&&n&&(0===s.startOffset&&o.selection.element()===n?e(n).before(e.FE.MARKERS+e.FE.INVISIBLE_SPACE):e(n).after(e.FE.INVISIBLE_SPACE+e.FE.MARKERS),o.selection.restore())}}),o.events.on("keyup",function(t){for(var s=o.el.querySelectorAll(".fr-emoticon"),n=0;n<s.length;n++)"undefined"!=typeof s[n].textContent&&0===s[n].textContent.replace(/\u200B/gi,"").length&&e(s[n]).remove();if(!(t.which>=e.FE.KEYCODE.ARROW_LEFT&&t.which<=e.FE.KEYCODE.ARROW_DOWN)){var i=c();o.node.hasClass(i,"fr-emoticon-img")&&(e(i).append(e.FE.MARKERS),o.selection.restore())}})}return{_init:r,insert:f,showEmoticonsPopup:t,hideEmoticonsPopup:s,back:d}},e.FE.DefineIcon("emoticons",{NAME:"smile-o"}),e.FE.RegisterCommand("emoticons",{title:"Emoticons",undo:!1,focus:!0,refreshOnCallback:!1,popup:!0,callback:function(){this.popups.isVisible("emoticons")?(this.$el.find(".fr-marker").length&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("emoticons")):this.emoticons.showEmoticonsPopup()},plugin:"emoticons"}),e.FE.RegisterCommand("insertEmoticon",{callback:function(e,o){this.emoticons.insert("&#x"+o+";",this.opts.emoticonsUseImage?"https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/"+o+".svg":null),this.emoticons.hideEmoticonsPopup()}}),e.FE.DefineIcon("emoticonsBack",{NAME:"arrow-left"}),e.FE.RegisterCommand("emoticonsBack",{title:"Back",undo:!1,focus:!1,back:!0,refreshAfterCallback:!1,callback:function(){this.emoticons.back()}})});