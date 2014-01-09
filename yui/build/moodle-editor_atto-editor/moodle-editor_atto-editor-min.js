YUI.add("moodle-editor_atto-editor",function(e,t){CSS={CONTENT:"editor_atto_content",CONTENTWRAPPER:"editor_atto_content_wrap",TOOLBAR:"editor_atto_toolbar",WRAPPER:"editor_atto"},M.editor_atto=M.editor_atto||{buttonhandlers:{},textupdatedhandlers:{},menus:{},menuhandlers:{},filepickeroptions:{},widgets:{},showhide_menu_handler:function(e){e.preventDefault();var t=this.getAttribute("disabled"),n=this.getAttribute("data-menu"),r=M.editor_atto.menus[n],i=r.get("bodyContent");r.get("visible")||t?(r.hide(),i.detach("clickoutside")):(i.on("clickoutside",function(e){e.target.ancestor()!==this&&e.target!==this&&r.get("visible")&&(i.detach("clickoutside"),r.hide())},this),r.show(),r.bodyNode.one("a").focus())},buttonclicked_handler:function(e){var t=this.getAttribute("data-editor"),n=this.getAttribute("data-plugin"),r=this.getAttribute("data-handler"),i=M.editor_atto.menus[n+"_"+t];i&&i.hide();if(M.editor_atto.is_enabled(t,n))return r=M.editor_atto.buttonhandlers[r],r(e,t)},is_enabled:function(t,n){var r=e.one("#"+t+"_toolbar .atto_"+n+"_button");return!r.hasAttribute("disabled")},disable_all_widgets:function(t){var n,r;for(n in M.editor_atto.widgets)r=e.one("#"+t+"_toolbar .atto_"+n+"_button"),r&&r.setAttribute("disabled","true")},enable_widget:function(t,n){var r=e.one("#"+t+"_toolbar .atto_"+n+"_button");r&&r.removeAttribute("disabled")},enable_all_widgets:function(t){var n,r;for(n in M.editor_atto.widgets)r=e.one("#"+t+"_toolbar .atto_"+n+"_button"),r&&r.removeAttribute("disabled")},add_text_updated_handler:function(e,t){e in M.editor_atto.textupdatedhandlers||(M.editor_atto.textupdatedhandlers[e]=[]),M.editor_atto.textupdatedhandlers[e].push(t)},add_toolbar_menu:function(t,n,r,i,s){var o=e.one("#"+t+"_toolbar"),u=e.one("#"+t+"_toolbar .atto_group."+i+"_group"),a,f,l,c;u||(u=e.Node.create('<div class="atto_group '+i+'_group"></div>'),o.append(u)),l=M.util.image_url(r[0],r[1]),c=M.util.image_url("t/expanded","moodle"),f=e.Node.create('<button class="atto_'+n+'_button atto_hasmenu" '+'data-editor="'+e.Escape.html(t)+'" '+'tabindex="-1" '+'data-menu="'+n+"_"+t+'" '+'title="'+e.Escape.html(M.util.get_string("pluginname","atto_"+n))+'">'+'<img class="icon" aria-hidden="true" role="presentation" width="16" height="16" src="'+l+'"/>'+'<img class="icon" aria-hidden="true" role="presentation" width="16" height="16" src="'+c+'"/>'+"</button>"),u.append(f),a=o.getAttribute("aria-activedescendant"),a||(f.setAttribute("tabindex","0"),o.setAttribute("aria-activedescendant",f.generateID())),M.editor_atto.widgets[n]=n;var h=e.Node.create('<div class="atto_'+n+"_menu"+' atto_menu" data-editor="'+e.Escape.html(t)+'"></div>'),p=0,d={};for(p=0;p<s.length;p++)d=s[p],h.append(e.Node.create('<div class="atto_menuentry"><a href="#" class="atto_'+n+"_action_"+p+'" '+'data-editor="'+e.Escape.html(t)+'" '+'data-plugin="'+e.Escape.html(n)+'" '+'data-handler="'+e.Escape.html(n+"_action_"+p)+'">'+d.text+"</a>"+"</div>")),M.editor_atto.buttonhandlers[n+"_action_"+p]||(e.one("body").delegate("click",M.editor_atto.buttonclicked_handler,".atto_"+n+"_action_"+p),e.one("body").delegate("key",M.editor_atto.buttonclicked_handler,"space,enter",".atto_"+n+"_action_"+p),M.editor_atto.buttonhandlers[n+"_action_"+p]=d.handler);M.editor_atto.buttonhandlers[n]||(e.one("body").delegate("click",M.editor_atto.showhide_menu_handler,".atto_"+n+"_button"),M.editor_atto.buttonhandlers[n]=!0);var v=new M.core.dialogue({bodyContent:h,visible:!1,width:"14em",zindex:100,lightbox:!1,closeButton:!1,centered:!1,align:{node:f,points:[e.WidgetPositionAlign.TL,e.WidgetPositionAlign.BL]}});M.editor_atto.menus[n+"_"+t]=v,v.render(),v.hide(),v.headerNode.hide()},add_toolbar_button:function(t,n,r,i,s){var o=e.one("#"+t+"_toolbar"),u=e.one("#"+t+"_toolbar .atto_group."+i+"_group"),a,f,l;u||(u=e.Node.create('<div class="atto_group '+i+'_group"></div>'),o.append(u)),l=M.util.image_url(r[0],r[1]),a=e.Node.create('<button class="atto_'+n+'_button" '+'data-editor="'+e.Escape.html(t)+'" '+'data-plugin="'+e.Escape.html(n)+'" '+'tabindex="-1" '+'data-handler="'+e.Escape.html(n)+'" '+'title="'+e.Escape.html(M.util.get_string("pluginname","atto_"+n))+'">'+'<img class="icon" aria-hidden="true" role="presentation" width="16" height="16" src="'+l+'"/>'+"</button>"),u.append(a),f=o.getAttribute("aria-activedescendant"),f||(a.setAttribute("tabindex","0"),o.setAttribute("aria-activedescendant",a.generateID())),M.editor_atto.buttonhandlers[n]||(e.one("body").delegate("click",M.editor_atto.buttonclicked_handler,".atto_"+n+"_button"),M.editor_atto.buttonhandlers[n]=s),M.editor_atto.widgets[n]=n},is_active:function(t){var n=M.editor_atto.get_selection();n.length&&(n=n.pop());var r=null;return n.parentElement?r=e.one(n.parentElement()):r=e.one(n.startContainer),r&&r.ancestor("#"+t+"editable")!==null},focus:function(t){e.one("#"+t+"editable").focus()},init:function(t){var n=e.one("#"+t.elementid),r=e.Node.create('<div class="'+CSS.WRAPPER+'" />'),i=e.Node.create('<div id="'+t.elementid+'editable" '+'contenteditable="true" '+'spellcheck="true" '+'class="'+CSS.CONTENT+'" />'),s="",o=e.Node.create('<div class="'+CSS.TOOLBAR+'" id="'+t.elementid+'_toolbar" role="toolbar"/>'),u=e.Node.create('<div class="'+CSS.CONTENTWRAPPER+'" />');u.appendChild(i),r.appendChild(o),r.appendChild(u);var a=e.io(t.content_css,{sync:!0}),f=a.responseText.indexOf("font:");f&&(s=a.responseText.substring(f+"font:".length,a.responseText.length-1),i.setStyle("font",s)),i.setStyle("minHeight",1.2*n.getAttribute("rows")+"em"),i.append(n.get("value")),n.get("parentNode").insert(r,n),i.setStyle("color",n.getStyle("color")),i.setStyle("lineHeight",n.getStyle("lineHeight")),i.setStyle("fontSize",n.getStyle("fontSize")),n.hide(),i.on("blur",function(){this.text_updated(t.elementid)},this),e.one(e.config.doc.body).delegate("key",this.keyboard_navigation,"down:37,39","#"+t.elementid+"_toolbar",this,t.elementid),M.editor_atto.filepickeroptions[t.elementid]=t.filepickeroptions},text_updated:function(t){var n=e.one("#"+t
),r=this.get_clean_html(t);n.set("value",r);var i=0;if(t in M.editor_atto.textupdatedhandlers)for(i=0;i<M.editor_atto.textupdatedhandlers[t].length;i++){var s=M.editor_atto.textupdatedhandlers[t][i];s(t)}},get_clean_html:function(t){var n=e.one("#"+t+"editable").cloneNode(!0);return e.each(n.all("[id]"),function(e){var t=e.get("id");t.indexOf("yui")===0&&e.removeAttribute("id")}),e.each(n.all(".atto_control"),function(e){e.remove(!0)}),n.getHTML()},keyboard_navigation:function(t,n){var r,i,s,o;t.preventDefault(),r=e.all("#"+n+"_toolbar button"),s=e.one("#"+n+"_toolbar").getAttribute("aria-activedescendant");if(!s)return;i=e.one("#"+s),i.setAttribute("tabindex","-1"),o=r.indexOf(i),t.keyCode===37?(o--,o<0&&(o=r.size()-1)):(o++,o>=r.size()&&(o=0)),i=r.item(o),i.setAttribute("tabindex","0"),i.focus(),e.one("#"+n+"_toolbar").setAttribute("aria-activedescendant",i.generateID())},show_filepicker:function(t,n,r){e.use("core_filepicker",function(e){var i=M.editor_atto.filepickeroptions[t][n];i.formcallback=r,i.editor_target=e.one(t),M.core_filepicker.show(e,i)})},get_selection_from_node:function(e){var t;return window.getSelection?(t=document.createRange(),t.setStartBefore(e.getDOMNode()),t.setEndAfter(e.getDOMNode()),[t]):document.selection?(t=document.body.createTextRange(),t.moveToElementText(e.getDOMNode()),t):!1},get_selection:function(){if(window.getSelection){var e=window.getSelection(),t=[],n=0;for(n=0;n<e.rangeCount;n++)t.push(e.getRangeAt(n));return t}return document.selection&&document.selection.createRange?document.selection.createRange():!1},selection_contains_node:function(e){var t,n;if(window.getSelection){n=window.getSelection();if(n.containsNode)return n.containsNode(e.getDOMNode(),!0)}return n=document.selection.createRange(),t=n.duplicate(),t.moveToElementText(e.getDOMNode()),n.inRange(t)},get_selection_parent_node:function(){var e=M.editor_atto.get_selection();if(e.length>0)return e[0].commonAncestorContainer},get_selection_text:function(){var e=M.editor_atto.get_selection();if(e.length>0&&e[0].cloneContents)return e[0].cloneContents()},set_selection:function(e){var t,n;if(window.getSelection){t=window.getSelection(),t.removeAllRanges();for(n=0;n<e.length;n++)t.addRange(e[n])}else document.selection&&e.select&&e.select()}};var n="Controlmenu",r;r=function(e){e.draggable=!1,e.centered=!1,e.width="auto",e.lightbox=!1,e.footerContent="",r.superclass.constructor.apply(this,[e])},e.extend(r,M.core.dialogue,{initializer:function(t){var n,i,s;r.superclass.initializer.call(this,t),s=this.get("boundingBox"),s.addClass("editor_atto_controlmenu"),n=this.bodyNode,i=e.Node.create("<h3/>"),i.addClass("accesshide"),i.setHTML(this.get("headerText")),n.prepend(i),n.on("clickoutside",function(e){this.get("visible")&&(e.target.ancestor(".atto_control")||(e.preventDefault(),this.hide()))},this)}},{NAME:n,ATTRS:{headerText:{value:""}}}),M.editor_atto=M.editor_atto||{},M.editor_atto.controlmenu=r},"@VERSION@",{requires:["node","io","overlay","escape","event","moodle-core-notification"]});
