!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(n,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(n)),e(t),t}:e(jQuery)}(function(e){e.FE.PLUGINS.align=function(n){function t(t){n.selection.save(),n.html.wrap(!0,!0,!0,!0),n.selection.restore();for(var i=n.selection.blocks(),r=0;r<i.length;r++)n.helpers.getAlignment(e(i[r].parentNode))==t?e(i[r]).css("text-align","").removeClass("fr-temp-div"):e(i[r]).css("text-align",t).removeClass("fr-temp-div"),""===e(i[r]).attr("class")&&e(i[r]).removeAttr("class"),""===e(i[r]).attr("style")&&e(i[r]).removeAttr("style");n.selection.save(),n.html.unwrap(),n.selection.restore()}function i(t){var i=n.selection.blocks();if(i.length){var r=n.helpers.getAlignment(e(i[0]));t.find("> *:first").replaceWith(n.icon.create("align-"+r))}}function r(t,i){var r=n.selection.blocks();if(r.length){var l=n.helpers.getAlignment(e(r[0]));i.find('a.fr-command[data-param1="'+l+'"]').addClass("fr-active").attr("aria-selected",!0)}}return{apply:t,refresh:i,refreshOnShow:r}},e.FE.DefineIcon("align",{NAME:"align-left"}),e.FE.DefineIcon("align-left",{NAME:"align-left"}),e.FE.DefineIcon("align-right",{NAME:"align-right"}),e.FE.DefineIcon("align-center",{NAME:"align-center"}),e.FE.DefineIcon("align-justify",{NAME:"align-justify"}),e.FE.RegisterCommand("align",{type:"dropdown",title:"Align",options:{left:"Align Left",center:"Align Center",right:"Align Right",justify:"Align Justify"},html:function(){var n='<ul class="fr-dropdown-list" role="presentation">',t=e.FE.COMMANDS.align.options;for(var i in t)t.hasOwnProperty(i)&&(n+='<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="align" data-param1="'+i+'" title="'+this.language.translate(t[i])+'">'+this.icon.create("align-"+i)+'<span class="fr-sr-only">'+this.language.translate(t[i])+"</span></a></li>");return n+="</ul>"},callback:function(e,n){this.align.apply(n)},refresh:function(e){this.align.refresh(e)},refreshOnShow:function(e,n){this.align.refreshOnShow(e,n)},plugin:"align"})});