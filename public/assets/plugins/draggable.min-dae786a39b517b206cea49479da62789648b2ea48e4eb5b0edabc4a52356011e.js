!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,r){return void 0===r&&(r="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(r)}:e(window.jQuery)}(function(e){e.extend(e.FE.DEFAULTS,{dragInline:!0}),e.FE.PLUGINS.draggable=function(t){function r(r){return!(!r.originalEvent||!r.originalEvent.target||r.originalEvent.target.nodeType!=Node.TEXT_NODE)||(r.target&&"A"==r.target.tagName&&1==r.target.childNodes.length&&"IMG"==r.target.childNodes[0].tagName&&(r.target=r.target.childNodes[0]),e(r.target).hasClass("fr-draggable")?(t.undo.canDo()||t.undo.saveStep(),t.opts.dragInline?t.$el.attr("contenteditable",!0):t.$el.attr("contenteditable",!1),t.opts.toolbarInline&&t.toolbar.hide(),e(r.target).addClass("fr-dragging"),t.browser.msie||t.browser.edge||t.selection.clear(),void r.originalEvent.dataTransfer.setData("text","Froala")):(r.preventDefault(),!1))}function n(e){return!(e&&("HTML"==e.tagName||"BODY"==e.tagName||t.node.isElement(e)))}function a(e,r,n){t.opts.iframe&&(e+=t.$iframe.offset().top,r+=t.$iframe.offset().left),v.offset().top!=e&&v.css("top",e),v.offset().left!=r&&v.css("left",r),v.width()!=n&&v.css("width",n)}function o(r){var o=t.doc.elementFromPoint(r.originalEvent.pageX-t.win.pageXOffset,r.originalEvent.pageY-t.win.pageYOffset);if(!n(o)){for(var i=0,l=o;!n(l)&&l==o&&r.originalEvent.pageY-t.win.pageYOffset-i>0;)i++,l=t.doc.elementFromPoint(r.originalEvent.pageX-t.win.pageXOffset,r.originalEvent.pageY-t.win.pageYOffset-i);(!n(l)||v&&0===t.$el.find(l).length&&l!=v.get(0))&&(l=null);for(var s=0,f=o;!n(f)&&f==o&&r.originalEvent.pageY-t.win.pageYOffset+s<e(t.doc).height();)s++,f=t.doc.elementFromPoint(r.originalEvent.pageX-t.win.pageXOffset,r.originalEvent.pageY-t.win.pageYOffset+s);(!n(f)||v&&0===t.$el.find(f).length&&f!=v.get(0))&&(f=null),o=null==f&&l?l:f&&null==l?f:f&&l?i<s?l:f:null}if(e(o).hasClass("fr-drag-helper"))return!1;if(o&&!t.node.isBlock(o)&&(o=t.node.blockParent(o)),o&&["TD","TH","TR","THEAD","TBODY"].indexOf(o.tagName)>=0&&(o=e(o).parents("table").get(0)),o&&["LI"].indexOf(o.tagName)>=0&&(o=e(o).parents("UL, OL").get(0)),o&&!e(o).hasClass("fr-drag-helper")){v||(e.FE.$draggable_helper||(e.FE.$draggable_helper=e('<div class="fr-drag-helper"></div>')),v=e.FE.$draggable_helper,t.events.on("shared.destroy",function(){v.html("").removeData().remove(),v=null},!0));var g;g=r.originalEvent.pageY<e(o).offset().top+e(o).outerHeight()/2;var d=e(o),p=0;g||0!==d.next().length?(g||(d=d.next()),"before"==v.data("fr-position")&&d.is(v.data("fr-tag"))||(d.prev().length>0&&(p=parseFloat(d.prev().css("margin-bottom"))||0),p=Math.max(p,parseFloat(d.css("margin-top"))||0),a(d.offset().top-p/2-t.$box.offset().top,d.offset().left-t.win.pageXOffset-t.$box.offset().left,d.width()),v.data("fr-position","before"))):"after"==v.data("fr-position")&&d.is(v.data("fr-tag"))||(p=parseFloat(d.css("margin-bottom"))||0,a(d.offset().top+e(o).height()+p/2-t.$box.offset().top,d.offset().left-t.win.pageXOffset-t.$box.offset().left,d.width()),v.data("fr-position","after")),v.data("fr-tag",d),v.addClass("fr-visible"),v.appendTo(t.$box)}else v&&t.$box.find(v).length>0&&v.removeClass("fr-visible")}function i(e){e.originalEvent.dataTransfer.dropEffect="move",t.opts.dragInline?f()||!t.browser.msie&&!t.browser.edge||e.preventDefault():(e.preventDefault(),o(e))}function l(e){e.originalEvent.dataTransfer.dropEffect="move",t.opts.dragInline||e.preventDefault()}function s(e){t.$el.attr("contenteditable",!0);var r=t.$el.find(".fr-dragging");v&&v.hasClass("fr-visible")&&t.$box.find(v).length?g(e):r.length&&(e.preventDefault(),e.stopPropagation()),v&&t.$box.find(v).length&&v.removeClass("fr-visible"),r.removeClass("fr-dragging")}function f(){for(var t=null,r=0;r<e.FE.INSTANCES.length;r++)if(t=e.FE.INSTANCES[r].$el.find(".fr-dragging"),t.length)return t.get(0)}function g(r){for(var n,a,o=0;o<e.FE.INSTANCES.length;o++)if(n=e.FE.INSTANCES[o].$el.find(".fr-dragging"),n.length){a=e.FE.INSTANCES[o];break}if(n.length){if(r.preventDefault(),r.stopPropagation(),v&&v.hasClass("fr-visible")&&t.$box.find(v).length)v.data("fr-tag")[v.data("fr-position")]('<span class="fr-marker"></span>'),v.removeClass("fr-visible");else{if(t.markers.insertAtPoint(r.originalEvent)===!1)return!1}n.removeClass("fr-dragging");var i=n;if(n.parent().is("A")&&(i=n.parent()),t.core.isEmpty())t.events.focus();else{t.$el.find(".fr-marker").replaceWith(e.FE.MARKERS),t.selection.restore()}if(a==t||t.undo.canDo()||t.undo.saveStep(),t.core.isEmpty())t.$el.html(i);else{e(t.markers.insert()).replaceWith(i),n.after(e.FE.MARKERS),t.selection.restore()}return t.popups.hideAll(),t.selection.save(),t.$el.find(t.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").remove(),t.html.wrap(),t.html.fillEmptyBlocks(),t.selection.restore(),t.undo.saveStep(),t.opts.iframe&&t.size.syncIframe(),a!=t&&(a.popups.hideAll(),a.$el.find(a.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").remove(),a.html.wrap(),a.html.fillEmptyBlocks(),a.undo.saveStep(),a.events.trigger("element.dropped"),a.opts.iframe&&a.size.syncIframe()),t.events.trigger("element.dropped",[i]),!1}}function d(e){if(e&&"DIV"==e.tagName&&t.node.hasClass(e,"fr-drag-helper"))e.parentNode.removeChild(e);else if(e&&e.nodeType==Node.ELEMENT_NODE)for(var r=e.querySelectorAll("div.fr-drag-helper"),n=0;n<r.length;n++)r[n].parentNode.removeChild(r[n])}function p(){t.opts.enter==e.FE.ENTER_BR&&(t.opts.dragInline=!0),t.events.on("dragstart",r,!0),t.events.on("dragover",i,!0),t.events.on("dragenter",l,!0),t.events.on("document.dragend",s,!0),t.events.on("document.drop",s,!0),t.events.on("drop",g,!0),t.events.on("html.processGet",d)}var v;return{_init:p}}});