window.CodeMirror=function(){"use strict";function w(a,c){if(!(this instanceof w))return new w(a,c);this.options=c=c||{};for(var d in Sc)!c.hasOwnProperty(d)&&Sc.hasOwnProperty(d)&&(c[d]=Sc[d]);I(c);var e="string"==typeof c.value?0:c.value.first,f=this.display=x(a,e);f.wrapper.CodeMirror=this,F(this),c.autofocus&&!o&&Hb(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,focused:!1,suppressEdits:!1,pasteIncoming:!1,draggingText:!1,highlight:new Ke},D(this),c.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap");var g=c.value;"string"==typeof g&&(g=new Yd(c.value,c.mode)),zb(this,ae)(this,g),b&&setTimeout(Ue(Gb,this,!0),20),Jb(this);var h;try{h=document.activeElement==f.input}catch(i){}h||c.autofocus&&!o?setTimeout(Ue(dc,this),20):ec(this),zb(this,function(){for(var a in Rc)Rc.propertyIsEnumerable(a)&&Rc[a](this,c[a],Uc);for(var b=0;Yc.length>b;++b)Yc[b](this)})()}function x(a,b){var d={},f=d.input=Ze("textarea",null,null,"position: absolute; padding: 0; width: 1px; height: 1em; outline: none; font-size: 4px;");e?f.style.width="1000px":f.setAttribute("wrap","off"),n&&(f.style.border="1px solid black"),f.setAttribute("autocorrect","off"),f.setAttribute("autocapitalize","off"),d.inputDiv=Ze("div",[f],null,"overflow: hidden; position: relative; width: 3px; height: 0px;"),d.scrollbarH=Ze("div",[Ze("div",null,null,"height: 1px")],"CodeMirror-hscrollbar"),d.scrollbarV=Ze("div",[Ze("div",null,null,"width: 1px")],"CodeMirror-vscrollbar"),d.scrollbarFiller=Ze("div",null,"CodeMirror-scrollbar-filler"),d.lineDiv=Ze("div"),d.selectionDiv=Ze("div",null,null,"position: relative; z-index: 1"),d.cursor=Ze("div","\u00a0","CodeMirror-cursor"),d.otherCursor=Ze("div","\u00a0","CodeMirror-cursor CodeMirror-secondarycursor"),d.measure=Ze("div",null,"CodeMirror-measure"),d.lineSpace=Ze("div",[d.measure,d.selectionDiv,d.lineDiv,d.cursor,d.otherCursor],null,"position: relative; outline: none"),d.mover=Ze("div",[Ze("div",[d.lineSpace],"CodeMirror-lines")],null,"position: relative"),d.sizer=Ze("div",[d.mover],"CodeMirror-sizer"),d.heightForcer=Ze("div",null,null,"position: absolute; height: "+Ie+"px; width: 1px;"),d.gutters=Ze("div",null,"CodeMirror-gutters"),d.lineGutter=null;var g=Ze("div",[d.sizer,d.heightForcer,d.gutters],null,"position: relative; min-height: 100%");return d.scroller=Ze("div",[g],"CodeMirror-scroll"),d.scroller.setAttribute("tabIndex","-1"),d.wrapper=Ze("div",[d.inputDiv,d.scrollbarH,d.scrollbarV,d.scrollbarFiller,d.scroller],"CodeMirror"),c&&(d.gutters.style.zIndex=-1,d.scroller.style.paddingRight=0),a.appendChild?a.appendChild(d.wrapper):a(d.wrapper),n&&(f.style.width="0px"),e||(d.scroller.draggable=!0),j?(d.inputDiv.style.height="1px",d.inputDiv.style.position="absolute"):c&&(d.scrollbarH.style.minWidth=d.scrollbarV.style.minWidth="18px"),d.viewOffset=d.lastSizeC=0,d.showingFrom=d.showingTo=b,d.lineNumWidth=d.lineNumInnerWidth=d.lineNumChars=null,d.prevInput="",d.alignWidgets=!1,d.pollingFast=!1,d.poll=new Ke,d.cachedCharWidth=d.cachedTextHeight=null,d.measureLineCache=[],d.measureLineCachePos=0,d.inaccurateSelection=!1,d.maxLine=null,d.maxLineLength=0,d.maxLineChanged=!1,d.wheelDX=d.wheelDY=d.wheelStartX=d.wheelStartY=null,d}function y(a){a.doc.mode=w.getMode(a.options,a.doc.modeOption),a.doc.iter(function(a){a.stateAfter&&(a.stateAfter=null),a.styles&&(a.styles=null)}),a.doc.frontier=a.doc.first,_(a,100),a.state.modeGen++,a.curOp&&Cb(a)}function z(a){a.options.lineWrapping?(a.display.wrapper.className+=" CodeMirror-wrap",a.display.sizer.style.minWidth=""):(a.display.wrapper.className=a.display.wrapper.className.replace(" CodeMirror-wrap",""),H(a)),B(a),Cb(a),lb(a),setTimeout(function(){J(a.display,a.doc.height)},100)}function A(a){var b=ub(a.display),c=a.options.lineWrapping,d=c&&Math.max(5,a.display.scroller.clientWidth/vb(a.display)-3);return function(e){return wd(a.doc,e)?0:c?(Math.ceil(e.text.length/d)||1)*b:b}}function B(a){var b=a.doc,c=A(a);b.iter(function(a){var b=c(a);b!=a.height&&ee(a,b)})}function C(a){var b=ad[a.options.keyMap].style;a.display.wrapper.className=a.display.wrapper.className.replace(/\s*cm-keymap-\S+/g,"")+(b?" cm-keymap-"+b:"")}function D(a){a.display.wrapper.className=a.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+a.options.theme.replace(/(^|\s)\s*/g," cm-s-"),lb(a)}function E(a){F(a),Cb(a)}function F(a){var b=a.display.gutters,c=a.options.gutters;$e(b);for(var d=0;c.length>d;++d){var e=c[d],f=b.appendChild(Ze("div",null,"CodeMirror-gutter "+e));"CodeMirror-linenumbers"==e&&(a.display.lineGutter=f,f.style.width=(a.display.lineNumWidth||1)+"px")}b.style.display=d?"":"none"}function G(a,b){if(0==b.height)return 0;for(var d,c=b.text.length,e=b;d=td(e);){var f=d.find();e=be(a,f.from.line),c+=f.from.ch-f.to.ch}for(e=b;d=ud(e);){var f=d.find();c-=e.text.length-f.from.ch,e=be(a,f.to.line),c+=e.text.length-f.to.ch}return c}function H(a){var b=a.display,c=a.doc;b.maxLine=be(c,c.first),b.maxLineLength=G(c,b.maxLine),b.maxLineChanged=!0,c.iter(function(a){var d=G(c,a);d>b.maxLineLength&&(b.maxLineLength=d,b.maxLine=a)})}function I(a){for(var b=!1,c=0;a.gutters.length>c;++c)"CodeMirror-linenumbers"==a.gutters[c]&&(a.lineNumbers?b=!0:a.gutters.splice(c--,1));!b&&a.lineNumbers&&a.gutters.push("CodeMirror-linenumbers")}function J(a,b){var c=b+eb(a);a.sizer.style.minHeight=a.heightForcer.style.top=c+"px";var d=Math.max(c,a.scroller.scrollHeight),e=a.scroller.scrollWidth>a.scroller.clientWidth,f=d>a.scroller.clientHeight;f?(a.scrollbarV.style.display="block",a.scrollbarV.style.bottom=e?ff(a.measure)+"px":"0",a.scrollbarV.firstChild.style.height=d-a.scroller.clientHeight+a.scrollbarV.clientHeight+"px"):a.scrollbarV.style.display="",e?(a.scrollbarH.style.display="block",a.scrollbarH.style.right=f?ff(a.measure)+"px":"0",a.scrollbarH.firstChild.style.width=a.scroller.scrollWidth-a.scroller.clientWidth+a.scrollbarH.clientWidth+"px"):a.scrollbarH.style.display="",e&&f?(a.scrollbarFiller.style.display="block",a.scrollbarFiller.style.height=a.scrollbarFiller.style.width=ff(a.measure)+"px"):a.scrollbarFiller.style.display="",k&&0===ff(a.measure)&&(a.scrollbarV.style.minWidth=a.scrollbarH.style.minHeight=l?"18px":"12px")}function K(a,b,c){var d=a.scroller.scrollTop,e=a.wrapper.clientHeight;"number"==typeof c?d=c:c&&(d=c.top,e=c.bottom-c.top),d=Math.floor(d-db(a));var f=Math.ceil(d+e);return{from:ge(b,d),to:ge(b,f)}}function L(a){var b=a.display;if(b.alignWidgets||b.gutters.firstChild&&a.options.fixedGutter){for(var c=O(b)-b.scroller.scrollLeft+a.doc.scrollLeft,d=b.gutters.offsetWidth,e=c+"px",f=b.lineDiv.firstChild;f;f=f.nextSibling)if(f.alignable)for(var g=0,h=f.alignable;h.length>g;++g)h[g].style.left=e;a.options.fixedGutter&&(b.gutters.style.left=c+d+"px")}}function M(a){if(!a.options.lineNumbers)return!1;var b=a.doc,c=N(a.options,b.first+b.size-1),d=a.display;if(c.length!=d.lineNumChars){var e=d.measure.appendChild(Ze("div",[Ze("div",c)],"CodeMirror-linenumber CodeMirror-gutter-elt")),f=e.firstChild.offsetWidth,g=e.offsetWidth-f;return d.lineGutter.style.width="",d.lineNumInnerWidth=Math.max(f,d.lineGutter.offsetWidth-g),d.lineNumWidth=d.lineNumInnerWidth+g,d.lineNumChars=d.lineNumInnerWidth?c.length:-1,d.lineGutter.style.width=d.lineNumWidth+"px",!0}return!1}function N(a,b){return a.lineNumberFormatter(b+a.firstLineNumber)+""}function O(a){return bf(a.scroller).left-bf(a.sizer).left}function P(a,b,c){for(var f,d=a.display.showingFrom,e=a.display.showingTo,g=K(a.display,a.doc,c);Q(a,b,g)&&(f=!0,Fe(a,"update",a),(a.display.showingFrom!=d||a.display.showingTo!=e)&&Fe(a,"viewportChange",a,a.display.showingFrom,a.display.showingTo),X(a),J(a.display,a.doc.height),c&&(c=Math.min(a.display.scroller.scrollHeight-a.display.scroller.clientHeight,"number"==typeof c?c:c.top)),g=K(a.display,a.doc,c),!(g.from>=a.display.showingFrom&&g.to<=a.display.showingTo));)b=[];return f}function Q(a,b,d){var e=a.display,f=a.doc;if(!e.wrapper.clientWidth)return e.showingFrom=e.showingTo=f.first,e.viewOffset=0,void 0;if(!(0==b.length&&d.from>e.showingFrom&&d.to<e.showingTo)){M(a)&&(b=[{from:f.first,to:f.first+f.size}]);var g=e.sizer.style.marginLeft=e.gutters.offsetWidth+"px";e.scrollbarH.style.left=a.options.fixedGutter?g:"0";var h=1/0;if(a.options.lineNumbers)for(var i=0;b.length>i;++i)if(b[i].diff){h=b[i].from;break}var j=f.first+f.size,k=Math.max(d.from-a.options.viewportMargin,f.first),l=Math.min(j,d.to+a.options.viewportMargin);if(k>e.showingFrom&&20>k-e.showingFrom&&(k=Math.max(f.first,e.showingFrom)),e.showingTo>l&&20>e.showingTo-l&&(l=Math.min(j,e.showingTo)),v)for(k=fe(vd(f,be(f,k)));j>l&&wd(f,be(f,l));)++l;var m=[{from:Math.max(e.showingFrom,f.first),to:Math.min(e.showingTo,j)}];if(m=m[0].from>=m[0].to?[]:S(m,b),v)for(var i=0;m.length>i;++i)for(var o,n=m[i];o=ud(be(f,n.to-1));){var p=o.find().from.line;if(!(p>n.from)){m.splice(i--,1);break}n.to=p}for(var q=0,i=0;m.length>i;++i){var n=m[i];k>n.from&&(n.from=k),n.to>l&&(n.to=l),n.from>=n.to?m.splice(i--,1):q+=n.to-n.from}if(q==l-k&&k==e.showingFrom&&l==e.showingTo)return R(a),void 0;m.sort(function(a,b){return a.from-b.from});try{var r=document.activeElement}catch(s){}.7*(l-k)>q&&(e.lineDiv.style.display="none"),U(a,k,l,m,h),e.lineDiv.style.display="",r&&document.activeElement!=r&&r.offsetHeight&&r.focus();var t=k!=e.showingFrom||l!=e.showingTo||e.lastSizeC!=e.wrapper.clientHeight;t&&(e.lastSizeC=e.wrapper.clientHeight),e.showingFrom=k,e.showingTo=l,_(a,100);for(var x,u=e.lineDiv.offsetTop,w=e.lineDiv.firstChild;w;w=w.nextSibling)if(w.lineObj){if(c){var y=w.offsetTop+w.offsetHeight;x=y-u,u=y}else{var z=bf(w);x=z.bottom-z.top}var A=w.lineObj.height-x;if(2>x&&(x=ub(e)),A>.001||-.001>A){ee(w.lineObj,x);var B=w.lineObj.widgets;if(B)for(var i=0;B.length>i;++i)B[i].height=B[i].node.offsetHeight}}return R(a),!0}}function R(a){var b=a.display.viewOffset=he(a,be(a.doc,a.display.showingFrom));a.display.mover.style.top=b+"px"}function S(a,b){for(var c=0,d=b.length||0;d>c;++c){for(var e=b[c],f=[],g=e.diff||0,h=0,i=a.length;i>h;++h){var j=a[h];e.to<=j.from&&e.diff?f.push({from:j.from+g,to:j.to+g}):e.to<=j.from||e.from>=j.to?f.push(j):(e.from>j.from&&f.push({from:j.from,to:e.from}),e.to<j.to&&f.push({from:e.to+g,to:j.to+g}))}a=f}return a}function T(a){for(var b=a.display,c={},d={},e=b.gutters.firstChild,f=0;e;e=e.nextSibling,++f)c[a.options.gutters[f]]=e.offsetLeft,d[a.options.gutters[f]]=e.offsetWidth;return{fixedPos:O(b),gutterTotalWidth:b.gutters.offsetWidth,gutterLeft:c,gutterWidth:d,wrapperWidth:b.wrapper.clientWidth}}function U(a,b,c,d,f){function l(b){var c=b.nextSibling;return e&&p&&a.display.currentWheelTarget==b?(b.style.display="none",b.lineObj=null):b.parentNode.removeChild(b),c}var g=T(a),h=a.display,i=a.options.lineNumbers;d.length||e&&a.display.currentWheelTarget||$e(h.lineDiv);var j=h.lineDiv,k=j.firstChild,m=d.shift(),n=b;for(a.doc.iter(b,c,function(b){if(m&&m.to==n&&(m=d.shift()),wd(a.doc,b)){if(0!=b.height&&ee(b,0),b.widgets&&k.previousSibling)for(var c=0;b.widgets.length>c;++c)if(b.widgets[c].showIfHidden){var e=k.previousSibling;if(/pre/i.test(e.nodeName)){var h=Ze("div",null,null,"position: relative");e.parentNode.replaceChild(h,e),h.appendChild(e),e=h}var o=e.appendChild(Ze("div",[b.widgets[c].node],"CodeMirror-linewidget"));W(b.widgets[c],o,e,g)}}else if(m&&n>=m.from&&m.to>n){for(;k.lineObj!=b;)k=l(k);i&&n>=f&&k.lineNumber&&af(k.lineNumber,N(a.options,n)),k=k.nextSibling}else{if(b.widgets)for(var r,p=0,q=k;q&&20>p;++p,q=q.nextSibling)if(q.lineObj==b&&/div/i.test(q.nodeName)){r=q;break}var s=V(a,b,n,g,r);if(s!=r)j.insertBefore(s,k);else{for(;k!=r;)k=l(k);k=k.nextSibling}s.lineObj=b}++n});k;)k=l(k)}function V(a,b,d,e,f){var j,g=Nd(a,b),h=b.gutterMarkers,i=a.display;if(!(a.options.lineNumbers||h||b.bgClass||b.wrapClass||b.widgets))return g;if(f){f.alignable=null;for(var n,k=!0,l=0,m=f.firstChild;m;m=n)if(n=m.nextSibling,/\bCodeMirror-linewidget\b/.test(m.className)){for(var o=0,p=!0;b.widgets.length>o;++o){var q=b.widgets[o],r=!1;if(q.above||(r=p,p=!1),q.node==m.firstChild){W(q,m,f,e),++l,r&&f.insertBefore(g,m);break}}if(o==b.widgets.length){k=!1;break}}else f.removeChild(m);k&&l==b.widgets.length&&(j=f,f.className=b.wrapClass||"")}if(j||(j=Ze("div",null,b.wrapClass,"position: relative"),j.appendChild(g)),b.bgClass&&j.insertBefore(Ze("div",null,b.bgClass+" CodeMirror-linebackground"),j.firstChild),a.options.lineNumbers||h){var s=j.insertBefore(Ze("div",null,null,"position: absolute; left: "+(a.options.fixedGutter?e.fixedPos:-e.gutterTotalWidth)+"px"),j.firstChild);if(a.options.fixedGutter&&(j.alignable||(j.alignable=[])).push(s),!a.options.lineNumbers||h&&h["CodeMirror-linenumbers"]||(j.lineNumber=s.appendChild(Ze("div",N(a.options,d),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+e.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+i.lineNumInnerWidth+"px"))),h)for(var t=0;a.options.gutters.length>t;++t){var u=a.options.gutters[t],v=h.hasOwnProperty(u)&&h[u];v&&s.appendChild(Ze("div",[v],"CodeMirror-gutter-elt","left: "+e.gutterLeft[u]+"px; width: "+e.gutterWidth[u]+"px"))}}if(c&&(j.style.zIndex=2),b.widgets&&j!=f)for(var o=0,w=b.widgets;w.length>o;++o){var q=w[o],x=Ze("div",[q.node],"CodeMirror-linewidget");W(q,x,j,e),q.above?j.insertBefore(x,a.options.lineNumbers&&0!=b.height?s:g):j.appendChild(x),Fe(q,"redraw")}return j}function W(a,b,c,d){if(a.noHScroll){(c.alignable||(c.alignable=[])).push(b);var e=d.wrapperWidth;b.style.left=d.fixedPos+"px",a.coverGutter||(e-=d.gutterTotalWidth,b.style.paddingLeft=d.gutterTotalWidth+"px"),b.style.width=e+"px"}a.coverGutter&&(b.style.zIndex=5,b.style.position="relative",a.noHScroll||(b.style.marginLeft=-d.gutterTotalWidth+"px"))}function X(a){var b=a.display,c=tc(a.doc.sel.from,a.doc.sel.to);if(c||a.options.showCursorWhenSelecting?Y(a):b.cursor.style.display=b.otherCursor.style.display="none",c?b.selectionDiv.style.display="none":Z(a),a.options.moveInputWithCursor){var d=pb(a,a.doc.sel.head,"div"),e=bf(b.wrapper),f=bf(b.lineDiv);b.inputDiv.style.top=Math.max(0,Math.min(b.wrapper.clientHeight-10,d.top+f.top-e.top))+"px",b.inputDiv.style.left=Math.max(0,Math.min(b.wrapper.clientWidth-10,d.left+f.left-e.left))+"px"}}function Y(a){var b=a.display,c=pb(a,a.doc.sel.head,"div");b.cursor.style.left=c.left+"px",b.cursor.style.top=c.top+"px",b.cursor.style.height=Math.max(0,c.bottom-c.top)*a.options.cursorHeight+"px",b.cursor.style.display="",c.other?(b.otherCursor.style.display="",b.otherCursor.style.left=c.other.left+"px",b.otherCursor.style.top=c.other.top+"px",b.otherCursor.style.height=.85*(c.other.bottom-c.other.top)+"px"):b.otherCursor.style.display="none"}function Z(a){function h(a,b,c,d){0>b&&(b=0),e.appendChild(Ze("div",null,"CodeMirror-selected","position: absolute; left: "+a+"px; top: "+b+"px; width: "+(null==c?f-a:c)+"px; height: "+(d-b)+"px"))}function i(b,d,e,i){function m(c){return ob(a,sc(b,c),"div",j)}var j=be(c,b),k=j.text.length,l=i?1/0:-1/0;return nf(ie(j),d||0,null==e?k:e,function(a,b,c){var n,o,p,j=m(a);if(a==b)n=j,o=p=j.left;else{if(n=m(b-1),"rtl"==c){var q=j;j=n,n=q}o=j.left,p=n.right}n.top-j.top>3&&(h(o,j.top,null,j.bottom),o=g,j.bottom<n.top&&h(o,j.bottom,null,n.top)),null==e&&b==k&&(p=f),null==d&&0==a&&(o=g),l=i?Math.min(n.top,l):Math.max(n.bottom,l),g+1>o&&(o=g),h(o,n.top,p-o,n.bottom)}),l}var b=a.display,c=a.doc,d=a.doc.sel,e=document.createDocumentFragment(),f=b.lineSpace.offsetWidth,g=fb(a.display);if(d.from.line==d.to.line)i(d.from.line,d.from.ch,d.to.ch);else{for(var l,n,j=be(c,d.from.line),k=j,m=[d.from.line,d.from.ch];l=ud(k);){var o=l.find();if(m.push(o.from.ch,o.to.line,o.to.ch),o.to.line==d.to.line){m.push(d.to.ch),n=!0;break}k=be(c,o.to.line)}if(n)for(var p=0;m.length>p;p+=3)i(m[p],m[p+1],m[p+2]);else{var q,r,s=be(c,d.to.line);q=d.from.ch?i(d.from.line,d.from.ch,null,!1):he(a,j)-b.viewOffset,r=d.to.ch?i(d.to.line,td(s)?null:0,d.to.ch,!0):he(a,s)-b.viewOffset,r>q&&h(g,q,null,r)}}_e(b.selectionDiv,e),b.selectionDiv.style.display=""}function $(a){if(a.state.focused){var b=a.display;clearInterval(b.blinker);var c=!0;b.cursor.style.visibility=b.otherCursor.style.visibility="",b.blinker=setInterval(function(){b.cursor.style.visibility=b.otherCursor.style.visibility=(c=!c)?"":"hidden"},a.options.cursorBlinkRate)}}function _(a,b){a.doc.mode.startState&&a.doc.frontier<a.display.showingTo&&a.state.highlight.set(b,Ue(ab,a))}function ab(a){var b=a.doc;if(b.frontier<b.first&&(b.frontier=b.first),!(b.frontier>=a.display.showingTo)){var f,c=+new Date+a.options.workTime,d=Zc(b.mode,cb(a,b.frontier)),e=[];b.iter(b.frontier,Math.min(b.first+b.size,a.display.showingTo+500),function(g){if(b.frontier>=a.display.showingFrom){var h=g.styles;g.styles=Id(a,g,d);for(var i=!h||h.length!=g.styles.length,j=0;!i&&h.length>j;++j)i=h[j]!=g.styles[j];i&&(f&&f.end==b.frontier?f.end++:e.push(f={start:b.frontier,end:b.frontier+1})),g.stateAfter=Zc(b.mode,d)}else Kd(a,g,d),g.stateAfter=0==b.frontier%5?Zc(b.mode,d):null;return++b.frontier,+new Date>c?(_(a,a.options.workDelay),!0):void 0}),e.length&&zb(a,function(){for(var a=0;e.length>a;++a)Cb(this,e[a].start,e[a].end)})()}}function bb(a,b){for(var c,d,e=a.doc,f=b,g=b-100;f>g;--f){if(e.first>=f)return e.first;var h=be(e,f-1);if(h.stateAfter)return f;var i=Le(h.text,null,a.options.tabSize);(null==d||c>i)&&(d=f-1,c=i)}return d}function cb(a,b){var c=a.doc,d=a.display;if(!c.mode.startState)return!0;var e=bb(a,b),f=e>c.first&&be(c,e-1).stateAfter;return f=f?Zc(c.mode,f):$c(c.mode),c.iter(e,b,function(g){Kd(a,g,f);var h=e==b-1||0==e%5||e>=d.showingFrom&&d.showingTo>e;g.stateAfter=h?Zc(c.mode,f):null,++e}),f}function db(a){return a.lineSpace.offsetTop}function eb(a){return a.mover.offsetHeight-a.lineSpace.offsetHeight}function fb(a){var b=_e(a.measure,Ze("pre",null,null,"text-align: left")).appendChild(Ze("span","x"));return b.offsetLeft}function gb(a,b,c,d){var e=-1;d=d||ib(a,b);for(var f=c;;f+=e){var g=d[f];if(g)break;0>e&&0==f&&(e=1)}return{left:c>f?g.right:g.left,right:f>c?g.left:g.right,top:g.top,bottom:g.bottom}}function hb(a,b){for(var c=a.display.measureLineCache,d=0;c.length>d;++d){var e=c[d];if(e.text==b.text&&e.markedSpans==b.markedSpans&&a.display.scroller.clientWidth==e.width&&e.classes==b.textClass+"|"+b.bgClass+"|"+b.wrapClass)return e.measure}}function ib(a,b){var c=hb(a,b);if(!c){c=jb(a,b);var d=a.display.measureLineCache,e={text:b.text,width:a.display.scroller.clientWidth,markedSpans:b.markedSpans,measure:c,classes:b.textClass+"|"+b.bgClass+"|"+b.wrapClass};16==d.length?d[++a.display.measureLineCachePos%16]=e:d.push(e)}return c}function jb(a,e){var f=a.display,g=Te(e.text.length),h=Nd(a,e,g);if(b&&!c&&!a.options.lineWrapping&&h.childNodes.length>100){for(var i=document.createDocumentFragment(),j=10,k=h.childNodes.length,l=0,m=Math.ceil(k/j);m>l;++l){for(var n=Ze("div",null,null,"display: inline-block"),o=0;j>o&&k;++o)n.appendChild(h.firstChild),--k;i.appendChild(n)}h.appendChild(i)}_e(f.measure,h);var p=bf(f.lineDiv),q=[],r=Te(e.text.length),s=h.offsetHeight;d&&f.measure.first!=h&&_e(f.measure,h);for(var t,l=0;g.length>l;++l)if(t=g[l]){for(var u=bf(t),v=Math.max(0,u.top-p.top),w=Math.min(u.bottom-p.top,s),o=0;q.length>o;o+=2){var x=q[o],y=q[o+1];if(!(x>w||v>y)&&(v>=x&&y>=w||x>=v&&w>=y||Math.min(w,y)-Math.max(v,x)>=w-v>>1)){q[o]=Math.min(v,x),q[o+1]=Math.max(w,y);break}}o==q.length&&q.push(v,w);var z=u.right;t.measureRight&&(z=bf(t.measureRight).left),r[l]={left:u.left-p.left,right:z-p.left,top:o}}for(var t,l=0;r.length>l;++l)if(t=r[l]){var A=t.top;t.top=q[A],t.bottom=q[A+1]}return r}function kb(a,b){var c=!1;if(b.markedSpans)for(var d=0;b.markedSpans>d;++d){var e=b.markedSpans[d];!e.collapsed||null!=e.to&&e.to!=b.text.length||(c=!0)}var f=!c&&hb(a,b);if(f)return gb(a,b,b.text.length,f).right;var g=Nd(a,b),h=g.appendChild(hf(a.display.measure));return _e(a.display.measure,g),bf(h).right-bf(a.display.lineDiv).left}function lb(a){a.display.measureLineCache.length=a.display.measureLineCachePos=0,a.display.cachedCharWidth=a.display.cachedTextHeight=null,a.options.lineWrapping||(a.display.maxLineChanged=!0),a.display.lineNumChars=null}function mb(a,b,c,d){if(b.widgets)for(var e=0;b.widgets.length>e;++e)if(b.widgets[e].above){var f=Cd(b.widgets[e]);c.top+=f,c.bottom+=f}if("line"==d)return c;d||(d="local");var g=he(a,b);if("local"!=d&&(g-=a.display.viewOffset),"page"==d){var h=bf(a.display.lineSpace);g+=h.top+(window.pageYOffset||(document.documentElement||document.body).scrollTop);var i=h.left+(window.pageXOffset||(document.documentElement||document.body).scrollLeft);c.left+=i,c.right+=i}return c.top+=g,c.bottom+=g,c}function nb(a,b,c){if("div"==c)return b;var d=b.left,e=b.top;"page"==c&&(d-=window.pageXOffset||(document.documentElement||document.body).scrollLeft,e-=window.pageYOffset||(document.documentElement||document.body).scrollTop);var f=bf(a.display.lineSpace);if(d-=f.left,e-=f.top,"local"==c||!c){var g=bf(a.display.wrapper);d+=g.left,e+=g.top}return{left:d,top:e}}function ob(a,b,c,d){return d||(d=be(a.doc,b.line)),mb(a,d,gb(a,d,b.ch),c)}function pb(a,b,c,d,e){function f(b,f){var g=gb(a,d,b,e);return f?g.left=g.right:g.right=g.left,mb(a,d,g,c)}d=d||be(a.doc,b.line),e||(e=ib(a,d));var g=ie(d),h=b.ch;if(!g)return f(h);for(var i,j,k=g[0].level,l=0;g.length>l;++l){var o,p,m=g[l],n=m.level%2;if(h>m.from&&m.to>h)return f(h,n);var q=n?m.to:m.from,r=n?m.from:m.to;if(q==h)p=l&&m.level<(o=g[l-1]).level?f(o.level%2?o.from:o.to-1,!0):f(n&&m.from!=m.to?h-1:h),n==k?i=p:j=p;else if(r==h){var o=g.length-1>l&&g[l+1];if(!n&&o&&o.from==o.to)continue;p=o&&m.level<o.level?f(o.level%2?o.to-1:o.from):f(n?h:h-1,!0),n==k?i=p:j=p}}return k&&!h&&(j=f(g[0].to-1)),i?(j&&(i.other=j),i):j}function qb(a,b,c){var d=new sc(a,b);return c&&(d.outside=!0),d}function rb(a,b,c){var d=a.doc;if(c+=a.display.viewOffset,0>c)return qb(d.first,0,!0);var e=ge(d,c),f=d.first+d.size-1;if(e>f)return qb(d.first+d.size-1,be(d,f).text.length,!0);for(0>b&&(b=0);;){var g=be(d,e),h=sb(a,g,e,b,c),i=ud(g),j=i&&i.find();if(!(i&&h.ch>=j.from.ch))return h;e=j.to.line}}function sb(a,b,c,d,e){function j(d){var e=pb(a,sc(c,d),"line",b,i);return g=!0,f>e.bottom?e.left-h:e.top>f?e.left+h:(g=!1,e.left)}var f=e-he(a,b),g=!1,h=2*a.display.wrapper.clientWidth,i=ib(a,b),k=ie(b),l=b.text.length,m=qf(b),n=rf(b),o=j(m),p=g,q=j(n),r=g;if(d>q)return qb(c,n,r);for(;;){if(k?n==m||n==uf(b,m,1):1>=n-m){for(var s=q-d>d-o,t=s?m:n;Ye.test(b.text.charAt(t));)++t;var u=qb(c,t,s?p:r);return u.after=s,u}var v=Math.ceil(l/2),w=m+v;if(k){w=m;for(var x=0;v>x;++x)w=uf(b,w,1)}var y=j(w);y>d?(n=w,q=y,(r=g)&&(q+=1e3),l=v):(m=w,o=y,p=g,l-=v)}}function ub(a){if(null!=a.cachedTextHeight)return a.cachedTextHeight;if(null==tb){tb=Ze("pre");for(var b=0;49>b;++b)tb.appendChild(document.createTextNode("x")),tb.appendChild(Ze("br"));tb.appendChild(document.createTextNode("x"))}_e(a.measure,tb);var c=tb.offsetHeight/50;return c>3&&(a.cachedTextHeight=c),$e(a.measure),c||1}function vb(a){if(null!=a.cachedCharWidth)return a.cachedCharWidth;var b=Ze("span","x"),c=Ze("pre",[b]);_e(a.measure,c);var d=b.offsetWidth;return d>2&&(a.cachedCharWidth=d),d||10}function xb(a){a.curOp={changes:[],updateInput:null,userSelChange:null,textChanged:null,selectionChanged:!1,cursorActivity:!1,updateMaxLine:!1,updateScrollPos:!1,id:++wb},Ee++||(De=[])}function yb(a){var b=a.curOp,c=a.doc,d=a.display;if(a.curOp=null,b.updateMaxLine&&H(a),d.maxLineChanged&&!a.options.lineWrapping&&d.maxLine){var e=kb(a,d.maxLine);d.sizer.style.minWidth=Math.max(0,e+3+Ie)+"px",d.maxLineChanged=!1;var f=Math.max(0,d.sizer.offsetLeft+d.sizer.offsetWidth-d.scroller.clientWidth);c.scrollLeft>f&&!b.updateScrollPos&&Tb(a,Math.min(d.scroller.scrollLeft,f),!0)}var g,h;if(b.updateScrollPos)g=b.updateScrollPos;else if(b.selectionChanged&&d.scroller.clientHeight){var i=pb(a,c.sel.head);g=Ic(a,i.left,i.top,i.left,i.bottom)}(b.changes.length||g&&null!=g.scrollTop)&&(h=P(a,b.changes,g&&g.scrollTop),a.display.scroller.offsetHeight&&(a.doc.scrollTop=a.display.scroller.scrollTop)),!h&&b.selectionChanged&&X(a),b.updateScrollPos?(d.scroller.scrollTop=d.scrollbarV.scrollTop=c.scrollTop=g.scrollTop,d.scroller.scrollLeft=d.scrollbarH.scrollLeft=c.scrollLeft=g.scrollLeft,L(a),b.scrollToPos&&Gc(a,xc(a.doc,b.scrollToPos),b.scrollToPosMargin)):g&&Fc(a),b.selectionChanged&&$(a),a.state.focused&&b.updateInput&&Gb(a,b.userSelChange);var j=b.maybeHiddenMarkers,k=b.maybeUnhiddenMarkers;if(j)for(var l=0;j.length>l;++l)j[l].lines.length||Ce(j[l],"hide");if(k)for(var l=0;k.length>l;++l)k[l].lines.length&&Ce(k[l],"unhide");var m;if(--Ee||(m=De,De=null),b.textChanged&&Ce(a,"change",a,b.textChanged),b.cursorActivity&&Ce(a,"cursorActivity",a),m)for(var l=0;m.length>l;++l)m[l]()}function zb(a,b){return function(){var c=a||this,d=!c.curOp;d&&xb(c);try{var e=b.apply(c,arguments)}finally{d&&yb(c)}return e}}function Ab(a){return function(){var c,b=this.cm&&!this.cm.curOp;b&&xb(this.cm);try{c=a.apply(this,arguments)}finally{b&&yb(this.cm)}return c}}function Bb(a,b){var d,c=!a.curOp;c&&xb(a);try{d=b()}finally{c&&yb(a)}return d}function Cb(a,b,c,d){null==b&&(b=a.doc.first),null==c&&(c=a.doc.first+a.doc.size),a.curOp.changes.push({from:b,to:c,diff:d})}function Db(a){a.display.pollingFast||a.display.poll.set(a.options.pollInterval,function(){Fb(a),a.state.focused&&Db(a)})}function Eb(a){function c(){var d=Fb(a);d||b?(a.display.pollingFast=!1,Db(a)):(b=!0,a.display.poll.set(60,c))}var b=!1;a.display.pollingFast=!0,a.display.poll.set(20,c)}function Fb(a){var c=a.display.input,e=a.display.prevInput,f=a.doc,g=f.sel;if(!a.state.focused||kf(c)||Ib(a))return!1;var h=c.value;if(h==e&&tc(g.from,g.to))return!1;if(b&&!d&&a.display.inputHasSelection===h)return Gb(a,!0),!1;var i=!a.curOp;i&&xb(a),g.shift=!1;for(var j=0,k=Math.min(e.length,h.length);k>j&&e.charCodeAt(j)==h.charCodeAt(j);)++j;var l=g.from,m=g.to;e.length>j?l=sc(l.line,l.ch-(e.length-j)):a.state.overwrite&&tc(l,m)&&!a.state.pasteIncoming&&(m=sc(m.line,Math.min(be(f,m.line).text.length,m.ch+(h.length-j))));var n=a.curOp.updateInput;return lc(a.doc,{from:l,to:m,text:jf(h.slice(j)),origin:a.state.pasteIncoming?"paste":"+input"},"end"),a.curOp.updateInput=n,h.length>1e3||h.indexOf("\n")>-1?c.value=a.display.prevInput="":a.display.prevInput=h,i&&yb(a),a.state.pasteIncoming=!1,!0}function Gb(a,c){var e,f,g=a.doc;if(tc(g.sel.from,g.sel.to))c&&(a.display.prevInput=a.display.input.value="",b&&!d&&(a.display.inputHasSelection=null));else{a.display.prevInput="",e=lf&&(g.sel.to.line-g.sel.from.line>100||(f=a.getSelection()).length>1e3);var h=e?"-":f||a.getSelection();a.display.input.value=h,a.state.focused&&Pe(a.display.input),b&&!d&&(a.display.inputHasSelection=h)}a.display.inaccurateSelection=e}function Hb(a){"nocursor"==a.options.readOnly||o&&document.activeElement==a.display.input||a.display.input.focus()}function Ib(a){return a.options.readOnly||a.doc.cantEdit}function Jb(a){function d(){a.state.focused&&setTimeout(Ue(Hb,a),0)}function e(){c.cachedCharWidth=c.cachedTextHeight=null,lb(a),Bb(a,Ue(Cb,a))}function f(){for(var a=c.wrapper.parentNode;a&&a!=document.body;a=a.parentNode);a?setTimeout(f,5e3):Be(window,"resize",e)}function g(b){a.options.onDragEvent&&a.options.onDragEvent(a,ue(b))||xe(b)}function h(){c.inaccurateSelection&&(c.prevInput="",c.inaccurateSelection=!1,c.input.value=a.getSelection(),Pe(c.input))}var c=a.display;Ae(c.scroller,"mousedown",zb(a,Ob)),b?Ae(c.scroller,"dblclick",zb(a,function(b){var c=Lb(a,b);if(c&&!Qb(a,b)&&!Kb(a.display,b)){ve(b);var d=Pc(be(a.doc,c.line).text,c);Ac(a.doc,d.from,d.to)}})):Ae(c.scroller,"dblclick",ve),Ae(c.lineSpace,"selectstart",function(a){Kb(c,a)||ve(a)}),t||Ae(c.scroller,"contextmenu",function(b){gc(a,b)}),Ae(c.scroller,"scroll",function(){c.scroller.clientHeight&&(Sb(a,c.scroller.scrollTop),Tb(a,c.scroller.scrollLeft,!0),Ce(a,"scroll",a))}),Ae(c.scrollbarV,"scroll",function(){c.scroller.clientHeight&&Sb(a,c.scrollbarV.scrollTop)}),Ae(c.scrollbarH,"scroll",function(){c.scroller.clientHeight&&Tb(a,c.scrollbarH.scrollLeft)}),Ae(c.scroller,"mousewheel",function(b){Wb(a,b)}),Ae(c.scroller,"DOMMouseScroll",function(b){Wb(a,b)}),Ae(c.scrollbarH,"mousedown",d),Ae(c.scrollbarV,"mousedown",d),Ae(c.wrapper,"scroll",function(){c.wrapper.scrollTop=c.wrapper.scrollLeft=0}),Ae(window,"resize",e),setTimeout(f,5e3),Ae(c.input,"keyup",zb(a,function(b){a.options.onKeyEvent&&a.options.onKeyEvent(a,ue(b))||16==b.keyCode&&(a.doc.sel.shift=!1)})),Ae(c.input,"input",Ue(Eb,a)),Ae(c.input,"keydown",zb(a,bc)),Ae(c.input,"keypress",zb(a,cc)),Ae(c.input,"focus",Ue(dc,a)),Ae(c.input,"blur",Ue(ec,a)),a.options.dragDrop&&(Ae(c.scroller,"dragstart",function(b){Rb(a,b)}),Ae(c.scroller,"dragenter",g),Ae(c.scroller,"dragover",g),Ae(c.scroller,"drop",zb(a,Pb))),Ae(c.scroller,"paste",function(b){Kb(c,b)||(Hb(a),Eb(a))}),Ae(c.input,"paste",function(){a.state.pasteIncoming=!0,Eb(a)}),Ae(c.input,"cut",h),Ae(c.input,"copy",h),j&&Ae(c.sizer,"mouseup",function(){document.activeElement==c.input&&c.input.blur(),Hb(a)})}function Kb(a,b){for(var c=ye(b);c!=a.wrapper;c=c.parentNode){if(!c)return!0;if(/\bCodeMirror-(?:line)?widget\b/.test(c.className)||c.parentNode==a.sizer&&c!=a.mover)return!0}}function Lb(a,b,c){var d=a.display;if(!c){var e=ye(b);if(e==d.scrollbarH||e==d.scrollbarH.firstChild||e==d.scrollbarV||e==d.scrollbarV.firstChild||e==d.scrollbarFiller)return null}var f,g,h=bf(d.lineSpace);try{f=b.clientX,g=b.clientY}catch(b){return null}return rb(a,f-h.left,g-h.top)}function Ob(a){function q(a){if(!tc(p,a)){if(p=a,"single"==j)return Ac(c.doc,xc(f,h),a),void 0;if(n=xc(f,n),o=xc(f,o),"double"==j){var b=Pc(be(f,a.line).text,a);uc(a,n)?Ac(c.doc,b.from,o):Ac(c.doc,n,b.to)}else"triple"==j&&(uc(a,n)?Ac(c.doc,o,xc(f,sc(a.line,0))):Ac(c.doc,n,xc(f,sc(a.line+1,0))))}}function u(a){var b=++s,e=Lb(c,a,!0);if(e)if(tc(e,l)){var h=a.clientY<r.top?-20:a.clientY>r.bottom?20:0;h&&setTimeout(zb(c,function(){s==b&&(d.scroller.scrollTop+=h,u(a))}),50)}else{c.state.focused||dc(c),l=e,q(e);var g=K(d,f);(e.line>=g.to||e.line<g.from)&&setTimeout(zb(c,function(){s==b&&u(a)}),150)}}function v(a){s=1/0;var b=Lb(c,a);b&&q(b),ve(a),Hb(c),Be(document,"mousemove",w),Be(document,"mouseup",x)}var c=this,d=c.display,f=c.doc,g=f.sel;if(g.shift=a.shiftKey,Kb(d,a))return e||(d.scroller.draggable=!1,setTimeout(function(){d.scroller.draggable=!0},100)),void 0;if(!Qb(c,a)){var h=Lb(c,a);switch(ze(a)){case 3:return t&&gc.call(c,c,a),void 0;case 2:return h&&Ac(c.doc,h),setTimeout(Ue(Hb,c),20),ve(a),void 0}if(!h)return ye(a)==d.scroller&&ve(a),void 0;c.state.focused||dc(c);var i=+new Date,j="single";if(Nb&&Nb.time>i-400&&tc(Nb.pos,h))j="triple",ve(a),setTimeout(Ue(Hb,c),20),Qc(c,h.line);else if(Mb&&Mb.time>i-400&&tc(Mb.pos,h)){j="double",Nb={time:i,pos:h},ve(a);var k=Pc(be(f,h.line).text,h);Ac(c.doc,k.from,k.to)}else Mb={time:i,pos:h};var l=h;if(c.options.dragDrop&&cf&&!Ib(c)&&!tc(g.from,g.to)&&!uc(h,g.from)&&!uc(g.to,h)&&"single"==j){var m=zb(c,function(b){e&&(d.scroller.draggable=!1),c.state.draggingText=!1,Be(document,"mouseup",m),Be(d.scroller,"drop",m),10>Math.abs(a.clientX-b.clientX)+Math.abs(a.clientY-b.clientY)&&(ve(b),Ac(c.doc,h),Hb(c))});return e&&(d.scroller.draggable=!0),c.state.draggingText=m,d.scroller.dragDrop&&d.scroller.dragDrop(),Ae(document,"mouseup",m),Ae(d.scroller,"drop",m),void 0}ve(a),"single"==j&&Ac(c.doc,xc(f,h));var n=g.from,o=g.to,p=h,r=bf(d.wrapper),s=0,w=zb(c,function(a){b||ze(a)?u(a):v(a)}),x=zb(c,v);Ae(document,"mousemove",w),Ae(document,"mouseup",x)}}function Pb(a){var b=this;if(!(Kb(b.display,a)||b.options.onDragEvent&&b.options.onDragEvent(b,ue(a)))){ve(a);var c=Lb(b,a,!0),d=a.dataTransfer.files;if(c&&!Ib(b))if(d&&d.length&&window.FileReader&&window.File)for(var e=d.length,f=Array(e),g=0,h=function(a,d){var h=new FileReader;h.onload=function(){f[d]=h.result,++g==e&&(c=xc(b.doc,c),lc(b.doc,{from:c,to:c,text:jf(f.join("\n")),origin:"paste"},"around"))},h.readAsText(a)},i=0;e>i;++i)h(d[i],i);else{if(b.state.draggingText&&!uc(c,b.doc.sel.from)&&!uc(b.doc.sel.to,c))return b.state.draggingText(a),setTimeout(Ue(Hb,b),20),void 0;try{var f=a.dataTransfer.getData("Text");if(f){var j=b.doc.sel.from,k=b.doc.sel.to;Cc(b.doc,c,c),b.state.draggingText&&rc(b.doc,"",j,k,"paste"),b.replaceSelection(f,null,"paste"),Hb(b),dc(b)
}}catch(a){}}}}function Qb(a,b){var c=a.display;try{var d=b.clientX,e=b.clientY}catch(b){return!1}if(d>=Math.floor(bf(c.gutters).right))return!1;if(ve(b),!He(a,"gutterClick"))return!0;var f=bf(c.lineDiv);if(e>f.bottom)return!0;e-=f.top-c.viewOffset;for(var g=0;a.options.gutters.length>g;++g){var h=c.gutters.childNodes[g];if(h&&bf(h).right>=d){var i=ge(a.doc,e),j=a.options.gutters[g];Fe(a,"gutterClick",a,i,j,b);break}}return!0}function Rb(a,c){if(b&&!a.state.draggingText)return xe(c),void 0;if(!Kb(a.display,c)){var d=a.getSelection();if(c.dataTransfer.setData("Text",d),c.dataTransfer.setDragImage){var e=Ze("img",null,null,"position: fixed; left: 0; top: 0;");h&&(e.width=e.height=1,a.display.wrapper.appendChild(e),e._top=e.offsetTop),i&&(a.display.dragImg?e=a.display.dragImg:(a.display.dragImg=e,e.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",a.display.wrapper.appendChild(e))),c.dataTransfer.setDragImage(e,0,0),h&&e.parentNode.removeChild(e)}}}function Sb(b,c){2>Math.abs(b.doc.scrollTop-c)||(b.doc.scrollTop=c,a||P(b,[],c),b.display.scroller.scrollTop!=c&&(b.display.scroller.scrollTop=c),b.display.scrollbarV.scrollTop!=c&&(b.display.scrollbarV.scrollTop=c),a&&P(b,[]))}function Tb(a,b,c){(c?b==a.doc.scrollLeft:2>Math.abs(a.doc.scrollLeft-b))||(b=Math.min(b,a.display.scroller.scrollWidth-a.display.scroller.clientWidth),a.doc.scrollLeft=b,L(a),a.display.scroller.scrollLeft!=b&&(a.display.scroller.scrollLeft=b),a.display.scrollbarH.scrollLeft!=b&&(a.display.scrollbarH.scrollLeft=b))}function Wb(b,c){var d=c.wheelDeltaX,f=c.wheelDeltaY;null==d&&c.detail&&c.axis==c.HORIZONTAL_AXIS&&(d=c.detail),null==f&&c.detail&&c.axis==c.VERTICAL_AXIS?f=c.detail:null==f&&(f=c.wheelDelta);var g=b.display,i=g.scroller;if(d&&i.scrollWidth>i.clientWidth||f&&i.scrollHeight>i.clientHeight){if(f&&p&&e)for(var j=c.target;j!=i;j=j.parentNode)if(j.lineObj){b.display.currentWheelTarget=j;break}if(d&&!a&&!h&&null!=Vb)return f&&Sb(b,Math.max(0,Math.min(i.scrollTop+f*Vb,i.scrollHeight-i.clientHeight))),Tb(b,Math.max(0,Math.min(i.scrollLeft+d*Vb,i.scrollWidth-i.clientWidth))),ve(c),g.wheelStartX=null,void 0;if(f&&null!=Vb){var k=f*Vb,l=b.doc.scrollTop,m=l+g.wrapper.clientHeight;0>k?l=Math.max(0,l+k-50):m=Math.min(b.doc.height,m+k+50),P(b,[],{top:l,bottom:m})}20>Ub&&(null==g.wheelStartX?(g.wheelStartX=i.scrollLeft,g.wheelStartY=i.scrollTop,g.wheelDX=d,g.wheelDY=f,setTimeout(function(){if(null!=g.wheelStartX){var a=i.scrollLeft-g.wheelStartX,b=i.scrollTop-g.wheelStartY,c=b&&g.wheelDY&&b/g.wheelDY||a&&g.wheelDX&&a/g.wheelDX;g.wheelStartX=g.wheelStartY=null,c&&(Vb=(Vb*Ub+c)/(Ub+1),++Ub)}},200)):(g.wheelDX+=d,g.wheelDY+=f))}}function Xb(a,b,c){if("string"==typeof b&&(b=_c[b],!b))return!1;a.display.pollingFast&&Fb(a)&&(a.display.pollingFast=!1);var d=a.doc,e=d.sel.shift,f=!1;try{Ib(a)&&(a.state.suppressEdits=!0),c&&(d.sel.shift=!1),f=b(a)!=Je}finally{d.sel.shift=e,a.state.suppressEdits=!1}return f}function Yb(a){var b=a.state.keyMaps.slice(0);return a.options.extraKeys&&b.push(a.options.extraKeys),b.push(a.options.keyMap),b}function $b(a,b){var c=bd(a.options.keyMap),e=c.auto;clearTimeout(Zb),e&&!dd(b)&&(Zb=setTimeout(function(){bd(a.options.keyMap)==c&&(a.options.keyMap=e.call?e.call(null,a):e)},50));var f=ed(b,!0),g=!1;if(!f)return!1;var h=Yb(a);return g=b.shiftKey?cd("Shift-"+f,h,function(b){return Xb(a,b,!0)})||cd(f,h,function(b){return"string"==typeof b&&/^go[A-Z]/.test(b)?Xb(a,b):void 0}):cd(f,h,function(b){return Xb(a,b)}),"stop"==g&&(g=!1),g&&(ve(b),$(a),d&&(b.oldKeyCode=b.keyCode,b.keyCode=0)),g}function _b(a,b,c){var d=cd("'"+c+"'",Yb(a),function(b){return Xb(a,b,!0)});return d&&(ve(b),$(a)),d}function bc(a){var c=this;if(c.state.focused||dc(c),b&&27==a.keyCode&&(a.returnValue=!1),!c.options.onKeyEvent||!c.options.onKeyEvent(c,ue(a))){var d=a.keyCode;c.doc.sel.shift=16==d||a.shiftKey;var e=$b(c,a);h&&(ac=e?d:null,!e&&88==d&&!lf&&(p?a.metaKey:a.ctrlKey)&&c.replaceSelection(""))}}function cc(a){var c=this;if(!c.options.onKeyEvent||!c.options.onKeyEvent(c,ue(a))){var e=a.keyCode,f=a.charCode;if(h&&e==ac)return ac=null,ve(a),void 0;if(!(h&&(!a.which||10>a.which)||j)||!$b(c,a)){var g=String.fromCharCode(null==f?e:f);this.options.electricChars&&this.doc.mode.electricChars&&this.options.smartIndent&&!Ib(this)&&this.doc.mode.electricChars.indexOf(g)>-1&&setTimeout(zb(c,function(){Lc(c,c.doc.sel.to.line,"smart")}),75),_b(c,a,g)||(b&&!d&&(c.display.inputHasSelection=null),Eb(c))}}}function dc(a){"nocursor"!=a.options.readOnly&&(a.state.focused||(Ce(a,"focus",a),a.state.focused=!0,-1==a.display.wrapper.className.search(/\bCodeMirror-focused\b/)&&(a.display.wrapper.className+=" CodeMirror-focused"),Gb(a,!0)),Db(a),$(a))}function ec(a){a.state.focused&&(Ce(a,"blur",a),a.state.focused=!1,a.display.wrapper.className=a.display.wrapper.className.replace(" CodeMirror-focused","")),clearInterval(a.display.blinker),setTimeout(function(){a.state.focused||(a.doc.sel.shift=!1)},150)}function gc(a,c){function k(){if(e.inputDiv.style.position="relative",e.input.style.cssText=j,d&&(e.scrollbarV.scrollTop=e.scroller.scrollTop=i),Db(a),null!=e.input.selectionStart&&(!b||d)){clearTimeout(fc);var c=e.input.value=" "+(tc(f.from,f.to)?"":e.input.value),g=0;e.prevInput=" ",e.input.selectionStart=1,e.input.selectionEnd=c.length;var h=function(){" "==e.prevInput&&0==e.input.selectionStart?zb(a,_c.selectAll)(a):10>g++?fc=setTimeout(h,500):Gb(a)};fc=setTimeout(h,200)}}var e=a.display,f=a.doc.sel;if(!Kb(e,c)){var g=Lb(a,c),i=e.scroller.scrollTop;if(g&&!h){(tc(f.from,f.to)||uc(g,f.from)||!uc(g,f.to))&&zb(a,Cc)(a.doc,g,g);var j=e.input.style.cssText;if(e.inputDiv.style.position="absolute",e.input.style.cssText="position: fixed; width: 30px; height: 30px; top: "+(c.clientY-5)+"px; left: "+(c.clientX-5)+"px; z-index: 1000; background: white; outline: none;"+"border-width: 0; outline: none; overflow: hidden; opacity: .05; -ms-opacity: .05; filter: alpha(opacity=5);",Hb(a),Gb(a,!0),tc(f.from,f.to)&&(e.input.value=e.prevInput=" "),t){xe(c);var l=function(){Be(window,"mouseup",l),setTimeout(k,20)};Ae(window,"mouseup",l)}else setTimeout(k,50)}}}function hc(a){return a.text?sc(a.from.line+a.text.length-1,Oe(a.text).length+(1==a.text.length?a.from.ch:0)):a.to}function ic(a,b,c){if(!uc(b.from,c))return xc(a,c);var d=b.text.length-1-(b.to.line-b.from.line);if(c.line>b.to.line+d){var e=c.line-d,f=a.first+a.size-1;return e>f?sc(f,be(a,f).text.length):yc(c,be(a,e).text.length)}if(c.line==b.to.line+d)return yc(c,Oe(b.text).length+(1==b.text.length?b.from.ch:0)+be(a,b.to.line).text.length-b.to.ch);var g=c.line-b.from.line;return yc(c,b.text[g].length+(g?0:b.from.ch))}function jc(a,b,c){if(c&&"object"==typeof c)return{anchor:ic(a,b,c.anchor),head:ic(a,b,c.head)};if("start"==c)return{anchor:b.from,head:b.from};var d=hc(b);if("around"==c)return{anchor:b.from,head:d};if("end"==c)return{anchor:d,head:d};var e=function(a){if(uc(a,b.from))return a;if(!uc(b.to,a))return d;var c=a.line+b.text.length-(b.to.line-b.from.line)-1,e=a.ch;return a.line==b.to.line&&(e+=d.ch-b.to.ch),sc(c,e)};return{anchor:e(a.sel.anchor),head:e(a.sel.head)}}function kc(a,b){var c={canceled:!1,from:b.from,to:b.to,text:b.text,origin:b.origin,update:function(b,c,d,e){b&&(this.from=xc(a,b)),c&&(this.to=xc(a,c)),d&&(this.text=d),void 0!==e&&(this.origin=e)},cancel:function(){this.canceled=!0}};return Ce(a,"beforeChange",a,c),a.cm&&Ce(a.cm,"beforeChange",a.cm,c),c.canceled?null:{from:c.from,to:c.to,text:c.text,origin:c.origin}}function lc(a,b,c,d){if(a.cm){if(!a.cm.curOp)return zb(a.cm,lc)(a,b,c,d);if(a.cm.state.suppressEdits)return}if(!(He(a,"beforeChange")||a.cm&&He(a.cm,"beforeChange"))||(b=kc(a,b))){var e=u&&!d&&rd(a,b.from,b.to);if(e){for(var f=e.length-1;f>=1;--f)mc(a,{from:e[f].from,to:e[f].to,text:[""]});e.length&&mc(a,{from:e[0].from,to:e[0].to,text:b.text},c)}else mc(a,b,c)}}function mc(a,b,c){var d=jc(a,b,c);me(a,b,d,a.cm?a.cm.curOp.id:0/0),pc(a,b,d,pd(a,b));var e=[];_d(a,function(a,c){c||-1!=Qe(e,a.history)||(se(a.history,b),e.push(a.history)),pc(a,b,null,pd(a,b))})}function nc(a,b){if(!a.cm||!a.cm.state.suppressEdits){var c=a.history,d=("undo"==b?c.done:c.undone).pop();if(d){c.dirtyCounter+="undo"==b?-1:1;var e={changes:[],anchorBefore:d.anchorAfter,headBefore:d.headAfter,anchorAfter:d.anchorBefore,headAfter:d.headBefore};("undo"==b?c.undone:c.done).push(e);for(var f=d.changes.length-1;f>=0;--f){var g=d.changes[f];g.origin=b,e.changes.push(le(a,g));var h=f?jc(a,g,null):{anchor:d.anchorBefore,head:d.headBefore};pc(a,g,h,qd(a,g));var i=[];_d(a,function(a,b){b||-1!=Qe(i,a.history)||(se(a.history,g),i.push(a.history)),pc(a,g,null,qd(a,g))})}}}}function oc(a,b){function c(a){return sc(a.line+b,a.ch)}a.first+=b,a.cm&&Cb(a.cm,a.first,a.first,b),a.sel.head=c(a.sel.head),a.sel.anchor=c(a.sel.anchor),a.sel.from=c(a.sel.from),a.sel.to=c(a.sel.to)}function pc(a,b,c,d){if(a.cm&&!a.cm.curOp)return zb(a.cm,pc)(a,b,c,d);if(b.to.line<a.first)return oc(a,b.text.length-1-(b.to.line-b.from.line)),void 0;if(!(b.from.line>a.lastLine())){if(b.from.line<a.first){var e=b.text.length-1-(a.first-b.from.line);oc(a,e),b={from:sc(a.first,0),to:sc(b.to.line+e,b.to.ch),text:[Oe(b.text)],origin:b.origin}}var f=a.lastLine();b.to.line>f&&(b={from:b.from,to:sc(f,be(a,f).text.length),text:[b.text[0]],origin:b.origin}),b.removed=ce(a,b.from,b.to),c||(c=jc(a,b,null)),a.cm?qc(a.cm,b,d,c):Ud(a,b,d,c)}}function qc(a,b,c,d){var e=a.doc,f=a.display,g=b.from,h=b.to,i=!1,j=g.line;a.options.lineWrapping||(j=fe(vd(e,be(e,g.line))),e.iter(j,h.line+1,function(a){return a==f.maxLine?(i=!0,!0):void 0})),uc(e.sel.head,b.from)||uc(b.to,e.sel.head)||(a.curOp.cursorActivity=!0),Ud(e,b,c,d,A(a)),a.options.lineWrapping||(e.iter(j,g.line+b.text.length,function(a){var b=G(e,a);b>f.maxLineLength&&(f.maxLine=a,f.maxLineLength=b,f.maxLineChanged=!0,i=!1)}),i&&(a.curOp.updateMaxLine=!0)),e.frontier=Math.min(e.frontier,g.line),_(a,400);var k=b.text.length-(h.line-g.line)-1;if(Cb(a,g.line,h.line+1,k),He(a,"change")){var l={from:g,to:h,text:b.text,removed:b.removed,origin:b.origin};if(a.curOp.textChanged){for(var m=a.curOp.textChanged;m.next;m=m.next);m.next=l}else a.curOp.textChanged=l}}function rc(a,b,c,d,e){if(d||(d=c),uc(d,c)){var f=d;d=c,c=f}"string"==typeof b&&(b=jf(b)),lc(a,{from:c,to:d,text:b,origin:e},null)}function sc(a,b){return this instanceof sc?(this.line=a,this.ch=b,void 0):new sc(a,b)}function tc(a,b){return a.line==b.line&&a.ch==b.ch}function uc(a,b){return a.line<b.line||a.line==b.line&&a.ch<b.ch}function vc(a){return sc(a.line,a.ch)}function wc(a,b){return Math.max(a.first,Math.min(b,a.first+a.size-1))}function xc(a,b){if(b.line<a.first)return sc(a.first,0);var c=a.first+a.size-1;return b.line>c?sc(c,be(a,c).text.length):yc(b,be(a,b.line).text.length)}function yc(a,b){var c=a.ch;return null==c||c>b?sc(a.line,b):0>c?sc(a.line,0):a}function zc(a,b){return b>=a.first&&a.first+a.size>b}function Ac(a,b,c,d){if(a.sel.shift||a.sel.extend){var e=a.sel.anchor;if(c){var f=uc(b,e);f!=uc(c,e)?(e=b,b=c):f!=uc(b,c)&&(b=c)}Cc(a,e,b,d)}else Cc(a,b,c||b,d);a.cm&&(a.cm.curOp.userSelChange=!0)}function Bc(a,b,c){var d={anchor:b,head:c};return Ce(a,"beforeSelectionChange",a,d),a.cm&&Ce(a.cm,"beforeSelectionChange",a.cm,d),d.anchor=xc(a,d.anchor),d.head=xc(a,d.head),d}function Cc(a,b,c,d,e){if(!e&&He(a,"beforeSelectionChange")||a.cm&&He(a.cm,"beforeSelectionChange")){var f=Bc(a,b,c);c=f.head,b=f.anchor}var g=a.sel;if(g.goalColumn=null,(e||!tc(b,g.anchor))&&(b=Ec(a,b,d,"push"!=e)),(e||!tc(c,g.head))&&(c=Ec(a,c,d,"push"!=e)),!tc(g.anchor,b)||!tc(g.head,c)){g.anchor=b,g.head=c;var h=uc(c,b);g.from=h?c:b,g.to=h?b:c,a.cm&&(a.cm.curOp.updateInput=a.cm.curOp.selectionChanged=a.cm.curOp.cursorActivity=!0),Fe(a,"cursorActivity",a)}}function Dc(a){Cc(a.doc,a.doc.sel.from,a.doc.sel.to,null,"push")}function Ec(a,b,c,d){var e=!1,f=b,g=c||1;a.cantEdit=!1;a:for(;;){var h=be(a,f.line);if(h.markedSpans)for(var i=0;h.markedSpans.length>i;++i){var j=h.markedSpans[i],k=j.marker;if((null==j.from||(k.inclusiveLeft?j.from<=f.ch:j.from<f.ch))&&(null==j.to||(k.inclusiveRight?j.to>=f.ch:j.to>f.ch))){if(d&&(Ce(k,"beforeCursorEnter"),k.explicitlyCleared)){if(h.markedSpans){--i;continue}break}if(!k.atomic)continue;var l=k.find()[0>g?"from":"to"];if(tc(l,f)&&(l.ch+=g,0>l.ch?l=l.line>a.first?xc(a,sc(l.line-1)):null:l.ch>h.text.length&&(l=l.line<a.first+a.size-1?sc(l.line+1,0):null),!l)){if(e)return d?(a.cantEdit=!0,sc(a.first,0)):Ec(a,b,c,!0);e=!0,l=b,g=-g}f=l;continue a}}return f}}function Fc(a){var b=Gc(a,a.doc.sel.head);if(a.state.focused){var c=a.display,d=bf(c.sizer),e=null,f=db(a.display);if(0>b.top+f+d.top?e=!0:b.bottom+f+d.top>(window.innerHeight||document.documentElement.clientHeight)&&(e=!1),null!=e&&!m){var g="none"==c.cursor.style.display;g&&(c.cursor.style.display="",c.cursor.style.left=b.left+"px",c.cursor.style.top=b.top-c.viewOffset+"px"),c.cursor.scrollIntoView(e),g&&(c.cursor.style.display="none")}}}function Gc(a,b,c){for(null==c&&(c=0);;){var d=!1,e=pb(a,b),f=Ic(a,e.left,e.top-c,e.left,e.bottom+c),g=a.doc.scrollTop,h=a.doc.scrollLeft;if(null!=f.scrollTop&&(Sb(a,f.scrollTop),Math.abs(a.doc.scrollTop-g)>1&&(d=!0)),null!=f.scrollLeft&&(Tb(a,f.scrollLeft),Math.abs(a.doc.scrollLeft-h)>1&&(d=!0)),!d)return e}}function Hc(a,b,c,d,e){var f=Ic(a,b,c,d,e);null!=f.scrollTop&&Sb(a,f.scrollTop),null!=f.scrollLeft&&Tb(a,f.scrollLeft)}function Ic(a,b,c,d,e){var f=a.display,g=db(f);c+=g,e+=g,0>c&&(c=0);var h=f.scroller.clientHeight-Ie,i=f.scroller.scrollTop,j={},k=a.doc.height+eb(f),l=g+10>c,m=e+g>k-10;if(i>c)j.scrollTop=l?0:c;else if(e>i+h){var n=Math.min(c,(m?k:e)-h);n!=i&&(j.scrollTop=n)}var o=f.scroller.clientWidth-Ie,p=f.scroller.scrollLeft;b+=f.gutters.offsetWidth,d+=f.gutters.offsetWidth;var q=f.gutters.offsetWidth,r=q+10>b;return p+q>b||r?(r&&(b=0),j.scrollLeft=Math.max(0,b-10-q)):d>o+p-3&&(j.scrollLeft=d+10-o),j}function Jc(a,b,c){a.curOp.updateScrollPos={scrollLeft:null==b?a.doc.scrollLeft:b,scrollTop:null==c?a.doc.scrollTop:c}}function Kc(a,b,c){var d=a.curOp.updateScrollPos||(a.curOp.updateScrollPos={scrollLeft:a.doc.scrollLeft,scrollTop:a.doc.scrollTop}),e=a.display.scroller;d.scrollTop=Math.max(0,Math.min(e.scrollHeight-e.clientHeight,d.scrollTop+c)),d.scrollLeft=Math.max(0,Math.min(e.scrollWidth-e.clientWidth,d.scrollLeft+b))}function Lc(a,b,c,d){var e=a.doc;if(c||(c="add"),"smart"==c)if(a.doc.mode.indent)var f=cb(a,b);else c="prev";var k,g=a.options.tabSize,h=be(e,b),i=Le(h.text,null,g),j=h.text.match(/^\s*/)[0];if("smart"==c&&(k=a.doc.mode.indent(f,h.text.slice(j.length),h.text),k==Je)){if(!d)return;c="prev"}"prev"==c?k=b>e.first?Le(be(e,b-1).text,null,g):0:"add"==c?k=i+a.options.indentUnit:"subtract"==c&&(k=i-a.options.indentUnit),k=Math.max(0,k);var l="",m=0;if(a.options.indentWithTabs)for(var n=Math.floor(k/g);n;--n)m+=g,l+=" ";k>m&&(l+=Ne(k-m)),l!=j&&rc(a.doc,l,sc(b,0),sc(b,j.length),"+input"),h.stateAfter=null}function Mc(a,b,c){var d=b,e=b,f=a.doc;return"number"==typeof b?e=be(f,wc(f,b)):d=fe(b),null==d?null:c(e,d)?(Cb(a,d,d+1),e):null}function Nc(a,b,c,d,e){function j(){var b=f+c;return a.first>b||b>=a.first+a.size?i=!1:(f=b,h=be(a,b))}function k(a){var b=(e?uf:vf)(h,g,c,!0);if(null==b){if(a||!j())return i=!1;g=e?(0>c?rf:qf)(h):0>c?h.text.length:0}else g=b;return!0}var f=b.line,g=b.ch,h=be(a,f),i=!0;if("char"==d)k();else if("column"==d)k(!0);else if("word"==d||"group"==d)for(var l=null,m="group"==d,n=!0;!(0>c)||k(!n);n=!1){var o=h.text.charAt(g)||"\n",p=We(o)?"w":m?/\s/.test(o)?null:"p":null;if(l&&l!=p){0>c&&(c=1,k());break}if(p&&(l=p),c>0&&!k(!n))break}var q=Ec(a,sc(f,g),c,!0);return i||(q.hitSide=!0),q}function Oc(a,b,c,d){var g,e=a.doc,f=b.left;if("page"==d){var h=Math.min(a.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight);g=b.top+c*(h-(0>c?1.5:.5)*ub(a.display))}else"line"==d&&(g=c>0?b.bottom+3:b.top-3);for(;;){var i=rb(a,f,g);if(!i.outside)break;if(0>c?0>=g:g>=e.height){i.hitSide=!0;break}g+=5*c}return i}function Pc(a,b){var c=b.ch,d=b.ch;if(a){b.after===!1||d==a.length?--c:++d;for(var e=a.charAt(c),f=We(e)?We:/\s/.test(e)?function(a){return/\s/.test(a)}:function(a){return!/\s/.test(a)&&!We(a)};c>0&&f(a.charAt(c-1));)--c;for(;a.length>d&&f(a.charAt(d));)++d}return{from:sc(b.line,c),to:sc(b.line,d)}}function Qc(a,b){Ac(a.doc,sc(b,0),xc(a.doc,sc(b+1,0)))}function Tc(a,b,c,d){w.defaults[a]=b,c&&(Rc[a]=d?function(a,b,d){d!=Uc&&c(a,b,d)}:c)}function Zc(a,b){if(b===!0)return b;if(a.copyState)return a.copyState(b);var c={};for(var d in b){var e=b[d];e instanceof Array&&(e=e.concat([])),c[d]=e}return c}function $c(a,b,c){return a.startState?a.startState(b,c):!0}function bd(a){return"string"==typeof a?ad[a]:a}function cd(a,b,c){function d(b){b=bd(b);var e=b[a];if(e===!1)return"stop";if(null!=e&&c(e))return!0;if(b.nofallthrough)return"stop";var f=b.fallthrough;if(null==f)return!1;if("[object Array]"!=Object.prototype.toString.call(f))return d(f);for(var g=0,h=f.length;h>g;++g){var i=d(f[g]);if(i)return i}return!1}for(var e=0;b.length>e;++e){var f=d(b[e]);if(f)return f}}function dd(a){var b=mf[a.keyCode];return"Ctrl"==b||"Alt"==b||"Shift"==b||"Mod"==b}function ed(a,b){if(h&&34==a.keyCode&&a["char"])return!1;var c=mf[a.keyCode];return null==c||a.altGraphKey?!1:(a.altKey&&(c="Alt-"+c),(s?a.metaKey:a.ctrlKey)&&(c="Ctrl-"+c),(s?a.ctrlKey:a.metaKey)&&(c="Cmd-"+c),!b&&a.shiftKey&&(c="Shift-"+c),c)}function fd(a,b){this.pos=this.start=0,this.string=a,this.tabSize=b||8,this.lastColumnPos=this.lastColumnValue=0}function gd(a,b){this.lines=[],this.type=b,this.doc=a}function hd(a,b,c,d,e){if(d&&d.shared)return jd(a,b,c,d,e);if(a.cm&&!a.cm.curOp)return zb(a.cm,hd)(a,b,c,d,e);var f=new gd(a,e);if("range"==e&&!uc(b,c))return f;d&&Se(d,f),f.replacedWith&&(f.collapsed=!0,f.replacedWith=Ze("span",[f.replacedWith],"CodeMirror-widget")),f.collapsed&&(v=!0),f.addToHistory&&me(a,{from:b,to:c,origin:"markText"},{head:a.sel.head,anchor:a.sel.anchor},0/0);var i,j,l,g=b.line,h=0,k=a.cm;if(a.iter(g,c.line+1,function(d){k&&f.collapsed&&!k.options.lineWrapping&&vd(a,d)==k.display.maxLine&&(l=!0);var e={from:null,to:null,marker:f};h+=d.text.length,g==b.line&&(e.from=b.ch,h-=b.ch),g==c.line&&(e.to=c.ch,h-=d.text.length-c.ch),f.collapsed&&(g==c.line&&(j=sd(d,c.ch)),g==b.line?i=sd(d,b.ch):ee(d,0)),md(d,e),++g}),f.collapsed&&a.iter(b.line,c.line+1,function(b){wd(a,b)&&ee(b,0)}),f.clearOnEnter&&Ae(f,"beforeCursorEnter",function(){f.clear()}),f.readOnly&&(u=!0,(a.history.done.length||a.history.undone.length)&&a.clearHistory()),f.collapsed){if(i!=j)throw Error("Inserting collapsed marker overlapping an existing one");f.size=h,f.atomic=!0}return k&&(l&&(k.curOp.updateMaxLine=!0),(f.className||f.startStyle||f.endStyle||f.collapsed)&&Cb(k,b.line,c.line+1),f.atomic&&Dc(k)),f}function id(a,b){this.markers=a,this.primary=b;for(var c=0,d=this;a.length>c;++c)a[c].parent=this,Ae(a[c],"clear",function(){d.clear()})}function jd(a,b,c,d,e){d=Se(d),d.shared=!1;var f=[hd(a,b,c,d,e)],g=f[0],h=d.replacedWith;return _d(a,function(a){h&&(d.replacedWith=h.cloneNode(!0)),f.push(hd(a,xc(a,b),xc(a,c),d,e));for(var i=0;a.linked.length>i;++i)if(a.linked[i].isParent)return;g=Oe(f)}),new id(f,g)}function kd(a,b){if(a)for(var c=0;a.length>c;++c){var d=a[c];if(d.marker==b)return d}}function ld(a,b){for(var c,d=0;a.length>d;++d)a[d]!=b&&(c||(c=[])).push(a[d]);return c}function md(a,b){a.markedSpans=a.markedSpans?a.markedSpans.concat([b]):[b],b.marker.attachLine(a)}function nd(a,b,c){if(a)for(var e,d=0;a.length>d;++d){var f=a[d],g=f.marker,h=null==f.from||(g.inclusiveLeft?b>=f.from:b>f.from);if(h||"bookmark"==g.type&&f.from==b&&(!c||!f.marker.insertLeft)){var i=null==f.to||(g.inclusiveRight?f.to>=b:f.to>b);(e||(e=[])).push({from:f.from,to:i?null:f.to,marker:g})}}return e}function od(a,b,c){if(a)for(var e,d=0;a.length>d;++d){var f=a[d],g=f.marker,h=null==f.to||(g.inclusiveRight?f.to>=b:f.to>b);if(h||"bookmark"==g.type&&f.from==b&&(!c||f.marker.insertLeft)){var i=null==f.from||(g.inclusiveLeft?b>=f.from:b>f.from);(e||(e=[])).push({from:i?null:f.from-b,to:null==f.to?null:f.to-b,marker:g})}}return e}function pd(a,b){var c=zc(a,b.from.line)&&be(a,b.from.line).markedSpans,d=zc(a,b.to.line)&&be(a,b.to.line).markedSpans;if(!c&&!d)return null;var e=b.from.ch,f=b.to.ch,g=tc(b.from,b.to),h=nd(c,e,g),i=od(d,f,g),j=1==b.text.length,k=Oe(b.text).length+(j?e:0);if(h)for(var l=0;h.length>l;++l){var m=h[l];if(null==m.to){var n=kd(i,m.marker);n?j&&(m.to=null==n.to?null:n.to+k):m.to=e}}if(i)for(var l=0;i.length>l;++l){var m=i[l];if(null!=m.to&&(m.to+=k),null==m.from){var n=kd(h,m.marker);n||(m.from=k,j&&(h||(h=[])).push(m))}else m.from+=k,j&&(h||(h=[])).push(m)}var o=[h];if(!j){var q,p=b.text.length-2;if(p>0&&h)for(var l=0;h.length>l;++l)null==h[l].to&&(q||(q=[])).push({from:null,to:null,marker:h[l].marker});for(var l=0;p>l;++l)o.push(q);o.push(i)}return o}function qd(a,b){var c=oe(a,b),d=pd(a,b);if(!c)return d;if(!d)return c;for(var e=0;c.length>e;++e){var f=c[e],g=d[e];if(f&&g)a:for(var h=0;g.length>h;++h){for(var i=g[h],j=0;f.length>j;++j)if(f[j].marker==i.marker)continue a;f.push(i)}else g&&(c[e]=g)}return c}function rd(a,b,c){var d=null;if(a.iter(b.line,c.line+1,function(a){if(a.markedSpans)for(var b=0;a.markedSpans.length>b;++b){var c=a.markedSpans[b].marker;!c.readOnly||d&&-1!=Qe(d,c)||(d||(d=[])).push(c)}}),!d)return null;for(var e=[{from:b,to:c}],f=0;d.length>f;++f)for(var g=d[f],h=g.find(),i=0;e.length>i;++i){var j=e[i];if(!uc(j.to,h.from)&&!uc(h.to,j.from)){var k=[i,1];(uc(j.from,h.from)||!g.inclusiveLeft&&tc(j.from,h.from))&&k.push({from:j.from,to:h.from}),(uc(h.to,j.to)||!g.inclusiveRight&&tc(j.to,h.to))&&k.push({from:h.to,to:j.to}),e.splice.apply(e,k),i+=k.length-1}}return e}function sd(a,b){var d,c=v&&a.markedSpans;if(c)for(var e,f=0;c.length>f;++f)e=c[f],e.marker.collapsed&&(null==e.from||b>e.from)&&(null==e.to||e.to>b)&&(!d||d.width<e.marker.width)&&(d=e.marker);return d}function td(a){return sd(a,-1)}function ud(a){return sd(a,a.text.length+1)}function vd(a,b){for(var c;c=td(b);)b=be(a,c.find().from.line);return b}function wd(a,b){var c=v&&b.markedSpans;if(c)for(var d,e=0;c.length>e;++e)if(d=c[e],d.marker.collapsed){if(null==d.from)return!0;if(0==d.from&&d.marker.inclusiveLeft&&xd(a,b,d))return!0}}function xd(a,b,c){if(null==c.to){var d=c.marker.find().to,e=be(a,d.line);return xd(a,e,kd(e.markedSpans,c.marker))}if(c.marker.inclusiveRight&&c.to==b.text.length)return!0;for(var f,g=0;b.markedSpans.length>g;++g)if(f=b.markedSpans[g],f.marker.collapsed&&f.from==c.to&&(f.marker.inclusiveLeft||c.marker.inclusiveRight)&&xd(a,b,f))return!0}function yd(a){var b=a.markedSpans;if(b){for(var c=0;b.length>c;++c)b[c].marker.detachLine(a);a.markedSpans=null}}function zd(a,b){if(b){for(var c=0;b.length>c;++c)b[c].marker.attachLine(a);a.markedSpans=b}}function Bd(a){return function(){var b=!this.cm.curOp;b&&xb(this.cm);try{var c=a.apply(this,arguments)}finally{b&&yb(this.cm)}return c}}function Cd(a){return null!=a.height?a.height:(a.node.parentNode&&1==a.node.parentNode.nodeType||_e(a.cm.display.measure,Ze("div",[a.node],null,"position: relative")),a.height=a.node.offsetHeight)}function Dd(a,b,c,d){var e=new Ad(a,c,d);return e.noHScroll&&(a.display.alignWidgets=!0),Mc(a,b,function(b){if((b.widgets||(b.widgets=[])).push(e),e.line=b,!wd(a.doc,b)||e.showIfHidden){var c=he(a,b)<a.display.scroller.scrollTop;ee(b,b.height+Cd(e)),c&&Kc(a,0,e.height)}return!0}),e}function Ed(a,b,c){var d={text:a};return zd(d,b),d.height=c?c(d):1,d}function Fd(a,b,c,d){a.text=b,a.stateAfter&&(a.stateAfter=null),a.styles&&(a.styles=null),null!=a.order&&(a.order=null),yd(a),zd(a,c);var e=d?d(a):1;e!=a.height&&ee(a,e)}function Gd(a){a.parent=null,yd(a)}function Hd(a,b,c,d,e){var f=c.flattenSpans;null==f&&(f=a.options.flattenSpans);var j,g="",h=null,i=new fd(b,a.options.tabSize);for(""==b&&c.blankLine&&c.blankLine(d);!i.eol();){i.pos>a.options.maxHighlightLength?(f=!1,i.pos=Math.min(b.length,i.start+5e4),j=null):j=c.token(i,d);var k=i.current();i.start=i.pos,f&&h==j?g+=k:(g&&e(g,h),g=k,h=j)}g&&e(g,h)}function Id(a,b,c){var d=[a.state.modeGen];Hd(a,b.text,a.doc.mode,c,function(a,b){d.push(a,b)});for(var e=0;a.state.overlays.length>e;++e){var f=a.state.overlays[e],g=1;Hd(a,b.text,f.mode,!0,function(a,b){for(var c=g,e=a.length;e;){var h=d[g],i=h.length;e>=i?e-=i:(d.splice(g,1,h.slice(0,e),d[g+1],h.slice(e)),e=0),g+=2}if(b)if(f.opaque)d.splice(c,g-c,a,b),g=c+2;else for(;g>c;c+=2){var h=d[c+1];d[c+1]=h?h+" "+b:b}})}return d}function Jd(a,b){return b.styles&&b.styles[0]==a.state.modeGen||(b.styles=Id(a,b,b.stateAfter=cb(a,fe(b)))),b.styles}function Kd(a,b,c){var d=a.doc.mode,e=new fd(b.text,a.options.tabSize);for(""==b.text&&d.blankLine&&d.blankLine(c);!e.eol()&&e.pos<=a.options.maxHighlightLength;)d.token(e,c),e.start=e.pos}function Md(a){return a?Ld[a]||(Ld[a]="cm-"+a.replace(/ +/g," cm-")):null}function Nd(a,c,d){for(var f,h,i,g=c,j=!0;f=td(g);)j=!1,g=be(a.doc,f.find().from.line),h||(h=g);var k={pre:Ze("pre"),col:0,pos:0,display:!d,measure:null,addedOne:!1,cm:a};g.textClass&&(k.pre.className=g.textClass);do{k.measure=g==c&&d,k.pos=0,k.addToken=k.measure?Qd:Pd,(b||e)&&a.getOption("lineWrapping")&&(k.addToken=Rd(k.addToken)),d&&i&&g!=c&&!k.addedOne&&(d[0]=k.pre.appendChild(hf(a.display.measure)),k.addedOne=!0);var l=Td(g,k,Jd(a,g));i=g==h,l&&(g=be(a.doc,l.to.line),j=!1)}while(l);d&&!k.addedOne&&(d[0]=k.pre.appendChild(j?Ze("span","\u00a0"):hf(a.display.measure))),k.pre.firstChild||wd(a.doc,c)||k.pre.appendChild(document.createTextNode("\u00a0"));var m;if(d&&b&&(m=ie(g))){var n=m.length-1;m[n].from==m[n].to&&--n;var o=m[n],p=m[n-1];if(o.from+1==o.to&&p&&o.level<p.level){var q=d[k.pos-1];q&&q.parentNode.insertBefore(q.measureRight=hf(a.display.measure),q.nextSibling)}}return Ce(a,"renderLine",a,c,k.pre),k.pre}function Pd(a,b,c,d,e){if(b){if(Od.test(b))for(var f=document.createDocumentFragment(),g=0;;){Od.lastIndex=g;var h=Od.exec(b),i=h?h.index-g:b.length-g;if(i&&(f.appendChild(document.createTextNode(b.slice(g,g+i))),a.col+=i),!h)break;if(g+=i+1," "==h[0]){var j=a.cm.options.tabSize,k=j-a.col%j;f.appendChild(Ze("span",Ne(k),"cm-tab")),a.col+=k}else{var l=Ze("span","\u2022","cm-invalidchar");l.title="\\u"+h[0].charCodeAt(0).toString(16),f.appendChild(l),a.col+=1}}else{a.col+=b.length;var f=document.createTextNode(b)}if(c||d||e||a.measure){var m=c||"";return d&&(m+=d),e&&(m+=e),a.pre.appendChild(Ze("span",[f],m))}a.pre.appendChild(f)}}function Qd(a,c,d,e,f){for(var g=a.cm.options.lineWrapping,h=0;c.length>h;++h){var i=c.charAt(h),j=0==h;i>="\ud800"&&"\udbff">i&&c.length-1>h?(i=c.slice(h,h+2),++h):h&&g&&df.test(c.slice(h-1,h+1))&&a.pre.appendChild(Ze("wbr"));var k=a.measure[a.pos]=Pd(a,i,d,j&&e,h==c.length-1&&f);b&&g&&" "==i&&h&&!/\s/.test(c.charAt(h-1))&&c.length-1>h&&!/\s/.test(c.charAt(h+1))&&(k.style.whiteSpace="normal"),a.pos+=i.length}c.length&&(a.addedOne=!0)}function Rd(a){function b(a){for(var b=" ",c=0;a.length-2>c;++c)b+=c%2?" ":"\u00a0";return b+=" "}return function(c,d,e,f,g){return a(c,d.replace(/ {3,}/,b),e,f,g)}}function Sd(a,b,c){c&&(a.display||(c=c.cloneNode(!0)),a.pre.appendChild(c),a.measure&&b&&(a.measure[a.pos]=c,a.addedOne=!0)),a.pos+=b}function Td(a,b,c){var d=a.markedSpans;if(d)for(var j,l,m,n,o,f=a.text,g=f.length,h=0,e=1,i="",k=0;;){if(k==h){l=m=n="",o=null,k=1/0;for(var p=null,q=0;d.length>q;++q){var r=d[q],s=r.marker;h>=r.from&&(null==r.to||r.to>h)?(null!=r.to&&k>r.to&&(k=r.to,m=""),s.className&&(l+=" "+s.className),s.startStyle&&r.from==h&&(n+=" "+s.startStyle),s.endStyle&&r.to==k&&(m+=" "+s.endStyle),s.collapsed&&(!o||o.marker.width<s.width)&&(o=r)):r.from>h&&k>r.from&&(k=r.from),"bookmark"==s.type&&r.from==h&&s.replacedWith&&(p=s.replacedWith)}if(o&&(o.from||0)==h&&(Sd(b,(null==o.to?g:o.to)-h,null!=o.from&&o.marker.replacedWith),null==o.to))return o.marker.find();p&&!o&&Sd(b,0,p)}if(h>=g)break;for(var t=Math.min(g,k);;){if(i){var u=h+i.length;if(!o){var v=u>t?i.slice(0,t-h):i;b.addToken(b,v,j?j+l:l,n,h+v.length==k?m:"")}if(u>=t){i=i.slice(t-h),h=t;break}h=u,n=""}i=c[e++],j=Md(c[e++])}}else for(var e=1;c.length>e;e+=2)b.addToken(b,c[e],Md(c[e+1]))}function Ud(a,b,c,d,e){function f(a){return c?c[a]:null}function g(a,c,d){Fd(a,c,d,e),Fe(a,"change",a,b)}var h=b.from,i=b.to,j=b.text,k=be(a,h.line),l=be(a,i.line),m=Oe(j),n=f(j.length-1),o=i.line-h.line;if(0==h.ch&&0==i.ch&&""==m){for(var p=0,q=j.length-1,r=[];q>p;++p)r.push(Ed(j[p],f(p),e));g(l,l.text,n),o&&a.remove(h.line,o),r.length&&a.insert(h.line,r)}else if(k==l)if(1==j.length)g(k,k.text.slice(0,h.ch)+m+k.text.slice(i.ch),n);else{for(var r=[],p=1,q=j.length-1;q>p;++p)r.push(Ed(j[p],f(p),e));r.push(Ed(m+k.text.slice(i.ch),n,e)),g(k,k.text.slice(0,h.ch)+j[0],f(0)),a.insert(h.line+1,r)}else if(1==j.length)g(k,k.text.slice(0,h.ch)+j[0]+l.text.slice(i.ch),f(0)),a.remove(h.line+1,o);else{g(k,k.text.slice(0,h.ch)+j[0],f(0)),g(l,m+l.text.slice(i.ch),n);for(var p=1,q=j.length-1,r=[];q>p;++p)r.push(Ed(j[p],f(p),e));o>1&&a.remove(h.line+1,o-1),a.insert(h.line+1,r)}Fe(a,"change",a,b),Cc(a,d.anchor,d.head,null,!0)}function Vd(a){this.lines=a,this.parent=null;for(var b=0,c=a.length,d=0;c>b;++b)a[b].parent=this,d+=a[b].height;this.height=d}function Wd(a){this.children=a;for(var b=0,c=0,d=0,e=a.length;e>d;++d){var f=a[d];b+=f.chunkSize(),c+=f.height,f.parent=this}this.size=b,this.height=c,this.parent=null}function _d(a,b,c){function d(a,e,f){if(a.linked)for(var g=0;a.linked.length>g;++g){var h=a.linked[g];if(h.doc!=e){var i=f&&h.sharedHist;(!c||i)&&(b(h.doc,i),d(h.doc,a,i))}}}d(a,null,!0)}function ae(a,b){if(b.cm)throw Error("This document is already in use.");a.doc=b,b.cm=a,B(a),y(a),a.options.lineWrapping||H(a),a.options.mode=b.modeOption,Cb(a)}function be(a,b){for(b-=a.first;!a.lines;)for(var c=0;;++c){var d=a.children[c],e=d.chunkSize();if(e>b){a=d;break}b-=e}return a.lines[b]}function ce(a,b,c){var d=[],e=b.line;return a.iter(b.line,c.line+1,function(a){var f=a.text;e==c.line&&(f=f.slice(0,c.ch)),e==b.line&&(f=f.slice(b.ch)),d.push(f),++e}),d}function de(a,b,c){var d=[];return a.iter(b,c,function(a){d.push(a.text)}),d}function ee(a,b){for(var c=b-a.height,d=a;d;d=d.parent)d.height+=c}function fe(a){if(null==a.parent)return null;for(var b=a.parent,c=Qe(b.lines,a),d=b.parent;d;b=d,d=d.parent)for(var e=0;d.children[e]!=b;++e)c+=d.children[e].chunkSize();return c+b.first}function ge(a,b){var c=a.first;a:do{for(var d=0,e=a.children.length;e>d;++d){var f=a.children[d],g=f.height;if(g>b){a=f;continue a}b-=g,c+=f.chunkSize()}return c}while(!a.lines);for(var d=0,e=a.lines.length;e>d;++d){var h=a.lines[d],i=h.height;if(i>b)break;b-=i}return c+d}function he(a,b){b=vd(a.doc,b);for(var c=0,d=b.parent,e=0;d.lines.length>e;++e){var f=d.lines[e];if(f==b)break;c+=f.height}for(var g=d.parent;g;d=g,g=d.parent)for(var e=0;g.children.length>e;++e){var h=g.children[e];if(h==d)break;c+=h.height}return c}function ie(a){var b=a.order;return null==b&&(b=a.order=wf(a.text)),b}function je(){return{done:[],undone:[],undoDepth:1/0,lastTime:0,lastOp:null,lastOrigin:null,dirtyCounter:0}}function ke(a,b,c,d){var e=b["spans_"+a.id],f=0;a.iter(Math.max(a.first,c),Math.min(a.first+a.size,d),function(c){c.markedSpans&&((e||(e=b["spans_"+a.id]={}))[f]=c.markedSpans),++f})}function le(a,b){var c={from:b.from,to:hc(b),text:ce(a,b.from,b.to)};return ke(a,c,b.from.line,b.to.line+1),_d(a,function(a){ke(a,c,b.from.line,b.to.line+1)},!0),c}function me(a,b,c,d){var e=a.history;e.undone.length=0;var f=+new Date,g=Oe(e.done);if(g&&(e.lastOp==d||e.lastOrigin==b.origin&&b.origin&&("+"==b.origin.charAt(0)&&a.cm&&e.lastTime>f-a.cm.options.historyEventDelay||"*"==b.origin.charAt(0)))){var h=Oe(g.changes);tc(b.from,b.to)&&tc(b.from,h.to)?h.to=hc(b):g.changes.push(le(a,b)),g.anchorAfter=c.anchor,g.headAfter=c.head}else{for(g={changes:[le(a,b)],anchorBefore:a.sel.anchor,headBefore:a.sel.head,anchorAfter:c.anchor,headAfter:c.head},e.done.push(g);e.done.length>e.undoDepth;)e.done.shift();0>e.dirtyCounter?e.dirtyCounter=0/0:e.dirtyCounter++}e.lastTime=f,e.lastOp=d,e.lastOrigin=b.origin}function ne(a){if(!a)return null;for(var c,b=0;a.length>b;++b)a[b].marker.explicitlyCleared?c||(c=a.slice(0,b)):c&&c.push(a[b]);
return c?c.length?c:null:a}function oe(a,b){var c=b["spans_"+a.id];if(!c)return null;for(var d=0,e=[];b.text.length>d;++d)e.push(ne(c[d]));return e}function pe(a,b){for(var c=0,d=[];a.length>c;++c){var e=a[c],f=e.changes,g=[];d.push({changes:g,anchorBefore:e.anchorBefore,headBefore:e.headBefore,anchorAfter:e.anchorAfter,headAfter:e.headAfter});for(var h=0;f.length>h;++h){var j,i=f[h];if(g.push({from:i.from,to:i.to,text:i.text}),b)for(var k in i)(j=k.match(/^spans_(\d+)$/))&&Qe(b,Number(j[1]))>-1&&(Oe(g)[k]=i[k],delete i[k])}}return d}function qe(a,b,c,d){a.line>c?a.line+=d:a.line>b&&(a.line=b,a.ch=0)}function re(a,b,c,d){for(var e=0;a.length>e;++e){for(var f=a[e],g=!0,h=0;f.changes.length>h;++h){var i=f.changes[h];if(f.copied||(i.from=vc(i.from),i.to=vc(i.to)),i.from.line>c)i.from.line+=d,i.to.line+=d;else if(i.to.line>=b){g=!1;break}}f.copied||(f.anchorBefore=vc(f.anchorBefore),f.headBefore=vc(f.headBefore),f.anchorAfter=vc(f.anchorAfter),f.readAfter=vc(f.headAfter),f.copied=!0),g?(qe(f.anchorBefore),qe(f.headBefore),qe(f.anchorAfter),qe(f.headAfter)):(a.splice(0,e+1),e=0)}}function se(a,b){var c=b.from.line,d=b.to.line,e=b.text.length-(d-c)-1;re(a.done,c,d,e),re(a.undone,c,d,e)}function te(){xe(this)}function ue(a){return a.stop||(a.stop=te),a}function ve(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function we(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0}function xe(a){ve(a),we(a)}function ye(a){return a.target||a.srcElement}function ze(a){var b=a.which;return null==b&&(1&a.button?b=1:2&a.button?b=3:4&a.button&&(b=2)),p&&a.ctrlKey&&1==b&&(b=3),b}function Ae(a,b,c){if(a.addEventListener)a.addEventListener(b,c,!1);else if(a.attachEvent)a.attachEvent("on"+b,c);else{var d=a._handlers||(a._handlers={}),e=d[b]||(d[b]=[]);e.push(c)}}function Be(a,b,c){if(a.removeEventListener)a.removeEventListener(b,c,!1);else if(a.detachEvent)a.detachEvent("on"+b,c);else{var d=a._handlers&&a._handlers[b];if(!d)return;for(var e=0;d.length>e;++e)if(d[e]==c){d.splice(e,1);break}}}function Ce(a,b){var c=a._handlers&&a._handlers[b];if(c)for(var d=Array.prototype.slice.call(arguments,2),e=0;c.length>e;++e)c[e].apply(null,d)}function Fe(a,b){function e(a){return function(){a.apply(null,d)}}var c=a._handlers&&a._handlers[b];if(c){var d=Array.prototype.slice.call(arguments,2);De||(++Ee,De=[],setTimeout(Ge,0));for(var f=0;c.length>f;++f)De.push(e(c[f]))}}function Ge(){--Ee;var a=De;De=null;for(var b=0;a.length>b;++b)a[b]()}function He(a,b){var c=a._handlers&&a._handlers[b];return c&&c.length>0}function Ke(){this.id=null}function Le(a,b,c,d,e){null==b&&(b=a.search(/[^\s\u00a0]/),-1==b&&(b=a.length));for(var f=d||0,g=e||0;b>f;++f)"  "==a.charAt(f)?g+=c-g%c:++g;return g}function Ne(a){for(;a>=Me.length;)Me.push(Oe(Me)+" ");return Me[a]}function Oe(a){return a[a.length-1]}function Pe(a){n?(a.selectionStart=0,a.selectionEnd=a.value.length):a.select()}function Qe(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0,d=a.length;d>c;++c)if(a[c]==b)return c;return-1}function Re(a,b){function c(){}c.prototype=a;var d=new c;return b&&Se(b,d),d}function Se(a,b){b||(b={});for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}function Te(a){for(var b=[],c=0;a>c;++c)b.push(void 0);return b}function Ue(a){var b=Array.prototype.slice.call(arguments,1);return function(){return a.apply(null,b)}}function We(a){return/\w/.test(a)||a>"\u0080"&&(a.toUpperCase()!=a.toLowerCase()||Ve.test(a))}function Xe(a){for(var b in a)if(a.hasOwnProperty(b)&&a[b])return!1;return!0}function Ze(a,b,c,d){var e=document.createElement(a);if(c&&(e.className=c),d&&(e.style.cssText=d),"string"==typeof b)af(e,b);else if(b)for(var f=0;b.length>f;++f)e.appendChild(b[f]);return e}function $e(a){for(var b=a.childNodes.length;b>0;--b)a.removeChild(a.firstChild);return a}function _e(a,b){return $e(a).appendChild(b)}function af(a,b){d?(a.innerHTML="",a.appendChild(document.createTextNode(b))):a.textContent=b}function bf(a){return a.getBoundingClientRect()}function ff(a){if(null!=ef)return ef;var b=Ze("div",null,null,"width: 50px; height: 50px; overflow-x: scroll");return _e(a,b),b.offsetWidth&&(ef=b.offsetHeight-b.clientHeight),ef||0}function hf(a){if(null==gf){var b=Ze("span","\u200b");_e(a,Ze("span",[b,document.createTextNode("x")])),0!=a.firstChild.offsetHeight&&(gf=1>=b.offsetWidth&&b.offsetHeight>2&&!c)}return gf?Ze("span","\u200b"):Ze("span","\u00a0",null,"display: inline-block; width: 1px; margin-right: -1px")}function nf(a,b,c,d){if(!a)return d(b,c,"ltr");for(var e=0;a.length>e;++e){var f=a[e];(c>f.from&&f.to>b||b==c&&f.to==b)&&d(Math.max(f.from,b),Math.min(f.to,c),1==f.level?"rtl":"ltr")}}function of(a){return a.level%2?a.to:a.from}function pf(a){return a.level%2?a.from:a.to}function qf(a){var b=ie(a);return b?of(b[0]):0}function rf(a){var b=ie(a);return b?pf(Oe(b)):a.text.length}function sf(a,b){var c=be(a.doc,b),d=vd(a.doc,c);d!=c&&(b=fe(d));var e=ie(d),f=e?e[0].level%2?rf(d):qf(d):0;return sc(b,f)}function tf(a,b){for(var c,d;c=ud(d=be(a.doc,b));)b=c.find().to.line;var e=ie(d),f=e?e[0].level%2?qf(d):rf(d):d.text.length;return sc(b,f)}function uf(a,b,c,d){var e=ie(a);if(!e)return vf(a,b,c,d);for(var f=d?function(b,c){do b+=c;while(b>0&&Ye.test(a.text.charAt(b)));return b}:function(a,b){return a+b},g=e[0].level,h=0;e.length>h;++h){var i=e[h],j=i.level%2==g;if(b>i.from&&i.to>b||j&&(i.from==b||i.to==b))break}for(var k=f(b,i.level%2?-c:c);null!=k;)if(i.level%2==g){if(!(i.from>k||k>i.to))break;i=e[h+=c],k=i&&(c>0==i.level%2?f(i.to,-1):f(i.from,1))}else if(k==of(i))i=e[--h],k=i&&pf(i);else{if(k!=pf(i))break;i=e[++h],k=i&&of(i)}return 0>k||k>a.text.length?null:k}function vf(a,b,c,d){var e=b+c;if(d)for(;e>0&&Ye.test(a.text.charAt(e));)e+=c;return 0>e||e>a.text.length?null:e}var a=/gecko\/\d/i.test(navigator.userAgent),b=/MSIE \d/.test(navigator.userAgent),c=b&&(null==document.documentMode||8>document.documentMode),d=b&&(null==document.documentMode||9>document.documentMode),e=/WebKit\//.test(navigator.userAgent),f=e&&/Qt\/\d+\.\d+/.test(navigator.userAgent),g=/Chrome\//.test(navigator.userAgent),h=/Opera\//.test(navigator.userAgent),i=/Apple Computer/.test(navigator.vendor),j=/KHTML\//.test(navigator.userAgent),k=/Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent),l=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),m=/PhantomJS/.test(navigator.userAgent),n=/AppleWebKit/.test(navigator.userAgent)&&/Mobile\/\w+/.test(navigator.userAgent),o=n||/Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),p=n||/Mac/.test(navigator.platform),q=/windows/i.test(navigator.platform),r=h&&navigator.userAgent.match(/Version\/(\d*\.\d*)/);r&&(r=Number(r[1]));var tb,Mb,Nb,s=p&&(f||h&&(null==r||12.11>r)),t=a||b&&!d,u=!1,v=!1,wb=0,Ub=0,Vb=null;b?Vb=-.53:a?Vb=15:g?Vb=-.7:i&&(Vb=-1/3);var Zb,fc,ac=null;w.Pos=sc,w.prototype={focus:function(){window.focus(),Hb(this),dc(this),Eb(this)},setOption:function(a,b){var c=this.options,d=c[a];(c[a]!=b||"mode"==a)&&(c[a]=b,Rc.hasOwnProperty(a)&&zb(this,Rc[a])(this,b,d))},getOption:function(a){return this.options[a]},getDoc:function(){return this.doc},addKeyMap:function(a,b){this.state.keyMaps[b?"push":"unshift"](a)},removeKeyMap:function(a){for(var b=this.state.keyMaps,c=0;b.length>c;++c)if(("string"==typeof a?b[c].name:b[c])==a)return b.splice(c,1),!0},addOverlay:zb(null,function(a,b){var c=a.token?a:w.getMode(this.options,a);if(c.startState)throw Error("Overlays may not be stateful.");this.state.overlays.push({mode:c,modeSpec:a,opaque:b&&b.opaque}),this.state.modeGen++,Cb(this)}),removeOverlay:zb(null,function(a){for(var b=this.state.overlays,c=0;b.length>c;++c)if(b[c].modeSpec==a)return b.splice(c,1),this.state.modeGen++,Cb(this),void 0}),indentLine:zb(null,function(a,b,c){"string"!=typeof b&&(b=null==b?this.options.smartIndent?"smart":"prev":b?"add":"subtract"),zc(this.doc,a)&&Lc(this,a,b,c)}),indentSelection:zb(null,function(a){var b=this.doc.sel;if(tc(b.from,b.to))return Lc(this,b.from.line,a);for(var c=b.to.line-(b.to.ch?0:1),d=b.from.line;c>=d;++d)Lc(this,d,a)}),getTokenAt:function(a){var b=this.doc;a=xc(b,a);for(var c=cb(this,a.line),d=this.doc.mode,e=be(b,a.line),f=new fd(e.text,this.options.tabSize);f.pos<a.ch&&!f.eol();){f.start=f.pos;var g=d.token(f,c)}return{start:f.start,end:f.pos,string:f.current(),className:g||null,type:g||null,state:c}},getStateAfter:function(a){var b=this.doc;return a=wc(b,null==a?b.first+b.size-1:a),cb(this,a+1)},cursorCoords:function(a,b){var c,d=this.doc.sel;return c=null==a?d.head:"object"==typeof a?xc(this.doc,a):a?d.from:d.to,pb(this,c,b||"page")},charCoords:function(a,b){return ob(this,xc(this.doc,a),b||"page")},coordsChar:function(a,b){return a=nb(this,a,b||"page"),rb(this,a.left,a.top)},defaultTextHeight:function(){return ub(this.display)},defaultCharWidth:function(){return vb(this.display)},setGutterMarker:zb(null,function(a,b,c){return Mc(this,a,function(a){var d=a.gutterMarkers||(a.gutterMarkers={});return d[b]=c,!c&&Xe(d)&&(a.gutterMarkers=null),!0})}),clearGutter:zb(null,function(a){var b=this,c=b.doc,d=c.first;c.iter(function(c){c.gutterMarkers&&c.gutterMarkers[a]&&(c.gutterMarkers[a]=null,Cb(b,d,d+1),Xe(c.gutterMarkers)&&(c.gutterMarkers=null)),++d})}),addLineClass:zb(null,function(a,b,c){return Mc(this,a,function(a){var d="text"==b?"textClass":"background"==b?"bgClass":"wrapClass";if(a[d]){if(RegExp("\\b"+c+"\\b").test(a[d]))return!1;a[d]+=" "+c}else a[d]=c;return!0})}),removeLineClass:zb(null,function(a,b,c){return Mc(this,a,function(a){var d="text"==b?"textClass":"background"==b?"bgClass":"wrapClass",e=a[d];if(!e)return!1;if(null==c)a[d]=null;else{var f=e.replace(RegExp("^"+c+"\\b\\s*|\\s*\\b"+c+"\\b"),"");if(f==e)return!1;a[d]=f||null}return!0})}),addLineWidget:zb(null,function(a,b,c){return Dd(this,a,b,c)}),removeLineWidget:function(a){a.clear()},lineInfo:function(a){if("number"==typeof a){if(!zc(this.doc,a))return null;var b=a;if(a=be(this.doc,a),!a)return null}else{var b=fe(a);if(null==b)return null}return{line:b,handle:a,text:a.text,gutterMarkers:a.gutterMarkers,textClass:a.textClass,bgClass:a.bgClass,wrapClass:a.wrapClass,widgets:a.widgets}},getViewport:function(){return{from:this.display.showingFrom,to:this.display.showingTo}},addWidget:function(a,b,c,d,e){var f=this.display;a=pb(this,xc(this.doc,a));var g=a.bottom,h=a.left;if(b.style.position="absolute",f.sizer.appendChild(b),"over"==d)g=a.top;else if("above"==d||"near"==d){var i=Math.max(f.wrapper.clientHeight,this.doc.height),j=Math.max(f.sizer.clientWidth,f.lineSpace.clientWidth);("above"==d||a.bottom+b.offsetHeight>i)&&a.top>b.offsetHeight?g=a.top-b.offsetHeight:i>=a.bottom+b.offsetHeight&&(g=a.bottom),h+b.offsetWidth>j&&(h=j-b.offsetWidth)}b.style.top=g+db(f)+"px",b.style.left=b.style.right="","right"==e?(h=f.sizer.clientWidth-b.offsetWidth,b.style.right="0px"):("left"==e?h=0:"middle"==e&&(h=(f.sizer.clientWidth-b.offsetWidth)/2),b.style.left=h+"px"),c&&Hc(this,h,g,h+b.offsetWidth,g+b.offsetHeight)},triggerOnKeyDown:zb(null,bc),execCommand:function(a){return _c[a](this)},findPosH:function(a,b,c,d){var e=1;0>b&&(e=-1,b=-b);for(var f=0,g=xc(this.doc,a);b>f&&(g=Nc(this.doc,g,e,c,d),!g.hitSide);++f);return g},moveH:zb(null,function(a,b){var d,c=this.doc.sel;d=c.shift||c.extend||tc(c.from,c.to)?Nc(this.doc,c.head,a,b,this.options.rtlMoveVisually):0>a?c.from:c.to,Ac(this.doc,d,d,a)}),deleteH:zb(null,function(a,b){var c=this.doc.sel;tc(c.from,c.to)?rc(this.doc,"",c.from,Nc(this.doc,c.head,a,b,!1),"+delete"):rc(this.doc,"",c.from,c.to,"+delete"),this.curOp.userSelChange=!0}),findPosV:function(a,b,c,d){var e=1,f=d;0>b&&(e=-1,b=-b);for(var g=0,h=xc(this.doc,a);b>g;++g){var i=pb(this,h,"div");if(null==f?f=i.left:i.left=f,h=Oc(this,i,e,c),h.hitSide)break}return h},moveV:zb(null,function(a,b){var c=this.doc.sel,d=pb(this,c.head,"div");null!=c.goalColumn&&(d.left=c.goalColumn);var e=Oc(this,d,a,b);"page"==b&&Kc(this,0,ob(this,e,"div").top-d.top),Ac(this.doc,e,e,a),c.goalColumn=d.left}),toggleOverwrite:function(){(this.state.overwrite=!this.state.overwrite)?this.display.cursor.className+=" CodeMirror-overwrite":this.display.cursor.className=this.display.cursor.className.replace(" CodeMirror-overwrite","")},hasFocus:function(){return this.state.focused},scrollTo:zb(null,function(a,b){Jc(this,a,b)}),getScrollInfo:function(){var a=this.display.scroller,b=Ie;return{left:a.scrollLeft,top:a.scrollTop,height:a.scrollHeight-b,width:a.scrollWidth-b,clientHeight:a.clientHeight-b,clientWidth:a.clientWidth-b}},scrollIntoView:zb(null,function(a,b){"number"==typeof a&&(a=sc(a,0)),b||(b=0);var c=a;a&&null==a.line||(this.curOp.scrollToPos=a?xc(this.doc,a):this.doc.sel.head,this.curOp.scrollToPosMargin=b,c=pb(this,this.curOp.scrollToPos));var d=Ic(this,c.left,c.top-b,c.right,c.bottom+b);Jc(this,d.scrollLeft,d.scrollTop)}),setSize:function(a,b){function c(a){return"number"==typeof a||/^\d+$/.test(a+"")?a+"px":a}null!=a&&(this.display.wrapper.style.width=c(a)),null!=b&&(this.display.wrapper.style.height=c(b)),this.refresh()},on:function(a,b){Ae(this,a,b)},off:function(a,b){Be(this,a,b)},operation:function(a){return Bb(this,a)},refresh:zb(null,function(){lb(this),Jc(this,this.doc.scrollLeft,this.doc.scrollTop),Cb(this)}),swapDoc:zb(null,function(a){var b=this.doc;return b.cm=null,ae(this,a),lb(this),Gb(this,!0),Jc(this,a.scrollLeft,a.scrollTop),b}),getInputField:function(){return this.display.input},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}};var Rc=w.optionHandlers={},Sc=w.defaults={},Uc=w.Init={toString:function(){return"CodeMirror.Init"}};Tc("value","",function(a,b){a.setValue(b)},!0),Tc("mode",null,function(a,b){a.doc.modeOption=b,y(a)},!0),Tc("indentUnit",2,y,!0),Tc("indentWithTabs",!1),Tc("smartIndent",!0),Tc("tabSize",4,function(a){y(a),lb(a),Cb(a)},!0),Tc("electricChars",!0),Tc("rtlMoveVisually",!q),Tc("theme","default",function(a){D(a),E(a)},!0),Tc("keyMap","default",C),Tc("extraKeys",null),Tc("onKeyEvent",null),Tc("onDragEvent",null),Tc("lineWrapping",!1,z,!0),Tc("gutters",[],function(a){I(a.options),E(a)},!0),Tc("fixedGutter",!0,function(a,b){a.display.gutters.style.left=b?O(a.display)+"px":"0",a.refresh()},!0),Tc("lineNumbers",!1,function(a){I(a.options),E(a)},!0),Tc("firstLineNumber",1,E,!0),Tc("lineNumberFormatter",function(a){return a},E,!0),Tc("showCursorWhenSelecting",!1,X,!0),Tc("readOnly",!1,function(a,b){"nocursor"==b?(ec(a),a.display.input.blur()):b||Gb(a,!0)}),Tc("dragDrop",!0),Tc("cursorBlinkRate",530),Tc("cursorHeight",1),Tc("workTime",100),Tc("workDelay",100),Tc("flattenSpans",!0),Tc("pollInterval",100),Tc("undoDepth",40,function(a,b){a.doc.history.undoDepth=b}),Tc("historyEventDelay",500),Tc("viewportMargin",10,function(a){a.refresh()},!0),Tc("maxHighlightLength",1e4,function(a){y(a),a.refresh()},!0),Tc("moveInputWithCursor",!0,function(a,b){b||(a.display.inputDiv.style.top=a.display.inputDiv.style.left=0)}),Tc("tabindex",null,function(a,b){a.display.input.tabIndex=b||""}),Tc("autofocus",null);var Vc=w.modes={},Wc=w.mimeModes={};w.defineMode=function(a,b){if(w.defaults.mode||"null"==a||(w.defaults.mode=a),arguments.length>2){b.dependencies=[];for(var c=2;arguments.length>c;++c)b.dependencies.push(arguments[c])}Vc[a]=b},w.defineMIME=function(a,b){Wc[a]=b},w.resolveMode=function(a){if("string"==typeof a&&Wc.hasOwnProperty(a))a=Wc[a];else if("string"==typeof a&&/^[\w\-]+\/[\w\-]+\+xml$/.test(a))return w.resolveMode("application/xml");return"string"==typeof a?{name:a}:a||{name:"null"}},w.getMode=function(a,b){b=w.resolveMode(b);var c=Vc[b.name];if(!c)return w.getMode(a,"text/plain");var d=c(a,b);if(Xc.hasOwnProperty(b.name)){var e=Xc[b.name];for(var f in e)e.hasOwnProperty(f)&&(d.hasOwnProperty(f)&&(d["_"+f]=d[f]),d[f]=e[f])}return d.name=b.name,d},w.defineMode("null",function(){return{token:function(a){a.skipToEnd()}}}),w.defineMIME("text/plain","null");var Xc=w.modeExtensions={};w.extendMode=function(a,b){var c=Xc.hasOwnProperty(a)?Xc[a]:Xc[a]={};Se(b,c)},w.defineExtension=function(a,b){w.prototype[a]=b},w.defineDocExtension=function(a,b){Yd.prototype[a]=b},w.defineOption=Tc;var Yc=[];w.defineInitHook=function(a){Yc.push(a)},w.copyState=Zc,w.startState=$c,w.innerMode=function(a,b){for(;a.innerMode;){var c=a.innerMode(b);b=c.state,a=c.mode}return c||{mode:a,state:b}};var _c=w.commands={selectAll:function(a){a.setSelection(sc(a.firstLine(),0),sc(a.lastLine()))},killLine:function(a){var b=a.getCursor(!0),c=a.getCursor(!1),d=!tc(b,c);d||a.getLine(b.line).length!=b.ch?a.replaceRange("",b,d?c:sc(b.line),"+delete"):a.replaceRange("",b,sc(b.line+1,0),"+delete")},deleteLine:function(a){var b=a.getCursor().line;a.replaceRange("",sc(b,0),sc(b),"+delete")},undo:function(a){a.undo()},redo:function(a){a.redo()},goDocStart:function(a){a.extendSelection(sc(a.firstLine(),0))},goDocEnd:function(a){a.extendSelection(sc(a.lastLine()))},goLineStart:function(a){a.extendSelection(sf(a,a.getCursor().line))},goLineStartSmart:function(a){var b=a.getCursor(),c=sf(a,b.line),d=a.getLineHandle(c.line),e=ie(d);if(e&&0!=e[0].level)a.extendSelection(c);else{var f=Math.max(0,d.text.search(/\S/)),g=b.line==c.line&&f>=b.ch&&b.ch;a.extendSelection(sc(c.line,g?0:f))}},goLineEnd:function(a){a.extendSelection(tf(a,a.getCursor().line))},goLineRight:function(a){var b=a.charCoords(a.getCursor(),"div").top+5;a.extendSelection(a.coordsChar({left:a.display.lineDiv.offsetWidth+100,top:b},"div"))},goLineLeft:function(a){var b=a.charCoords(a.getCursor(),"div").top+5;a.extendSelection(a.coordsChar({left:0,top:b},"div"))},goLineUp:function(a){a.moveV(-1,"line")},goLineDown:function(a){a.moveV(1,"line")},goPageUp:function(a){a.moveV(-1,"page")},goPageDown:function(a){a.moveV(1,"page")},goCharLeft:function(a){a.moveH(-1,"char")},goCharRight:function(a){a.moveH(1,"char")},goColumnLeft:function(a){a.moveH(-1,"column")},goColumnRight:function(a){a.moveH(1,"column")},goWordLeft:function(a){a.moveH(-1,"word")},goGroupRight:function(a){a.moveH(1,"group")},goGroupLeft:function(a){a.moveH(-1,"group")},goWordRight:function(a){a.moveH(1,"word")},delCharBefore:function(a){a.deleteH(-1,"char")},delCharAfter:function(a){a.deleteH(1,"char")},delWordBefore:function(a){a.deleteH(-1,"word")},delWordAfter:function(a){a.deleteH(1,"word")},delGroupBefore:function(a){a.deleteH(-1,"group")},delGroupAfter:function(a){a.deleteH(1,"group")},indentAuto:function(a){a.indentSelection("smart")},indentMore:function(a){a.indentSelection("add")},indentLess:function(a){a.indentSelection("subtract")},insertTab:function(a){a.replaceSelection("  ","end","+input")},defaultTab:function(a){a.somethingSelected()?a.indentSelection("add"):a.replaceSelection(" ","end","+input")},transposeChars:function(a){var b=a.getCursor(),c=a.getLine(b.line);b.ch>0&&b.ch<c.length-1&&a.replaceRange(c.charAt(b.ch)+c.charAt(b.ch-1),sc(b.line,b.ch-1),sc(b.line,b.ch+1))},newlineAndIndent:function(a){zb(a,function(){a.replaceSelection("\n","end","+input"),a.indentLine(a.getCursor().line,null,!0)})()},toggleOverwrite:function(a){a.toggleOverwrite()}},ad=w.keyMap={};ad.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite"},ad.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Alt-Up":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Down":"goDocEnd","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore",fallthrough:"basic"},ad.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineStart","Cmd-Right":"goLineEnd","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore",fallthrough:["basic","emacsy"]},ad["default"]=p?ad.macDefault:ad.pcDefault,ad.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-D":"delWordAfter","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars"},w.lookupKey=cd,w.isModifierKey=dd,w.keyName=ed,w.fromTextArea=function(a,b){function e(){a.value=i.getValue()}if(b||(b={}),b.value=a.value,!b.tabindex&&a.tabindex&&(b.tabindex=a.tabindex),!b.placeholder&&a.placeholder&&(b.placeholder=a.placeholder),null==b.autofocus){var c=document.body;try{c=document.activeElement}catch(d){}b.autofocus=c==a||null!=a.getAttribute("autofocus")&&c==document.body}if(a.form&&(Ae(a.form,"submit",e),!b.leaveSubmitMethodAlone)){var f=a.form,g=f.submit;try{var h=f.submit=function(){e(),f.submit=g,f.submit(),f.submit=h}}catch(d){}}a.style.display="none";var i=w(function(b){a.parentNode.insertBefore(b,a.nextSibling)},b);return i.save=e,i.getTextArea=function(){return a},i.toTextArea=function(){e(),a.parentNode.removeChild(i.getWrapperElement()),a.style.display="",a.form&&(Be(a.form,"submit",e),"function"==typeof a.form.submit&&(a.form.submit=g))},i},fd.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return 0==this.pos},peek:function(){return this.string.charAt(this.pos)||void 0},next:function(){return this.pos<this.string.length?this.string.charAt(this.pos++):void 0},eat:function(a){var b=this.string.charAt(this.pos);if("string"==typeof a)var c=b==a;else var c=b&&(a.test?a.test(b):a(b));return c?(++this.pos,b):void 0},eatWhile:function(a){for(var b=this.pos;this.eat(a););return this.pos>b},eatSpace:function(){for(var a=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>a},skipToEnd:function(){this.pos=this.string.length},skipTo:function(a){var b=this.string.indexOf(a,this.pos);return b>-1?(this.pos=b,!0):void 0},backUp:function(a){this.pos-=a},column:function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=Le(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue},indentation:function(){return Le(this.string,null,this.tabSize)},match:function(a,b,c){if("string"!=typeof a){var f=this.string.slice(this.pos).match(a);return f&&f.index>0?null:(f&&b!==!1&&(this.pos+=f[0].length),f)}var d=function(a){return c?a.toLowerCase():a},e=this.string.substr(this.pos,a.length);return d(e)==d(a)?(b!==!1&&(this.pos+=a.length),!0):void 0},current:function(){return this.string.slice(this.start,this.pos)}},w.StringStream=fd,w.TextMarker=gd,gd.prototype.clear=function(){if(!this.explicitlyCleared){var a=this.doc.cm,b=a&&!a.curOp;b&&xb(a);for(var c=null,d=null,e=0;this.lines.length>e;++e){var f=this.lines[e],g=kd(f.markedSpans,this);null!=g.to&&(d=fe(f)),f.markedSpans=ld(f.markedSpans,g),null!=g.from?c=fe(f):this.collapsed&&!wd(this.doc,f)&&a&&ee(f,ub(a.display))}if(a&&this.collapsed&&!a.options.lineWrapping)for(var e=0;this.lines.length>e;++e){var h=vd(a.doc,this.lines[e]),i=G(a.doc,h);i>a.display.maxLineLength&&(a.display.maxLine=h,a.display.maxLineLength=i,a.display.maxLineChanged=!0)}null!=c&&a&&Cb(a,c,d+1),this.lines.length=0,this.explicitlyCleared=!0,this.collapsed&&this.doc.cantEdit&&(this.doc.cantEdit=!1,a&&Dc(a)),b&&yb(a),Fe(this,"clear")}},gd.prototype.find=function(){for(var a,b,c=0;this.lines.length>c;++c){var d=this.lines[c],e=kd(d.markedSpans,this);if(null!=e.from||null!=e.to){var f=fe(d);null!=e.from&&(a=sc(f,e.from)),null!=e.to&&(b=sc(f,e.to))}}return"bookmark"==this.type?a:a&&{from:a,to:b}},gd.prototype.getOptions=function(a){var b=this.replacedWith;return{className:this.className,inclusiveLeft:this.inclusiveLeft,inclusiveRight:this.inclusiveRight,atomic:this.atomic,collapsed:this.collapsed,replacedWith:a?b&&b.cloneNode(!0):b,readOnly:this.readOnly,startStyle:this.startStyle,endStyle:this.endStyle}},gd.prototype.attachLine=function(a){if(!this.lines.length&&this.doc.cm){var b=this.doc.cm.curOp;b.maybeHiddenMarkers&&-1!=Qe(b.maybeHiddenMarkers,this)||(b.maybeUnhiddenMarkers||(b.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(a)},gd.prototype.detachLine=function(a){if(this.lines.splice(Qe(this.lines,a),1),!this.lines.length&&this.doc.cm){var b=this.doc.cm.curOp;(b.maybeHiddenMarkers||(b.maybeHiddenMarkers=[])).push(this)}},w.SharedTextMarker=id,id.prototype.clear=function(){if(!this.explicitlyCleared){this.explicitlyCleared=!0;for(var a=0;this.markers.length>a;++a)this.markers[a].clear();Fe(this,"clear")}},id.prototype.find=function(){return this.primary.find()},id.prototype.getOptions=function(a){var b=this.primary.getOptions(a);return b.shared=!0,b};var Ad=w.LineWidget=function(a,b,c){for(var d in c)c.hasOwnProperty(d)&&(this[d]=c[d]);this.cm=a,this.node=b};Ad.prototype.clear=Bd(function(){var a=this.line.widgets,b=fe(this.line);if(null!=b&&a){for(var c=0;a.length>c;++c)a[c]==this&&a.splice(c--,1);a.length||(this.line.widgets=null),ee(this.line,Math.max(0,this.line.height-Cd(this))),Cb(this.cm,b,b+1)}}),Ad.prototype.changed=Bd(function(){var a=this.height;this.height=null;var b=Cd(this)-a;if(b){ee(this.line,this.line.height+b);var c=fe(this.line);Cb(this.cm,c,c+1)}});var Ld={},Od=/[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\uFEFF]/g;Vd.prototype={chunkSize:function(){return this.lines.length},removeInner:function(a,b){for(var c=a,d=a+b;d>c;++c){var e=this.lines[c];this.height-=e.height,Gd(e),Fe(e,"delete")}this.lines.splice(a,b)},collapse:function(a){a.splice.apply(a,[a.length,0].concat(this.lines))},insertInner:function(a,b,c){this.height+=c,this.lines=this.lines.slice(0,a).concat(b).concat(this.lines.slice(a));for(var d=0,e=b.length;e>d;++d)b[d].parent=this},iterN:function(a,b,c){for(var d=a+b;d>a;++a)if(c(this.lines[a]))return!0}},Wd.prototype={chunkSize:function(){return this.size},removeInner:function(a,b){this.size-=b;for(var c=0;this.children.length>c;++c){var d=this.children[c],e=d.chunkSize();if(e>a){var f=Math.min(b,e-a),g=d.height;if(d.removeInner(a,f),this.height-=g-d.height,e==f&&(this.children.splice(c--,1),d.parent=null),0==(b-=f))break;a=0}else a-=e}if(25>this.size-b){var h=[];this.collapse(h),this.children=[new Vd(h)],this.children[0].parent=this}},collapse:function(a){for(var b=0,c=this.children.length;c>b;++b)this.children[b].collapse(a)},insertInner:function(a,b,c){this.size+=b.length,this.height+=c;for(var d=0,e=this.children.length;e>d;++d){var f=this.children[d],g=f.chunkSize();if(g>=a){if(f.insertInner(a,b,c),f.lines&&f.lines.length>50){for(;f.lines.length>50;){var h=f.lines.splice(f.lines.length-25,25),i=new Vd(h);f.height-=i.height,this.children.splice(d+1,0,i),i.parent=this}this.maybeSpill()}break}a-=g}},maybeSpill:function(){if(!(10>=this.children.length)){var a=this;do{var b=a.children.splice(a.children.length-5,5),c=new Wd(b);if(a.parent){a.size-=c.size,a.height-=c.height;var e=Qe(a.parent.children,a);a.parent.children.splice(e+1,0,c)}else{var d=new Wd(a.children);d.parent=a,a.children=[d,c],a=d}c.parent=a.parent}while(a.children.length>10);a.parent.maybeSpill()}},iterN:function(a,b,c){for(var d=0,e=this.children.length;e>d;++d){var f=this.children[d],g=f.chunkSize();if(g>a){var h=Math.min(b,g-a);if(f.iterN(a,h,c))return!0;if(0==(b-=h))break;a=0}else a-=g}}};var Xd=0,Yd=w.Doc=function(a,b,c){if(!(this instanceof Yd))return new Yd(a,b,c);null==c&&(c=0),Wd.call(this,[new Vd([Ed("",null)])]),this.first=c,this.scrollTop=this.scrollLeft=0,this.cantEdit=!1,this.history=je(),this.frontier=c;var d=sc(c,0);this.sel={from:d,to:d,head:d,anchor:d,shift:!1,extend:!1,goalColumn:null},this.id=++Xd,this.modeOption=b,"string"==typeof a&&(a=jf(a)),Ud(this,{from:d,to:d,text:a},null,{head:d,anchor:d})};Yd.prototype=Re(Wd.prototype,{iter:function(a,b,c){c?this.iterN(a-this.first,b-a,c):this.iterN(this.first,this.first+this.size,a)},insert:function(a,b){for(var c=0,d=0,e=b.length;e>d;++d)c+=b[d].height;this.insertInner(a-this.first,b,c)},remove:function(a,b){this.removeInner(a-this.first,b)},getValue:function(a){var b=de(this,this.first,this.first+this.size);return a===!1?b:b.join(a||"\n")},setValue:function(a){var b=sc(this.first,0),c=this.first+this.size-1;lc(this,{from:b,to:sc(c,be(this,c).text.length),text:jf(a),origin:"setValue"},{head:b,anchor:b},!0)},replaceRange:function(a,b,c,d){b=xc(this,b),c=c?xc(this,c):b,rc(this,a,b,c,d)},getRange:function(a,b,c){var d=ce(this,xc(this,a),xc(this,b));return c===!1?d:d.join(c||"\n")},getLine:function(a){var b=this.getLineHandle(a);return b&&b.text},setLine:function(a,b){zc(this,a)&&rc(this,b,sc(a,0),xc(this,sc(a)))},removeLine:function(a){a?rc(this,"",xc(this,sc(a-1)),xc(this,sc(a))):rc(this,"",sc(0,0),xc(this,sc(1,0)))},getLineHandle:function(a){return zc(this,a)?be(this,a):void 0},getLineNumber:function(a){return fe(a)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(a){return xc(this,a)},getCursor:function(a){var c,b=this.sel;return c=null==a||"head"==a?b.head:"anchor"==a?b.anchor:"end"==a||a===!1?b.to:b.from,vc(c)},somethingSelected:function(){return!tc(this.sel.head,this.sel.anchor)},setCursor:Ab(function(a,b,c){var d=xc(this,"number"==typeof a?sc(a,b||0):a);c?Ac(this,d):Cc(this,d,d)}),setSelection:Ab(function(a,b){Cc(this,xc(this,a),xc(this,b||a))}),extendSelection:Ab(function(a,b){Ac(this,xc(this,a),b&&xc(this,b))}),getSelection:function(a){return this.getRange(this.sel.from,this.sel.to,a)},replaceSelection:function(a,b,c){lc(this,{from:this.sel.from,to:this.sel.to,text:jf(a),origin:c},b||"around")},undo:Ab(function(){nc(this,"undo")}),redo:Ab(function(){nc(this,"redo")}),setExtending:function(a){this.sel.extend=a},historySize:function(){var a=this.history;return{undo:a.done.length,redo:a.undone.length}},clearHistory:function(){this.history=je()},markClean:function(){this.history.dirtyCounter=0,this.history.lastOp=this.history.lastOrigin=null},isClean:function(){return 0==this.history.dirtyCounter},getHistory:function(){return{done:pe(this.history.done),undone:pe(this.history.undone)}},setHistory:function(a){var b=this.history=je();b.done=a.done.slice(0),b.undone=a.undone.slice(0)},markText:function(a,b,c){return hd(this,xc(this,a),xc(this,b),c,"range")},setBookmark:function(a,b){var c={replacedWith:b&&(null==b.nodeType?b.widget:b),insertLeft:b&&b.insertLeft};return a=xc(this,a),hd(this,a,a,c,"bookmark")},findMarksAt:function(a){a=xc(this,a);var b=[],c=be(this,a.line).markedSpans;if(c)for(var d=0;c.length>d;++d){var e=c[d];(null==e.from||e.from<=a.ch)&&(null==e.to||e.to>=a.ch)&&b.push(e.marker.parent||e.marker)}return b},getAllMarks:function(){var a=[];return this.iter(function(b){var c=b.markedSpans;if(c)for(var d=0;c.length>d;++d)null!=c[d].from&&a.push(c[d].marker)}),a},posFromIndex:function(a){var b,c=this.first;return this.iter(function(d){var e=d.text.length+1;return e>a?(b=a,!0):(a-=e,++c,void 0)}),xc(this,sc(c,b))},indexFromPos:function(a){a=xc(this,a);var b=a.ch;return a.line<this.first||0>a.ch?0:(this.iter(this.first,a.line,function(a){b+=a.text.length+1}),b)},copy:function(a){var b=new Yd(de(this,this.first,this.first+this.size),this.modeOption,this.first);return b.scrollTop=this.scrollTop,b.scrollLeft=this.scrollLeft,b.sel={from:this.sel.from,to:this.sel.to,head:this.sel.head,anchor:this.sel.anchor,shift:this.sel.shift,extend:!1,goalColumn:this.sel.goalColumn},a&&(b.history.undoDepth=this.history.undoDepth,b.setHistory(this.getHistory())),b
},linkedDoc:function(a){a||(a={});var b=this.first,c=this.first+this.size;null!=a.from&&a.from>b&&(b=a.from),null!=a.to&&c>a.to&&(c=a.to);var d=new Yd(de(this,b,c),a.mode||this.modeOption,b);return a.sharedHist&&(d.history=this.history),(this.linked||(this.linked=[])).push({doc:d,sharedHist:a.sharedHist}),d.linked=[{doc:this,isParent:!0,sharedHist:a.sharedHist}],d},unlinkDoc:function(a){if(a instanceof w&&(a=a.doc),this.linked)for(var b=0;this.linked.length>b;++b){var c=this.linked[b];if(c.doc==a){this.linked.splice(b,1),a.unlinkDoc(this);break}}if(a.history==this.history){var d=[a.id];_d(a,function(a){d.push(a.id)},!0),a.history=je(),a.history.done=pe(this.history.done,d),a.history.undone=pe(this.history.undone,d)}},iterLinkedDocs:function(a){_d(this,a)},getMode:function(){return this.mode},getEditor:function(){return this.cm}}),Yd.prototype.eachLine=Yd.prototype.iter;var Zd="iter insert remove copy getEditor".split(" ");for(var $d in Yd.prototype)Yd.prototype.hasOwnProperty($d)&&0>Qe(Zd,$d)&&(w.prototype[$d]=function(a){return function(){return a.apply(this.doc,arguments)}}(Yd.prototype[$d]));w.e_stop=xe,w.e_preventDefault=ve,w.e_stopPropagation=we;var De,Ee=0;w.on=Ae,w.off=Be,w.signal=Ce;var Ie=30,Je=w.Pass={toString:function(){return"CodeMirror.Pass"}};Ke.prototype={set:function(a,b){clearTimeout(this.id),this.id=setTimeout(b,a)}},w.countColumn=Le;var Me=[""],Ve=/[\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc]/,Ye=/[\u0300-\u036F\u0483-\u0487\u0488-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\uA66F\uA670-\uA672\uA674-\uA67D\uA69F\udc00-\udfff]/;w.replaceGetRect=function(a){bf=a};var cf=function(){if(d)return!1;var a=Ze("div");return"draggable"in a||"dragDrop"in a}(),df=/^$/;a?df=/$'/:i&&!/Version\/([6-9]|\d\d)\b/.test(navigator.userAgent)?df=/\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/:e&&(df=/[~!#%&*)=+}\]|\"\.>,:;][({[<]|-[^\-?\.]|\?[\w~`@#$%\^&*(_=+{[|><]/);var ef,gf,jf=3!="\n\nb".split(/\n/).length?function(a){for(var b=0,c=[],d=a.length;d>=b;){var e=a.indexOf("\n",b);-1==e&&(e=a.length);var f=a.slice(b,"\r"==a.charAt(e-1)?e-1:e),g=f.indexOf("\r");-1!=g?(c.push(f.slice(0,g)),b+=g+1):(c.push(f),b=e+1)}return c}:function(a){return a.split(/\r\n?|\n/)};w.splitLines=jf;var kf=window.getSelection?function(a){try{return a.selectionStart!=a.selectionEnd}catch(b){return!1}}:function(a){try{var b=a.ownerDocument.selection.createRange()}catch(c){}return b&&b.parentElement()==a?0!=b.compareEndPoints("StartToEnd",b):!1},lf=function(){var a=Ze("div");return"oncopy"in a?!0:(a.setAttribute("oncopy","return;"),"function"==typeof a.oncopy)}(),mf={3:"Enter",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",91:"Mod",92:"Mod",93:"Mod",109:"-",107:"=",127:"Delete",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",63276:"PageUp",63277:"PageDown",63275:"End",63273:"Home",63234:"Left",63232:"Up",63235:"Right",63233:"Down",63302:"Insert",63272:"Delete"};w.keyNames=mf,function(){for(var a=0;10>a;a++)mf[a+48]=a+"";for(var a=65;90>=a;a++)mf[a]=String.fromCharCode(a);for(var a=1;12>=a;a++)mf[a+111]=mf[a+63235]="F"+a}();var wf=function(){function c(c){return 255>=c?a.charAt(c):c>=1424&&1524>=c?"R":c>=1536&&1791>=c?b.charAt(c-1536):c>=1792&&2220>=c?"r":"L"}var a="bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLL",b="rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmmrrrrrrrrrrrrrrrrrr",d=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,e=/[stwN]/,f=/[LRr]/,g=/[Lb1n]/,h=/[1n]/,i="L";return function(a){if(!d.test(a))return!1;for(var l,b=a.length,j=[],k=0;b>k;++k)j.push(l=c(a.charCodeAt(k)));for(var k=0,m=i;b>k;++k){var l=j[k];"m"==l?j[k]=m:m=l}for(var k=0,n=i;b>k;++k){var l=j[k];"1"==l&&"r"==n?j[k]="n":f.test(l)&&(n=l,"r"==l&&(j[k]="R"))}for(var k=1,m=j[0];b-1>k;++k){var l=j[k];"+"==l&&"1"==m&&"1"==j[k+1]?j[k]="1":","!=l||m!=j[k+1]||"1"!=m&&"n"!=m||(j[k]=m),m=l}for(var k=0;b>k;++k){var l=j[k];if(","==l)j[k]="N";else if("%"==l){for(var o=k+1;b>o&&"%"==j[o];++o);for(var p=k&&"!"==j[k-1]||b-1>o&&"1"==j[o]?"1":"N",q=k;o>q;++q)j[q]=p;k=o-1}}for(var k=0,n=i;b>k;++k){var l=j[k];"L"==n&&"1"==l?j[k]="L":f.test(l)&&(n=l)}for(var k=0;b>k;++k)if(e.test(j[k])){for(var o=k+1;b>o&&e.test(j[o]);++o);for(var r="L"==(k?j[k-1]:i),s="L"==(b-1>o?j[o]:i),p=r||s?"L":"R",q=k;o>q;++q)j[q]=p;k=o-1}for(var u,t=[],k=0;b>k;)if(g.test(j[k])){var v=k;for(++k;b>k&&g.test(j[k]);++k);t.push({from:v,to:k,level:0})}else{var w=k,x=t.length;for(++k;b>k&&"L"!=j[k];++k);for(var q=w;k>q;)if(h.test(j[q])){q>w&&t.splice(x,0,{from:w,to:q,level:1});var y=q;for(++q;k>q&&h.test(j[q]);++q);t.splice(x,0,{from:y,to:q,level:2}),w=q}else++q;k>w&&t.splice(x,0,{from:w,to:k,level:1})}return 1==t[0].level&&(u=a.match(/^\s+/))&&(t[0].from=u[0].length,t.unshift({from:0,to:u[0].length,level:0})),1==Oe(t).level&&(u=a.match(/\s+$/))&&(Oe(t).to-=u[0].length,t.push({from:b-u[0].length,to:b,level:0})),t[0].level!=Oe(t).level&&t.push({from:b,to:b,level:t[0].level}),t}}();return w.version="3.12",w}();
// TODO actually recognize syntax of TypeScript constructs

CodeMirror.defineMode("javascript", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  var jsonMode = parserConfig.json;
  var isTS = parserConfig.typescript;

  // Tokenizer

  var keywords = function(){
    function kw(type) {return {type: type, style: "keyword"};}
    var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c");
    var operator = kw("operator"), atom = {type: "atom", style: "atom"};

    var jsKeywords = {
      "if": kw("if"), "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
      "return": C, "break": C, "continue": C, "new": C, "delete": C, "throw": C,
      "var": kw("var"), "const": kw("var"), "let": kw("var"),
      "function": kw("function"), "catch": kw("catch"),
      "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
      "in": operator, "typeof": operator, "instanceof": operator,
      "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom,
      "this": kw("this")
    };

    // Extend the 'normal' keywords with the TypeScript language extensions
    if (isTS) {
      var type = {type: "variable", style: "variable-3"};
      var tsKeywords = {
        // object-like things
        "interface": kw("interface"),
        "class": kw("class"),
        "extends": kw("extends"),
        "constructor": kw("constructor"),

        // scope modifiers
        "public": kw("public"),
        "private": kw("private"),
        "protected": kw("protected"),
        "static": kw("static"),

        "super": kw("super"),

        // types
        "string": type, "number": type, "bool": type, "any": type
      };

      for (var attr in tsKeywords) {
        jsKeywords[attr] = tsKeywords[attr];
      }
    }

    return jsKeywords;
  }();

  var isOperatorChar = /[+\-*&%=<>!?|~^]/;

  function chain(stream, state, f) {
    state.tokenize = f;
    return f(stream, state);
  }

  function nextUntilUnescaped(stream, end) {
    var escaped = false, next;
    while ((next = stream.next()) != null) {
      if (next == end && !escaped)
        return false;
      escaped = !escaped && next == "\\";
    }
    return escaped;
  }

  // Used as scratch variables to communicate multiple values without
  // consing up tons of objects.
  var type, content;
  function ret(tp, style, cont) {
    type = tp; content = cont;
    return style;
  }

  function jsTokenBase(stream, state) {
    var ch = stream.next();
    if (ch == '"' || ch == "'")
      return chain(stream, state, jsTokenString(ch));
    else if (/[\[\]{}\(\),;\:\.]/.test(ch))
      return ret(ch);
    else if (ch == "0" && stream.eat(/x/i)) {
      stream.eatWhile(/[\da-f]/i);
      return ret("number", "number");
    }
    else if (/\d/.test(ch) || ch == "-" && stream.eat(/\d/)) {
      stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
      return ret("number", "number");
    }
    else if (ch == "/") {
      if (stream.eat("*")) {
        return chain(stream, state, jsTokenComment);
      }
      else if (stream.eat("/")) {
        stream.skipToEnd();
        return ret("comment", "comment");
      }
      else if (state.lastType == "operator" || state.lastType == "keyword c" ||
               /^[\[{}\(,;:]$/.test(state.lastType)) {
        nextUntilUnescaped(stream, "/");
        stream.eatWhile(/[gimy]/); // 'y' is "sticky" option in Mozilla
        return ret("regexp", "string-2");
      }
      else {
        stream.eatWhile(isOperatorChar);
        return ret("operator", null, stream.current());
      }
    }
    else if (ch == "#") {
      stream.skipToEnd();
      return ret("error", "error");
    }
    else if (isOperatorChar.test(ch)) {
      stream.eatWhile(isOperatorChar);
      return ret("operator", null, stream.current());
    }
    else {
      stream.eatWhile(/[\w\$_]/);
      var word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word];
      return (known && state.lastType != ".") ? ret(known.type, known.style, word) :
                     ret("variable", "variable", word);
    }
  }

  function jsTokenString(quote) {
    return function(stream, state) {
      if (!nextUntilUnescaped(stream, quote))
        state.tokenize = jsTokenBase;
      return ret("string", "string");
    };
  }

  function jsTokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize = jsTokenBase;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ret("comment", "comment");
  }

  // Parser

  var atomicTypes = {"atom": true, "number": true, "variable": true, "string": true, "regexp": true, "this": true};

  function JSLexical(indented, column, type, align, prev, info) {
    this.indented = indented;
    this.column = column;
    this.type = type;
    this.prev = prev;
    this.info = info;
    if (align != null) this.align = align;
  }

  function inScope(state, varname) {
    for (var v = state.localVars; v; v = v.next)
      if (v.name == varname) return true;
  }

  function parseJS(state, style, type, content, stream) {
    var cc = state.cc;
    // Communicate our context to the combinators.
    // (Less wasteful than consing up a hundred closures on every call.)
    cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc;

    if (!state.lexical.hasOwnProperty("align"))
      state.lexical.align = true;

    while(true) {
      var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
      if (combinator(type, content)) {
        while(cc.length && cc[cc.length - 1].lex)
          cc.pop()();
        if (cx.marked) return cx.marked;
        if (type == "variable" && inScope(state, content)) return "variable-2";
        return style;
      }
    }
  }

  // Combinator utils

  var cx = {state: null, column: null, marked: null, cc: null};
  function pass() {
    for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
  }
  function cont() {
    pass.apply(null, arguments);
    return true;
  }
  function register(varname) {
    function inList(list) {
      for (var v = list; v; v = v.next)
        if (v.name == varname) return true;
      return false;
    }
    var state = cx.state;
    if (state.context) {
      cx.marked = "def";
      if (inList(state.localVars)) return;
      state.localVars = {name: varname, next: state.localVars};
    } else {
      if (inList(state.globalVars)) return;
      state.globalVars = {name: varname, next: state.globalVars};
    }
  }

  // Combinators

  var defaultVars = {name: "this", next: {name: "arguments"}};
  function pushcontext() {
    cx.state.context = {prev: cx.state.context, vars: cx.state.localVars};
    cx.state.localVars = defaultVars;
  }
  function popcontext() {
    cx.state.localVars = cx.state.context.vars;
    cx.state.context = cx.state.context.prev;
  }
  function pushlex(type, info) {
    var result = function() {
      var state = cx.state;
      state.lexical = new JSLexical(state.indented, cx.stream.column(), type, null, state.lexical, info);
    };
    result.lex = true;
    return result;
  }
  function poplex() {
    var state = cx.state;
    if (state.lexical.prev) {
      if (state.lexical.type == ")")
        state.indented = state.lexical.indented;
      state.lexical = state.lexical.prev;
    }
  }
  poplex.lex = true;

  function expect(wanted) {
    return function(type) {
      if (type == wanted) return cont();
      else if (wanted == ";") return pass();
      else return cont(arguments.callee);
    };
  }

  function statement(type) {
    if (type == "var") return cont(pushlex("vardef"), vardef1, expect(";"), poplex);
    if (type == "keyword a") return cont(pushlex("form"), expression, statement, poplex);
    if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
    if (type == "{") return cont(pushlex("}"), block, poplex);
    if (type == ";") return cont();
    if (type == "if") return cont(pushlex("form"), expression, statement, poplex, maybeelse(cx.state.indented));
    if (type == "function") return cont(functiondef);
    if (type == "for") return cont(pushlex("form"), expect("("), pushlex(")"), forspec1, expect(")"),
                                      poplex, statement, poplex);
    if (type == "variable") return cont(pushlex("stat"), maybelabel);
    if (type == "switch") return cont(pushlex("form"), expression, pushlex("}", "switch"), expect("{"),
                                         block, poplex, poplex);
    if (type == "case") return cont(expression, expect(":"));
    if (type == "default") return cont(expect(":"));
    if (type == "catch") return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"),
                                        statement, poplex, popcontext);
    return pass(pushlex("stat"), expression, expect(";"), poplex);
  }
  function expression(type) {
    return expressionInner(type, maybeoperatorComma);
  }
  function expressionNoComma(type) {
    return expressionInner(type, maybeoperatorNoComma);
  }
  function expressionInner(type, maybeop) {
    if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
    if (type == "function") return cont(functiondef);
    if (type == "keyword c") return cont(maybeexpression);
    if (type == "(") return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
    if (type == "operator") return cont(expression);
    if (type == "[") return cont(pushlex("]"), commasep(expressionNoComma, "]"), poplex, maybeop);
    if (type == "{") return cont(pushlex("}"), commasep(objprop, "}"), poplex, maybeop);
    return cont();
  }
  function maybeexpression(type) {
    if (type.match(/[;\}\)\],]/)) return pass();
    return pass(expression);
  }

  function maybeoperatorComma(type, value) {
    if (type == ",") return cont(expression);
    return maybeoperatorNoComma(type, value, maybeoperatorComma);
  }
  function maybeoperatorNoComma(type, value, me) {
    if (!me) me = maybeoperatorNoComma;
    if (type == "operator") {
      if (/\+\+|--/.test(value)) return cont(me);
      if (value == "?") return cont(expression, expect(":"), expression);
      return cont(expression);
    }
    if (type == ";") return;
    if (type == "(") return cont(pushlex(")", "call"), commasep(expressionNoComma, ")"), poplex, me);
    if (type == ".") return cont(property, me);
    if (type == "[") return cont(pushlex("]"), expression, expect("]"), poplex, me);
  }
  function maybelabel(type) {
    if (type == ":") return cont(poplex, statement);
    return pass(maybeoperatorComma, expect(";"), poplex);
  }
  function property(type) {
    if (type == "variable") {cx.marked = "property"; return cont();}
  }
  function objprop(type, value) {
    if (type == "variable") {
      cx.marked = "property";
      if (value == "get" || value == "set") return cont(getterSetter);
    } else if (type == "number" || type == "string") {
      cx.marked = type + " property";
    }
    if (atomicTypes.hasOwnProperty(type)) return cont(expect(":"), expressionNoComma);
  }
  function getterSetter(type) {
    if (type == ":") return cont(expression);
    if (type != "variable") return cont(expect(":"), expression);
    cx.marked = "property";
    return cont(functiondef);
  }
  function commasep(what, end) {
    function proceed(type) {
      if (type == ",") {
        var lex = cx.state.lexical;
        if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
        return cont(what, proceed);
      }
      if (type == end) return cont();
      return cont(expect(end));
    }
    return function(type) {
      if (type == end) return cont();
      else return pass(what, proceed);
    };
  }
  function block(type) {
    if (type == "}") return cont();
    return pass(statement, block);
  }
  function maybetype(type) {
    if (type == ":") return cont(typedef);
    return pass();
  }
  function typedef(type) {
    if (type == "variable"){cx.marked = "variable-3"; return cont();}
    return pass();
  }
  function vardef1(type, value) {
    if (type == "variable") {
      register(value);
      return isTS ? cont(maybetype, vardef2) : cont(vardef2);
    }
    return pass();
  }
  function vardef2(type, value) {
    if (value == "=") return cont(expressionNoComma, vardef2);
    if (type == ",") return cont(vardef1);
  }
  function maybeelse(indent) {
    return function(type, value) {
      if (type == "keyword b" && value == "else") {
        cx.state.lexical = new JSLexical(indent, 0, "form", null, cx.state.lexical);
        return cont(statement, poplex);
      }
      return pass();
    };
  }
  function forspec1(type) {
    if (type == "var") return cont(vardef1, expect(";"), forspec2);
    if (type == ";") return cont(forspec2);
    if (type == "variable") return cont(formaybein);
    return pass(expression, expect(";"), forspec2);
  }
  function formaybein(_type, value) {
    if (value == "in") return cont(expression);
    return cont(maybeoperatorComma, forspec2);
  }
  function forspec2(type, value) {
    if (type == ";") return cont(forspec3);
    if (value == "in") return cont(expression);
    return pass(expression, expect(";"), forspec3);
  }
  function forspec3(type) {
    if (type != ")") cont(expression);
  }
  function functiondef(type, value) {
    if (type == "variable") {register(value); return cont(functiondef);}
    if (type == "(") return cont(pushlex(")"), pushcontext, commasep(funarg, ")"), poplex, statement, popcontext);
  }
  function funarg(type, value) {
    if (type == "variable") {register(value); return isTS ? cont(maybetype) : cont();}
  }

  // Interface

  return {
    startState: function(basecolumn) {
      return {
        tokenize: jsTokenBase,
        lastType: null,
        cc: [],
        lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
        localVars: parserConfig.localVars,
        globalVars: parserConfig.globalVars,
        context: parserConfig.localVars && {vars: parserConfig.localVars},
        indented: 0
      };
    },

    token: function(stream, state) {
      if (stream.sol()) {
        if (!state.lexical.hasOwnProperty("align"))
          state.lexical.align = false;
        state.indented = stream.indentation();
      }
      if (state.tokenize != jsTokenComment && stream.eatSpace()) return null;
      var style = state.tokenize(stream, state);
      if (type == "comment") return style;
      state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
      return parseJS(state, style, type, content, stream);
    },

    indent: function(state, textAfter) {
      if (state.tokenize == jsTokenComment) return CodeMirror.Pass;
      if (state.tokenize != jsTokenBase) return 0;
      var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical;
      if (lexical.type == "stat" && firstChar == "}") lexical = lexical.prev;
      var type = lexical.type, closing = firstChar == type;
      if (parserConfig.statementIndent != null) {
        if (type == ")" && lexical.prev && lexical.prev.type == "stat") lexical = lexical.prev;
        if (lexical.type == "stat") return lexical.indented + parserConfig.statementIndent;
      }

      if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? 4 : 0);
      else if (type == "form" && firstChar == "{") return lexical.indented;
      else if (type == "form") return lexical.indented + indentUnit;
      else if (type == "stat")
        return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? indentUnit : 0);
      else if (lexical.info == "switch" && !closing)
        return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
      else if (lexical.align) return lexical.column + (closing ? 0 : 1);
      else return lexical.indented + (closing ? 0 : indentUnit);
    },

    electricChars: ":{}",

    jsonMode: jsonMode
  };
});

CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("text/ecmascript", "javascript");
CodeMirror.defineMIME("application/javascript", "javascript");
CodeMirror.defineMIME("application/ecmascript", "javascript");
CodeMirror.defineMIME("application/json", {name: "javascript", json: true});
CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });
/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);
                i = listeners.length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));
/*! VelocityJS.org (1.3.1). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!function(a){"use strict";function b(a){var b=a.length,d=c.type(a);return"function"!==d&&!c.isWindow(a)&&(!(1!==a.nodeType||!b)||("array"===d||0===b||"number"==typeof b&&b>0&&b-1 in a))}if(!a.jQuery){var c=function(a,b){return new c.fn.init(a,b)};c.isWindow=function(a){return a&&a===a.window},c.type=function(a){return a?"object"==typeof a||"function"==typeof a?e[g.call(a)]||"object":typeof a:a+""},c.isArray=Array.isArray||function(a){return"array"===c.type(a)},c.isPlainObject=function(a){var b;if(!a||"object"!==c.type(a)||a.nodeType||c.isWindow(a))return!1;try{if(a.constructor&&!f.call(a,"constructor")&&!f.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(d){return!1}for(b in a);return void 0===b||f.call(a,b)},c.each=function(a,c,d){var e,f=0,g=a.length,h=b(a);if(d){if(h)for(;f<g&&(e=c.apply(a[f],d),e!==!1);f++);else for(f in a)if(a.hasOwnProperty(f)&&(e=c.apply(a[f],d),e===!1))break}else if(h)for(;f<g&&(e=c.call(a[f],f,a[f]),e!==!1);f++);else for(f in a)if(a.hasOwnProperty(f)&&(e=c.call(a[f],f,a[f]),e===!1))break;return a},c.data=function(a,b,e){if(void 0===e){var f=a[c.expando],g=f&&d[f];if(void 0===b)return g;if(g&&b in g)return g[b]}else if(void 0!==b){var h=a[c.expando]||(a[c.expando]=++c.uuid);return d[h]=d[h]||{},d[h][b]=e,e}},c.removeData=function(a,b){var e=a[c.expando],f=e&&d[e];f&&(b?c.each(b,function(a,b){delete f[b]}):delete d[e])},c.extend=function(){var a,b,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;for("boolean"==typeof h&&(k=h,h=arguments[i]||{},i++),"object"!=typeof h&&"function"!==c.type(h)&&(h={}),i===j&&(h=this,i--);i<j;i++)if(f=arguments[i])for(e in f)f.hasOwnProperty(e)&&(a=h[e],d=f[e],h!==d&&(k&&d&&(c.isPlainObject(d)||(b=c.isArray(d)))?(b?(b=!1,g=a&&c.isArray(a)?a:[]):g=a&&c.isPlainObject(a)?a:{},h[e]=c.extend(k,g,d)):void 0!==d&&(h[e]=d)));return h},c.queue=function(a,d,e){function f(a,c){var d=c||[];return a&&(b(Object(a))?!function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;)a[e++]=b[d++];if(c!==c)for(;void 0!==b[d];)a[e++]=b[d++];return a.length=e,a}(d,"string"==typeof a?[a]:a):[].push.call(d,a)),d}if(a){d=(d||"fx")+"queue";var g=c.data(a,d);return e?(!g||c.isArray(e)?g=c.data(a,d,f(e)):g.push(e),g):g||[]}},c.dequeue=function(a,b){c.each(a.nodeType?[a]:a,function(a,d){b=b||"fx";var e=c.queue(d,b),f=e.shift();"inprogress"===f&&(f=e.shift()),f&&("fx"===b&&e.unshift("inprogress"),f.call(d,function(){c.dequeue(d,b)}))})},c.fn=c.prototype={init:function(a){if(a.nodeType)return this[0]=a,this;throw new Error("Not a DOM node.")},offset:function(){var b=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:b.top+(a.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:b.left+(a.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function a(a){for(var b=a.offsetParent||document;b&&"html"!==b.nodeType.toLowerCase&&"static"===b.style.position;)b=b.offsetParent;return b||document}var b=this[0],d=a(b),e=this.offset(),f=/^(?:body|html)$/i.test(d.nodeName)?{top:0,left:0}:c(d).offset();return e.top-=parseFloat(b.style.marginTop)||0,e.left-=parseFloat(b.style.marginLeft)||0,d.style&&(f.top+=parseFloat(d.style.borderTopWidth)||0,f.left+=parseFloat(d.style.borderLeftWidth)||0),{top:e.top-f.top,left:e.left-f.left}}};var d={};c.expando="velocity"+(new Date).getTime(),c.uuid=0;for(var e={},f=e.hasOwnProperty,g=e.toString,h="Boolean Number String Function Array Date RegExp Object Error".split(" "),i=0;i<h.length;i++)e["[object "+h[i]+"]"]=h[i].toLowerCase();c.fn.init.prototype=c.fn,a.Velocity={Utilities:c}}}(window),function(a){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a():"function"==typeof define&&define.amd?define(a):a()}(function(){"use strict";return function(a,b,c,d){function e(a){for(var b=-1,c=a?a.length:0,d=[];++b<c;){var e=a[b];e&&d.push(e)}return d}function f(a){return p.isWrapped(a)?a=[].slice.call(a):p.isNode(a)&&(a=[a]),a}function g(a){var b=m.data(a,"velocity");return null===b?d:b}function h(a){return function(b){return Math.round(b*a)*(1/a)}}function i(a,c,d,e){function f(a,b){return 1-3*b+3*a}function g(a,b){return 3*b-6*a}function h(a){return 3*a}function i(a,b,c){return((f(b,c)*a+g(b,c))*a+h(b))*a}function j(a,b,c){return 3*f(b,c)*a*a+2*g(b,c)*a+h(b)}function k(b,c){for(var e=0;e<p;++e){var f=j(c,a,d);if(0===f)return c;var g=i(c,a,d)-b;c-=g/f}return c}function l(){for(var b=0;b<t;++b)x[b]=i(b*u,a,d)}function m(b,c,e){var f,g,h=0;do g=c+(e-c)/2,f=i(g,a,d)-b,f>0?e=g:c=g;while(Math.abs(f)>r&&++h<s);return g}function n(b){for(var c=0,e=1,f=t-1;e!==f&&x[e]<=b;++e)c+=u;--e;var g=(b-x[e])/(x[e+1]-x[e]),h=c+g*u,i=j(h,a,d);return i>=q?k(b,h):0===i?h:m(b,c,c+u)}function o(){y=!0,a===c&&d===e||l()}var p=4,q=.001,r=1e-7,s=10,t=11,u=1/(t-1),v="Float32Array"in b;if(4!==arguments.length)return!1;for(var w=0;w<4;++w)if("number"!=typeof arguments[w]||isNaN(arguments[w])||!isFinite(arguments[w]))return!1;a=Math.min(a,1),d=Math.min(d,1),a=Math.max(a,0),d=Math.max(d,0);var x=v?new Float32Array(t):new Array(t),y=!1,z=function(b){return y||o(),a===c&&d===e?b:0===b?0:1===b?1:i(n(b),c,e)};z.getControlPoints=function(){return[{x:a,y:c},{x:d,y:e}]};var A="generateBezier("+[a,c,d,e]+")";return z.toString=function(){return A},z}function j(a,b){var c=a;return p.isString(a)?t.Easings[a]||(c=!1):c=p.isArray(a)&&1===a.length?h.apply(null,a):p.isArray(a)&&2===a.length?u.apply(null,a.concat([b])):!(!p.isArray(a)||4!==a.length)&&i.apply(null,a),c===!1&&(c=t.Easings[t.defaults.easing]?t.defaults.easing:s),c}function k(a){if(a){var b=t.timestamp&&a!==!0?a:(new Date).getTime(),c=t.State.calls.length;c>1e4&&(t.State.calls=e(t.State.calls),c=t.State.calls.length);for(var f=0;f<c;f++)if(t.State.calls[f]){var h=t.State.calls[f],i=h[0],j=h[2],o=h[3],q=!!o,r=null;o||(o=t.State.calls[f][3]=b-16);for(var s=Math.min((b-o)/j.duration,1),u=0,w=i.length;u<w;u++){var y=i[u],z=y.element;if(g(z)){var A=!1;if(j.display!==d&&null!==j.display&&"none"!==j.display){if("flex"===j.display){var B=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];m.each(B,function(a,b){v.setPropertyValue(z,"display",b)})}v.setPropertyValue(z,"display",j.display)}j.visibility!==d&&"hidden"!==j.visibility&&v.setPropertyValue(z,"visibility",j.visibility);for(var C in y)if(y.hasOwnProperty(C)&&"element"!==C){var D,E=y[C],F=p.isString(E.easing)?t.Easings[E.easing]:E.easing;if(p.isString(E.pattern)){var G=1===s?function(a,b){return E.endValue[b]}:function(a,b){var c=E.startValue[b],d=E.endValue[b]-c;return c+d*F(s,j,d)};D=E.pattern.replace(/{(\d+)}/g,G)}else if(1===s)D=E.endValue;else{var H=E.endValue-E.startValue;D=E.startValue+H*F(s,j,H)}if(!q&&D===E.currentValue)continue;if(E.currentValue=D,"tween"===C)r=D;else{var I;if(v.Hooks.registered[C]){I=v.Hooks.getRoot(C);var J=g(z).rootPropertyValueCache[I];J&&(E.rootPropertyValue=J)}var K=v.setPropertyValue(z,C,E.currentValue+(n<9&&0===parseFloat(D)?"":E.unitType),E.rootPropertyValue,E.scrollData);v.Hooks.registered[C]&&(v.Normalizations.registered[I]?g(z).rootPropertyValueCache[I]=v.Normalizations.registered[I]("extract",null,K[1]):g(z).rootPropertyValueCache[I]=K[1]),"transform"===K[0]&&(A=!0)}}j.mobileHA&&g(z).transformCache.translate3d===d&&(g(z).transformCache.translate3d="(0px, 0px, 0px)",A=!0),A&&v.flushTransformCache(z)}}j.display!==d&&"none"!==j.display&&(t.State.calls[f][2].display=!1),j.visibility!==d&&"hidden"!==j.visibility&&(t.State.calls[f][2].visibility=!1),j.progress&&j.progress.call(h[1],h[1],s,Math.max(0,o+j.duration-b),o,r),1===s&&l(f)}}t.State.isTicking&&x(k)}function l(a,b){if(!t.State.calls[a])return!1;for(var c=t.State.calls[a][0],e=t.State.calls[a][1],f=t.State.calls[a][2],h=t.State.calls[a][4],i=!1,j=0,k=c.length;j<k;j++){var l=c[j].element;b||f.loop||("none"===f.display&&v.setPropertyValue(l,"display",f.display),"hidden"===f.visibility&&v.setPropertyValue(l,"visibility",f.visibility));var n=g(l);if(f.loop!==!0&&(m.queue(l)[1]===d||!/\.velocityQueueEntryFlag/i.test(m.queue(l)[1]))&&n){n.isAnimating=!1,n.rootPropertyValueCache={};var o=!1;m.each(v.Lists.transforms3D,function(a,b){var c=/^scale/.test(b)?1:0,e=n.transformCache[b];n.transformCache[b]!==d&&new RegExp("^\\("+c+"[^.]").test(e)&&(o=!0,delete n.transformCache[b])}),f.mobileHA&&(o=!0,delete n.transformCache.translate3d),o&&v.flushTransformCache(l),v.Values.removeClass(l,"velocity-animating")}if(!b&&f.complete&&!f.loop&&j===k-1)try{f.complete.call(e,e)}catch(p){setTimeout(function(){throw p},1)}h&&f.loop!==!0&&h(e),n&&f.loop===!0&&!b&&(m.each(n.tweensContainer,function(a,b){if(/^rotate/.test(a)&&(parseFloat(b.startValue)-parseFloat(b.endValue))%360===0){var c=b.startValue;b.startValue=b.endValue,b.endValue=c}/^backgroundPosition/.test(a)&&100===parseFloat(b.endValue)&&"%"===b.unitType&&(b.endValue=0,b.startValue=100)}),t(l,"reverse",{loop:!0,delay:f.delay})),f.queue!==!1&&m.dequeue(l,f.queue)}t.State.calls[a]=!1;for(var q=0,r=t.State.calls.length;q<r;q++)if(t.State.calls[q]!==!1){i=!0;break}i===!1&&(t.State.isTicking=!1,delete t.State.calls,t.State.calls=[])}var m,n=function(){if(c.documentMode)return c.documentMode;for(var a=7;a>4;a--){var b=c.createElement("div");if(b.innerHTML="<!--[if IE "+a+"]><span></span><![endif]-->",b.getElementsByTagName("span").length)return b=null,a}return d}(),o=function(){var a=0;return b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||function(b){var c,d=(new Date).getTime();return c=Math.max(0,16-(d-a)),a=d+c,setTimeout(function(){b(d+c)},c)}}(),p={isNumber:function(a){return"number"==typeof a},isString:function(a){return"string"==typeof a},isArray:Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},isFunction:function(a){return"[object Function]"===Object.prototype.toString.call(a)},isNode:function(a){return a&&a.nodeType},isNodeList:function(a){return"object"==typeof a&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a))&&a.length!==d&&(0===a.length||"object"==typeof a[0]&&a[0].nodeType>0)},isWrapped:function(a){return a&&(p.isArray(a)||p.isNumber(a.length)&&!p.isString(a)&&!p.isFunction(a))},isSVG:function(a){return b.SVGElement&&a instanceof b.SVGElement},isEmptyObject:function(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}},q=!1;if(a.fn&&a.fn.jquery?(m=a,q=!0):m=b.Velocity.Utilities,n<=8&&!q)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(n<=7)return void(jQuery.fn.velocity=jQuery.fn.animate);var r=400,s="swing",t={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:b.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:c.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:m,Redirects:{},Easings:{},Promise:b.Promise,defaults:{queue:"",duration:r,easing:s,begin:d,complete:d,progress:d,display:d,visibility:d,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0,promiseRejectEmpty:!0},init:function(a){m.data(a,"velocity",{isSVG:p.isSVG(a),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:3,patch:1},debug:!1,timestamp:!0};b.pageYOffset!==d?(t.State.scrollAnchor=b,t.State.scrollPropertyLeft="pageXOffset",t.State.scrollPropertyTop="pageYOffset"):(t.State.scrollAnchor=c.documentElement||c.body.parentNode||c.body,t.State.scrollPropertyLeft="scrollLeft",t.State.scrollPropertyTop="scrollTop");var u=function(){function a(a){return-a.tension*a.x-a.friction*a.v}function b(b,c,d){var e={x:b.x+d.dx*c,v:b.v+d.dv*c,tension:b.tension,friction:b.friction};return{dx:e.v,dv:a(e)}}function c(c,d){var e={dx:c.v,dv:a(c)},f=b(c,.5*d,e),g=b(c,.5*d,f),h=b(c,d,g),i=1/6*(e.dx+2*(f.dx+g.dx)+h.dx),j=1/6*(e.dv+2*(f.dv+g.dv)+h.dv);return c.x=c.x+i*d,c.v=c.v+j*d,c}return function d(a,b,e){var f,g,h,i={x:-1,v:0,tension:null,friction:null},j=[0],k=0,l=1e-4,m=.016;for(a=parseFloat(a)||500,b=parseFloat(b)||20,e=e||null,i.tension=a,i.friction=b,f=null!==e,f?(k=d(a,b),g=k/e*m):g=m;;)if(h=c(h||i,g),j.push(1+h.x),k+=16,!(Math.abs(h.x)>l&&Math.abs(h.v)>l))break;return f?function(a){return j[a*(j.length-1)|0]}:k}}();t.Easings={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},spring:function(a){return 1-Math.cos(4.5*a*Math.PI)*Math.exp(6*-a)}},m.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(a,b){t.Easings[b[0]]=i.apply(null,b[1])});var v=t.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var a=0;a<v.Lists.colors.length;a++){var b="color"===v.Lists.colors[a]?"0 0 0 1":"255 255 255 1";v.Hooks.templates[v.Lists.colors[a]]=["Red Green Blue Alpha",b]}var c,d,e;if(n)for(c in v.Hooks.templates)if(v.Hooks.templates.hasOwnProperty(c)){d=v.Hooks.templates[c],e=d[0].split(" ");var f=d[1].match(v.RegEx.valueSplit);"Color"===e[0]&&(e.push(e.shift()),f.push(f.shift()),v.Hooks.templates[c]=[e.join(" "),f.join(" ")])}for(c in v.Hooks.templates)if(v.Hooks.templates.hasOwnProperty(c)){d=v.Hooks.templates[c],e=d[0].split(" ");for(var g in e)if(e.hasOwnProperty(g)){var h=c+e[g],i=g;v.Hooks.registered[h]=[c,i]}}},getRoot:function(a){var b=v.Hooks.registered[a];return b?b[0]:a},cleanRootPropertyValue:function(a,b){return v.RegEx.valueUnwrap.test(b)&&(b=b.match(v.RegEx.valueUnwrap)[1]),v.Values.isCSSNullValue(b)&&(b=v.Hooks.templates[a][1]),b},extractValue:function(a,b){var c=v.Hooks.registered[a];if(c){var d=c[0],e=c[1];return b=v.Hooks.cleanRootPropertyValue(d,b),b.toString().match(v.RegEx.valueSplit)[e]}return b},injectValue:function(a,b,c){var d=v.Hooks.registered[a];if(d){var e,f,g=d[0],h=d[1];return c=v.Hooks.cleanRootPropertyValue(g,c),e=c.toString().match(v.RegEx.valueSplit),e[h]=b,f=e.join(" ")}return c}},Normalizations:{registered:{clip:function(a,b,c){switch(a){case"name":return"clip";case"extract":var d;return v.RegEx.wrappedValueAlreadyExtracted.test(c)?d=c:(d=c.toString().match(v.RegEx.valueUnwrap),d=d?d[1].replace(/,(\s+)?/g," "):c),d;case"inject":return"rect("+c+")"}},blur:function(a,b,c){switch(a){case"name":return t.State.isFirefox?"filter":"-webkit-filter";case"extract":var d=parseFloat(c);if(!d&&0!==d){var e=c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);d=e?e[1]:0}return d;case"inject":return parseFloat(c)?"blur("+c+")":"none"}},opacity:function(a,b,c){if(n<=8)switch(a){case"name":return"filter";case"extract":var d=c.toString().match(/alpha\(opacity=(.*)\)/i);return c=d?d[1]/100:1;case"inject":return b.style.zoom=1,parseFloat(c)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(c),10)+")"}else switch(a){case"name":return"opacity";case"extract":return c;case"inject":return c}}},register:function(){function a(a,b,c){var d="border-box"===v.getPropertyValue(b,"boxSizing").toString().toLowerCase();if(d===(c||!1)){var e,f,g=0,h="width"===a?["Left","Right"]:["Top","Bottom"],i=["padding"+h[0],"padding"+h[1],"border"+h[0]+"Width","border"+h[1]+"Width"];for(e=0;e<i.length;e++)f=parseFloat(v.getPropertyValue(b,i[e])),isNaN(f)||(g+=f);return c?-g:g}return 0}function b(b,c){return function(d,e,f){switch(d){case"name":return b;case"extract":return parseFloat(f)+a(b,e,c);case"inject":return parseFloat(f)-a(b,e,c)+"px"}}}n&&!(n>9)||t.State.isGingerbread||(v.Lists.transformsBase=v.Lists.transformsBase.concat(v.Lists.transforms3D));for(var c=0;c<v.Lists.transformsBase.length;c++)!function(){var a=v.Lists.transformsBase[c];v.Normalizations.registered[a]=function(b,c,e){switch(b){case"name":return"transform";case"extract":return g(c)===d||g(c).transformCache[a]===d?/^scale/i.test(a)?1:0:g(c).transformCache[a].replace(/[()]/g,"");case"inject":var f=!1;switch(a.substr(0,a.length-1)){case"translate":f=!/(%|px|em|rem|vw|vh|\d)$/i.test(e);break;case"scal":case"scale":t.State.isAndroid&&g(c).transformCache[a]===d&&e<1&&(e=1),f=!/(\d)$/i.test(e);break;case"skew":f=!/(deg|\d)$/i.test(e);break;case"rotate":f=!/(deg|\d)$/i.test(e)}return f||(g(c).transformCache[a]="("+e+")"),g(c).transformCache[a]}}}();for(var e=0;e<v.Lists.colors.length;e++)!function(){var a=v.Lists.colors[e];v.Normalizations.registered[a]=function(b,c,e){switch(b){case"name":return a;case"extract":var f;if(v.RegEx.wrappedValueAlreadyExtracted.test(e))f=e;else{var g,h={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(e)?g=h[e]!==d?h[e]:h.black:v.RegEx.isHex.test(e)?g="rgb("+v.Values.hexToRgb(e).join(" ")+")":/^rgba?\(/i.test(e)||(g=h.black),f=(g||e).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return(!n||n>8)&&3===f.split(" ").length&&(f+=" 1"),f;case"inject":return/^rgb/.test(e)?e:(n<=8?4===e.split(" ").length&&(e=e.split(/\s+/).slice(0,3).join(" ")):3===e.split(" ").length&&(e+=" 1"),(n<=8?"rgb":"rgba")+"("+e.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")")}}}();v.Normalizations.registered.innerWidth=b("width",!0),v.Normalizations.registered.innerHeight=b("height",!0),v.Normalizations.registered.outerWidth=b("width"),v.Normalizations.registered.outerHeight=b("height")}},Names:{camelCase:function(a){return a.replace(/-(\w)/g,function(a,b){return b.toUpperCase()})},SVGAttribute:function(a){var b="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(n||t.State.isAndroid&&!t.State.isChrome)&&(b+="|transform"),new RegExp("^("+b+")$","i").test(a)},prefixCheck:function(a){if(t.State.prefixMatches[a])return[t.State.prefixMatches[a],!0];for(var b=["","Webkit","Moz","ms","O"],c=0,d=b.length;c<d;c++){var e;if(e=0===c?a:b[c]+a.replace(/^\w/,function(a){return a.toUpperCase()}),p.isString(t.State.prefixElement.style[e]))return t.State.prefixMatches[a]=e,[e,!0]}return[a,!1]}},Values:{hexToRgb:function(a){var b,c=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,d=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return a=a.replace(c,function(a,b,c,d){return b+b+c+c+d+d}),b=d.exec(a),b?[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)]:[0,0,0]},isCSSNullValue:function(a){return!a||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)},getUnitType:function(a){return/^(rotate|skew)/i.test(a)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a)?"":"px"},getDisplayType:function(a){var b=a&&a.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b)?"inline":/^(li)$/i.test(b)?"list-item":/^(tr)$/i.test(b)?"table-row":/^(table)$/i.test(b)?"table":/^(tbody)$/i.test(b)?"table-row-group":"block"},addClass:function(a,b){if(a)if(a.classList)a.classList.add(b);else if(p.isString(a.className))a.className+=(a.className.length?" ":"")+b;else{var c=a.getAttribute(n<=7?"className":"class")||"";a.setAttribute("class",c+(c?" ":"")+b)}},removeClass:function(a,b){if(a)if(a.classList)a.classList.remove(b);else if(p.isString(a.className))a.className=a.className.toString().replace(new RegExp("(^|\\s)"+b.split(" ").join("|")+"(\\s|$)","gi")," ");else{var c=a.getAttribute(n<=7?"className":"class")||"";a.setAttribute("class",c.replace(new RegExp("(^|s)"+b.split(" ").join("|")+"(s|$)","gi")," "))}}},getPropertyValue:function(a,c,e,f){function h(a,c){var e=0;if(n<=8)e=m.css(a,c);else{var i=!1;/^(width|height)$/.test(c)&&0===v.getPropertyValue(a,"display")&&(i=!0,v.setPropertyValue(a,"display",v.Values.getDisplayType(a)));var j=function(){i&&v.setPropertyValue(a,"display","none")};if(!f){if("height"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var k=a.offsetHeight-(parseFloat(v.getPropertyValue(a,"borderTopWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderBottomWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingTop"))||0)-(parseFloat(v.getPropertyValue(a,"paddingBottom"))||0);return j(),k}if("width"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var l=a.offsetWidth-(parseFloat(v.getPropertyValue(a,"borderLeftWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderRightWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingLeft"))||0)-(parseFloat(v.getPropertyValue(a,"paddingRight"))||0);return j(),l}}var o;o=g(a)===d?b.getComputedStyle(a,null):g(a).computedStyle?g(a).computedStyle:g(a).computedStyle=b.getComputedStyle(a,null),"borderColor"===c&&(c="borderTopColor"),e=9===n&&"filter"===c?o.getPropertyValue(c):o[c],""!==e&&null!==e||(e=a.style[c]),j()}if("auto"===e&&/^(top|right|bottom|left)$/i.test(c)){var p=h(a,"position");("fixed"===p||"absolute"===p&&/top|left/i.test(c))&&(e=m(a).position()[c]+"px")}return e}var i;if(v.Hooks.registered[c]){var j=c,k=v.Hooks.getRoot(j);e===d&&(e=v.getPropertyValue(a,v.Names.prefixCheck(k)[0])),v.Normalizations.registered[k]&&(e=v.Normalizations.registered[k]("extract",a,e)),i=v.Hooks.extractValue(j,e)}else if(v.Normalizations.registered[c]){var l,o;l=v.Normalizations.registered[c]("name",a),"transform"!==l&&(o=h(a,v.Names.prefixCheck(l)[0]),v.Values.isCSSNullValue(o)&&v.Hooks.templates[c]&&(o=v.Hooks.templates[c][1])),i=v.Normalizations.registered[c]("extract",a,o)}if(!/^[\d-]/.test(i)){var p=g(a);if(p&&p.isSVG&&v.Names.SVGAttribute(c))if(/^(height|width)$/i.test(c))try{i=a.getBBox()[c]}catch(q){i=0}else i=a.getAttribute(c);else i=h(a,v.Names.prefixCheck(c)[0])}return v.Values.isCSSNullValue(i)&&(i=0),t.debug>=2&&console.log("Get "+c+": "+i),i},setPropertyValue:function(a,c,d,e,f){var h=c;if("scroll"===c)f.container?f.container["scroll"+f.direction]=d:"Left"===f.direction?b.scrollTo(d,f.alternateValue):b.scrollTo(f.alternateValue,d);else if(v.Normalizations.registered[c]&&"transform"===v.Normalizations.registered[c]("name",a))v.Normalizations.registered[c]("inject",a,d),h="transform",d=g(a).transformCache[c];else{if(v.Hooks.registered[c]){var i=c,j=v.Hooks.getRoot(c);e=e||v.getPropertyValue(a,j),d=v.Hooks.injectValue(i,d,e),c=j}if(v.Normalizations.registered[c]&&(d=v.Normalizations.registered[c]("inject",a,d),c=v.Normalizations.registered[c]("name",a)),h=v.Names.prefixCheck(c)[0],n<=8)try{a.style[h]=d}catch(k){t.debug&&console.log("Browser does not support ["+d+"] for ["+h+"]")}else{var l=g(a);l&&l.isSVG&&v.Names.SVGAttribute(c)?a.setAttribute(c,d):a.style[h]=d}t.debug>=2&&console.log("Set "+c+" ("+h+"): "+d)}return[h,d]},flushTransformCache:function(a){var b="",c=g(a);if((n||t.State.isAndroid&&!t.State.isChrome)&&c&&c.isSVG){var d=function(b){return parseFloat(v.getPropertyValue(a,b))},e={translate:[d("translateX"),d("translateY")],skewX:[d("skewX")],skewY:[d("skewY")],scale:1!==d("scale")?[d("scale"),d("scale")]:[d("scaleX"),d("scaleY")],rotate:[d("rotateZ"),0,0]};m.each(g(a).transformCache,function(a){/^translate/i.test(a)?a="translate":/^scale/i.test(a)?a="scale":/^rotate/i.test(a)&&(a="rotate"),e[a]&&(b+=a+"("+e[a].join(" ")+") ",delete e[a])})}else{var f,h;m.each(g(a).transformCache,function(c){return f=g(a).transformCache[c],"transformPerspective"===c?(h=f,!0):(9===n&&"rotateZ"===c&&(c="rotate"),void(b+=c+f+" "))}),h&&(b="perspective"+h+" "+b)}v.setPropertyValue(a,"transform",b)}};v.Hooks.register(),v.Normalizations.register(),t.hook=function(a,b,c){var e;return a=f(a),m.each(a,function(a,f){if(g(f)===d&&t.init(f),c===d)e===d&&(e=v.getPropertyValue(f,b));else{var h=v.setPropertyValue(f,b,c);"transform"===h[0]&&t.CSS.flushTransformCache(f),e=h}}),e};var w=function(){function a(){return i?y.promise||null:n}function e(a,e){function f(f){var n,o;if(i.begin&&0===A)try{i.begin.call(q,q)}catch(r){setTimeout(function(){throw r},1)}if("scroll"===D){var w,x,B,C=/^x$/i.test(i.axis)?"Left":"Top",E=parseFloat(i.offset)||0;i.container?p.isWrapped(i.container)||p.isNode(i.container)?(i.container=i.container[0]||i.container,w=i.container["scroll"+C],B=w+m(a).position()[C.toLowerCase()]+E):i.container=null:(w=t.State.scrollAnchor[t.State["scrollProperty"+C]],x=t.State.scrollAnchor[t.State["scrollProperty"+("Left"===C?"Top":"Left")]],B=m(a).offset()[C.toLowerCase()]+E),l={scroll:{rootPropertyValue:!1,startValue:w,currentValue:w,endValue:B,unitType:"",easing:i.easing,scrollData:{container:i.container,direction:C,alternateValue:x}},element:a},t.debug&&console.log("tweensContainer (scroll): ",l.scroll,a)}else if("reverse"===D){if(n=g(a),!n)return;if(!n.tweensContainer)return void m.dequeue(a,i.queue);"none"===n.opts.display&&(n.opts.display="auto"),"hidden"===n.opts.visibility&&(n.opts.visibility="visible"),n.opts.loop=!1,n.opts.begin=null,n.opts.complete=null,u.easing||delete i.easing,u.duration||delete i.duration,i=m.extend({},n.opts,i),o=m.extend(!0,{},n?n.tweensContainer:null);for(var F in o)if(o.hasOwnProperty(F)&&"element"!==F){var G=o[F].startValue;o[F].startValue=o[F].currentValue=o[F].endValue,o[F].endValue=G,p.isEmptyObject(u)||(o[F].easing=i.easing),t.debug&&console.log("reverse tweensContainer ("+F+"): "+JSON.stringify(o[F]),a)}l=o}else if("start"===D){n=g(a),n&&n.tweensContainer&&n.isAnimating===!0&&(o=n.tweensContainer);var H=function(b,c){var d,f,g;return p.isFunction(b)&&(b=b.call(a,e,z)),p.isArray(b)?(d=b[0],!p.isArray(b[1])&&/^[\d-]/.test(b[1])||p.isFunction(b[1])||v.RegEx.isHex.test(b[1])?g=b[1]:p.isString(b[1])&&!v.RegEx.isHex.test(b[1])&&t.Easings[b[1]]||p.isArray(b[1])?(f=c?b[1]:j(b[1],i.duration),g=b[2]):g=b[1]||b[2]):d=b,c||(f=f||i.easing),p.isFunction(d)&&(d=d.call(a,e,z)),p.isFunction(g)&&(g=g.call(a,e,z)),[d||0,f,g]},K=function(e,f){var g,j=v.Hooks.getRoot(e),k=!1,q=f[0],r=f[1],s=f[2];if(!(n&&n.isSVG||"tween"===j||v.Names.prefixCheck(j)[1]!==!1||v.Normalizations.registered[j]!==d))return void(t.debug&&console.log("Skipping ["+j+"] due to a lack of browser support."));(i.display!==d&&null!==i.display&&"none"!==i.display||i.visibility!==d&&"hidden"!==i.visibility)&&/opacity|filter/.test(e)&&!s&&0!==q&&(s=0),i._cacheValues&&o&&o[e]?(s===d&&(s=o[e].endValue+o[e].unitType),k=n.rootPropertyValueCache[j]):v.Hooks.registered[e]?s===d?(k=v.getPropertyValue(a,j),s=v.getPropertyValue(a,e,k)):k=v.Hooks.templates[j][1]:s===d&&(s=v.getPropertyValue(a,e));var u,w,x,y=!1,z=function(a,b){var c,d;return d=(b||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(a){return c=a,""}),c||(c=v.Values.getUnitType(a)),[d,c]};if(p.isString(s)&&p.isString(q)){g="";for(var A=0,B=0,C=[],D=[];A<s.length&&B<q.length;){var E=s[A],F=q[B];if(/[\d\.]/.test(E)&&/[\d\.]/.test(F)){for(var G=E,H=F,J=".",K=".";++A<s.length;){if(E=s[A],E===J)J="..";else if(!/\d/.test(E))break;G+=E}for(;++B<q.length;){if(F=q[B],F===K)K="..";else if(!/\d/.test(F))break;H+=F}G===H?g+=G:(g+="{"+C.length+"}",C.push(parseFloat(G)),D.push(parseFloat(H)))}else{if(E!==F)break;g+=E,A++,B++}}A===s.length&&B===q.length||(t.debug&&console.error('Trying to pattern match mis-matched strings ["'+q+'", "'+s+'"]'),g=d),g&&(C.length?(t.debug&&console.log('Pattern found "'+g+'" -> ',C,D,s,q),s=C,q=D,w=x=""):g=d)}g||(u=z(e,s),s=u[0],x=u[1],u=z(e,q),q=u[0].replace(/^([+-\/*])=/,function(a,b){return y=b,""}),w=u[1],s=parseFloat(s)||0,q=parseFloat(q)||0,"%"===w&&(/^(fontSize|lineHeight)$/.test(e)?(q/=100,w="em"):/^scale/.test(e)?(q/=100,w=""):/(Red|Green|Blue)$/i.test(e)&&(q=q/100*255,w="")));var L=function(){var d={myParent:a.parentNode||c.body,position:v.getPropertyValue(a,"position"),fontSize:v.getPropertyValue(a,"fontSize")},e=d.position===I.lastPosition&&d.myParent===I.lastParent,f=d.fontSize===I.lastFontSize;I.lastParent=d.myParent,I.lastPosition=d.position,I.lastFontSize=d.fontSize;var g=100,h={};if(f&&e)h.emToPx=I.lastEmToPx,h.percentToPxWidth=I.lastPercentToPxWidth,h.percentToPxHeight=I.lastPercentToPxHeight;else{var i=n&&n.isSVG?c.createElementNS("http://www.w3.org/2000/svg","rect"):c.createElement("div");t.init(i),d.myParent.appendChild(i),m.each(["overflow","overflowX","overflowY"],function(a,b){t.CSS.setPropertyValue(i,b,"hidden")}),t.CSS.setPropertyValue(i,"position",d.position),t.CSS.setPropertyValue(i,"fontSize",d.fontSize),t.CSS.setPropertyValue(i,"boxSizing","content-box"),m.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(a,b){t.CSS.setPropertyValue(i,b,g+"%")}),t.CSS.setPropertyValue(i,"paddingLeft",g+"em"),h.percentToPxWidth=I.lastPercentToPxWidth=(parseFloat(v.getPropertyValue(i,"width",null,!0))||1)/g,h.percentToPxHeight=I.lastPercentToPxHeight=(parseFloat(v.getPropertyValue(i,"height",null,!0))||1)/g,h.emToPx=I.lastEmToPx=(parseFloat(v.getPropertyValue(i,"paddingLeft"))||1)/g,d.myParent.removeChild(i)}return null===I.remToPx&&(I.remToPx=parseFloat(v.getPropertyValue(c.body,"fontSize"))||16),null===I.vwToPx&&(I.vwToPx=parseFloat(b.innerWidth)/100,I.vhToPx=parseFloat(b.innerHeight)/100),h.remToPx=I.remToPx,h.vwToPx=I.vwToPx,h.vhToPx=I.vhToPx,t.debug>=1&&console.log("Unit ratios: "+JSON.stringify(h),a),h};if(/[\/*]/.test(y))w=x;else if(x!==w&&0!==s)if(0===q)w=x;else{h=h||L();var M=/margin|padding|left|right|width|text|word|letter/i.test(e)||/X$/.test(e)||"x"===e?"x":"y";switch(x){case"%":s*="x"===M?h.percentToPxWidth:h.percentToPxHeight;break;case"px":break;default:s*=h[x+"ToPx"]}switch(w){case"%":s*=1/("x"===M?h.percentToPxWidth:h.percentToPxHeight);break;case"px":break;default:s*=1/h[w+"ToPx"]}}switch(y){case"+":q=s+q;break;case"-":q=s-q;break;case"*":q*=s;break;case"/":q=s/q}l[e]={rootPropertyValue:k,startValue:s,currentValue:s,endValue:q,unitType:w,easing:r},g&&(l[e].pattern=g),t.debug&&console.log("tweensContainer ("+e+"): "+JSON.stringify(l[e]),a)};for(var L in s)if(s.hasOwnProperty(L)){var M=v.Names.camelCase(L),N=H(s[L]);if(v.Lists.colors.indexOf(M)>=0){var O=N[0],P=N[1],Q=N[2];if(v.RegEx.isHex.test(O)){for(var R=["Red","Green","Blue"],S=v.Values.hexToRgb(O),T=Q?v.Values.hexToRgb(Q):d,U=0;U<R.length;U++){var V=[S[U]];P&&V.push(P),T!==d&&V.push(T[U]),K(M+R[U],V)}continue}}K(M,N)}l.element=a}l.element&&(v.Values.addClass(a,"velocity-animating"),J.push(l),n=g(a),n&&(""===i.queue&&(n.tweensContainer=l,n.opts=i),n.isAnimating=!0),A===z-1?(t.State.calls.push([J,q,i,null,y.resolver]),t.State.isTicking===!1&&(t.State.isTicking=!0,k())):A++)}var h,i=m.extend({},t.defaults,u),l={};switch(g(a)===d&&t.init(a),parseFloat(i.delay)&&i.queue!==!1&&m.queue(a,i.queue,function(b){t.velocityQueueEntryFlag=!0,g(a).delayTimer={setTimeout:setTimeout(b,parseFloat(i.delay)),next:b}}),i.duration.toString().toLowerCase()){case"fast":i.duration=200;break;case"normal":i.duration=r;
break;case"slow":i.duration=600;break;default:i.duration=parseFloat(i.duration)||1}t.mock!==!1&&(t.mock===!0?i.duration=i.delay=1:(i.duration*=parseFloat(t.mock)||1,i.delay*=parseFloat(t.mock)||1)),i.easing=j(i.easing,i.duration),i.begin&&!p.isFunction(i.begin)&&(i.begin=null),i.progress&&!p.isFunction(i.progress)&&(i.progress=null),i.complete&&!p.isFunction(i.complete)&&(i.complete=null),i.display!==d&&null!==i.display&&(i.display=i.display.toString().toLowerCase(),"auto"===i.display&&(i.display=t.CSS.Values.getDisplayType(a))),i.visibility!==d&&null!==i.visibility&&(i.visibility=i.visibility.toString().toLowerCase()),i.mobileHA=i.mobileHA&&t.State.isMobile&&!t.State.isGingerbread,i.queue===!1?i.delay?setTimeout(f,i.delay):f():m.queue(a,i.queue,function(a,b){return b===!0?(y.promise&&y.resolver(q),!0):(t.velocityQueueEntryFlag=!0,void f(a))}),""!==i.queue&&"fx"!==i.queue||"inprogress"===m.queue(a)[0]||m.dequeue(a)}var h,i,n,o,q,s,u,x=arguments[0]&&(arguments[0].p||m.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||p.isString(arguments[0].properties));p.isWrapped(this)?(i=!1,o=0,q=this,n=this):(i=!0,o=1,q=x?arguments[0].elements||arguments[0].e:arguments[0]);var y={promise:null,resolver:null,rejecter:null};if(i&&t.Promise&&(y.promise=new t.Promise(function(a,b){y.resolver=a,y.rejecter=b})),x?(s=arguments[0].properties||arguments[0].p,u=arguments[0].options||arguments[0].o):(s=arguments[o],u=arguments[o+1]),q=f(q),!q)return void(y.promise&&(s&&u&&u.promiseRejectEmpty===!1?y.resolver():y.rejecter()));var z=q.length,A=0;if(!/^(stop|finish|finishAll)$/i.test(s)&&!m.isPlainObject(u)){var B=o+1;u={};for(var C=B;C<arguments.length;C++)p.isArray(arguments[C])||!/^(fast|normal|slow)$/i.test(arguments[C])&&!/^\d/.test(arguments[C])?p.isString(arguments[C])||p.isArray(arguments[C])?u.easing=arguments[C]:p.isFunction(arguments[C])&&(u.complete=arguments[C]):u.duration=arguments[C]}var D;switch(s){case"scroll":D="scroll";break;case"reverse":D="reverse";break;case"finish":case"finishAll":case"stop":m.each(q,function(a,b){g(b)&&g(b).delayTimer&&(clearTimeout(g(b).delayTimer.setTimeout),g(b).delayTimer.next&&g(b).delayTimer.next(),delete g(b).delayTimer),"finishAll"!==s||u!==!0&&!p.isString(u)||(m.each(m.queue(b,p.isString(u)?u:""),function(a,b){p.isFunction(b)&&b()}),m.queue(b,p.isString(u)?u:"",[]))});var E=[];return m.each(t.State.calls,function(a,b){b&&m.each(b[1],function(c,e){var f=u===d?"":u;return f!==!0&&b[2].queue!==f&&(u!==d||b[2].queue!==!1)||void m.each(q,function(c,d){if(d===e)if((u===!0||p.isString(u))&&(m.each(m.queue(d,p.isString(u)?u:""),function(a,b){p.isFunction(b)&&b(null,!0)}),m.queue(d,p.isString(u)?u:"",[])),"stop"===s){var h=g(d);h&&h.tweensContainer&&f!==!1&&m.each(h.tweensContainer,function(a,b){b.endValue=b.currentValue}),E.push(a)}else"finish"!==s&&"finishAll"!==s||(b[2].duration=1)})})}),"stop"===s&&(m.each(E,function(a,b){l(b,!0)}),y.promise&&y.resolver(q)),a();default:if(!m.isPlainObject(s)||p.isEmptyObject(s)){if(p.isString(s)&&t.Redirects[s]){h=m.extend({},u);var F=h.duration,G=h.delay||0;return h.backwards===!0&&(q=m.extend(!0,[],q).reverse()),m.each(q,function(a,b){parseFloat(h.stagger)?h.delay=G+parseFloat(h.stagger)*a:p.isFunction(h.stagger)&&(h.delay=G+h.stagger.call(b,a,z)),h.drag&&(h.duration=parseFloat(F)||(/^(callout|transition)/.test(s)?1e3:r),h.duration=Math.max(h.duration*(h.backwards?1-a/z:(a+1)/z),.75*h.duration,200)),t.Redirects[s].call(b,b,h||{},a,z,q,y.promise?y:d)}),a()}var H="Velocity: First argument ("+s+") was not a property map, a known action, or a registered redirect. Aborting.";return y.promise?y.rejecter(new Error(H)):console.log(H),a()}D="start"}var I={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},J=[];m.each(q,function(a,b){p.isNode(b)&&e(b,a)}),h=m.extend({},t.defaults,u),h.loop=parseInt(h.loop,10);var K=2*h.loop-1;if(h.loop)for(var L=0;L<K;L++){var M={delay:h.delay,progress:h.progress};L===K-1&&(M.display=h.display,M.visibility=h.visibility,M.complete=h.complete),w(q,"reverse",M)}return a()};t=m.extend(w,t),t.animate=w;var x=b.requestAnimationFrame||o;return t.State.isMobile||c.hidden===d||c.addEventListener("visibilitychange",function(){c.hidden?(x=function(a){return setTimeout(function(){a(!0)},16)},k()):x=b.requestAnimationFrame||o}),a.Velocity=t,a!==b&&(a.fn.velocity=w,a.fn.velocity.defaults=t.defaults),m.each(["Down","Up"],function(a,b){t.Redirects["slide"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j=i.begin,k=i.complete,l={},n={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""};i.display===d&&(i.display="Down"===b?"inline"===t.CSS.Values.getDisplayType(a)?"inline-block":"block":"none"),i.begin=function(){0===e&&j&&j.call(g,g);for(var c in n)if(n.hasOwnProperty(c)){l[c]=a.style[c];var d=v.getPropertyValue(a,c);n[c]="Down"===b?[d,0]:[0,d]}l.overflow=a.style.overflow,a.style.overflow="hidden"},i.complete=function(){for(var b in l)l.hasOwnProperty(b)&&(a.style[b]=l[b]);e===f-1&&(k&&k.call(g,g),h&&h.resolver(g))},t(a,n,i)}}),m.each(["In","Out"],function(a,b){t.Redirects["fade"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j=i.complete,k={opacity:"In"===b?1:0};0!==e&&(i.begin=null),e!==f-1?i.complete=null:i.complete=function(){j&&j.call(g,g),h&&h.resolver(g)},i.display===d&&(i.display="In"===b?"auto":"none"),t(this,k,i)}}),t}(window.jQuery||window.Zepto||window,window,window?window.document:void 0)});
/* VelocityJS.org UI Pack (5.0.4). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License. Portions copyright Daniel Eden, Christian Pucci. */
!function(t){"function"==typeof require&&"object"==typeof exports?module.exports=t():"function"==typeof define&&define.amd?define(["velocity"],t):t()}(function(){return function(t,a,e,r){function n(t,a){var e=[];return t&&a?($.each([t,a],function(t,a){var r=[];$.each(a,function(t,a){for(;a.toString().length<5;)a="0"+a;r.push(a)}),e.push(r.join(""))}),parseFloat(e[0])>parseFloat(e[1])):!1}if(!t.Velocity||!t.Velocity.Utilities)return void(a.console&&console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));var i=t.Velocity,$=i.Utilities,s=i.version,o={major:1,minor:1,patch:0};if(n(o,s)){var l="Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";throw alert(l),new Error(l)}i.RegisterEffect=i.RegisterUI=function(t,a){function e(t,a,e,r){var n=0,s;$.each(t.nodeType?[t]:t,function(t,a){r&&(e+=t*r),s=a.parentNode,$.each(["height","paddingTop","paddingBottom","marginTop","marginBottom"],function(t,e){n+=parseFloat(i.CSS.getPropertyValue(a,e))})}),i.animate(s,{height:("In"===a?"+":"-")+"="+n},{queue:!1,easing:"ease-in-out",duration:e*("In"===a?.6:1)})}return i.Redirects[t]=function(n,s,o,l,c,u){function f(){s.display!==r&&"none"!==s.display||!/Out$/.test(t)||$.each(c.nodeType?[c]:c,function(t,a){i.CSS.setPropertyValue(a,"display","none")}),s.complete&&s.complete.call(c,c),u&&u.resolver(c||n)}var p=o===l-1;a.defaultDuration="function"==typeof a.defaultDuration?a.defaultDuration.call(c,c):parseFloat(a.defaultDuration);for(var d=0;d<a.calls.length;d++){var g=a.calls[d],y=g[0],m=s.duration||a.defaultDuration||1e3,X=g[1],Y=g[2]||{},O={};if(O.duration=m*(X||1),O.queue=s.queue||"",O.easing=Y.easing||"ease",O.delay=parseFloat(Y.delay)||0,O._cacheValues=Y._cacheValues||!0,0===d){if(O.delay+=parseFloat(s.delay)||0,0===o&&(O.begin=function(){s.begin&&s.begin.call(c,c);var a=t.match(/(In|Out)$/);a&&"In"===a[0]&&y.opacity!==r&&$.each(c.nodeType?[c]:c,function(t,a){i.CSS.setPropertyValue(a,"opacity",0)}),s.animateParentHeight&&a&&e(c,a[0],m+O.delay,s.stagger)}),null!==s.display)if(s.display!==r&&"none"!==s.display)O.display=s.display;else if(/In$/.test(t)){var v=i.CSS.Values.getDisplayType(n);O.display="inline"===v?"inline-block":v}s.visibility&&"hidden"!==s.visibility&&(O.visibility=s.visibility)}d===a.calls.length-1&&(O.complete=function(){if(a.reset){for(var t in a.reset){var e=a.reset[t];i.CSS.Hooks.registered[t]!==r||"string"!=typeof e&&"number"!=typeof e||(a.reset[t]=[a.reset[t],a.reset[t]])}var s={duration:0,queue:!1};p&&(s.complete=f),i.animate(n,a.reset,s)}else p&&f()},"hidden"===s.visibility&&(O.visibility=s.visibility)),i.animate(n,y,O)}},i},i.RegisterEffect.packagedEffects={"callout.bounce":{defaultDuration:550,calls:[[{translateY:-30},.25],[{translateY:0},.125],[{translateY:-15},.125],[{translateY:0},.25]]},"callout.shake":{defaultDuration:800,calls:[[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:0},.125]]},"callout.flash":{defaultDuration:1100,calls:[[{opacity:[0,"easeInOutQuad",1]},.25],[{opacity:[1,"easeInOutQuad"]},.25],[{opacity:[0,"easeInOutQuad"]},.25],[{opacity:[1,"easeInOutQuad"]},.25]]},"callout.pulse":{defaultDuration:825,calls:[[{scaleX:1.1,scaleY:1.1},.5,{easing:"easeInExpo"}],[{scaleX:1,scaleY:1},.5]]},"callout.swing":{defaultDuration:950,calls:[[{rotateZ:15},.2],[{rotateZ:-10},.2],[{rotateZ:5},.2],[{rotateZ:-5},.2],[{rotateZ:0},.2]]},"callout.tada":{defaultDuration:1e3,calls:[[{scaleX:.9,scaleY:.9,rotateZ:-3},.1],[{scaleX:1.1,scaleY:1.1,rotateZ:3},.1],[{scaleX:1.1,scaleY:1.1,rotateZ:-3},.1],["reverse",.125],["reverse",.125],["reverse",.125],["reverse",.125],["reverse",.125],[{scaleX:1,scaleY:1,rotateZ:0},.2]]},"transition.fadeIn":{defaultDuration:500,calls:[[{opacity:[1,0]}]]},"transition.fadeOut":{defaultDuration:500,calls:[[{opacity:[0,1]}]]},"transition.flipXIn":{defaultDuration:700,calls:[[{opacity:[1,0],transformPerspective:[800,800],rotateY:[0,-55]}]],reset:{transformPerspective:0}},"transition.flipXOut":{defaultDuration:700,calls:[[{opacity:[0,1],transformPerspective:[800,800],rotateY:55}]],reset:{transformPerspective:0,rotateY:0}},"transition.flipYIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],rotateX:[0,-45]}]],reset:{transformPerspective:0}},"transition.flipYOut":{defaultDuration:800,calls:[[{opacity:[0,1],transformPerspective:[800,800],rotateX:25}]],reset:{transformPerspective:0,rotateX:0}},"transition.flipBounceXIn":{defaultDuration:900,calls:[[{opacity:[.725,0],transformPerspective:[400,400],rotateY:[-10,90]},.5],[{opacity:.8,rotateY:10},.25],[{opacity:1,rotateY:0},.25]],reset:{transformPerspective:0}},"transition.flipBounceXOut":{defaultDuration:800,calls:[[{opacity:[.9,1],transformPerspective:[400,400],rotateY:-10},.5],[{opacity:0,rotateY:90},.5]],reset:{transformPerspective:0,rotateY:0}},"transition.flipBounceYIn":{defaultDuration:850,calls:[[{opacity:[.725,0],transformPerspective:[400,400],rotateX:[-10,90]},.5],[{opacity:.8,rotateX:10},.25],[{opacity:1,rotateX:0},.25]],reset:{transformPerspective:0}},"transition.flipBounceYOut":{defaultDuration:800,calls:[[{opacity:[.9,1],transformPerspective:[400,400],rotateX:-15},.5],[{opacity:0,rotateX:90},.5]],reset:{transformPerspective:0,rotateX:0}},"transition.swoopIn":{defaultDuration:850,calls:[[{opacity:[1,0],transformOriginX:["100%","50%"],transformOriginY:["100%","100%"],scaleX:[1,0],scaleY:[1,0],translateX:[0,-700],translateZ:0}]],reset:{transformOriginX:"50%",transformOriginY:"50%"}},"transition.swoopOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformOriginX:["50%","100%"],transformOriginY:["100%","100%"],scaleX:0,scaleY:0,translateX:-700,translateZ:0}]],reset:{transformOriginX:"50%",transformOriginY:"50%",scaleX:1,scaleY:1,translateX:0}},"transition.whirlIn":{defaultDuration:850,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,0],scaleY:[1,0],rotateY:[0,160]},1,{easing:"easeInOutSine"}]]},"transition.whirlOut":{defaultDuration:750,calls:[[{opacity:[0,"easeInOutQuint",1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:0,scaleY:0,rotateY:160},1,{easing:"swing"}]],reset:{scaleX:1,scaleY:1,rotateY:0}},"transition.shrinkIn":{defaultDuration:750,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,1.5],scaleY:[1,1.5],translateZ:0}]]},"transition.shrinkOut":{defaultDuration:600,calls:[[{opacity:[0,1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:1.3,scaleY:1.3,translateZ:0}]],reset:{scaleX:1,scaleY:1}},"transition.expandIn":{defaultDuration:700,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,.625],scaleY:[1,.625],translateZ:0}]]},"transition.expandOut":{defaultDuration:700,calls:[[{opacity:[0,1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:.5,scaleY:.5,translateZ:0}]],reset:{scaleX:1,scaleY:1}},"transition.bounceIn":{defaultDuration:800,calls:[[{opacity:[1,0],scaleX:[1.05,.3],scaleY:[1.05,.3]},.4],[{scaleX:.9,scaleY:.9,translateZ:0},.2],[{scaleX:1,scaleY:1},.5]]},"transition.bounceOut":{defaultDuration:800,calls:[[{scaleX:.95,scaleY:.95},.35],[{scaleX:1.1,scaleY:1.1,translateZ:0},.35],[{opacity:[0,1],scaleX:.3,scaleY:.3},.3]],reset:{scaleX:1,scaleY:1}},"transition.bounceUpIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateY:[-30,1e3]},.6,{easing:"easeOutCirc"}],[{translateY:10},.2],[{translateY:0},.2]]},"transition.bounceUpOut":{defaultDuration:1e3,calls:[[{translateY:20},.2],[{opacity:[0,"easeInCirc",1],translateY:-1e3},.8]],reset:{translateY:0}},"transition.bounceDownIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateY:[30,-1e3]},.6,{easing:"easeOutCirc"}],[{translateY:-10},.2],[{translateY:0},.2]]},"transition.bounceDownOut":{defaultDuration:1e3,calls:[[{translateY:-20},.2],[{opacity:[0,"easeInCirc",1],translateY:1e3},.8]],reset:{translateY:0}},"transition.bounceLeftIn":{defaultDuration:750,calls:[[{opacity:[1,0],translateX:[30,-1250]},.6,{easing:"easeOutCirc"}],[{translateX:-10},.2],[{translateX:0},.2]]},"transition.bounceLeftOut":{defaultDuration:750,calls:[[{translateX:30},.2],[{opacity:[0,"easeInCirc",1],translateX:-1250},.8]],reset:{translateX:0}},"transition.bounceRightIn":{defaultDuration:750,calls:[[{opacity:[1,0],translateX:[-30,1250]},.6,{easing:"easeOutCirc"}],[{translateX:10},.2],[{translateX:0},.2]]},"transition.bounceRightOut":{defaultDuration:750,calls:[[{translateX:-30},.2],[{opacity:[0,"easeInCirc",1],translateX:1250},.8]],reset:{translateX:0}},"transition.slideUpIn":{defaultDuration:900,calls:[[{opacity:[1,0],translateY:[0,20],translateZ:0}]]},"transition.slideUpOut":{defaultDuration:900,calls:[[{opacity:[0,1],translateY:-20,translateZ:0}]],reset:{translateY:0}},"transition.slideDownIn":{defaultDuration:900,calls:[[{opacity:[1,0],translateY:[0,-20],translateZ:0}]]},"transition.slideDownOut":{defaultDuration:900,calls:[[{opacity:[0,1],translateY:20,translateZ:0}]],reset:{translateY:0}},"transition.slideLeftIn":{defaultDuration:1e3,calls:[[{opacity:[1,0],translateX:[0,-20],translateZ:0}]]},"transition.slideLeftOut":{defaultDuration:1050,calls:[[{opacity:[0,1],translateX:-20,translateZ:0}]],reset:{translateX:0}},"transition.slideRightIn":{defaultDuration:1e3,calls:[[{opacity:[1,0],translateX:[0,20],translateZ:0}]]},"transition.slideRightOut":{defaultDuration:1050,calls:[[{opacity:[0,1],translateX:20,translateZ:0}]],reset:{translateX:0}},"transition.slideUpBigIn":{defaultDuration:850,calls:[[{opacity:[1,0],translateY:[0,75],translateZ:0}]]},"transition.slideUpBigOut":{defaultDuration:800,calls:[[{opacity:[0,1],translateY:-75,translateZ:0}]],reset:{translateY:0}},"transition.slideDownBigIn":{defaultDuration:850,calls:[[{opacity:[1,0],translateY:[0,-75],translateZ:0}]]},"transition.slideDownBigOut":{defaultDuration:800,calls:[[{opacity:[0,1],translateY:75,translateZ:0}]],reset:{translateY:0}},"transition.slideLeftBigIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateX:[0,-75],translateZ:0}]]},"transition.slideLeftBigOut":{defaultDuration:750,calls:[[{opacity:[0,1],translateX:-75,translateZ:0}]],reset:{translateX:0}},"transition.slideRightBigIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateX:[0,75],translateZ:0}]]},"transition.slideRightBigOut":{defaultDuration:750,calls:[[{opacity:[0,1],translateX:75,translateZ:0}]],reset:{translateX:0}},"transition.perspectiveUpIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:["100%","100%"],rotateX:[0,-180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveUpOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:["100%","100%"],rotateX:-180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateX:0}},"transition.perspectiveDownIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:[0,0],rotateX:[0,180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveDownOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:[0,0],rotateX:180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateX:0}},"transition.perspectiveLeftIn":{defaultDuration:950,calls:[[{opacity:[1,0],transformPerspective:[2e3,2e3],transformOriginX:[0,0],transformOriginY:[0,0],rotateY:[0,-180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveLeftOut":{defaultDuration:950,calls:[[{opacity:[0,1],transformPerspective:[2e3,2e3],transformOriginX:[0,0],transformOriginY:[0,0],rotateY:-180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateY:0}},"transition.perspectiveRightIn":{defaultDuration:950,calls:[[{opacity:[1,0],transformPerspective:[2e3,2e3],transformOriginX:["100%","100%"],transformOriginY:[0,0],rotateY:[0,180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveRightOut":{defaultDuration:950,calls:[[{opacity:[0,1],transformPerspective:[2e3,2e3],transformOriginX:["100%","100%"],transformOriginY:[0,0],rotateY:180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateY:0}}};for(var c in i.RegisterEffect.packagedEffects)i.RegisterEffect(c,i.RegisterEffect.packagedEffects[c]);i.RunSequence=function(t){var a=$.extend(!0,[],t);a.length>1&&($.each(a.reverse(),function(t,e){var r=a[t+1];if(r){var n=e.o||e.options,s=r.o||r.options,o=n&&n.sequenceQueue===!1?"begin":"complete",l=s&&s[o],c={};c[o]=function(){var t=r.e||r.elements,a=t.nodeType?[t]:t;l&&l.call(a,a),i(e)},r.o?r.o=$.extend({},s,c):r.options=$.extend({},s,c)}}),a.reverse()),i(a[0])}}(window.jQuery||window.Zepto||window,window,document)});
/*!
// ███   █    ████▄    ▄▄▄▄▀ ▄▄▄▄▀ ▄███▄   █▄▄▄▄
// █  █  █    █   █ ▀▀▀ █ ▀▀▀ █    █▀   ▀  █  ▄▀
// █ ▀ ▄ █    █   █     █     █    ██▄▄    █▀▀▌
// █  ▄▀ ███▄ ▀████    █     █     █▄   ▄▀ █  █
// ███       ▀        ▀     ▀      ▀███▀     █
//                                          ▀
// The MIT License
//
// Copyright © 1986 - ∞, Blotter / Bradley Griffith / http://bradley.computer
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
*/
!function(){var a="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global||this,b=a._,c=Array.prototype,d=Object.prototype,e="undefined"!=typeof Symbol?Symbol.prototype:null,f=c.push,g=c.slice,h=d.toString,i=d.hasOwnProperty,j=Array.isArray,k=Object.keys,l=Object.create,m=function(){},n=function(a){return a instanceof n?a:this instanceof n?void(this._wrapped=a):new n(a)};"undefined"==typeof exports||exports.nodeType?a._=n:("undefined"!=typeof module&&!module.nodeType&&module.exports&&(exports=module.exports=n),exports._=n),n.VERSION="1.8.3";var o,p=function(a,b,c){if(void 0===b)return a;switch(null==c?3:c){case 1:return function(c){return a.call(b,c)};case 3:return function(c,d,e){return a.call(b,c,d,e)};case 4:return function(c,d,e,f){return a.call(b,c,d,e,f)}}return function(){return a.apply(b,arguments)}},q=function(a,b,c){return n.iteratee!==o?n.iteratee(a,b):null==a?n.identity:n.isFunction(a)?p(a,b,c):n.isObject(a)?n.matcher(a):n.property(a)};n.iteratee=o=function(a,b){return q(a,b,1/0)};var r=function(a,b){return b=null==b?a.length-1:+b,function(){for(var c=Math.max(arguments.length-b,0),d=Array(c),e=0;e<c;e++)d[e]=arguments[e+b];switch(b){case 0:return a.call(this,d);case 1:return a.call(this,arguments[0],d);case 2:return a.call(this,arguments[0],arguments[1],d)}var f=Array(b+1);for(e=0;e<b;e++)f[e]=arguments[e];return f[b]=d,a.apply(this,f)}},s=function(a){if(!n.isObject(a))return{};if(l)return l(a);m.prototype=a;var b=new m;return m.prototype=null,b},t=function(a){return function(b){return null==b?void 0:b[a]}},u=Math.pow(2,53)-1,v=t("length"),w=function(a){var b=v(a);return"number"==typeof b&&b>=0&&b<=u};n.each=n.forEach=function(a,b,c){b=p(b,c);var d,e;if(w(a))for(d=0,e=a.length;d<e;d++)b(a[d],d,a);else{var f=n.keys(a);for(d=0,e=f.length;d<e;d++)b(a[f[d]],f[d],a)}return a},n.map=n.collect=function(a,b,c){b=q(b,c);for(var d=!w(a)&&n.keys(a),e=(d||a).length,f=Array(e),g=0;g<e;g++){var h=d?d[g]:g;f[g]=b(a[h],h,a)}return f};var x=function(a){var b=function(b,c,d,e){var f=!w(b)&&n.keys(b),g=(f||b).length,h=a>0?0:g-1;for(e||(d=b[f?f[h]:h],h+=a);h>=0&&h<g;h+=a){var i=f?f[h]:h;d=c(d,b[i],i,b)}return d};return function(a,c,d,e){var f=arguments.length>=3;return b(a,p(c,e,4),d,f)}};n.reduce=n.foldl=n.inject=x(1),n.reduceRight=n.foldr=x(-1),n.find=n.detect=function(a,b,c){var d=w(a)?n.findIndex:n.findKey,e=d(a,b,c);if(void 0!==e&&-1!==e)return a[e]},n.filter=n.select=function(a,b,c){var d=[];return b=q(b,c),n.each(a,function(a,c,e){b(a,c,e)&&d.push(a)}),d},n.reject=function(a,b,c){return n.filter(a,n.negate(q(b)),c)},n.every=n.all=function(a,b,c){b=q(b,c);for(var d=!w(a)&&n.keys(a),e=(d||a).length,f=0;f<e;f++){var g=d?d[f]:f;if(!b(a[g],g,a))return!1}return!0},n.some=n.any=function(a,b,c){b=q(b,c);for(var d=!w(a)&&n.keys(a),e=(d||a).length,f=0;f<e;f++){var g=d?d[f]:f;if(b(a[g],g,a))return!0}return!1},n.contains=n.includes=n.include=function(a,b,c,d){return w(a)||(a=n.values(a)),("number"!=typeof c||d)&&(c=0),n.indexOf(a,b,c)>=0},n.invoke=r(function(a,b,c){var d=n.isFunction(b);return n.map(a,function(a){var e=d?b:a[b];return null==e?e:e.apply(a,c)})}),n.pluck=function(a,b){return n.map(a,n.property(b))},n.where=function(a,b){return n.filter(a,n.matcher(b))},n.findWhere=function(a,b){return n.find(a,n.matcher(b))},n.max=function(a,b,c){var d,e,f=-1/0,g=-1/0;if(null==b||"number"==typeof b&&"object"!=typeof a[0]&&null!=a){a=w(a)?a:n.values(a);for(var h=0,i=a.length;h<i;h++)null!=(d=a[h])&&d>f&&(f=d)}else b=q(b,c),n.each(a,function(a,c,d){((e=b(a,c,d))>g||e===-1/0&&f===-1/0)&&(f=a,g=e)});return f},n.min=function(a,b,c){var d,e,f=1/0,g=1/0;if(null==b||"number"==typeof b&&"object"!=typeof a[0]&&null!=a){a=w(a)?a:n.values(a);for(var h=0,i=a.length;h<i;h++)null!=(d=a[h])&&d<f&&(f=d)}else b=q(b,c),n.each(a,function(a,c,d){((e=b(a,c,d))<g||e===1/0&&f===1/0)&&(f=a,g=e)});return f},n.shuffle=function(a){return n.sample(a,1/0)},n.sample=function(a,b,c){if(null==b||c)return w(a)||(a=n.values(a)),a[n.random(a.length-1)];var d=w(a)?n.clone(a):n.values(a),e=v(d);b=Math.max(Math.min(b,e),0);for(var f=e-1,g=0;g<b;g++){var h=n.random(g,f),i=d[g];d[g]=d[h],d[h]=i}return d.slice(0,b)},n.sortBy=function(a,b,c){var d=0;return b=q(b,c),n.pluck(n.map(a,function(a,c,e){return{value:a,index:d++,criteria:b(a,c,e)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;if(c!==d){if(c>d||void 0===c)return 1;if(c<d||void 0===d)return-1}return a.index-b.index}),"value")};var y=function(a,b){return function(c,d,e){var f=b?[[],[]]:{};return d=q(d,e),n.each(c,function(b,e){var g=d(b,e,c);a(f,b,g)}),f}};n.groupBy=y(function(a,b,c){n.has(a,c)?a[c].push(b):a[c]=[b]}),n.indexBy=y(function(a,b,c){a[c]=b}),n.countBy=y(function(a,b,c){n.has(a,c)?a[c]++:a[c]=1});var z=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;n.toArray=function(a){return a?n.isArray(a)?g.call(a):n.isString(a)?a.match(z):w(a)?n.map(a,n.identity):n.values(a):[]},n.size=function(a){return null==a?0:w(a)?a.length:n.keys(a).length},n.partition=y(function(a,b,c){a[c?0:1].push(b)},!0),n.first=n.head=n.take=function(a,b,c){if(null!=a)return null==b||c?a[0]:n.initial(a,a.length-b)},n.initial=function(a,b,c){return g.call(a,0,Math.max(0,a.length-(null==b||c?1:b)))},n.last=function(a,b,c){if(null!=a)return null==b||c?a[a.length-1]:n.rest(a,Math.max(0,a.length-b))},n.rest=n.tail=n.drop=function(a,b,c){return g.call(a,null==b||c?1:b)},n.compact=function(a){return n.filter(a,Boolean)};var A=function(a,b,c,d){d=d||[];for(var e=d.length,f=0,g=v(a);f<g;f++){var h=a[f];if(w(h)&&(n.isArray(h)||n.isArguments(h)))if(b)for(var i=0,j=h.length;i<j;)d[e++]=h[i++];else A(h,b,c,d),e=d.length;else c||(d[e++]=h)}return d};n.flatten=function(a,b){return A(a,b,!1)},n.without=r(function(a,b){return n.difference(a,b)}),n.uniq=n.unique=function(a,b,c,d){n.isBoolean(b)||(d=c,c=b,b=!1),null!=c&&(c=q(c,d));for(var e=[],f=[],g=0,h=v(a);g<h;g++){var i=a[g],j=c?c(i,g,a):i;b?(g&&f===j||e.push(i),f=j):c?n.contains(f,j)||(f.push(j),e.push(i)):n.contains(e,i)||e.push(i)}return e},n.union=r(function(a){return n.uniq(A(a,!0,!0))}),n.intersection=function(a){for(var b=[],c=arguments.length,d=0,e=v(a);d<e;d++){var f=a[d];if(!n.contains(b,f)){var g;for(g=1;g<c&&n.contains(arguments[g],f);g++);g===c&&b.push(f)}}return b},n.difference=r(function(a,b){return b=A(b,!0,!0),n.filter(a,function(a){return!n.contains(b,a)})}),n.unzip=function(a){for(var b=a&&n.max(a,v).length||0,c=Array(b),d=0;d<b;d++)c[d]=n.pluck(a,d);return c},n.zip=r(n.unzip),n.object=function(a,b){for(var c={},d=0,e=v(a);d<e;d++)b?c[a[d]]=b[d]:c[a[d][0]]=a[d][1];return c};var B=function(a){return function(b,c,d){c=q(c,d);for(var e=v(b),f=a>0?0:e-1;f>=0&&f<e;f+=a)if(c(b[f],f,b))return f;return-1}};n.findIndex=B(1),n.findLastIndex=B(-1),n.sortedIndex=function(a,b,c,d){c=q(c,d,1);for(var e=c(b),f=0,g=v(a);f<g;){var h=Math.floor((f+g)/2);c(a[h])<e?f=h+1:g=h}return f};var C=function(a,b,c){return function(d,e,f){var h=0,i=v(d);if("number"==typeof f)a>0?h=f>=0?f:Math.max(f+i,h):i=f>=0?Math.min(f+1,i):f+i+1;else if(c&&f&&i)return f=c(d,e),d[f]===e?f:-1;if(e!==e)return f=b(g.call(d,h,i),n.isNaN),f>=0?f+h:-1;for(f=a>0?h:i-1;f>=0&&f<i;f+=a)if(d[f]===e)return f;return-1}};n.indexOf=C(1,n.findIndex,n.sortedIndex),n.lastIndexOf=C(-1,n.findLastIndex),n.range=function(a,b,c){null==b&&(b=a||0,a=0),c||(c=b<a?-1:1);for(var d=Math.max(Math.ceil((b-a)/c),0),e=Array(d),f=0;f<d;f++,a+=c)e[f]=a;return e},n.chunk=function(a,b){if(null==b||b<1)return[];for(var c=[],d=0,e=a.length;d<e;)c.push(g.call(a,d,d+=b));return c};var D=function(a,b,c,d,e){if(!(d instanceof b))return a.apply(c,e);var f=s(a.prototype),g=a.apply(f,e);return n.isObject(g)?g:f};n.bind=r(function(a,b,c){if(!n.isFunction(a))throw new TypeError("Bind must be called on a function");var d=r(function(e){return D(a,d,b,this,c.concat(e))});return d}),n.partial=r(function(a,b){var c=n.partial.placeholder,d=function(){for(var e=0,f=b.length,g=Array(f),h=0;h<f;h++)g[h]=b[h]===c?arguments[e++]:b[h];for(;e<arguments.length;)g.push(arguments[e++]);return D(a,d,this,this,g)};return d}),n.partial.placeholder=n,n.bindAll=r(function(a,b){b=A(b,!1,!1);var c=b.length;if(c<1)throw new Error("bindAll must be passed function names");for(;c--;){var d=b[c];a[d]=n.bind(a[d],a)}}),n.memoize=function(a,b){var c=function(d){var e=c.cache,f=""+(b?b.apply(this,arguments):d);return n.has(e,f)||(e[f]=a.apply(this,arguments)),e[f]};return c.cache={},c},n.delay=r(function(a,b,c){return setTimeout(function(){return a.apply(null,c)},b)}),n.defer=n.partial(n.delay,n,1),n.throttle=function(a,b,c){var d,e,f,g,h=0;c||(c={});var i=function(){h=!1===c.leading?0:n.now(),d=null,g=a.apply(e,f),d||(e=f=null)},j=function(){var j=n.now();h||!1!==c.leading||(h=j);var k=b-(j-h);return e=this,f=arguments,k<=0||k>b?(d&&(clearTimeout(d),d=null),h=j,g=a.apply(e,f),d||(e=f=null)):d||!1===c.trailing||(d=setTimeout(i,k)),g};return j.cancel=function(){clearTimeout(d),h=0,d=e=f=null},j},n.debounce=function(a,b,c){var d,e,f=function(b,c){d=null,c&&(e=a.apply(b,c))},g=r(function(g){if(d&&clearTimeout(d),c){var h=!d;d=setTimeout(f,b),h&&(e=a.apply(this,g))}else d=n.delay(f,b,this,g);return e});return g.cancel=function(){clearTimeout(d),d=null},g},n.wrap=function(a,b){return n.partial(b,a)},n.negate=function(a){return function(){return!a.apply(this,arguments)}},n.compose=function(){var a=arguments,b=a.length-1;return function(){for(var c=b,d=a[b].apply(this,arguments);c--;)d=a[c].call(this,d);return d}},n.after=function(a,b){return function(){if(--a<1)return b.apply(this,arguments)}},n.before=function(a,b){var c;return function(){return--a>0&&(c=b.apply(this,arguments)),a<=1&&(b=null),c}},n.once=n.partial(n.before,2),n.restArgs=r;var E=!{toString:null}.propertyIsEnumerable("toString"),F=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],G=function(a,b){var c=F.length,e=a.constructor,f=n.isFunction(e)&&e.prototype||d,g="constructor";for(n.has(a,g)&&!n.contains(b,g)&&b.push(g);c--;)(g=F[c])in a&&a[g]!==f[g]&&!n.contains(b,g)&&b.push(g)};n.keys=function(a){if(!n.isObject(a))return[];if(k)return k(a);var b=[];for(var c in a)n.has(a,c)&&b.push(c);return E&&G(a,b),b},n.allKeys=function(a){if(!n.isObject(a))return[];var b=[];for(var c in a)b.push(c);return E&&G(a,b),b},n.values=function(a){for(var b=n.keys(a),c=b.length,d=Array(c),e=0;e<c;e++)d[e]=a[b[e]];return d},n.mapObject=function(a,b,c){b=q(b,c);for(var d=n.keys(a),e=d.length,f={},g=0;g<e;g++){var h=d[g];f[h]=b(a[h],h,a)}return f},n.pairs=function(a){for(var b=n.keys(a),c=b.length,d=Array(c),e=0;e<c;e++)d[e]=[b[e],a[b[e]]];return d},n.invert=function(a){for(var b={},c=n.keys(a),d=0,e=c.length;d<e;d++)b[a[c[d]]]=c[d];return b},n.functions=n.methods=function(a){var b=[];for(var c in a)n.isFunction(a[c])&&b.push(c);return b.sort()};var H=function(a,b){return function(c){var d=arguments.length;if(b&&(c=Object(c)),d<2||null==c)return c;for(var e=1;e<d;e++)for(var f=arguments[e],g=a(f),h=g.length,i=0;i<h;i++){var j=g[i];b&&void 0!==c[j]||(c[j]=f[j])}return c}};n.extend=H(n.allKeys),n.extendOwn=n.assign=H(n.keys),n.findKey=function(a,b,c){b=q(b,c);for(var d,e=n.keys(a),f=0,g=e.length;f<g;f++)if(d=e[f],b(a[d],d,a))return d};var I=function(a,b,c){return b in c};n.pick=r(function(a,b){var c={},d=b[0];if(null==a)return c;n.isFunction(d)?(b.length>1&&(d=p(d,b[1])),b=n.allKeys(a)):(d=I,b=A(b,!1,!1),a=Object(a));for(var e=0,f=b.length;e<f;e++){var g=b[e],h=a[g];d(h,g,a)&&(c[g]=h)}return c}),n.omit=r(function(a,b){var c,d=b[0];return n.isFunction(d)?(d=n.negate(d),b.length>1&&(c=b[1])):(b=n.map(A(b,!1,!1),String),d=function(a,c){return!n.contains(b,c)}),n.pick(a,d,c)}),n.defaults=H(n.allKeys,!0),n.create=function(a,b){var c=s(a);return b&&n.extendOwn(c,b),c},n.clone=function(a){return n.isObject(a)?n.isArray(a)?a.slice():n.extend({},a):a},n.tap=function(a,b){return b(a),a},n.isMatch=function(a,b){var c=n.keys(b),d=c.length;if(null==a)return!d;for(var e=Object(a),f=0;f<d;f++){var g=c[f];if(b[g]!==e[g]||!(g in e))return!1}return!0};var J,K;J=function(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;if(null==a||null==b)return a===b;if(a!==a)return b!==b;var e=typeof a;return("function"===e||"object"===e||"object"==typeof b)&&K(a,b,c,d)},K=function(a,b,c,d){a instanceof n&&(a=a._wrapped),b instanceof n&&(b=b._wrapped);var f=h.call(a);if(f!==h.call(b))return!1;switch(f){case"[object RegExp]":case"[object String]":return""+a==""+b;case"[object Number]":return+a!=+a?+b!=+b:0==+a?1/+a==1/b:+a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object Symbol]":return e.valueOf.call(a)===e.valueOf.call(b)}var g="[object Array]"===f;if(!g){if("object"!=typeof a||"object"!=typeof b)return!1;var i=a.constructor,j=b.constructor;if(i!==j&&!(n.isFunction(i)&&i instanceof i&&n.isFunction(j)&&j instanceof j)&&"constructor"in a&&"constructor"in b)return!1}c=c||[],d=d||[];for(var k=c.length;k--;)if(c[k]===a)return d[k]===b;if(c.push(a),d.push(b),g){if((k=a.length)!==b.length)return!1;for(;k--;)if(!J(a[k],b[k],c,d))return!1}else{var l,m=n.keys(a);if(k=m.length,n.keys(b).length!==k)return!1;for(;k--;)if(l=m[k],!n.has(b,l)||!J(a[l],b[l],c,d))return!1}return c.pop(),d.pop(),!0},n.isEqual=function(a,b){return J(a,b)},n.isEmpty=function(a){return null==a||(w(a)&&(n.isArray(a)||n.isString(a)||n.isArguments(a))?0===a.length:0===n.keys(a).length)},n.isElement=function(a){return!(!a||1!==a.nodeType)},n.isArray=j||function(a){return"[object Array]"===h.call(a)},n.isObject=function(a){var b=typeof a;return"function"===b||"object"===b&&!!a},n.each(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"],function(a){n["is"+a]=function(b){return h.call(b)==="[object "+a+"]"}}),n.isArguments(arguments)||(n.isArguments=function(a){return n.has(a,"callee")});var L=a.document&&a.document.childNodes;"function"!=typeof/./&&"object"!=typeof Int8Array&&"function"!=typeof L&&(n.isFunction=function(a){return"function"==typeof a||!1}),n.isFinite=function(a){return!n.isSymbol(a)&&isFinite(a)&&!isNaN(parseFloat(a))},n.isNaN=function(a){return isNaN(a)&&n.isNumber(a)},n.isBoolean=function(a){return!0===a||!1===a||"[object Boolean]"===h.call(a)},n.isNull=function(a){return null===a},n.isUndefined=function(a){return void 0===a},n.has=function(a,b){return null!=a&&i.call(a,b)},n.noConflict=function(){return a._=b,this},n.identity=function(a){return a},n.constant=function(a){return function(){return a}},n.noop=function(){},n.property=t,n.propertyOf=function(a){return null==a?function(){}:function(b){return a[b]}},n.matcher=n.matches=function(a){return a=n.extendOwn({},a),function(b){return n.isMatch(b,a)}},n.times=function(a,b,c){var d=Array(Math.max(0,a));b=p(b,c,1);for(var e=0;e<a;e++)d[e]=b(e);return d},n.random=function(a,b){return null==b&&(b=a,a=0),a+Math.floor(Math.random()*(b-a+1))},n.now=Date.now||function(){return(new Date).getTime()};var M={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},N=n.invert(M),O=function(a){var b=function(b){return a[b]},c="(?:"+n.keys(a).join("|")+")",d=RegExp(c),e=RegExp(c,"g");return function(a){return a=null==a?"":""+a,d.test(a)?a.replace(e,b):a}};n.escape=O(M),n.unescape=O(N),n.result=function(a,b,c){var d=null==a?void 0:a[b];return void 0===d&&(d=c),n.isFunction(d)?d.call(a):d};var P=0;n.uniqueId=function(a){var b=++P+"";return a?a+b:b},n.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var Q=/(.)^/,R={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},S=/\\|'|\r|\n|\u2028|\u2029/g,T=function(a){return"\\"+R[a]};n.template=function(a,b,c){!b&&c&&(b=c),b=n.defaults({},b,n.templateSettings);var d=RegExp([(b.escape||Q).source,(b.interpolate||Q).source,(b.evaluate||Q).source].join("|")+"|$","g"),e=0,f="__p+='";a.replace(d,function(b,c,d,g,h){return f+=a.slice(e,h).replace(S,T),e=h+b.length,c?f+="'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'":d?f+="'+\n((__t=("+d+"))==null?'':__t)+\n'":g&&(f+="';\n"+g+"\n__p+='"),b}),f+="';\n",b.variable||(f="with(obj||{}){\n"+f+"}\n"),f="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+f+"return __p;\n";var g;try{g=new Function(b.variable||"obj","_",f)}catch(a){throw a.source=f,a}var h=function(a){return g.call(this,a,n)},i=b.variable||"obj";return h.source="function("+i+"){\n"+f+"}",h},n.chain=function(a){var b=n(a);return b._chain=!0,b};var U=function(a,b){return a._chain?n(b).chain():b};n.mixin=function(a){return n.each(n.functions(a),function(b){var c=n[b]=a[b];n.prototype[b]=function(){var a=[this._wrapped];return f.apply(a,arguments),U(this,c.apply(n,a))}}),n},n.mixin(n),n.each(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=c[a];n.prototype[a]=function(){var c=this._wrapped;return b.apply(c,arguments),"shift"!==a&&"splice"!==a||0!==c.length||delete c[0],U(this,c)}}),n.each(["concat","join","slice"],function(a){var b=c[a];n.prototype[a]=function(){return U(this,b.apply(this._wrapped,arguments))}}),n.prototype.value=function(){return this._wrapped},n.prototype.valueOf=n.prototype.toJSON=n.prototype.value,n.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return n})}(),function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b(a.THREE={})}(this,function(a){"use strict";function b(){}function c(a,b){this.x=a||0,this.y=b||0}function d(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}function e(a,b,c,d){this._x=a||0,this._y=b||0,this._z=c||0,this._w=void 0!==d?d:1}function f(a,b,c){this.x=a||0,this.y=b||0,this.z=c||0}function g(){this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}function h(a,b,d,e,f,i,j,k,l,m){Object.defineProperty(this,"id",{value:zd++}),this.uuid=yd.generateUUID(),this.name="",this.image=void 0!==a?a:h.DEFAULT_IMAGE,this.mipmaps=[],this.mapping=void 0!==b?b:h.DEFAULT_MAPPING,this.wrapS=void 0!==d?d:Ec,this.wrapT=void 0!==e?e:Ec,this.magFilter=void 0!==f?f:Jc,this.minFilter=void 0!==i?i:Lc,this.anisotropy=void 0!==l?l:1,this.format=void 0!==j?j:$c,this.type=void 0!==k?k:Mc,this.offset=new c(0,0),this.repeat=new c(1,1),this.center=new c(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new g,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=void 0!==m?m:pd,this.version=0,this.onUpdate=null}function i(a,b,c,d){this.x=a||0,this.y=b||0,this.z=c||0,this.w=void 0!==d?d:1}function j(a,b,c){this.uuid=yd.generateUUID(),this.width=a,this.height=b,this.scissor=new i(0,0,a,b),this.scissorTest=!1,this.viewport=new i(0,0,a,b),c=c||{},void 0===c.minFilter&&(c.minFilter=Jc),this.texture=new h(void 0,void 0,c.wrapS,c.wrapT,c.magFilter,c.minFilter,c.format,c.type,c.anisotropy,c.encoding),this.depthBuffer=void 0===c.depthBuffer||c.depthBuffer,this.stencilBuffer=void 0===c.stencilBuffer||c.stencilBuffer,this.depthTexture=void 0!==c.depthTexture?c.depthTexture:null}function k(a,b,c,d,e,f,g,i,j,k,l,m){h.call(this,null,f,g,i,j,k,d,e,l,m),this.image={data:a,width:b,height:c},this.magFilter=void 0!==j?j:Gc,this.minFilter=void 0!==k?k:Gc,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}function l(a,b,c,d,e,f,g,i,j,k){a=void 0!==a?a:[],b=void 0!==b?b:wc,h.call(this,a,b,c,d,e,f,g,i,j,k),this.flipY=!1}function m(){this.seq=[],this.map={}}function n(a,b,c){var d=a[0];if(d<=0||d>0)return a;var e=b*c,f=Cd[e];if(void 0===f&&(f=new Float32Array(e),Cd[e]=f),0!==b){d.toArray(f,0);for(var g=1,h=0;g!==b;++g)h+=c,a[g].toArray(f,h)}return f}function o(a,b){var c=Dd[b];void 0===c&&(c=new Int32Array(b),Dd[b]=c);for(var d=0;d!==b;++d)c[d]=a.allocTextureUnit();return c}function p(a,b){a.uniform1f(this.addr,b)}function q(a,b){a.uniform1i(this.addr,b)}function r(a,b){void 0===b.x?a.uniform2fv(this.addr,b):a.uniform2f(this.addr,b.x,b.y)}function s(a,b){void 0!==b.x?a.uniform3f(this.addr,b.x,b.y,b.z):void 0!==b.r?a.uniform3f(this.addr,b.r,b.g,b.b):a.uniform3fv(this.addr,b)}function t(a,b){void 0===b.x?a.uniform4fv(this.addr,b):a.uniform4f(this.addr,b.x,b.y,b.z,b.w)}function u(a,b){a.uniformMatrix2fv(this.addr,!1,b.elements||b)}function v(a,b){void 0===b.elements?a.uniformMatrix3fv(this.addr,!1,b):(Fd.set(b.elements),a.uniformMatrix3fv(this.addr,!1,Fd))}function w(a,b){void 0===b.elements?a.uniformMatrix4fv(this.addr,!1,b):(Ed.set(b.elements),a.uniformMatrix4fv(this.addr,!1,Ed))}function x(a,b,c){var d=c.allocTextureUnit();a.uniform1i(this.addr,d),c.setTexture2D(b||Ad,d)}function y(a,b,c){var d=c.allocTextureUnit();a.uniform1i(this.addr,d),c.setTextureCube(b||Bd,d)}function z(a,b){a.uniform2iv(this.addr,b)}function A(a,b){a.uniform3iv(this.addr,b)}function B(a,b){a.uniform4iv(this.addr,b)}function C(a){switch(a){case 5126:return p;case 35664:return r;case 35665:return s;case 35666:return t;case 35674:return u;case 35675:return v;case 35676:return w;case 35678:case 36198:return x;case 35680:return y;case 5124:case 35670:return q;case 35667:case 35671:return z;case 35668:case 35672:return A;case 35669:case 35673:return B}}function D(a,b){a.uniform1fv(this.addr,b)}function E(a,b){a.uniform1iv(this.addr,b)}function F(a,b){a.uniform2fv(this.addr,n(b,this.size,2))}function G(a,b){a.uniform3fv(this.addr,n(b,this.size,3))}function H(a,b){a.uniform4fv(this.addr,n(b,this.size,4))}function I(a,b){a.uniformMatrix2fv(this.addr,!1,n(b,this.size,4))}function J(a,b){a.uniformMatrix3fv(this.addr,!1,n(b,this.size,9))}function K(a,b){a.uniformMatrix4fv(this.addr,!1,n(b,this.size,16))}function L(a,b,c){var d=b.length,e=o(c,d);a.uniform1iv(this.addr,e);for(var f=0;f!==d;++f)c.setTexture2D(b[f]||Ad,e[f])}function M(a,b,c){var d=b.length,e=o(c,d);a.uniform1iv(this.addr,e);for(var f=0;f!==d;++f)c.setTextureCube(b[f]||Bd,e[f])}function N(a){switch(a){case 5126:return D;case 35664:return F;case 35665:return G;case 35666:return H;case 35674:return I;case 35675:return J;case 35676:return K;case 35678:return L;case 35680:return M;case 5124:case 35670:return E;case 35667:case 35671:return z;case 35668:case 35672:return A;case 35669:case 35673:return B}}function O(a,b,c){this.id=a,this.addr=c,this.setValue=C(b.type)}function P(a,b,c){this.id=a,this.addr=c,this.size=b.size,this.setValue=N(b.type)}function Q(a){this.id=a,m.call(this)}function R(a,b){a.seq.push(b),a.map[b.id]=b}function S(a,b,c){var d=a.name,e=d.length;for(Gd.lastIndex=0;;){var f=Gd.exec(d),g=Gd.lastIndex,h=f[1],i="]"===f[2],j=f[3];if(i&&(h|=0),void 0===j||"["===j&&g+2===e){R(c,void 0===j?new O(h,a,b):new P(h,a,b));break}var k=c.map,l=k[h];void 0===l&&(l=new Q(h),R(c,l)),c=l}}function T(a,b,c){m.call(this),this.renderer=c;for(var d=a.getProgramParameter(b,a.ACTIVE_UNIFORMS),e=0;e<d;++e){var f=a.getActiveUniform(b,e),g=f.name;S(f,a.getUniformLocation(b,g),this)}}function U(a,b,c){return void 0===b&&void 0===c?this.set(a):this.setRGB(a,b,c)}function V(a,b){this.min=void 0!==a?a:new c(1/0,1/0),this.max=void 0!==b?b:new c(-1/0,-1/0)}function W(a,b,d,e,g){function h(){var a=new Float32Array([-1,-1,0,0,1,-1,1,0,1,1,1,1,-1,1,0,1]),c=new Uint16Array([0,1,2,0,2,3]);j=b.createBuffer(),k=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,j),b.bufferData(b.ARRAY_BUFFER,a,b.STATIC_DRAW),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,k),b.bufferData(b.ELEMENT_ARRAY_BUFFER,c,b.STATIC_DRAW),p=b.createTexture(),q=b.createTexture(),d.bindTexture(b.TEXTURE_2D,p),b.texImage2D(b.TEXTURE_2D,0,b.RGB,16,16,0,b.RGB,b.UNSIGNED_BYTE,null),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST),d.bindTexture(b.TEXTURE_2D,q),b.texImage2D(b.TEXTURE_2D,0,b.RGBA,16,16,0,b.RGBA,b.UNSIGNED_BYTE,null),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST),l={vertexShader:["uniform lowp int renderType;","uniform vec3 screenPosition;","uniform vec2 scale;","uniform float rotation;","uniform sampler2D occlusionMap;","attribute vec2 position;","attribute vec2 uv;","varying vec2 vUV;","varying float vVisibility;","void main() {","\tvUV = uv;","\tvec2 pos = position;","\tif ( renderType == 2 ) {","\t\tvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );","\t\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );","\t\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );","\t\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );","\t\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );","\t\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );","\t\tvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );","\t\tvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );","\t\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );","\t\tvVisibility =        visibility.r / 9.0;","\t\tvVisibility *= 1.0 - visibility.g / 9.0;","\t\tvVisibility *=       visibility.b / 9.0;","\t\tvVisibility *= 1.0 - visibility.a / 9.0;","\t\tpos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;","\t\tpos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;","\t}","\tgl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );","}"].join("\n"),fragmentShader:["uniform lowp int renderType;","uniform sampler2D map;","uniform float opacity;","uniform vec3 color;","varying vec2 vUV;","varying float vVisibility;","void main() {","\tif ( renderType == 0 ) {","\t\tgl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );","\t} else if ( renderType == 1 ) {","\t\tgl_FragColor = texture2D( map, vUV );","\t} else {","\t\tvec4 texture = texture2D( map, vUV );","\t\ttexture.a *= opacity * vVisibility;","\t\tgl_FragColor = texture;","\t\tgl_FragColor.rgb *= color;","\t}","}"].join("\n")},m=i(l),n={vertex:b.getAttribLocation(m,"position"),uv:b.getAttribLocation(m,"uv")},o={renderType:b.getUniformLocation(m,"renderType"),map:b.getUniformLocation(m,"map"),occlusionMap:b.getUniformLocation(m,"occlusionMap"),opacity:b.getUniformLocation(m,"opacity"),color:b.getUniformLocation(m,"color"),scale:b.getUniformLocation(m,"scale"),rotation:b.getUniformLocation(m,"rotation"),screenPosition:b.getUniformLocation(m,"screenPosition")}}function i(a){var c=b.createProgram(),d=b.createShader(b.FRAGMENT_SHADER),e=b.createShader(b.VERTEX_SHADER),f="precision "+g.precision+" float;\n";return b.shaderSource(d,f+a.fragmentShader),b.shaderSource(e,f+a.vertexShader),b.compileShader(d),b.compileShader(e),b.attachShader(c,d),b.attachShader(c,e),b.linkProgram(c),c}var j,k,l,m,n,o,p,q;this.render=function(a,g,i,l){if(0!==a.length){var r=new f,s=l.w/l.z,t=.5*l.z,u=.5*l.w,v=16/l.w,w=new c(v*s,v),x=new f(1,1,0),y=new c(1,1),z=new V;z.min.set(l.x,l.y),z.max.set(l.x+(l.z-16),l.y+(l.w-16)),void 0===m&&h(),d.useProgram(m),d.initAttributes(),d.enableAttribute(n.vertex),d.enableAttribute(n.uv),d.disableUnusedAttributes(),b.uniform1i(o.occlusionMap,0),b.uniform1i(o.map,1),b.bindBuffer(b.ARRAY_BUFFER,j),b.vertexAttribPointer(n.vertex,2,b.FLOAT,!1,16,0),b.vertexAttribPointer(n.uv,2,b.FLOAT,!1,16,8),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,k),d.disable(b.CULL_FACE),d.buffers.depth.setMask(!1);for(var A=0,B=a.length;A<B;A++){v=16/l.w,w.set(v*s,v);var C=a[A];if(r.set(C.matrixWorld.elements[12],C.matrixWorld.elements[13],C.matrixWorld.elements[14]),r.applyMatrix4(i.matrixWorldInverse),r.applyMatrix4(i.projectionMatrix),x.copy(r),y.x=l.x+x.x*t+t-8,y.y=l.y+x.y*u+u-8,!0===z.containsPoint(y)){d.activeTexture(b.TEXTURE0),d.bindTexture(b.TEXTURE_2D,null),d.activeTexture(b.TEXTURE1),d.bindTexture(b.TEXTURE_2D,p),b.copyTexImage2D(b.TEXTURE_2D,0,b.RGB,y.x,y.y,16,16,0),b.uniform1i(o.renderType,0),b.uniform2f(o.scale,w.x,w.y),b.uniform3f(o.screenPosition,x.x,x.y,x.z),d.disable(b.BLEND),d.enable(b.DEPTH_TEST),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0),d.activeTexture(b.TEXTURE0),d.bindTexture(b.TEXTURE_2D,q),b.copyTexImage2D(b.TEXTURE_2D,0,b.RGBA,y.x,y.y,16,16,0),b.uniform1i(o.renderType,1),d.disable(b.DEPTH_TEST),d.activeTexture(b.TEXTURE1),d.bindTexture(b.TEXTURE_2D,p),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0),C.positionScreen.copy(x),C.customUpdateCallback?C.customUpdateCallback(C):C.updateLensFlares(),b.uniform1i(o.renderType,2),d.enable(b.BLEND);for(var D=0,E=C.lensFlares.length;D<E;D++){var F=C.lensFlares[D];F.opacity>.001&&F.scale>.001&&(x.x=F.x,x.y=F.y,x.z=F.z,v=F.size*F.scale/l.w,w.x=v*s,w.y=v,b.uniform3f(o.screenPosition,x.x,x.y,x.z),b.uniform2f(o.scale,w.x,w.y),b.uniform1f(o.rotation,F.rotation),b.uniform1f(o.opacity,F.opacity),b.uniform3f(o.color,F.color.r,F.color.g,F.color.b),d.setBlending(F.blending,F.blendEquation,F.blendSrc,F.blendDst),e.setTexture2D(F.texture,1),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0))}}}d.enable(b.CULL_FACE),d.enable(b.DEPTH_TEST),d.buffers.depth.setMask(!0),d.reset()}}}function X(a,b,c,d,e,f,g,i,j){h.call(this,a,b,c,d,e,f,g,i,j),this.needsUpdate=!0}function Y(a,b,c,d,g){function h(){var a=new Float32Array([-.5,-.5,0,0,.5,-.5,1,0,.5,.5,1,1,-.5,.5,0,1]),c=new Uint16Array([0,1,2,0,2,3]);k=b.createBuffer(),l=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,k),b.bufferData(b.ARRAY_BUFFER,a,b.STATIC_DRAW),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,l),b.bufferData(b.ELEMENT_ARRAY_BUFFER,c,b.STATIC_DRAW),m=i(),n={position:b.getAttribLocation(m,"position"),uv:b.getAttribLocation(m,"uv")},o={uvOffset:b.getUniformLocation(m,"uvOffset"),uvScale:b.getUniformLocation(m,"uvScale"),rotation:b.getUniformLocation(m,"rotation"),scale:b.getUniformLocation(m,"scale"),color:b.getUniformLocation(m,"color"),map:b.getUniformLocation(m,"map"),opacity:b.getUniformLocation(m,"opacity"),modelViewMatrix:b.getUniformLocation(m,"modelViewMatrix"),projectionMatrix:b.getUniformLocation(m,"projectionMatrix"),fogType:b.getUniformLocation(m,"fogType"),fogDensity:b.getUniformLocation(m,"fogDensity"),fogNear:b.getUniformLocation(m,"fogNear"),fogFar:b.getUniformLocation(m,"fogFar"),fogColor:b.getUniformLocation(m,"fogColor"),fogDepth:b.getUniformLocation(m,"fogDepth"),alphaTest:b.getUniformLocation(m,"alphaTest")};var d=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");d.width=8,d.height=8;var e=d.getContext("2d");e.fillStyle="white",e.fillRect(0,0,8,8),p=new X(d)}function i(){var a=b.createProgram(),c=b.createShader(b.VERTEX_SHADER),d=b.createShader(b.FRAGMENT_SHADER);return b.shaderSource(c,["precision "+g.precision+" float;","#define SHADER_NAME SpriteMaterial","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform float rotation;","uniform vec2 scale;","uniform vec2 uvOffset;","uniform vec2 uvScale;","attribute vec2 position;","attribute vec2 uv;","varying vec2 vUV;","varying float fogDepth;","void main() {","\tvUV = uvOffset + uv * uvScale;","\tvec2 alignedPosition = position * scale;","\tvec2 rotatedPosition;","\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;","\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;","\tvec4 mvPosition;","\tmvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );","\tmvPosition.xy += rotatedPosition;","\tgl_Position = projectionMatrix * mvPosition;","\tfogDepth = - mvPosition.z;","}"].join("\n")),b.shaderSource(d,["precision "+g.precision+" float;","#define SHADER_NAME SpriteMaterial","uniform vec3 color;","uniform sampler2D map;","uniform float opacity;","uniform int fogType;","uniform vec3 fogColor;","uniform float fogDensity;","uniform float fogNear;","uniform float fogFar;","uniform float alphaTest;","varying vec2 vUV;","varying float fogDepth;","void main() {","\tvec4 texture = texture2D( map, vUV );","\tgl_FragColor = vec4( color * texture.xyz, texture.a * opacity );","\tif ( gl_FragColor.a < alphaTest ) discard;","\tif ( fogType > 0 ) {","\t\tfloat fogFactor = 0.0;","\t\tif ( fogType == 1 ) {","\t\t\tfogFactor = smoothstep( fogNear, fogFar, fogDepth );","\t\t} else {","\t\t\tconst float LOG2 = 1.442695;","\t\t\tfogFactor = exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 );","\t\t\tfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );","\t\t}","\t\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );","\t}","}"].join("\n")),b.compileShader(c),b.compileShader(d),b.attachShader(a,c),b.attachShader(a,d),b.linkProgram(a),a}function j(a,b){return a.renderOrder!==b.renderOrder?a.renderOrder-b.renderOrder:a.z!==b.z?b.z-a.z:b.id-a.id}var k,l,m,n,o,p,q=new f,r=new e,s=new f;this.render=function(e,f,g){if(0!==e.length){void 0===m&&h(),c.useProgram(m),c.initAttributes(),c.enableAttribute(n.position),c.enableAttribute(n.uv),c.disableUnusedAttributes(),c.disable(b.CULL_FACE),c.enable(b.BLEND),b.bindBuffer(b.ARRAY_BUFFER,k),b.vertexAttribPointer(n.position,2,b.FLOAT,!1,16,0),b.vertexAttribPointer(n.uv,2,b.FLOAT,!1,16,8),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,l),b.uniformMatrix4fv(o.projectionMatrix,!1,g.projectionMatrix.elements),c.activeTexture(b.TEXTURE0),b.uniform1i(o.map,0);var i=0,t=0,u=f.fog;u?(b.uniform3f(o.fogColor,u.color.r,u.color.g,u.color.b),u.isFog?(b.uniform1f(o.fogNear,u.near),b.uniform1f(o.fogFar,u.far),b.uniform1i(o.fogType,1),i=1,t=1):u.isFogExp2&&(b.uniform1f(o.fogDensity,u.density),b.uniform1i(o.fogType,2),i=2,t=2)):(b.uniform1i(o.fogType,0),i=0,t=0);for(var v=0,w=e.length;v<w;v++){var x=e[v];x.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,x.matrixWorld),x.z=-x.modelViewMatrix.elements[14]}e.sort(j);for(var y=[],v=0,w=e.length;v<w;v++){var x=e[v],z=x.material;if(!1!==z.visible){x.onBeforeRender(a,f,g,void 0,z,void 0),b.uniform1f(o.alphaTest,z.alphaTest),b.uniformMatrix4fv(o.modelViewMatrix,!1,x.modelViewMatrix.elements),x.matrixWorld.decompose(q,r,s),y[0]=s.x,y[1]=s.y;var A=0;f.fog&&z.fog&&(A=t),i!==A&&(b.uniform1i(o.fogType,A),i=A),null!==z.map?(b.uniform2f(o.uvOffset,z.map.offset.x,z.map.offset.y),b.uniform2f(o.uvScale,z.map.repeat.x,z.map.repeat.y)):(b.uniform2f(o.uvOffset,0,0),b.uniform2f(o.uvScale,1,1)),b.uniform1f(o.opacity,z.opacity),b.uniform3f(o.color,z.color.r,z.color.g,z.color.b),b.uniform1f(o.rotation,z.rotation),b.uniform2fv(o.scale,y),c.setBlending(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.premultipliedAlpha),c.buffers.depth.setTest(z.depthTest),c.buffers.depth.setMask(z.depthWrite),c.buffers.color.setMask(z.colorWrite),d.setTexture2D(z.map||p,0),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0),x.onAfterRender(a,f,g,void 0,z,void 0)}}c.enable(b.CULL_FACE),c.reset()}}}function Z(){Object.defineProperty(this,"id",{value:Of++}),this.uuid=yd.generateUUID(),this.name="",this.type="Material",this.fog=!0,this.lights=!0,this.blending=Mb,this.side=Gb,this.flatShading=!1,this.vertexColors=Kb,this.opacity=1,this.transparent=!1,this.blendSrc=$b,this.blendDst=_b,this.blendEquation=Rb,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=ic,this.depthTest=!0,this.depthWrite=!0,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.premultipliedAlpha=!1,this.overdraw=0,this.visible=!0,this.userData={},this.needsUpdate=!0}function $(a){Z.call(this),this.type="MeshDepthMaterial",this.depthPacking=wd,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.setValues(a)}function _(a){Z.call(this),this.type="MeshDistanceMaterial",this.referencePosition=new f,this.nearDistance=1,this.farDistance=1e3,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.lights=!1,this.setValues(a)}function aa(a,b){this.min=void 0!==a?a:new f(1/0,1/0,1/0),this.max=void 0!==b?b:new f(-1/0,-1/0,-1/0)}function ba(a,b){this.center=void 0!==a?a:new f,this.radius=void 0!==b?b:0}function ca(a,b){this.normal=void 0!==a?a:new f(1,0,0),this.constant=void 0!==b?b:0}function da(a,b,c,d,e,f){this.planes=[void 0!==a?a:new ca,void 0!==b?b:new ca,void 0!==c?c:new ca,void 0!==d?d:new ca,void 0!==e?e:new ca,void 0!==f?f:new ca]}function ea(a,b,e){function g(b,c,d,e,f,g){var h=b.geometry,i=null,j=t,k=b.customDepthMaterial;if(d&&(j=u,k=b.customDistanceMaterial),k)i=k;else{var l=!1;c.morphTargets&&(h&&h.isBufferGeometry?l=h.morphAttributes&&h.morphAttributes.position&&h.morphAttributes.position.length>0:h&&h.isGeometry&&(l=h.morphTargets&&h.morphTargets.length>0)),b.isSkinnedMesh&&!1===c.skinning&&console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",b);var m=b.isSkinnedMesh&&c.skinning,n=0;l&&(n|=q),m&&(n|=r),i=j[n]}if(a.localClippingEnabled&&!0===c.clipShadows&&0!==c.clippingPlanes.length){var o=i.uuid,p=c.uuid,s=v[o];void 0===s&&(s={},v[o]=s);var w=s[p];void 0===w&&(w=i.clone(),s[p]=w),i=w}i.visible=c.visible,i.wireframe=c.wireframe;var x=c.side;return E.renderSingleSided&&x==Ib&&(x=Gb),E.renderReverseSided&&(x===Gb?x=Hb:x===Hb&&(x=Gb)),i.side=x,i.clipShadows=c.clipShadows,i.clippingPlanes=c.clippingPlanes,i.clipIntersection=c.clipIntersection,i.wireframeLinewidth=c.wireframeLinewidth,i.linewidth=c.linewidth,d&&i.isMeshDistanceMaterial&&(i.referencePosition.copy(e),i.nearDistance=f,i.farDistance=g),i}function h(c,d,e,f){if(!1!==c.visible){if(c.layers.test(d.layers)&&(c.isMesh||c.isLine||c.isPoints)&&c.castShadow&&(!c.frustumCulled||k.intersectsObject(c))){c.modelViewMatrix.multiplyMatrices(e.matrixWorldInverse,c.matrixWorld);var i=b.update(c),j=c.material;if(Array.isArray(j))for(var l=i.groups,m=0,n=l.length;m<n;m++){var o=l[m],q=j[o.materialIndex];if(q&&q.visible){var r=g(c,q,f,p,e.near,e.far);a.renderBufferDirect(e,null,i,r,c,o)}}else if(j.visible){var r=g(c,j,f,p,e.near,e.far);a.renderBufferDirect(e,null,i,r,c,null)}}for(var s=c.children,t=0,u=s.length;t<u;t++)h(s[t],d,e,f)}}for(var k=new da,l=new d,m=new c,n=new c(e,e),o=new f,p=new f,q=1,r=2,s=1+(q|r),t=new Array(s),u=new Array(s),v={},w=[new f(1,0,0),new f(-1,0,0),new f(0,0,1),new f(0,0,-1),new f(0,1,0),new f(0,-1,0)],x=[new f(0,1,0),new f(0,1,0),new f(0,1,0),new f(0,1,0),new f(0,0,1),new f(0,0,-1)],y=[new i,new i,new i,new i,new i,new i],z=0;z!==s;++z){var A=0!=(z&q),B=0!=(z&r),C=new $({depthPacking:xd,morphTargets:A,skinning:B});t[z]=C;var D=new _({morphTargets:A,skinning:B});u[z]=D}var E=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Eb,this.renderReverseSided=!0,this.renderSingleSided=!0,this.render=function(b,c,d){if(!1!==E.enabled&&(!1!==E.autoUpdate||!1!==E.needsUpdate)&&0!==b.length){var e=a.context,f=a.state;f.disable(e.BLEND),f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);for(var g,i=0,q=b.length;i<q;i++){var r=b[i],s=r.shadow,t=r&&r.isPointLight;if(void 0!==s){var u=s.camera;if(m.copy(s.mapSize),m.min(n),t){var v=m.x,z=m.y;y[0].set(2*v,z,v,z),y[1].set(0,z,v,z),y[2].set(3*v,z,v,z),y[3].set(v,z,v,z),y[4].set(3*v,0,v,z),y[5].set(v,0,v,z),m.x*=4,m.y*=2}if(null===s.map){var A={minFilter:Gc,magFilter:Gc,format:$c};s.map=new j(m.x,m.y,A),s.map.texture.name=r.name+".shadowMap",u.updateProjectionMatrix()}s.isSpotLightShadow&&s.update(r);var B=s.map,C=s.matrix;p.setFromMatrixPosition(r.matrixWorld),u.position.copy(p),t?(g=6,C.makeTranslation(-p.x,-p.y,-p.z)):(g=1,o.setFromMatrixPosition(r.target.matrixWorld),u.lookAt(o),u.updateMatrixWorld(),C.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),C.multiply(u.projectionMatrix),C.multiply(u.matrixWorldInverse)),a.setRenderTarget(B),a.clear();for(var D=0;D<g;D++){if(t){o.copy(u.position),o.add(w[D]),u.up.copy(x[D]),u.lookAt(o),u.updateMatrixWorld();var F=y[D];f.viewport(F)}l.multiplyMatrices(u.projectionMatrix,u.matrixWorldInverse),k.setFromMatrix(l),h(c,d,u,t)}}else console.warn("THREE.WebGLShadowMap:",r,"has no shadow.")}E.needsUpdate=!1}}}function fa(a){function b(b,c){var d=b.array,e=b.dynamic?a.DYNAMIC_DRAW:a.STATIC_DRAW,f=a.createBuffer();a.bindBuffer(c,f),a.bufferData(c,d,e),b.onUploadCallback();var g=a.FLOAT;return d instanceof Float32Array?g=a.FLOAT:d instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):d instanceof Uint16Array?g=a.UNSIGNED_SHORT:d instanceof Int16Array?g=a.SHORT:d instanceof Uint32Array?g=a.UNSIGNED_INT:d instanceof Int32Array?g=a.INT:d instanceof Int8Array?g=a.BYTE:d instanceof Uint8Array&&(g=a.UNSIGNED_BYTE),{buffer:f,type:g,bytesPerElement:d.BYTES_PER_ELEMENT,version:b.version}}function c(b,c,d){var e=c.array,f=c.updateRange;a.bindBuffer(d,b),!1===c.dynamic?a.bufferData(d,e,a.STATIC_DRAW):-1===f.count?a.bufferSubData(d,0,e):0===f.count?console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually."):(a.bufferSubData(d,f.offset*e.BYTES_PER_ELEMENT,e.subarray(f.offset,f.offset+f.count)),f.count=-1)}function d(a){return a.isInterleavedBufferAttribute&&(a=a.data),g[a.uuid]}function e(b){b.isInterleavedBufferAttribute&&(b=b.data);var c=g[b.uuid];c&&(a.deleteBuffer(c.buffer),delete g[b.uuid])}function f(a,d){a.isInterleavedBufferAttribute&&(a=a.data);var e=g[a.uuid];void 0===e?g[a.uuid]=b(a,d):e.version<a.version&&(c(e.buffer,a,d),e.version=a.version)}var g={};return{get:d,remove:e,update:f}}function ga(a,b,c,d){this._x=a||0,this._y=b||0,this._z=c||0,this._order=d||ga.DefaultOrder}function ha(){this.mask=1}function ia(){function a(){i.setFromEuler(h,!1)}function b(){h.setFromQuaternion(i,void 0,!1)}Object.defineProperty(this,"id",{value:Pf++}),this.uuid=yd.generateUUID(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ia.DefaultUp.clone();var c=new f,h=new ga,i=new e,j=new f(1,1,1);h.onChange(a),i.onChange(b),Object.defineProperties(this,{position:{enumerable:!0,value:c},rotation:{enumerable:!0,value:h},quaternion:{enumerable:!0,value:i},scale:{enumerable:!0,value:j},modelViewMatrix:{value:new d},normalMatrix:{value:new g}}),this.matrix=new d,this.matrixWorld=new d,this.matrixAutoUpdate=ia.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new ha,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}function ja(){ia.call(this),this.type="Camera",this.matrixWorldInverse=new d,this.projectionMatrix=new d}function ka(a,b,c,d,e,f){ja.call(this),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=a,this.right=b,this.top=c,this.bottom=d,this.near=void 0!==e?e:.1,this.far=void 0!==f?f:2e3,this.updateProjectionMatrix()}function la(a,b,c,d,e,g){this.a=a,this.b=b,this.c=c,this.normal=d&&d.isVector3?d:new f,this.vertexNormals=Array.isArray(d)?d:[],this.color=e&&e.isColor?e:new U,this.vertexColors=Array.isArray(e)?e:[],this.materialIndex=void 0!==g?g:0}function ma(){Object.defineProperty(this,"id",{value:Qf+=2}),this.uuid=yd.generateUUID(),this.name="",this.type="Geometry",this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.elementsNeedUpdate=!1,this.verticesNeedUpdate=!1,this.uvsNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.lineDistancesNeedUpdate=!1,this.groupsNeedUpdate=!1}function na(a,b,c){if(Array.isArray(a))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.uuid=yd.generateUUID(),this.name="",this.array=a,this.itemSize=b,this.count=void 0!==a?a.length/b:0,this.normalized=!0===c,this.dynamic=!1,this.updateRange={offset:0,count:-1},this.onUploadCallback=function(){},this.version=0}function oa(a,b,c){na.call(this,new Int8Array(a),b,c)}function pa(a,b,c){na.call(this,new Uint8Array(a),b,c)}function qa(a,b,c){na.call(this,new Uint8ClampedArray(a),b,c)}function ra(a,b,c){na.call(this,new Int16Array(a),b,c)}function sa(a,b,c){na.call(this,new Uint16Array(a),b,c)}function ta(a,b,c){na.call(this,new Int32Array(a),b,c)}function ua(a,b,c){na.call(this,new Uint32Array(a),b,c)}function va(a,b,c){na.call(this,new Float32Array(a),b,c)}function wa(a,b,c){na.call(this,new Float64Array(a),b,c)}function xa(){this.indices=[],this.vertices=[],this.normals=[],this.colors=[],this.uvs=[],this.uvs2=[],this.groups=[],this.morphTargets={},this.skinWeights=[],this.skinIndices=[],this.boundingBox=null,this.boundingSphere=null,this.verticesNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.uvsNeedUpdate=!1,this.groupsNeedUpdate=!1}function ya(a){if(0===a.length)return-1/0;for(var b=a[0],c=1,d=a.length;c<d;++c)a[c]>b&&(b=a[c]);return b}function za(){Object.defineProperty(this,"id",{value:Rf+=2}),this.uuid=yd.generateUUID(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0}}function Aa(a,b,c,d,e,f){ma.call(this),this.type="BoxGeometry",this.parameters={width:a,height:b,depth:c,widthSegments:d,heightSegments:e,depthSegments:f},this.fromBufferGeometry(new Ba(a,b,c,d,e,f)),this.mergeVertices()}function Ba(a,b,c,d,e,g){function h(a,b,c,d,e,g,h,p,q,r,s){var t,u,v=g/q,w=h/r,x=g/2,y=h/2,z=p/2,A=q+1,B=r+1,C=0,D=0,E=new f;for(u=0;u<B;u++){var F=u*w-y;for(t=0;t<A;t++){var G=t*v-x;E[a]=G*d,E[b]=F*e,E[c]=z,k.push(E.x,E.y,E.z),E[a]=0,E[b]=0,E[c]=p>0?1:-1,l.push(E.x,E.y,E.z),m.push(t/q),m.push(1-u/r),C+=1}}for(u=0;u<r;u++)for(t=0;t<q;t++){var H=n+t+A*u,I=n+t+A*(u+1),J=n+(t+1)+A*(u+1),K=n+(t+1)+A*u;j.push(H,I,K),j.push(I,J,K),D+=6}i.addGroup(o,D,s),o+=D,n+=C}za.call(this),this.type="BoxBufferGeometry",this.parameters={width:a,height:b,depth:c,widthSegments:d,heightSegments:e,depthSegments:g};var i=this;a=a||1,b=b||1,c=c||1,d=Math.floor(d)||1,e=Math.floor(e)||1,g=Math.floor(g)||1;var j=[],k=[],l=[],m=[],n=0,o=0;h("z","y","x",-1,-1,c,b,a,g,e,0),h("z","y","x",1,-1,c,b,-a,g,e,1),h("x","z","y",1,1,a,c,b,d,g,2),h("x","z","y",1,-1,a,c,-b,d,g,3),h("x","y","z",1,-1,a,b,c,d,e,4),h("x","y","z",-1,-1,a,b,-c,d,e,5),this.setIndex(j),this.addAttribute("position",new va(k,3)),this.addAttribute("normal",new va(l,3)),this.addAttribute("uv",new va(m,2))}function Ca(a,b,c,d){ma.call(this),this.type="PlaneGeometry",this.parameters={width:a,height:b,widthSegments:c,heightSegments:d},this.fromBufferGeometry(new Da(a,b,c,d)),this.mergeVertices()}function Da(a,b,c,d){za.call(this),this.type="PlaneBufferGeometry",this.parameters={width:a,height:b,widthSegments:c,heightSegments:d},a=a||1,b=b||1;var e,f,g=a/2,h=b/2,i=Math.floor(c)||1,j=Math.floor(d)||1,k=i+1,l=j+1,m=a/i,n=b/j,o=[],p=[],q=[],r=[];for(f=0;f<l;f++){var s=f*n-h;for(e=0;e<k;e++){var t=e*m-g;p.push(t,-s,0),q.push(0,0,1),r.push(e/i),r.push(1-f/j)}}for(f=0;f<j;f++)for(e=0;e<i;e++){var u=e+k*f,v=e+k*(f+1),w=e+1+k*(f+1),x=e+1+k*f;o.push(u,v,x),o.push(v,w,x)}this.setIndex(o),this.addAttribute("position",new va(p,3)),this.addAttribute("normal",new va(q,3)),this.addAttribute("uv",new va(r,2))}function Ea(a){Z.call(this),this.type="MeshBasicMaterial",this.color=new U(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=nc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.lights=!1,this.setValues(a)}function Fa(a){Z.call(this),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader="void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",this.fragmentShader="void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,void 0!==a&&(void 0!==a.attributes&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(a))}function Ga(a,b){this.origin=void 0!==a?a:new f,this.direction=void 0!==b?b:new f}function Ha(a,b){this.start=void 0!==a?a:new f,this.end=void 0!==b?b:new f}function Ia(a,b,c){this.a=void 0!==a?a:new f,this.b=void 0!==b?b:new f,this.c=void 0!==c?c:new f}function Ja(a,b){ia.call(this),this.type="Mesh",this.geometry=void 0!==a?a:new za,this.material=void 0!==b?b:new Ea({color:16777215*Math.random()}),this.drawMode=md,this.updateMorphTargets()}function Ka(a,b,c,d){function e(b,d,e,l){var m=d.background;null===m?f(j,k):m&&m.isColor&&(f(m,1),l=!0),(a.autoClear||l)&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),m&&m.isCubeTexture?(void 0===i&&(i=new Ja(new Ba(1,1,1),new Fa({uniforms:Nf.cube.uniforms,vertexShader:Nf.cube.vertexShader,fragmentShader:Nf.cube.fragmentShader,side:Hb,depthTest:!0,depthWrite:!1,fog:!1})),i.geometry.removeAttribute("normal"),i.geometry.removeAttribute("uv"),i.onBeforeRender=function(a,b,c){this.matrixWorld.copyPosition(c.matrixWorld)},c.update(i.geometry)),i.material.uniforms.tCube.value=m,b.push(i,i.geometry,i.material,0,null)):m&&m.isTexture&&(void 0===g&&(g=new ka(-1,1,1,-1,0,1),h=new Ja(new Da(2,2),new Ea({depthTest:!1,depthWrite:!1,fog:!1})),c.update(h.geometry)),h.material.map=m,a.renderBufferDirect(g,null,h.geometry,h.material,h,null))}function f(a,c){b.buffers.color.setClear(a.r,a.g,a.b,c,d)}var g,h,i,j=new U(0),k=0;return{getClearColor:function(){return j},setClearColor:function(a,b){j.set(a),k=void 0!==b?b:1,f(j,k)},getClearAlpha:function(){return k},setClearAlpha:function(a){k=a,f(j,k)},render:e}}function La(a,b){return a.renderOrder!==b.renderOrder?a.renderOrder-b.renderOrder:a.program&&b.program&&a.program!==b.program?a.program.id-b.program.id:a.material.id!==b.material.id?a.material.id-b.material.id:a.z!==b.z?a.z-b.z:a.id-b.id}function Ma(a,b){return a.renderOrder!==b.renderOrder?a.renderOrder-b.renderOrder:a.z!==b.z?b.z-a.z:a.id-b.id}function Na(){function a(){e=0,f.length=0,g.length=0}function b(a,b,c,h,i){var j=d[e];void 0===j?(j={id:a.id,object:a,geometry:b,material:c,program:c.program,renderOrder:a.renderOrder,z:h,group:i},d[e]=j):(j.id=a.id,j.object=a,j.geometry=b,j.material=c,j.program=c.program,j.renderOrder=a.renderOrder,j.z=h,j.group=i),(!0===c.transparent?g:f).push(j),e++}function c(){f.length>1&&f.sort(La),g.length>1&&g.sort(Ma)}var d=[],e=0,f=[],g=[];return{opaque:f,transparent:g,init:a,push:b,sort:c}}function Oa(){function a(a,b){var d=a.id+","+b.id,e=c[d];return void 0===e&&(e=new Na,c[d]=e),e}function b(){c={}}var c={};return{get:a,dispose:b}}function Pa(a,b){return Math.abs(b[1])-Math.abs(a[1])}function Qa(a){function b(b,e,f,g){var h=b.morphTargetInfluences,i=h.length,j=c[e.id];if(void 0===j){j=[];for(var k=0;k<i;k++)j[k]=[k,0];c[e.id]=j}for(var l=f.morphTargets&&e.morphAttributes.position,m=f.morphNormals&&e.morphAttributes.normal,k=0;k<i;k++){var n=j[k];0!==n[1]&&(l&&e.removeAttribute("morphTarget"+k),m&&e.removeAttribute("morphNormal"+k))}for(var k=0;k<i;k++){var n=j[k];n[0]=k,n[1]=h[k]}j.sort(Pa);for(var k=0;k<8;k++){var n=j[k];if(n){var o=n[0],p=n[1];if(p){l&&e.addAttribute("morphTarget"+k,l[o]),m&&e.addAttribute("morphNormal"+k,m[o]),d[k]=p;continue}}d[k]=0}g.getUniforms().setValue(a,"morphTargetInfluences",d)}var c={},d=new Float32Array(8);return{update:b}}function Ra(a,b,c){function d(a){h=a}function e(a){i=a.type,j=a.bytesPerElement}function f(b,d){a.drawElements(h,d,i,b*j),c.calls++,c.vertices+=d,h===a.TRIANGLES?c.faces+=d/3:h===a.POINTS&&(c.points+=d)}function g(d,e,f){var g=b.get("ANGLE_instanced_arrays");if(null===g)return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");g.drawElementsInstancedANGLE(h,f,i,e*j,d.maxInstancedCount),c.calls++,c.vertices+=f*d.maxInstancedCount,h===a.TRIANGLES?c.faces+=d.maxInstancedCount*f/3:h===a.POINTS&&(c.points+=d.maxInstancedCount*f)}var h,i,j;this.setMode=d,this.setIndex=e,this.render=f,this.renderInstances=g}function Sa(a,b,c){function d(a){g=a}function e(b,d){a.drawArrays(g,b,d),c.calls++,c.vertices+=d,g===a.TRIANGLES?c.faces+=d/3:g===a.POINTS&&(c.points+=d)}function f(d,e,f){var h=b.get("ANGLE_instanced_arrays");if(null===h)return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");var i=d.attributes.position;i.isInterleavedBufferAttribute?(f=i.data.count,h.drawArraysInstancedANGLE(g,0,f,d.maxInstancedCount)):h.drawArraysInstancedANGLE(g,e,f,d.maxInstancedCount),c.calls++,c.vertices+=f*d.maxInstancedCount,g===a.TRIANGLES?c.faces+=d.maxInstancedCount*f/3:g===a.POINTS&&(c.points+=d.maxInstancedCount*f)}var g;this.setMode=d,this.render=e,this.renderInstances=f}function Ta(a,b,c){function d(a){var e=a.target,f=h[e.id];null!==f.index&&b.remove(f.index);for(var g in f.attributes)b.remove(f.attributes[g]);e.removeEventListener("dispose",d),delete h[e.id];var j=i[e.id];j&&(b.remove(j),delete i[e.id]),j=i[f.id],j&&(b.remove(j),delete i[f.id]),c.geometries--}function e(a,b){var e=h[b.id];return e||(b.addEventListener("dispose",d),b.isBufferGeometry?e=b:b.isGeometry&&(void 0===b._bufferGeometry&&(b._bufferGeometry=(new za).setFromObject(a)),e=b._bufferGeometry),h[b.id]=e,c.geometries++,e)}function f(c){var d=c.index,e=c.attributes;null!==d&&b.update(d,a.ELEMENT_ARRAY_BUFFER);for(var f in e)b.update(e[f],a.ARRAY_BUFFER);var g=c.morphAttributes;for(var f in g)for(var h=g[f],i=0,j=h.length;i<j;i++)b.update(h[i],a.ARRAY_BUFFER)}function g(c){var d=i[c.id];if(d)return d;var e=[],f=c.index,g=c.attributes;if(null!==f)for(var h=f.array,j=0,k=h.length;j<k;j+=3){var l=h[j+0],m=h[j+1],n=h[j+2];e.push(l,m,m,n,n,l)}else for(var h=g.position.array,j=0,k=h.length/3-1;j<k;j+=3){var l=j+0,m=j+1,n=j+2;e.push(l,m,m,n,n,l)}return d=new(ya(e)>65535?ua:sa)(e,1),b.update(d,a.ELEMENT_ARRAY_BUFFER),i[c.id]=d,d}var h={},i={};return{get:e,update:f,getWireframeAttribute:g}}function Ua(){var a={};return{get:function(b){if(void 0!==a[b.id])return a[b.id];var d;switch(b.type){case"DirectionalLight":d={direction:new f,color:new U,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new c};break;case"SpotLight":d={position:new f,direction:new f,color:new U,distance:0,coneCos:0,penumbraCos:0,decay:0,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new c};break;case"PointLight":d={position:new f,color:new U,distance:0,decay:0,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new c,shadowCameraNear:1,shadowCameraFar:1e3};break;case"HemisphereLight":d={direction:new f,skyColor:new U,groundColor:new U};break;case"RectAreaLight":d={color:new U,position:new f,halfWidth:new f,halfHeight:new f}}return a[b.id]=d,d}}}function Va(){function a(a,d,f){for(var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=f.matrixWorldInverse,r=0,s=a.length;r<s;r++){var t=a[r],u=t.color,v=t.intensity,w=t.distance,x=t.shadow&&t.shadow.map?t.shadow.map.texture:null;if(t.isAmbientLight)i+=u.r*v,j+=u.g*v,k+=u.b*v;else if(t.isDirectionalLight){var y=b.get(t);if(y.color.copy(t.color).multiplyScalar(t.intensity),y.direction.setFromMatrixPosition(t.matrixWorld),e.setFromMatrixPosition(t.target.matrixWorld),y.direction.sub(e),y.direction.transformDirection(q),y.shadow=t.castShadow,t.castShadow){var z=t.shadow;y.shadowBias=z.bias,y.shadowRadius=z.radius,y.shadowMapSize=z.mapSize}c.directionalShadowMap[l]=x,c.directionalShadowMatrix[l]=t.shadow.matrix,c.directional[l]=y,l++}else if(t.isSpotLight){var y=b.get(t);if(y.position.setFromMatrixPosition(t.matrixWorld),y.position.applyMatrix4(q),y.color.copy(u).multiplyScalar(v),y.distance=w,y.direction.setFromMatrixPosition(t.matrixWorld),e.setFromMatrixPosition(t.target.matrixWorld),y.direction.sub(e),y.direction.transformDirection(q),y.coneCos=Math.cos(t.angle),y.penumbraCos=Math.cos(t.angle*(1-t.penumbra)),y.decay=0===t.distance?0:t.decay,y.shadow=t.castShadow,t.castShadow){var z=t.shadow;y.shadowBias=z.bias,y.shadowRadius=z.radius,y.shadowMapSize=z.mapSize}c.spotShadowMap[n]=x,c.spotShadowMatrix[n]=t.shadow.matrix,c.spot[n]=y,n++}else if(t.isRectAreaLight){var y=b.get(t);y.color.copy(u).multiplyScalar(v/(t.width*t.height)),y.position.setFromMatrixPosition(t.matrixWorld),y.position.applyMatrix4(q),h.identity(),g.copy(t.matrixWorld),g.premultiply(q),h.extractRotation(g),y.halfWidth.set(.5*t.width,0,0),y.halfHeight.set(0,.5*t.height,0),y.halfWidth.applyMatrix4(h),y.halfHeight.applyMatrix4(h),c.rectArea[o]=y,o++}else if(t.isPointLight){var y=b.get(t);if(y.position.setFromMatrixPosition(t.matrixWorld),y.position.applyMatrix4(q),y.color.copy(t.color).multiplyScalar(t.intensity),y.distance=t.distance,y.decay=0===t.distance?0:t.decay,y.shadow=t.castShadow,t.castShadow){var z=t.shadow;y.shadowBias=z.bias,y.shadowRadius=z.radius,y.shadowMapSize=z.mapSize,y.shadowCameraNear=z.camera.near,y.shadowCameraFar=z.camera.far}c.pointShadowMap[m]=x,c.pointShadowMatrix[m]=t.shadow.matrix,c.point[m]=y,m++}else if(t.isHemisphereLight){var y=b.get(t);y.direction.setFromMatrixPosition(t.matrixWorld),y.direction.transformDirection(q),y.direction.normalize(),y.skyColor.copy(t.color).multiplyScalar(v),y.groundColor.copy(t.groundColor).multiplyScalar(v),c.hemi[p]=y,p++}}c.ambient[0]=i,c.ambient[1]=j,c.ambient[2]=k,c.directional.length=l,c.spot.length=n,c.rectArea.length=o,c.point.length=m,c.hemi.length=p,c.hash=l+","+m+","+n+","+o+","+p+","+d.length}var b=new Ua,c={hash:"",ambient:[0,0,0],directional:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],point:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]},e=new f,g=new d,h=new d;return{setup:a,state:c}}function Wa(a,b){function c(c){var d=b.frame,f=c.geometry,g=a.get(c,f);return e[g.id]!==d&&(f.isGeometry&&g.updateFromObject(c),a.update(g),e[g.id]=d),g}function d(){e={}}var e={};return{update:c,clear:d}}function Xa(a){for(var b=a.split("\n"),c=0;c<b.length;c++)b[c]=c+1+": "+b[c];return b.join("\n")}function Ya(a,b,c){var d=a.createShader(b);return a.shaderSource(d,c),a.compileShader(d),!1===a.getShaderParameter(d,a.COMPILE_STATUS)&&console.error("THREE.WebGLShader: Shader couldn't compile."),""!==a.getShaderInfoLog(d)&&console.warn("THREE.WebGLShader: gl.getShaderInfoLog()",b===a.VERTEX_SHADER?"vertex":"fragment",a.getShaderInfoLog(d),Xa(c)),d}function Za(a){switch(a){case pd:return["Linear","( value )"];case qd:return["sRGB","( value )"];case sd:return["RGBE","( value )"];case td:return["RGBM","( value, 7.0 )"];case ud:return["RGBM","( value, 16.0 )"];case vd:return["RGBD","( value, 256.0 )"];case rd:return["Gamma","( value, float( GAMMA_FACTOR ) )"];default:throw new Error("unsupported encoding: "+a)}}function $a(a,b){var c=Za(b);return"vec4 "+a+"( vec4 value ) { return "+c[0]+"ToLinear"+c[1]+"; }"}function _a(a,b){var c=Za(b);return"vec4 "+a+"( vec4 value ) { return LinearTo"+c[0]+c[1]+"; }"}function ab(a,b){var c;switch(b){case rc:c="Linear";break;case sc:c="Reinhard";break;case tc:c="Uncharted2";break;case uc:c="OptimizedCineon";break;default:throw new Error("unsupported toneMapping: "+b)}return"vec3 "+a+"( vec3 color ) { return "+c+"ToneMapping( color ); }"}function bb(a,b,c){return a=a||{},[a.derivatives||b.envMapCubeUV||b.bumpMap||b.normalMap||b.flatShading?"#extension GL_OES_standard_derivatives : enable":"",(a.fragDepth||b.logarithmicDepthBuffer)&&c.get("EXT_frag_depth")?"#extension GL_EXT_frag_depth : enable":"",a.drawBuffers&&c.get("WEBGL_draw_buffers")?"#extension GL_EXT_draw_buffers : require":"",(a.shaderTextureLOD||b.envMap)&&c.get("EXT_shader_texture_lod")?"#extension GL_EXT_shader_texture_lod : enable":""].filter(eb).join("\n")}function cb(a){var b=[];for(var c in a){var d=a[c];!1!==d&&b.push("#define "+c+" "+d)}return b.join("\n")}function db(a,b){for(var c={},d=a.getProgramParameter(b,a.ACTIVE_ATTRIBUTES),e=0;e<d;e++){var f=a.getActiveAttrib(b,e),g=f.name;c[g]=a.getAttribLocation(b,g)}return c}function eb(a){return""!==a}function fb(a,b){return a.replace(/NUM_DIR_LIGHTS/g,b.numDirLights).replace(/NUM_SPOT_LIGHTS/g,b.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,b.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,b.numPointLights).replace(/NUM_HEMI_LIGHTS/g,b.numHemiLights)}function gb(a){function b(a,b){var c=Mf[b];if(void 0===c)throw new Error("Can not resolve #include <"+b+">");return gb(c)}var c=/^[ \t]*#include +<([\w\d.]+)>/gm;return a.replace(c,b)}function hb(a){function b(a,b,c,d){for(var e="",f=parseInt(b);f<parseInt(c);f++)e+=d.replace(/\[ i \]/g,"[ "+f+" ]");return e}var c=/for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;return a.replace(c,b)}function ib(a,b,c,d,e,f){var g=a.context,h=d.defines,i=e.vertexShader,j=e.fragmentShader,k="SHADOWMAP_TYPE_BASIC";f.shadowMapType===Eb?k="SHADOWMAP_TYPE_PCF":f.shadowMapType===Fb&&(k="SHADOWMAP_TYPE_PCF_SOFT");var l="ENVMAP_TYPE_CUBE",m="ENVMAP_MODE_REFLECTION",n="ENVMAP_BLENDING_MULTIPLY";if(f.envMap){switch(d.envMap.mapping){case wc:case xc:l="ENVMAP_TYPE_CUBE";break;case Bc:case Cc:l="ENVMAP_TYPE_CUBE_UV";break;case yc:case zc:l="ENVMAP_TYPE_EQUIREC";break;case Ac:l="ENVMAP_TYPE_SPHERE"}switch(d.envMap.mapping){case xc:case zc:m="ENVMAP_MODE_REFRACTION"}switch(d.combine){case nc:n="ENVMAP_BLENDING_MULTIPLY";break;case oc:n="ENVMAP_BLENDING_MIX";break;case pc:n="ENVMAP_BLENDING_ADD"}}var o,p,q=a.gammaFactor>0?a.gammaFactor:1,r=bb(d.extensions,f,b),s=cb(h),t=g.createProgram();d.isRawShaderMaterial?(o=[s].filter(eb).join("\n"),o.length>0&&(o+="\n"),p=[r,s].filter(eb).join("\n"),p.length>0&&(p+="\n")):(o=["precision "+f.precision+" float;","precision "+f.precision+" int;","#define SHADER_NAME "+e.name,s,f.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+q,"#define MAX_BONES "+f.maxBones,f.useFog&&f.fog?"#define USE_FOG":"",f.useFog&&f.fogExp?"#define FOG_EXP2":"",f.map?"#define USE_MAP":"",f.envMap?"#define USE_ENVMAP":"",f.envMap?"#define "+m:"",f.lightMap?"#define USE_LIGHTMAP":"",f.aoMap?"#define USE_AOMAP":"",f.emissiveMap?"#define USE_EMISSIVEMAP":"",f.bumpMap?"#define USE_BUMPMAP":"",f.normalMap?"#define USE_NORMALMAP":"",f.displacementMap&&f.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",f.specularMap?"#define USE_SPECULARMAP":"",f.roughnessMap?"#define USE_ROUGHNESSMAP":"",f.metalnessMap?"#define USE_METALNESSMAP":"",f.alphaMap?"#define USE_ALPHAMAP":"",f.vertexColors?"#define USE_COLOR":"",f.flatShading?"#define FLAT_SHADED":"",f.skinning?"#define USE_SKINNING":"",f.useVertexTexture?"#define BONE_TEXTURE":"",f.morphTargets?"#define USE_MORPHTARGETS":"",f.morphNormals&&!1===f.flatShading?"#define USE_MORPHNORMALS":"",f.doubleSided?"#define DOUBLE_SIDED":"",f.flipSided?"#define FLIP_SIDED":"","#define NUM_CLIPPING_PLANES "+f.numClippingPlanes,f.shadowMapEnabled?"#define USE_SHADOWMAP":"",f.shadowMapEnabled?"#define "+k:"",f.sizeAttenuation?"#define USE_SIZEATTENUATION":"",f.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",f.logarithmicDepthBuffer&&b.get("EXT_frag_depth")?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_COLOR","\tattribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","\tattribute vec3 morphTarget0;","\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;","\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif","\n"].filter(eb).join("\n"),p=[r,"precision "+f.precision+" float;","precision "+f.precision+" int;","#define SHADER_NAME "+e.name,s,f.alphaTest?"#define ALPHATEST "+f.alphaTest:"","#define GAMMA_FACTOR "+q,f.useFog&&f.fog?"#define USE_FOG":"",f.useFog&&f.fogExp?"#define FOG_EXP2":"",f.map?"#define USE_MAP":"",f.envMap?"#define USE_ENVMAP":"",f.envMap?"#define "+l:"",f.envMap?"#define "+m:"",f.envMap?"#define "+n:"",f.lightMap?"#define USE_LIGHTMAP":"",f.aoMap?"#define USE_AOMAP":"",f.emissiveMap?"#define USE_EMISSIVEMAP":"",f.bumpMap?"#define USE_BUMPMAP":"",f.normalMap?"#define USE_NORMALMAP":"",f.specularMap?"#define USE_SPECULARMAP":"",f.roughnessMap?"#define USE_ROUGHNESSMAP":"",f.metalnessMap?"#define USE_METALNESSMAP":"",f.alphaMap?"#define USE_ALPHAMAP":"",f.vertexColors?"#define USE_COLOR":"",f.gradientMap?"#define USE_GRADIENTMAP":"",f.flatShading?"#define FLAT_SHADED":"",f.doubleSided?"#define DOUBLE_SIDED":"",f.flipSided?"#define FLIP_SIDED":"","#define NUM_CLIPPING_PLANES "+f.numClippingPlanes,"#define UNION_CLIPPING_PLANES "+(f.numClippingPlanes-f.numClipIntersection),f.shadowMapEnabled?"#define USE_SHADOWMAP":"",f.shadowMapEnabled?"#define "+k:"",f.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",f.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",f.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",f.logarithmicDepthBuffer&&b.get("EXT_frag_depth")?"#define USE_LOGDEPTHBUF_EXT":"",f.envMap&&b.get("EXT_shader_texture_lod")?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;",f.toneMapping!==qc?"#define TONE_MAPPING":"",f.toneMapping!==qc?Mf.tonemapping_pars_fragment:"",f.toneMapping!==qc?ab("toneMapping",f.toneMapping):"",f.dithering?"#define DITHERING":"",f.outputEncoding||f.mapEncoding||f.envMapEncoding||f.emissiveMapEncoding?Mf.encodings_pars_fragment:"",f.mapEncoding?$a("mapTexelToLinear",f.mapEncoding):"",f.envMapEncoding?$a("envMapTexelToLinear",f.envMapEncoding):"",f.emissiveMapEncoding?$a("emissiveMapTexelToLinear",f.emissiveMapEncoding):"",f.outputEncoding?_a("linearToOutputTexel",f.outputEncoding):"",f.depthPacking?"#define DEPTH_PACKING "+d.depthPacking:"","\n"].filter(eb).join("\n")),i=gb(i),i=fb(i,f),j=gb(j),j=fb(j,f),d.isShaderMaterial||(i=hb(i),j=hb(j));var u=o+i,v=p+j,w=Ya(g,g.VERTEX_SHADER,u),x=Ya(g,g.FRAGMENT_SHADER,v);g.attachShader(t,w),g.attachShader(t,x),void 0!==d.index0AttributeName?g.bindAttribLocation(t,0,d.index0AttributeName):!0===f.morphTargets&&g.bindAttribLocation(t,0,"position"),g.linkProgram(t);var y=g.getProgramInfoLog(t),z=g.getShaderInfoLog(w),A=g.getShaderInfoLog(x),B=!0,C=!0;!1===g.getProgramParameter(t,g.LINK_STATUS)?(B=!1,console.error("THREE.WebGLProgram: shader error: ",g.getError(),"gl.VALIDATE_STATUS",g.getProgramParameter(t,g.VALIDATE_STATUS),"gl.getProgramInfoLog",y,z,A)):""!==y?console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",y):""!==z&&""!==A||(C=!1),C&&(this.diagnostics={runnable:B,material:d,programLog:y,vertexShader:{log:z,prefix:o},fragmentShader:{log:A,prefix:p}}),g.deleteShader(w),g.deleteShader(x);var D;this.getUniforms=function(){return void 0===D&&(D=new T(g,t,a)),D};var E;return this.getAttributes=function(){return void 0===E&&(E=db(g,t)),E},this.destroy=function(){g.deleteProgram(t),this.program=void 0},Object.defineProperties(this,{uniforms:{get:function(){return console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms()."),this.getUniforms()}},attributes:{get:function(){return console.warn("THREE.WebGLProgram: .attributes is now .getAttributes()."),this.getAttributes()}}}),this.id=Sf++,this.code=c,this.usedTimes=1,this.program=t,this.vertexShader=w,this.fragmentShader=x,this}function jb(a,b,c){function d(a){var b=a.skeleton,d=b.bones;if(c.floatVertexTextures)return 1024;var e=c.maxVertexUniforms,f=Math.floor((e-20)/4),g=Math.min(f,d.length);return g<d.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+d.length+" bones. This GPU supports "+g+"."),0):g}function e(a,b){var c;return a?a.isTexture?c=a.encoding:a.isWebGLRenderTarget&&(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),c=a.texture.encoding):c=pd,c===pd&&b&&(c=rd),c}var f=[],g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"phong",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow"},h=["precision","supportsVertexTextures","map","mapEncoding","envMap","envMapMode","envMapEncoding","lightMap","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","displacementMap","specularMap","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","fog","useFog","fogExp","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","maxMorphTargets","maxMorphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering"];this.getParameters=function(b,f,h,i,j,k,l){var m=g[b.type],n=l.isSkinnedMesh?d(l):0,o=c.precision;null!==b.precision&&(o=c.getMaxPrecision(b.precision))!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",o,"instead.");var p=a.getRenderTarget();return{shaderID:m,precision:o,supportsVertexTextures:c.vertexTextures,outputEncoding:e(p?p.texture:null,a.gammaOutput),map:!!b.map,mapEncoding:e(b.map,a.gammaInput),envMap:!!b.envMap,envMapMode:b.envMap&&b.envMap.mapping,envMapEncoding:e(b.envMap,a.gammaInput),envMapCubeUV:!!b.envMap&&(b.envMap.mapping===Bc||b.envMap.mapping===Cc),lightMap:!!b.lightMap,aoMap:!!b.aoMap,emissiveMap:!!b.emissiveMap,emissiveMapEncoding:e(b.emissiveMap,a.gammaInput),bumpMap:!!b.bumpMap,normalMap:!!b.normalMap,displacementMap:!!b.displacementMap,roughnessMap:!!b.roughnessMap,metalnessMap:!!b.metalnessMap,specularMap:!!b.specularMap,alphaMap:!!b.alphaMap,gradientMap:!!b.gradientMap,combine:b.combine,vertexColors:b.vertexColors,fog:!!i,useFog:b.fog,fogExp:i&&i.isFogExp2,flatShading:b.flatShading,sizeAttenuation:b.sizeAttenuation,logarithmicDepthBuffer:c.logarithmicDepthBuffer,skinning:b.skinning&&n>0,maxBones:n,useVertexTexture:c.floatVertexTextures,morphTargets:b.morphTargets,morphNormals:b.morphNormals,maxMorphTargets:a.maxMorphTargets,maxMorphNormals:a.maxMorphNormals,numDirLights:f.directional.length,numPointLights:f.point.length,numSpotLights:f.spot.length,numRectAreaLights:f.rectArea.length,numHemiLights:f.hemi.length,numClippingPlanes:j,numClipIntersection:k,dithering:b.dithering,shadowMapEnabled:a.shadowMap.enabled&&l.receiveShadow&&h.length>0,shadowMapType:a.shadowMap.type,toneMapping:a.toneMapping,physicallyCorrectLights:a.physicallyCorrectLights,premultipliedAlpha:b.premultipliedAlpha,alphaTest:b.alphaTest,doubleSided:b.side===Ib,flipSided:b.side===Hb,depthPacking:void 0!==b.depthPacking&&b.depthPacking}},this.getProgramCode=function(b,c){var d=[];if(c.shaderID?d.push(c.shaderID):(d.push(b.fragmentShader),d.push(b.vertexShader)),void 0!==b.defines)for(var e in b.defines)d.push(e),d.push(b.defines[e]);for(var f=0;f<h.length;f++)d.push(c[h[f]]);return d.push(b.onBeforeCompile.toString()),d.push(a.gammaOutput),d.join()},this.acquireProgram=function(c,d,e,g){for(var h,i=0,j=f.length;i<j;i++){var k=f[i];if(k.code===g){h=k,++h.usedTimes;break}}return void 0===h&&(h=new ib(a,b,g,c,d,e),f.push(h)),h},this.releaseProgram=function(a){if(0==--a.usedTimes){var b=f.indexOf(a);f[b]=f[f.length-1],f.pop(),a.destroy()}},this.programs=f}function kb(a,b,c,d,e,f,g){function h(a,b){if(a.width>b||a.height>b){var c=b/Math.max(a.width,a.height),d=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");d.width=Math.floor(a.width*c),d.height=Math.floor(a.height*c);return d.getContext("2d").drawImage(a,0,0,a.width,a.height,0,0,d.width,d.height),console.warn("THREE.WebGLRenderer: image is too big ("+a.width+"x"+a.height+"). Resized to "+d.width+"x"+d.height,a),d}return a}function i(a){return yd.isPowerOfTwo(a.width)&&yd.isPowerOfTwo(a.height)}function j(a){if(a instanceof HTMLImageElement||a instanceof HTMLCanvasElement||a instanceof ImageBitmap){var b=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");b.width=yd.floorPowerOfTwo(a.width),b.height=yd.floorPowerOfTwo(a.height);return b.getContext("2d").drawImage(a,0,0,b.width,b.height),console.warn("THREE.WebGLRenderer: image is not power of two ("+a.width+"x"+a.height+"). Resized to "+b.width+"x"+b.height,a),b}return a}function k(a){return a.wrapS!==Ec||a.wrapT!==Ec||a.minFilter!==Gc&&a.minFilter!==Jc}function l(a,b){return a.generateMipmaps&&b&&a.minFilter!==Gc&&a.minFilter!==Jc}function m(b){return b===Gc||b===Hc||b===Ic?a.NEAREST:a.LINEAR}function n(a){var b=a.target;b.removeEventListener("dispose",n),p(b),b.isVideoTexture&&delete E[b.id],g.textures--}function o(a){var b=a.target;b.removeEventListener("dispose",o),q(b),g.textures--}function p(b){var c=d.get(b);if(b.image&&c.__image__webglTextureCube)a.deleteTexture(c.__image__webglTextureCube);else{if(void 0===c.__webglInit)return;a.deleteTexture(c.__webglTexture)}d.remove(b)}function q(b){var c=d.get(b),e=d.get(b.texture);if(b){if(void 0!==e.__webglTexture&&a.deleteTexture(e.__webglTexture),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLRenderTargetCube)for(var f=0;f<6;f++)a.deleteFramebuffer(c.__webglFramebuffer[f]),c.__webglDepthbuffer&&a.deleteRenderbuffer(c.__webglDepthbuffer[f]);else a.deleteFramebuffer(c.__webglFramebuffer),c.__webglDepthbuffer&&a.deleteRenderbuffer(c.__webglDepthbuffer);d.remove(b.texture),d.remove(b)}}function r(b,e){var f=d.get(b);if(b.version>0&&f.__version!==b.version){var g=b.image;if(void 0===g)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined",b);else{if(!1!==g.complete)return void v(f,b,e);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete",b)}}c.activeTexture(a.TEXTURE0+e),c.bindTexture(a.TEXTURE_2D,f.__webglTexture)}function s(b,j){var k=d.get(b);if(6===b.image.length)if(b.version>0&&k.__version!==b.version){k.__image__webglTextureCube||(b.addEventListener("dispose",n),k.__image__webglTextureCube=a.createTexture(),g.textures++),c.activeTexture(a.TEXTURE0+j),c.bindTexture(a.TEXTURE_CUBE_MAP,k.__image__webglTextureCube),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,b.flipY);for(var m=b&&b.isCompressedTexture,o=b.image[0]&&b.image[0].isDataTexture,p=[],q=0;q<6;q++)p[q]=m||o?o?b.image[q].image:b.image[q]:h(b.image[q],e.maxCubemapSize);var r=p[0],s=i(r),t=f.convert(b.format),v=f.convert(b.type);u(a.TEXTURE_CUBE_MAP,b,s);for(var q=0;q<6;q++)if(m)for(var w,x=p[q].mipmaps,y=0,z=x.length;y<z;y++)w=x[y],b.format!==$c&&b.format!==Zc?c.getCompressedTextureFormats().indexOf(t)>-1?c.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+q,y,t,w.width,w.height,0,w.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+q,y,t,w.width,w.height,0,t,v,w.data);else o?c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,t,p[q].width,p[q].height,0,t,v,p[q].data):c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,t,t,v,p[q]);l(b,s)&&a.generateMipmap(a.TEXTURE_CUBE_MAP),k.__version=b.version,b.onUpdate&&b.onUpdate(b)}else c.activeTexture(a.TEXTURE0+j),c.bindTexture(a.TEXTURE_CUBE_MAP,k.__image__webglTextureCube)}function t(b,e){c.activeTexture(a.TEXTURE0+e),c.bindTexture(a.TEXTURE_CUBE_MAP,d.get(b).__webglTexture)}function u(c,g,h){var i;if(h?(a.texParameteri(c,a.TEXTURE_WRAP_S,f.convert(g.wrapS)),a.texParameteri(c,a.TEXTURE_WRAP_T,f.convert(g.wrapT)),a.texParameteri(c,a.TEXTURE_MAG_FILTER,f.convert(g.magFilter)),a.texParameteri(c,a.TEXTURE_MIN_FILTER,f.convert(g.minFilter))):(a.texParameteri(c,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(c,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),g.wrapS===Ec&&g.wrapT===Ec||console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.",g),a.texParameteri(c,a.TEXTURE_MAG_FILTER,m(g.magFilter)),a.texParameteri(c,a.TEXTURE_MIN_FILTER,m(g.minFilter)),g.minFilter!==Gc&&g.minFilter!==Jc&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.",g)),i=b.get("EXT_texture_filter_anisotropic")){if(g.type===Sc&&null===b.get("OES_texture_float_linear"))return;if(g.type===Tc&&null===b.get("OES_texture_half_float_linear"))return;(g.anisotropy>1||d.get(g).__currentAnisotropy)&&(a.texParameterf(c,i.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,e.getMaxAnisotropy())),d.get(g).__currentAnisotropy=g.anisotropy)}}function v(b,d,m){void 0===b.__webglInit&&(b.__webglInit=!0,d.addEventListener("dispose",n),b.__webglTexture=a.createTexture(),d.isVideoTexture&&(E[d.id]=d),g.textures++),c.activeTexture(a.TEXTURE0+m),c.bindTexture(a.TEXTURE_2D,b.__webglTexture),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,d.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,d.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,d.unpackAlignment);var o=h(d.image,e.maxTextureSize);k(d)&&!1===i(o)&&(o=j(o));var p=i(o),q=f.convert(d.format),r=f.convert(d.type);u(a.TEXTURE_2D,d,p);var s,t=d.mipmaps;if(d.isDepthTexture){var v=a.DEPTH_COMPONENT;if(d.type===Sc){if(!D)throw new Error("Float Depth Texture only supported in WebGL2.0");v=a.DEPTH_COMPONENT32F}else D&&(v=a.DEPTH_COMPONENT16);d.format===bd&&v===a.DEPTH_COMPONENT&&d.type!==Pc&&d.type!==Rc&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),d.type=Pc,r=f.convert(d.type)),d.format===cd&&(v=a.DEPTH_STENCIL,d.type!==Xc&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),d.type=Xc,r=f.convert(d.type))),c.texImage2D(a.TEXTURE_2D,0,v,o.width,o.height,0,q,r,null)}else if(d.isDataTexture)if(t.length>0&&p){for(var w=0,x=t.length;w<x;w++)s=t[w],c.texImage2D(a.TEXTURE_2D,w,q,s.width,s.height,0,q,r,s.data);d.generateMipmaps=!1}else c.texImage2D(a.TEXTURE_2D,0,q,o.width,o.height,0,q,r,o.data);else if(d.isCompressedTexture)for(var w=0,x=t.length;w<x;w++)s=t[w],d.format!==$c&&d.format!==Zc?c.getCompressedTextureFormats().indexOf(q)>-1?c.compressedTexImage2D(a.TEXTURE_2D,w,q,s.width,s.height,0,s.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):c.texImage2D(a.TEXTURE_2D,w,q,s.width,s.height,0,q,r,s.data);else if(t.length>0&&p){for(var w=0,x=t.length;w<x;w++)s=t[w],c.texImage2D(a.TEXTURE_2D,w,q,q,r,s);d.generateMipmaps=!1}else c.texImage2D(a.TEXTURE_2D,0,q,q,r,o);l(d,p)&&a.generateMipmap(a.TEXTURE_2D),b.__version=d.version,d.onUpdate&&d.onUpdate(d)}function w(b,e,g,h){var i=f.convert(e.texture.format),j=f.convert(e.texture.type);c.texImage2D(h,0,i,e.width,e.height,0,i,j,null),a.bindFramebuffer(a.FRAMEBUFFER,b),a.framebufferTexture2D(a.FRAMEBUFFER,g,h,d.get(e.texture).__webglTexture,0),a.bindFramebuffer(a.FRAMEBUFFER,null)}function x(b,c){a.bindRenderbuffer(a.RENDERBUFFER,b),c.depthBuffer&&!c.stencilBuffer?(a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_COMPONENT16,c.width,c.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,b)):c.depthBuffer&&c.stencilBuffer?(a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_STENCIL,c.width,c.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.RENDERBUFFER,b)):a.renderbufferStorage(a.RENDERBUFFER,a.RGBA4,c.width,c.height),a.bindRenderbuffer(a.RENDERBUFFER,null)}function y(b,c){if(c&&c.isWebGLRenderTargetCube)throw new Error("Depth Texture with cube render targets is not supported");if(a.bindFramebuffer(a.FRAMEBUFFER,b),!c.depthTexture||!c.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");d.get(c.depthTexture).__webglTexture&&c.depthTexture.image.width===c.width&&c.depthTexture.image.height===c.height||(c.depthTexture.image.width=c.width,c.depthTexture.image.height=c.height,c.depthTexture.needsUpdate=!0),r(c.depthTexture,0);var e=d.get(c.depthTexture).__webglTexture;if(c.depthTexture.format===bd)a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,e,0);else{if(c.depthTexture.format!==cd)throw new Error("Unknown depthTexture format");a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,e,0)}}function z(b){var c=d.get(b),e=!0===b.isWebGLRenderTargetCube;if(b.depthTexture){if(e)throw new Error("target.depthTexture not supported in Cube render targets");y(c.__webglFramebuffer,b)}else if(e){c.__webglDepthbuffer=[];for(var f=0;f<6;f++)a.bindFramebuffer(a.FRAMEBUFFER,c.__webglFramebuffer[f]),c.__webglDepthbuffer[f]=a.createRenderbuffer(),x(c.__webglDepthbuffer[f],b)}else a.bindFramebuffer(a.FRAMEBUFFER,c.__webglFramebuffer),c.__webglDepthbuffer=a.createRenderbuffer(),x(c.__webglDepthbuffer,b);a.bindFramebuffer(a.FRAMEBUFFER,null)}function A(b){var e=d.get(b),f=d.get(b.texture);b.addEventListener("dispose",o),f.__webglTexture=a.createTexture(),g.textures++;var h=!0===b.isWebGLRenderTargetCube,j=i(b);if(h){e.__webglFramebuffer=[];for(var k=0;k<6;k++)e.__webglFramebuffer[k]=a.createFramebuffer()}else e.__webglFramebuffer=a.createFramebuffer();if(h){c.bindTexture(a.TEXTURE_CUBE_MAP,f.__webglTexture),u(a.TEXTURE_CUBE_MAP,b.texture,j);for(var k=0;k<6;k++)w(e.__webglFramebuffer[k],b,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+k);l(b.texture,j)&&a.generateMipmap(a.TEXTURE_CUBE_MAP),c.bindTexture(a.TEXTURE_CUBE_MAP,null)}else c.bindTexture(a.TEXTURE_2D,f.__webglTexture),u(a.TEXTURE_2D,b.texture,j),w(e.__webglFramebuffer,b,a.COLOR_ATTACHMENT0,a.TEXTURE_2D),l(b.texture,j)&&a.generateMipmap(a.TEXTURE_2D),c.bindTexture(a.TEXTURE_2D,null);b.depthBuffer&&z(b)}function B(b){var e=b.texture;if(l(e,i(b))){var f=b.isWebGLRenderTargetCube?a.TEXTURE_CUBE_MAP:a.TEXTURE_2D,g=d.get(e).__webglTexture;c.bindTexture(f,g),a.generateMipmap(f),c.bindTexture(f,null)}}function C(){for(var a in E)E[a].update()}var D="undefined"!=typeof WebGL2RenderingContext&&a instanceof window.WebGL2RenderingContext,E={};this.setTexture2D=r,this.setTextureCube=s,this.setTextureCubeDynamic=t,this.setupRenderTarget=A,this.updateRenderTargetMipmap=B,this.updateVideoTextures=C}function lb(){function a(a){var b=a.uuid,c=d[b];return void 0===c&&(c={},d[b]=c),c}function b(a){delete d[a.uuid]}function c(){d={}}var d={};return{get:a,remove:b,clear:c}}function mb(a,b,c){function d(){var b=!1,c=new i,d=null,e=new i(0,0,0,0);return{setMask:function(c){d===c||b||(a.colorMask(c,c,c,c),d=c)},setLocked:function(a){b=a},setClear:function(b,d,f,g,h){!0===h&&(b*=g,d*=g,f*=g),c.set(b,d,f,g),!1===e.equals(c)&&(a.clearColor(b,d,f,g),e.copy(c))},reset:function(){b=!1,d=null,e.set(-1,0,0,0)}}}function e(){var b=!1,c=null,d=null,e=null;return{setTest:function(b){b?m(a.DEPTH_TEST):n(a.DEPTH_TEST)},setMask:function(d){c===d||b||(a.depthMask(d),c=d)},setFunc:function(b){if(d!==b){if(b)switch(b){case fc:a.depthFunc(a.NEVER);break;case gc:a.depthFunc(a.ALWAYS);break;case hc:a.depthFunc(a.LESS);break;case ic:a.depthFunc(a.LEQUAL);break;case jc:a.depthFunc(a.EQUAL);break;case kc:a.depthFunc(a.GEQUAL);break;case lc:a.depthFunc(a.GREATER);break;case mc:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}else a.depthFunc(a.LEQUAL);d=b}},setLocked:function(a){b=a},setClear:function(b){e!==b&&(a.clearDepth(b),e=b)},reset:function(){b=!1,c=null,d=null,e=null}}}function f(){var b=!1,c=null,d=null,e=null,f=null,g=null,h=null,i=null,j=null;return{setTest:function(b){b?m(a.STENCIL_TEST):n(a.STENCIL_TEST)},setMask:function(d){c===d||b||(a.stencilMask(d),c=d)},setFunc:function(b,c,g){d===b&&e===c&&f===g||(a.stencilFunc(b,c,g),d=b,e=c,f=g)},setOp:function(b,c,d){g===b&&h===c&&i===d||(a.stencilOp(b,c,d),g=b,h=c,i=d)},setLocked:function(a){b=a},setClear:function(b){j!==b&&(a.clearStencil(b),j=b)},reset:function(){b=!1,c=null,d=null,e=null,f=null,g=null,h=null,i=null,j=null}}}function g(b,c,d){var e=new Uint8Array(4),f=a.createTexture();a.bindTexture(b,f),a.texParameteri(b,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(b,a.TEXTURE_MAG_FILTER,a.NEAREST);for(var g=0;g<d;g++)a.texImage2D(c+g,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,e);return f}function h(){for(var a=0,b=I.length;a<b;a++)I[a]=0}function j(c){if(I[c]=1,0===J[c]&&(a.enableVertexAttribArray(c),J[c]=1),0!==K[c]){b.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(c,0),K[c]=0}}function k(c,d){if(I[c]=1,0===J[c]&&(a.enableVertexAttribArray(c),J[c]=1),K[c]!==d){b.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(c,d),K[c]=d}}function l(){for(var b=0,c=J.length;b!==c;++b)J[b]!==I[b]&&(a.disableVertexAttribArray(b),J[b]=0)}function m(b){!0!==L[b]&&(a.enable(b),L[b]=!0)}function n(b){!1!==L[b]&&(a.disable(b),L[b]=!1)}function o(){if(null===M&&(M=[],b.get("WEBGL_compressed_texture_pvrtc")||b.get("WEBGL_compressed_texture_s3tc")||b.get("WEBGL_compressed_texture_etc1")))for(var c=a.getParameter(a.COMPRESSED_TEXTURE_FORMATS),d=0;d<c.length;d++)M.push(c[d]);return M}function p(b){return N!==b&&(a.useProgram(b),N=b,!0)}function q(b,d,e,f,g,h,i,j){if(b!==Lb?m(a.BLEND):n(a.BLEND),b!==Qb){if(b!==O||j!==V)switch(b){case Nb:j?(a.blendEquationSeparate(a.FUNC_ADD,a.FUNC_ADD),a.blendFuncSeparate(a.ONE,a.ONE,a.ONE,a.ONE)):(a.blendEquation(a.FUNC_ADD),a.blendFunc(a.SRC_ALPHA,a.ONE));break;case Ob:j?(a.blendEquationSeparate(a.FUNC_ADD,a.FUNC_ADD),a.blendFuncSeparate(a.ZERO,a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ONE_MINUS_SRC_ALPHA)):(a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ZERO,a.ONE_MINUS_SRC_COLOR));break;case Pb:j?(a.blendEquationSeparate(a.FUNC_ADD,a.FUNC_ADD),a.blendFuncSeparate(a.ZERO,a.SRC_COLOR,a.ZERO,a.SRC_ALPHA)):(a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ZERO,a.SRC_COLOR));break;default:j?(a.blendEquationSeparate(a.FUNC_ADD,a.FUNC_ADD),a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA)):(a.blendEquationSeparate(a.FUNC_ADD,a.FUNC_ADD),a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA))}P=null,Q=null,R=null,S=null,T=null,U=null}else g=g||d,h=h||e,i=i||f,d===P&&g===S||(a.blendEquationSeparate(c.convert(d),c.convert(g)),P=d,S=g),e===Q&&f===R&&h===T&&i===U||(a.blendFuncSeparate(c.convert(e),c.convert(f),c.convert(h),c.convert(i)),Q=e,R=f,T=h,U=i);O=b,V=j}function r(b,c){b.side===Ib?n(a.CULL_FACE):m(a.CULL_FACE);var d=b.side===Hb;c&&(d=!d),s(d),!0===b.transparent?q(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.premultipliedAlpha):q(Lb),F.setFunc(b.depthFunc),F.setTest(b.depthTest),F.setMask(b.depthWrite),E.setMask(b.colorWrite),v(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits)}function s(b){W!==b&&(b?a.frontFace(a.CW):a.frontFace(a.CCW),W=b)}function t(b){b!==Ab?(m(a.CULL_FACE),b!==X&&(b===Bb?a.cullFace(a.BACK):b===Cb?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):n(a.CULL_FACE),X=b}function u(b){b!==Y&&(ba&&a.lineWidth(b),Y=b)}function v(b,c,d){b?(m(a.POLYGON_OFFSET_FILL),Z===c&&$===d||(a.polygonOffset(c,d),Z=c,$=d)):n(a.POLYGON_OFFSET_FILL)}function w(b){b?m(a.SCISSOR_TEST):n(a.SCISSOR_TEST)}function x(b){void 0===b&&(b=a.TEXTURE0+_-1),ca!==b&&(a.activeTexture(b),ca=b)}function y(b,c){null===ca&&x();var d=da[ca];void 0===d&&(d={type:void 0,texture:void 0},da[ca]=d),d.type===b&&d.texture===c||(a.bindTexture(b,c||ga[b]),d.type=b,d.texture=c)}function z(){try{a.compressedTexImage2D.apply(a,arguments)}catch(a){console.error("THREE.WebGLState:",a)}}function A(){try{a.texImage2D.apply(a,arguments)}catch(a){console.error("THREE.WebGLState:",a)}}function B(b){!1===ea.equals(b)&&(a.scissor(b.x,b.y,b.z,b.w),ea.copy(b))}function C(b){!1===fa.equals(b)&&(a.viewport(b.x,b.y,b.z,b.w),fa.copy(b))}function D(){for(var b=0;b<J.length;b++)1===J[b]&&(a.disableVertexAttribArray(b),J[b]=0);L={},M=null,ca=null,da={},N=null,O=null,W=null,X=null,E.reset(),F.reset(),G.reset()}var E=new d,F=new e,G=new f,H=a.getParameter(a.MAX_VERTEX_ATTRIBS),I=new Uint8Array(H),J=new Uint8Array(H),K=new Uint8Array(H),L={},M=null,N=null,O=null,P=null,Q=null,R=null,S=null,T=null,U=null,V=!1,W=null,X=null,Y=null,Z=null,$=null,_=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS),aa=parseFloat(/^WebGL\ ([0-9])/.exec(a.getParameter(a.VERSION))[1]),ba=parseFloat(aa)>=1,ca=null,da={},ea=new i,fa=new i,ga={};return ga[a.TEXTURE_2D]=g(a.TEXTURE_2D,a.TEXTURE_2D,1),ga[a.TEXTURE_CUBE_MAP]=g(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),E.setClear(0,0,0,1),F.setClear(1),G.setClear(0),m(a.DEPTH_TEST),F.setFunc(ic),s(!1),t(Bb),m(a.CULL_FACE),m(a.BLEND),q(Mb),{buffers:{color:E,depth:F,stencil:G},initAttributes:h,enableAttribute:j,enableAttributeAndDivisor:k,disableUnusedAttributes:l,enable:m,disable:n,getCompressedTextureFormats:o,useProgram:p,setBlending:q,setMaterial:r,setFlipSided:s,setCullFace:t,setLineWidth:u,setPolygonOffset:v,setScissorTest:w,activeTexture:x,bindTexture:y,compressedTexImage2D:z,texImage2D:A,scissor:B,viewport:C,reset:D}}function nb(a,b,c){function d(){if(void 0!==f)return f;var c=b.get("EXT_texture_filter_anisotropic");return f=null!==c?a.getParameter(c.MAX_TEXTURE_MAX_ANISOTROPY_EXT):0}function e(b){if("highp"===b){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return"mediump"===b&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}var f,g=void 0!==c.precision?c.precision:"highp",h=e(g);h!==g&&(console.warn("THREE.WebGLRenderer:",g,"not supported, using",h,"instead."),g=h);var i=!0===c.logarithmicDepthBuffer,j=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),k=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),l=a.getParameter(a.MAX_TEXTURE_SIZE),m=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),n=a.getParameter(a.MAX_VERTEX_ATTRIBS),o=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),p=a.getParameter(a.MAX_VARYING_VECTORS),q=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),r=k>0,s=!!b.get("OES_texture_float");return{getMaxAnisotropy:d,getMaxPrecision:e,precision:g,logarithmicDepthBuffer:i,maxTextures:j,maxVertexTextures:k,maxTextureSize:l,maxCubemapSize:m,maxAttributes:n,maxVertexUniforms:o,maxVaryings:p,maxFragmentUniforms:q,vertexTextures:r,floatFragmentTextures:s,floatVertexTextures:r&&s}}function ob(a,b,c,d){ja.call(this),this.type="PerspectiveCamera",this.fov=void 0!==a?a:50,this.zoom=1,this.near=void 0!==c?c:.1,this.far=void 0!==d?d:2e3,this.focus=10,this.aspect=void 0!==b?b:1,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}function pb(a){ob.call(this),this.cameras=a||[]}function qb(a){function b(){if(null!==e&&e.isPresenting){var b=e.getEyeParameters("left"),d=b.renderWidth,f=b.renderHeight;n=a.getPixelRatio(),m=a.getSize(),a.setDrawingBufferSize(2*d,f,1)}else c.enabled&&a.setDrawingBufferSize(m.width,m.height,n)}var c=this,e=null,f=null,g=null;"undefined"!=typeof window&&"VRFrameData"in window&&(f=new window.VRFrameData);var h=new d,j=new ob;j.bounds=new i(0,0,.5,1),j.layers.enable(1);var k=new ob;k.bounds=new i(.5,0,.5,1),k.layers.enable(2);var l=new pb([j,k]);l.layers.enable(1),l.layers.enable(2);var m,n;"undefined"!=typeof window&&window.addEventListener("vrdisplaypresentchange",b,!1),this.enabled=!1,this.getDevice=function(){return e},this.setDevice=function(a){void 0!==a&&(e=a)},this.setPoseTarget=function(a){void 0!==a&&(g=a)},this.getCamera=function(a){if(null===e)return a;e.depthNear=a.near,e.depthFar=a.far,e.getFrameData(f);var b=f.pose,c=null!==g?g:a;if(null!==b.position?c.position.fromArray(b.position):c.position.set(0,0,0),null!==b.orientation&&c.quaternion.fromArray(b.orientation),c.updateMatrixWorld(),!1===e.isPresenting)return a;j.near=a.near,k.near=a.near,j.far=a.far,k.far=a.far,l.matrixWorld.copy(a.matrixWorld),l.matrixWorldInverse.copy(a.matrixWorldInverse),j.matrixWorldInverse.fromArray(f.leftViewMatrix),k.matrixWorldInverse.fromArray(f.rightViewMatrix);var d=c.parent;null!==d&&(h.getInverse(d.matrixWorld),j.matrixWorldInverse.multiply(h),k.matrixWorldInverse.multiply(h)),j.matrixWorld.getInverse(j.matrixWorldInverse),k.matrixWorld.getInverse(k.matrixWorldInverse),j.projectionMatrix.fromArray(f.leftProjectionMatrix),k.projectionMatrix.fromArray(f.rightProjectionMatrix),l.projectionMatrix.copy(j.projectionMatrix);var i=e.getLayers();if(i.length){var m=i[0];null!==m.leftBounds&&4===m.leftBounds.length&&j.bounds.fromArray(m.leftBounds),null!==m.rightBounds&&4===m.rightBounds.length&&k.bounds.fromArray(m.rightBounds)}return l},this.submitFrame=function(){e&&e.isPresenting&&e.submitFrame()},this.dispose=function(){"undefined"!=typeof window&&window.removeEventListener("vrdisplaypresentchange",b)}}function rb(a){var b={};return{get:function(c){if(void 0!==b[c])return b[c];var d;switch(c){case"WEBGL_depth_texture":d=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":d=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":d=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":d=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;case"WEBGL_compressed_texture_etc1":d=a.getExtension("WEBGL_compressed_texture_etc1");break;default:d=a.getExtension(c)}return null===d&&console.warn("THREE.WebGLRenderer: "+c+" extension not supported."),b[c]=d,d}}}function sb(){function a(){k.value!==d&&(k.value=d,k.needsUpdate=e>0),c.numPlanes=e,c.numIntersection=0}function b(a,b,d,e){var f=null!==a?a.length:0,g=null;if(0!==f){if(g=k.value,!0!==e||null===g){var h=d+4*f,l=b.matrixWorldInverse;j.getNormalMatrix(l),(null===g||g.length<h)&&(g=new Float32Array(h));for(var m=0,n=d;m!==f;++m,n+=4)i.copy(a[m]).applyMatrix4(l,j),i.normal.toArray(g,n),g[n+3]=i.constant}k.value=g,k.needsUpdate=!0}return c.numPlanes=f,g}var c=this,d=null,e=0,f=!1,h=!1,i=new ca,j=new g,k={value:null,needsUpdate:!1};this.uniform=k,this.numPlanes=0,this.numIntersection=0,this.init=function(a,c,g){var h=0!==a.length||c||0!==e||f;return f=c,d=b(a,g,0),e=a.length,h},this.beginShadows=function(){h=!0,b(null)},this.endShadows=function(){h=!1,a()},this.setState=function(c,g,i,j,l,m){if(!f||null===c||0===c.length||h&&!i)h?b(null):a();else{var n=h?0:e,o=4*n,p=l.clippingState||null;k.value=p,p=b(c,j,o,m);for(var q=0;q!==o;++q)p[q]=d[q];l.clippingState=p,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=n}}}function tb(a,b){function c(c){var d;if(c===Dc)return a.REPEAT;if(c===Ec)return a.CLAMP_TO_EDGE;if(c===Fc)return a.MIRRORED_REPEAT;if(c===Gc)return a.NEAREST;if(c===Hc)return a.NEAREST_MIPMAP_NEAREST;if(c===Ic)return a.NEAREST_MIPMAP_LINEAR;if(c===Jc)return a.LINEAR;if(c===Kc)return a.LINEAR_MIPMAP_NEAREST;if(c===Lc)return a.LINEAR_MIPMAP_LINEAR;if(c===Mc)return a.UNSIGNED_BYTE;if(c===Uc)return a.UNSIGNED_SHORT_4_4_4_4;if(c===Vc)return a.UNSIGNED_SHORT_5_5_5_1;if(c===Wc)return a.UNSIGNED_SHORT_5_6_5;if(c===Nc)return a.BYTE;if(c===Oc)return a.SHORT;if(c===Pc)return a.UNSIGNED_SHORT;if(c===Qc)return a.INT;if(c===Rc)return a.UNSIGNED_INT;if(c===Sc)return a.FLOAT;if(c===Tc&&null!==(d=b.get("OES_texture_half_float")))return d.HALF_FLOAT_OES;if(c===Yc)return a.ALPHA;if(c===Zc)return a.RGB;if(c===$c)return a.RGBA;if(c===_c)return a.LUMINANCE;if(c===ad)return a.LUMINANCE_ALPHA;if(c===bd)return a.DEPTH_COMPONENT;if(c===cd)return a.DEPTH_STENCIL;if(c===Rb)return a.FUNC_ADD;if(c===Sb)return a.FUNC_SUBTRACT;if(c===Tb)return a.FUNC_REVERSE_SUBTRACT;if(c===Wb)return a.ZERO;if(c===Xb)return a.ONE;if(c===Yb)return a.SRC_COLOR;if(c===Zb)return a.ONE_MINUS_SRC_COLOR;if(c===$b)return a.SRC_ALPHA;if(c===_b)return a.ONE_MINUS_SRC_ALPHA;if(c===ac)return a.DST_ALPHA;if(c===bc)return a.ONE_MINUS_DST_ALPHA;if(c===cc)return a.DST_COLOR;if(c===dc)return a.ONE_MINUS_DST_COLOR;if(c===ec)return a.SRC_ALPHA_SATURATE;if((c===dd||c===ed||c===fd||c===gd)&&null!==(d=b.get("WEBGL_compressed_texture_s3tc"))){if(c===dd)return d.COMPRESSED_RGB_S3TC_DXT1_EXT;if(c===ed)return d.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(c===fd)return d.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(c===gd)return d.COMPRESSED_RGBA_S3TC_DXT5_EXT}if((c===hd||c===id||c===jd||c===kd)&&null!==(d=b.get("WEBGL_compressed_texture_pvrtc"))){if(c===hd)return d.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(c===id)return d.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(c===jd)return d.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(c===kd)return d.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(c===ld&&null!==(d=b.get("WEBGL_compressed_texture_etc1")))return d.COMPRESSED_RGB_ETC1_WEBGL;if((c===Ub||c===Vb)&&null!==(d=b.get("EXT_blend_minmax"))){if(c===Ub)return d.MIN_EXT;if(c===Vb)return d.MAX_EXT}return c===Xc&&null!==(d=b.get("WEBGL_depth_texture"))?d.UNSIGNED_INT_24_8_WEBGL:0}return{convert:c}}function ub(a){function b(){return null===ba?qa:1}function c(){Ea=new rb(Ca),Ea.get("WEBGL_depth_texture"),Ea.get("OES_texture_float"),Ea.get("OES_texture_float_linear"),Ea.get("OES_texture_half_float"),Ea.get("OES_texture_half_float_linear"),Ea.get("OES_standard_derivatives"),Ea.get("OES_element_index_uint"),Ea.get("ANGLE_instanced_arrays"),bb=new tb(Ca,Ea),Fa=new nb(Ca,Ea,a),Ga=new mb(Ca,Ea,bb),Ga.scissor(la.copy(sa).multiplyScalar(qa)),Ga.viewport(ka.copy(ra).multiplyScalar(qa)),Ha=new lb,Ia=new kb(Ca,Ea,Ga,Ha,Fa,bb,Aa),Ja=new fa(Ca),La=new Ta(Ca,Ja,Aa),Ma=new Wa(La,Ba),Ya=new Qa(Ca),Pa=new jb(_,Ea,Fa),Na=new Va,Ua=new Oa,Xa=new Ka(_,Ga,La,Q),Za=new Sa(Ca,Ea,Ba),$a=new Ra(Ca,Ea,Ba),_a=new W(_,Ca,Ga,Ia,Fa),ab=new Y(_,Ca,Ga,Ia,Fa),_.info.programs=Pa.programs,_.context=Ca,_.capabilities=Fa,_.extensions=Ea,_.properties=Ha,_.renderLists=Ua,_.state=Ga}function e(a){a.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),aa=!0}function g(){console.log("THREE.WebGLRenderer: Context Restored."),aa=!1,c()}function h(a){var b=a.target;b.removeEventListener("dispose",h),j(b)}function j(a){l(a),Ha.remove(a)}function l(a){var b=Ha.get(a).program;a.program=void 0,void 0!==b&&Pa.releaseProgram(b)}function m(a,b,c){a.render(function(a){_.renderBufferImmediate(a,b,c)})}function n(a,b,c,d){if(c&&c.isInstancedBufferGeometry&&null===Ea.get("ANGLE_instanced_arrays"))return void console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");void 0===d&&(d=0),Ga.initAttributes();var e=c.attributes,f=b.getAttributes(),g=a.defaultAttributeValues;for(var h in f){var i=f[h];if(i>=0){var j=e[h];if(void 0!==j){var k=j.normalized,l=j.itemSize,m=Ja.get(j);if(void 0===m)continue;var n=m.buffer,o=m.type,p=m.bytesPerElement;if(j.isInterleavedBufferAttribute){var q=j.data,r=q.stride,s=j.offset;q&&q.isInstancedInterleavedBuffer?(Ga.enableAttributeAndDivisor(i,q.meshPerAttribute),void 0===c.maxInstancedCount&&(c.maxInstancedCount=q.meshPerAttribute*q.count)):Ga.enableAttribute(i),Ca.bindBuffer(Ca.ARRAY_BUFFER,n),Ca.vertexAttribPointer(i,l,o,k,r*p,(d*r+s)*p)}else j.isInstancedBufferAttribute?(Ga.enableAttributeAndDivisor(i,j.meshPerAttribute),void 0===c.maxInstancedCount&&(c.maxInstancedCount=j.meshPerAttribute*j.count)):Ga.enableAttribute(i),Ca.bindBuffer(Ca.ARRAY_BUFFER,n),Ca.vertexAttribPointer(i,l,o,k,0,d*l*p)}else if(void 0!==g){var t=g[h];if(void 0!==t)switch(t.length){case 2:Ca.vertexAttrib2fv(i,t);break;case 3:Ca.vertexAttrib3fv(i,t);break;case 4:Ca.vertexAttrib4fv(i,t);break;default:Ca.vertexAttrib1fv(i,t)}}}}Ga.disableUnusedAttributes()}function o(){if(!eb){var a=cb.getDevice();a&&a.isPresenting?a.requestAnimationFrame(p):window.requestAnimationFrame(p),eb=!0}}function p(a){null!==fb&&fb(a);var b=cb.getDevice();b&&b.isPresenting?b.requestAnimationFrame(p):window.requestAnimationFrame(p)}function q(a,b,c){if(!1!==a.visible){if(a.layers.test(b.layers))if(a.isLight)U.push(a),a.castShadow&&V.push(a);else if(a.isSprite)a.frustumCulled&&!ua.intersectsSprite(a)||Z.push(a);else if(a.isLensFlare)$.push(a);else if(a.isImmediateRenderObject)c&&za.setFromMatrixPosition(a.matrixWorld).applyMatrix4(ya),X.push(a,null,a.material,za.z,null);else if((a.isMesh||a.isLine||a.isPoints)&&(a.isSkinnedMesh&&a.skeleton.update(),!a.frustumCulled||ua.intersectsObject(a))){c&&za.setFromMatrixPosition(a.matrixWorld).applyMatrix4(ya);var d=Ma.update(a),e=a.material;if(Array.isArray(e))for(var f=d.groups,g=0,h=f.length;g<h;g++){var i=f[g],j=e[i.materialIndex];j&&j.visible&&X.push(a,d,j,za.z,i)}else e.visible&&X.push(a,d,e,za.z,null)}for(var k=a.children,g=0,h=k.length;g<h;g++)q(k[g],b,c)}}function r(a,b,c,d){for(var e=0,f=a.length;e<f;e++){var g=a[e],h=g.object,i=g.geometry,j=void 0===d?g.material:d,k=g.group;if(c.isArrayCamera){ja=c;for(var l=c.cameras,m=0,n=l.length;m<n;m++){var o=l[m];if(h.layers.test(o.layers)){var p=o.bounds,q=p.x*oa,r=p.y*pa,t=p.z*oa,u=p.w*pa;Ga.viewport(ka.set(q,r,t,u).multiplyScalar(qa)),s(h,b,o,i,j,k)}}}else ja=null,s(h,b,c,i,j,k)}}function s(a,b,c,d,e,f){if(a.onBeforeRender(_,b,c,d,e,f),a.modelViewMatrix.multiplyMatrices(c.matrixWorldInverse,a.matrixWorld),a.normalMatrix.getNormalMatrix(a.modelViewMatrix),a.isImmediateRenderObject){var g=a.isMesh&&a.matrixWorld.determinant()<0;Ga.setMaterial(e,g);var h=u(c,b.fog,e,a);ha="",m(a,h,e)}else _.renderBufferDirect(c,b.fog,d,e,a,f);a.onAfterRender(_,b,c,d,e,f)}function t(a,b,c){var d=Ha.get(a),e=Pa.getParameters(a,Na.state,V,b,va.numPlanes,va.numIntersection,c),f=Pa.getProgramCode(a,e),g=d.program,i=!0;if(void 0===g)a.addEventListener("dispose",h);else if(g.code!==f)l(a);else{if(void 0!==e.shaderID)return;i=!1}if(i){if(e.shaderID){var j=Nf[e.shaderID];d.shader={name:a.type,uniforms:Jd.clone(j.uniforms),vertexShader:j.vertexShader,fragmentShader:j.fragmentShader}}else d.shader={name:a.type,uniforms:a.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader};a.onBeforeCompile(d.shader),g=Pa.acquireProgram(a,d.shader,e,f),d.program=g,a.program=g}var k=g.getAttributes();if(a.morphTargets){a.numSupportedMorphTargets=0;for(var m=0;m<_.maxMorphTargets;m++)k["morphTarget"+m]>=0&&a.numSupportedMorphTargets++}if(a.morphNormals){a.numSupportedMorphNormals=0;for(var m=0;m<_.maxMorphNormals;m++)k["morphNormal"+m]>=0&&a.numSupportedMorphNormals++}var n=d.shader.uniforms;(a.isShaderMaterial||a.isRawShaderMaterial)&&!0!==a.clipping||(d.numClippingPlanes=va.numPlanes,d.numIntersection=va.numIntersection,n.clippingPlanes=va.uniform),d.fog=b,d.lightsHash=Na.state.hash,a.lights&&(n.ambientLightColor.value=Na.state.ambient,n.directionalLights.value=Na.state.directional,n.spotLights.value=Na.state.spot,n.rectAreaLights.value=Na.state.rectArea,n.pointLights.value=Na.state.point,n.hemisphereLights.value=Na.state.hemi,n.directionalShadowMap.value=Na.state.directionalShadowMap,n.directionalShadowMatrix.value=Na.state.directionalShadowMatrix,n.spotShadowMap.value=Na.state.spotShadowMap,n.spotShadowMatrix.value=Na.state.spotShadowMatrix,n.pointShadowMap.value=Na.state.pointShadowMap,n.pointShadowMatrix.value=Na.state.pointShadowMatrix);var o=d.program.getUniforms(),p=T.seqWithValue(o.seq,n);d.uniformsList=p}function u(a,b,c,d){na=0;var e=Ha.get(c);if(wa&&(xa||a!==ia)){var f=a===ia&&c.id===ga;va.setState(c.clippingPlanes,c.clipIntersection,c.clipShadows,a,e,f)}!1===c.needsUpdate&&(void 0===e.program?c.needsUpdate=!0:c.fog&&e.fog!==b?c.needsUpdate=!0:c.lights&&e.lightsHash!==Na.state.hash?c.needsUpdate=!0:void 0===e.numClippingPlanes||e.numClippingPlanes===va.numPlanes&&e.numIntersection===va.numIntersection||(c.needsUpdate=!0)),c.needsUpdate&&(t(c,b,d),c.needsUpdate=!1);var g=!1,h=!1,i=!1,j=e.program,l=j.getUniforms(),m=e.shader.uniforms;if(Ga.useProgram(j.program)&&(g=!0,h=!0,i=!0),c.id!==ga&&(ga=c.id,h=!0),g||a!==ia){if(l.setValue(Ca,"projectionMatrix",a.projectionMatrix),Fa.logarithmicDepthBuffer&&l.setValue(Ca,"logDepthBufFC",2/(Math.log(a.far+1)/Math.LN2)),ia!==(ja||a)&&(ia=ja||a,h=!0,i=!0),c.isShaderMaterial||c.isMeshPhongMaterial||c.isMeshStandardMaterial||c.envMap){var n=l.map.cameraPosition;void 0!==n&&n.setValue(Ca,za.setFromMatrixPosition(a.matrixWorld))}(c.isMeshPhongMaterial||c.isMeshLambertMaterial||c.isMeshBasicMaterial||c.isMeshStandardMaterial||c.isShaderMaterial||c.skinning)&&l.setValue(Ca,"viewMatrix",a.matrixWorldInverse)}if(c.skinning){l.setOptional(Ca,d,"bindMatrix"),l.setOptional(Ca,d,"bindMatrixInverse");var o=d.skeleton;if(o){var p=o.bones;if(Fa.floatVertexTextures){if(void 0===o.boneTexture){var q=Math.sqrt(4*p.length);q=yd.ceilPowerOfTwo(q),q=Math.max(q,4);var r=new Float32Array(q*q*4);r.set(o.boneMatrices);var s=new k(r,q,q,$c,Sc);o.boneMatrices=r,o.boneTexture=s,o.boneTextureSize=q}l.setValue(Ca,"boneTexture",o.boneTexture),l.setValue(Ca,"boneTextureSize",o.boneTextureSize)}else l.setOptional(Ca,o,"boneMatrices")}}return h&&(l.setValue(Ca,"toneMappingExposure",_.toneMappingExposure),l.setValue(Ca,"toneMappingWhitePoint",_.toneMappingWhitePoint),c.lights&&I(m,i),b&&c.fog&&z(m,b),c.isMeshBasicMaterial?v(m,c):c.isMeshLambertMaterial?(v(m,c),A(m,c)):c.isMeshPhongMaterial?(v(m,c),c.isMeshToonMaterial?C(m,c):B(m,c)):c.isMeshStandardMaterial?(v(m,c),c.isMeshPhysicalMaterial?E(m,c):D(m,c)):c.isMeshDepthMaterial?(v(m,c),F(m,c)):c.isMeshDistanceMaterial?(v(m,c),G(m,c)):c.isMeshNormalMaterial?(v(m,c),H(m,c)):c.isLineBasicMaterial?(w(m,c),c.isLineDashedMaterial&&x(m,c)):c.isPointsMaterial?y(m,c):c.isShadowMaterial&&(m.color.value=c.color,m.opacity.value=c.opacity),void 0!==m.ltcMat&&(m.ltcMat.value=Id.LTC_MAT_TEXTURE),void 0!==m.ltcMag&&(m.ltcMag.value=Id.LTC_MAG_TEXTURE),T.upload(Ca,e.uniformsList,m,_)),l.setValue(Ca,"modelViewMatrix",d.modelViewMatrix),l.setValue(Ca,"normalMatrix",d.normalMatrix),l.setValue(Ca,"modelMatrix",d.matrixWorld),j}function v(a,b){a.opacity.value=b.opacity,b.color&&(a.diffuse.value=b.color),b.emissive&&a.emissive.value.copy(b.emissive).multiplyScalar(b.emissiveIntensity),b.map&&(a.map.value=b.map),b.alphaMap&&(a.alphaMap.value=b.alphaMap),b.specularMap&&(a.specularMap.value=b.specularMap),b.envMap&&(a.envMap.value=b.envMap,a.flipEnvMap.value=b.envMap&&b.envMap.isCubeTexture?-1:1,a.reflectivity.value=b.reflectivity,a.refractionRatio.value=b.refractionRatio),b.lightMap&&(a.lightMap.value=b.lightMap,a.lightMapIntensity.value=b.lightMapIntensity),b.aoMap&&(a.aoMap.value=b.aoMap,a.aoMapIntensity.value=b.aoMapIntensity);var c;if(b.map?c=b.map:b.specularMap?c=b.specularMap:b.displacementMap?c=b.displacementMap:b.normalMap?c=b.normalMap:b.bumpMap?c=b.bumpMap:b.roughnessMap?c=b.roughnessMap:b.metalnessMap?c=b.metalnessMap:b.alphaMap?c=b.alphaMap:b.emissiveMap&&(c=b.emissiveMap),void 0!==c){if(c.isWebGLRenderTarget&&(c=c.texture),!0===c.matrixAutoUpdate){var d=c.offset,e=c.repeat,f=c.rotation,g=c.center;c.matrix.setUvTransform(d.x,d.y,e.x,e.y,f,g.x,g.y)}a.uvTransform.value.copy(c.matrix)}}function w(a,b){a.diffuse.value=b.color,a.opacity.value=b.opacity}function x(a,b){a.dashSize.value=b.dashSize,a.totalSize.value=b.dashSize+b.gapSize,a.scale.value=b.scale}function y(a,b){if(a.diffuse.value=b.color,a.opacity.value=b.opacity,a.size.value=b.size*qa,a.scale.value=.5*pa,a.map.value=b.map,null!==b.map){if(!0===b.map.matrixAutoUpdate){var c=b.map.offset,d=b.map.repeat,e=b.map.rotation,f=b.map.center;b.map.matrix.setUvTransform(c.x,c.y,d.x,d.y,e,f.x,f.y)}a.uvTransform.value.copy(b.map.matrix)}}function z(a,b){a.fogColor.value=b.color,b.isFog?(a.fogNear.value=b.near,a.fogFar.value=b.far):b.isFogExp2&&(a.fogDensity.value=b.density)}function A(a,b){b.emissiveMap&&(a.emissiveMap.value=b.emissiveMap)}function B(a,b){a.specular.value=b.specular,a.shininess.value=Math.max(b.shininess,1e-4),b.emissiveMap&&(a.emissiveMap.value=b.emissiveMap),b.bumpMap&&(a.bumpMap.value=b.bumpMap,a.bumpScale.value=b.bumpScale),b.normalMap&&(a.normalMap.value=b.normalMap,a.normalScale.value.copy(b.normalScale)),b.displacementMap&&(a.displacementMap.value=b.displacementMap,a.displacementScale.value=b.displacementScale,a.displacementBias.value=b.displacementBias)}function C(a,b){B(a,b),b.gradientMap&&(a.gradientMap.value=b.gradientMap)}function D(a,b){a.roughness.value=b.roughness,a.metalness.value=b.metalness,b.roughnessMap&&(a.roughnessMap.value=b.roughnessMap),b.metalnessMap&&(a.metalnessMap.value=b.metalnessMap),b.emissiveMap&&(a.emissiveMap.value=b.emissiveMap),b.bumpMap&&(a.bumpMap.value=b.bumpMap,a.bumpScale.value=b.bumpScale),b.normalMap&&(a.normalMap.value=b.normalMap,a.normalScale.value.copy(b.normalScale)),b.displacementMap&&(a.displacementMap.value=b.displacementMap,a.displacementScale.value=b.displacementScale,a.displacementBias.value=b.displacementBias),b.envMap&&(a.envMapIntensity.value=b.envMapIntensity)}function E(a,b){a.clearCoat.value=b.clearCoat,a.clearCoatRoughness.value=b.clearCoatRoughness,D(a,b)}function F(a,b){b.displacementMap&&(a.displacementMap.value=b.displacementMap,a.displacementScale.value=b.displacementScale,a.displacementBias.value=b.displacementBias)}function G(a,b){b.displacementMap&&(a.displacementMap.value=b.displacementMap,a.displacementScale.value=b.displacementScale,a.displacementBias.value=b.displacementBias),a.referencePosition.value.copy(b.referencePosition),a.nearDistance.value=b.nearDistance,a.farDistance.value=b.farDistance}function H(a,b){b.bumpMap&&(a.bumpMap.value=b.bumpMap,a.bumpScale.value=b.bumpScale),b.normalMap&&(a.normalMap.value=b.normalMap,a.normalScale.value.copy(b.normalScale)),b.displacementMap&&(a.displacementMap.value=b.displacementMap,a.displacementScale.value=b.displacementScale,a.displacementBias.value=b.displacementBias)}function I(a,b){a.ambientLightColor.needsUpdate=b,a.directionalLights.needsUpdate=b,a.pointLights.needsUpdate=b,a.spotLights.needsUpdate=b,a.rectAreaLights.needsUpdate=b,a.hemisphereLights.needsUpdate=b}function J(){var a=na;return a>=Fa.maxTextures&&console.warn("THREE.WebGLRenderer: Trying to use "+a+" texture units while this GPU supports only "+Fa.maxTextures),na+=1,a}console.log("THREE.WebGLRenderer",zb),a=a||{};var K=void 0!==a.canvas?a.canvas:document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),L=void 0!==a.context?a.context:null,M=void 0!==a.alpha&&a.alpha,N=void 0===a.depth||a.depth,O=void 0===a.stencil||a.stencil,P=void 0!==a.antialias&&a.antialias,Q=void 0===a.premultipliedAlpha||a.premultipliedAlpha,R=void 0!==a.preserveDrawingBuffer&&a.preserveDrawingBuffer,S=void 0!==a.powerPreference?a.powerPreference:"default",U=[],V=[],X=null,Z=[],$=[];this.domElement=K,this.context=null,this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.gammaInput=!1,this.gammaOutput=!1,this.physicallyCorrectLights=!1,this.toneMapping=rc,this.toneMappingExposure=1,this.toneMappingWhitePoint=1,this.maxMorphTargets=8,this.maxMorphNormals=4;var _=this,aa=!1,ba=null,ca=null,ga=-1,ha="",ia=null,ja=null,ka=new i,la=new i,ma=null,na=0,oa=K.width,pa=K.height,qa=1,ra=new i(0,0,oa,pa),sa=new i(0,0,oa,pa),ta=!1,ua=new da,va=new sb,wa=!1,xa=!1,ya=new d,za=new f,Aa={geometries:0,textures:0},Ba={frame:0,calls:0,vertices:0,faces:0,points:0};this.info={render:Ba,memory:Aa,programs:null};var Ca;try{var Da={alpha:M,depth:N,stencil:O,antialias:P,premultipliedAlpha:Q,preserveDrawingBuffer:R,powerPreference:S};if(K.addEventListener("webglcontextlost",e,!1),K.addEventListener("webglcontextrestored",g,!1),null===(Ca=L||K.getContext("webgl",Da)||K.getContext("experimental-webgl",Da)))throw null!==K.getContext("webgl")?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.");void 0===Ca.getShaderPrecisionFormat&&(Ca.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(a){console.error("THREE.WebGLRenderer: "+a.message)}var Ea,Fa,Ga,Ha,Ia,Ja,La,Ma,Na,Pa,Ua,Xa,Ya,Za,$a,_a,ab,bb;c();var cb=new qb(_);this.vr=cb;var db=new ea(_,Ma,Fa.maxTextureSize);this.shadowMap=db,this.getContext=function(){return Ca},this.getContextAttributes=function(){return Ca.getContextAttributes()},this.forceContextLoss=function(){var a=Ea.get("WEBGL_lose_context");a&&a.loseContext()},this.forceContextRestore=function(){var a=Ea.get("WEBGL_lose_context");a&&a.restoreContext()},this.getPixelRatio=function(){return qa},this.setPixelRatio=function(a){void 0!==a&&(qa=a,this.setSize(oa,pa,!1))},this.getSize=function(){return{width:oa,height:pa}},this.setSize=function(a,b,c){var d=cb.getDevice();if(d&&d.isPresenting)return void console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");oa=a,pa=b,K.width=a*qa,K.height=b*qa,!1!==c&&(K.style.width=a+"px",K.style.height=b+"px"),this.setViewport(0,0,a,b)},this.getDrawingBufferSize=function(){return{width:oa*qa,height:pa*qa}},this.setDrawingBufferSize=function(a,b,c){oa=a,pa=b,qa=c,K.width=a*c,K.height=b*c,this.setViewport(0,0,a,b)},this.setViewport=function(a,b,c,d){ra.set(a,pa-b-d,c,d),Ga.viewport(ka.copy(ra).multiplyScalar(qa))},this.setScissor=function(a,b,c,d){sa.set(a,pa-b-d,c,d),Ga.scissor(la.copy(sa).multiplyScalar(qa))},this.setScissorTest=function(a){Ga.setScissorTest(ta=a)},this.getClearColor=function(){return Xa.getClearColor()},this.setClearColor=function(){Xa.setClearColor.apply(Xa,arguments)},this.getClearAlpha=function(){return Xa.getClearAlpha()},this.setClearAlpha=function(){Xa.setClearAlpha.apply(Xa,arguments)},this.clear=function(a,b,c){var d=0;(void 0===a||a)&&(d|=Ca.COLOR_BUFFER_BIT),(void 0===b||b)&&(d|=Ca.DEPTH_BUFFER_BIT),(void 0===c||c)&&(d|=Ca.STENCIL_BUFFER_BIT),Ca.clear(d)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.clearTarget=function(a,b,c,d){this.setRenderTarget(a),this.clear(b,c,d)},this.dispose=function(){K.removeEventListener("webglcontextlost",e,!1),K.removeEventListener("webglcontextrestored",g,!1),Ua.dispose(),cb.dispose()},this.renderBufferImmediate=function(a,b,c){Ga.initAttributes();var d=Ha.get(a);a.hasPositions&&!d.position&&(d.position=Ca.createBuffer()),a.hasNormals&&!d.normal&&(d.normal=Ca.createBuffer()),a.hasUvs&&!d.uv&&(d.uv=Ca.createBuffer()),a.hasColors&&!d.color&&(d.color=Ca.createBuffer());var e=b.getAttributes();if(a.hasPositions&&(Ca.bindBuffer(Ca.ARRAY_BUFFER,d.position),Ca.bufferData(Ca.ARRAY_BUFFER,a.positionArray,Ca.DYNAMIC_DRAW),Ga.enableAttribute(e.position),Ca.vertexAttribPointer(e.position,3,Ca.FLOAT,!1,0,0)),a.hasNormals){if(Ca.bindBuffer(Ca.ARRAY_BUFFER,d.normal),!c.isMeshPhongMaterial&&!c.isMeshStandardMaterial&&!c.isMeshNormalMaterial&&!0===c.flatShading)for(var f=0,g=3*a.count;f<g;f+=9){var h=a.normalArray,i=(h[f+0]+h[f+3]+h[f+6])/3,j=(h[f+1]+h[f+4]+h[f+7])/3,k=(h[f+2]+h[f+5]+h[f+8])/3;h[f+0]=i,h[f+1]=j,h[f+2]=k,h[f+3]=i,h[f+4]=j,h[f+5]=k,h[f+6]=i,h[f+7]=j,h[f+8]=k}Ca.bufferData(Ca.ARRAY_BUFFER,a.normalArray,Ca.DYNAMIC_DRAW),Ga.enableAttribute(e.normal),Ca.vertexAttribPointer(e.normal,3,Ca.FLOAT,!1,0,0)}a.hasUvs&&c.map&&(Ca.bindBuffer(Ca.ARRAY_BUFFER,d.uv),Ca.bufferData(Ca.ARRAY_BUFFER,a.uvArray,Ca.DYNAMIC_DRAW),Ga.enableAttribute(e.uv),Ca.vertexAttribPointer(e.uv,2,Ca.FLOAT,!1,0,0)),a.hasColors&&c.vertexColors!==Kb&&(Ca.bindBuffer(Ca.ARRAY_BUFFER,d.color),Ca.bufferData(Ca.ARRAY_BUFFER,a.colorArray,Ca.DYNAMIC_DRAW),Ga.enableAttribute(e.color),Ca.vertexAttribPointer(e.color,3,Ca.FLOAT,!1,0,0)),Ga.disableUnusedAttributes(),Ca.drawArrays(Ca.TRIANGLES,0,a.count),a.count=0},this.renderBufferDirect=function(a,c,d,e,f,g){var h=f.isMesh&&f.matrixWorld.determinant()<0;Ga.setMaterial(e,h);var i=u(a,c,e,f),j=d.id+"_"+i.id+"_"+(!0===e.wireframe),k=!1;j!==ha&&(ha=j,k=!0),f.morphTargetInfluences&&(Ya.update(f,d,e,i),k=!0);var l=d.index,m=d.attributes.position,o=1;!0===e.wireframe&&(l=La.getWireframeAttribute(d),o=2);var p,q=Za;null!==l&&(p=Ja.get(l),q=$a,q.setIndex(p)),k&&(n(e,i,d),null!==l&&Ca.bindBuffer(Ca.ELEMENT_ARRAY_BUFFER,p.buffer));var r=0;null!==l?r=l.count:void 0!==m&&(r=m.count);var s=d.drawRange.start*o,t=d.drawRange.count*o,v=null!==g?g.start*o:0,w=null!==g?g.count*o:1/0,x=Math.max(s,v),y=Math.min(r,s+t,v+w)-1,z=Math.max(0,y-x+1);if(0!==z){if(f.isMesh)if(!0===e.wireframe)Ga.setLineWidth(e.wireframeLinewidth*b()),q.setMode(Ca.LINES);else switch(f.drawMode){case md:q.setMode(Ca.TRIANGLES);break;case nd:q.setMode(Ca.TRIANGLE_STRIP);break;case od:q.setMode(Ca.TRIANGLE_FAN)}else if(f.isLine){var A=e.linewidth;void 0===A&&(A=1),Ga.setLineWidth(A*b()),f.isLineSegments?q.setMode(Ca.LINES):f.isLineLoop?q.setMode(Ca.LINE_LOOP):q.setMode(Ca.LINE_STRIP)}else f.isPoints&&q.setMode(Ca.POINTS);d&&d.isInstancedBufferGeometry?d.maxInstancedCount>0&&q.renderInstances(d,x,z):q.render(x,z)}},this.compile=function(a,b){U.length=0,V.length=0,a.traverse(function(a){a.isLight&&(U.push(a),a.castShadow&&V.push(a))}),Na.setup(U,V,b),a.traverse(function(b){if(b.material)if(Array.isArray(b.material))for(var c=0;c<b.material.length;c++)t(b.material[c],a.fog,b);else t(b.material,a.fog,b)})};var eb=!1,fb=null;this.animate=function(a){fb=a,o()},this.render=function(a,b,c,d){if(!b||!b.isCamera)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(!aa){ha="",ga=-1,ia=null,!0===a.autoUpdate&&a.updateMatrixWorld(),null===b.parent&&b.updateMatrixWorld(),cb.enabled&&(b=cb.getCamera(b)),ya.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse),ua.setFromMatrix(ya),U.length=0,V.length=0,Z.length=0,$.length=0,xa=this.localClippingEnabled,wa=va.init(this.clippingPlanes,xa,b),X=Ua.get(a,b),X.init(),q(a,b,_.sortObjects),!0===_.sortObjects&&X.sort(),Ia.updateVideoTextures(),wa&&va.beginShadows(),db.render(V,a,b),Na.setup(U,V,b),wa&&va.endShadows(),Ba.frame++,Ba.calls=0,Ba.vertices=0,Ba.faces=0,Ba.points=0,void 0===c&&(c=null),this.setRenderTarget(c),Xa.render(X,a,b,d);var e=X.opaque,f=X.transparent;if(a.overrideMaterial){var g=a.overrideMaterial;e.length&&r(e,a,b,g),f.length&&r(f,a,b,g)}else e.length&&r(e,a,b),f.length&&r(f,a,b);ab.render(Z,a,b),_a.render($,a,b,ka),c&&Ia.updateRenderTargetMipmap(c),Ga.buffers.depth.setTest(!0),Ga.buffers.depth.setMask(!0),Ga.buffers.color.setMask(!0),Ga.setPolygonOffset(!1),cb.enabled&&cb.submitFrame()}},this.setFaceCulling=function(a,b){Ga.setCullFace(a),Ga.setFlipSided(b===Db)},this.allocTextureUnit=J,this.setTexture2D=function(){var a=!1;return function(b,c){b&&b.isWebGLRenderTarget&&(a||(console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."),a=!0),b=b.texture),Ia.setTexture2D(b,c)}}(),this.setTexture=function(){var a=!1;return function(b,c){a||(console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."),a=!0),Ia.setTexture2D(b,c)}}(),this.setTextureCube=function(){var a=!1;return function(b,c){b&&b.isWebGLRenderTargetCube&&(a||(console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."),a=!0),b=b.texture),b&&b.isCubeTexture||Array.isArray(b.image)&&6===b.image.length?Ia.setTextureCube(b,c):Ia.setTextureCubeDynamic(b,c)}}(),this.getRenderTarget=function(){return ba},this.setRenderTarget=function(a){ba=a,a&&void 0===Ha.get(a).__webglFramebuffer&&Ia.setupRenderTarget(a);var b=null,c=!1;if(a){var d=Ha.get(a).__webglFramebuffer;a.isWebGLRenderTargetCube?(b=d[a.activeCubeFace],c=!0):b=d,ka.copy(a.viewport),la.copy(a.scissor),ma=a.scissorTest}else ka.copy(ra).multiplyScalar(qa),la.copy(sa).multiplyScalar(qa),ma=ta;if(ca!==b&&(Ca.bindFramebuffer(Ca.FRAMEBUFFER,b),ca=b),Ga.viewport(ka),Ga.scissor(la),Ga.setScissorTest(ma),c){var e=Ha.get(a.texture);Ca.framebufferTexture2D(Ca.FRAMEBUFFER,Ca.COLOR_ATTACHMENT0,Ca.TEXTURE_CUBE_MAP_POSITIVE_X+a.activeCubeFace,e.__webglTexture,a.activeMipMapLevel)}},this.readRenderTargetPixels=function(a,b,c,d,e,f){if(!a||!a.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");var g=Ha.get(a).__webglFramebuffer;if(g){var h=!1;g!==ca&&(Ca.bindFramebuffer(Ca.FRAMEBUFFER,g),h=!0);try{var i=a.texture,j=i.format,k=i.type;if(j!==$c&&bb.convert(j)!==Ca.getParameter(Ca.IMPLEMENTATION_COLOR_READ_FORMAT))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!(k===Mc||bb.convert(k)===Ca.getParameter(Ca.IMPLEMENTATION_COLOR_READ_TYPE)||k===Sc&&(Ea.get("OES_texture_float")||Ea.get("WEBGL_color_buffer_float"))||k===Tc&&Ea.get("EXT_color_buffer_half_float")))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");Ca.checkFramebufferStatus(Ca.FRAMEBUFFER)===Ca.FRAMEBUFFER_COMPLETE?b>=0&&b<=a.width-d&&c>=0&&c<=a.height-e&&Ca.readPixels(b,c,d,e,bb.convert(j),bb.convert(k),f):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}finally{h&&Ca.bindFramebuffer(Ca.FRAMEBUFFER,ca)}}}}function vb(){ia.call(this),this.type="Scene",this.background=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0}function wb(a,b,c){var d=this,e=!1,f=0,g=0,h=void 0;this.onStart=void 0,this.onLoad=a,this.onProgress=b,this.onError=c,this.itemStart=function(a){g++,!1===e&&void 0!==d.onStart&&d.onStart(a,f,g),e=!0},this.itemEnd=function(a){f++,void 0!==d.onProgress&&d.onProgress(a,f,g),f===g&&(e=!1,void 0!==d.onLoad&&d.onLoad())},this.itemError=function(a){void 0!==d.onError&&d.onError(a)},this.resolveURL=function(a){return h?h(a):a},this.setURLModifier=function(a){return h=a,this}}function xb(a){this.manager=void 0!==a?a:Uf}function yb(a){this.manager=void 0!==a?a:Uf}void 0===Number.EPSILON&&(Number.EPSILON=Math.pow(2,-52)),void 0===Number.isInteger&&(Number.isInteger=function(a){return"number"==typeof a&&isFinite(a)&&Math.floor(a)===a}),void 0===Math.sign&&(Math.sign=function(a){return a<0?-1:a>0?1:+a}),"name"in Function.prototype==!1&&Object.defineProperty(Function.prototype,"name",{get:function(){return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]}}),void 0===Object.assign&&function(){Object.assign=function(a){if(void 0===a||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var d=arguments[c];if(void 0!==d&&null!==d)for(var e in d)Object.prototype.hasOwnProperty.call(d,e)&&(b[e]=d[e])}return b}}(),Object.assign(b.prototype,{addEventListener:function(a,b){void 0===this._listeners&&(this._listeners={});var c=this._listeners;void 0===c[a]&&(c[a]=[]),-1===c[a].indexOf(b)&&c[a].push(b)},hasEventListener:function(a,b){if(void 0===this._listeners)return!1;var c=this._listeners;return void 0!==c[a]&&-1!==c[a].indexOf(b)},removeEventListener:function(a,b){if(void 0!==this._listeners){var c=this._listeners,d=c[a];if(void 0!==d){var e=d.indexOf(b);-1!==e&&d.splice(e,1)}}},dispatchEvent:function(a){if(void 0!==this._listeners){var b=this._listeners,c=b[a.type];if(void 0!==c){a.target=this;for(var d=c.slice(0),e=0,f=d.length;e<f;e++)d[e].call(this,a)}}}});var zb="89",Ab=0,Bb=1,Cb=2,Db=0,Eb=1,Fb=2,Gb=0,Hb=1,Ib=2,Jb=1,Kb=0,Lb=0,Mb=1,Nb=2,Ob=3,Pb=4,Qb=5,Rb=100,Sb=101,Tb=102,Ub=103,Vb=104,Wb=200,Xb=201,Yb=202,Zb=203,$b=204,_b=205,ac=206,bc=207,cc=208,dc=209,ec=210,fc=0,gc=1,hc=2,ic=3,jc=4,kc=5,lc=6,mc=7,nc=0,oc=1,pc=2,qc=0,rc=1,sc=2,tc=3,uc=4,vc=300,wc=301,xc=302,yc=303,zc=304,Ac=305,Bc=306,Cc=307,Dc=1e3,Ec=1001,Fc=1002,Gc=1003,Hc=1004,Ic=1005,Jc=1006,Kc=1007,Lc=1008,Mc=1009,Nc=1010,Oc=1011,Pc=1012,Qc=1013,Rc=1014,Sc=1015,Tc=1016,Uc=1017,Vc=1018,Wc=1019,Xc=1020,Yc=1021,Zc=1022,$c=1023,_c=1024,ad=1025,bd=1026,cd=1027,dd=2001,ed=2002,fd=2003,gd=2004,hd=2100,id=2101,jd=2102,kd=2103,ld=2151,md=0,nd=1,od=2,pd=3e3,qd=3001,rd=3007,sd=3002,td=3004,ud=3005,vd=3006,wd=3200,xd=3201,yd={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,generateUUID:function(){for(var a=[],b=0;b<256;b++)a[b]=(b<16?"0":"")+b.toString(16).toUpperCase();return function(){var b=4294967295*Math.random()|0,c=4294967295*Math.random()|0,d=4294967295*Math.random()|0,e=4294967295*Math.random()|0;return a[255&b]+a[b>>8&255]+a[b>>16&255]+a[b>>24&255]+"-"+a[255&c]+a[c>>8&255]+"-"+a[c>>16&15|64]+a[c>>24&255]+"-"+a[63&d|128]+a[d>>8&255]+"-"+a[d>>16&255]+a[d>>24&255]+a[255&e]+a[e>>8&255]+a[e>>16&255]+a[e>>24&255]}}(),clamp:function(a,b,c){return Math.max(b,Math.min(c,a))},euclideanModulo:function(a,b){return(a%b+b)%b},mapLinear:function(a,b,c,d,e){return d+(a-b)*(e-d)/(c-b)},lerp:function(a,b,c){return(1-c)*a+c*b},smoothstep:function(a,b,c){return a<=b?0:a>=c?1:(a=(a-b)/(c-b))*a*(3-2*a)},smootherstep:function(a,b,c){return a<=b?0:a>=c?1:(a=(a-b)/(c-b))*a*a*(a*(6*a-15)+10)},randInt:function(a,b){return a+Math.floor(Math.random()*(b-a+1))},randFloat:function(a,b){return a+Math.random()*(b-a)},randFloatSpread:function(a){return a*(.5-Math.random())},degToRad:function(a){return a*yd.DEG2RAD},radToDeg:function(a){return a*yd.RAD2DEG},isPowerOfTwo:function(a){return 0==(a&a-1)&&0!==a},ceilPowerOfTwo:function(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))},floorPowerOfTwo:function(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}};Object.defineProperties(c.prototype,{width:{get:function(){return this.x},set:function(a){this.x=a}},height:{get:function(){return this.y},set:function(a){this.y=a}}}),Object.assign(c.prototype,{isVector2:!0,set:function(a,b){return this.x=a,this.y=b,this},setScalar:function(a){return this.x=a,this.y=a,this},setX:function(a){return this.x=a,this},setY:function(a){return this.y=a,this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;default:throw new Error("index is out of range: "+a)}return this},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+a)}},clone:function(){return new this.constructor(this.x,this.y)},copy:function(a){return this.x=a.x,this.y=a.y,this},add:function(a,b){return void 0!==b?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b)):(this.x+=a.x,this.y+=a.y,this)},addScalar:function(a){return this.x+=a,this.y+=a,this},addVectors:function(a,b){return this.x=a.x+b.x,this.y=a.y+b.y,this},addScaledVector:function(a,b){return this.x+=a.x*b,this.y+=a.y*b,this},sub:function(a,b){return void 0!==b?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b)):(this.x-=a.x,this.y-=a.y,this)},subScalar:function(a){return this.x-=a,this.y-=a,this},subVectors:function(a,b){return this.x=a.x-b.x,this.y=a.y-b.y,this},multiply:function(a){return this.x*=a.x,this.y*=a.y,this},multiplyScalar:function(a){return this.x*=a,this.y*=a,this},divide:function(a){return this.x/=a.x,this.y/=a.y,this},divideScalar:function(a){return this.multiplyScalar(1/a)},applyMatrix3:function(a){var b=this.x,c=this.y,d=a.elements;return this.x=d[0]*b+d[3]*c+d[6],this.y=d[1]*b+d[4]*c+d[7],this},min:function(a){return this.x=Math.min(this.x,a.x),this.y=Math.min(this.y,a.y),this},max:function(a){return this.x=Math.max(this.x,a.x),this.y=Math.max(this.y,a.y),this},clamp:function(a,b){return this.x=Math.max(a.x,Math.min(b.x,this.x)),this.y=Math.max(a.y,Math.min(b.y,this.y)),this},clampScalar:function(){var a=new c,b=new c;return function(c,d){return a.set(c,c),b.set(d,d),this.clamp(a,b)}}(),clampLength:function(a,b){var c=this.length();return this.divideScalar(c||1).multiplyScalar(Math.max(a,Math.min(b,c)))},floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},roundToZero:function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this},negate:function(){return this.x=-this.x,this.y=-this.y,this},dot:function(a){return this.x*a.x+this.y*a.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},manhattanLength:function(){return Math.abs(this.x)+Math.abs(this.y)},normalize:function(){return this.divideScalar(this.length()||1)},angle:function(){var a=Math.atan2(this.y,this.x);return a<0&&(a+=2*Math.PI),a},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=this.x-a.x,c=this.y-a.y;return b*b+c*c},manhattanDistanceTo:function(a){return Math.abs(this.x-a.x)+Math.abs(this.y-a.y)},setLength:function(a){return this.normalize().multiplyScalar(a)},lerp:function(a,b){return this.x+=(a.x-this.x)*b,this.y+=(a.y-this.y)*b,this},lerpVectors:function(a,b,c){return this.subVectors(b,a).multiplyScalar(c).add(a)},equals:function(a){return a.x===this.x&&a.y===this.y},fromArray:function(a,b){return void 0===b&&(b=0),this.x=a[b],this.y=a[b+1],this},toArray:function(a,b){return void 0===a&&(a=[]),void 0===b&&(b=0),a[b]=this.x,a[b+1]=this.y,a},fromBufferAttribute:function(a,b,c){return void 0!==c&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=a.getX(b),this.y=a.getY(b),this},rotateAround:function(a,b){var c=Math.cos(b),d=Math.sin(b),e=this.x-a.x,f=this.y-a.y;return this.x=e*c-f*d+a.x,this.y=e*d+f*c+a.y,this}}),Object.assign(d.prototype,{isMatrix4:!0,set:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=this.elements;return q[0]=a,q[4]=b,q[8]=c,q[12]=d,q[1]=e,q[5]=f,q[9]=g,q[13]=h,q[2]=i,q[6]=j,q[10]=k,q[14]=l,q[3]=m,q[7]=n,q[11]=o,q[15]=p,this},identity:function(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this},clone:function(){return(new d).fromArray(this.elements)},copy:function(a){var b=this.elements,c=a.elements;return b[0]=c[0],b[1]=c[1],b[2]=c[2],b[3]=c[3],b[4]=c[4],b[5]=c[5],b[6]=c[6],b[7]=c[7],b[8]=c[8],b[9]=c[9],b[10]=c[10],b[11]=c[11],b[12]=c[12],b[13]=c[13],b[14]=c[14],b[15]=c[15],this},copyPosition:function(a){var b=this.elements,c=a.elements;return b[12]=c[12],b[13]=c[13],b[14]=c[14],this},extractBasis:function(a,b,c){return a.setFromMatrixColumn(this,0),b.setFromMatrixColumn(this,1),c.setFromMatrixColumn(this,2),this},makeBasis:function(a,b,c){return this.set(a.x,b.x,c.x,0,a.y,b.y,c.y,0,a.z,b.z,c.z,0,0,0,0,1),this},extractRotation:function(){var a=new f;return function(b){var c=this.elements,d=b.elements,e=1/a.setFromMatrixColumn(b,0).length(),f=1/a.setFromMatrixColumn(b,1).length(),g=1/a.setFromMatrixColumn(b,2).length();return c[0]=d[0]*e,c[1]=d[1]*e,c[2]=d[2]*e,c[4]=d[4]*f,c[5]=d[5]*f,c[6]=d[6]*f,c[8]=d[8]*g,c[9]=d[9]*g,c[10]=d[10]*g,this}}(),makeRotationFromEuler:function(a){a&&a.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");var b=this.elements,c=a.x,d=a.y,e=a.z,f=Math.cos(c),g=Math.sin(c),h=Math.cos(d),i=Math.sin(d),j=Math.cos(e),k=Math.sin(e);if("XYZ"===a.order){var l=f*j,m=f*k,n=g*j,o=g*k;b[0]=h*j,b[4]=-h*k,b[8]=i,b[1]=m+n*i,b[5]=l-o*i,b[9]=-g*h,b[2]=o-l*i,b[6]=n+m*i,b[10]=f*h}else if("YXZ"===a.order){var p=h*j,q=h*k,r=i*j,s=i*k;b[0]=p+s*g,b[4]=r*g-q,b[8]=f*i,b[1]=f*k,b[5]=f*j,b[9]=-g,b[2]=q*g-r,b[6]=s+p*g,b[10]=f*h}else if("ZXY"===a.order){var p=h*j,q=h*k,r=i*j,s=i*k;b[0]=p-s*g,b[4]=-f*k,b[8]=r+q*g,b[1]=q+r*g,b[5]=f*j,b[9]=s-p*g,b[2]=-f*i,b[6]=g,b[10]=f*h}else if("ZYX"===a.order){var l=f*j,m=f*k,n=g*j,o=g*k;b[0]=h*j,b[4]=n*i-m,b[8]=l*i+o,b[1]=h*k,b[5]=o*i+l,b[9]=m*i-n,b[2]=-i,b[6]=g*h,b[10]=f*h}else if("YZX"===a.order){var t=f*h,u=f*i,v=g*h,w=g*i;b[0]=h*j,b[4]=w-t*k,b[8]=v*k+u,b[1]=k,b[5]=f*j,b[9]=-g*j,b[2]=-i*j,b[6]=u*k+v,b[10]=t-w*k}else if("XZY"===a.order){var t=f*h,u=f*i,v=g*h,w=g*i;b[0]=h*j,b[4]=-k,b[8]=i*j,b[1]=t*k+w,b[5]=f*j,b[9]=u*k-v,b[2]=v*k-u,b[6]=g*j,b[10]=w*k+t}return b[3]=0,b[7]=0,b[11]=0,b[12]=0,b[13]=0,b[14]=0,b[15]=1,this},makeRotationFromQuaternion:function(a){var b=this.elements,c=a._x,d=a._y,e=a._z,f=a._w,g=c+c,h=d+d,i=e+e,j=c*g,k=c*h,l=c*i,m=d*h,n=d*i,o=e*i,p=f*g,q=f*h,r=f*i;return b[0]=1-(m+o),b[4]=k-r,b[8]=l+q,b[1]=k+r,b[5]=1-(j+o),b[9]=n-p,b[2]=l-q,b[6]=n+p,b[10]=1-(j+m),b[3]=0,b[7]=0,b[11]=0,b[12]=0,b[13]=0,b[14]=0,b[15]=1,this},lookAt:function(){var a=new f,b=new f,c=new f;return function(d,e,f){var g=this.elements;return c.subVectors(d,e),0===c.lengthSq()&&(c.z=1),c.normalize(),a.crossVectors(f,c),0===a.lengthSq()&&(1===Math.abs(f.z)?c.x+=1e-4:c.z+=1e-4,c.normalize(),a.crossVectors(f,c)),a.normalize(),b.crossVectors(c,a),g[0]=a.x,g[4]=b.x,g[8]=c.x,g[1]=a.y,g[5]=b.y,g[9]=c.y,g[2]=a.z,g[6]=b.z,g[10]=c.z,this}}(),multiply:function(a,b){return void 0!==b?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(a,b)):this.multiplyMatrices(this,a)},premultiply:function(a){return this.multiplyMatrices(a,this)},multiplyMatrices:function(a,b){var c=a.elements,d=b.elements,e=this.elements,f=c[0],g=c[4],h=c[8],i=c[12],j=c[1],k=c[5],l=c[9],m=c[13],n=c[2],o=c[6],p=c[10],q=c[14],r=c[3],s=c[7],t=c[11],u=c[15],v=d[0],w=d[4],x=d[8],y=d[12],z=d[1],A=d[5],B=d[9],C=d[13],D=d[2],E=d[6],F=d[10],G=d[14],H=d[3],I=d[7],J=d[11],K=d[15];return e[0]=f*v+g*z+h*D+i*H,e[4]=f*w+g*A+h*E+i*I,e[8]=f*x+g*B+h*F+i*J,e[12]=f*y+g*C+h*G+i*K,e[1]=j*v+k*z+l*D+m*H,e[5]=j*w+k*A+l*E+m*I,e[9]=j*x+k*B+l*F+m*J,e[13]=j*y+k*C+l*G+m*K,e[2]=n*v+o*z+p*D+q*H,e[6]=n*w+o*A+p*E+q*I,e[10]=n*x+o*B+p*F+q*J,e[14]=n*y+o*C+p*G+q*K,e[3]=r*v+s*z+t*D+u*H,e[7]=r*w+s*A+t*E+u*I,e[11]=r*x+s*B+t*F+u*J,e[15]=r*y+s*C+t*G+u*K,this},multiplyScalar:function(a){var b=this.elements;return b[0]*=a,b[4]*=a,b[8]*=a,b[12]*=a,b[1]*=a,b[5]*=a,b[9]*=a,b[13]*=a,b[2]*=a,b[6]*=a,b[10]*=a,b[14]*=a,b[3]*=a,b[7]*=a,b[11]*=a,b[15]*=a,this},applyToBufferAttribute:function(){var a=new f;return function(b){for(var c=0,d=b.count;c<d;c++)a.x=b.getX(c),a.y=b.getY(c),a.z=b.getZ(c),a.applyMatrix4(this),b.setXYZ(c,a.x,a.y,a.z);return b}}(),determinant:function(){var a=this.elements,b=a[0],c=a[4],d=a[8],e=a[12],f=a[1],g=a[5],h=a[9],i=a[13],j=a[2],k=a[6],l=a[10],m=a[14];return a[3]*(+e*h*k-d*i*k-e*g*l+c*i*l+d*g*m-c*h*m)+a[7]*(+b*h*m-b*i*l+e*f*l-d*f*m+d*i*j-e*h*j)+a[11]*(+b*i*k-b*g*m-e*f*k+c*f*m+e*g*j-c*i*j)+a[15]*(-d*g*j-b*h*k+b*g*l+d*f*k-c*f*l+c*h*j)},transpose:function(){var a,b=this.elements;return a=b[1],b[1]=b[4],b[4]=a,a=b[2],b[2]=b[8],b[8]=a,a=b[6],b[6]=b[9],b[9]=a,a=b[3],b[3]=b[12],b[12]=a,a=b[7],b[7]=b[13],b[13]=a,a=b[11],b[11]=b[14],b[14]=a,this},setPosition:function(a){var b=this.elements;return b[12]=a.x,b[13]=a.y,b[14]=a.z,this},getInverse:function(a,b){var c=this.elements,d=a.elements,e=d[0],f=d[1],g=d[2],h=d[3],i=d[4],j=d[5],k=d[6],l=d[7],m=d[8],n=d[9],o=d[10],p=d[11],q=d[12],r=d[13],s=d[14],t=d[15],u=n*s*l-r*o*l+r*k*p-j*s*p-n*k*t+j*o*t,v=q*o*l-m*s*l-q*k*p+i*s*p+m*k*t-i*o*t,w=m*r*l-q*n*l+q*j*p-i*r*p-m*j*t+i*n*t,x=q*n*k-m*r*k-q*j*o+i*r*o+m*j*s-i*n*s,y=e*u+f*v+g*w+h*x;if(0===y){var z="THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";if(!0===b)throw new Error(z);return console.warn(z),this.identity()}var A=1/y;return c[0]=u*A,c[1]=(r*o*h-n*s*h-r*g*p+f*s*p+n*g*t-f*o*t)*A,c[2]=(j*s*h-r*k*h+r*g*l-f*s*l-j*g*t+f*k*t)*A,c[3]=(n*k*h-j*o*h-n*g*l+f*o*l+j*g*p-f*k*p)*A,c[4]=v*A,c[5]=(m*s*h-q*o*h+q*g*p-e*s*p-m*g*t+e*o*t)*A,c[6]=(q*k*h-i*s*h-q*g*l+e*s*l+i*g*t-e*k*t)*A,c[7]=(i*o*h-m*k*h+m*g*l-e*o*l-i*g*p+e*k*p)*A,c[8]=w*A,c[9]=(q*n*h-m*r*h-q*f*p+e*r*p+m*f*t-e*n*t)*A,c[10]=(i*r*h-q*j*h+q*f*l-e*r*l-i*f*t+e*j*t)*A,c[11]=(m*j*h-i*n*h-m*f*l+e*n*l+i*f*p-e*j*p)*A,c[12]=x*A,c[13]=(m*r*g-q*n*g+q*f*o-e*r*o-m*f*s+e*n*s)*A,c[14]=(q*j*g-i*r*g-q*f*k+e*r*k+i*f*s-e*j*s)*A,c[15]=(i*n*g-m*j*g+m*f*k-e*n*k-i*f*o+e*j*o)*A,this},scale:function(a){var b=this.elements,c=a.x,d=a.y,e=a.z;return b[0]*=c,b[4]*=d,b[8]*=e,b[1]*=c,b[5]*=d,b[9]*=e,b[2]*=c,b[6]*=d,b[10]*=e,b[3]*=c,b[7]*=d,b[11]*=e,this},getMaxScaleOnAxis:function(){var a=this.elements,b=a[0]*a[0]+a[1]*a[1]+a[2]*a[2],c=a[4]*a[4]+a[5]*a[5]+a[6]*a[6],d=a[8]*a[8]+a[9]*a[9]+a[10]*a[10];return Math.sqrt(Math.max(b,c,d))},makeTranslation:function(a,b,c){return this.set(1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1),this},makeRotationX:function(a){var b=Math.cos(a),c=Math.sin(a);return this.set(1,0,0,0,0,b,-c,0,0,c,b,0,0,0,0,1),this},makeRotationY:function(a){var b=Math.cos(a),c=Math.sin(a);return this.set(b,0,c,0,0,1,0,0,-c,0,b,0,0,0,0,1),this},makeRotationZ:function(a){var b=Math.cos(a),c=Math.sin(a);return this.set(b,-c,0,0,c,b,0,0,0,0,1,0,0,0,0,1),this},makeRotationAxis:function(a,b){var c=Math.cos(b),d=Math.sin(b),e=1-c,f=a.x,g=a.y,h=a.z,i=e*f,j=e*g;return this.set(i*f+c,i*g-d*h,i*h+d*g,0,i*g+d*h,j*g+c,j*h-d*f,0,i*h-d*g,j*h+d*f,e*h*h+c,0,0,0,0,1),this},makeScale:function(a,b,c){return this.set(a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,1),this},makeShear:function(a,b,c){return this.set(1,b,c,0,a,1,c,0,a,b,1,0,0,0,0,1),this},compose:function(a,b,c){return this.makeRotationFromQuaternion(b),this.scale(c),this.setPosition(a),this},decompose:function(){var a=new f,b=new d;return function(c,d,e){var f=this.elements,g=a.set(f[0],f[1],f[2]).length(),h=a.set(f[4],f[5],f[6]).length(),i=a.set(f[8],f[9],f[10]).length();this.determinant()<0&&(g=-g),c.x=f[12],c.y=f[13],c.z=f[14],b.copy(this);var j=1/g,k=1/h,l=1/i;return b.elements[0]*=j,b.elements[1]*=j,b.elements[2]*=j,b.elements[4]*=k,b.elements[5]*=k,b.elements[6]*=k,b.elements[8]*=l,b.elements[9]*=l,b.elements[10]*=l,d.setFromRotationMatrix(b),e.x=g,e.y=h,e.z=i,this}}(),makePerspective:function(a,b,c,d,e,f){void 0===f&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");var g=this.elements,h=2*e/(b-a),i=2*e/(c-d),j=(b+a)/(b-a),k=(c+d)/(c-d),l=-(f+e)/(f-e),m=-2*f*e/(f-e);return g[0]=h,g[4]=0,g[8]=j,g[12]=0,g[1]=0,g[5]=i,g[9]=k,g[13]=0,g[2]=0,g[6]=0,g[10]=l,g[14]=m,g[3]=0,g[7]=0,g[11]=-1,g[15]=0,this},makeOrthographic:function(a,b,c,d,e,f){var g=this.elements,h=1/(b-a),i=1/(c-d),j=1/(f-e),k=(b+a)*h,l=(c+d)*i,m=(f+e)*j;return g[0]=2*h,g[4]=0,g[8]=0,g[12]=-k,g[1]=0,g[5]=2*i,g[9]=0,g[13]=-l,g[2]=0,g[6]=0,g[10]=-2*j,g[14]=-m,g[3]=0,g[7]=0,g[11]=0,g[15]=1,this},equals:function(a){for(var b=this.elements,c=a.elements,d=0;d<16;d++)if(b[d]!==c[d])return!1;return!0},fromArray:function(a,b){void 0===b&&(b=0);for(var c=0;c<16;c++)this.elements[c]=a[c+b];return this},toArray:function(a,b){void 0===a&&(a=[]),void 0===b&&(b=0);var c=this.elements;return a[b]=c[0],a[b+1]=c[1],a[b+2]=c[2],a[b+3]=c[3],a[b+4]=c[4],a[b+5]=c[5],a[b+6]=c[6],a[b+7]=c[7],a[b+8]=c[8],a[b+9]=c[9],a[b+10]=c[10],a[b+11]=c[11],a[b+12]=c[12],a[b+13]=c[13],a[b+14]=c[14],a[b+15]=c[15],a}}),Object.assign(e,{slerp:function(a,b,c,d){return c.copy(a).slerp(b,d)},slerpFlat:function(a,b,c,d,e,f,g){var h=c[d+0],i=c[d+1],j=c[d+2],k=c[d+3],l=e[f+0],m=e[f+1],n=e[f+2],o=e[f+3];if(k!==o||h!==l||i!==m||j!==n){var p=1-g,q=h*l+i*m+j*n+k*o,r=q>=0?1:-1,s=1-q*q;if(s>Number.EPSILON){var t=Math.sqrt(s),u=Math.atan2(t,q*r);p=Math.sin(p*u)/t,g=Math.sin(g*u)/t}var v=g*r;if(h=h*p+l*v,i=i*p+m*v,j=j*p+n*v,k=k*p+o*v,p===1-g){var w=1/Math.sqrt(h*h+i*i+j*j+k*k);h*=w,i*=w,j*=w,k*=w}}a[b]=h,a[b+1]=i,a[b+2]=j,a[b+3]=k}}),Object.defineProperties(e.prototype,{x:{get:function(){return this._x},set:function(a){this._x=a,this.onChangeCallback()}},y:{get:function(){return this._y},set:function(a){this._y=a,this.onChangeCallback()}},z:{get:function(){return this._z},set:function(a){this._z=a,this.onChangeCallback()}},w:{get:function(){return this._w},set:function(a){this._w=a,this.onChangeCallback()}}}),Object.assign(e.prototype,{set:function(a,b,c,d){return this._x=a,this._y=b,this._z=c,this._w=d,this.onChangeCallback(),this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._w)},copy:function(a){return this._x=a.x,this._y=a.y,this._z=a.z,this._w=a.w,this.onChangeCallback(),this},setFromEuler:function(a,b){if(!a||!a.isEuler)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var c=a._x,d=a._y,e=a._z,f=a.order,g=Math.cos,h=Math.sin,i=g(c/2),j=g(d/2),k=g(e/2),l=h(c/2),m=h(d/2),n=h(e/2);return"XYZ"===f?(this._x=l*j*k+i*m*n,this._y=i*m*k-l*j*n,this._z=i*j*n+l*m*k,this._w=i*j*k-l*m*n):"YXZ"===f?(this._x=l*j*k+i*m*n,this._y=i*m*k-l*j*n,this._z=i*j*n-l*m*k,this._w=i*j*k+l*m*n):"ZXY"===f?(this._x=l*j*k-i*m*n,this._y=i*m*k+l*j*n,this._z=i*j*n+l*m*k,this._w=i*j*k-l*m*n):"ZYX"===f?(this._x=l*j*k-i*m*n,this._y=i*m*k+l*j*n,this._z=i*j*n-l*m*k,this._w=i*j*k+l*m*n):"YZX"===f?(this._x=l*j*k+i*m*n,this._y=i*m*k+l*j*n,this._z=i*j*n-l*m*k,this._w=i*j*k-l*m*n):"XZY"===f&&(this._x=l*j*k-i*m*n,this._y=i*m*k-l*j*n,this._z=i*j*n+l*m*k,this._w=i*j*k+l*m*n),!1!==b&&this.onChangeCallback(),this},setFromAxisAngle:function(a,b){var c=b/2,d=Math.sin(c);return this._x=a.x*d,this._y=a.y*d,this._z=a.z*d,this._w=Math.cos(c),this.onChangeCallback(),this},setFromRotationMatrix:function(a){var b,c=a.elements,d=c[0],e=c[4],f=c[8],g=c[1],h=c[5],i=c[9],j=c[2],k=c[6],l=c[10],m=d+h+l;return m>0?(b=.5/Math.sqrt(m+1),this._w=.25/b,this._x=(k-i)*b,this._y=(f-j)*b,this._z=(g-e)*b):d>h&&d>l?(b=2*Math.sqrt(1+d-h-l),this._w=(k-i)/b,this._x=.25*b,this._y=(e+g)/b,this._z=(f+j)/b):h>l?(b=2*Math.sqrt(1+h-d-l),this._w=(f-j)/b,this._x=(e+g)/b,this._y=.25*b,this._z=(i+k)/b):(b=2*Math.sqrt(1+l-d-h),this._w=(g-e)/b,this._x=(f+j)/b,this._y=(i+k)/b,this._z=.25*b),this.onChangeCallback(),this},setFromUnitVectors:function(){var a,b=new f;return function(c,d){return void 0===b&&(b=new f),a=c.dot(d)+1,a<1e-6?(a=0,Math.abs(c.x)>Math.abs(c.z)?b.set(-c.y,c.x,0):b.set(0,-c.z,c.y)):b.crossVectors(c,d),this._x=b.x,this._y=b.y,this._z=b.z,this._w=a,this.normalize()}}(),inverse:function(){return this.conjugate().normalize()},conjugate:function(){return this._x*=-1,this._y*=-1,this._z*=-1,this.onChangeCallback(),this},dot:function(a){return this._x*a._x+this._y*a._y+this._z*a._z+this._w*a._w},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function(){var a=this.length();return 0===a?(this._x=0,this._y=0,this._z=0,this._w=1):(a=1/a,this._x=this._x*a,this._y=this._y*a,this._z=this._z*a,this._w=this._w*a),this.onChangeCallback(),this},multiply:function(a,b){return void 0!==b?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(a,b)):this.multiplyQuaternions(this,a)},premultiply:function(a){return this.multiplyQuaternions(a,this)},multiplyQuaternions:function(a,b){var c=a._x,d=a._y,e=a._z,f=a._w,g=b._x,h=b._y,i=b._z,j=b._w;return this._x=c*j+f*g+d*i-e*h,this._y=d*j+f*h+e*g-c*i,this._z=e*j+f*i+c*h-d*g,this._w=f*j-c*g-d*h-e*i,this.onChangeCallback(),this},slerp:function(a,b){if(0===b)return this;if(1===b)return this.copy(a);var c=this._x,d=this._y,e=this._z,f=this._w,g=f*a._w+c*a._x+d*a._y+e*a._z;if(g<0?(this._w=-a._w,this._x=-a._x,this._y=-a._y,this._z=-a._z,g=-g):this.copy(a),g>=1)return this._w=f,this._x=c,this._y=d,this._z=e,this;var h=Math.sqrt(1-g*g);if(Math.abs(h)<.001)return this._w=.5*(f+this._w),this._x=.5*(c+this._x),this._y=.5*(d+this._y),this._z=.5*(e+this._z),this;var i=Math.atan2(h,g),j=Math.sin((1-b)*i)/h,k=Math.sin(b*i)/h;return this._w=f*j+this._w*k,this._x=c*j+this._x*k,this._y=d*j+this._y*k,this._z=e*j+this._z*k,this.onChangeCallback(),this},equals:function(a){return a._x===this._x&&a._y===this._y&&a._z===this._z&&a._w===this._w},fromArray:function(a,b){return void 0===b&&(b=0),this._x=a[b],this._y=a[b+1],this._z=a[b+2],this._w=a[b+3],this.onChangeCallback(),this},toArray:function(a,b){return void 0===a&&(a=[]),void 0===b&&(b=0),a[b]=this._x,a[b+1]=this._y,a[b+2]=this._z,a[b+3]=this._w,a},onChange:function(a){return this.onChangeCallback=a,this},onChangeCallback:function(){}}),Object.assign(f.prototype,{isVector3:!0,set:function(a,b,c){return this.x=a,this.y=b,this.z=c,this},setScalar:function(a){return this.x=a,this.y=a,this.z=a,this},setX:function(a){return this.x=a,this},setY:function(a){return this.y=a,this},setZ:function(a){return this.z=a,this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;case 2:this.z=b;break;default:throw new Error("index is out of range: "+a)}return this},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+a)}},clone:function(){return new this.constructor(this.x,this.y,this.z)},copy:function(a){return this.x=a.x,this.y=a.y,this.z=a.z,this},add:function(a,b){return void 0!==b?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b)):(this.x+=a.x,this.y+=a.y,this.z+=a.z,this)},addScalar:function(a){return this.x+=a,this.y+=a,this.z+=a,this},addVectors:function(a,b){return this.x=a.x+b.x,this.y=a.y+b.y,this.z=a.z+b.z,this},addScaledVector:function(a,b){return this.x+=a.x*b,this.y+=a.y*b,this.z+=a.z*b,this},sub:function(a,b){return void 0!==b?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b)):(this.x-=a.x,this.y-=a.y,this.z-=a.z,this)},subScalar:function(a){return this.x-=a,this.y-=a,this.z-=a,this},subVectors:function(a,b){return this.x=a.x-b.x,this.y=a.y-b.y,this.z=a.z-b.z,this},multiply:function(a,b){return void 0!==b?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(a,b)):(this.x*=a.x,this.y*=a.y,this.z*=a.z,this)},multiplyScalar:function(a){return this.x*=a,this.y*=a,this.z*=a,this},multiplyVectors:function(a,b){return this.x=a.x*b.x,this.y=a.y*b.y,this.z=a.z*b.z,this},applyEuler:function(){var a=new e;return function(b){return b&&b.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(a.setFromEuler(b))}}(),applyAxisAngle:function(){var a=new e;return function(b,c){return this.applyQuaternion(a.setFromAxisAngle(b,c))}}(),applyMatrix3:function(a){var b=this.x,c=this.y,d=this.z,e=a.elements;return this.x=e[0]*b+e[3]*c+e[6]*d,this.y=e[1]*b+e[4]*c+e[7]*d,this.z=e[2]*b+e[5]*c+e[8]*d,this},applyMatrix4:function(a){var b=this.x,c=this.y,d=this.z,e=a.elements,f=1/(e[3]*b+e[7]*c+e[11]*d+e[15]);return this.x=(e[0]*b+e[4]*c+e[8]*d+e[12])*f,this.y=(e[1]*b+e[5]*c+e[9]*d+e[13])*f,this.z=(e[2]*b+e[6]*c+e[10]*d+e[14])*f,this},applyQuaternion:function(a){var b=this.x,c=this.y,d=this.z,e=a.x,f=a.y,g=a.z,h=a.w,i=h*b+f*d-g*c,j=h*c+g*b-e*d,k=h*d+e*c-f*b,l=-e*b-f*c-g*d;return this.x=i*h+l*-e+j*-g-k*-f,this.y=j*h+l*-f+k*-e-i*-g,this.z=k*h+l*-g+i*-f-j*-e,this},project:function(){var a=new d;return function(b){return a.multiplyMatrices(b.projectionMatrix,a.getInverse(b.matrixWorld)),this.applyMatrix4(a)}}(),unproject:function(){var a=new d;return function(b){return a.multiplyMatrices(b.matrixWorld,a.getInverse(b.projectionMatrix)),this.applyMatrix4(a)}}(),transformDirection:function(a){var b=this.x,c=this.y,d=this.z,e=a.elements;return this.x=e[0]*b+e[4]*c+e[8]*d,this.y=e[1]*b+e[5]*c+e[9]*d,this.z=e[2]*b+e[6]*c+e[10]*d,this.normalize()},divide:function(a){return this.x/=a.x,this.y/=a.y,this.z/=a.z,this},divideScalar:function(a){return this.multiplyScalar(1/a)},min:function(a){return this.x=Math.min(this.x,a.x),this.y=Math.min(this.y,a.y),this.z=Math.min(this.z,a.z),this},max:function(a){return this.x=Math.max(this.x,a.x),this.y=Math.max(this.y,a.y),this.z=Math.max(this.z,a.z),this},clamp:function(a,b){return this.x=Math.max(a.x,Math.min(b.x,this.x)),this.y=Math.max(a.y,Math.min(b.y,this.y)),this.z=Math.max(a.z,Math.min(b.z,this.z)),this},clampScalar:function(){var a=new f,b=new f;return function(c,d){return a.set(c,c,c),b.set(d,d,d),this.clamp(a,b)}}(),clampLength:function(a,b){var c=this.length();return this.divideScalar(c||1).multiplyScalar(Math.max(a,Math.min(b,c)))},floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this},ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this},round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this},roundToZero:function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this},negate:function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},manhattanLength:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)},normalize:function(){return this.divideScalar(this.length()||1)},setLength:function(a){return this.normalize().multiplyScalar(a)},lerp:function(a,b){return this.x+=(a.x-this.x)*b,this.y+=(a.y-this.y)*b,this.z+=(a.z-this.z)*b,this},lerpVectors:function(a,b,c){return this.subVectors(b,a).multiplyScalar(c).add(a)},cross:function(a,b){return void 0!==b?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(a,b)):this.crossVectors(this,a)},crossVectors:function(a,b){var c=a.x,d=a.y,e=a.z,f=b.x,g=b.y,h=b.z;return this.x=d*h-e*g,this.y=e*f-c*h,this.z=c*g-d*f,this},projectOnVector:function(a){var b=a.dot(this)/a.lengthSq();return this.copy(a).multiplyScalar(b)},projectOnPlane:function(){var a=new f;return function(b){return a.copy(this).projectOnVector(b),this.sub(a)}}(),reflect:function(){var a=new f;return function(b){return this.sub(a.copy(b).multiplyScalar(2*this.dot(b)))}}(),angleTo:function(a){var b=this.dot(a)/Math.sqrt(this.lengthSq()*a.lengthSq());return Math.acos(yd.clamp(b,-1,1))},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=this.x-a.x,c=this.y-a.y,d=this.z-a.z;return b*b+c*c+d*d},manhattanDistanceTo:function(a){return Math.abs(this.x-a.x)+Math.abs(this.y-a.y)+Math.abs(this.z-a.z)},setFromSpherical:function(a){var b=Math.sin(a.phi)*a.radius;return this.x=b*Math.sin(a.theta),this.y=Math.cos(a.phi)*a.radius,this.z=b*Math.cos(a.theta),this},setFromCylindrical:function(a){return this.x=a.radius*Math.sin(a.theta),this.y=a.y,this.z=a.radius*Math.cos(a.theta),this},setFromMatrixPosition:function(a){var b=a.elements;return this.x=b[12],this.y=b[13],this.z=b[14],this},setFromMatrixScale:function(a){var b=this.setFromMatrixColumn(a,0).length(),c=this.setFromMatrixColumn(a,1).length(),d=this.setFromMatrixColumn(a,2).length();return this.x=b,this.y=c,this.z=d,this},setFromMatrixColumn:function(a,b){return this.fromArray(a.elements,4*b)},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z},fromArray:function(a,b){return void 0===b&&(b=0),this.x=a[b],this.y=a[b+1],this.z=a[b+2],this},toArray:function(a,b){return void 0===a&&(a=[]),void 0===b&&(b=0),a[b]=this.x,a[b+1]=this.y,a[b+2]=this.z,a},fromBufferAttribute:function(a,b,c){return void 0!==c&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=a.getX(b),this.y=a.getY(b),this.z=a.getZ(b),this}}),Object.assign(g.prototype,{isMatrix3:!0,set:function(a,b,c,d,e,f,g,h,i){var j=this.elements;return j[0]=a,j[1]=d,j[2]=g,j[3]=b,j[4]=e,j[5]=h,j[6]=c,j[7]=f,j[8]=i,this},identity:function(){return this.set(1,0,0,0,1,0,0,0,1),this},clone:function(){return(new this.constructor).fromArray(this.elements)},copy:function(a){var b=this.elements,c=a.elements;return b[0]=c[0],b[1]=c[1],b[2]=c[2],b[3]=c[3],b[4]=c[4],b[5]=c[5],b[6]=c[6],b[7]=c[7],b[8]=c[8],this},setFromMatrix4:function(a){var b=a.elements;return this.set(b[0],b[4],b[8],b[1],b[5],b[9],b[2],b[6],b[10]),this},applyToBufferAttribute:function(){var a=new f;return function(b){for(var c=0,d=b.count;c<d;c++)a.x=b.getX(c),a.y=b.getY(c),a.z=b.getZ(c),a.applyMatrix3(this),b.setXYZ(c,a.x,a.y,a.z);return b}}(),multiply:function(a){return this.multiplyMatrices(this,a)},premultiply:function(a){return this.multiplyMatrices(a,this)},multiplyMatrices:function(a,b){var c=a.elements,d=b.elements,e=this.elements,f=c[0],g=c[3],h=c[6],i=c[1],j=c[4],k=c[7],l=c[2],m=c[5],n=c[8],o=d[0],p=d[3],q=d[6],r=d[1],s=d[4],t=d[7],u=d[2],v=d[5],w=d[8];return e[0]=f*o+g*r+h*u,e[3]=f*p+g*s+h*v,e[6]=f*q+g*t+h*w,e[1]=i*o+j*r+k*u,e[4]=i*p+j*s+k*v,e[7]=i*q+j*t+k*w,e[2]=l*o+m*r+n*u,e[5]=l*p+m*s+n*v,e[8]=l*q+m*t+n*w,this},multiplyScalar:function(a){var b=this.elements;return b[0]*=a,b[3]*=a,b[6]*=a,b[1]*=a,b[4]*=a,b[7]*=a,b[2]*=a,b[5]*=a,b[8]*=a,this},determinant:function(){var a=this.elements,b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],g=a[5],h=a[6],i=a[7],j=a[8];return b*f*j-b*g*i-c*e*j+c*g*h+d*e*i-d*f*h},getInverse:function(a,b){a&&a.isMatrix4&&console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");var c=a.elements,d=this.elements,e=c[0],f=c[1],g=c[2],h=c[3],i=c[4],j=c[5],k=c[6],l=c[7],m=c[8],n=m*i-j*l,o=j*k-m*h,p=l*h-i*k,q=e*n+f*o+g*p;if(0===q){var r="THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";if(!0===b)throw new Error(r);return console.warn(r),this.identity()}var s=1/q;return d[0]=n*s,d[1]=(g*l-m*f)*s,d[2]=(j*f-g*i)*s,d[3]=o*s,d[4]=(m*e-g*k)*s,d[5]=(g*h-j*e)*s,d[6]=p*s,d[7]=(f*k-l*e)*s,d[8]=(i*e-f*h)*s,this},transpose:function(){var a,b=this.elements;return a=b[1],b[1]=b[3],b[3]=a,a=b[2],b[2]=b[6],b[6]=a,a=b[5],b[5]=b[7],b[7]=a,this},getNormalMatrix:function(a){return this.setFromMatrix4(a).getInverse(this).transpose()},transposeIntoArray:function(a){var b=this.elements;return a[0]=b[0],a[1]=b[3],a[2]=b[6],a[3]=b[1],a[4]=b[4],a[5]=b[7],a[6]=b[2],a[7]=b[5],a[8]=b[8],this},setUvTransform:function(a,b,c,d,e,f,g){var h=Math.cos(e),i=Math.sin(e);this.set(c*h,c*i,-c*(h*f+i*g)+f+a,-d*i,d*h,-d*(-i*f+h*g)+g+b,0,0,1)},scale:function(a,b){var c=this.elements;return c[0]*=a,c[3]*=a,c[6]*=a,c[1]*=b,c[4]*=b,c[7]*=b,this},rotate:function(a){var b=Math.cos(a),c=Math.sin(a),d=this.elements,e=d[0],f=d[3],g=d[6],h=d[1],i=d[4],j=d[7];return d[0]=b*e+c*h,d[3]=b*f+c*i,d[6]=b*g+c*j,d[1]=-c*e+b*h,d[4]=-c*f+b*i,d[7]=-c*g+b*j,this},translate:function(a,b){var c=this.elements;return c[0]+=a*c[2],c[3]+=a*c[5],c[6]+=a*c[8],c[1]+=b*c[2],c[4]+=b*c[5],c[7]+=b*c[8],this},equals:function(a){for(var b=this.elements,c=a.elements,d=0;d<9;d++)if(b[d]!==c[d])return!1;return!0},fromArray:function(a,b){void 0===b&&(b=0);for(var c=0;c<9;c++)this.elements[c]=a[c+b];return this},toArray:function(a,b){void 0===a&&(a=[]),void 0===b&&(b=0);var c=this.elements;return a[b]=c[0],a[b+1]=c[1],a[b+2]=c[2],a[b+3]=c[3],a[b+4]=c[4],a[b+5]=c[5],a[b+6]=c[6],a[b+7]=c[7],a[b+8]=c[8],a}});var zd=0;h.DEFAULT_IMAGE=void 0,h.DEFAULT_MAPPING=vc,h.prototype=Object.assign(Object.create(b.prototype),{constructor:h,isTexture:!0,clone:function(){return(new this.constructor).copy(this)},copy:function(a){return this.name=a.name,this.image=a.image,this.mipmaps=a.mipmaps.slice(0),this.mapping=a.mapping,this.wrapS=a.wrapS,this.wrapT=a.wrapT,this.magFilter=a.magFilter,this.minFilter=a.minFilter,this.anisotropy=a.anisotropy,this.format=a.format,this.type=a.type,this.offset.copy(a.offset),this.repeat.copy(a.repeat),this.center.copy(a.center),this.rotation=a.rotation,this.matrixAutoUpdate=a.matrixAutoUpdate,this.matrix.copy(a.matrix),this.generateMipmaps=a.generateMipmaps,this.premultiplyAlpha=a.premultiplyAlpha,this.flipY=a.flipY,this.unpackAlignment=a.unpackAlignment,this.encoding=a.encoding,this},toJSON:function(a){function b(a){var b;if(a instanceof HTMLCanvasElement)b=a;else{b=document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),b.width=a.width,b.height=a.height;var c=b.getContext("2d");a instanceof ImageData?c.putImageData(a,0,0):c.drawImage(a,0,0,a.width,a.height)}return b.width>2048||b.height>2048?b.toDataURL("image/jpeg",.6):b.toDataURL("image/png")}var c=void 0===a||"string"==typeof a;if(!c&&void 0!==a.textures[this.uuid])return a.textures[this.uuid];var d={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY};if(void 0!==this.image){var e=this.image;void 0===e.uuid&&(e.uuid=yd.generateUUID()),c||void 0!==a.images[e.uuid]||(a.images[e.uuid]={uuid:e.uuid,url:b(e)}),d.image=e.uuid}return c||(a.textures[this.uuid]=d),d},dispose:function(){this.dispatchEvent({type:"dispose"})},transformUv:function(a){if(this.mapping===vc){if(a.applyMatrix3(this.matrix),a.x<0||a.x>1)switch(this.wrapS){case Dc:a.x=a.x-Math.floor(a.x);break;case Ec:a.x=a.x<0?0:1;break;case Fc:1===Math.abs(Math.floor(a.x)%2)?a.x=Math.ceil(a.x)-a.x:a.x=a.x-Math.floor(a.x)}if(a.y<0||a.y>1)switch(this.wrapT){case Dc:a.y=a.y-Math.floor(a.y);break;case Ec:a.y=a.y<0?0:1;break;case Fc:1===Math.abs(Math.floor(a.y)%2)?a.y=Math.ceil(a.y)-a.y:a.y=a.y-Math.floor(a.y)}this.flipY&&(a.y=1-a.y)}}}),Object.defineProperty(h.prototype,"needsUpdate",{set:function(a){!0===a&&this.version++}}),Object.assign(i.prototype,{isVector4:!0,set:function(a,b,c,d){return this.x=a,this.y=b,this.z=c,this.w=d,this},setScalar:function(a){return this.x=a,this.y=a,this.z=a,this.w=a,this},setX:function(a){return this.x=a,this},setY:function(a){return this.y=a,this},setZ:function(a){return this.z=a,this},setW:function(a){return this.w=a,this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;case 2:this.z=b;break;case 3:this.w=b;break;default:throw new Error("index is out of range: "+a)}return this},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+a)}},clone:function(){return new this.constructor(this.x,this.y,this.z,this.w)},copy:function(a){return this.x=a.x,this.y=a.y,this.z=a.z,this.w=void 0!==a.w?a.w:1,this},add:function(a,b){return void 0!==b?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b)):(this.x+=a.x,this.y+=a.y,this.z+=a.z,this.w+=a.w,this)},addScalar:function(a){return this.x+=a,this.y+=a,this.z+=a,this.w+=a,this},addVectors:function(a,b){return this.x=a.x+b.x,this.y=a.y+b.y,this.z=a.z+b.z,this.w=a.w+b.w,this},addScaledVector:function(a,b){return this.x+=a.x*b,this.y+=a.y*b,this.z+=a.z*b,this.w+=a.w*b,this},sub:function(a,b){return void 0!==b?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b)):(this.x-=a.x,this.y-=a.y,this.z-=a.z,this.w-=a.w,this)},subScalar:function(a){return this.x-=a,this.y-=a,this.z-=a,this.w-=a,this},subVectors:function(a,b){return this.x=a.x-b.x,this.y=a.y-b.y,this.z=a.z-b.z,this.w=a.w-b.w,this},multiplyScalar:function(a){return this.x*=a,this.y*=a,this.z*=a,this.w*=a,this},applyMatrix4:function(a){var b=this.x,c=this.y,d=this.z,e=this.w,f=a.elements;return this.x=f[0]*b+f[4]*c+f[8]*d+f[12]*e,this.y=f[1]*b+f[5]*c+f[9]*d+f[13]*e,this.z=f[2]*b+f[6]*c+f[10]*d+f[14]*e,this.w=f[3]*b+f[7]*c+f[11]*d+f[15]*e,this},divideScalar:function(a){return this.multiplyScalar(1/a)},setAxisAngleFromQuaternion:function(a){this.w=2*Math.acos(a.w);var b=Math.sqrt(1-a.w*a.w);return b<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=a.x/b,this.y=a.y/b,this.z=a.z/b),this},setAxisAngleFromRotationMatrix:function(a){var b,c,d,e,f=.01,g=.1,h=a.elements,i=h[0],j=h[4],k=h[8],l=h[1],m=h[5],n=h[9],o=h[2],p=h[6],q=h[10];if(Math.abs(j-l)<f&&Math.abs(k-o)<f&&Math.abs(n-p)<f){if(Math.abs(j+l)<g&&Math.abs(k+o)<g&&Math.abs(n+p)<g&&Math.abs(i+m+q-3)<g)return this.set(1,0,0,0),this;b=Math.PI;var r=(i+1)/2,s=(m+1)/2,t=(q+1)/2,u=(j+l)/4,v=(k+o)/4,w=(n+p)/4;return r>s&&r>t?r<f?(c=0,d=.707106781,e=.707106781):(c=Math.sqrt(r),d=u/c,e=v/c):s>t?s<f?(c=.707106781,d=0,e=.707106781):(d=Math.sqrt(s),c=u/d,e=w/d):t<f?(c=.707106781,d=.707106781,e=0):(e=Math.sqrt(t),c=v/e,d=w/e),this.set(c,d,e,b),this}var x=Math.sqrt((p-n)*(p-n)+(k-o)*(k-o)+(l-j)*(l-j));return Math.abs(x)<.001&&(x=1),this.x=(p-n)/x,this.y=(k-o)/x,this.z=(l-j)/x,this.w=Math.acos((i+m+q-1)/2),this},min:function(a){return this.x=Math.min(this.x,a.x),this.y=Math.min(this.y,a.y),this.z=Math.min(this.z,a.z),this.w=Math.min(this.w,a.w),this},max:function(a){return this.x=Math.max(this.x,a.x),this.y=Math.max(this.y,a.y),this.z=Math.max(this.z,a.z),this.w=Math.max(this.w,a.w),this},clamp:function(a,b){return this.x=Math.max(a.x,Math.min(b.x,this.x)),this.y=Math.max(a.y,Math.min(b.y,this.y)),this.z=Math.max(a.z,Math.min(b.z,this.z)),this.w=Math.max(a.w,Math.min(b.w,this.w)),this},clampScalar:function(){var a,b;return function(c,d){return void 0===a&&(a=new i,b=new i),a.set(c,c,c,c),b.set(d,d,d,d),this.clamp(a,b)}}(),clampLength:function(a,b){var c=this.length();return this.divideScalar(c||1).multiplyScalar(Math.max(a,Math.min(b,c)))},floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this},ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this},round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this},roundToZero:function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this},negate:function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z+this.w*a.w},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},manhattanLength:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)},normalize:function(){return this.divideScalar(this.length()||1)},setLength:function(a){return this.normalize().multiplyScalar(a)},lerp:function(a,b){return this.x+=(a.x-this.x)*b,this.y+=(a.y-this.y)*b,this.z+=(a.z-this.z)*b,this.w+=(a.w-this.w)*b,this},lerpVectors:function(a,b,c){return this.subVectors(b,a).multiplyScalar(c).add(a)},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z&&a.w===this.w},fromArray:function(a,b){return void 0===b&&(b=0),this.x=a[b],this.y=a[b+1],this.z=a[b+2],this.w=a[b+3],this},toArray:function(a,b){return void 0===a&&(a=[]),void 0===b&&(b=0),a[b]=this.x,a[b+1]=this.y,a[b+2]=this.z,a[b+3]=this.w,a},fromBufferAttribute:function(a,b,c){return void 0!==c&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=a.getX(b),this.y=a.getY(b),this.z=a.getZ(b),this.w=a.getW(b),this}}),j.prototype=Object.assign(Object.create(b.prototype),{constructor:j,isWebGLRenderTarget:!0,setSize:function(a,b){this.width===a&&this.height===b||(this.width=a,this.height=b,this.dispose()),this.viewport.set(0,0,a,b),this.scissor.set(0,0,a,b)},clone:function(){return(new this.constructor).copy(this)},copy:function(a){return this.width=a.width,this.height=a.height,this.viewport.copy(a.viewport),this.texture=a.texture.clone(),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.depthTexture=a.depthTexture,this},dispose:function(){this.dispatchEvent({type:"dispose"})}}),k.prototype=Object.create(h.prototype),k.prototype.constructor=k,k.prototype.isDataTexture=!0,l.prototype=Object.create(h.prototype),l.prototype.constructor=l,l.prototype.isCubeTexture=!0,Object.defineProperty(l.prototype,"images",{get:function(){return this.image},set:function(a){this.image=a}});var Ad=new h,Bd=new l,Cd=[],Dd=[],Ed=new Float32Array(16),Fd=new Float32Array(9);Q.prototype.setValue=function(a,b){for(var c=this.seq,d=0,e=c.length;d!==e;++d){var f=c[d];f.setValue(a,b[f.id])}};var Gd=/([\w\d_]+)(\])?(\[|\.)?/g;T.prototype.setValue=function(a,b,c){var d=this.map[b];void 0!==d&&d.setValue(a,c,this.renderer)},T.prototype.setOptional=function(a,b,c){var d=b[c];void 0!==d&&this.setValue(a,c,d)},T.upload=function(a,b,c,d){for(var e=0,f=b.length;e!==f;++e){var g=b[e],h=c[g.id];!1!==h.needsUpdate&&g.setValue(a,h.value,d)}},T.seqWithValue=function(a,b){for(var c=[],d=0,e=a.length;d!==e;++d){var f=a[d];f.id in b&&c.push(f)}return c};var Hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Object.assign(U.prototype,{isColor:!0,r:1,g:1,b:1,set:function(a){return a&&a.isColor?this.copy(a):"number"==typeof a?this.setHex(a):"string"==typeof a&&this.setStyle(a),this},setScalar:function(a){return this.r=a,this.g=a,this.b=a,this},setHex:function(a){return a=Math.floor(a),this.r=(a>>16&255)/255,this.g=(a>>8&255)/255,this.b=(255&a)/255,this},setRGB:function(a,b,c){return this.r=a,this.g=b,this.b=c,this},setHSL:function(){function a(a,b,c){return c<0&&(c+=1),c>1&&(c-=1),c<1/6?a+6*(b-a)*c:c<.5?b:c<2/3?a+6*(b-a)*(2/3-c):a}return function(b,c,d){if(b=yd.euclideanModulo(b,1),c=yd.clamp(c,0,1),d=yd.clamp(d,0,1),0===c)this.r=this.g=this.b=d;else{var e=d<=.5?d*(1+c):d+c-d*c,f=2*d-e;this.r=a(f,e,b+1/3),this.g=a(f,e,b),this.b=a(f,e,b-1/3)}return this}}(),setStyle:function(a){function b(b){void 0!==b&&parseFloat(b)<1&&console.warn("THREE.Color: Alpha component of "+a+" will be ignored.")}var c;if(c=/^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(a)){var d,e=c[1],f=c[2];switch(e){case"rgb":case"rgba":if(d=/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(f))return this.r=Math.min(255,parseInt(d[1],10))/255,this.g=Math.min(255,parseInt(d[2],10))/255,this.b=Math.min(255,parseInt(d[3],10))/255,b(d[5]),this;if(d=/^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(f))return this.r=Math.min(100,parseInt(d[1],10))/100,this.g=Math.min(100,parseInt(d[2],10))/100,this.b=Math.min(100,parseInt(d[3],10))/100,b(d[5]),this;break;case"hsl":case"hsla":if(d=/^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(f)){var g=parseFloat(d[1])/360,h=parseInt(d[2],10)/100,i=parseInt(d[3],10)/100;return b(d[5]),this.setHSL(g,h,i)}}}else if(c=/^\#([A-Fa-f0-9]+)$/.exec(a)){var j=c[1],k=j.length;if(3===k)return this.r=parseInt(j.charAt(0)+j.charAt(0),16)/255,this.g=parseInt(j.charAt(1)+j.charAt(1),16)/255,this.b=parseInt(j.charAt(2)+j.charAt(2),16)/255,this;if(6===k)return this.r=parseInt(j.charAt(0)+j.charAt(1),16)/255,this.g=parseInt(j.charAt(2)+j.charAt(3),16)/255,this.b=parseInt(j.charAt(4)+j.charAt(5),16)/255,this}if(a&&a.length>0){var j=Hd[a];void 0!==j?this.setHex(j):console.warn("THREE.Color: Unknown color "+a)}return this},clone:function(){return new this.constructor(this.r,this.g,this.b)},copy:function(a){return this.r=a.r,this.g=a.g,this.b=a.b,this},copyGammaToLinear:function(a,b){return void 0===b&&(b=2),this.r=Math.pow(a.r,b),this.g=Math.pow(a.g,b),this.b=Math.pow(a.b,b),this},copyLinearToGamma:function(a,b){void 0===b&&(b=2);var c=b>0?1/b:1;return this.r=Math.pow(a.r,c),this.g=Math.pow(a.g,c),this.b=Math.pow(a.b,c),this},convertGammaToLinear:function(){var a=this.r,b=this.g,c=this.b;return this.r=a*a,this.g=b*b,this.b=c*c,this},convertLinearToGamma:function(){return this.r=Math.sqrt(this.r),this.g=Math.sqrt(this.g),this.b=Math.sqrt(this.b),this},getHex:function(){return 255*this.r<<16^255*this.g<<8^255*this.b<<0},getHexString:function(){return("000000"+this.getHex().toString(16)).slice(-6)},getHSL:function(a){var b,c,d=a||{h:0,s:0,l:0},e=this.r,f=this.g,g=this.b,h=Math.max(e,f,g),i=Math.min(e,f,g),j=(i+h)/2;if(i===h)b=0,c=0;else{var k=h-i;switch(c=j<=.5?k/(h+i):k/(2-h-i),h){case e:b=(f-g)/k+(f<g?6:0);break;case f:b=(g-e)/k+2;break;case g:b=(e-f)/k+4}b/=6}return d.h=b,d.s=c,d.l=j,d},getStyle:function(){return"rgb("+(255*this.r|0)+","+(255*this.g|0)+","+(255*this.b|0)+")"},offsetHSL:function(a,b,c){var d=this.getHSL();return d.h+=a,d.s+=b,d.l+=c,this.setHSL(d.h,d.s,d.l),this},add:function(a){return this.r+=a.r,this.g+=a.g,this.b+=a.b,this},addColors:function(a,b){return this.r=a.r+b.r,this.g=a.g+b.g,this.b=a.b+b.b,this},addScalar:function(a){return this.r+=a,this.g+=a,this.b+=a,this},sub:function(a){return this.r=Math.max(0,this.r-a.r),this.g=Math.max(0,this.g-a.g),this.b=Math.max(0,this.b-a.b),this},multiply:function(a){return this.r*=a.r,this.g*=a.g,this.b*=a.b,this},multiplyScalar:function(a){return this.r*=a,this.g*=a,this.b*=a,this},lerp:function(a,b){return this.r+=(a.r-this.r)*b,this.g+=(a.g-this.g)*b,this.b+=(a.b-this.b)*b,this},equals:function(a){return a.r===this.r&&a.g===this.g&&a.b===this.b},fromArray:function(a,b){return void 0===b&&(b=0),this.r=a[b],this.g=a[b+1],this.b=a[b+2],this},toArray:function(a,b){return void 0===a&&(a=[]),void 0===b&&(b=0),a[b]=this.r,a[b+1]=this.g,a[b+2]=this.b,a},toJSON:function(){return this.getHex()}});var Id={common:{diffuse:{value:new U(15658734)},opacity:{value:1},map:{value:null},uvTransform:{value:new g},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new c(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new U(16777215)}},lights:{ambientLightColor:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}}},points:{diffuse:{value:new U(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},uvTransform:{value:new g}}},Jd={merge:function(a){for(var b={},c=0;c<a.length;c++){var d=this.clone(a[c]);for(var e in d)b[e]=d[e]}return b},clone:function(a){var b={};for(var c in a){b[c]={};for(var d in a[c]){var e=a[c][d];e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture)?b[c][d]=e.clone():Array.isArray(e)?b[c][d]=e.slice():b[c][d]=e}}return b}},Kd="#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",Ld="#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n",Md="#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",Nd="#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n",Od="#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",Pd="\nvec3 transformed = vec3( position );\n",Qd="\nvec3 objectNormal = vec3( normal );\n",Rd="float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n#else\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n\t}\n\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat theta = acos( dot( N, V ) );\n\tvec2 uv = vec2(\n\t\tsqrt( saturate( roughness ) ),\n\t\tsaturate( theta / ( 0.5 * PI ) ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.86267 + (0.49788 + 0.01436 * y ) * y;\n\tfloat b = 3.45068 + (4.18814 + y) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = (x > 0.0) ? v : 0.5 * inversesqrt( 1.0 - x * x ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tvec3 result = vec3( LTC_ClippedSphereFormFactor( vectorFormFactor ) );\n\treturn result;\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",Sd="#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n",Td="#if NUM_CLIPPING_PLANES > 0\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; ++ i ) {\n\t\tvec4 plane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t\t\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; ++ i ) {\n\t\t\tvec4 plane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t\n\t#endif\n#endif\n",Ud="#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",Vd="#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n",Wd="#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n",Xd="#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",Yd="#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n",Zd="#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",$d="#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",_d="#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\n",ae="#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n",be="vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n",ce="#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n",de="#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",ee="#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",fe="#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n",ge="  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",he="\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM            = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat D      = max( maxRange / maxRGB, 1.0 );\n\tD            = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract(Le);\n\tvResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max(vRGB, 0.0), 1.0 );\n}\n",ie="#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n",je="#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n",ke="#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n",le="#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n",me="\n#ifdef USE_FOG\nfogDepth = -mvPosition.z;\n#endif",ne="#ifdef USE_FOG\n  varying float fogDepth;\n#endif\n",oe="#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",pe="#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n",qe="#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n",re="#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",se="#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",te="vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n",ue="uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltcMat;\tuniform sampler2D ltcMag;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n",ve="BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",we="varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n",xe="PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n",ye="struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos - halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tfloat norm = texture2D( ltcMag, uv ).a;\n\t\tvec4 t = texture2D( ltcMat, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3(   1,   0, t.y ),\n\t\t\tvec3(   0, t.z,   0 ),\n\t\t\tvec3( t.w,   0, t.x )\n\t\t);\n\t\treflectedLight.directSpecular += lightColor * material.specularColor * norm * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",ze="\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, 8 );\n\t#endif\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tvec3 radiance = getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), 8 );\n\t#ifndef STANDARD\n\t\tvec3 clearCoatRadiance = getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), 8 );\n\t#else\n\t\tvec3 clearCoatRadiance = vec3( 0.0 );\n\t#endif\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n",Ae="#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",Be="#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n#endif\n",Ce="#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif",De="#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\tgl_Position.z *= gl_Position.w;\n\t#endif\n#endif\n",Ee="#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n",Fe="#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n",Ge="#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",He="#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif\n",Ie="float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif\n",Je="#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",Ke="#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",Le="#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",Me="#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n",Ne="#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n#endif\n#ifdef USE_NORMALMAP\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",Oe="#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif\n",Pe="vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",Qe="#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",Re="vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n",Se="#if defined( DITHERING )\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif\n",Te="#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif\n",Ue="float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif\n",Ve="#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",We="#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n",Xe="#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n",Ye="#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n",Ze="float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n",$e="#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",_e="#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",af="#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif\n",bf="#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",cf="float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",df="#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",ef="#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",ff="#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",gf="#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",hf="#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n",jf="#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",kf="#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",lf="#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",mf="#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",nf="#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif\n",of="uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n",pf="varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}\n",qf="#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n",rf="#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",sf="#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}\n",tf="#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}\n",uf="uniform sampler2D tEquirect;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n",vf="varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",wf="uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",xf="uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n",yf="uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",zf="#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n",Af="uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",Bf="#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",Cf="#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",Df="#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",Ef="#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",Ff="#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",Gf="#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}\n",Hf="#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n",If="uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",Jf="uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",Kf="uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}\n",Lf="#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",Mf={alphamap_fragment:Kd,alphamap_pars_fragment:Ld,alphatest_fragment:Md,aomap_fragment:Nd,aomap_pars_fragment:Od,begin_vertex:Pd,beginnormal_vertex:Qd,bsdfs:Rd,bumpmap_pars_fragment:Sd,clipping_planes_fragment:Td,clipping_planes_pars_fragment:Ud,clipping_planes_pars_vertex:Vd,clipping_planes_vertex:Wd,color_fragment:Xd,color_pars_fragment:Yd,color_pars_vertex:Zd,color_vertex:$d,common:_d,cube_uv_reflection_fragment:ae,defaultnormal_vertex:be,displacementmap_pars_vertex:ce,displacementmap_vertex:de,emissivemap_fragment:ee,emissivemap_pars_fragment:fe,encodings_fragment:ge,encodings_pars_fragment:he,envmap_fragment:ie,envmap_pars_fragment:je,envmap_pars_vertex:ke,envmap_vertex:le,fog_vertex:me,fog_pars_vertex:ne,fog_fragment:oe,fog_pars_fragment:pe,gradientmap_pars_fragment:qe,lightmap_fragment:re,lightmap_pars_fragment:se,lights_lambert_vertex:te,lights_pars:ue,lights_phong_fragment:ve,lights_phong_pars_fragment:we,lights_physical_fragment:xe,lights_physical_pars_fragment:ye,lights_template:ze,logdepthbuf_fragment:Ae,logdepthbuf_pars_fragment:Be,logdepthbuf_pars_vertex:Ce,logdepthbuf_vertex:De,map_fragment:Ee,map_pars_fragment:Fe,map_particle_fragment:Ge,map_particle_pars_fragment:He,metalnessmap_fragment:Ie,metalnessmap_pars_fragment:Je,morphnormal_vertex:Ke,morphtarget_pars_vertex:Le,morphtarget_vertex:Me,normal_fragment:Ne,normalmap_pars_fragment:Oe,packing:Pe,premultiplied_alpha_fragment:Qe,project_vertex:Re,dithering_fragment:Se,dithering_pars_fragment:Te,roughnessmap_fragment:Ue,roughnessmap_pars_fragment:Ve,shadowmap_pars_fragment:We,shadowmap_pars_vertex:Xe,shadowmap_vertex:Ye,shadowmask_pars_fragment:Ze,skinbase_vertex:$e,skinning_pars_vertex:_e,skinning_vertex:af,skinnormal_vertex:bf,specularmap_fragment:cf,specularmap_pars_fragment:df,tonemapping_fragment:ef,tonemapping_pars_fragment:ff,uv_pars_fragment:gf,uv_pars_vertex:hf,uv_vertex:jf,uv2_pars_fragment:kf,uv2_pars_vertex:lf,uv2_vertex:mf,worldpos_vertex:nf,cube_frag:of,cube_vert:pf,depth_frag:qf,depth_vert:rf,distanceRGBA_frag:sf,distanceRGBA_vert:tf,equirect_frag:uf,equirect_vert:vf,linedashed_frag:wf,linedashed_vert:xf,meshbasic_frag:yf,meshbasic_vert:zf,meshlambert_frag:Af,meshlambert_vert:Bf,meshphong_frag:Cf,meshphong_vert:Df,meshphysical_frag:Ef,meshphysical_vert:Ff,normal_frag:Gf,normal_vert:Hf,points_frag:If,points_vert:Jf,shadow_frag:Kf,shadow_vert:Lf},Nf={basic:{uniforms:Jd.merge([Id.common,Id.specularmap,Id.envmap,Id.aomap,Id.lightmap,Id.fog]),vertexShader:Mf.meshbasic_vert,fragmentShader:Mf.meshbasic_frag},lambert:{uniforms:Jd.merge([Id.common,Id.specularmap,Id.envmap,Id.aomap,Id.lightmap,Id.emissivemap,Id.fog,Id.lights,{emissive:{value:new U(0)}}]),vertexShader:Mf.meshlambert_vert,fragmentShader:Mf.meshlambert_frag},phong:{uniforms:Jd.merge([Id.common,Id.specularmap,Id.envmap,Id.aomap,Id.lightmap,Id.emissivemap,Id.bumpmap,Id.normalmap,Id.displacementmap,Id.gradientmap,Id.fog,Id.lights,{emissive:{value:new U(0)},specular:{value:new U(1118481)},shininess:{value:30}}]),vertexShader:Mf.meshphong_vert,fragmentShader:Mf.meshphong_frag},standard:{uniforms:Jd.merge([Id.common,Id.envmap,Id.aomap,Id.lightmap,Id.emissivemap,Id.bumpmap,Id.normalmap,Id.displacementmap,Id.roughnessmap,Id.metalnessmap,Id.fog,Id.lights,{emissive:{value:new U(0)},roughness:{value:.5},metalness:{value:.5},envMapIntensity:{value:1}}]),vertexShader:Mf.meshphysical_vert,fragmentShader:Mf.meshphysical_frag},points:{uniforms:Jd.merge([Id.points,Id.fog]),vertexShader:Mf.points_vert,fragmentShader:Mf.points_frag},dashed:{uniforms:Jd.merge([Id.common,Id.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Mf.linedashed_vert,fragmentShader:Mf.linedashed_frag},depth:{uniforms:Jd.merge([Id.common,Id.displacementmap]),vertexShader:Mf.depth_vert,fragmentShader:Mf.depth_frag},normal:{uniforms:Jd.merge([Id.common,Id.bumpmap,Id.normalmap,Id.displacementmap,{opacity:{value:1}}]),vertexShader:Mf.normal_vert,fragmentShader:Mf.normal_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Mf.cube_vert,fragmentShader:Mf.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Mf.equirect_vert,fragmentShader:Mf.equirect_frag},distanceRGBA:{uniforms:Jd.merge([Id.common,Id.displacementmap,{referencePosition:{value:new f},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Mf.distanceRGBA_vert,fragmentShader:Mf.distanceRGBA_frag},shadow:{uniforms:Jd.merge([Id.lights,Id.fog,{color:{value:new U(0)},opacity:{value:1}}]),vertexShader:Mf.shadow_vert,fragmentShader:Mf.shadow_frag}};Nf.physical={uniforms:Jd.merge([Nf.standard.uniforms,{clearCoat:{value:0},clearCoatRoughness:{value:0}}]),vertexShader:Mf.meshphysical_vert,fragmentShader:Mf.meshphysical_frag},Object.assign(V.prototype,{set:function(a,b){return this.min.copy(a),this.max.copy(b),this},setFromPoints:function(a){this.makeEmpty();for(var b=0,c=a.length;b<c;b++)this.expandByPoint(a[b]);return this},setFromCenterAndSize:function(){var a=new c;return function(b,c){var d=a.copy(c).multiplyScalar(.5);return this.min.copy(b).sub(d),this.max.copy(b).add(d),this}}(),clone:function(){return(new this.constructor).copy(this)},copy:function(a){return this.min.copy(a.min),this.max.copy(a.max),this},makeEmpty:function(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this},isEmpty:function(){return this.max.x<this.min.x||this.max.y<this.min.y},getCenter:function(a){var b=a||new c;return this.isEmpty()?b.set(0,0):b.addVectors(this.min,this.max).multiplyScalar(.5)},getSize:function(a){var b=a||new c;return this.isEmpty()?b.set(0,0):b.subVectors(this.max,this.min)},expandByPoint:function(a){return this.min.min(a),this.max.max(a),this},expandByVector:function(a){return this.min.sub(a),this.max.add(a),this},expandByScalar:function(a){return this.min.addScalar(-a),this.max.addScalar(a),this},containsPoint:function(a){return!(a.x<this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y)},containsBox:function(a){return this.min.x<=a.min.x&&a.max.x<=this.max.x&&this.min.y<=a.min.y&&a.max.y<=this.max.y},getParameter:function(a,b){return(b||new c).set((a.x-this.min.x)/(this.max.x-this.min.x),(a.y-this.min.y)/(this.max.y-this.min.y))},intersectsBox:function(a){return!(a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y)},clampPoint:function(a,b){return(b||new c).copy(a).clamp(this.min,this.max)},distanceToPoint:function(){var a=new c;return function(b){return a.copy(b).clamp(this.min,this.max).sub(b).length()}}(),intersect:function(a){return this.min.max(a.min),this.max.min(a.max),this},union:function(a){return this.min.min(a.min),this.max.max(a.max),this},translate:function(a){return this.min.add(a),this.max.add(a),this},equals:function(a){return a.min.equals(this.min)&&a.max.equals(this.max)}}),X.prototype=Object.create(h.prototype),X.prototype.constructor=X;var Of=0;Z.prototype=Object.assign(Object.create(b.prototype),{constructor:Z,isMaterial:!0,onBeforeCompile:function(){},setValues:function(a){if(void 0!==a)for(var b in a){var c=a[b];if(void 0!==c)if("shading"!==b){var d=this[b];void 0!==d?d&&d.isColor?d.set(c):d&&d.isVector3&&c&&c.isVector3?d.copy(c):this[b]="overdraw"===b?Number(c):c:console.warn("THREE."+this.type+": '"+b+"' is not a property of this material.")}else console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=c===Jb;else console.warn("THREE.Material: '"+b+"' parameter is undefined.")}},toJSON:function(a){function b(a){var b=[];for(var c in a){var d=a[c];delete d.metadata,b.push(d)}return b}var c=void 0===a||"string"==typeof a;c&&(a={textures:{},images:{}});var d={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};if(d.uuid=this.uuid,d.type=this.type,""!==this.name&&(d.name=this.name),this.color&&this.color.isColor&&(d.color=this.color.getHex()),void 0!==this.roughness&&(d.roughness=this.roughness),void 0!==this.metalness&&(d.metalness=this.metalness),this.emissive&&this.emissive.isColor&&(d.emissive=this.emissive.getHex()),1!==this.emissiveIntensity&&(d.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(d.specular=this.specular.getHex()),void 0!==this.shininess&&(d.shininess=this.shininess),void 0!==this.clearCoat&&(d.clearCoat=this.clearCoat),void 0!==this.clearCoatRoughness&&(d.clearCoatRoughness=this.clearCoatRoughness),this.map&&this.map.isTexture&&(d.map=this.map.toJSON(a).uuid),this.alphaMap&&this.alphaMap.isTexture&&(d.alphaMap=this.alphaMap.toJSON(a).uuid),this.lightMap&&this.lightMap.isTexture&&(d.lightMap=this.lightMap.toJSON(a).uuid),this.bumpMap&&this.bumpMap.isTexture&&(d.bumpMap=this.bumpMap.toJSON(a).uuid,d.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(d.normalMap=this.normalMap.toJSON(a).uuid,d.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(d.displacementMap=this.displacementMap.toJSON(a).uuid,d.displacementScale=this.displacementScale,d.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(d.roughnessMap=this.roughnessMap.toJSON(a).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(d.metalnessMap=this.metalnessMap.toJSON(a).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(d.emissiveMap=this.emissiveMap.toJSON(a).uuid),this.specularMap&&this.specularMap.isTexture&&(d.specularMap=this.specularMap.toJSON(a).uuid),this.envMap&&this.envMap.isTexture&&(d.envMap=this.envMap.toJSON(a).uuid,d.reflectivity=this.reflectivity),this.gradientMap&&this.gradientMap.isTexture&&(d.gradientMap=this.gradientMap.toJSON(a).uuid),void 0!==this.size&&(d.size=this.size),void 0!==this.sizeAttenuation&&(d.sizeAttenuation=this.sizeAttenuation),this.blending!==Mb&&(d.blending=this.blending),!0===this.flatShading&&(d.flatShading=this.flatShading),this.side!==Gb&&(d.side=this.side),this.vertexColors!==Kb&&(d.vertexColors=this.vertexColors),this.opacity<1&&(d.opacity=this.opacity),!0===this.transparent&&(d.transparent=this.transparent),d.depthFunc=this.depthFunc,d.depthTest=this.depthTest,d.depthWrite=this.depthWrite,0!==this.rotation&&(d.rotation=this.rotation),1!==this.linewidth&&(d.linewidth=this.linewidth),void 0!==this.dashSize&&(d.dashSize=this.dashSize),void 0!==this.gapSize&&(d.gapSize=this.gapSize),void 0!==this.scale&&(d.scale=this.scale),!0===this.dithering&&(d.dithering=!0),this.alphaTest>0&&(d.alphaTest=this.alphaTest),!0===this.premultipliedAlpha&&(d.premultipliedAlpha=this.premultipliedAlpha),!0===this.wireframe&&(d.wireframe=this.wireframe),this.wireframeLinewidth>1&&(d.wireframeLinewidth=this.wireframeLinewidth),"round"!==this.wireframeLinecap&&(d.wireframeLinecap=this.wireframeLinecap),"round"!==this.wireframeLinejoin&&(d.wireframeLinejoin=this.wireframeLinejoin),!0===this.morphTargets&&(d.morphTargets=!0),!0===this.skinning&&(d.skinning=!0),!1===this.visible&&(d.visible=!1),"{}"!==JSON.stringify(this.userData)&&(d.userData=this.userData),c){var e=b(a.textures),f=b(a.images);e.length>0&&(d.textures=e),f.length>0&&(d.images=f)}return d},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.name=a.name,this.fog=a.fog,this.lights=a.lights,this.blending=a.blending,this.side=a.side,this.flatShading=a.flatShading,this.vertexColors=a.vertexColors,this.opacity=a.opacity,this.transparent=a.transparent,this.blendSrc=a.blendSrc,this.blendDst=a.blendDst,this.blendEquation=a.blendEquation,this.blendSrcAlpha=a.blendSrcAlpha,this.blendDstAlpha=a.blendDstAlpha,this.blendEquationAlpha=a.blendEquationAlpha,this.depthFunc=a.depthFunc,this.depthTest=a.depthTest,this.depthWrite=a.depthWrite,this.colorWrite=a.colorWrite,this.precision=a.precision,this.polygonOffset=a.polygonOffset,this.polygonOffsetFactor=a.polygonOffsetFactor,this.polygonOffsetUnits=a.polygonOffsetUnits,this.dithering=a.dithering,this.alphaTest=a.alphaTest,this.premultipliedAlpha=a.premultipliedAlpha,this.overdraw=a.overdraw,this.visible=a.visible,this.userData=JSON.parse(JSON.stringify(a.userData)),this.clipShadows=a.clipShadows,this.clipIntersection=a.clipIntersection;var b=a.clippingPlanes,c=null;if(null!==b){var d=b.length;c=new Array(d);for(var e=0;e!==d;++e)c[e]=b[e].clone()}return this.clippingPlanes=c,this},dispose:function(){this.dispatchEvent({type:"dispose"})}}),$.prototype=Object.create(Z.prototype),$.prototype.constructor=$,$.prototype.isMeshDepthMaterial=!0,$.prototype.copy=function(a){return Z.prototype.copy.call(this,a),this.depthPacking=a.depthPacking,this.skinning=a.skinning,this.morphTargets=a.morphTargets,this.map=a.map,this.alphaMap=a.alphaMap,this.displacementMap=a.displacementMap,this.displacementScale=a.displacementScale,this.displacementBias=a.displacementBias,this.wireframe=a.wireframe,this.wireframeLinewidth=a.wireframeLinewidth,this},_.prototype=Object.create(Z.prototype),_.prototype.constructor=_,_.prototype.isMeshDistanceMaterial=!0,_.prototype.copy=function(a){return Z.prototype.copy.call(this,a),this.referencePosition.copy(a.referencePosition),this.nearDistance=a.nearDistance,this.farDistance=a.farDistance,this.skinning=a.skinning,this.morphTargets=a.morphTargets,this.map=a.map,this.alphaMap=a.alphaMap,this.displacementMap=a.displacementMap,this.displacementScale=a.displacementScale,this.displacementBias=a.displacementBias,this},Object.assign(aa.prototype,{isBox3:!0,set:function(a,b){return this.min.copy(a),this.max.copy(b),this},setFromArray:function(a){for(var b=1/0,c=1/0,d=1/0,e=-1/0,f=-1/0,g=-1/0,h=0,i=a.length;h<i;h+=3){var j=a[h],k=a[h+1],l=a[h+2];j<b&&(b=j),k<c&&(c=k),l<d&&(d=l),j>e&&(e=j),k>f&&(f=k),l>g&&(g=l)}return this.min.set(b,c,d),this.max.set(e,f,g),this},setFromBufferAttribute:function(a){for(var b=1/0,c=1/0,d=1/0,e=-1/0,f=-1/0,g=-1/0,h=0,i=a.count;h<i;h++){var j=a.getX(h),k=a.getY(h),l=a.getZ(h);j<b&&(b=j),k<c&&(c=k),l<d&&(d=l),j>e&&(e=j),k>f&&(f=k),l>g&&(g=l)}return this.min.set(b,c,d),this.max.set(e,f,g),this},setFromPoints:function(a){this.makeEmpty();for(var b=0,c=a.length;b<c;b++)this.expandByPoint(a[b]);return this},setFromCenterAndSize:function(){var a=new f;return function(b,c){var d=a.copy(c).multiplyScalar(.5);return this.min.copy(b).sub(d),this.max.copy(b).add(d),this}}(),setFromObject:function(a){return this.makeEmpty(),this.expandByObject(a)},clone:function(){return(new this.constructor).copy(this)},copy:function(a){return this.min.copy(a.min),this.max.copy(a.max),this},makeEmpty:function(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this},isEmpty:function(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z},getCenter:function(a){var b=a||new f;return this.isEmpty()?b.set(0,0,0):b.addVectors(this.min,this.max).multiplyScalar(.5)},getSize:function(a){var b=a||new f;return this.isEmpty()?b.set(0,0,0):b.subVectors(this.max,this.min)},expandByPoint:function(a){return this.min.min(a),this.max.max(a),this},expandByVector:function(a){return this.min.sub(a),this.max.add(a),this},expandByScalar:function(a){return this.min.addScalar(-a),this.max.addScalar(a),this},expandByObject:function(){function a(a){var f=a.geometry;if(void 0!==f)if(f.isGeometry){var g=f.vertices;for(c=0,d=g.length;c<d;c++)e.copy(g[c]),e.applyMatrix4(a.matrixWorld),b.expandByPoint(e)}else if(f.isBufferGeometry){var h=f.attributes.position;if(void 0!==h)for(c=0,d=h.count;c<d;c++)e.fromBufferAttribute(h,c).applyMatrix4(a.matrixWorld),b.expandByPoint(e)}}var b,c,d,e=new f;return function(c){return b=this,c.updateMatrixWorld(!0),c.traverse(a),this}}(),containsPoint:function(a){return!(a.x<this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y||a.z<this.min.z||a.z>this.max.z)},containsBox:function(a){return this.min.x<=a.min.x&&a.max.x<=this.max.x&&this.min.y<=a.min.y&&a.max.y<=this.max.y&&this.min.z<=a.min.z&&a.max.z<=this.max.z},getParameter:function(a,b){return(b||new f).set((a.x-this.min.x)/(this.max.x-this.min.x),(a.y-this.min.y)/(this.max.y-this.min.y),(a.z-this.min.z)/(this.max.z-this.min.z))},intersectsBox:function(a){return!(a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y||a.max.z<this.min.z||a.min.z>this.max.z)},intersectsSphere:function(){var a=new f;return function(b){return this.clampPoint(b.center,a),a.distanceToSquared(b.center)<=b.radius*b.radius}}(),intersectsPlane:function(a){var b,c;return a.normal.x>0?(b=a.normal.x*this.min.x,c=a.normal.x*this.max.x):(b=a.normal.x*this.max.x,c=a.normal.x*this.min.x),a.normal.y>0?(b+=a.normal.y*this.min.y,c+=a.normal.y*this.max.y):(b+=a.normal.y*this.max.y,c+=a.normal.y*this.min.y),a.normal.z>0?(b+=a.normal.z*this.min.z,c+=a.normal.z*this.max.z):(b+=a.normal.z*this.max.z,c+=a.normal.z*this.min.z),b<=a.constant&&c>=a.constant},clampPoint:function(a,b){return(b||new f).copy(a).clamp(this.min,this.max)},distanceToPoint:function(){var a=new f;return function(b){return a.copy(b).clamp(this.min,this.max).sub(b).length()}}(),getBoundingSphere:function(){var a=new f;return function(b){var c=b||new ba;return this.getCenter(c.center),c.radius=.5*this.getSize(a).length(),c}}(),intersect:function(a){return this.min.max(a.min),this.max.min(a.max),this.isEmpty()&&this.makeEmpty(),this},union:function(a){return this.min.min(a.min),this.max.max(a.max),this},applyMatrix4:function(){var a=[new f,new f,new f,new f,new f,new f,new f,new f];return function(b){return this.isEmpty()?this:(a[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(b),a[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(b),a[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(b),a[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(b),a[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(b),a[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(b),a[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(b),a[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(b),this.setFromPoints(a),this)}}(),translate:function(a){return this.min.add(a),this.max.add(a),this},equals:function(a){return a.min.equals(this.min)&&a.max.equals(this.max)}}),Object.assign(ba.prototype,{set:function(a,b){return this.center.copy(a),this.radius=b,this},setFromPoints:function(){var a=new aa;return function(b,c){var d=this.center;void 0!==c?d.copy(c):a.setFromPoints(b).getCenter(d);for(var e=0,f=0,g=b.length;f<g;f++)e=Math.max(e,d.distanceToSquared(b[f]));return this.radius=Math.sqrt(e),this}}(),clone:function(){return(new this.constructor).copy(this)},copy:function(a){return this.center.copy(a.center),this.radius=a.radius,this},empty:function(){return this.radius<=0},containsPoint:function(a){return a.distanceToSquared(this.center)<=this.radius*this.radius},distanceToPoint:function(a){return a.distanceTo(this.center)-this.radius},intersectsSphere:function(a){var b=this.radius+a.radius;return a.center.distanceToSquared(this.center)<=b*b},intersectsBox:function(a){return a.intersectsSphere(this)},intersectsPlane:function(a){return Math.abs(a.distanceToPoint(this.center))<=this.radius},clampPoint:function(a,b){var c=this.center.distanceToSquared(a),d=b||new f;return d.copy(a),c>this.radius*this.radius&&(d.sub(this.center).normalize(),d.multiplyScalar(this.radius).add(this.center)),d},getBoundingBox:function(a){var b=a||new aa;return b.set(this.center,this.center),b.expandByScalar(this.radius),b},applyMatrix4:function(a){return this.center.applyMatrix4(a),this.radius=this.radius*a.getMaxScaleOnAxis(),this},translate:function(a){return this.center.add(a),this},equals:function(a){return a.center.equals(this.center)&&a.radius===this.radius}}),Object.assign(ca.prototype,{set:function(a,b){return this.normal.copy(a),this.constant=b,this},setComponents:function(a,b,c,d){return this.normal.set(a,b,c),this.constant=d,this},setFromNormalAndCoplanarPoint:function(a,b){return this.normal.copy(a),this.constant=-b.dot(this.normal),this},setFromCoplanarPoints:function(){var a=new f,b=new f;return function(c,d,e){var f=a.subVectors(e,d).cross(b.subVectors(c,d)).normalize();return this.setFromNormalAndCoplanarPoint(f,c),this}}(),clone:function(){return(new this.constructor).copy(this)},copy:function(a){return this.normal.copy(a.normal),this.constant=a.constant,this},normalize:function(){var a=1/this.normal.length();return this.normal.multiplyScalar(a),this.constant*=a,this},negate:function(){return this.constant*=-1,this.normal.negate(),this},distanceToPoint:function(a){return this.normal.dot(a)+this.constant},distanceToSphere:function(a){return this.distanceToPoint(a.center)-a.radius},projectPoint:function(a,b){return(b||new f).copy(this.normal).multiplyScalar(-this.distanceToPoint(a)).add(a)},intersectLine:function(){var a=new f;return function(b,c){var d=c||new f,e=b.delta(a),g=this.normal.dot(e);if(0!==g){var h=-(b.start.dot(this.normal)+this.constant)/g;if(!(h<0||h>1))return d.copy(e).multiplyScalar(h).add(b.start)}else if(0===this.distanceToPoint(b.start))return d.copy(b.start)}}(),intersectsLine:function(a){var b=this.distanceToPoint(a.start),c=this.distanceToPoint(a.end);return b<0&&c>0||c<0&&b>0},intersectsBox:function(a){return a.intersectsPlane(this)},intersectsSphere:function(a){return a.intersectsPlane(this)},coplanarPoint:function(a){return(a||new f).copy(this.normal).multiplyScalar(-this.constant)},applyMatrix4:function(){var a=new f,b=new g;return function(c,d){var e=d||b.getNormalMatrix(c),f=this.coplanarPoint(a).applyMatrix4(c),g=this.normal.applyMatrix3(e).normalize();return this.constant=-f.dot(g),this}}(),translate:function(a){return this.constant-=a.dot(this.normal),this},equals:function(a){return a.normal.equals(this.normal)&&a.constant===this.constant}}),Object.assign(da.prototype,{set:function(a,b,c,d,e,f){var g=this.planes;return g[0].copy(a),g[1].copy(b),g[2].copy(c),g[3].copy(d),g[4].copy(e),g[5].copy(f),this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){for(var b=this.planes,c=0;c<6;c++)b[c].copy(a.planes[c]);return this},setFromMatrix:function(a){var b=this.planes,c=a.elements,d=c[0],e=c[1],f=c[2],g=c[3],h=c[4],i=c[5],j=c[6],k=c[7],l=c[8],m=c[9],n=c[10],o=c[11],p=c[12],q=c[13],r=c[14],s=c[15];return b[0].setComponents(g-d,k-h,o-l,s-p).normalize(),b[1].setComponents(g+d,k+h,o+l,s+p).normalize(),b[2].setComponents(g+e,k+i,o+m,s+q).normalize(),b[3].setComponents(g-e,k-i,o-m,s-q).normalize(),b[4].setComponents(g-f,k-j,o-n,s-r).normalize(),b[5].setComponents(g+f,k+j,o+n,s+r).normalize(),this},intersectsObject:function(){var a=new ba;return function(b){var c=b.geometry;return null===c.boundingSphere&&c.computeBoundingSphere(),a.copy(c.boundingSphere).applyMatrix4(b.matrixWorld),this.intersectsSphere(a)}}(),intersectsSprite:function(){var a=new ba;return function(b){return a.center.set(0,0,0),a.radius=.7071067811865476,a.applyMatrix4(b.matrixWorld),this.intersectsSphere(a)}}(),intersectsSphere:function(a){for(var b=this.planes,c=a.center,d=-a.radius,e=0;e<6;e++){if(b[e].distanceToPoint(c)<d)return!1}return!0},intersectsBox:function(){var a=new f,b=new f;return function(c){for(var d=this.planes,e=0;e<6;e++){var f=d[e];a.x=f.normal.x>0?c.min.x:c.max.x,b.x=f.normal.x>0?c.max.x:c.min.x,a.y=f.normal.y>0?c.min.y:c.max.y,b.y=f.normal.y>0?c.max.y:c.min.y,a.z=f.normal.z>0?c.min.z:c.max.z,b.z=f.normal.z>0?c.max.z:c.min.z;var g=f.distanceToPoint(a),h=f.distanceToPoint(b);if(g<0&&h<0)return!1}return!0}}(),containsPoint:function(a){for(var b=this.planes,c=0;c<6;c++)if(b[c].distanceToPoint(a)<0)return!1;return!0}}),ga.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"],ga.DefaultOrder="XYZ",Object.defineProperties(ga.prototype,{x:{get:function(){return this._x},set:function(a){this._x=a,this.onChangeCallback()}},y:{get:function(){return this._y},set:function(a){this._y=a,this.onChangeCallback()}},z:{get:function(){return this._z},set:function(a){this._z=a,this.onChangeCallback()}},order:{get:function(){return this._order},set:function(a){this._order=a,this.onChangeCallback()}}}),Object.assign(ga.prototype,{isEuler:!0,set:function(a,b,c,d){return this._x=a,this._y=b,this._z=c,this._order=d||this._order,this.onChangeCallback(),this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._order)},copy:function(a){return this._x=a._x,this._y=a._y,this._z=a._z,this._order=a._order,this.onChangeCallback(),this},setFromRotationMatrix:function(a,b,c){var d=yd.clamp,e=a.elements,f=e[0],g=e[4],h=e[8],i=e[1],j=e[5],k=e[9],l=e[2],m=e[6],n=e[10];return b=b||this._order,"XYZ"===b?(this._y=Math.asin(d(h,-1,1)),Math.abs(h)<.99999?(this._x=Math.atan2(-k,n),this._z=Math.atan2(-g,f)):(this._x=Math.atan2(m,j),this._z=0)):"YXZ"===b?(this._x=Math.asin(-d(k,-1,1)),Math.abs(k)<.99999?(this._y=Math.atan2(h,n),this._z=Math.atan2(i,j)):(this._y=Math.atan2(-l,f),this._z=0)):"ZXY"===b?(this._x=Math.asin(d(m,-1,1)),Math.abs(m)<.99999?(this._y=Math.atan2(-l,n),this._z=Math.atan2(-g,j)):(this._y=0,this._z=Math.atan2(i,f))):"ZYX"===b?(this._y=Math.asin(-d(l,-1,1)),Math.abs(l)<.99999?(this._x=Math.atan2(m,n),this._z=Math.atan2(i,f)):(this._x=0,this._z=Math.atan2(-g,j))):"YZX"===b?(this._z=Math.asin(d(i,-1,1)),Math.abs(i)<.99999?(this._x=Math.atan2(-k,j),this._y=Math.atan2(-l,f)):(this._x=0,this._y=Math.atan2(h,n))):"XZY"===b?(this._z=Math.asin(-d(g,-1,1)),Math.abs(g)<.99999?(this._x=Math.atan2(m,j),this._y=Math.atan2(h,f)):(this._x=Math.atan2(-k,n),this._y=0)):console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: "+b),this._order=b,!1!==c&&this.onChangeCallback(),this},setFromQuaternion:function(){var a=new d;return function(b,c,d){return a.makeRotationFromQuaternion(b),this.setFromRotationMatrix(a,c,d)}}(),setFromVector3:function(a,b){return this.set(a.x,a.y,a.z,b||this._order)},reorder:function(){var a=new e;return function(b){return a.setFromEuler(this),this.setFromQuaternion(a,b)}}(),equals:function(a){return a._x===this._x&&a._y===this._y&&a._z===this._z&&a._order===this._order},fromArray:function(a){return this._x=a[0],this._y=a[1],this._z=a[2],void 0!==a[3]&&(this._order=a[3]),this.onChangeCallback(),this},toArray:function(a,b){return void 0===a&&(a=[]),void 0===b&&(b=0),a[b]=this._x,a[b+1]=this._y,a[b+2]=this._z,a[b+3]=this._order,a},toVector3:function(a){return a?a.set(this._x,this._y,this._z):new f(this._x,this._y,this._z)},onChange:function(a){return this.onChangeCallback=a,this},onChangeCallback:function(){}}),Object.assign(ha.prototype,{set:function(a){this.mask=1<<a|0},enable:function(a){this.mask|=1<<a|0},toggle:function(a){this.mask^=1<<a|0},disable:function(a){this.mask&=~(1<<a|0)},test:function(a){return 0!=(this.mask&a.mask)}});var Pf=0;ia.DefaultUp=new f(0,1,0),ia.DefaultMatrixAutoUpdate=!0,ia.prototype=Object.assign(Object.create(b.prototype),{constructor:ia,isObject3D:!0,onBeforeRender:function(){},onAfterRender:function(){},applyMatrix:function(a){this.matrix.multiplyMatrices(a,this.matrix),this.matrix.decompose(this.position,this.quaternion,this.scale)},applyQuaternion:function(a){return this.quaternion.premultiply(a),this},setRotationFromAxisAngle:function(a,b){this.quaternion.setFromAxisAngle(a,b)},setRotationFromEuler:function(a){this.quaternion.setFromEuler(a,!0)},setRotationFromMatrix:function(a){this.quaternion.setFromRotationMatrix(a)},setRotationFromQuaternion:function(a){this.quaternion.copy(a)},rotateOnAxis:function(){var a=new e;return function(b,c){return a.setFromAxisAngle(b,c),this.quaternion.multiply(a),this}}(),rotateOnWorldAxis:function(){var a=new e;return function(b,c){return a.setFromAxisAngle(b,c),this.quaternion.premultiply(a),this}}(),rotateX:function(){var a=new f(1,0,0);return function(b){return this.rotateOnAxis(a,b)}}(),rotateY:function(){var a=new f(0,1,0);return function(b){return this.rotateOnAxis(a,b)}}(),rotateZ:function(){var a=new f(0,0,1);return function(b){return this.rotateOnAxis(a,b)}}(),translateOnAxis:function(){var a=new f;return function(b,c){return a.copy(b).applyQuaternion(this.quaternion),this.position.add(a.multiplyScalar(c)),this}}(),translateX:function(){var a=new f(1,0,0);return function(b){return this.translateOnAxis(a,b)}}(),translateY:function(){var a=new f(0,1,0);return function(b){return this.translateOnAxis(a,b)}}(),translateZ:function(){var a=new f(0,0,1);return function(b){return this.translateOnAxis(a,b)}}(),localToWorld:function(a){return a.applyMatrix4(this.matrixWorld)},worldToLocal:function(){var a=new d;return function(b){return b.applyMatrix4(a.getInverse(this.matrixWorld))}}(),lookAt:function(){var a=new d,b=new f;return function(c,d,e){c.isVector3?b.copy(c):b.set(c,d,e),this.isCamera?a.lookAt(this.position,b,this.up):a.lookAt(b,this.position,this.up),this.quaternion.setFromRotationMatrix(a)}}(),add:function(a){if(arguments.length>1){for(var b=0;b<arguments.length;b++)this.add(arguments[b]);return this}return a===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",a),this):(a&&a.isObject3D?(null!==a.parent&&a.parent.remove(a),a.parent=this,a.dispatchEvent({type:"added"}),this.children.push(a)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",a),this)},remove:function(a){if(arguments.length>1){for(var b=0;b<arguments.length;b++)this.remove(arguments[b]);return this}var c=this.children.indexOf(a);return-1!==c&&(a.parent=null,a.dispatchEvent({type:"removed"}),this.children.splice(c,1)),this},getObjectById:function(a){return this.getObjectByProperty("id",a)},getObjectByName:function(a){return this.getObjectByProperty("name",a)},getObjectByProperty:function(a,b){if(this[a]===b)return this;for(var c=0,d=this.children.length;c<d;c++){var e=this.children[c],f=e.getObjectByProperty(a,b);if(void 0!==f)return f}},getWorldPosition:function(a){var b=a||new f;return this.updateMatrixWorld(!0),b.setFromMatrixPosition(this.matrixWorld)},getWorldQuaternion:function(){var a=new f,b=new f;return function(c){var d=c||new e;return this.updateMatrixWorld(!0),this.matrixWorld.decompose(a,d,b),d}}(),getWorldRotation:function(){var a=new e;return function(b){var c=b||new ga;return this.getWorldQuaternion(a),c.setFromQuaternion(a,this.rotation.order,!1)}}(),getWorldScale:function(){var a=new f,b=new e;return function(c){var d=c||new f;return this.updateMatrixWorld(!0),this.matrixWorld.decompose(a,b,d),d}}(),getWorldDirection:function(){var a=new e;return function(b){var c=b||new f;return this.getWorldQuaternion(a),c.set(0,0,1).applyQuaternion(a)}}(),raycast:function(){},traverse:function(a){a(this);for(var b=this.children,c=0,d=b.length;c<d;c++)b[c].traverse(a)},traverseVisible:function(a){if(!1!==this.visible){a(this);for(var b=this.children,c=0,d=b.length;c<d;c++)b[c].traverseVisible(a)}},traverseAncestors:function(a){var b=this.parent;null!==b&&(a(b),b.traverseAncestors(a))},updateMatrix:function(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(a){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,a=!0);for(var b=this.children,c=0,d=b.length;c<d;c++)b[c].updateMatrixWorld(a)},toJSON:function(a){function b(b,c){return void 0===b[c.uuid]&&(b[c.uuid]=c.toJSON(a)),c.uuid}function c(a){var b=[];for(var c in a){var d=a[c];delete d.metadata,b.push(d)}return b}var d=void 0===a||"string"==typeof a,e={};d&&(a={geometries:{},materials:{},textures:{},images:{},shapes:{}},e.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});var f={};if(f.uuid=this.uuid,f.type=this.type,""!==this.name&&(f.name=this.name),!0===this.castShadow&&(f.castShadow=!0),!0===this.receiveShadow&&(f.receiveShadow=!0),!1===this.visible&&(f.visible=!1),"{}"!==JSON.stringify(this.userData)&&(f.userData=this.userData),f.matrix=this.matrix.toArray(),void 0!==this.geometry){f.geometry=b(a.geometries,this.geometry);var g=this.geometry.parameters;if(void 0!==g&&void 0!==g.shapes){var h=g.shapes;if(Array.isArray(h))for(var i=0,j=h.length;i<j;i++){var k=h[i];b(a.shapes,k)}else b(a.shapes,h)}}if(void 0!==this.material)if(Array.isArray(this.material)){for(var l=[],i=0,j=this.material.length;i<j;i++)l.push(b(a.materials,this.material[i]));f.material=l}else f.material=b(a.materials,this.material);if(this.children.length>0){f.children=[];for(var i=0;i<this.children.length;i++)f.children.push(this.children[i].toJSON(a).object)}if(d){var m=c(a.geometries),n=c(a.materials),o=c(a.textures),p=c(a.images),h=c(a.shapes);m.length>0&&(e.geometries=m),n.length>0&&(e.materials=n),o.length>0&&(e.textures=o),p.length>0&&(e.images=p),h.length>0&&(e.shapes=h)}return e.object=f,e},clone:function(a){return(new this.constructor).copy(this,a)},copy:function(a,b){if(void 0===b&&(b=!0),this.name=a.name,this.up.copy(a.up),this.position.copy(a.position),this.quaternion.copy(a.quaternion),this.scale.copy(a.scale),this.matrix.copy(a.matrix),this.matrixWorld.copy(a.matrixWorld),this.matrixAutoUpdate=a.matrixAutoUpdate,this.matrixWorldNeedsUpdate=a.matrixWorldNeedsUpdate,this.layers.mask=a.layers.mask,this.visible=a.visible,this.castShadow=a.castShadow,this.receiveShadow=a.receiveShadow,this.frustumCulled=a.frustumCulled,this.renderOrder=a.renderOrder,this.userData=JSON.parse(JSON.stringify(a.userData)),!0===b)for(var c=0;c<a.children.length;c++){var d=a.children[c];this.add(d.clone())}return this}}),ja.prototype=Object.assign(Object.create(ia.prototype),{constructor:ja,isCamera:!0,copy:function(a,b){return ia.prototype.copy.call(this,a,b),this.matrixWorldInverse.copy(a.matrixWorldInverse),this.projectionMatrix.copy(a.projectionMatrix),this},getWorldDirection:function(){var a=new e;return function(b){var c=b||new f;return this.getWorldQuaternion(a),c.set(0,0,-1).applyQuaternion(a)}}(),updateMatrixWorld:function(a){ia.prototype.updateMatrixWorld.call(this,a),this.matrixWorldInverse.getInverse(this.matrixWorld)},clone:function(){return(new this.constructor).copy(this)}}),ka.prototype=Object.assign(Object.create(ja.prototype),{constructor:ka,isOrthographicCamera:!0,copy:function(a,b){return ja.prototype.copy.call(this,a,b),this.left=a.left,this.right=a.right,this.top=a.top,this.bottom=a.bottom,this.near=a.near,this.far=a.far,this.zoom=a.zoom,this.view=null===a.view?null:Object.assign({},a.view),this},setViewOffset:function(a,b,c,d,e,f){null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=a,this.view.fullHeight=b,this.view.offsetX=c,this.view.offsetY=d,this.view.width=e,this.view.height=f,this.updateProjectionMatrix()},clearViewOffset:function(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()},updateProjectionMatrix:function(){var a=(this.right-this.left)/(2*this.zoom),b=(this.top-this.bottom)/(2*this.zoom),c=(this.right+this.left)/2,d=(this.top+this.bottom)/2,e=c-a,f=c+a,g=d+b,h=d-b;if(null!==this.view&&this.view.enabled){var i=this.zoom/(this.view.width/this.view.fullWidth),j=this.zoom/(this.view.height/this.view.fullHeight),k=(this.right-this.left)/this.view.width,l=(this.top-this.bottom)/this.view.height;e+=k*(this.view.offsetX/i),f=e+k*(this.view.width/i),g-=l*(this.view.offsetY/j),h=g-l*(this.view.height/j)}this.projectionMatrix.makeOrthographic(e,f,g,h,this.near,this.far)},toJSON:function(a){var b=ia.prototype.toJSON.call(this,a);return b.object.zoom=this.zoom,b.object.left=this.left,b.object.right=this.right,b.object.top=this.top,b.object.bottom=this.bottom,b.object.near=this.near,b.object.far=this.far,null!==this.view&&(b.object.view=Object.assign({},this.view)),b}}),Object.assign(la.prototype,{clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.a=a.a,this.b=a.b,this.c=a.c,this.normal.copy(a.normal),this.color.copy(a.color),this.materialIndex=a.materialIndex;for(var b=0,c=a.vertexNormals.length;b<c;b++)this.vertexNormals[b]=a.vertexNormals[b].clone();for(var b=0,c=a.vertexColors.length;b<c;b++)this.vertexColors[b]=a.vertexColors[b].clone();return this}});var Qf=0;ma.prototype=Object.assign(Object.create(b.prototype),{constructor:ma,isGeometry:!0,applyMatrix:function(a){for(var b=(new g).getNormalMatrix(a),c=0,d=this.vertices.length;c<d;c++){this.vertices[c].applyMatrix4(a)}for(var c=0,d=this.faces.length;c<d;c++){var e=this.faces[c];e.normal.applyMatrix3(b).normalize();for(var f=0,h=e.vertexNormals.length;f<h;f++)e.vertexNormals[f].applyMatrix3(b).normalize()}return null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this.verticesNeedUpdate=!0,this.normalsNeedUpdate=!0,this},rotateX:function(){var a=new d;return function(b){return a.makeRotationX(b),this.applyMatrix(a),this}}(),rotateY:function(){var a=new d;return function(b){return a.makeRotationY(b),this.applyMatrix(a),this}}(),rotateZ:function(){var a=new d;return function(b){return a.makeRotationZ(b),this.applyMatrix(a),this}}(),translate:function(){var a=new d;return function(b,c,d){return a.makeTranslation(b,c,d),this.applyMatrix(a),this}}(),scale:function(){var a=new d;return function(b,c,d){return a.makeScale(b,c,d),this.applyMatrix(a),this}}(),lookAt:function(){var a=new ia;return function(b){a.lookAt(b),a.updateMatrix(),this.applyMatrix(a.matrix)}}(),fromBufferGeometry:function(a){function b(a,b,c,e){var f=void 0!==i?[m[a].clone(),m[b].clone(),m[c].clone()]:[],g=void 0!==j?[d.colors[a].clone(),d.colors[b].clone(),d.colors[c].clone()]:[],h=new la(a,b,c,f,g,e);d.faces.push(h),void 0!==k&&d.faceVertexUvs[0].push([n[a].clone(),n[b].clone(),n[c].clone()]),void 0!==l&&d.faceVertexUvs[1].push([o[a].clone(),o[b].clone(),o[c].clone()])}var d=this,e=null!==a.index?a.index.array:void 0,g=a.attributes,h=g.position.array,i=void 0!==g.normal?g.normal.array:void 0,j=void 0!==g.color?g.color.array:void 0,k=void 0!==g.uv?g.uv.array:void 0,l=void 0!==g.uv2?g.uv2.array:void 0;void 0!==l&&(this.faceVertexUvs[1]=[]);for(var m=[],n=[],o=[],p=0,q=0;p<h.length;p+=3,q+=2)d.vertices.push(new f(h[p],h[p+1],h[p+2])),void 0!==i&&m.push(new f(i[p],i[p+1],i[p+2])),void 0!==j&&d.colors.push(new U(j[p],j[p+1],j[p+2])),void 0!==k&&n.push(new c(k[q],k[q+1])),void 0!==l&&o.push(new c(l[q],l[q+1]));var r=a.groups;if(r.length>0)for(var p=0;p<r.length;p++)for(var s=r[p],t=s.start,u=s.count,q=t,v=t+u;q<v;q+=3)void 0!==e?b(e[q],e[q+1],e[q+2],s.materialIndex):b(q,q+1,q+2,s.materialIndex);else if(void 0!==e)for(var p=0;p<e.length;p+=3)b(e[p],e[p+1],e[p+2]);else for(var p=0;p<h.length/3;p+=3)b(p,p+1,p+2);return this.computeFaceNormals(),null!==a.boundingBox&&(this.boundingBox=a.boundingBox.clone()),null!==a.boundingSphere&&(this.boundingSphere=a.boundingSphere.clone()),this},center:function(){this.computeBoundingBox();var a=this.boundingBox.getCenter().negate();return this.translate(a.x,a.y,a.z),a},normalize:function(){this.computeBoundingSphere();var a=this.boundingSphere.center,b=this.boundingSphere.radius,c=0===b?1:1/b,e=new d;return e.set(c,0,0,-c*a.x,0,c,0,-c*a.y,0,0,c,-c*a.z,0,0,0,1),this.applyMatrix(e),this},computeFaceNormals:function(){for(var a=new f,b=new f,c=0,d=this.faces.length;c<d;c++){var e=this.faces[c],g=this.vertices[e.a],h=this.vertices[e.b],i=this.vertices[e.c];a.subVectors(i,h),b.subVectors(g,h),a.cross(b),a.normalize(),e.normal.copy(a)}},computeVertexNormals:function(a){void 0===a&&(a=!0);var b,c,d,e,g,h;for(h=new Array(this.vertices.length),b=0,c=this.vertices.length;b<c;b++)h[b]=new f;if(a){var i,j,k,l=new f,m=new f;for(d=0,e=this.faces.length;d<e;d++)g=this.faces[d],i=this.vertices[g.a],j=this.vertices[g.b],k=this.vertices[g.c],l.subVectors(k,j),m.subVectors(i,j),l.cross(m),h[g.a].add(l),h[g.b].add(l),h[g.c].add(l)}else for(this.computeFaceNormals(),d=0,e=this.faces.length;d<e;d++)g=this.faces[d],h[g.a].add(g.normal),h[g.b].add(g.normal),h[g.c].add(g.normal);for(b=0,c=this.vertices.length;b<c;b++)h[b].normalize();for(d=0,e=this.faces.length;d<e;d++){g=this.faces[d];var n=g.vertexNormals;3===n.length?(n[0].copy(h[g.a]),n[1].copy(h[g.b]),n[2].copy(h[g.c])):(n[0]=h[g.a].clone(),n[1]=h[g.b].clone(),n[2]=h[g.c].clone())}this.faces.length>0&&(this.normalsNeedUpdate=!0)},computeFlatVertexNormals:function(){var a,b,c;for(this.computeFaceNormals(),a=0,b=this.faces.length;a<b;a++){c=this.faces[a];var d=c.vertexNormals;3===d.length?(d[0].copy(c.normal),d[1].copy(c.normal),d[2].copy(c.normal)):(d[0]=c.normal.clone(),d[1]=c.normal.clone(),d[2]=c.normal.clone())}this.faces.length>0&&(this.normalsNeedUpdate=!0)},computeMorphNormals:function(){var a,b,c,d,e;for(c=0,d=this.faces.length;c<d;c++)for(e=this.faces[c],e.__originalFaceNormal?e.__originalFaceNormal.copy(e.normal):e.__originalFaceNormal=e.normal.clone(),e.__originalVertexNormals||(e.__originalVertexNormals=[]),a=0,b=e.vertexNormals.length;a<b;a++)e.__originalVertexNormals[a]?e.__originalVertexNormals[a].copy(e.vertexNormals[a]):e.__originalVertexNormals[a]=e.vertexNormals[a].clone();var g=new ma;for(g.faces=this.faces,a=0,b=this.morphTargets.length;a<b;a++){if(!this.morphNormals[a]){this.morphNormals[a]={},this.morphNormals[a].faceNormals=[],this.morphNormals[a].vertexNormals=[];var h,i,j=this.morphNormals[a].faceNormals,k=this.morphNormals[a].vertexNormals;for(c=0,d=this.faces.length;c<d;c++)h=new f,i={a:new f,b:new f,c:new f},j.push(h),k.push(i)}var l=this.morphNormals[a];g.vertices=this.morphTargets[a].vertices,g.computeFaceNormals(),g.computeVertexNormals();var h,i;for(c=0,d=this.faces.length;c<d;c++)e=this.faces[c],h=l.faceNormals[c],i=l.vertexNormals[c],h.copy(e.normal),i.a.copy(e.vertexNormals[0]),i.b.copy(e.vertexNormals[1]),i.c.copy(e.vertexNormals[2])}for(c=0,d=this.faces.length;c<d;c++)e=this.faces[c],e.normal=e.__originalFaceNormal,e.vertexNormals=e.__originalVertexNormals},computeLineDistances:function(){for(var a=0,b=this.vertices,c=0,d=b.length;c<d;c++)c>0&&(a+=b[c].distanceTo(b[c-1])),this.lineDistances[c]=a},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new aa),this.boundingBox.setFromPoints(this.vertices)},computeBoundingSphere:function(){null===this.boundingSphere&&(this.boundingSphere=new ba),this.boundingSphere.setFromPoints(this.vertices)},merge:function(a,b,c){if(!a||!a.isGeometry)return void console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.",a);var d,e=this.vertices.length,f=this.vertices,h=a.vertices,i=this.faces,j=a.faces,k=this.faceVertexUvs[0],l=a.faceVertexUvs[0],m=this.colors,n=a.colors;void 0===c&&(c=0),void 0!==b&&(d=(new g).getNormalMatrix(b));for(var o=0,p=h.length;o<p;o++){var q=h[o],r=q.clone();void 0!==b&&r.applyMatrix4(b),f.push(r)}for(var o=0,p=n.length;o<p;o++)m.push(n[o].clone());for(o=0,p=j.length;o<p;o++){var s,t,u,v=j[o],w=v.vertexNormals,x=v.vertexColors;s=new la(v.a+e,v.b+e,v.c+e),s.normal.copy(v.normal),void 0!==d&&s.normal.applyMatrix3(d).normalize();for(var y=0,z=w.length;y<z;y++)t=w[y].clone(),void 0!==d&&t.applyMatrix3(d).normalize(),s.vertexNormals.push(t);s.color.copy(v.color);for(var y=0,z=x.length;y<z;y++)u=x[y],s.vertexColors.push(u.clone());s.materialIndex=v.materialIndex+c,i.push(s)}for(o=0,p=l.length;o<p;o++){var A=l[o],B=[];if(void 0!==A){for(var y=0,z=A.length;y<z;y++)B.push(A[y].clone());k.push(B)}}},mergeMesh:function(a){if(!a||!a.isMesh)return void console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.",a);a.matrixAutoUpdate&&a.updateMatrix(),this.merge(a.geometry,a.matrix)},mergeVertices:function(){var a,b,c,d,e,f,g,h,i={},j=[],k=[],l=4,m=Math.pow(10,l);for(c=0,d=this.vertices.length;c<d;c++)a=this.vertices[c],b=Math.round(a.x*m)+"_"+Math.round(a.y*m)+"_"+Math.round(a.z*m),void 0===i[b]?(i[b]=c,j.push(this.vertices[c]),k[c]=j.length-1):k[c]=k[i[b]];var n=[];for(c=0,d=this.faces.length;c<d;c++){e=this.faces[c],e.a=k[e.a],e.b=k[e.b],e.c=k[e.c],f=[e.a,e.b,e.c];for(var o=0;o<3;o++)if(f[o]===f[(o+1)%3]){n.push(c);break}}for(c=n.length-1;c>=0;c--){var p=n[c];for(this.faces.splice(p,1),g=0,h=this.faceVertexUvs.length;g<h;g++)this.faceVertexUvs[g].splice(p,1)}var q=this.vertices.length-j.length;return this.vertices=j,q},setFromPoints:function(a){this.vertices=[];for(var b=0,c=a.length;b<c;b++){var d=a[b];this.vertices.push(new f(d.x,d.y,d.z||0))}return this},sortFacesByMaterialIndex:function(){function a(a,b){return a.materialIndex-b.materialIndex}for(var b=this.faces,c=b.length,d=0;d<c;d++)b[d]._id=d;b.sort(a);var e,f,g=this.faceVertexUvs[0],h=this.faceVertexUvs[1];g&&g.length===c&&(e=[]),h&&h.length===c&&(f=[]);for(var d=0;d<c;d++){var i=b[d]._id;e&&e.push(g[i]),f&&f.push(h[i])}e&&(this.faceVertexUvs[0]=e),f&&(this.faceVertexUvs[1]=f)},toJSON:function(){function a(a,b,c){return c?a|1<<b:a&~(1<<b)}function b(a){var b=a.x.toString()+a.y.toString()+a.z.toString();return void 0!==m[b]?m[b]:(m[b]=l.length/3,l.push(a.x,a.y,a.z),m[b])}function c(a){var b=a.r.toString()+a.g.toString()+a.b.toString();return void 0!==o[b]?o[b]:(o[b]=n.length,n.push(a.getHex()),o[b])}function d(a){var b=a.x.toString()+a.y.toString();return void 0!==q[b]?q[b]:(q[b]=p.length/2,p.push(a.x,a.y),q[b])}var e={metadata:{version:4.5,type:"Geometry",generator:"Geometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,""!==this.name&&(e.name=this.name),void 0!==this.parameters){var f=this.parameters;for(var g in f)void 0!==f[g]&&(e[g]=f[g]);return e}for(var h=[],i=0;i<this.vertices.length;i++){var j=this.vertices[i];h.push(j.x,j.y,j.z)}for(var k=[],l=[],m={},n=[],o={},p=[],q={},i=0;i<this.faces.length;i++){var r=this.faces[i],s=void 0!==this.faceVertexUvs[0][i],t=r.normal.length()>0,u=r.vertexNormals.length>0,v=1!==r.color.r||1!==r.color.g||1!==r.color.b,w=r.vertexColors.length>0,x=0;if(x=a(x,0,0),x=a(x,1,!0),x=a(x,2,!1),x=a(x,3,s),x=a(x,4,t),x=a(x,5,u),x=a(x,6,v),x=a(x,7,w),k.push(x),k.push(r.a,r.b,r.c),k.push(r.materialIndex),s){var y=this.faceVertexUvs[0][i];k.push(d(y[0]),d(y[1]),d(y[2]))}if(t&&k.push(b(r.normal)),u){var z=r.vertexNormals;k.push(b(z[0]),b(z[1]),b(z[2]))}if(v&&k.push(c(r.color)),w){var A=r.vertexColors;k.push(c(A[0]),c(A[1]),c(A[2]))}}return e.data={},e.data.vertices=h,e.data.normals=l,n.length>0&&(e.data.colors=n),p.length>0&&(e.data.uvs=[p]),e.data.faces=k,e},clone:function(){return(new ma).copy(this)},copy:function(a){var b,c,d,e,f,g;this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.name=a.name;var h=a.vertices;for(b=0,c=h.length;b<c;b++)this.vertices.push(h[b].clone());var i=a.colors;for(b=0,c=i.length;b<c;b++)this.colors.push(i[b].clone());var j=a.faces;for(b=0,c=j.length;b<c;b++)this.faces.push(j[b].clone());for(b=0,c=a.faceVertexUvs.length;b<c;b++){var k=a.faceVertexUvs[b];for(void 0===this.faceVertexUvs[b]&&(this.faceVertexUvs[b]=[]),d=0,e=k.length;d<e;d++){var l=k[d],m=[];for(f=0,g=l.length;f<g;f++){var n=l[f];m.push(n.clone())}this.faceVertexUvs[b].push(m)}}var o=a.morphTargets;for(b=0,c=o.length;b<c;b++){var p={};if(p.name=o[b].name,void 0!==o[b].vertices)for(p.vertices=[],d=0,e=o[b].vertices.length;d<e;d++)p.vertices.push(o[b].vertices[d].clone());if(void 0!==o[b].normals)for(p.normals=[],d=0,e=o[b].normals.length;d<e;d++)p.normals.push(o[b].normals[d].clone());this.morphTargets.push(p)}var q=a.morphNormals;for(b=0,c=q.length;b<c;b++){var r={};if(void 0!==q[b].vertexNormals)for(r.vertexNormals=[],d=0,e=q[b].vertexNormals.length;d<e;d++){var s=q[b].vertexNormals[d],t={};t.a=s.a.clone(),t.b=s.b.clone(),t.c=s.c.clone(),r.vertexNormals.push(t)}if(void 0!==q[b].faceNormals)for(r.faceNormals=[],d=0,e=q[b].faceNormals.length;d<e;d++)r.faceNormals.push(q[b].faceNormals[d].clone());this.morphNormals.push(r)}var u=a.skinWeights;for(b=0,c=u.length;b<c;b++)this.skinWeights.push(u[b].clone());var v=a.skinIndices;for(b=0,c=v.length;b<c;b++)this.skinIndices.push(v[b].clone());var w=a.lineDistances;for(b=0,c=w.length;b<c;b++)this.lineDistances.push(w[b]);var x=a.boundingBox;null!==x&&(this.boundingBox=x.clone());var y=a.boundingSphere;return null!==y&&(this.boundingSphere=y.clone()),this.elementsNeedUpdate=a.elementsNeedUpdate,this.verticesNeedUpdate=a.verticesNeedUpdate,this.uvsNeedUpdate=a.uvsNeedUpdate,this.normalsNeedUpdate=a.normalsNeedUpdate,this.colorsNeedUpdate=a.colorsNeedUpdate,this.lineDistancesNeedUpdate=a.lineDistancesNeedUpdate,this.groupsNeedUpdate=a.groupsNeedUpdate,this},dispose:function(){this.dispatchEvent({type:"dispose"})}}),Object.defineProperty(na.prototype,"needsUpdate",{set:function(a){!0===a&&this.version++}}),Object.assign(na.prototype,{isBufferAttribute:!0,setArray:function(a){if(Array.isArray(a))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.count=void 0!==a?a.length/this.itemSize:0,this.array=a},setDynamic:function(a){return this.dynamic=a,this},copy:function(a){return this.array=new a.array.constructor(a.array),this.itemSize=a.itemSize,this.count=a.count,this.normalized=a.normalized,this.dynamic=a.dynamic,this},copyAt:function(a,b,c){a*=this.itemSize,c*=b.itemSize;for(var d=0,e=this.itemSize;d<e;d++)this.array[a+d]=b.array[c+d];return this},copyArray:function(a){return this.array.set(a),this},copyColorsArray:function(a){for(var b=this.array,c=0,d=0,e=a.length;d<e;d++){var f=a[d];void 0===f&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",d),f=new U),b[c++]=f.r,b[c++]=f.g,b[c++]=f.b}return this},copyIndicesArray:function(a){for(var b=this.array,c=0,d=0,e=a.length;d<e;d++){var f=a[d];b[c++]=f.a,b[c++]=f.b,b[c++]=f.c}return this},copyVector2sArray:function(a){for(var b=this.array,d=0,e=0,f=a.length;e<f;e++){var g=a[e];void 0===g&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",e),g=new c),b[d++]=g.x,b[d++]=g.y}return this},copyVector3sArray:function(a){for(var b=this.array,c=0,d=0,e=a.length;d<e;d++){var g=a[d];void 0===g&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",d),g=new f),b[c++]=g.x,b[c++]=g.y,b[c++]=g.z}return this},copyVector4sArray:function(a){for(var b=this.array,c=0,d=0,e=a.length;d<e;d++){var f=a[d];void 0===f&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",d),f=new i),b[c++]=f.x,b[c++]=f.y,b[c++]=f.z,b[c++]=f.w}return this},set:function(a,b){return void 0===b&&(b=0),this.array.set(a,b),this},getX:function(a){return this.array[a*this.itemSize]},setX:function(a,b){return this.array[a*this.itemSize]=b,this},getY:function(a){return this.array[a*this.itemSize+1]},setY:function(a,b){return this.array[a*this.itemSize+1]=b,this},getZ:function(a){return this.array[a*this.itemSize+2]},setZ:function(a,b){return this.array[a*this.itemSize+2]=b,this},getW:function(a){return this.array[a*this.itemSize+3]},setW:function(a,b){return this.array[a*this.itemSize+3]=b,this},setXY:function(a,b,c){return a*=this.itemSize,this.array[a+0]=b,this.array[a+1]=c,this},setXYZ:function(a,b,c,d){return a*=this.itemSize,this.array[a+0]=b,this.array[a+1]=c,this.array[a+2]=d,this},setXYZW:function(a,b,c,d,e){return a*=this.itemSize,this.array[a+0]=b,this.array[a+1]=c,this.array[a+2]=d,this.array[a+3]=e,this},onUpload:function(a){return this.onUploadCallback=a,this},clone:function(){return new this.constructor(this.array,this.itemSize).copy(this)}}),oa.prototype=Object.create(na.prototype),oa.prototype.constructor=oa,pa.prototype=Object.create(na.prototype),pa.prototype.constructor=pa,qa.prototype=Object.create(na.prototype),qa.prototype.constructor=qa,ra.prototype=Object.create(na.prototype),ra.prototype.constructor=ra,sa.prototype=Object.create(na.prototype),sa.prototype.constructor=sa,ta.prototype=Object.create(na.prototype),ta.prototype.constructor=ta,ua.prototype=Object.create(na.prototype),ua.prototype.constructor=ua,va.prototype=Object.create(na.prototype),va.prototype.constructor=va,wa.prototype=Object.create(na.prototype),wa.prototype.constructor=wa,Object.assign(xa.prototype,{computeGroups:function(a){for(var b,c=[],d=void 0,e=a.faces,f=0;f<e.length;f++){var g=e[f];g.materialIndex!==d&&(d=g.materialIndex,void 0!==b&&(b.count=3*f-b.start,c.push(b)),b={start:3*f,materialIndex:d})}void 0!==b&&(b.count=3*f-b.start,c.push(b)),this.groups=c},fromGeometry:function(a){var b,d=a.faces,e=a.vertices,f=a.faceVertexUvs,g=f[0]&&f[0].length>0,h=f[1]&&f[1].length>0,i=a.morphTargets,j=i.length;if(j>0){b=[];for(var k=0;k<j;k++)b[k]=[];this.morphTargets.position=b}var l,m=a.morphNormals,n=m.length;if(n>0){l=[];for(var k=0;k<n;k++)l[k]=[];this.morphTargets.normal=l}for(var o=a.skinIndices,p=a.skinWeights,q=o.length===e.length,r=p.length===e.length,k=0;k<d.length;k++){var s=d[k];this.vertices.push(e[s.a],e[s.b],e[s.c]);var t=s.vertexNormals;if(3===t.length)this.normals.push(t[0],t[1],t[2]);else{var u=s.normal;this.normals.push(u,u,u)}var v=s.vertexColors;if(3===v.length)this.colors.push(v[0],v[1],v[2]);else{var w=s.color;this.colors.push(w,w,w)}if(!0===g){var x=f[0][k];void 0!==x?this.uvs.push(x[0],x[1],x[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ",k),this.uvs.push(new c,new c,new c))}if(!0===h){var x=f[1][k];void 0!==x?this.uvs2.push(x[0],x[1],x[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ",k),this.uvs2.push(new c,new c,new c))}for(var y=0;y<j;y++){var z=i[y].vertices;b[y].push(z[s.a],z[s.b],z[s.c])}for(var y=0;y<n;y++){var A=m[y].vertexNormals[k];l[y].push(A.a,A.b,A.c)}q&&this.skinIndices.push(o[s.a],o[s.b],o[s.c]),r&&this.skinWeights.push(p[s.a],p[s.b],p[s.c])}return this.computeGroups(a),this.verticesNeedUpdate=a.verticesNeedUpdate,this.normalsNeedUpdate=a.normalsNeedUpdate,this.colorsNeedUpdate=a.colorsNeedUpdate,this.uvsNeedUpdate=a.uvsNeedUpdate,this.groupsNeedUpdate=a.groupsNeedUpdate,this}});var Rf=1;za.prototype=Object.assign(Object.create(b.prototype),{constructor:za,isBufferGeometry:!0,getIndex:function(){return this.index},setIndex:function(a){Array.isArray(a)?this.index=new(ya(a)>65535?ua:sa)(a,1):this.index=a},addAttribute:function(a,b){return b&&b.isBufferAttribute||b&&b.isInterleavedBufferAttribute?"index"===a?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),void this.setIndex(b)):(this.attributes[a]=b,this):(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),void this.addAttribute(a,new na(arguments[1],arguments[2])))},getAttribute:function(a){return this.attributes[a]},removeAttribute:function(a){return delete this.attributes[a],this},addGroup:function(a,b,c){this.groups.push({start:a,count:b,materialIndex:void 0!==c?c:0})},clearGroups:function(){this.groups=[]},setDrawRange:function(a,b){this.drawRange.start=a,this.drawRange.count=b},applyMatrix:function(a){var b=this.attributes.position;void 0!==b&&(a.applyToBufferAttribute(b),b.needsUpdate=!0);var c=this.attributes.normal;if(void 0!==c){(new g).getNormalMatrix(a).applyToBufferAttribute(c),c.needsUpdate=!0}return null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this},rotateX:function(){var a=new d;return function(b){return a.makeRotationX(b),this.applyMatrix(a),this}}(),rotateY:function(){var a=new d;return function(b){return a.makeRotationY(b),this.applyMatrix(a),this}}(),rotateZ:function(){var a=new d;return function(b){return a.makeRotationZ(b),this.applyMatrix(a),this}}(),translate:function(){var a=new d;return function(b,c,d){return a.makeTranslation(b,c,d),this.applyMatrix(a),this}}(),scale:function(){var a=new d;return function(b,c,d){return a.makeScale(b,c,d),this.applyMatrix(a),this}}(),lookAt:function(){var a=new ia;return function(b){a.lookAt(b),a.updateMatrix(),this.applyMatrix(a.matrix)}}(),center:function(){this.computeBoundingBox();var a=this.boundingBox.getCenter().negate();return this.translate(a.x,a.y,a.z),a},setFromObject:function(a){var b=a.geometry;if(a.isPoints||a.isLine){var c=new va(3*b.vertices.length,3),d=new va(3*b.colors.length,3);if(this.addAttribute("position",c.copyVector3sArray(b.vertices)),this.addAttribute("color",d.copyColorsArray(b.colors)),b.lineDistances&&b.lineDistances.length===b.vertices.length){var e=new va(b.lineDistances.length,1);this.addAttribute("lineDistance",e.copyArray(b.lineDistances))}null!==b.boundingSphere&&(this.boundingSphere=b.boundingSphere.clone()),null!==b.boundingBox&&(this.boundingBox=b.boundingBox.clone())}else a.isMesh&&b&&b.isGeometry&&this.fromGeometry(b);return this},setFromPoints:function(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c];b.push(e.x,e.y,e.z||0)}return this.addAttribute("position",new va(b,3)),this},updateFromObject:function(a){var b=a.geometry;if(a.isMesh){var c=b.__directGeometry;if(!0===b.elementsNeedUpdate&&(c=void 0,b.elementsNeedUpdate=!1),void 0===c)return this.fromGeometry(b);c.verticesNeedUpdate=b.verticesNeedUpdate,c.normalsNeedUpdate=b.normalsNeedUpdate,c.colorsNeedUpdate=b.colorsNeedUpdate,c.uvsNeedUpdate=b.uvsNeedUpdate,c.groupsNeedUpdate=b.groupsNeedUpdate,b.verticesNeedUpdate=!1,b.normalsNeedUpdate=!1,b.colorsNeedUpdate=!1,b.uvsNeedUpdate=!1,b.groupsNeedUpdate=!1,b=c}var d;return!0===b.verticesNeedUpdate&&(d=this.attributes.position,void 0!==d&&(d.copyVector3sArray(b.vertices),d.needsUpdate=!0),b.verticesNeedUpdate=!1),!0===b.normalsNeedUpdate&&(d=this.attributes.normal,void 0!==d&&(d.copyVector3sArray(b.normals),d.needsUpdate=!0),b.normalsNeedUpdate=!1),!0===b.colorsNeedUpdate&&(d=this.attributes.color,void 0!==d&&(d.copyColorsArray(b.colors),d.needsUpdate=!0),b.colorsNeedUpdate=!1),b.uvsNeedUpdate&&(d=this.attributes.uv,void 0!==d&&(d.copyVector2sArray(b.uvs),d.needsUpdate=!0),b.uvsNeedUpdate=!1),b.lineDistancesNeedUpdate&&(d=this.attributes.lineDistance,void 0!==d&&(d.copyArray(b.lineDistances),d.needsUpdate=!0),b.lineDistancesNeedUpdate=!1),b.groupsNeedUpdate&&(b.computeGroups(a.geometry),this.groups=b.groups,b.groupsNeedUpdate=!1),this},fromGeometry:function(a){return a.__directGeometry=(new xa).fromGeometry(a),this.fromDirectGeometry(a.__directGeometry)},fromDirectGeometry:function(a){var b=new Float32Array(3*a.vertices.length);if(this.addAttribute("position",new na(b,3).copyVector3sArray(a.vertices)),a.normals.length>0){var c=new Float32Array(3*a.normals.length);this.addAttribute("normal",new na(c,3).copyVector3sArray(a.normals))}if(a.colors.length>0){var d=new Float32Array(3*a.colors.length);this.addAttribute("color",new na(d,3).copyColorsArray(a.colors))}if(a.uvs.length>0){var e=new Float32Array(2*a.uvs.length);this.addAttribute("uv",new na(e,2).copyVector2sArray(a.uvs))}if(a.uvs2.length>0){var f=new Float32Array(2*a.uvs2.length);this.addAttribute("uv2",new na(f,2).copyVector2sArray(a.uvs2))}if(a.indices.length>0){var g=ya(a.indices)>65535?Uint32Array:Uint16Array,h=new g(3*a.indices.length);this.setIndex(new na(h,1).copyIndicesArray(a.indices))}this.groups=a.groups;for(var i in a.morphTargets){for(var j=[],k=a.morphTargets[i],l=0,m=k.length;l<m;l++){var n=k[l],o=new va(3*n.length,3);j.push(o.copyVector3sArray(n))}this.morphAttributes[i]=j}if(a.skinIndices.length>0){var p=new va(4*a.skinIndices.length,4);this.addAttribute("skinIndex",p.copyVector4sArray(a.skinIndices))}if(a.skinWeights.length>0){var q=new va(4*a.skinWeights.length,4);this.addAttribute("skinWeight",q.copyVector4sArray(a.skinWeights))}return null!==a.boundingSphere&&(this.boundingSphere=a.boundingSphere.clone()),null!==a.boundingBox&&(this.boundingBox=a.boundingBox.clone()),this},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new aa);var a=this.attributes.position;void 0!==a?this.boundingBox.setFromBufferAttribute(a):this.boundingBox.makeEmpty(),(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)},computeBoundingSphere:function(){var a=new aa,b=new f;return function(){null===this.boundingSphere&&(this.boundingSphere=new ba);var c=this.attributes.position;if(c){var d=this.boundingSphere.center;a.setFromBufferAttribute(c),a.getCenter(d);for(var e=0,f=0,g=c.count;f<g;f++)b.x=c.getX(f),b.y=c.getY(f),b.z=c.getZ(f),e=Math.max(e,d.distanceToSquared(b));this.boundingSphere.radius=Math.sqrt(e),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}}(),computeFaceNormals:function(){},computeVertexNormals:function(){var a=this.index,b=this.attributes,c=this.groups;if(b.position){var d=b.position.array;if(void 0===b.normal)this.addAttribute("normal",new na(new Float32Array(d.length),3));else for(var e=b.normal.array,g=0,h=e.length;g<h;g++)e[g]=0;var i,j,k,l=b.normal.array,m=new f,n=new f,o=new f,p=new f,q=new f;if(a){var r=a.array;0===c.length&&this.addGroup(0,r.length);for(var s=0,t=c.length;s<t;++s)for(var u=c[s],v=u.start,w=u.count,g=v,h=v+w;g<h;g+=3)i=3*r[g+0],j=3*r[g+1],k=3*r[g+2],m.fromArray(d,i),n.fromArray(d,j),o.fromArray(d,k),p.subVectors(o,n),q.subVectors(m,n),p.cross(q),l[i]+=p.x,l[i+1]+=p.y,l[i+2]+=p.z,l[j]+=p.x,l[j+1]+=p.y,l[j+2]+=p.z,l[k]+=p.x,l[k+1]+=p.y,l[k+2]+=p.z}else for(var g=0,h=d.length;g<h;g+=9)m.fromArray(d,g),n.fromArray(d,g+3),o.fromArray(d,g+6),p.subVectors(o,n),q.subVectors(m,n),p.cross(q),l[g]=p.x,l[g+1]=p.y,l[g+2]=p.z,l[g+3]=p.x,l[g+4]=p.y,l[g+5]=p.z,l[g+6]=p.x,l[g+7]=p.y,l[g+8]=p.z;this.normalizeNormals(),b.normal.needsUpdate=!0}},merge:function(a,b){if(!a||!a.isBufferGeometry)return void console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",a);void 0===b&&(b=0);var c=this.attributes;for(var d in c)if(void 0!==a.attributes[d])for(var e=c[d],f=e.array,g=a.attributes[d],h=g.array,i=g.itemSize,j=0,k=i*b;j<h.length;j++,k++)f[k]=h[j];return this},normalizeNormals:function(){var a=new f;return function(){for(var b=this.attributes.normal,c=0,d=b.count;c<d;c++)a.x=b.getX(c),a.y=b.getY(c),a.z=b.getZ(c),a.normalize(),b.setXYZ(c,a.x,a.y,a.z)}}(),toNonIndexed:function(){if(null===this.index)return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."),this;var a=new za,b=this.index.array,c=this.attributes;for(var d in c){for(var e=c[d],f=e.array,g=e.itemSize,h=new f.constructor(b.length*g),i=0,j=0,k=0,l=b.length;k<l;k++){i=b[k]*g;for(var m=0;m<g;m++)h[j++]=f[i++]}a.addAttribute(d,new na(h,g))}return a},toJSON:function(){var a={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(a.uuid=this.uuid,a.type=this.type,""!==this.name&&(a.name=this.name),void 0!==this.parameters){var b=this.parameters;for(var c in b)void 0!==b[c]&&(a[c]=b[c]);return a}a.data={attributes:{}};var d=this.index;if(null!==d){var e=Array.prototype.slice.call(d.array);a.data.index={type:d.array.constructor.name,array:e}}var f=this.attributes;for(var c in f){var g=f[c],e=Array.prototype.slice.call(g.array);a.data.attributes[c]={itemSize:g.itemSize,type:g.array.constructor.name,array:e,normalized:g.normalized}}var h=this.groups;h.length>0&&(a.data.groups=JSON.parse(JSON.stringify(h)));var i=this.boundingSphere;return null!==i&&(a.data.boundingSphere={center:i.center.toArray(),radius:i.radius}),a},clone:function(){return(new za).copy(this)},copy:function(a){var b,c,d;this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=a.name;var e=a.index;null!==e&&this.setIndex(e.clone());var f=a.attributes;for(b in f){var g=f[b];this.addAttribute(b,g.clone())}var h=a.morphAttributes;for(b in h){var i=[],j=h[b];for(c=0,d=j.length;c<d;c++)i.push(j[c].clone());this.morphAttributes[b]=i}var k=a.groups;for(c=0,d=k.length;c<d;c++){var l=k[c];this.addGroup(l.start,l.count,l.materialIndex)}var m=a.boundingBox;null!==m&&(this.boundingBox=m.clone());var n=a.boundingSphere;return null!==n&&(this.boundingSphere=n.clone()),this.drawRange.start=a.drawRange.start,this.drawRange.count=a.drawRange.count,this},dispose:function(){this.dispatchEvent({type:"dispose"})}}),Aa.prototype=Object.create(ma.prototype),Aa.prototype.constructor=Aa,Ba.prototype=Object.create(za.prototype),Ba.prototype.constructor=Ba,Ca.prototype=Object.create(ma.prototype),Ca.prototype.constructor=Ca,Da.prototype=Object.create(za.prototype),Da.prototype.constructor=Da,Ea.prototype=Object.create(Z.prototype),Ea.prototype.constructor=Ea,Ea.prototype.isMeshBasicMaterial=!0,Ea.prototype.copy=function(a){return Z.prototype.copy.call(this,a),this.color.copy(a.color),this.map=a.map,this.lightMap=a.lightMap,this.lightMapIntensity=a.lightMapIntensity,this.aoMap=a.aoMap,this.aoMapIntensity=a.aoMapIntensity,this.specularMap=a.specularMap,this.alphaMap=a.alphaMap,this.envMap=a.envMap,this.combine=a.combine,this.reflectivity=a.reflectivity,this.refractionRatio=a.refractionRatio,this.wireframe=a.wireframe,this.wireframeLinewidth=a.wireframeLinewidth,this.wireframeLinecap=a.wireframeLinecap,this.wireframeLinejoin=a.wireframeLinejoin,this.skinning=a.skinning,this.morphTargets=a.morphTargets,this},Fa.prototype=Object.create(Z.prototype),Fa.prototype.constructor=Fa,Fa.prototype.isShaderMaterial=!0,Fa.prototype.copy=function(a){return Z.prototype.copy.call(this,a),this.fragmentShader=a.fragmentShader,this.vertexShader=a.vertexShader,this.uniforms=Jd.clone(a.uniforms),this.defines=a.defines,this.wireframe=a.wireframe,this.wireframeLinewidth=a.wireframeLinewidth,this.lights=a.lights,this.clipping=a.clipping,this.skinning=a.skinning,this.morphTargets=a.morphTargets,this.morphNormals=a.morphNormals,this.extensions=a.extensions,this},Fa.prototype.toJSON=function(a){var b=Z.prototype.toJSON.call(this,a);return b.uniforms=this.uniforms,b.vertexShader=this.vertexShader,b.fragmentShader=this.fragmentShader,b},Object.assign(Ga.prototype,{set:function(a,b){return this.origin.copy(a),this.direction.copy(b),this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){return this.origin.copy(a.origin),this.direction.copy(a.direction),this},at:function(a,b){return(b||new f).copy(this.direction).multiplyScalar(a).add(this.origin)},lookAt:function(a){return this.direction.copy(a).sub(this.origin).normalize(),this},recast:function(){var a=new f;return function(b){return this.origin.copy(this.at(b,a)),this}}(),closestPointToPoint:function(a,b){var c=b||new f;c.subVectors(a,this.origin);var d=c.dot(this.direction);return d<0?c.copy(this.origin):c.copy(this.direction).multiplyScalar(d).add(this.origin)},distanceToPoint:function(a){return Math.sqrt(this.distanceSqToPoint(a))},distanceSqToPoint:function(){var a=new f;return function(b){var c=a.subVectors(b,this.origin).dot(this.direction);return c<0?this.origin.distanceToSquared(b):(a.copy(this.direction).multiplyScalar(c).add(this.origin),a.distanceToSquared(b))}}(),distanceSqToSegment:function(){var a=new f,b=new f,c=new f;return function(d,e,f,g){a.copy(d).add(e).multiplyScalar(.5),b.copy(e).sub(d).normalize(),c.copy(this.origin).sub(a);var h,i,j,k,l=.5*d.distanceTo(e),m=-this.direction.dot(b),n=c.dot(this.direction),o=-c.dot(b),p=c.lengthSq(),q=Math.abs(1-m*m);if(q>0)if(h=m*o-n,i=m*n-o,k=l*q,h>=0)if(i>=-k)if(i<=k){var r=1/q;h*=r,i*=r,j=h*(h+m*i+2*n)+i*(m*h+i+2*o)+p}else i=l,h=Math.max(0,-(m*i+n)),j=-h*h+i*(i+2*o)+p;else i=-l,h=Math.max(0,-(m*i+n)),j=-h*h+i*(i+2*o)+p;else i<=-k?(h=Math.max(0,-(-m*l+n)),i=h>0?-l:Math.min(Math.max(-l,-o),l),j=-h*h+i*(i+2*o)+p):i<=k?(h=0,i=Math.min(Math.max(-l,-o),l),j=i*(i+2*o)+p):(h=Math.max(0,-(m*l+n)),i=h>0?l:Math.min(Math.max(-l,-o),l),j=-h*h+i*(i+2*o)+p);else i=m>0?-l:l,h=Math.max(0,-(m*i+n)),j=-h*h+i*(i+2*o)+p;return f&&f.copy(this.direction).multiplyScalar(h).add(this.origin),g&&g.copy(b).multiplyScalar(i).add(a),j}}(),intersectSphere:function(){var a=new f;return function(b,c){a.subVectors(b.center,this.origin);var d=a.dot(this.direction),e=a.dot(a)-d*d,f=b.radius*b.radius;if(e>f)return null;var g=Math.sqrt(f-e),h=d-g,i=d+g;return h<0&&i<0?null:h<0?this.at(i,c):this.at(h,c)}}(),intersectsSphere:function(a){return this.distanceToPoint(a.center)<=a.radius},distanceToPlane:function(a){var b=a.normal.dot(this.direction);if(0===b)return 0===a.distanceToPoint(this.origin)?0:null;var c=-(this.origin.dot(a.normal)+a.constant)/b;return c>=0?c:null},intersectPlane:function(a,b){var c=this.distanceToPlane(a);return null===c?null:this.at(c,b)},intersectsPlane:function(a){var b=a.distanceToPoint(this.origin);return 0===b||a.normal.dot(this.direction)*b<0},intersectBox:function(a,b){var c,d,e,f,g,h,i=1/this.direction.x,j=1/this.direction.y,k=1/this.direction.z,l=this.origin;return i>=0?(c=(a.min.x-l.x)*i,d=(a.max.x-l.x)*i):(c=(a.max.x-l.x)*i,d=(a.min.x-l.x)*i),j>=0?(e=(a.min.y-l.y)*j,f=(a.max.y-l.y)*j):(e=(a.max.y-l.y)*j,f=(a.min.y-l.y)*j),c>f||e>d?null:((e>c||c!==c)&&(c=e),(f<d||d!==d)&&(d=f),k>=0?(g=(a.min.z-l.z)*k,h=(a.max.z-l.z)*k):(g=(a.max.z-l.z)*k,h=(a.min.z-l.z)*k),c>h||g>d?null:((g>c||c!==c)&&(c=g),(h<d||d!==d)&&(d=h),d<0?null:this.at(c>=0?c:d,b)))},intersectsBox:function(){var a=new f;return function(b){return null!==this.intersectBox(b,a)}}(),intersectTriangle:function(){var a=new f,b=new f,c=new f,d=new f;return function(e,f,g,h,i){b.subVectors(f,e),c.subVectors(g,e),d.crossVectors(b,c);var j,k=this.direction.dot(d);if(k>0){if(h)return null;j=1}else{if(!(k<0))return null;j=-1,k=-k}a.subVectors(this.origin,e);var l=j*this.direction.dot(c.crossVectors(a,c));if(l<0)return null;var m=j*this.direction.dot(b.cross(a));if(m<0)return null;if(l+m>k)return null;var n=-j*a.dot(d);return n<0?null:this.at(n/k,i)}}(),applyMatrix4:function(a){return this.origin.applyMatrix4(a),this.direction.transformDirection(a),this},equals:function(a){return a.origin.equals(this.origin)&&a.direction.equals(this.direction)}}),Object.assign(Ha.prototype,{set:function(a,b){return this.start.copy(a),this.end.copy(b),this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){return this.start.copy(a.start),this.end.copy(a.end),this},getCenter:function(a){return(a||new f).addVectors(this.start,this.end).multiplyScalar(.5)},delta:function(a){return(a||new f).subVectors(this.end,this.start)},distanceSq:function(){return this.start.distanceToSquared(this.end)},distance:function(){return this.start.distanceTo(this.end)},at:function(a,b){var c=b||new f;return this.delta(c).multiplyScalar(a).add(this.start)},closestPointToPointParameter:function(){var a=new f,b=new f;return function(c,d){a.subVectors(c,this.start),b.subVectors(this.end,this.start);var e=b.dot(b),f=b.dot(a),g=f/e;return d&&(g=yd.clamp(g,0,1)),g}}(),closestPointToPoint:function(a,b,c){var d=this.closestPointToPointParameter(a,b),e=c||new f;return this.delta(e).multiplyScalar(d).add(this.start)},applyMatrix4:function(a){return this.start.applyMatrix4(a),this.end.applyMatrix4(a),this},equals:function(a){return a.start.equals(this.start)&&a.end.equals(this.end)}}),Object.assign(Ia,{normal:function(){var a=new f;return function(b,c,d,e){var g=e||new f;g.subVectors(d,c),a.subVectors(b,c),g.cross(a);var h=g.lengthSq();return h>0?g.multiplyScalar(1/Math.sqrt(h)):g.set(0,0,0)}}(),barycoordFromPoint:function(){var a=new f,b=new f,c=new f;return function(d,e,g,h,i){a.subVectors(h,e),b.subVectors(g,e),c.subVectors(d,e);var j=a.dot(a),k=a.dot(b),l=a.dot(c),m=b.dot(b),n=b.dot(c),o=j*m-k*k,p=i||new f;if(0===o)return p.set(-2,-1,-1);var q=1/o,r=(m*l-k*n)*q,s=(j*n-k*l)*q;return p.set(1-r-s,s,r)}}(),containsPoint:function(){var a=new f;return function(b,c,d,e){var f=Ia.barycoordFromPoint(b,c,d,e,a);return f.x>=0&&f.y>=0&&f.x+f.y<=1}}()}),Object.assign(Ia.prototype,{set:function(a,b,c){return this.a.copy(a),this.b.copy(b),this.c.copy(c),this},setFromPointsAndIndices:function(a,b,c,d){return this.a.copy(a[b]),this.b.copy(a[c]),this.c.copy(a[d]),this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){return this.a.copy(a.a),this.b.copy(a.b),this.c.copy(a.c),this},area:function(){var a=new f,b=new f;return function(){return a.subVectors(this.c,this.b),b.subVectors(this.a,this.b),.5*a.cross(b).length()}}(),midpoint:function(a){return(a||new f).addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)},normal:function(a){return Ia.normal(this.a,this.b,this.c,a)},plane:function(a){return(a||new ca).setFromCoplanarPoints(this.a,this.b,this.c)},barycoordFromPoint:function(a,b){return Ia.barycoordFromPoint(a,this.a,this.b,this.c,b)},containsPoint:function(a){return Ia.containsPoint(a,this.a,this.b,this.c)},closestPointToPoint:function(){var a=new ca,b=[new Ha,new Ha,new Ha],c=new f,d=new f;return function(e,g){var h=g||new f,i=1/0;if(a.setFromCoplanarPoints(this.a,this.b,this.c),a.projectPoint(e,c),!0===this.containsPoint(c))h.copy(c);else{b[0].set(this.a,this.b),b[1].set(this.b,this.c),b[2].set(this.c,this.a);for(var j=0;j<b.length;j++){b[j].closestPointToPoint(c,!0,d);var k=c.distanceToSquared(d);k<i&&(i=k,h.copy(d))}}return h}}(),equals:function(a){return a.a.equals(this.a)&&a.b.equals(this.b)&&a.c.equals(this.c)}}),Ja.prototype=Object.assign(Object.create(ia.prototype),{constructor:Ja,isMesh:!0,setDrawMode:function(a){this.drawMode=a},copy:function(a){return ia.prototype.copy.call(this,a),this.drawMode=a.drawMode,void 0!==a.morphTargetInfluences&&(this.morphTargetInfluences=a.morphTargetInfluences.slice()),void 0!==a.morphTargetDictionary&&(this.morphTargetDictionary=Object.assign({},a.morphTargetDictionary)),this},updateMorphTargets:function(){var a,b,c,d=this.geometry;if(d.isBufferGeometry){var e=d.morphAttributes,f=Object.keys(e);if(f.length>0){var g=e[f[0]];if(void 0!==g)for(this.morphTargetInfluences=[],this.morphTargetDictionary={},a=0,b=g.length;a<b;a++)c=g[a].name||String(a),this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=a}}else{var h=d.morphTargets;if(void 0!==h&&h.length>0)for(this.morphTargetInfluences=[],this.morphTargetDictionary={},a=0,b=h.length;a<b;a++)c=h[a].name||String(a),this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=a}},raycast:function(){function a(a,b,c,d,e,f,g){return Ia.barycoordFromPoint(a,b,c,d,s),e.multiplyScalar(s.x),f.multiplyScalar(s.y),g.multiplyScalar(s.z),e.add(f).add(g),e.clone()}function b(a,b,c,d,e,f,g,h){if(null===(b.side===Hb?d.intersectTriangle(g,f,e,!0,h):d.intersectTriangle(e,f,g,b.side!==Ib,h)))return null;u.copy(h),u.applyMatrix4(a.matrixWorld);var i=c.ray.origin.distanceTo(u);return i<c.near||i>c.far?null:{distance:i,point:u.clone(),object:a}}function e(c,d,e,f,g,h,i,m){j.fromBufferAttribute(f,h),k.fromBufferAttribute(f,i),l.fromBufferAttribute(f,m);var n=b(c,c.material,d,e,j,k,l,t);return n&&(g&&(p.fromBufferAttribute(g,h),q.fromBufferAttribute(g,i),r.fromBufferAttribute(g,m),n.uv=a(t,j,k,l,p,q,r)),n.face=new la(h,i,m,Ia.normal(j,k,l)),n.faceIndex=h),n}var g=new d,h=new Ga,i=new ba,j=new f,k=new f,l=new f,m=new f,n=new f,o=new f,p=new c,q=new c,r=new c,s=new f,t=new f,u=new f;return function(c,d){var f=this.geometry,s=this.material,u=this.matrixWorld;if(void 0!==s&&(null===f.boundingSphere&&f.computeBoundingSphere(),i.copy(f.boundingSphere),i.applyMatrix4(u),!1!==c.ray.intersectsSphere(i)&&(g.getInverse(u),h.copy(c.ray).applyMatrix4(g),null===f.boundingBox||!1!==h.intersectsBox(f.boundingBox)))){var v;if(f.isBufferGeometry){var w,x,y,z,A,B=f.index,C=f.attributes.position,D=f.attributes.uv;if(null!==B)for(z=0,A=B.count;z<A;z+=3)w=B.getX(z),x=B.getX(z+1),y=B.getX(z+2),(v=e(this,c,h,C,D,w,x,y))&&(v.faceIndex=Math.floor(z/3),d.push(v));else if(void 0!==C)for(z=0,A=C.count;z<A;z+=3)w=z,x=z+1,y=z+2,(v=e(this,c,h,C,D,w,x,y))&&(v.index=w,d.push(v))}else if(f.isGeometry){var E,F,G,H,I=Array.isArray(s),J=f.vertices,K=f.faces,L=f.faceVertexUvs[0];L.length>0&&(H=L);for(var M=0,N=K.length;M<N;M++){var O=K[M],P=I?s[O.materialIndex]:s;if(void 0!==P){if(E=J[O.a],F=J[O.b],G=J[O.c],!0===P.morphTargets){var Q=f.morphTargets,R=this.morphTargetInfluences;j.set(0,0,0),k.set(0,0,0),l.set(0,0,0);for(var S=0,T=Q.length;S<T;S++){var U=R[S];if(0!==U){var V=Q[S].vertices;j.addScaledVector(m.subVectors(V[O.a],E),U),k.addScaledVector(n.subVectors(V[O.b],F),U),l.addScaledVector(o.subVectors(V[O.c],G),U)}}j.add(E),k.add(F),l.add(G),E=j,F=k,G=l}if(v=b(this,P,c,h,E,F,G,t)){if(H&&H[M]){var W=H[M];p.copy(W[0]),q.copy(W[1]),r.copy(W[2]),v.uv=a(t,E,F,G,p,q,r)}v.face=O,v.faceIndex=M,d.push(v)}}}}}}}(),clone:function(){return new this.constructor(this.geometry,this.material).copy(this)}});var Sf=0;ob.prototype=Object.assign(Object.create(ja.prototype),{constructor:ob,isPerspectiveCamera:!0,copy:function(a,b){return ja.prototype.copy.call(this,a,b),this.fov=a.fov,this.zoom=a.zoom,this.near=a.near,this.far=a.far,this.focus=a.focus,this.aspect=a.aspect,this.view=null===a.view?null:Object.assign({},a.view),this.filmGauge=a.filmGauge,this.filmOffset=a.filmOffset,this},setFocalLength:function(a){var b=.5*this.getFilmHeight()/a;this.fov=2*yd.RAD2DEG*Math.atan(b),this.updateProjectionMatrix()},getFocalLength:function(){var a=Math.tan(.5*yd.DEG2RAD*this.fov);return.5*this.getFilmHeight()/a},getEffectiveFOV:function(){return 2*yd.RAD2DEG*Math.atan(Math.tan(.5*yd.DEG2RAD*this.fov)/this.zoom)},getFilmWidth:function(){return this.filmGauge*Math.min(this.aspect,1)},getFilmHeight:function(){return this.filmGauge/Math.max(this.aspect,1)},setViewOffset:function(a,b,c,d,e,f){this.aspect=a/b,null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=a,this.view.fullHeight=b,this.view.offsetX=c,this.view.offsetY=d,this.view.width=e,this.view.height=f,this.updateProjectionMatrix()},clearViewOffset:function(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()},updateProjectionMatrix:function(){var a=this.near,b=a*Math.tan(.5*yd.DEG2RAD*this.fov)/this.zoom,c=2*b,d=this.aspect*c,e=-.5*d,f=this.view;if(null!==this.view&&this.view.enabled){var g=f.fullWidth,h=f.fullHeight;e+=f.offsetX*d/g,b-=f.offsetY*c/h,d*=f.width/g,c*=f.height/h}var i=this.filmOffset;0!==i&&(e+=a*i/this.getFilmWidth()),this.projectionMatrix.makePerspective(e,e+d,b,b-c,a,this.far)},toJSON:function(a){var b=ia.prototype.toJSON.call(this,a);return b.object.fov=this.fov,b.object.zoom=this.zoom,b.object.near=this.near,b.object.far=this.far,b.object.focus=this.focus,b.object.aspect=this.aspect,null!==this.view&&(b.object.view=Object.assign({},this.view)),b.object.filmGauge=this.filmGauge,b.object.filmOffset=this.filmOffset,b}}),pb.prototype=Object.assign(Object.create(ob.prototype),{constructor:pb,isArrayCamera:!0}),vb.prototype=Object.assign(Object.create(ia.prototype),{constructor:vb,copy:function(a,b){return ia.prototype.copy.call(this,a,b),null!==a.background&&(this.background=a.background.clone()),null!==a.fog&&(this.fog=a.fog.clone()),null!==a.overrideMaterial&&(this.overrideMaterial=a.overrideMaterial.clone()),this.autoUpdate=a.autoUpdate,this.matrixAutoUpdate=a.matrixAutoUpdate,this},toJSON:function(a){var b=ia.prototype.toJSON.call(this,a);return null!==this.background&&(b.object.background=this.background.toJSON(a)),null!==this.fog&&(b.object.fog=this.fog.toJSON()),b}});var Tf={enabled:!1,files:{},add:function(a,b){!1!==this.enabled&&(this.files[a]=b)},get:function(a){if(!1!==this.enabled)return this.files[a]},remove:function(a){delete this.files[a]},clear:function(){this.files={}}},Uf=new wb;Object.assign(xb.prototype,{crossOrigin:"Anonymous",load:function(a,b,c,d){void 0===a&&(a=""),void 0!==this.path&&(a=this.path+a),a=this.manager.resolveURL(a);var e=this,f=Tf.get(a);if(void 0!==f)return e.manager.itemStart(a),setTimeout(function(){b&&b(f),e.manager.itemEnd(a)},0),f;var g=document.createElementNS("http://www.w3.org/1999/xhtml","img");return g.addEventListener("load",function(){Tf.add(a,this),b&&b(this),e.manager.itemEnd(a)},!1),g.addEventListener("error",function(b){d&&d(b),e.manager.itemEnd(a),e.manager.itemError(a)},!1),"data:"!==a.substr(0,5)&&void 0!==this.crossOrigin&&(g.crossOrigin=this.crossOrigin),e.manager.itemStart(a),g.src=a,g},setCrossOrigin:function(a){return this.crossOrigin=a,this},setPath:function(a){return this.path=a,this}}),Object.assign(yb.prototype,{crossOrigin:"Anonymous",load:function(a,b,c,d){var e=new h,f=new xb(this.manager);return f.setCrossOrigin(this.crossOrigin),f.setPath(this.path),f.load(a,function(c){e.image=c;var d=a.search(/\.(jpg|jpeg)$/)>0||0===a.search(/^data\:image\/jpeg/);e.format=d?Zc:$c,e.needsUpdate=!0,void 0!==b&&b(e)},c,d),e},setCrossOrigin:function(a){return this.crossOrigin=a,this},setPath:function(a){return this.path=a,this}}),a.WebGLRenderTarget=j,a.WebGLRenderer=ub,a.Scene=vb,a.Mesh=Ja,a.DataTexture=k,a.PlaneGeometry=Ca,a.ShaderMaterial=Fa,a.MeshBasicMaterial=Ea,a.Material=Z,a.TextureLoader=yb,a.OrthographicCamera=ka,a.ClampToEdgeWrapping=Ec,a.FloatType=Sc,a.LinearFilter=Jc,a.NearestFilter=Gc,a.NearestMipMapNearestFilter=Hc,a.RepeatWrapping=Dc,a.RGBAFormat=$c,a.UnsignedByteType=Mc,Object.defineProperty(a,"__esModule",{value:!0})}),require=function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){(function(b){b.THREE=a("three"),THREE={ClampToEdgeWrapping:THREE.ClampToEdgeWrapping,DataTexture:THREE.DataTexture,FloatType:THREE.FloatType,LinearFilter:THREE.LinearFilter,Material:THREE.Material,Mesh:THREE.Mesh,MeshBasicMaterial:THREE.MeshBasicMaterial,NearestFilter:THREE.NearestFilter,NearestMipMapNearestFilter:THREE.NearestMipMapNearestFilter,OrthographicCamera:THREE.OrthographicCamera,PlaneGeometry:THREE.PlaneGeometry,RepeatWrapping:THREE.RepeatWrapping,RGBAFormat:THREE.RGBAFormat,Scene:THREE.Scene,ShaderMaterial:THREE.ShaderMaterial,TextureLoader:THREE.TextureLoader,UnsignedByteType:THREE.UnsignedByteType,WebGLRenderer:THREE.WebGLRenderer,WebGLRenderTarget:THREE.WebGLRenderTarget}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{three:"three"}],three:[function(a,b,c){b.exports=window.THREE},{}]},{},[1]);var Detector={canvas:!!window.CanvasRenderingContext2D,webgl:function(){try{var a=document.createElement("canvas");return!(!window.WebGLRenderingContext||!a.getContext("webgl")&&!a.getContext("experimental-webgl"))}catch(a){return!1}}(),workers:!!window.Worker,fileapi:window.File&&window.FileReader&&window.FileList&&window.Blob,getWebGLErrorMessage:function(){var a=document.createElement("div");return a.id="webgl-error-message",a.style.fontFamily="monospace",a.style.fontSize="13px",a.style.fontWeight="normal",a.style.textAlign="center",a.style.background="#fff",a.style.color="#000",a.style.padding="1.5em",a.style.width="400px",a.style.margin="5em auto 0",this.webgl||(a.innerHTML=window.WebGLRenderingContext?['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />','Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n"):['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>','Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n")),a},addGetWebGLMessage:function(a){var b,c,d;a=a||{},b=void 0!==a.parent?a.parent:document.body,c=void 0!==a.id?a.id:"oldie",d=Detector.getWebGLErrorMessage(),d.id=c,b.appendChild(d)}};"object"==typeof module&&(module.exports=Detector),function(a,b){"use strict";function c(){if(a.postMessage&&!a.importScripts){var b=!0,c=a.onmessage;return a.onmessage=function(){b=!1},a.postMessage("","*"),a.onmessage=c,b}}function d(){return a.navigator&&/Trident/.test(a.navigator.userAgent)}if(!d()&&(a.msSetImmediate||a.setImmediate))return void(a.setImmediate||(a.setImmediate=a.msSetImmediate,a.clearImmediate=a.msClearImmediate));var e=a.document,f=Array.prototype.slice,g=Object.prototype.toString,h={};h.polifill={},h.nextId=1,h.tasks={},h.lock=!1,h.run=function(b){if(h.lock)a.setTimeout(h.wrap(h.run,b),0);else{var c=h.tasks[b];if(c){h.lock=!0;try{c()}finally{h.clear(b),h.lock=!1}}}},h.wrap=function(a){var c=f.call(arguments,1);return function(){a.apply(b,c)}},h.create=function(a){return h.tasks[h.nextId]=h.wrap.apply(b,a),h.nextId++},h.clear=function(a){delete h.tasks[a]},h.polifill.messageChannel=function(){var b=new a.MessageChannel;return b.port1.onmessage=function(a){h.run(Number(a.data))},function(){var a=h.create(arguments);return b.port2.postMessage(a),a}},h.polifill.nextTick=function(){return function(){var b=h.create(arguments);return a.process.nextTick(h.wrap(h.run,b)),b}},h.polifill.postMessage=function(){var b="setImmediate$"+Math.random()+"$",c=function(c){c.source===a&&"string"==typeof c.data&&0===c.data.indexOf(b)&&h.run(Number(c.data.slice(b.length)))};return a.addEventListener?a.addEventListener("message",c,!1):a.attachEvent("onmessage",c),function(){var c=h.create(arguments);return a.postMessage(b+c,"*"),c}},h.polifill.readyStateChange=function(){var a=e.documentElement;return function(){var b=h.create(arguments),c=e.createElement("script");return c.onreadystatechange=function(){h.run(b),c.onreadystatechange=null,a.removeChild(c),c=null},a.appendChild(c),b}},h.polifill.setTimeout=function(){return function(){var b=h.create(arguments);return a.setTimeout(h.wrap(h.run,b),0),b}};var i;i=d()?"setTimeout":"[object process]"===g.call(a.process)?"nextTick":c()?"postMessage":a.MessageChannel?"messageChannel":e&&"onreadystatechange"in e.createElement("script")?"readyStateChange":"setTimeout";var j=Object.getPrototypeOf&&Object.getPrototypeOf(a);j=j&&j.setTimeout?j:a,j.setImmediate=h.polifill[i](),j.setImmediate.usePolifill=i,j.msSetImmediate=j.setImmediate,j.clearImmediate=h.clear,j.msClearImmediate=h.clear}(function(){return this||(0,eval)("this")}()),function(){"use strict";function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&-1!==(d=b(f[e],c))&&f[e].splice(d,1);return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(f in g)if(g.hasOwnProperty(f))for(c=g[f].slice(0),e=c.length;e--;)d=c[e],!0===d.once&&this.removeListener(a,d.listener),d.listener.apply(this,b||[])===this._getOnceReturnValue()&&this.removeListener(a,d.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define(function(){return a}):"object"==typeof module&&module.exports?module.exports=a:e.EventEmitter=a}.call(this),GrowingPacker=function(){},GrowingPacker.prototype={fit:function(a){var b,c,d,e=a.length,f=e>0?a[0].w:0,g=e>0?a[0].h:0;for(this.root={x:0,y:0,w:f,h:g},b=0;b<e;b++)d=a[b],(c=this.findNode(this.root,d.w,d.h))?d.fit=this.splitNode(c,d.w,d.h):d.fit=this.growNode(d.w,d.h)},findNode:function(a,b,c){return a.used?this.findNode(a.right,b,c)||this.findNode(a.down,b,c):b<=a.w&&c<=a.h?a:null},splitNode:function(a,b,c){return a.used=!0,a.down={x:a.x,y:a.y+c,w:a.w,h:a.h-c},a.right={x:a.x+b,y:a.y,w:a.w-b,h:c},a},growNode:function(a,b){var c=a<=this.root.w,d=b<=this.root.h,e=d&&this.root.h>=this.root.w+a,f=c&&this.root.w>=this.root.h+b;return e?this.growRight(a,b):f?this.growDown(a,b):d?this.growRight(a,b):c?this.growDown(a,b):null},growRight:function(a,b){this.root={used:!0,x:0,y:0,w:this.root.w+a,h:this.root.h,down:this.root,right:{x:this.root.w,y:0,w:a,h:this.root.h}};var c=this.findNode(this.root,a,b);return c?this.splitNode(c,a,b):null},growDown:function(a,b){this.root={used:!0,x:0,y:0,w:this.root.w,h:this.root.h+b,down:{x:0,y:this.root.h,w:this.root.w,h:b},right:this.root};var c=this.findNode(this.root,a,b);return c?this.splitNode(c,a,b):null}},function(){function a(a,d){var e=(new Date).getTime(),f=Math.max(0,16-(e-c)),g=b.setTimeout(function(){a(e+f)},f);return c=e+f,g}for(var b=this,c=0,d=["ms","moz","webkit","o"],e=0;e<d.length&&!b.requestAnimationFrame;++e)b.requestAnimationFrame=b[d[e]+"RequestAnimationFrame"],b.cancelAnimationFrame=b[d[e]+"CancelAnimationFrame"]||b[d[e]+"CancelRequestAnimationFrame"];b.requestAnimationFrame||(b.requestAnimationFrame=a),b.cancelAnimationFrame||(b.cancelAnimationFrame=function(a){clearTimeout(a)}),"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=b.requestAnimationFrame),exports.requestAnimationFrame=b.requestAnimationFrame):b.requestAnimationFrame=b.requestAnimationFrame,"function"==typeof define&&define.amd&&define("requestAnimationFrame",[],function(){return b.requestAnimationFrame})}(),function(a,b,c,d,e){var f=this,g=f.Blotter=a=function(a,b){d.webgl||g.Messaging.throwError("Blotter",!1,"device does not support webgl"),this._texts=[],this._textEventBindings={},this._scopes={},this._scopeEventBindings={},this._renderer=new g.Renderer,this._startTime=0,this._lastDrawTime=0,this.init.apply(this,arguments)};g.prototype=function(){function a(){var a=Date.now();this._material.uniforms.uTimeDelta.value=(a-(this._lastDrawTime||a))/1e3,this._material.uniforms.uGlobalTime.value=(a-this._startTime)/1e3,this._lastDrawTime=a}function c(){a.call(this),b.each(this._scopes,b.bind(function(a){a.playing&&a.render(),this.trigger("render")},this))}function d(a){if(this.mappingMaterial){var b=this._material.uniforms[a].value;this.mappingMaterial.uniformInterface[a].value=b}}function e(a,b){if(this.mappingMaterial){var c=this._scopes[a],d=c.material.uniforms[b].value;this.mappingMaterial.textUniformInterface[a][b].value=d}}function f(){var a,c,d;a=b.bind(function(){return b.bind(function(a){g.MappingBuilder.build(this._texts,b.bind(function(b){this._mapping=b,this._mapping.ratio=this.ratio,a()},this))},this)},this),c=b.bind(function(){return b.bind(function(a){g.MappingMaterialBuilder.build(this._mapping,this._material,b.bind(function(b){this.mappingMaterial=b,a()},this))},this)},this),d=[a(),c()],b(d).reduceRight(b.wrap,b.bind(function(){this._renderer.stop(),b.each(this._scopes,b.bind(function(a,b){a.mappingMaterial=this.mappingMaterial,a.needsUpdate=!0},this)),this._renderer.material=this.mappingMaterial.shaderMaterial,this._renderer.width=this._mapping.width,this._renderer.height=this._mapping.height,this.autostart&&this.start(),this.trigger(this.lastUpdated?"update":"ready"),this.lastUpdated=Date.now()},this))()}return{constructor:g,get needsUpdate(){},set needsUpdate(a){!0===a&&f.call(this)},get material(){return this._material},set material(a){this.setMaterial(a)},get texts(){return this._texts},set texts(a){this.removeTexts(this._texts),this.addTexts(a)},get imageData(){return this._renderer.imageData},init:function(a,d){d=d||{},b.defaults(this,d,{ratio:g.CanvasUtils.pixelRatio,autobuild:!0,autostart:!0,autoplay:!0}),this.setMaterial(a),this.addTexts(d.texts),this._renderer.on("render",b.bind(c,this)),this.autobuild&&(this.needsUpdate=!0),this.autostart&&this.start()},start:function(){this.autostart=!0,this._startTime=Date.now(),this._renderer.start()},stop:function(){this.autostart=!1,this._renderer.stop()},teardown:function(){this._renderer.teardown()},setMaterial:function(a){g.Messaging.ensureInstanceOf(a,g.Material,"Blotter.Material","Blotter","setMaterial"),this._material=a,this._materialEventBinding&&this._materialEventBinding.unsetEventCallbacks(),this._materialEventBinding=new g.ModelEventBinding(a,{update:b.bind(function(){f.call(this)},this),updateUniform:b.bind(function(a){d.call(this,a)},this)}),a.on("update",this._materialEventBinding.eventCallbacks.update),a.on("update:uniform",this._materialEventBinding.eventCallbacks.updateUniform)},addText:function(a){this.addTexts(a)},addTexts:function(a){var c=g.TextUtils.filterTexts(a),d=b.difference(c,this._texts);b.each(d,b.bind(function(a){this._texts.push(a),this._textEventBindings[a.id]=new g.ModelEventBinding(a,{update:b.bind(function(){f.call(this)},this)}),a.on("update",this._textEventBindings[a.id].eventCallbacks.update),this._scopes[a.id]=new g.RenderScope(a,this),this._scopeEventBindings[a.id]=new g.ModelEventBinding(this._scopes[a.id],{updateUniform:b.bind(function(b){e.call(this,a.id,b)},this)}),this._scopes[a.id].on("update:uniform",this._scopeEventBindings[a.id].eventCallbacks.updateUniform)},this))},removeText:function(a){this.removeTexts(a)},removeTexts:function(a){var c=g.TextUtils.filterTexts(a),d=b.intersection(this._texts,c);b.each(d,b.bind(function(a){this._texts=b.without(this._texts,a),this._textEventBindings[a.id].unsetEventCallbacks(),this._scopeEventBindings[a.id].unsetEventCallbacks(),delete this._textEventBindings[a.id],delete this._scopeEventBindings[a.id],delete this._scopes[a.id]},this))},forText:function(a){return g.Messaging.ensureInstanceOf(a,g.Text,"Blotter.Text","Blotter","forText"),this._scopes[a.id]?this._scopes[a.id]:void g.Messaging.logError("Blotter","forText","Blotter.Text object not found in blotter")},boundsForText:function(a){return g.Messaging.ensureInstanceOf(a,g.Text,"Blotter.Text","Blotter","boundsForText"),this._scopes[a.id]?this._mapping?this.mappingMaterial.boundsForText(a):void 0:void g.Messaging.logError("Blotter","boundsForText","Blotter.Text object not found in blotter")}}}(),b.extend(g.prototype,e.prototype),g.Version="v0.1.0",g.webglRenderer=g.webglRenderer||new c.WebGLRenderer({antialias:!0,alpha:!0,premultipliedAlpha:!1}),g.Assets=g.Assets||{},g.Assets.Shaders=g.Assets.Shaders||{}}(this.Blotter,this._,this.THREE,this.Detector,this.EventEmitter),function(a){a.Math={generateUUID:function(){for(var a=[],b=0;b<256;b++)a[b]=(b<16?"0":"")+b.toString(16).toUpperCase();return function(){var b=4294967295*Math.random()|0,c=4294967295*Math.random()|0,d=4294967295*Math.random()|0,e=4294967295*Math.random()|0;return a[255&b]+a[b>>8&255]+a[b>>16&255]+a[b>>24&255]+"-"+a[255&c]+a[c>>8&255]+"-"+a[c>>16&15|64]+a[c>>24&255]+"-"+a[63&d|128]+a[d>>8&255]+"-"+a[d>>16&255]+a[d>>24&255]+a[255&e]+a[e>>8&255]+a[e>>16&255]+a[e>>24&255]}}()}}(this.Blotter),function(a){a.Messaging=function(){function a(a,b,c){return a+(b?"#"+b:"")+": "+c}return{ensureInstanceOf:function(a,b,c,d,e){if(!(a instanceof b))return void this.logError(d,e,"argument must be instanceof "+c)},logError:function(b,c,d){var e=a(b,c,d);console.error(e)},logWarning:function(b,c,d){var e=a(b,c,d);console.warn(e)},throwError:function(b,c,d){throw a(b,c,d)}}}()}(this.Blotter),function(a,b){a._extendWithGettersSetters=function(a){return b.each(Array.prototype.slice.call(arguments,1),function(b){if(b)for(var c in b)a[c]&&Object.getOwnPropertyDescriptor(a,c)&&Object.getOwnPropertyDescriptor(a,c).set?Object.getOwnPropertyDescriptor(a,c).set(b[c]):a[c]=b[c]}),a}}(this.Blotter,this._),function(a){a.VendorPrefixes=["ms","moz","webkit","o"]}(this.Blotter),function(a,b){a.ModelEventBinding=function(a,b){this.model=a,this.eventCallbacks=b||{}},a.ModelEventBinding.prototype={constructor:a.ModelEventBinding,unsetEventCallbacks:function(){b.each(this.eventCallbacks,b.bind(function(a,b){this.model.off(b,a)},this))}}}(this.Blotter,this._),function(a){a.CanvasUtils={canvas:function(a,b,c){c=c||{};var d=document.createElement("canvas");return d.className=c.class,d.innerHTML=c.html,d.width=a,d.height=b,d},hiDpiCanvas:function(a,b,c,d){c=c||this.pixelRatio,d=d||{};var e=document.createElement("canvas");return e.className=d.class,e.innerHTML=d.html,this.updateCanvasSize(e,a,b,c),e},updateCanvasSize:function(a,b,c,d){d=d||1,a.width=b*d,a.height=c*d,a.style.width=b+"px",a.style.height=c+"px",a.getContext("2d").setTransform(d,0,0,d,0,0)},pixelRatio:function(){for(var b=document.createElement("canvas").getContext("2d"),c=window.devicePixelRatio||1,d=b.backingStorePixelRatio,e=0;e<a.VendorPrefixes.length&&!d;++e)d=b[a.VendorPrefixes[e]+"BackingStorePixelRatio"];return d=d||1,c/d}(),mousePosition:function(a,b){var c=a.getBoundingClientRect();return{x:b.clientX-c.left,y:b.clientY-c.top}},normalizedMousePosition:function(a,b){var c=a.getBoundingClientRect(),d=this.mousePosition(a,b);return{x:d.x/c.width,y:d.y/c.height}}}}(this.Blotter),function(a,b){a.PropertyDefaults={family:"sans-serif",size:12,leading:1.5,fill:"#000",style:"normal",weight:400,padding:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0},a.TextUtils={Properties:b.keys(a.PropertyDefaults),ensurePropertyValues:function(c){return c=b.defaults(c||{},a.PropertyDefaults)},filterTexts:function(c){return c=c instanceof a.Text?[c]:b.toArray(c),b.filter(c,b.bind(function(b){var c=b instanceof a.Text;return c||a.Messaging.logWarning("Blotter.TextUtils","filterTexts","object must be instance of Blotter.Text"),c},this))},stringifiedPadding:function(a){var b=a||this.ensurePropertyValues();return(a.paddingTop||b.padding)+"px "+(b.paddingRight||b.padding)+"px "+(b.paddingBottom||b.padding)+"px "+(b.paddingLeft||b.padding)+"px"},sizeForText:function(a,b){var c,d=document.createElement("span");return b=this.ensurePropertyValues(b),d.innerHTML=a,d.style.display="inline-block",d.style.fontFamily=b.family,d.style.fontSize=b.size+"px",d.style.fontWeight=b.weight,d.style.fontStyle=b.style,d.style.lineHeight=b.leading,d.style.maxWidth="none",d.style.padding=this.stringifiedPadding(b),d.style.position="absolute",d.style.width="auto",d.style.visibility="hidden",document.body.appendChild(d),c={w:d.offsetWidth,h:d.offsetHeight},document.body.removeChild(d),c}}}(this.Blotter,this._),function(a,b){a.UniformUtils={UniformTypes:["1f","2f","3f","4f"],defaultUniforms:{uResolution:{type:"2f",value:[0,0]},uGlobalTime:{type:"1f",value:0},uTimeDelta:{type:"1f",value:0},uBlendColor:{type:"4f",value:[1,1,1,1]},uPixelRatio:{type:"1f",value:a.CanvasUtils.pixelRatio}},validValueForUniformType:function(a,c){var d=!1,e=function(a){return!isNaN(a)};switch(a){case"1f":d=!isNaN(c)&&[c].every(e);break;case"2f":d=b.isArray(c)&&2==c.length&&c.every(e);break;case"3f":d=b.isArray(c)&&3==c.length&&c.every(e);break;case"4f":d=b.isArray(c)&&4==c.length&&c.every(e)}return d},glslDataTypeForUniformType:function(a){var b;switch(a){case"1f":b="float";break;case"2f":b="vec2";break;case"3f":b="vec3";break;case"4f":b="vec4"}return b},fullSwizzleStringForUniformType:function(a){var b;switch(a){case"1f":b="x";break;case"2f":b="xy";break;case"3f":b="xyz";break;case"4f":b="xyzw"}return b},extractValidUniforms:function(c){return c=c||{},b.reduce(c,function(c,d,e){return-1==a.UniformUtils.UniformTypes.indexOf(d.type)?(a.Messaging.logError("Blotter.UniformUtils","extractValidUniforms","uniforms must be one of type: "+a.UniformUtils.UniformTypes.join(", ")),c):a.UniformUtils.validValueForUniformType(d.type,d.value)?(c[e]=b.pick(d,"type","value"),c):(a.Messaging.logError("Blotter.UniformUtils","extractValidUniforms","uniform value for "+e+" is incorrect for type: "+d.type),c)},{})},ensureHasRequiredDefaultUniforms:function(b,c,d){if(!a.UniformUtils.hasRequiredDefaultUniforms(b))return void this.logError(c,d,"uniforms object is missing required default uniforms defined in Blotter.UniformUtils.defaultUniforms")},hasRequiredDefaultUniforms:function(c){return!b.difference(b.allKeys(a.UniformUtils.defaultUniforms),b.allKeys(c)).length}}}(this.Blotter,this._),function(a,b,c,d){a.Text=function(b,c){this.id=a.Math.generateUUID(),this.value=b,this.properties=c},a.Text.prototype={constructor:a.Text,get needsUpdate(){},set needsUpdate(a){!0===a&&this.trigger("update")},get properties(){return this._properties},set properties(b){this._properties=a.TextUtils.ensurePropertyValues(b)}},a._extendWithGettersSetters(a.Text.prototype,d.prototype)}(this.Blotter,this._,this.THREE,this.EventEmitter),function(a,b){a.Assets.Shaders.Blending=["//","// Author : Bradley Griffith","// License : Distributed under the MIT License.","//","","// Returns the resulting blend color by blending a top color over a base color","highp vec4 normalBlend(highp vec4 topColor, highp vec4 baseColor) {","  highp vec4 blend = vec4(0.0);","  // HACK","  // Cant divide by 0 (see the 'else' alpha) and after a lot of attempts","  // this simply seems like the only solution Im going to be able to come up with to get alpha back.","  if (baseColor.a == 1.0) {","    baseColor.a = 0.9999999;","  };","  if (topColor.a >= 1.0) {","    blend.a = topColor.a;","    blend.r = topColor.r;","    blend.g = topColor.g;","    blend.b = topColor.b;","  } else if (topColor.a == 0.0) {","    blend.a = baseColor.a;","    blend.r = baseColor.r;","    blend.g = baseColor.g;","    blend.b = baseColor.b;","  } else {","    blend.a = 1.0 - (1.0 - topColor.a) * (1.0 - baseColor.a); // alpha","    blend.r = (topColor.r * topColor.a / blend.a) + (baseColor.r * baseColor.a * (1.0 - topColor.a) / blend.a);","    blend.g = (topColor.g * topColor.a / blend.a) + (baseColor.g * baseColor.a * (1.0 - topColor.a) / blend.a);","    blend.b = (topColor.b * topColor.a / blend.a) + (baseColor.b * baseColor.a * (1.0 - topColor.a) / blend.a);","  }","  return blend;","}","// Returns a vec4 representing the original top color that would have been needed to blend","//  against a passed in base color in order to result in the passed in blend color.","highp vec4 normalUnblend(highp vec4 blendColor, highp vec4 baseColor) {","  highp vec4 unblend = vec4(0.0);","  // HACKY","  // Cant divide by 0 (see alpha) and after a lot of attempts","  // this simply seems like the only solution Im going to be able to come up with to get alpha back.","  if (baseColor.a == 1.0) {","    baseColor.a = 0.9999999;","  }","  unblend.a = 1.0 - ((1.0 - blendColor.a) / (1.0 - baseColor.a));","  // Round to two decimal places","  unblend.a = (sign(100.0 * unblend.a) * floor(abs(100.0 * unblend.a) + 0.5)) / 100.0;","  if (unblend.a >= 1.0) {","    unblend.r = blendColor.r;","    unblend.g = blendColor.g;","    unblend.b = blendColor.b;","  } else if (unblend.a == 0.0) {","    unblend.r = baseColor.r;","    unblend.g = baseColor.g;","    unblend.b = baseColor.b;","  } else {","    unblend.r = (blendColor.r - (baseColor.r * baseColor.a * (1.0 - unblend.a) / blendColor.a)) / (unblend.a / blendColor.a);","    unblend.g = (blendColor.g - (baseColor.g * baseColor.a * (1.0 - unblend.a) / blendColor.a)) / (unblend.a / blendColor.a);","    unblend.b = (blendColor.b - (baseColor.b * baseColor.a * (1.0 - unblend.a) / blendColor.a)) / (unblend.a / blendColor.a);","  }","  return unblend;","}"].join("\n")}(this.Blotter,this._),function(a,b){a.Assets.Shaders.Inf=["//","// Author : Bradley Griffith","// License : Distributed under the MIT License.","//","bool isinf(float val) {","    return (val != 0.0 && val * 2.0 == val) ? true : false;","}"].join("\n")}(this.Blotter,this._),function(a,b){a.Assets.Shaders.LineMath=[a.Assets.Shaders.Inf,"","//","// Author : Bradley Griffith","// License : Distributed under the MIT License.","//","","// Returns the slope of a line given the degrees of the angle on which that line is rotated;","float slopeForDegrees(float deg) {","    // Ensure degrees stay withing 0.0 - 360.0","    deg = mod(deg, 360.0);","    float radians = deg * (PI / 180.0);","    return tan(radians);","}","// Given x, a slope, and another point, find y for x.","float yForXOnSlope(float x, float slope, vec2 p2) {","    return -1.0 * ((slope * (p2.x - x)) - p2.y);","}","// Given y, a slope, and another point, find x for y.","float xForYOnSlope(float y, float slope, vec2 p2) {","    return ((y - p2.y) + (slope * p2.x)) / slope;","}","// Returns slope adjusted for screen ratio.","float normalizedSlope(float slope, vec2 resolution) {","    vec2 p = vec2(1.0) / resolution;","    return ((slope * 100.0) / p.x) / (100.0 / p.x);","}","// Returns offsets (+/-) for any coordinate at distance given slope.","//   Note: This function does not normalize distance.","//   Note: This function does not adjust slope for screen ratio.","vec2 offsetsForCoordAtDistanceOnSlope(float d, float slope) {","    return vec2(","        (d * cos(atan(slope))),","        (d * sin(atan(slope)))","    );","}","// Returns a boolean designating whether or not an infinite line intersects with an infinite line, and sets an `out` variable for the intersection point if it is found.","//   Note: This function does not adjust slope for screen ratio.","bool lineLineIntersection (out vec2 intersect, in vec2 p1, in float m1, in vec2 p2, in float m2) {","    // See: http://gamedev.stackexchange.com/questions/44720/line-intersection-from-parametric-equation","    //      http://stackoverflow.com/questions/41687083/formula-to-determine-if-an-infinite-line-and-a-line-segment-intersect/41687904#41687904","    bool isIntersecting = false;","    float dx = 1.0;","    float dy = m1;","    float dxx = 1.0;","    float dyy = m2;","    float denominator = ((dxx * dy) - (dyy * dx));","    if (denominator == 0.0) {","        // Lines are parallel","        return isIntersecting;","    }","    if (isinf(dy)) {","        float y = yForXOnSlope(p1.x, m2, p2);","        isIntersecting = true;","        intersect = vec2(p1.x, y);","        return isIntersecting;","    }","    if (isinf(dyy)) {","        float y = yForXOnSlope(p2.x, m1, p1);","        isIntersecting = true;","        intersect = vec2(p2.x, y);","        return isIntersecting;","    }","    float u = ((dx * (p2.y - p1.y)) + (dy * (p1.x - p2.x))) / denominator;","    isIntersecting = true;","    intersect = p2 + (u * vec2(dxx, dyy));","    return isIntersecting;","}","// Returns a boolean designating whether or not an infinite line intersects with a line segment, and sets an `out` variable for the intersection point if it is found.","//   Note: This function does not adjust slope for screen ratio.","bool lineLineSegmentIntersection (out vec2 intersect, in vec2 point, in float m, in vec2 pA, in vec2 pB) {","    // See: http://gamedev.stackexchange.com/questions/44720/line-intersection-from-parametric-equation","    //      http://stackoverflow.com/questions/41687083/formula-to-determine-if-an-infinite-line-and-a-line-segment-intersect/41687904#41687904","    bool isIntersecting = false;","    float dx = 1.0;","    float dy = m;","    float dxx = pB.x - pA.x;","    float dyy = pB.y - pA.y;","    float denominator = ((dxx * dy) - (dyy * dx));","    if (denominator == 0.0 || (isinf(dyy / dxx) && isinf(dy))) {","        // Lines are parallel","        return isIntersecting;","    }","    if (isinf(dy)) {","        float m2 = dyy / dxx;","        float y = yForXOnSlope(point.x, m2, pB);","        isIntersecting = true;","        intersect = vec2(point.x, y);","        return isIntersecting;","    }","    float u = ((dx * (pA.y - point.y)) + (dy * (point.x - pA.x))) / denominator;","    if (u >= 0.0 && u <= 1.0) {","        // Intersection occured on line segment","        isIntersecting = true;","        intersect = pA + (u * vec2(dxx, dyy));","    }","    return isIntersecting;","}","// Dev Note: Terrible code. Needs refactor. Just trying to find ","//   which two edges of the rect the intersections occur at.","void intersectsOnRectForLine(out vec2 iA, out vec2 iB, in vec2 rMinXY, in vec2 rMaxXY, in vec2 point, in float slope) {","    bool firstIntersectFound = false;","    vec2 intersectLeft = vec2(0.0);","    vec2 intersectTop = vec2(0.0);","    vec2 intersectRight = vec2(0.0);","    vec2 intersectBottom = vec2(0.0);","    bool intersectsLeft = lineLineSegmentIntersection(intersectLeft, point, slope, rMinXY, vec2(rMinXY.x, rMaxXY.y));","    bool intersectsTop = lineLineSegmentIntersection(intersectTop, point, slope, vec2(rMinXY.x, rMaxXY.y), rMaxXY);","    bool intersectsRight = lineLineSegmentIntersection(intersectRight, point, slope, rMaxXY, vec2(rMaxXY.x, rMinXY.y));","    bool intersectsBottom = lineLineSegmentIntersection(intersectBottom, point, slope, rMinXY, vec2(rMaxXY.x, rMinXY.y));","    if (intersectsLeft) {","        if (firstIntersectFound) {","            iB = intersectLeft;","        }","        else {","            iA = intersectLeft;","            firstIntersectFound = true;","        }","    }","    if (intersectsTop) {","        if (firstIntersectFound) {","            iB = intersectTop;","        }","        else {","            iA = intersectTop;","            firstIntersectFound = true;","        }","    }","    if (intersectsRight) {","        if (firstIntersectFound) {","            iB = intersectRight;","        }","        else {","            iA = intersectRight;","            firstIntersectFound = true;","        }","    }","    if (intersectsBottom) {","        if (firstIntersectFound) {","            iB = intersectBottom;","        }","        else {","            iA = intersectBottom;","        }","    }","}"].join("\n")}(this.Blotter,this._),function(a,b){a.Assets.Shaders.BlinnPhongSpecular=["//","// Author : Reza Ali","// License : Distributed under the MIT License.","//","","float blinnPhongSpecular( vec3 lightDirection, vec3 viewDirection, vec3 surfaceNormal, float shininess ) {","","  //Calculate Blinn-Phong power","  vec3 H = normalize(viewDirection + lightDirection);","  return pow(max(0.0, dot(surfaceNormal, H)), shininess);","}"].join("\n")}(this.Blotter,this._),function(a,b){a.Assets.Shaders.Easing=["//","// Author : Reza Ali","// License : Distributed under the MIT License.","//","","float linear( float t, float b, float c, float d )","{","    return t * ( c / d ) + b;","}","","float linear( float t )","{","    return t;","}","","float inQuad( float t, float b, float c, float d )","{","    return c * ( t /= d ) * t + b;","}","","float inQuad( float t )","{","    return t * t;","}","","float outQuad( float t, float b, float c, float d )","{","    return -c * ( t /= d ) * ( t - 2.0 ) + b;","}","","float outQuad( float t )","{","    return - ( t -= 1.0 ) * t + 1.0;","}","","float inOutQuad( float t, float b, float c, float d )","{","    if( ( t /= d / 2.0 ) < 1.0 ) {","      return c / 2.0 * t * t + b;","    }","    return - c / 2.0 * ( ( --t ) * ( t - 2.0 ) - 1.0 ) + b;","}","","float inOutQuad( float t )","{","    if( ( t /= 0.5 ) < 1.0 ) return 0.5 * t * t;","    return -0.5 * ( ( --t ) * ( t-2 ) - 1 );","}","","float inCubic( float t, float b, float c, float d )","{","    return c * ( t /= d ) * t * t + b;","}","","float inCubic( float t )","{","    return t * t * t;","}","","float outCubic( float t, float b, float c, float d )","{","    return c * ( ( t = t/d - 1.0 ) * t * t + 1.0 ) + b;","}","","float outCubic( float t )","{","    return ( ( --t ) * t * t + 1.0 );","}","","float inOutCubic( float t, float b, float c, float d )","{","    if( ( t /= d / 2.0 ) < 1.0 ) return  c / 2.0 * t * t * t + b;","    return c / 2.0 * ( ( t -= 2.0 ) * t * t + 2.0 ) + b;","}","","float inOutCubic( float t )","{","    if( ( t /= 0.5 ) < 1.0 ) return 0.5 * t * t * t;","    return 0.5 * ( ( t -= 2.0 ) * t * t + 2.0 );","}","","float inQuart( float t, float b, float c, float d )","{","    return c * ( t /= d ) * t * t * t + b;","}","","float inQuart( float t )","{","    return t * t * t * t;","}","","float outQuart( float t, float b, float c, float d )","{","    return -c * ( ( t = t/d - 1.0 ) * t * t * t - 1.0 ) + b;","}","","float outQuart( float t )","{","    return - ( ( --t ) * t * t * t - 1.0 );","}","","float inOutQuart( float t, float b, float c, float d )","{","    if ( ( t /= d / 2.0 ) < 1.0 ) return c / 2.0 * t * t * t * t + b;","    return -c / 2.0 * ( ( t -= 2.0 ) * t * t * t - 2.0 ) + b;","}","","float inOutQuart( float t )","{","    if ( (t /= 0.5 ) < 1.0 ) return 0.5 * t * t * t * t;","    return -0.5 * ( ( t -= 2.0 ) * t * t * t - 2.0 );","}","","float inQuint( float t, float b, float c, float d )","{","    return c * ( t /= d ) * t * t * t * t + b;","}","","float inQuint( float t )","{","    return t * t * t * t * t;","}","","float outQuint( float t, float b, float c, float d )","{","    return c * ( ( t = t/d - 1.0) * t * t * t * t + 1.0 ) + b;","}","","float outQuint( float t )","{","    return ( ( --t ) * t * t * t * t + 1.0 );","}","","float inOutQuint( float t, float b, float c, float d )","{","    if( ( t /= d /2.0 ) < 1.0 ) return  c / 2.0 * t * t * t * t * t + b;","    return c / 2.0 * ( ( t -= 2.0 ) * t * t * t * t + 2.0) + b;","}","","float inOutQuint( float t )","{","    if ( ( t /= 0.5 ) < 1.0 ) return 0.5 * t * t * t * t * t;","    return 0.5 * ( ( t -= 2 ) * t * t * t * t + 2.0 );","}","","float inSine( float t, float b, float c, float d )","{","    return -c * cos( t / d * ( 1.5707963268 ) ) + c + b;","}","","float inSine( float t )","{","    return -1.0 * cos( t * ( 1.5707963268 ) ) + 1.0;","}","","float outSine( float t, float b, float c, float d )","{","    return c * sin( t / d * ( 1.5707963268 ) ) + b;","}","","float outSine( float t )","{","    return sin( t * ( 1.5707963268 ) );","}","","float inOutSine( float t, float b, float c, float d )","{","    return - c / 2.0 * ( cos( 3.1415926536 * t / d ) - 1.0 ) + b;","}","","float inOutSine( float t )","{","    return -0.5 * ( cos( 3.1415926536 * t ) - 1.0 );","}","","float inExpo( float t, float b, float c, float d )","{","    return ( t == 0.0 ) ? b : c * pow( 2.0, 10.0 * ( t / d - 1.0 ) ) + b;","}","","float inExpo( float t )","{","    return ( t == 0 ) ? 0.0 : pow( 2.0, 10.0 * ( t - 1.0 ) );","}","","float outExpo( float t, float b, float c, float d )","{","    return ( t == d ) ? b + c : c * ( - pow( 2.0, -10.0 * t / d ) + 1.0 ) + b;","}","","float outExpo( float t )","{","    return ( t == 1.0 ) ? 1.0 : ( - pow( 2.0, -10.0 * t ) + 1.0 );","}","","float inOutExpo( float t, float b, float c, float d )","{","    if( t == 0 ) return b;","    if( t == d ) return b + c;","    if(( t /= d / 2.0 ) < 1.0 ) return c / 2.0 * pow( 2.0, 10.0 * ( t - 1.0 ) ) + b;","    return c / 2.0 * ( - pow( 2.0, -10.0 * --t ) + 2.0 ) + b;","}","","float inOutExpo( float t )","{","    if( t == 0.0 ) return 0.0;","    if( t == 1.0 ) return 1.0;","    if( ( t /= 0.5 ) < 1.0 ) return 0.5 * pow( 2.0, 10.0 * ( t - 1.0 ) );","    return 0.5 * ( - pow( 2.0, -10.0 * --t ) + 2.0 );","}","","float inCirc( float t, float b, float c, float d )","{","    return -c * ( sqrt( 1.0 - (t/=d)*t) - 1) + b;","}","","float inCirc( float t )","{","    return - ( sqrt( 1.0 - t*t) - 1);","}","","float outCirc( float t, float b, float c, float d )","{","    return c * sqrt( 1.0 - (t=t/d-1)*t) + b;","}","","float outCirc( float t )","{","    return sqrt( 1.0 - (--t)*t);","}","","float inOutCirc( float t, float b, float c, float d )","{","    if ( ( t /= d / 2.0 ) < 1 ) return - c / 2.0 * ( sqrt( 1.0 - t * t ) - 1.0 ) + b;","    return c / 2.0 * ( sqrt( 1.0 - ( t -= 2.0 ) * t ) + 1.0 ) + b;","}","","float inOutCirc( float t )","{","    if( ( t /= 0.5 ) < 1.0 ) return -0.5 * ( sqrt( 1.0 - t * t ) - 1.0 );","    return 0.5 * ( sqrt( 1.0 - ( t -= 2.0 ) * t ) + 1.0 );","}","","float inElastic( float t, float b, float c, float d )","{","    float s = 1.70158; float p = 0.0; float a = c;","    if( t == 0 ) return b;  if( ( t /= d ) == 1 ) return b + c;","    p = d * 0.3;","    if( a < abs( c ) ) { a = c; float s = p / 4.0; }","    else s = 0.1591549431 * p / ( 6.2831853072 ) * asin( c / a );","    return -( a * pow( 2.0, 10.0 * ( t -= 1.0 ) ) * sin( ( t * d - s ) * ( 6.2831853072 ) / p ) )  + b;","}","","float inElastic( float t )","{","    float s = 1.70158; float p = 0.0; float a = 1.0;","    if( t == 0.0 ) return 0.0;","    if( t == 1.0 ) return 1.0;","    p = 0.3;","    s = p / ( 6.2831853072 ) * asin( 1.0 / a );","    return -( a * pow( 2.0, 10.0 * ( t -= 1.0 ) ) * sin( ( t - s ) * ( 6.2831853072 ) / p ) );","}","","float outElastic( float t, float b, float c, float d )","{","    float s = 1.70158; float p = 0.0; float a = c;","    if( t == 0.0 ) return b;","    if( (t /= d ) == 1.0 ) return b + c;","    p = d * 0.3;","    if( a < abs( c ) ) { a = c; s = p / 4.0; }","    else { s = p / ( 6.2831853072 ) * asin( c / a ); }","    return a * pow( 2.0, -10.0 * t ) * sin( ( t * d - s ) * ( 6.2831853072 ) / p ) + c + b;","}","","float outElastic( float t )","{","    float s = 1.70158; float p = 0.0 ; float a = 1.0;","    if( t == 0.0 ) return 0.0;  if( t == 1.0 ) return 1.0;","    p = 0.3;","    s = p / ( 6.2831853072 ) * asin( 1.0 / a );","    return a * pow( 2.0, -10.0 * t ) * sin( ( t - s ) * ( 6.2831853072 ) / p ) + 1.0;","}","","float inOutElastic( float t, float b, float c, float d )","{","    float s = 1.70158; float p = 0.0; float a = c;","    if( t == 0.0 ) return b;","    if( ( t /= d / 2.0 ) == 2.0 ) return b + c;","    p = d * ( 0.3 * 1.5 );","    if( a < abs( c ) ) { a = c; s = p / 4.0; }","    else { s = p / ( 6.2831853072 ) * asin( c / a ); }","    if( t < 1.0 ) return -0.5 * ( a * pow( 2.0, 10.0 * ( t -= 1.0 ) ) * sin( ( t * d - s ) * ( 6.2831853072 ) / p ) ) + b;","    return a * pow( 2.0, -10.0 * ( t -= 1.0 ) ) * sin( ( t * d - s ) * ( 6.2831853072 ) / p ) * 0.5 + c + b;","}","","float inOutElastic( float t )","{","    float s = 1.70158; float p = 0; float a = 1.0;","    if( t == 0 ) return 0.0;","    if( ( t /= 0.5 ) == 2.0 ) return 1.0;","    p = ( 0.3 * 1.5 );","    s = p / ( 6.2831853072 ) * asin( 1.0 / a );","    if( t < 1.0 ) return -0.5 * ( a * pow( 2.0, 10.0 * ( t -= 1.0 ) ) * sin( ( t - s ) * ( 6.2831853072 ) / p ) );","    return a * pow( 2.0, -10.0 * ( t -= 1.0 ) ) * sin( ( t - s ) * ( 6.2831853072 ) / p ) * 0.5 + 1.0;","}","","float inBack( float t, float b, float c, float d )","{","    float s = 1.70158;","    return c * ( t /= d ) * t * ( ( s + 1.0 ) * t - s ) + b;","}","","float inBack( float t )","{","    float s = 1.70158;","    return t * t * ( ( s + 1.0 ) * t - s);","}","","float outBack( float t,  float b,  float c,  float d )","{","    float s = 1.70158;","    return c * ( ( t = t / d - 1.0 ) * t * ( ( s + 1.0 ) * t + s ) + 1.0 ) + b;","}","","float outBack( float t )","{","    float s = 1.70158;","    return ( ( --t ) * t * ( ( s + 1.0 ) * t + s ) + 1.0);","}","","float inOutBack( float t, float b, float c, float d )","{","    float s = 1.70158;","    if( ( t /= d / 2.0 ) < 1.0 ) return c / 2.0 * ( t * t * ( ( ( s *= 1.525 ) + 1.0 ) * t - s ) ) + b;","    return c / 2.0 * ( ( t -= 2.0 ) * t * ( ( ( s *= ( 1.525 ) ) + 1.0 ) * t + s ) + 2.0 ) + b;","}","","float inOutBack( float t )","{","    float s = 1.70158;","    if( ( t /= 0.5 ) < 1.0 ) return 0.5 * ( t * t * ( ( ( s *= 1.525 ) + 1.0 ) * t - s ) );","    return 0.5 * ( ( t -= 2 ) * t * ( ( ( s *= ( 1.525 ) ) + 1.0 ) * t + s ) + 2.0 );","}","","float outBounce( float t, float b, float c, float d )","{","    if( ( t /= d ) < ( 1.0 / 2.75 ) ) {","        return c * ( 7.5625 * t * t ) + b;","    } else if ( t < ( 2.0 / 2.75 ) ) {","        return c * ( 7.5625 * ( t -= ( 1.5 / 2.75 ) ) * t + 0.75 ) + b;","    } else if ( t < ( 2.5 / 2.75 ) ) {","        return c * ( 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + 0.9375 ) + b;","    } else {","        return c * ( 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + 0.984375 ) + b;","    }","}","","float outBounce( float t )","{","    if( t < ( 1.0 / 2.75 ) ) {","        return ( 7.5625 * t * t );","    } else if ( t < ( 2.0 / 2.75 ) ) {","        return ( 7.5625 * ( t-= ( 1.5 / 2.75 ) ) * t + .75 );","    } else if ( t < ( 2.5 / 2.75 ) ) {","        return ( 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + 0.9375 );","    } else {","        return ( 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + 0.984375 );","    }","}","","float inBounce( float t, float b, float c, float d )","{","    return c - outBounce( d - t, 0.0, c, d ) + b;","}","","float inBounce( float t )","{","    return 1.0 - outBounce( 1.0 - t);","}","","float inOutBounce( float t, float b, float c, float d )","{","    if ( t < d /2.0 ) return inBounce ( t * 2.0, 0.0, c, d ) * 0.5 + b;","    return outBounce ( t * 2.0 - d, 0, c, d ) * 0.5 + c * 0.5 + b;","}","","float inOutBounce( float t )","{","    if ( t < 0.5 ) return inBounce( t * 2.0 ) * 0.5;","    return outBounce( t * 2.0 - 1.0 ) * 0.5 + 0.5;","}"].join("\n")}(this.Blotter,this._),function(a,b){a.Assets.Shaders.Gamma=["//","// Author : Reza Ali","// License : Distributed under the MIT License.","//","","const vec3 cGammaCorrection = vec3( 0.4545454545 );","","vec3 gamma( in vec3 color )","{","  return pow( color, cGammaCorrection );","}","","vec4 gamma( in vec4 color )","{","  return vec4( gamma( color.rgb ), color.a );","}"].join("\n")}(this.Blotter,this._),function(a,b){a.Assets.Shaders.Map=["//","// Author : Reza Ali","// License : Distributed under the MIT License.","//","","float map( float value, float inMin, float inMax, float outMin, float outMax )","{","    return ( (value - inMin) / ( inMax - inMin ) * ( outMax - outMin ) ) + outMin;","}"].join("\n")}(this.Blotter,this._),function(a,b){a.Assets.Shaders.Noise=["//","// Author : Patricio Gonzalez Vivo and Jen Lowe","// License : Distributed under the MIT License.","// Source : https://github.com/patriciogonzalezvivo/thebookofshaders","//","float random (in float _x) {","    return fract(sin(_x)*1e4);","}","","float random (in vec2 co) {","    return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);","}","","float noise (in float _x) {","    float i = floor(_x);","    float f = fract(_x);","    float u = f * f * (3.0 - 2.0 * f);","    return mix(random(i), random(i + 1.0), u);","}","","float noise (in vec2 _st) {","    vec2 i = floor(_st);","    vec2 f = fract(_st);","    // Four corners in 2D of a tile","    float a = random(i);","    float b = random(i + vec2(1.0, 0.0));","    float c = random(i + vec2(0.0, 1.0));","    float d = random(i + vec2(1.0, 1.0));","    vec2 u = f * f * (3.0 - 2.0 * f);","    return mix(a, b, u.x) + ","            (c - a)* u.y * (1.0 - u.x) + ","            (d - b) * u.x * u.y;","}"].join("\n")}(this.Blotter,this._),function(a,b){a.Assets.Shaders.Noise2D=["//","// Description : Array and textureless GLSL 2D simplex noise function.","//      Author : Ian McEwan, Ashima Arts.","//  Maintainer : ijm","//     Lastmod : 20110822 (ijm)","//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.","//               Distributed under the MIT License. See LICENSE file.","//               https://github.com/ashima/webgl-noise","//","","vec2 n2mod289(vec2 x) {","  return x - floor(x * (1.0 / 289.0)) * 289.0;","}","","vec3 n2mod289(vec3 x) {","  return x - floor(x * (1.0 / 289.0)) * 289.0;","}","","vec4 n2mod289(vec4 x) {","  return x - floor(x * (1.0 / 289.0)) * 289.0;","}","","vec3 permute(vec3 x) {","  return n2mod289(((x*34.0)+1.0)*x);","}","","float snoise(vec2 v)","  {","  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0","                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)","                     -0.577350269189626,  // -1.0 + 2.0 * C.x","                      0.024390243902439); // 1.0 / 41.0","// First corner","  vec2 i  = floor(v + dot(v, C.yy) );","  vec2 x0 = v -   i + dot(i, C.xx);","","// Other corners","  vec2 i1;","  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0","  //i1.y = 1.0 - i1.x;","  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);","  // x0 = x0 - 0.0 + 0.0 * C.xx ;","  // x1 = x0 - i1 + 1.0 * C.xx ;","  // x2 = x0 - 1.0 + 2.0 * C.xx ;","  vec4 x12 = x0.xyxy + C.xxzz;","  x12.xy -= i1;","","// Permutations","  i = n2mod289(i); // Avoid truncation effects in permutation","  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))","   + i.x + vec3(0.0, i1.x, 1.0 ));","","  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);","  m = m*m ;","  m = m*m ;","","// Gradients: 41 points uniformly over a line, mapped onto a diamond.","// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)","","  vec3 x = 2.0 * fract(p * C.www) - 1.0;","  vec3 h = abs(x) - 0.5;","  vec3 ox = floor(x + 0.5);","  vec3 a0 = x - ox;","","// Normalise gradients implicitly by scaling m","// Approximation of: m *= inversesqrt( a0*a0 + h*h );","  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );","","// Compute final noise value at P","  vec3 g;","  g.x  = a0.x  * x0.x  + h.x  * x0.y;","  g.yz = a0.yz * x12.xz + h.yz * x12.yw;","  return 130.0 * dot(m, g);","}"].join("\n")}(this.Blotter,this._),function(a,b){a.Assets.Shaders.Noise3D=["//","// Description : Array and textureless GLSL 2D/3D/4D simplex","//               noise functions.","//      Author : Ian McEwan, Ashima Arts.","//  Maintainer : ijm","//     Lastmod : 20110822 (ijm)","//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.","//               Distributed under the MIT License. See LICENSE file.","//               https://github.com/ashima/webgl-noise","//","","vec2 n3mod289(vec2 x) {","  return x - floor(x * (1.0 / 289.0)) * 289.0;","}","","vec3 n3mod289(vec3 x) {","  return x - floor(x * (1.0 / 289.0)) * 289.0;","}","","vec4 n3mod289(vec4 x) {","  return x - floor(x * (1.0 / 289.0)) * 289.0;","}","","vec4 permute(vec4 x) {","     return n3mod289(((x*34.0)+1.0)*x);","}","","vec4 taylorInvSqrt(vec4 r)","{","  return 1.79284291400159 - 0.85373472095314 * r;","}","","float snoise(vec3 v)","  {","  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;","  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);","","// First corner","  vec3 i  = floor(v + dot(v, C.yyy) );","  vec3 x0 =   v - i + dot(i, C.xxx) ;","","// Other corners","  vec3 g = step(x0.yzx, x0.xyz);","  vec3 l = 1.0 - g;","  vec3 i1 = min( g.xyz, l.zxy );","  vec3 i2 = max( g.xyz, l.zxy );","","  //   x0 = x0 - 0.0 + 0.0 * C.xxx;","  //   x1 = x0 - i1  + 1.0 * C.xxx;","  //   x2 = x0 - i2  + 2.0 * C.xxx;","  //   x3 = x0 - 1.0 + 3.0 * C.xxx;","  vec3 x1 = x0 - i1 + C.xxx;","  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y","  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y","","// Permutations","  i = n3mod289(i);","  vec4 p = permute( permute( permute(","             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))","           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))","           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));","","// Gradients: 7x7 points over a square, mapped onto an octahedron.","// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)","  float n_ = 0.142857142857; // 1.0/7.0","  vec3  ns = n_ * D.wyz - D.xzx;","","  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)","","  vec4 x_ = floor(j * ns.z);","  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)","","  vec4 x = x_ *ns.x + ns.yyyy;","  vec4 y = y_ *ns.x + ns.yyyy;","  vec4 h = 1.0 - abs(x) - abs(y);","","  vec4 b0 = vec4( x.xy, y.xy );","  vec4 b1 = vec4( x.zw, y.zw );","","  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;","  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;","  vec4 s0 = floor(b0)*2.0 + 1.0;","  vec4 s1 = floor(b1)*2.0 + 1.0;","  vec4 sh = -step(h, vec4(0.0));","","  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;","  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;","","  vec3 p0 = vec3(a0.xy,h.x);","  vec3 p1 = vec3(a0.zw,h.y);","  vec3 p2 = vec3(a1.xy,h.z);","  vec3 p3 = vec3(a1.zw,h.w);","","//Normalise gradients","  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));","  p0 *= norm.x;","  p1 *= norm.y;","  p2 *= norm.z;","  p3 *= norm.w;","","// Mix final noise value","  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);","  m = m * m;","  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),","                                dot(p2,x2), dot(p3,x3) ) );","  }"].join("\n")}(this.Blotter,this._),function(a,b){a.Assets.Shaders.Noise4D=["//","// Description : Array and textureless GLSL 2D/3D/4D simplex","//               noise functions.","//      Author : Ian McEwan, Ashima Arts.","//  Maintainer : ijm","//     Lastmod : 20110822 (ijm)","//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.","//               Distributed under the MIT License. See LICENSE file.","//               https://github.com/ashima/webgl-noise","//","","vec4 mod289(vec4 x) {","  return x - floor(x * (1.0 / 289.0)) * 289.0; }","","float mod289(float x) {","  return x - floor(x * (1.0 / 289.0)) * 289.0; }","","vec4 permute(vec4 x) {","     return mod289(((x*34.0)+1.0)*x);","}","","float permute(float x) {","     return mod289(((x*34.0)+1.0)*x);","}","","vec4 taylorInvSqrt(vec4 r)","{","  return 1.79284291400159 - 0.85373472095314 * r;","}","","float taylorInvSqrt(float r)","{","  return 1.79284291400159 - 0.85373472095314 * r;","}","","vec4 grad4(float j, vec4 ip)","  {","  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);","  vec4 p,s;","","  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;","  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);","  s = vec4(lessThan(p, vec4(0.0)));","  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;","","  return p;","  }","","// (sqrt(5) - 1)/4 = F4, used once below","#define F4 0.309016994374947451","","float snoise(vec4 v)","  {","  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4","                        0.276393202250021,  // 2 * G4","                        0.414589803375032,  // 3 * G4","                       -0.447213595499958); // -1 + 4 * G4","","// First corner","  vec4 i  = floor(v + dot(v, vec4(F4)) );","  vec4 x0 = v -   i + dot(i, C.xxxx);","","// Other corners","","// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)","  vec4 i0;","  vec3 isX = step( x0.yzw, x0.xxx );","  vec3 isYZ = step( x0.zww, x0.yyz );","//  i0.x = dot( isX, vec3( 1.0 ) );","  i0.x = isX.x + isX.y + isX.z;","  i0.yzw = 1.0 - isX;","//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );","  i0.y += isYZ.x + isYZ.y;","  i0.zw += 1.0 - isYZ.xy;","  i0.z += isYZ.z;","  i0.w += 1.0 - isYZ.z;","","  // i0 now contains the unique values 0,1,2,3 in each channel","  vec4 i3 = clamp( i0, 0.0, 1.0 );","  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );","  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );","","  //  x0 = x0 - 0.0 + 0.0 * C.xxxx","  //  x1 = x0 - i1  + 1.0 * C.xxxx","  //  x2 = x0 - i2  + 2.0 * C.xxxx","  //  x3 = x0 - i3  + 3.0 * C.xxxx","  //  x4 = x0 - 1.0 + 4.0 * C.xxxx","  vec4 x1 = x0 - i1 + C.xxxx;","  vec4 x2 = x0 - i2 + C.yyyy;","  vec4 x3 = x0 - i3 + C.zzzz;","  vec4 x4 = x0 + C.wwww;","","// Permutations","  i = mod289(i);","  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);","  vec4 j1 = permute( permute( permute( permute (","             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))","           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))","           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))","           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));","","// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope","// 7*7*6 = 294, which is close to the ring size 17*17 = 289.","  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;","","  vec4 p0 = grad4(j0,   ip);","  vec4 p1 = grad4(j1.x, ip);","  vec4 p2 = grad4(j1.y, ip);","  vec4 p3 = grad4(j1.z, ip);","  vec4 p4 = grad4(j1.w, ip);","","// Normalise gradients","  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));","  p0 *= norm.x;","  p1 *= norm.y;","  p2 *= norm.z;","  p3 *= norm.w;","  p4 *= taylorInvSqrt(dot(p4,p4));","","// Mix contributions from the five corners","  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);","  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);","  m0 = m0 * m0;","  m1 = m1 * m1;","  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))","               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;","","  }"].join("\n")}(this.Blotter,this._),function(a,b){a.Assets.Shaders.PI=["//","// Author : Reza Ali","// License : Distributed under the MIT License.","//","","#define TWO_PI 6.2831853072","#define PI 3.14159265359","#define HALF_PI 1.57079632679"].join("\n")}(this.Blotter,this._),function(a,b){a.Assets.Shaders.Random=["//","// Author : Patricio Gonzalez Vivo and Jen Lowe","// License : Distributed under the MIT License.","// Source : https://github.com/patriciogonzalezvivo/thebookofshaders","//","","float random (in float _x) {","    return fract(sin(_x)*1e4);","}","","float random (in vec2 co) {","    return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);","}"].join("\n")}(this.Blotter,this._),function(a,b){a.Mapping=function(a,b,c,d){this.texts=a,this._textBounds=b,this._width=c,this._height=d,this._ratio=1},a.Mapping.prototype=function(){function c(b,c){return c=c||a.TextUtils.ensurePropertyValues().leading,isNaN(c)?-1!==c.toString().indexOf("px")?c=parseInt(c):-1!==c.toString().indexOf("%")&&(c=parseInt(c)/100*b):c*=b,c}return{constructor:a.Mapping,get ratio(){return this._ratio},set ratio(a){this._ratio=a||1},get width(){return this._width*this._ratio},get height(){return this._height*this._ratio},boundsForText:function(b){a.Messaging.ensureInstanceOf(b,a.Text,"Blotter.Text","Blotter.Mapping","boundsForText");var c=this._textBounds[b.id];return c&&(c={w:c.w*this._ratio,h:c.h*this._ratio,x:c.x*this._ratio,y:c.y*this._ratio}),c},toCanvas:function(d){var e=a.CanvasUtils.hiDpiCanvas(this._width,this._height,this._ratio),f=e.getContext("2d",{alpha:!1}),g=new Image;f.textBaseline="middle";for(var h=0;h<this.texts.length;h++){var i=this.texts[h],j=this._textBounds[i.id],k=c.call(this,i.properties.size,i.properties.leading)/2;f.font=i.properties.style+" "+i.properties.weight+" "+i.properties.size+"px "+i.properties.family,f.save(),f.translate(j.x+i.properties.paddingLeft,this._height-(j.y+j.h)+i.properties.paddingTop),f.fillStyle=i.properties.fill,f.fillText(i.value,0,Math.round(k)),f.restore()}g.onload=b.bind(function(){f.save(),f.scale(1,-1),f.clearRect(0,-1*this._height,this._width,this._height),f.drawImage(g,0,-1*this._height,this._width,this._height),f.restore(),d(e)},this),g.src=e.toDataURL("image/png")}}}()}(this.Blotter,this._),function(a,b,c){a.MappingMaterial=function(a,b,c,d){this.mapping=a,this.material=b,this.shaderMaterial=c,this._userUniformDataTextureObjects=d,this.init.apply(this,arguments)},a.MappingMaterial.prototype=function(){function d(a,b,c,d){var e=d.type;"1f"==e?(c[4*b]=a,c[4*b+1]=0,c[4*b+2]=0,c[4*b+3]=0):"2f"==e?(c[4*b]=a[0],c[4*b+1]=a[1],c[4*b+2]=0,c[4*b+3]=0):"3f"==e?(c[4*b]=a[0],c[4*b+1]=a[1],c[4*b+2]=a[2],c[4*b+3]=0):"4f"==e?(c[4*b]=a[0],c[4*b+1]=a[1],c[4*b+2]=a[2],c[4*b+3]=a[3]):(c[4*b]=0,c[4*b+1]=0,c[4*b+2]=0,c[4*b+3]=0)}function e(d){var e={_type:d.userUniform.type,_value:d.userUniform.value,get value(){return this._value},set value(b){if(!a.UniformUtils.validValueForUniformType(this._type,b))return void a.Messaging.logError("Blotter.MappingMaterial",!1,"uniform value not valid for uniform type: "+this._type);this._value=b,this.trigger("update")}};return b.extend(e,c.prototype),e}function f(a,c){return b.reduce(a.texts,function(a,f,g){return a[f.id]=b.reduce(c.userUniforms,function(a,b,f){var h=b.position+g;return a[f]=e(b),a[f].on("update",function(){d(a[f].value,h,c.data,b.userUniform),c.texture.needsUpdate=!0}),a[f].value=b.userUniform.value,a},{}),a},{})}function g(a,c,d){return b.reduce(c.userUniforms,function(f,g,h){return f[h]=e(g),f[h].on("update",function(){b.each(a.texts,function(a){d[a.id][h].value=f[h].value}),c.texture.needsUpdate=!0}),f},{})}return{constructor:a.MappingMaterial,get uniforms(){return this.material.uniforms},get mainImage(){return this.material.mainImage},get width(){return this.mapping.width},get height(){return this.mapping.height},get ratio(){return this.mapping.ratio},init:function(a,b,c,d){this.textUniformInterface=f(this.mapping,this._userUniformDataTextureObjects),this.uniformInterface=g(this.mapping,this._userUniformDataTextureObjects,this.textUniformInterface)},boundsForText:function(b){return a.Messaging.ensureInstanceOf(b,a.Text,"Blotter.Text","Blotter.MappingMaterial","boundsForText"),this.mapping.boundsForText(b)}}}()}(this.Blotter,this._,this.EventEmitter),function(a,b,c){a.Material=function(){this.init.apply(this,arguments)},a.Material.prototype=function(){function d(){return["void mainImage( out vec4 mainImage, in vec2 fragCoord ) {","mainImage = textTexture(fragCoord / uResolution);","}"].join("\n")}function e(d){var e={_type:d.type,_value:d.value,get type(){return this._type},set type(a){this._type=a},get value(){return this._value},set value(b){if(!a.UniformUtils.validValueForUniformType(this._type,b))return void a.Messaging.logError("Blotter.Material",!1,"uniform value not valid for uniform type: "+this._type);this._value=b,this.trigger("update")}};return b.extend(e,c.prototype),e}function f(a){return b.reduce(a,b.bind(function(a,c,d){return a[d]=e(c),a[d].on("update",b.bind(function(){this.trigger("update:uniform",[d])},this)),a},this),{})}return{constructor:a.Material,get needsUpdate(){},set needsUpdate(a){!0===a&&this.trigger("update")},get mainImage(){return this._mainImage},set mainImage(a){this._mainImage=a||d()},get uniforms(){return this._uniforms},set uniforms(c){this._uniforms=f.call(this,a.UniformUtils.extractValidUniforms(b.extend(c,a.UniformUtils.defaultUniforms)))},init:function(){this.mainImage=d(),this.uniforms={}}}}(),a._extendWithGettersSetters(a.Material.prototype,c.prototype)}(this.Blotter,this._,this.EventEmitter),function(a,b){a.ShaderMaterial=function(b,c){a.Material.apply(this,arguments)},a.ShaderMaterial.prototype=Object.create(a.Material.prototype),a._extendWithGettersSetters(a.ShaderMaterial.prototype,function(){return{constructor:a.ShaderMaterial,init:function(a,c){b.defaults(this,c),this.mainImage=a}}}())}(this.Blotter,this._),function(a,b,c){a.RenderScope=function(b,c){this.text=b,this.blotter=c,this.material={mainImage:this.blotter.material.mainImage},this._mappingMaterial=c.mappingMaterial,this.playing=this.blotter.autoplay,this.timeDelta=0,this.lastDrawTime=!1,this.frameCount=0,this.domElement=a.CanvasUtils.hiDpiCanvas(0,0,this.blotter.ratio,{class:"b-canvas",html:b.value}),this.context=this.domElement.getContext("2d")},a.RenderScope.prototype=function(){function d(){function b(b){c.domElement.addEventListener(b,function(d){var e=a.CanvasUtils.normalizedMousePosition(c.domElement,d);c.emit(b,e)},!1)}for(var c=this,d=["mousedown","mouseup","mousemove","mouseenter","mouseleave"],e=0;e<d.length;e++){b(d[e])}}function e(a,b){var c=a.boundsForText(b);if(c)return{w:c.w,h:c.h,x:-1*Math.floor(c.x),y:-1*Math.floor(a.height-(c.y+c.h))}}function f(a,c){b.each(a,function(a,b){var d=c[b];if(d){var e=d.type==a.type,f=d.value==a.value;e&&!f&&(d.value=a.value)}})}function g(d){var e={_type:d.type,_value:d.value,get type(){return this._type},set type(b){a.Messaging.logError("Blotter.RenderScope",!1,"uniform types may not be updated through a text scope")},get value(){return this._value},set value(b){if(!a.UniformUtils.validValueForUniformType(this._type,b))return void a.Messaging.logError("Blotter.RenderScope",!1,"uniform value not valid for uniform type: "+this._type);this._value=b,this.trigger("update")}};return b.extend(e,c.prototype),e}function h(a){return b.reduce(a,b.bind(function(a,c,d){return a[d]=g(c),a[d].on("update",b.bind(function(){this.trigger("update:uniform",[d])},this)),a},this),{})}function i(){var b=this._mappingMaterial,c=b&&e(b,this.text),d=this.material.uniforms;b&&c&&(a.CanvasUtils.updateCanvasSize(this.domElement,c.w/this.blotter.ratio,c.h/this.blotter.ratio,this.blotter.ratio),this.domElement.innerHTML=this.text.value,this.bounds=c,this.material.uniforms=h.call(this,b.uniforms),this.material.mainImage=b.mainImage,d&&f(d,this.material.uniforms),this.trigger(this.lastUpdated?"update":"ready"),this.lastUpdated=Date.now())}return{constructor:a.RenderScope,get needsUpdate(){},set needsUpdate(a){!0===a&&i.call(this)},get mappingMaterial(){},set mappingMaterial(a){this._mappingMaterial=a},play:function(){this.playing=!0},pause:function(){this.playing=!1},render:function(){if(this.bounds){var a=Date.now();this.frameCount+=1,this.timeDelta=(a-(this.lastDrawTime||a))/1e3,this.lastDrawTime=a,this.context.clearRect(0,0,this.domElement.width,this.domElement.height),this.context.putImageData(this.blotter.imageData,this.bounds.x,this.bounds.y),this.trigger("render",[this.frameCount])}},appendTo:function(a){return"function"==typeof a.append?a.append(this.domElement):a.appendChild(this.domElement),d.call(this),this}}}(),a._extendWithGettersSetters(a.RenderScope.prototype,c.prototype)}(this.Blotter,this._,this.EventEmitter),function(a,b,c,d){var e=this;a.Renderer=function(){this._currentAnimationLoop=!1,this._scene=new c.Scene,this._plane=new c.PlaneGeometry(1,1),this._material=new c.MeshBasicMaterial,this._mesh=new c.Mesh(this._plane,this._material),this._scene.add(this._mesh),this._camera=new c.OrthographicCamera(.5,.5,.5,.5,0,100),this.init.apply(this,arguments)},a.Renderer.prototype=function(){function d(a,b){var d=new c.WebGLRenderTarget(a,b,{minFilter:c.LinearFilter,magFilter:c.LinearFilter,format:c.RGBAFormat,type:c.UnsignedByteType});return d.texture.generateMipmaps=!1,d.width=a,d.height=b,d}function f(){a.webglRenderer.render(this._scene,this._camera,this._renderTarget),a.webglRenderer.readRenderTargetPixels(this._renderTarget,0,0,this._renderTarget.width,this._renderTarget.height,this._imageDataArray),this.trigger("render"),this._currentAnimationLoop=e.requestAnimationFrame(b.bind(f,this))}return{constructor:a.Renderer,get material(){},set material(a){a instanceof c.Material&&(this._material=a,this._mesh.material=a)},get width(){return this._width},set width(a){this.setSize(a,this._height)},get height(){return this._height},set height(a){this.setSize(this._width,a)},init:function(){this.setSize(1,1)},start:function(){this._currentAnimationLoop||f.call(this)},stop:function(){this._currentAnimationLoop&&(e.cancelAnimationFrame(this._currentAnimationLoop),this._currentAnimationLoop=void 0)},setSize:function(a,b){this._width=a||1,this._height=b||1,this._mesh.scale.set(this._width,this._height,1),this._camera.left=this._width/-2,this._camera.right=this._width/2,this._camera.top=this._height/2,this._camera.bottom=this._height/-2,this._camera.updateProjectionMatrix(),this._renderTarget=d(this._width,this._height),this._viewBuffer=new ArrayBuffer(this._width*this._height*4),this._imageDataArray=new Uint8Array(this._viewBuffer),this._clampedImageDataArray=new Uint8ClampedArray(this._viewBuffer),this.imageData=new ImageData(this._clampedImageDataArray,this._width,this._height)},teardown:function(){this.stop()}}}(),a._extendWithGettersSetters(a.Renderer.prototype,d.prototype)}(this.Blotter,this._,this.THREE,this.EventEmitter),function(a,b,c,d){a.BoundsDataTextureBuilder=function(){function a(a){for(var b=a.texts,c=new Float32Array(4*b.length),d=0;d<b.length;d++){var e=b[d],f=a.boundsForText(e);c[4*d]=f.x,c[4*d+1]=a.height-(f.y+f.h),c[4*d+2]=f.w,c[4*d+3]=f.h}return c}return{build:function(b,e){d(function(){var d=a(b),f=new c.DataTexture(d,b.texts.length,1,c.RGBAFormat,c.FloatType);f.needsUpdate=!0,e(f)})}}}()}(this.Blotter,this._,this.THREE,this.setImmediate),function(a,b,c,d){a.IndicesDataTextureBuilder=function(){function a(a,b,c,d){for(var e=a.ratio,f=new Float32Array(c*b*4),g=b%1,h=1/a.texts.length/2,i=1;i<f.length/4;i++){for(var j=Math.ceil(i/(b-g)),k=i-(b-g)*(j-1),l=0,m=0,n=0,o=0;o<a.texts.length;o++){var p=a.texts[o],q=a.boundsForText(p),r=q.w/e*d,s=q.h/e*d,t=q.x/e*d,u=q.y/e*d;if(j>=u&&j<=u+s&&k>=t&&k<=t+r){l=o/a.texts.length+h,n=1;break}}var v=i-1;f[4*v+0]=l,f[4*v+1]=m,f[4*v+2]=m,f[4*v+3]=n}return f}return{build:function(b,e){var f=.5;d(function(){var d=b.width/b.ratio*f,g=b.height/b.ratio*f,h=a(b,d,g,f),i=new c.DataTexture(h,d,g,c.RGBAFormat,c.FloatType);i.flipY=!0,i.needsUpdate=!0,e(i)})}}}()}(this.Blotter,this._,this.THREE,this.setImmediate),function(a,b,c){a.TextTextureBuilder=function(){return{build:function(a,d){var e,f=new c.TextureLoader;a.toCanvas(b.bind(function(a){e=a.toDataURL(),f.load(e,b.bind(function(a){a.minFilter=c.LinearFilter,a.magFilter=c.LinearFilter,a.generateMipmaps=!0,a.needsUpdate=!0,d(a)},this))},this))}}}()}(this.Blotter,this._,this.THREE),function(a,b,c,d,e){a.MappingBuilder=function(){function c(a,b){var c=a.w*a.h;return b.w*b.h-c}function f(c){return b.reduce(c,function(b,c){var d=a.TextUtils.sizeForText(c.value,c.properties);return b[c.id]=d,b},[])}return{build:function(b,g){e(function(){var e=a.TextUtils.filterTexts(b),h=f(e),i=new d,j=[],k={};for(var l in h)if(h.hasOwnProperty(l)){var m=h[l];m.referenceId=l,j.push(m)}i.fit(j.sort(c));for(var n=0;n<j.length;n++){var o=j[n];k[o.referenceId]={w:o.w,h:o.h,x:o.fit.x,y:i.root.h-(o.fit.y+o.h)}}g(new a.Mapping(e,k,i.root.w,i.root.h))})}}}()}(this.Blotter,this._,this.THREE,this.GrowingPacker,this.setImmediate),function(a,b,c){a.MappingMaterialBuilder=function(){function d(){return["varying vec2 _vTexCoord;","void main() {","  _vTexCoord = uv;","  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","}"].join("\n")}function e(c,d,e){var f,g={publicUniformDeclarations:"",publicUniformDefinitions:""},h=(1/c.data.length/2).toFixed(20),i=c.texture.image.width.toFixed(1);return b.reduce(c.userUniforms,function(b,c,e){var f=a.UniformUtils.fullSwizzleStringForUniformType(c.userUniform.type),g=a.UniformUtils.glslDataTypeForUniformType(c.userUniform.type),j="(("+c.position.toFixed(1)+" + ((textIndex - ((1.0 / "+d.toFixed(1)+") / 2.0)) * "+d.toFixed(1)+")) / "+i+") + "+h;return b.publicUniformDeclarations+=g+" "+e+";\n",b.publicUniformDefinitions+="   "+e+" = texture2D(_userUniformsTexture, vec2("+j+", 0.5))."+f+";\n",b},g),f=[a.Assets.Shaders.Blending,a.Assets.Shaders.TextTexture,"uniform sampler2D _uSampler;","uniform vec2 _uCanvasResolution;","uniform sampler2D _uTextIndicesTexture;","uniform sampler2D _uTextBoundsTexture;","varying vec2 _vTexCoord;","vec4 _textBounds;","uniform sampler2D _userUniformsTexture;",g.publicUniformDeclarations,"// Helper function used by user programs to retrieve texel color information within the bounds of","// any given text. This is to be used instead of `texture2D` in the fragment sources for all Blotter materials.","vec4 textTexture(vec2 coord) {","   vec2 adjustedFragCoord = _textBounds.xy + vec2((_textBounds.z * coord.x), (_textBounds.w * coord.y));","   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;","   //  If adjustedFragCoord falls outside the bounds of the current texel's text, return `vec4(0.0)`.","   if (adjustedFragCoord.x < _textBounds.x ||","       adjustedFragCoord.x > _textBounds.x + _textBounds.z ||","       adjustedFragCoord.y < _textBounds.y ||","       adjustedFragCoord.y > _textBounds.y + _textBounds.w) {","     return vec4(0.0);","   }","   return texture2D(_uSampler, uv);","}","void mainImage(out vec4 mainImage, in vec2 fragCoord);",e,"void main(void) {","   vec4 textIndexData = texture2D(_uTextIndicesTexture, _vTexCoord);","   float textIndex = textIndexData.r;","   float textAlpha = textIndexData.a;","   _textBounds = texture2D(_uTextBoundsTexture, vec2(textIndex, 0.5));",g.publicUniformDefinitions,"   uResolution = _textBounds.zw;","   vec2 fragCoord = gl_FragCoord.xy - _textBounds.xy;","   vec4 outColor;","   mainImage(outColor, fragCoord);","   outColor.a = outColor.a * textAlpha;","   gl_FragColor = outColor;","}"],f.join("\n")}function f(b,c){a.TextTextureBuilder.build(b,function(a){c(a)})}function g(c,d){var e,f,g,h=[];e=function(){return function(b){a.IndicesDataTextureBuilder.build(c,function(a){h.push({uniformName:"_uTextIndicesTexture",texture:a}),b()})}},f=function(){return function(b){a.BoundsDataTextureBuilder.build(c,function(a){h.push({uniformName:"_uTextBoundsTexture",texture:a}),b()})}},g=[e(),f()],b(g).reduceRight(b.wrap,function(){d(h)})()}function h(d,e,f){a.UniformUtils.ensureHasRequiredDefaultUniforms(d,"Blotter.MappingMaterialBuilder","_buildUserUniformDataTextureObjects"),d=a.UniformUtils.extractValidUniforms(d);var g=Object.keys(d).length*e,h=new Float32Array(4*g),i=new c.DataTexture(h,g,1,c.RGBAFormat,c.FloatType),j={data:h,texture:i,userUniforms:{}};b.reduce(d,function(a,b,c){var f=Object.keys(d).indexOf(c)*e;return a.userUniforms[c]={userUniform:b,position:f},a},j),f(j)}function i(a){return b.reduce(a,function(a,b){return a[b.uniformName]={type:"t",value:b.texture},a},{})}function j(a){return{_userUniformsTexture:{type:"t",value:a.texture}}}function k(a,c,d,e,f){var g={_uSampler:{type:"t",value:d},_uCanvasResolution:{type:"2f",value:[a,c]}};return b.extend(g,i(e)),b.extend(g,j(f)),g}function l(a,b,d){var e=new c.ShaderMaterial({vertexShader:a,fragmentShader:b,uniforms:d});return e.depthTest=!1,e.depthWrite=!1,e.premultipliedAlpha=!1,e}return{build:function(c,i,j){var m,n,o,p,q;m=function(){return function(a){f(c,function(b){o=b,a()})}},n=function(){return function(a){g(c,function(b){p=b,a()})}},buildUserUniformDataTextureObjects=function(){return function(a){h(i.uniforms,c.texts.length,function(b){userUniformDataTextureObjects=b,a()})}},q=[m(),n(),buildUserUniformDataTextureObjects()],b(q).reduceRight(b.wrap,function(){var f=k(c.width,c.height,o,p,userUniformDataTextureObjects),g=(b.omit(f,"_uCanvasResolution","_uSampler","_uTextBoundsTexture","_uTextIndicesTexture"),l(d(),e(userUniformDataTextureObjects,c.texts.length,i.mainImage),f));j(new a.MappingMaterial(c,i,g,userUniformDataTextureObjects))})()}}}()}(this.Blotter,this._,this.THREE);

(function(t){var e=typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global;if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,r,n){e.Backbone=t(e,n,i,r)})}else if(typeof exports!=="undefined"){var i=require("underscore"),r;try{r=require("jquery")}catch(n){}t(e,exports,i,r)}else{e.Backbone=t(e,{},e._,e.jQuery||e.Zepto||e.ender||e.$)}})(function(t,e,i,r){var n=t.Backbone;var s=Array.prototype.slice;e.VERSION="1.3.2";e.$=r;e.noConflict=function(){t.Backbone=n;return this};e.emulateHTTP=false;e.emulateJSON=false;var a=function(t,e,r){switch(t){case 1:return function(){return i[e](this[r])};case 2:return function(t){return i[e](this[r],t)};case 3:return function(t,n){return i[e](this[r],o(t,this),n)};case 4:return function(t,n,s){return i[e](this[r],o(t,this),n,s)};default:return function(){var t=s.call(arguments);t.unshift(this[r]);return i[e].apply(i,t)}}};var h=function(t,e,r){i.each(e,function(e,n){if(i[n])t.prototype[n]=a(e,n,r)})};var o=function(t,e){if(i.isFunction(t))return t;if(i.isObject(t)&&!e._isModel(t))return u(t);if(i.isString(t))return function(e){return e.get(t)};return t};var u=function(t){var e=i.matches(t);return function(t){return e(t.attributes)}};var l=e.Events={};var c=/\s+/;var f=function(t,e,r,n,s){var a=0,h;if(r&&typeof r==="object"){if(n!==void 0&&"context"in s&&s.context===void 0)s.context=n;for(h=i.keys(r);a<h.length;a++){e=f(t,e,h[a],r[h[a]],s)}}else if(r&&c.test(r)){for(h=r.split(c);a<h.length;a++){e=t(e,h[a],n,s)}}else{e=t(e,r,n,s)}return e};l.on=function(t,e,i){return d(this,t,e,i)};var d=function(t,e,i,r,n){t._events=f(v,t._events||{},e,i,{context:r,ctx:t,listening:n});if(n){var s=t._listeners||(t._listeners={});s[n.id]=n}return t};l.listenTo=function(t,e,r){if(!t)return this;var n=t._listenId||(t._listenId=i.uniqueId("l"));var s=this._listeningTo||(this._listeningTo={});var a=s[n];if(!a){var h=this._listenId||(this._listenId=i.uniqueId("l"));a=s[n]={obj:t,objId:n,id:h,listeningTo:s,count:0}}d(t,e,r,this,a);return this};var v=function(t,e,i,r){if(i){var n=t[e]||(t[e]=[]);var s=r.context,a=r.ctx,h=r.listening;if(h)h.count++;n.push({callback:i,context:s,ctx:s||a,listening:h})}return t};l.off=function(t,e,i){if(!this._events)return this;this._events=f(g,this._events,t,e,{context:i,listeners:this._listeners});return this};l.stopListening=function(t,e,r){var n=this._listeningTo;if(!n)return this;var s=t?[t._listenId]:i.keys(n);for(var a=0;a<s.length;a++){var h=n[s[a]];if(!h)break;h.obj.off(e,r,this)}return this};var g=function(t,e,r,n){if(!t)return;var s=0,a;var h=n.context,o=n.listeners;if(!e&&!r&&!h){var u=i.keys(o);for(;s<u.length;s++){a=o[u[s]];delete o[a.id];delete a.listeningTo[a.objId]}return}var l=e?[e]:i.keys(t);for(;s<l.length;s++){e=l[s];var c=t[e];if(!c)break;var f=[];for(var d=0;d<c.length;d++){var v=c[d];if(r&&r!==v.callback&&r!==v.callback._callback||h&&h!==v.context){f.push(v)}else{a=v.listening;if(a&&--a.count===0){delete o[a.id];delete a.listeningTo[a.objId]}}}if(f.length){t[e]=f}else{delete t[e]}}return t};l.once=function(t,e,r){var n=f(p,{},t,e,i.bind(this.off,this));return this.on(n,e,r)};l.listenToOnce=function(t,e,r){var n=f(p,{},e,r,i.bind(this.stopListening,this,t));return this.listenTo(t,n)};var p=function(t,e,r,n){if(r){var s=t[e]=i.once(function(){n(e,s);r.apply(this,arguments)});s._callback=r}return t};l.trigger=function(t){if(!this._events)return this;var e=Math.max(0,arguments.length-1);var i=Array(e);for(var r=0;r<e;r++)i[r]=arguments[r+1];f(m,this._events,t,void 0,i);return this};var m=function(t,e,i,r){if(t){var n=t[e];var s=t.all;if(n&&s)s=s.slice();if(n)_(n,r);if(s)_(s,[e].concat(r))}return t};var _=function(t,e){var i,r=-1,n=t.length,s=e[0],a=e[1],h=e[2];switch(e.length){case 0:while(++r<n)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<n)(i=t[r]).callback.call(i.ctx,s);return;case 2:while(++r<n)(i=t[r]).callback.call(i.ctx,s,a);return;case 3:while(++r<n)(i=t[r]).callback.call(i.ctx,s,a,h);return;default:while(++r<n)(i=t[r]).callback.apply(i.ctx,e);return}};l.bind=l.on;l.unbind=l.off;i.extend(e,l);var y=e.Model=function(t,e){var r=t||{};e||(e={});this.cid=i.uniqueId(this.cidPrefix);this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)r=this.parse(r,e)||{};var n=i.result(this,"defaults");r=i.defaults(i.extend({},n,r),n);this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(y.prototype,l,{changed:null,validationError:null,idAttribute:"id",cidPrefix:"c",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},matches:function(t){return!!i.iteratee(t,this)(this.attributes)},set:function(t,e,r){if(t==null)return this;var n;if(typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r||(r={});if(!this._validate(n,r))return false;var s=r.unset;var a=r.silent;var h=[];var o=this._changing;this._changing=true;if(!o){this._previousAttributes=i.clone(this.attributes);this.changed={}}var u=this.attributes;var l=this.changed;var c=this._previousAttributes;for(var f in n){e=n[f];if(!i.isEqual(u[f],e))h.push(f);if(!i.isEqual(c[f],e)){l[f]=e}else{delete l[f]}s?delete u[f]:u[f]=e}if(this.idAttribute in n)this.id=this.get(this.idAttribute);if(!a){if(h.length)this._pending=r;for(var d=0;d<h.length;d++){this.trigger("change:"+h[d],this,u[h[d]],r)}}if(o)return this;if(!a){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var r in this.attributes)e[r]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e=this._changing?this._previousAttributes:this.attributes;var r={};for(var n in t){var s=t[n];if(i.isEqual(e[n],s))continue;r[n]=s}return i.size(r)?r:false},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=i.extend({parse:true},t);var e=this;var r=t.success;t.success=function(i){var n=t.parse?e.parse(i,t):i;if(!e.set(n,t))return false;if(r)r.call(t.context,e,i,t);e.trigger("sync",e,i,t)};B(this,t);return this.sync("read",this,t)},save:function(t,e,r){var n;if(t==null||typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r=i.extend({validate:true,parse:true},r);var s=r.wait;if(n&&!s){if(!this.set(n,r))return false}else if(!this._validate(n,r)){return false}var a=this;var h=r.success;var o=this.attributes;r.success=function(t){a.attributes=o;var e=r.parse?a.parse(t,r):t;if(s)e=i.extend({},n,e);if(e&&!a.set(e,r))return false;if(h)h.call(r.context,a,t,r);a.trigger("sync",a,t,r)};B(this,r);if(n&&s)this.attributes=i.extend({},o,n);var u=this.isNew()?"create":r.patch?"patch":"update";if(u==="patch"&&!r.attrs)r.attrs=n;var l=this.sync(u,this,r);this.attributes=o;return l},destroy:function(t){t=t?i.clone(t):{};var e=this;var r=t.success;var n=t.wait;var s=function(){e.stopListening();e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(n)s();if(r)r.call(t.context,e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};var a=false;if(this.isNew()){i.defer(t.success)}else{B(this,t);a=this.sync("delete",this,t)}if(!n)s();return a},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||F();if(this.isNew())return t;var e=this.get(this.idAttribute);return t.replace(/[^\/]$/,"$&/")+encodeURIComponent(e)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend({},t,{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var r=this.validationError=this.validate(t,e)||null;if(!r)return true;this.trigger("invalid",this,r,i.extend(e,{validationError:r}));return false}});var b={keys:1,values:1,pairs:1,invert:1,pick:0,omit:0,chain:1,isEmpty:1};h(y,b,"attributes");var x=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var w={add:true,remove:true,merge:true};var E={add:true,remove:false};var I=function(t,e,i){i=Math.min(Math.max(i,0),t.length);var r=Array(t.length-i);var n=e.length;var s;for(s=0;s<r.length;s++)r[s]=t[s+i];for(s=0;s<n;s++)t[s+i]=e[s];for(s=0;s<r.length;s++)t[s+n+i]=r[s]};i.extend(x.prototype,l,{model:y,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,E))},remove:function(t,e){e=i.extend({},e);var r=!i.isArray(t);t=r?[t]:t.slice();var n=this._removeModels(t,e);if(!e.silent&&n.length){e.changes={added:[],merged:[],removed:n};this.trigger("update",this,e)}return r?n[0]:n},set:function(t,e){if(t==null)return;e=i.extend({},w,e);if(e.parse&&!this._isModel(t)){t=this.parse(t,e)||[]}var r=!i.isArray(t);t=r?[t]:t.slice();var n=e.at;if(n!=null)n=+n;if(n>this.length)n=this.length;if(n<0)n+=this.length+1;var s=[];var a=[];var h=[];var o=[];var u={};var l=e.add;var c=e.merge;var f=e.remove;var d=false;var v=this.comparator&&n==null&&e.sort!==false;var g=i.isString(this.comparator)?this.comparator:null;var p,m;for(m=0;m<t.length;m++){p=t[m];var _=this.get(p);if(_){if(c&&p!==_){var y=this._isModel(p)?p.attributes:p;if(e.parse)y=_.parse(y,e);_.set(y,e);h.push(_);if(v&&!d)d=_.hasChanged(g)}if(!u[_.cid]){u[_.cid]=true;s.push(_)}t[m]=_}else if(l){p=t[m]=this._prepareModel(p,e);if(p){a.push(p);this._addReference(p,e);u[p.cid]=true;s.push(p)}}}if(f){for(m=0;m<this.length;m++){p=this.models[m];if(!u[p.cid])o.push(p)}if(o.length)this._removeModels(o,e)}var b=false;var x=!v&&l&&f;if(s.length&&x){b=this.length!==s.length||i.some(this.models,function(t,e){return t!==s[e]});this.models.length=0;I(this.models,s,0);this.length=this.models.length}else if(a.length){if(v)d=true;I(this.models,a,n==null?this.length:n);this.length=this.models.length}if(d)this.sort({silent:true});if(!e.silent){for(m=0;m<a.length;m++){if(n!=null)e.index=n+m;p=a[m];p.trigger("add",p,this,e)}if(d||b)this.trigger("sort",this,e);if(a.length||o.length||h.length){e.changes={added:a,removed:o,merged:h};this.trigger("update",this,e)}}return r?t[0]:t},reset:function(t,e){e=e?i.clone(e):{};for(var r=0;r<this.models.length;r++){this._removeReference(this.models[r],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t)},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);return this.remove(e,t)},slice:function(){return s.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;return this._byId[t]||this._byId[this.modelId(t.attributes||t)]||t.cid&&this._byId[t.cid]},has:function(t){return this.get(t)!=null},at:function(t){if(t<0)t+=this.length;return this.models[t]},where:function(t,e){return this[e?"find":"filter"](t)},findWhere:function(t){return this.where(t,true)},sort:function(t){var e=this.comparator;if(!e)throw new Error("Cannot sort a set without a comparator");t||(t={});var r=e.length;if(i.isFunction(e))e=i.bind(e,this);if(r===1||i.isString(e)){this.models=this.sortBy(e)}else{this.models.sort(e)}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return this.map(t+"")},fetch:function(t){t=i.extend({parse:true},t);var e=t.success;var r=this;t.success=function(i){var n=t.reset?"reset":"set";r[n](i,t);if(e)e.call(t.context,r,i,t);r.trigger("sync",r,i,t)};B(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};var r=e.wait;t=this._prepareModel(t,e);if(!t)return false;if(!r)this.add(t,e);var n=this;var s=e.success;e.success=function(t,e,i){if(r)n.add(t,i);if(s)s.call(i.context,t,e,i)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models,{model:this.model,comparator:this.comparator})},modelId:function(t){return t[this.model.prototype.idAttribute||"id"]},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(this._isModel(t)){if(!t.collection)t.collection=this;return t}e=e?i.clone(e):{};e.collection=this;var r=new this.model(t,e);if(!r.validationError)return r;this.trigger("invalid",this,r.validationError,e);return false},_removeModels:function(t,e){var i=[];for(var r=0;r<t.length;r++){var n=this.get(t[r]);if(!n)continue;var s=this.indexOf(n);this.models.splice(s,1);this.length--;delete this._byId[n.cid];var a=this.modelId(n.attributes);if(a!=null)delete this._byId[a];if(!e.silent){e.index=s;n.trigger("remove",n,this,e)}i.push(n);this._removeReference(n,e)}return i},_isModel:function(t){return t instanceof y},_addReference:function(t,e){this._byId[t.cid]=t;var i=this.modelId(t.attributes);if(i!=null)this._byId[i]=t;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){delete this._byId[t.cid];var i=this.modelId(t.attributes);if(i!=null)delete this._byId[i];if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if(e){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(t==="change"){var n=this.modelId(e.previousAttributes());var s=this.modelId(e.attributes);if(n!==s){if(n!=null)delete this._byId[n];if(s!=null)this._byId[s]=e}}}this.trigger.apply(this,arguments)}});var S={forEach:3,each:3,map:3,collect:3,reduce:0,foldl:0,inject:0,reduceRight:0,foldr:0,find:3,detect:3,filter:3,select:3,reject:3,every:3,all:3,some:3,any:3,include:3,includes:3,contains:3,invoke:0,max:3,min:3,toArray:1,size:1,first:3,head:3,take:3,initial:3,rest:3,tail:3,drop:3,last:3,without:0,difference:0,indexOf:3,shuffle:1,lastIndexOf:3,isEmpty:1,chain:1,sample:3,partition:3,groupBy:3,countBy:3,sortBy:3,indexBy:3,findIndex:3,findLastIndex:3};h(x,S,"models");var k=e.View=function(t){this.cid=i.uniqueId("view");i.extend(this,i.pick(t,P));this._ensureElement();this.initialize.apply(this,arguments)};var T=/^(\S+)\s*(.*)$/;var P=["model","collection","el","id","attributes","className","tagName","events"];i.extend(k.prototype,l,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this._removeElement();this.stopListening();return this},_removeElement:function(){this.$el.remove()},setElement:function(t){this.undelegateEvents();this._setElement(t);this.delegateEvents();return this},_setElement:function(t){this.$el=t instanceof e.$?t:e.$(t);this.el=this.$el[0]},delegateEvents:function(t){t||(t=i.result(this,"events"));if(!t)return this;this.undelegateEvents();for(var e in t){var r=t[e];if(!i.isFunction(r))r=this[r];if(!r)continue;var n=e.match(T);this.delegate(n[1],n[2],i.bind(r,this))}return this},delegate:function(t,e,i){this.$el.on(t+".delegateEvents"+this.cid,e,i);return this},undelegateEvents:function(){if(this.$el)this.$el.off(".delegateEvents"+this.cid);return this},undelegate:function(t,e,i){this.$el.off(t+".delegateEvents"+this.cid,e,i);return this},_createElement:function(t){return document.createElement(t)},_ensureElement:function(){if(!this.el){var t=i.extend({},i.result(this,"attributes"));if(this.id)t.id=i.result(this,"id");if(this.className)t["class"]=i.result(this,"className");this.setElement(this._createElement(i.result(this,"tagName")));this._setAttributes(t)}else{this.setElement(i.result(this,"el"))}},_setAttributes:function(t){this.$el.attr(t)}});e.sync=function(t,r,n){var s=H[t];i.defaults(n||(n={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:s,dataType:"json"};if(!n.url){a.url=i.result(r,"url")||F()}if(n.data==null&&r&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(n.attrs||r.toJSON(n))}if(n.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(n.emulateHTTP&&(s==="PUT"||s==="DELETE"||s==="PATCH")){a.type="POST";if(n.emulateJSON)a.data._method=s;var h=n.beforeSend;n.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",s);if(h)return h.apply(this,arguments)}}if(a.type!=="GET"&&!n.emulateJSON){a.processData=false}var o=n.error;n.error=function(t,e,i){n.textStatus=e;n.errorThrown=i;if(o)o.call(n.context,t,e,i)};var u=n.xhr=e.ajax(i.extend(a,n));r.trigger("request",r,u,n);return u};var H={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var $=e.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var A=/\((.*?)\)/g;var C=/(\(\?)?:\w+/g;var R=/\*\w+/g;var j=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend($.prototype,l,{initialize:function(){},route:function(t,r,n){if(!i.isRegExp(t))t=this._routeToRegExp(t);if(i.isFunction(r)){n=r;r=""}if(!n)n=this[r];var s=this;e.history.route(t,function(i){var a=s._extractParameters(t,i);if(s.execute(n,a,r)!==false){s.trigger.apply(s,["route:"+r].concat(a));s.trigger("route",r,a);e.history.trigger("route",s,r,a)}});return this},execute:function(t,e,i){if(t)t.apply(this,e)},navigate:function(t,i){e.history.navigate(t,i);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=i.result(this,"routes");var t,e=i.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(j,"\\$&").replace(A,"(?:$1)?").replace(C,function(t,e){return e?t:"([^/?]+)"}).replace(R,"([^?]*?)");return new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var r=t.exec(e).slice(1);return i.map(r,function(t,e){if(e===r.length-1)return t||null;return t?decodeURIComponent(t):null})}});var N=e.History=function(){this.handlers=[];this.checkUrl=i.bind(this.checkUrl,this);if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var M=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var U=/#.*$/;N.started=false;i.extend(N.prototype,l,{interval:50,atRoot:function(){var t=this.location.pathname.replace(/[^\/]$/,"$&/");return t===this.root&&!this.getSearch()},matchRoot:function(){var t=this.decodeFragment(this.location.pathname);var e=t.slice(0,this.root.length-1)+"/";return e===this.root},decodeFragment:function(t){return decodeURI(t.replace(/%25/g,"%2525"))},getSearch:function(){var t=this.location.href.replace(/#.*/,"").match(/\?.+/);return t?t[0]:""},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getPath:function(){var t=this.decodeFragment(this.location.pathname+this.getSearch()).slice(this.root.length-1);return t.charAt(0)==="/"?t.slice(1):t},getFragment:function(t){if(t==null){if(this._usePushState||!this._wantsHashChange){t=this.getPath()}else{t=this.getHash()}}return t.replace(M,"")},start:function(t){if(N.started)throw new Error("Backbone.history has already been started");N.started=true;this.options=i.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._hasHashChange="onhashchange"in window&&(document.documentMode===void 0||document.documentMode>7);this._useHashChange=this._wantsHashChange&&this._hasHashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.history&&this.history.pushState);this._usePushState=this._wantsPushState&&this._hasPushState;this.fragment=this.getFragment();this.root=("/"+this.root+"/").replace(O,"/");if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){var e=this.root.slice(0,-1)||"/";this.location.replace(e+"#"+this.getPath());return true}else if(this._hasPushState&&this.atRoot()){this.navigate(this.getHash(),{replace:true})}}if(!this._hasHashChange&&this._wantsHashChange&&!this._usePushState){this.iframe=document.createElement("iframe");this.iframe.src="javascript:0";this.iframe.style.display="none";this.iframe.tabIndex=-1;var r=document.body;var n=r.insertBefore(this.iframe,r.firstChild).contentWindow;n.document.open();n.document.close();n.location.hash="#"+this.fragment}var s=window.addEventListener||function(t,e){return attachEvent("on"+t,e)};if(this._usePushState){s("popstate",this.checkUrl,false)}else if(this._useHashChange&&!this.iframe){s("hashchange",this.checkUrl,false)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}if(!this.options.silent)return this.loadUrl()},stop:function(){var t=window.removeEventListener||function(t,e){return detachEvent("on"+t,e)};if(this._usePushState){t("popstate",this.checkUrl,false)}else if(this._useHashChange&&!this.iframe){t("hashchange",this.checkUrl,false)}if(this.iframe){document.body.removeChild(this.iframe);this.iframe=null}if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);N.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getHash(this.iframe.contentWindow)}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){if(!this.matchRoot())return false;t=this.fragment=this.getFragment(t);return i.some(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!N.started)return false;if(!e||e===true)e={trigger:!!e};t=this.getFragment(t||"");var i=this.root;if(t===""||t.charAt(0)==="?"){i=i.slice(0,-1)||"/"}var r=i+t;t=this.decodeFragment(t.replace(U,""));if(this.fragment===t)return;this.fragment=t;if(this._usePushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,r)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getHash(this.iframe.contentWindow)){var n=this.iframe.contentWindow;if(!e.replace){n.document.open();n.document.close()}this._updateHash(n.location,t,e.replace)}}else{return this.location.assign(r)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});e.history=new N;var q=function(t,e){var r=this;var n;if(t&&i.has(t,"constructor")){n=t.constructor}else{n=function(){return r.apply(this,arguments)}}i.extend(n,r,e);n.prototype=i.create(r.prototype,t);n.prototype.constructor=n;n.__super__=r.prototype;return n};y.extend=x.extend=$.extend=k.extend=N.extend=q;var F=function(){throw new Error('A "url" property or function must be specified')};var B=function(t,e){var i=e.error;e.error=function(r){if(i)i.call(e.context,t,r,e);t.trigger("error",t,r,e)}};return e});
//# sourceMappingURL=backbone-min.map
// MarionetteJS (Backbone.Marionette)
// ----------------------------------
// v2.4.5
//
// Copyright (c)2016 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://marionettejs.com


/*!
 * Includes BabySitter
 * https://github.com/marionettejs/backbone.babysitter/
 *
 * Includes Wreqr
 * https://github.com/marionettejs/backbone.wreqr/
 */



!function(a,b){if("function"==typeof define&&define.amd)define(["backbone","underscore"],function(c,d){return a.Marionette=a.Mn=b(a,c,d)});else if("undefined"!=typeof exports){var c=require("backbone"),d=require("underscore");module.exports=b(a,c,d)}else a.Marionette=a.Mn=b(a,a.Backbone,a._)}(this,function(a,b,c){"use strict";!function(a,b){var c=a.ChildViewContainer;return a.ChildViewContainer=function(a,b){var c=function(a){this._views={},this._indexByModel={},this._indexByCustom={},this._updateLength(),b.each(a,this.add,this)};b.extend(c.prototype,{add:function(a,b){var c=a.cid;return this._views[c]=a,a.model&&(this._indexByModel[a.model.cid]=c),b&&(this._indexByCustom[b]=c),this._updateLength(),this},findByModel:function(a){return this.findByModelCid(a.cid)},findByModelCid:function(a){var b=this._indexByModel[a];return this.findByCid(b)},findByCustom:function(a){var b=this._indexByCustom[a];return this.findByCid(b)},findByIndex:function(a){return b.values(this._views)[a]},findByCid:function(a){return this._views[a]},remove:function(a){var c=a.cid;return a.model&&delete this._indexByModel[a.model.cid],b.any(this._indexByCustom,function(a,b){return a===c?(delete this._indexByCustom[b],!0):void 0},this),delete this._views[c],this._updateLength(),this},call:function(a){this.apply(a,b.tail(arguments))},apply:function(a,c){b.each(this._views,function(d){b.isFunction(d[a])&&d[a].apply(d,c||[])})},_updateLength:function(){this.length=b.size(this._views)}});var d=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck","reduce"];return b.each(d,function(a){c.prototype[a]=function(){var c=b.values(this._views),d=[c].concat(b.toArray(arguments));return b[a].apply(b,d)}}),c}(a,b),a.ChildViewContainer.VERSION="0.1.11",a.ChildViewContainer.noConflict=function(){return a.ChildViewContainer=c,this},a.ChildViewContainer}(b,c),function(a,b){var c=a.Wreqr,d=a.Wreqr={};return a.Wreqr.VERSION="1.3.6",a.Wreqr.noConflict=function(){return a.Wreqr=c,this},d.Handlers=function(a,b){var c=function(a){this.options=a,this._wreqrHandlers={},b.isFunction(this.initialize)&&this.initialize(a)};return c.extend=a.Model.extend,b.extend(c.prototype,a.Events,{setHandlers:function(a){b.each(a,function(a,c){var d=null;b.isObject(a)&&!b.isFunction(a)&&(d=a.context,a=a.callback),this.setHandler(c,a,d)},this)},setHandler:function(a,b,c){var d={callback:b,context:c};this._wreqrHandlers[a]=d,this.trigger("handler:add",a,b,c)},hasHandler:function(a){return!!this._wreqrHandlers[a]},getHandler:function(a){var b=this._wreqrHandlers[a];if(b)return function(){return b.callback.apply(b.context,arguments)}},removeHandler:function(a){delete this._wreqrHandlers[a]},removeAllHandlers:function(){this._wreqrHandlers={}}}),c}(a,b),d.CommandStorage=function(){var c=function(a){this.options=a,this._commands={},b.isFunction(this.initialize)&&this.initialize(a)};return b.extend(c.prototype,a.Events,{getCommands:function(a){var b=this._commands[a];return b||(b={command:a,instances:[]},this._commands[a]=b),b},addCommand:function(a,b){var c=this.getCommands(a);c.instances.push(b)},clearCommands:function(a){var b=this.getCommands(a);b.instances=[]}}),c}(),d.Commands=function(a,b){return a.Handlers.extend({storageType:a.CommandStorage,constructor:function(b){this.options=b||{},this._initializeStorage(this.options),this.on("handler:add",this._executeCommands,this),a.Handlers.prototype.constructor.apply(this,arguments)},execute:function(a){a=arguments[0];var c=b.rest(arguments);this.hasHandler(a)?this.getHandler(a).apply(this,c):this.storage.addCommand(a,c)},_executeCommands:function(a,c,d){var e=this.storage.getCommands(a);b.each(e.instances,function(a){c.apply(d,a)}),this.storage.clearCommands(a)},_initializeStorage:function(a){var c,d=a.storageType||this.storageType;c=b.isFunction(d)?new d:d,this.storage=c}})}(d,b),d.RequestResponse=function(a,b){return a.Handlers.extend({request:function(a){return this.hasHandler(a)?this.getHandler(a).apply(this,b.rest(arguments)):void 0}})}(d,b),d.EventAggregator=function(a,b){var c=function(){};return c.extend=a.Model.extend,b.extend(c.prototype,a.Events),c}(a,b),d.Channel=function(c){var d=function(b){this.vent=new a.Wreqr.EventAggregator,this.reqres=new a.Wreqr.RequestResponse,this.commands=new a.Wreqr.Commands,this.channelName=b};return b.extend(d.prototype,{reset:function(){return this.vent.off(),this.vent.stopListening(),this.reqres.removeAllHandlers(),this.commands.removeAllHandlers(),this},connectEvents:function(a,b){return this._connect("vent",a,b),this},connectCommands:function(a,b){return this._connect("commands",a,b),this},connectRequests:function(a,b){return this._connect("reqres",a,b),this},_connect:function(a,c,d){if(c){d=d||this;var e="vent"===a?"on":"setHandler";b.each(c,function(c,f){this[a][e](f,b.bind(c,d))},this)}}}),d}(d),d.radio=function(a,b){var c=function(){this._channels={},this.vent={},this.commands={},this.reqres={},this._proxyMethods()};b.extend(c.prototype,{channel:function(a){if(!a)throw new Error("Channel must receive a name");return this._getChannel(a)},_getChannel:function(b){var c=this._channels[b];return c||(c=new a.Channel(b),this._channels[b]=c),c},_proxyMethods:function(){b.each(["vent","commands","reqres"],function(a){b.each(d[a],function(b){this[a][b]=e(this,a,b)},this)},this)}});var d={vent:["on","off","trigger","once","stopListening","listenTo","listenToOnce"],commands:["execute","setHandler","setHandlers","removeHandler","removeAllHandlers"],reqres:["request","setHandler","setHandlers","removeHandler","removeAllHandlers"]},e=function(a,c,d){return function(e){var f=a._getChannel(e)[c];return f[d].apply(f,b.rest(arguments))}};return new c}(d,b),a.Wreqr}(b,c);var d=a.Marionette,e=a.Mn,f=b.Marionette={};f.VERSION="2.4.5",f.noConflict=function(){return a.Marionette=d,a.Mn=e,this},b.Marionette=f,f.Deferred=b.$.Deferred,f.extend=b.Model.extend,f.isNodeAttached=function(a){return b.$.contains(document.documentElement,a)},f.mergeOptions=function(a,b){a&&c.extend(this,c.pick(a,b))},f.getOption=function(a,b){return a&&b?a.options&&void 0!==a.options[b]?a.options[b]:a[b]:void 0},f.proxyGetOption=function(a){return f.getOption(this,a)},f._getValue=function(a,b,d){return c.isFunction(a)&&(a=d?a.apply(b,d):a.call(b)),a},f.normalizeMethods=function(a){return c.reduce(a,function(a,b,d){return c.isFunction(b)||(b=this[b]),b&&(a[d]=b),a},{},this)},f.normalizeUIString=function(a,b){return a.replace(/@ui\.[a-zA-Z-_$0-9]*/g,function(a){return b[a.slice(4)]})},f.normalizeUIKeys=function(a,b){return c.reduce(a,function(a,c,d){var e=f.normalizeUIString(d,b);return a[e]=c,a},{})},f.normalizeUIValues=function(a,b,d){return c.each(a,function(e,g){c.isString(e)?a[g]=f.normalizeUIString(e,b):c.isObject(e)&&c.isArray(d)&&(c.extend(e,f.normalizeUIValues(c.pick(e,d),b)),c.each(d,function(a){var d=e[a];c.isString(d)&&(e[a]=f.normalizeUIString(d,b))}))}),a},f.actAsCollection=function(a,b){var d=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck"];c.each(d,function(d){a[d]=function(){var a=c.values(c.result(this,b)),e=[a].concat(c.toArray(arguments));return c[d].apply(c,e)}})};var g=f.deprecate=function(a,b){c.isObject(a)&&(a=a.prev+" is going to be removed in the future. Please use "+a.next+" instead."+(a.url?" See: "+a.url:"")),void 0!==b&&b||g._cache[a]||(g._warn("Deprecation warning: "+a),g._cache[a]=!0)};g._console="undefined"!=typeof console?console:{},g._warn=function(){var a=g._console.warn||g._console.log||function(){};return a.apply(g._console,arguments)},g._cache={},f._triggerMethod=function(){function a(a,b,c){return c.toUpperCase()}var b=/(^|:)(\w)/gi;return function(d,e,f){var g=arguments.length<3;g&&(f=e,e=f[0]);var h,i="on"+e.replace(b,a),j=d[i];return c.isFunction(j)&&(h=j.apply(d,g?c.rest(f):f)),c.isFunction(d.trigger)&&(g+f.length>1?d.trigger.apply(d,g?f:[e].concat(c.drop(f,0))):d.trigger(e)),h}}(),f.triggerMethod=function(a){return f._triggerMethod(this,arguments)},f.triggerMethodOn=function(a){var b=c.isFunction(a.triggerMethod)?a.triggerMethod:f.triggerMethod;return b.apply(a,c.rest(arguments))},f.MonitorDOMRefresh=function(a){function b(){a._isShown=!0,d()}function c(){a._isRendered=!0,d()}function d(){a._isShown&&a._isRendered&&f.isNodeAttached(a.el)&&f.triggerMethodOn(a,"dom:refresh",a)}a._isDomRefreshMonitored||(a._isDomRefreshMonitored=!0,a.on({show:b,render:c}))},function(a){function b(b,d,e,f){var g=f.split(/\s+/);c.each(g,function(c){var f=b[c];if(!f)throw new a.Error('Method "'+c+'" was configured as an event handler, but does not exist.');b.listenTo(d,e,f)})}function d(a,b,c,d){a.listenTo(b,c,d)}function e(a,b,d,e){var f=e.split(/\s+/);c.each(f,function(c){var e=a[c];a.stopListening(b,d,e)})}function f(a,b,c,d){a.stopListening(b,c,d)}function g(b,d,e,f,g){if(d&&e){if(!c.isObject(e))throw new a.Error({message:"Bindings must be an object or function.",url:"marionette.functions.html#marionettebindentityevents"});e=a._getValue(e,b),c.each(e,function(a,e){c.isFunction(a)?f(b,d,e,a):g(b,d,e,a)})}}a.bindEntityEvents=function(a,c,e){g(a,c,e,d,b)},a.unbindEntityEvents=function(a,b,c){g(a,b,c,f,e)},a.proxyBindEntityEvents=function(b,c){return a.bindEntityEvents(this,b,c)},a.proxyUnbindEntityEvents=function(b,c){return a.unbindEntityEvents(this,b,c)}}(f);var h=["description","fileName","lineNumber","name","message","number"];return f.Error=f.extend.call(Error,{urlRoot:"http://marionettejs.com/docs/v"+f.VERSION+"/",constructor:function(a,b){c.isObject(a)?(b=a,a=b.message):b||(b={});var d=Error.call(this,a);c.extend(this,c.pick(d,h),c.pick(b,h)),this.captureStackTrace(),b.url&&(this.url=this.urlRoot+b.url)},captureStackTrace:function(){Error.captureStackTrace&&Error.captureStackTrace(this,f.Error)},toString:function(){return this.name+": "+this.message+(this.url?" See: "+this.url:"")}}),f.Error.extend=f.extend,f.Callbacks=function(){this._deferred=f.Deferred(),this._callbacks=[]},c.extend(f.Callbacks.prototype,{add:function(a,b){var d=c.result(this._deferred,"promise");this._callbacks.push({cb:a,ctx:b}),d.then(function(c){b&&(c.context=b),a.call(c.context,c.options)})},run:function(a,b){this._deferred.resolve({options:a,context:b})},reset:function(){var a=this._callbacks;this._deferred=f.Deferred(),this._callbacks=[],c.each(a,function(a){this.add(a.cb,a.ctx)},this)}}),f.Controller=function(a){this.options=a||{},c.isFunction(this.initialize)&&this.initialize(this.options)},f.Controller.extend=f.extend,c.extend(f.Controller.prototype,b.Events,{destroy:function(){return f._triggerMethod(this,"before:destroy",arguments),f._triggerMethod(this,"destroy",arguments),this.stopListening(),this.off(),this},triggerMethod:f.triggerMethod,mergeOptions:f.mergeOptions,getOption:f.proxyGetOption}),f.Object=function(a){this.options=c.extend({},c.result(this,"options"),a),this.initialize.apply(this,arguments)},f.Object.extend=f.extend,c.extend(f.Object.prototype,b.Events,{initialize:function(){},destroy:function(a){return a=a||{},this.triggerMethod("before:destroy",a),this.triggerMethod("destroy",a),this.stopListening(),this},triggerMethod:f.triggerMethod,mergeOptions:f.mergeOptions,getOption:f.proxyGetOption,bindEntityEvents:f.proxyBindEntityEvents,unbindEntityEvents:f.proxyUnbindEntityEvents}),f.Region=f.Object.extend({constructor:function(a){if(this.options=a||{},this.el=this.getOption("el"),this.el=this.el instanceof b.$?this.el[0]:this.el,!this.el)throw new f.Error({name:"NoElError",message:'An "el" must be specified for a region.'});this.$el=this.getEl(this.el),f.Object.call(this,a)},show:function(a,b){if(this._ensureElement()){this._ensureViewIsIntact(a),f.MonitorDOMRefresh(a);var d=b||{},e=a!==this.currentView,g=!!d.preventDestroy,h=!!d.forceShow,i=!!this.currentView,j=e&&!g,k=e||h;if(i&&this.triggerMethod("before:swapOut",this.currentView,this,b),this.currentView&&e&&delete this.currentView._parent,j?this.empty():i&&k&&this.currentView.off("destroy",this.empty,this),k){a.once("destroy",this.empty,this),a._parent=this,this._renderView(a),i&&this.triggerMethod("before:swap",a,this,b),this.triggerMethod("before:show",a,this,b),f.triggerMethodOn(a,"before:show",a,this,b),i&&this.triggerMethod("swapOut",this.currentView,this,b);var l=f.isNodeAttached(this.el),m=[],n=c.extend({triggerBeforeAttach:this.triggerBeforeAttach,triggerAttach:this.triggerAttach},d);return l&&n.triggerBeforeAttach&&(m=this._displayedViews(a),this._triggerAttach(m,"before:")),this.attachHtml(a),this.currentView=a,l&&n.triggerAttach&&(m=this._displayedViews(a),this._triggerAttach(m)),i&&this.triggerMethod("swap",a,this,b),this.triggerMethod("show",a,this,b),f.triggerMethodOn(a,"show",a,this,b),this}return this}},triggerBeforeAttach:!0,triggerAttach:!0,_triggerAttach:function(a,b){var d=(b||"")+"attach";c.each(a,function(a){f.triggerMethodOn(a,d,a,this)},this)},_displayedViews:function(a){return c.union([a],c.result(a,"_getNestedViews")||[])},_renderView:function(a){a.supportsRenderLifecycle||f.triggerMethodOn(a,"before:render",a),a.render(),a.supportsRenderLifecycle||f.triggerMethodOn(a,"render",a)},_ensureElement:function(){if(c.isObject(this.el)||(this.$el=this.getEl(this.el),this.el=this.$el[0]),!this.$el||0===this.$el.length){if(this.getOption("allowMissingEl"))return!1;throw new f.Error('An "el" '+this.$el.selector+" must exist in DOM")}return!0},_ensureViewIsIntact:function(a){if(!a)throw new f.Error({name:"ViewNotValid",message:"The view passed is undefined and therefore invalid. You must pass a view instance to show."});if(a.isDestroyed)throw new f.Error({name:"ViewDestroyedError",message:'View (cid: "'+a.cid+'") has already been destroyed and cannot be used.'})},getEl:function(a){return b.$(a,f._getValue(this.options.parentEl,this))},attachHtml:function(a){this.$el.contents().detach(),this.el.appendChild(a.el)},empty:function(a){var b=this.currentView,c=a||{},d=!!c.preventDestroy;return b?(b.off("destroy",this.empty,this),this.triggerMethod("before:empty",b),d||this._destroyView(),this.triggerMethod("empty",b),delete this.currentView,d&&this.$el.contents().detach(),this):this},_destroyView:function(){var a=this.currentView;a.isDestroyed||(a.supportsDestroyLifecycle||f.triggerMethodOn(a,"before:destroy",a),a.destroy?a.destroy():(a.remove(),a.isDestroyed=!0),a.supportsDestroyLifecycle||f.triggerMethodOn(a,"destroy",a))},attachView:function(a){return this.currentView&&delete this.currentView._parent,a._parent=this,this.currentView=a,this},hasView:function(){return!!this.currentView},reset:function(){return this.empty(),this.$el&&(this.el=this.$el.selector),delete this.$el,this}},{buildRegion:function(a,b){if(c.isString(a))return this._buildRegionFromSelector(a,b);if(a.selector||a.el||a.regionClass)return this._buildRegionFromObject(a,b);if(c.isFunction(a))return this._buildRegionFromRegionClass(a);throw new f.Error({message:"Improper region configuration type.",url:"marionette.region.html#region-configuration-types"})},_buildRegionFromSelector:function(a,b){return new b({el:a})},_buildRegionFromObject:function(a,b){var d=a.regionClass||b,e=c.omit(a,"selector","regionClass");return a.selector&&!e.el&&(e.el=a.selector),new d(e)},_buildRegionFromRegionClass:function(a){return new a}}),f.RegionManager=f.Controller.extend({constructor:function(a){this._regions={},this.length=0,f.Controller.call(this,a),this.addRegions(this.getOption("regions"))},addRegions:function(a,b){return a=f._getValue(a,this,arguments),c.reduce(a,function(a,d,e){return c.isString(d)&&(d={selector:d}),d.selector&&(d=c.defaults({},d,b)),a[e]=this.addRegion(e,d),a},{},this)},addRegion:function(a,b){var c;return c=b instanceof f.Region?b:f.Region.buildRegion(b,f.Region),this.triggerMethod("before:add:region",a,c),c._parent=this,this._store(a,c),this.triggerMethod("add:region",a,c),c},get:function(a){return this._regions[a]},getRegions:function(){return c.clone(this._regions)},removeRegion:function(a){var b=this._regions[a];return this._remove(a,b),b},removeRegions:function(){var a=this.getRegions();return c.each(this._regions,function(a,b){this._remove(b,a)},this),a},emptyRegions:function(){var a=this.getRegions();return c.invoke(a,"empty"),a},destroy:function(){return this.removeRegions(),f.Controller.prototype.destroy.apply(this,arguments)},_store:function(a,b){this._regions[a]||this.length++,this._regions[a]=b},_remove:function(a,b){this.triggerMethod("before:remove:region",a,b),b.empty(),b.stopListening(),delete b._parent,delete this._regions[a],this.length--,this.triggerMethod("remove:region",a,b)}}),f.actAsCollection(f.RegionManager.prototype,"_regions"),f.TemplateCache=function(a){this.templateId=a},c.extend(f.TemplateCache,{templateCaches:{},get:function(a,b){var c=this.templateCaches[a];return c||(c=new f.TemplateCache(a),this.templateCaches[a]=c),c.load(b)},clear:function(){var a,b=c.toArray(arguments),d=b.length;if(d>0)for(a=0;d>a;a++)delete this.templateCaches[b[a]];else this.templateCaches={}}}),c.extend(f.TemplateCache.prototype,{load:function(a){if(this.compiledTemplate)return this.compiledTemplate;var b=this.loadTemplate(this.templateId,a);return this.compiledTemplate=this.compileTemplate(b,a),this.compiledTemplate},loadTemplate:function(a,c){var d=b.$(a);if(!d.length)throw new f.Error({name:"NoTemplateError",message:'Could not find template: "'+a+'"'});return d.html()},compileTemplate:function(a,b){return c.template(a,b)}}),f.Renderer={render:function(a,b){if(!a)throw new f.Error({name:"TemplateNotFoundError",message:"Cannot render the template since its false, null or undefined."});var d=c.isFunction(a)?a:f.TemplateCache.get(a);return d(b)}},f.View=b.View.extend({isDestroyed:!1,supportsRenderLifecycle:!0,supportsDestroyLifecycle:!0,constructor:function(a){this.render=c.bind(this.render,this),a=f._getValue(a,this),this.options=c.extend({},c.result(this,"options"),a),this._behaviors=f.Behaviors(this),b.View.call(this,this.options),f.MonitorDOMRefresh(this)},getTemplate:function(){return this.getOption("template")},serializeModel:function(a){return a.toJSON.apply(a,c.rest(arguments))},mixinTemplateHelpers:function(a){a=a||{};var b=this.getOption("templateHelpers");return b=f._getValue(b,this),c.extend(a,b)},normalizeUIKeys:function(a){var b=c.result(this,"_uiBindings");return f.normalizeUIKeys(a,b||c.result(this,"ui"))},normalizeUIValues:function(a,b){var d=c.result(this,"ui"),e=c.result(this,"_uiBindings");return f.normalizeUIValues(a,e||d,b)},configureTriggers:function(){if(this.triggers){var a=this.normalizeUIKeys(c.result(this,"triggers"));return c.reduce(a,function(a,b,c){return a[c]=this._buildViewTrigger(b),a},{},this)}},delegateEvents:function(a){return this._delegateDOMEvents(a),this.bindEntityEvents(this.model,this.getOption("modelEvents")),this.bindEntityEvents(this.collection,this.getOption("collectionEvents")),c.each(this._behaviors,function(a){a.bindEntityEvents(this.model,a.getOption("modelEvents")),a.bindEntityEvents(this.collection,a.getOption("collectionEvents"))},this),this},_delegateDOMEvents:function(a){var d=f._getValue(a||this.events,this);d=this.normalizeUIKeys(d),c.isUndefined(a)&&(this.events=d);var e={},g=c.result(this,"behaviorEvents")||{},h=this.configureTriggers(),i=c.result(this,"behaviorTriggers")||{};c.extend(e,g,d,h,i),b.View.prototype.delegateEvents.call(this,e)},undelegateEvents:function(){return b.View.prototype.undelegateEvents.apply(this,arguments),this.unbindEntityEvents(this.model,this.getOption("modelEvents")),this.unbindEntityEvents(this.collection,this.getOption("collectionEvents")),c.each(this._behaviors,function(a){a.unbindEntityEvents(this.model,a.getOption("modelEvents")),a.unbindEntityEvents(this.collection,a.getOption("collectionEvents"))},this),this},_ensureViewIsIntact:function(){if(this.isDestroyed)throw new f.Error({name:"ViewDestroyedError",message:'View (cid: "'+this.cid+'") has already been destroyed and cannot be used.'})},destroy:function(){if(this.isDestroyed)return this;var a=c.toArray(arguments);return this.triggerMethod.apply(this,["before:destroy"].concat(a)),this.isDestroyed=!0,this.triggerMethod.apply(this,["destroy"].concat(a)),this.unbindUIElements(),this.isRendered=!1,this.remove(),c.invoke(this._behaviors,"destroy",a),this},bindUIElements:function(){this._bindUIElements(),c.invoke(this._behaviors,this._bindUIElements)},_bindUIElements:function(){if(this.ui){this._uiBindings||(this._uiBindings=this.ui);var a=c.result(this,"_uiBindings");this.ui={},c.each(a,function(a,b){this.ui[b]=this.$(a)},this)}},unbindUIElements:function(){this._unbindUIElements(),c.invoke(this._behaviors,this._unbindUIElements)},_unbindUIElements:function(){this.ui&&this._uiBindings&&(c.each(this.ui,function(a,b){delete this.ui[b]},this),this.ui=this._uiBindings,delete this._uiBindings)},_buildViewTrigger:function(a){var b=c.defaults({},a,{preventDefault:!0,stopPropagation:!0}),d=c.isObject(a)?b.event:a;return function(a){a&&(a.preventDefault&&b.preventDefault&&a.preventDefault(),a.stopPropagation&&b.stopPropagation&&a.stopPropagation());var c={view:this,model:this.model,collection:this.collection};this.triggerMethod(d,c)}},setElement:function(){var a=b.View.prototype.setElement.apply(this,arguments);return c.invoke(this._behaviors,"proxyViewProperties",this),a},triggerMethod:function(){var a=f._triggerMethod(this,arguments);return this._triggerEventOnBehaviors(arguments),this._triggerEventOnParentLayout(arguments[0],c.rest(arguments)),a},_triggerEventOnBehaviors:function(a){for(var b=f._triggerMethod,c=this._behaviors,d=0,e=c&&c.length;e>d;d++)b(c[d],a)},_triggerEventOnParentLayout:function(a,b){var d=this._parentLayoutView();if(d){var e=f.getOption(d,"childViewEventPrefix"),g=e+":"+a,h=[this].concat(b);f._triggerMethod(d,g,h);var i=f.getOption(d,"childEvents");i=f._getValue(i,d);var j=d.normalizeMethods(i);j&&c.isFunction(j[a])&&j[a].apply(d,h)}},_getImmediateChildren:function(){return[]},_getNestedViews:function(){var a=this._getImmediateChildren();return a.length?c.reduce(a,function(a,b){return b._getNestedViews?a.concat(b._getNestedViews()):a},a):a},_parentLayoutView:function(){for(var a=this._parent;a;){if(a instanceof f.LayoutView)return a;a=a._parent}},normalizeMethods:f.normalizeMethods,mergeOptions:f.mergeOptions,getOption:f.proxyGetOption,bindEntityEvents:f.proxyBindEntityEvents,unbindEntityEvents:f.proxyUnbindEntityEvents}),f.ItemView=f.View.extend({constructor:function(){f.View.apply(this,arguments)},serializeData:function(){if(!this.model&&!this.collection)return{};var a=[this.model||this.collection];return arguments.length&&a.push.apply(a,arguments),this.model?this.serializeModel.apply(this,a):{items:this.serializeCollection.apply(this,a)}},serializeCollection:function(a){return a.toJSON.apply(a,c.rest(arguments))},render:function(){return this._ensureViewIsIntact(),this.triggerMethod("before:render",this),this._renderTemplate(),this.isRendered=!0,this.bindUIElements(),this.triggerMethod("render",this),this},_renderTemplate:function(){var a=this.getTemplate();if(a!==!1){if(!a)throw new f.Error({name:"UndefinedTemplateError",message:"Cannot render the template since it is null or undefined."});var b=this.mixinTemplateHelpers(this.serializeData()),c=f.Renderer.render(a,b,this);return this.attachElContent(c),this}},attachElContent:function(a){return this.$el.html(a),this}}),f.CollectionView=f.View.extend({childViewEventPrefix:"childview",sort:!0,constructor:function(a){this.once("render",this._initialEvents),this._initChildViewStorage(),f.View.apply(this,arguments),this.on({"before:show":this._onBeforeShowCalled,show:this._onShowCalled,"before:attach":this._onBeforeAttachCalled,attach:this._onAttachCalled}),this.initRenderBuffer()},initRenderBuffer:function(){this._bufferedChildren=[]},startBuffering:function(){this.initRenderBuffer(),this.isBuffering=!0},endBuffering:function(){var a,b=this._isShown&&f.isNodeAttached(this.el);this.isBuffering=!1,this._isShown&&this._triggerMethodMany(this._bufferedChildren,this,"before:show"),b&&this._triggerBeforeAttach&&(a=this._getNestedViews(),this._triggerMethodMany(a,this,"before:attach")),this.attachBuffer(this,this._createBuffer()),b&&this._triggerAttach&&(a=this._getNestedViews(),this._triggerMethodMany(a,this,"attach")),this._isShown&&this._triggerMethodMany(this._bufferedChildren,this,"show"),this.initRenderBuffer()},_triggerMethodMany:function(a,b,d){var e=c.drop(arguments,3);c.each(a,function(a){f.triggerMethodOn.apply(a,[a,d,a,b].concat(e))})},_initialEvents:function(){this.collection&&(this.listenTo(this.collection,"add",this._onCollectionAdd),this.listenTo(this.collection,"remove",this._onCollectionRemove),this.listenTo(this.collection,"reset",this.render),this.getOption("sort")&&this.listenTo(this.collection,"sort",this._sortViews))},_onCollectionAdd:function(a,b,d){var e=void 0!==d.at&&(d.index||b.indexOf(a));if((this.getOption("filter")||e===!1)&&(e=c.indexOf(this._filteredSortedModels(e),a)),this._shouldAddChild(a,e)){this.destroyEmptyView();var f=this.getChildView(a);this.addChild(a,f,e)}},_onCollectionRemove:function(a){var b=this.children.findByModel(a);this.removeChildView(b),this.checkEmpty()},_onBeforeShowCalled:function(){this._triggerBeforeAttach=this._triggerAttach=!1,this.children.each(function(a){f.triggerMethodOn(a,"before:show",a)})},_onShowCalled:function(){this.children.each(function(a){f.triggerMethodOn(a,"show",a)})},_onBeforeAttachCalled:function(){this._triggerBeforeAttach=!0},_onAttachCalled:function(){this._triggerAttach=!0},render:function(){return this._ensureViewIsIntact(),this.triggerMethod("before:render",this),this._renderChildren(),this.isRendered=!0,this.triggerMethod("render",this),this},reorder:function(){var a=this.children,b=this._filteredSortedModels(),d=c.some(b,function(b){return!a.findByModel(b)});if(d)this.render();else{var e=c.map(b,function(b,c){var d=a.findByModel(b);return d._index=c,d.el}),f=a.filter(function(a){return!c.contains(e,a.el)});this.triggerMethod("before:reorder"),this._appendReorderedChildren(e),c.each(f,this.removeChildView,this),this.checkEmpty(),this.triggerMethod("reorder")}},resortView:function(){f.getOption(this,"reorderOnSort")?this.reorder():this.render()},_sortViews:function(){var a=this._filteredSortedModels(),b=c.find(a,function(a,b){var c=this.children.findByModel(a);return!c||c._index!==b},this);b&&this.resortView()},_emptyViewIndex:-1,_appendReorderedChildren:function(a){this.$el.append(a)},_renderChildren:function(){this.destroyEmptyView(),this.destroyChildren({checkEmpty:!1}),this.isEmpty(this.collection)?this.showEmptyView():(this.triggerMethod("before:render:collection",this),this.startBuffering(),this.showCollection(),this.endBuffering(),this.triggerMethod("render:collection",this),this.children.isEmpty()&&this.getOption("filter")&&this.showEmptyView())},showCollection:function(){var a,b=this._filteredSortedModels();c.each(b,function(b,c){a=this.getChildView(b),this.addChild(b,a,c)},this)},_filteredSortedModels:function(a){var b=this.getViewComparator(),d=this.collection.models;if(a=Math.min(Math.max(a,0),d.length-1),b){var e;a&&(e=d[a],d=d.slice(0,a).concat(d.slice(a+1))),d=this._sortModelsBy(d,b),e&&d.splice(a,0,e)}return this.getOption("filter")&&(d=c.filter(d,function(a,b){return this._shouldAddChild(a,b)},this)),d},_sortModelsBy:function(a,b){return"string"==typeof b?c.sortBy(a,function(a){return a.get(b)},this):1===b.length?c.sortBy(a,b,this):a.sort(c.bind(b,this))},showEmptyView:function(){var a=this.getEmptyView();if(a&&!this._showingEmptyView){this.triggerMethod("before:render:empty"),this._showingEmptyView=!0;var c=new b.Model;this.addEmptyView(c,a),this.triggerMethod("render:empty")}},destroyEmptyView:function(){this._showingEmptyView&&(this.triggerMethod("before:remove:empty"),this.destroyChildren(),delete this._showingEmptyView,this.triggerMethod("remove:empty"))},getEmptyView:function(){return this.getOption("emptyView")},addEmptyView:function(a,b){var d,e=this._isShown&&!this.isBuffering&&f.isNodeAttached(this.el),g=this.getOption("emptyViewOptions")||this.getOption("childViewOptions");c.isFunction(g)&&(g=g.call(this,a,this._emptyViewIndex));var h=this.buildChildView(a,b,g);h._parent=this,this.proxyChildEvents(h),h.once("render",function(){this._isShown&&f.triggerMethodOn(h,"before:show",h),e&&this._triggerBeforeAttach&&(d=this._getViewAndNested(h),this._triggerMethodMany(d,this,"before:attach"))},this),this.children.add(h),this.renderChildView(h,this._emptyViewIndex),e&&this._triggerAttach&&(d=this._getViewAndNested(h),this._triggerMethodMany(d,this,"attach")),this._isShown&&f.triggerMethodOn(h,"show",h)},getChildView:function(a){var b=this.getOption("childView");if(!b)throw new f.Error({name:"NoChildViewError",message:'A "childView" must be specified'});return b},addChild:function(a,b,c){var d=this.getOption("childViewOptions");d=f._getValue(d,this,[a,c]);var e=this.buildChildView(a,b,d);return this._updateIndices(e,!0,c),this.triggerMethod("before:add:child",e),this._addChildView(e,c),this.triggerMethod("add:child",e),e._parent=this,e},_updateIndices:function(a,b,c){this.getOption("sort")&&(b&&(a._index=c),this.children.each(function(c){c._index>=a._index&&(c._index+=b?1:-1)}))},_addChildView:function(a,b){var c,d=this._isShown&&!this.isBuffering&&f.isNodeAttached(this.el);this.proxyChildEvents(a),a.once("render",function(){this._isShown&&!this.isBuffering&&f.triggerMethodOn(a,"before:show",a),d&&this._triggerBeforeAttach&&(c=this._getViewAndNested(a),this._triggerMethodMany(c,this,"before:attach"))},this),this.children.add(a),this.renderChildView(a,b),d&&this._triggerAttach&&(c=this._getViewAndNested(a),this._triggerMethodMany(c,this,"attach")),this._isShown&&!this.isBuffering&&f.triggerMethodOn(a,"show",a)},renderChildView:function(a,b){return a.supportsRenderLifecycle||f.triggerMethodOn(a,"before:render",a),a.render(),a.supportsRenderLifecycle||f.triggerMethodOn(a,"render",a),this.attachHtml(this,a,b),a},buildChildView:function(a,b,d){var e=c.extend({model:a},d),g=new b(e);return f.MonitorDOMRefresh(g),g},removeChildView:function(a){return a?(this.triggerMethod("before:remove:child",a),a.supportsDestroyLifecycle||f.triggerMethodOn(a,"before:destroy",a),a.destroy?a.destroy():a.remove(),a.supportsDestroyLifecycle||f.triggerMethodOn(a,"destroy",a),delete a._parent,this.stopListening(a),this.children.remove(a),this.triggerMethod("remove:child",a),this._updateIndices(a,!1),a):a},isEmpty:function(){return!this.collection||0===this.collection.length},checkEmpty:function(){this.isEmpty(this.collection)&&this.showEmptyView()},attachBuffer:function(a,b){a.$el.append(b)},_createBuffer:function(){var a=document.createDocumentFragment();return c.each(this._bufferedChildren,function(b){a.appendChild(b.el)}),a},attachHtml:function(a,b,c){a.isBuffering?a._bufferedChildren.splice(c,0,b):a._insertBefore(b,c)||a._insertAfter(b)},_insertBefore:function(a,b){var c,d=this.getOption("sort")&&b<this.children.length-1;return d&&(c=this.children.find(function(a){return a._index===b+1})),c?(c.$el.before(a.el),!0):!1},_insertAfter:function(a){this.$el.append(a.el)},_initChildViewStorage:function(){this.children=new b.ChildViewContainer},destroy:function(){return this.isDestroyed?this:(this.triggerMethod("before:destroy:collection"),this.destroyChildren({checkEmpty:!1}),this.triggerMethod("destroy:collection"),f.View.prototype.destroy.apply(this,arguments))},destroyChildren:function(a){var b=a||{},d=!0,e=this.children.map(c.identity);return c.isUndefined(b.checkEmpty)||(d=b.checkEmpty),this.children.each(this.removeChildView,this),d&&this.checkEmpty(),e},_shouldAddChild:function(a,b){var d=this.getOption("filter");return!c.isFunction(d)||d.call(this,a,b,this.collection)},proxyChildEvents:function(a){var b=this.getOption("childViewEventPrefix");this.listenTo(a,"all",function(){var d=c.toArray(arguments),e=d[0],f=this.normalizeMethods(c.result(this,"childEvents"));
d[0]=b+":"+e,d.splice(1,0,a),"undefined"!=typeof f&&c.isFunction(f[e])&&f[e].apply(this,d.slice(1)),this.triggerMethod.apply(this,d)})},_getImmediateChildren:function(){return c.values(this.children._views)},_getViewAndNested:function(a){return[a].concat(c.result(a,"_getNestedViews")||[])},getViewComparator:function(){return this.getOption("viewComparator")}}),f.CompositeView=f.CollectionView.extend({constructor:function(){f.CollectionView.apply(this,arguments)},_initialEvents:function(){this.collection&&(this.listenTo(this.collection,"add",this._onCollectionAdd),this.listenTo(this.collection,"remove",this._onCollectionRemove),this.listenTo(this.collection,"reset",this._renderChildren),this.getOption("sort")&&this.listenTo(this.collection,"sort",this._sortViews))},getChildView:function(a){var b=this.getOption("childView")||this.constructor;return b},serializeData:function(){var a={};return this.model&&(a=c.partial(this.serializeModel,this.model).apply(this,arguments)),a},render:function(){return this._ensureViewIsIntact(),this._isRendering=!0,this.resetChildViewContainer(),this.triggerMethod("before:render",this),this._renderTemplate(),this._renderChildren(),this._isRendering=!1,this.isRendered=!0,this.triggerMethod("render",this),this},_renderChildren:function(){(this.isRendered||this._isRendering)&&f.CollectionView.prototype._renderChildren.call(this)},_renderTemplate:function(){var a={};a=this.serializeData(),a=this.mixinTemplateHelpers(a),this.triggerMethod("before:render:template");var b=this.getTemplate(),c=f.Renderer.render(b,a,this);this.attachElContent(c),this.bindUIElements(),this.triggerMethod("render:template")},attachElContent:function(a){return this.$el.html(a),this},attachBuffer:function(a,b){var c=this.getChildViewContainer(a);c.append(b)},_insertAfter:function(a){var b=this.getChildViewContainer(this,a);b.append(a.el)},_appendReorderedChildren:function(a){var b=this.getChildViewContainer(this);b.append(a)},getChildViewContainer:function(a,b){if(a.$childViewContainer)return a.$childViewContainer;var c,d=f.getOption(a,"childViewContainer");if(d){var e=f._getValue(d,a);if(c="@"===e.charAt(0)&&a.ui?a.ui[e.substr(4)]:a.$(e),c.length<=0)throw new f.Error({name:"ChildViewContainerMissingError",message:'The specified "childViewContainer" was not found: '+a.childViewContainer})}else c=a.$el;return a.$childViewContainer=c,c},resetChildViewContainer:function(){this.$childViewContainer&&(this.$childViewContainer=void 0)}}),f.LayoutView=f.ItemView.extend({regionClass:f.Region,options:{destroyImmediate:!1},childViewEventPrefix:"childview",constructor:function(a){a=a||{},this._firstRender=!0,this._initializeRegions(a),f.ItemView.call(this,a)},render:function(){return this._ensureViewIsIntact(),this._firstRender?this._firstRender=!1:this._reInitializeRegions(),f.ItemView.prototype.render.apply(this,arguments)},destroy:function(){return this.isDestroyed?this:(this.getOption("destroyImmediate")===!0&&this.$el.remove(),this.regionManager.destroy(),f.ItemView.prototype.destroy.apply(this,arguments))},showChildView:function(a,b,d){var e=this.getRegion(a);return e.show.apply(e,c.rest(arguments))},getChildView:function(a){return this.getRegion(a).currentView},addRegion:function(a,b){var c={};return c[a]=b,this._buildRegions(c)[a]},addRegions:function(a){return this.regions=c.extend({},this.regions,a),this._buildRegions(a)},removeRegion:function(a){return delete this.regions[a],this.regionManager.removeRegion(a)},getRegion:function(a){return this.regionManager.get(a)},getRegions:function(){return this.regionManager.getRegions()},_buildRegions:function(a){var b={regionClass:this.getOption("regionClass"),parentEl:c.partial(c.result,this,"el")};return this.regionManager.addRegions(a,b)},_initializeRegions:function(a){var b;this._initRegionManager(),b=f._getValue(this.regions,this,[a])||{};var d=this.getOption.call(a,"regions");d=f._getValue(d,this,[a]),c.extend(b,d),b=this.normalizeUIValues(b,["selector","el"]),this.addRegions(b)},_reInitializeRegions:function(){this.regionManager.invoke("reset")},getRegionManager:function(){return new f.RegionManager},_initRegionManager:function(){this.regionManager=this.getRegionManager(),this.regionManager._parent=this,this.listenTo(this.regionManager,"before:add:region",function(a){this.triggerMethod("before:add:region",a)}),this.listenTo(this.regionManager,"add:region",function(a,b){this[a]=b,this.triggerMethod("add:region",a,b)}),this.listenTo(this.regionManager,"before:remove:region",function(a){this.triggerMethod("before:remove:region",a)}),this.listenTo(this.regionManager,"remove:region",function(a,b){delete this[a],this.triggerMethod("remove:region",a,b)})},_getImmediateChildren:function(){return c.chain(this.regionManager.getRegions()).pluck("currentView").compact().value()}}),f.Behavior=f.Object.extend({constructor:function(a,b){this.view=b,this.defaults=c.result(this,"defaults")||{},this.options=c.extend({},this.defaults,a),this.ui=c.extend({},c.result(b,"ui"),c.result(this,"ui")),f.Object.apply(this,arguments)},$:function(){return this.view.$.apply(this.view,arguments)},destroy:function(){return this.stopListening(),this},proxyViewProperties:function(a){this.$el=a.$el,this.el=a.el}}),f.Behaviors=function(a,b){function c(a,d){return b.isObject(a.behaviors)?(d=c.parseBehaviors(a,d||b.result(a,"behaviors")),c.wrap(a,d,b.keys(g)),d):{}}function d(a,b){this._view=a,this._behaviors=b,this._triggers={}}function e(a){return a._uiBindings||a.ui}var f=/^(\S+)\s*(.*)$/,g={behaviorTriggers:function(a,b){var c=new d(this,b);return c.buildBehaviorTriggers()},behaviorEvents:function(c,d){var g={};return b.each(d,function(c,d){var h={},i=b.clone(b.result(c,"events"))||{};i=a.normalizeUIKeys(i,e(c));var j=0;b.each(i,function(a,e){var g=e.match(f),i=g[1]+"."+[this.cid,d,j++," "].join(""),k=g[2],l=i+k,m=b.isFunction(a)?a:c[a];m&&(h[l]=b.bind(m,c))},this),g=b.extend(g,h)},this),g}};return b.extend(c,{behaviorsLookup:function(){throw new a.Error({message:"You must define where your behaviors are stored.",url:"marionette.behaviors.html#behaviorslookup"})},getBehaviorClass:function(b,d){return b.behaviorClass?b.behaviorClass:a._getValue(c.behaviorsLookup,this,[b,d])[d]},parseBehaviors:function(a,d){return b.chain(d).map(function(d,e){var f=c.getBehaviorClass(d,e),g=new f(d,a),h=c.parseBehaviors(a,b.result(g,"behaviors"));return[g].concat(h)}).flatten().value()},wrap:function(a,c,d){b.each(d,function(d){a[d]=b.partial(g[d],a[d],c)})}}),b.extend(d.prototype,{buildBehaviorTriggers:function(){return b.each(this._behaviors,this._buildTriggerHandlersForBehavior,this),this._triggers},_buildTriggerHandlersForBehavior:function(c,d){var f=b.clone(b.result(c,"triggers"))||{};f=a.normalizeUIKeys(f,e(c)),b.each(f,b.bind(this._setHandlerForBehavior,this,c,d))},_setHandlerForBehavior:function(a,b,c,d){var e=d.replace(/^\S+/,function(a){return a+".behaviortriggers"+b});this._triggers[e]=this._view._buildViewTrigger(c)}}),c}(f,c),f.AppRouter=b.Router.extend({constructor:function(a){this.options=a||{},b.Router.apply(this,arguments);var c=this.getOption("appRoutes"),d=this._getController();this.processAppRoutes(d,c),this.on("route",this._processOnRoute,this)},appRoute:function(a,b){var c=this._getController();this._addAppRoute(c,a,b)},_processOnRoute:function(a,b){if(c.isFunction(this.onRoute)){var d=c.invert(this.getOption("appRoutes"))[a];this.onRoute(a,d,b)}},processAppRoutes:function(a,b){if(b){var d=c.keys(b).reverse();c.each(d,function(c){this._addAppRoute(a,c,b[c])},this)}},_getController:function(){return this.getOption("controller")},_addAppRoute:function(a,b,d){var e=a[d];if(!e)throw new f.Error('Method "'+d+'" was not found on the controller');this.route(b,d,c.bind(e,a))},mergeOptions:f.mergeOptions,getOption:f.proxyGetOption,triggerMethod:f.triggerMethod,bindEntityEvents:f.proxyBindEntityEvents,unbindEntityEvents:f.proxyUnbindEntityEvents}),f.Application=f.Object.extend({constructor:function(a){this._initializeRegions(a),this._initCallbacks=new f.Callbacks,this.submodules={},c.extend(this,a),this._initChannel(),f.Object.apply(this,arguments)},execute:function(){this.commands.execute.apply(this.commands,arguments)},request:function(){return this.reqres.request.apply(this.reqres,arguments)},addInitializer:function(a){this._initCallbacks.add(a)},start:function(a){this.triggerMethod("before:start",a),this._initCallbacks.run(a,this),this.triggerMethod("start",a)},addRegions:function(a){return this._regionManager.addRegions(a)},emptyRegions:function(){return this._regionManager.emptyRegions()},removeRegion:function(a){return this._regionManager.removeRegion(a)},getRegion:function(a){return this._regionManager.get(a)},getRegions:function(){return this._regionManager.getRegions()},module:function(a,b){var d=f.Module.getClass(b),e=c.toArray(arguments);return e.unshift(this),d.create.apply(d,e)},getRegionManager:function(){return new f.RegionManager},_initializeRegions:function(a){var b=c.isFunction(this.regions)?this.regions(a):this.regions||{};this._initRegionManager();var d=f.getOption(a,"regions");return c.isFunction(d)&&(d=d.call(this,a)),c.extend(b,d),this.addRegions(b),this},_initRegionManager:function(){this._regionManager=this.getRegionManager(),this._regionManager._parent=this,this.listenTo(this._regionManager,"before:add:region",function(){f._triggerMethod(this,"before:add:region",arguments)}),this.listenTo(this._regionManager,"add:region",function(a,b){this[a]=b,f._triggerMethod(this,"add:region",arguments)}),this.listenTo(this._regionManager,"before:remove:region",function(){f._triggerMethod(this,"before:remove:region",arguments)}),this.listenTo(this._regionManager,"remove:region",function(a){delete this[a],f._triggerMethod(this,"remove:region",arguments)})},_initChannel:function(){this.channelName=c.result(this,"channelName")||"global",this.channel=c.result(this,"channel")||b.Wreqr.radio.channel(this.channelName),this.vent=c.result(this,"vent")||this.channel.vent,this.commands=c.result(this,"commands")||this.channel.commands,this.reqres=c.result(this,"reqres")||this.channel.reqres}}),f.Module=function(a,b,d){this.moduleName=a,this.options=c.extend({},this.options,d),this.initialize=d.initialize||this.initialize,this.submodules={},this._setupInitializersAndFinalizers(),this.app=b,c.isFunction(this.initialize)&&this.initialize(a,b,this.options)},f.Module.extend=f.extend,c.extend(f.Module.prototype,b.Events,{startWithParent:!0,initialize:function(){},addInitializer:function(a){this._initializerCallbacks.add(a)},addFinalizer:function(a){this._finalizerCallbacks.add(a)},start:function(a){this._isInitialized||(c.each(this.submodules,function(b){b.startWithParent&&b.start(a)}),this.triggerMethod("before:start",a),this._initializerCallbacks.run(a,this),this._isInitialized=!0,this.triggerMethod("start",a))},stop:function(){this._isInitialized&&(this._isInitialized=!1,this.triggerMethod("before:stop"),c.invoke(this.submodules,"stop"),this._finalizerCallbacks.run(void 0,this),this._initializerCallbacks.reset(),this._finalizerCallbacks.reset(),this.triggerMethod("stop"))},addDefinition:function(a,b){this._runModuleDefinition(a,b)},_runModuleDefinition:function(a,d){if(a){var e=c.flatten([this,this.app,b,f,b.$,c,d]);a.apply(this,e)}},_setupInitializersAndFinalizers:function(){this._initializerCallbacks=new f.Callbacks,this._finalizerCallbacks=new f.Callbacks},triggerMethod:f.triggerMethod}),c.extend(f.Module,{create:function(a,b,d){var e=a,f=c.drop(arguments,3);b=b.split(".");var g=b.length,h=[];return h[g-1]=d,c.each(b,function(b,c){var g=e;e=this._getModule(g,b,a,d),this._addModuleDefinition(g,e,h[c],f)},this),e},_getModule:function(a,b,d,e,f){var g=c.extend({},e),h=this.getClass(e),i=a[b];return i||(i=new h(b,d,g),a[b]=i,a.submodules[b]=i),i},getClass:function(a){var b=f.Module;return a?a.prototype instanceof b?a:a.moduleClass||b:b},_addModuleDefinition:function(a,b,c,d){var e=this._getDefine(c),f=this._getStartWithParent(c,b);e&&b.addDefinition(e,d),this._addStartWithParent(a,b,f)},_getStartWithParent:function(a,b){var d;return c.isFunction(a)&&a.prototype instanceof f.Module?(d=b.constructor.prototype.startWithParent,c.isUndefined(d)?!0:d):c.isObject(a)?(d=a.startWithParent,c.isUndefined(d)?!0:d):!0},_getDefine:function(a){return!c.isFunction(a)||a.prototype instanceof f.Module?c.isObject(a)?a.define:null:a},_addStartWithParent:function(a,b,c){b.startWithParent=b.startWithParent&&c,b.startWithParent&&!b.startWithParentIsConfigured&&(b.startWithParentIsConfigured=!0,a.addInitializer(function(a){b.startWithParent&&b.start(a)}))}}),f});
//# sourceMappingURL=backbone.marionette.min.js.map
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports["dat"] = factory();
  else
    root["dat"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};
/******/
/******/  // The require function
/******/  function __webpack_require__(moduleId) {
/******/
/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;
/******/
/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      exports: {},
/******/      id: moduleId,
/******/      loaded: false
/******/    };
/******/
/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/    // Flag the module as loaded
/******/    module.loaded = true;
/******/
/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }
/******/
/******/
/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;
/******/
/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;
/******/
/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "";
/******/
/******/  // Load entry module and return exports
/******/  return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var _index = __webpack_require__(1);

  var _index2 = _interopRequireDefault(_index);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  module.exports = _index2.default; /**
                                     * dat-gui JavaScript Controller Library
                                     * http://code.google.com/p/dat-gui
                                     *
                                     * Copyright 2011 Data Arts Team, Google Creative Lab
                                     *
                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                     * you may not use this file except in compliance with the License.
                                     * You may obtain a copy of the License at
                                     *
                                     * http://www.apache.org/licenses/LICENSE-2.0
                                     */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _Color = __webpack_require__(2);

  var _Color2 = _interopRequireDefault(_Color);

  var _math = __webpack_require__(6);

  var _math2 = _interopRequireDefault(_math);

  var _interpret = __webpack_require__(3);

  var _interpret2 = _interopRequireDefault(_interpret);

  var _Controller = __webpack_require__(7);

  var _Controller2 = _interopRequireDefault(_Controller);

  var _BooleanController = __webpack_require__(8);

  var _BooleanController2 = _interopRequireDefault(_BooleanController);

  var _OptionController = __webpack_require__(10);

  var _OptionController2 = _interopRequireDefault(_OptionController);

  var _StringController = __webpack_require__(11);

  var _StringController2 = _interopRequireDefault(_StringController);

  var _NumberController = __webpack_require__(12);

  var _NumberController2 = _interopRequireDefault(_NumberController);

  var _NumberControllerBox = __webpack_require__(13);

  var _NumberControllerBox2 = _interopRequireDefault(_NumberControllerBox);

  var _NumberControllerSlider = __webpack_require__(14);

  var _NumberControllerSlider2 = _interopRequireDefault(_NumberControllerSlider);

  var _FunctionController = __webpack_require__(15);

  var _FunctionController2 = _interopRequireDefault(_FunctionController);

  var _ColorController = __webpack_require__(16);

  var _ColorController2 = _interopRequireDefault(_ColorController);

  var _dom = __webpack_require__(9);

  var _dom2 = _interopRequireDefault(_dom);

  var _GUI = __webpack_require__(17);

  var _GUI2 = _interopRequireDefault(_GUI);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * dat-gui JavaScript Controller Library
   * http://code.google.com/p/dat-gui
   *
   * Copyright 2011 Data Arts Team, Google Creative Lab
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   */

  exports.default = {
    color: {
      Color: _Color2.default,
      math: _math2.default,
      interpret: _interpret2.default
    },

    controllers: {
      Controller: _Controller2.default,
      BooleanController: _BooleanController2.default,
      OptionController: _OptionController2.default,
      StringController: _StringController2.default,
      NumberController: _NumberController2.default,
      NumberControllerBox: _NumberControllerBox2.default,
      NumberControllerSlider: _NumberControllerSlider2.default,
      FunctionController: _FunctionController2.default,
      ColorController: _ColorController2.default
    },

    dom: {
      dom: _dom2.default
    },

    gui: {
      GUI: _GUI2.default
    },

    GUI: _GUI2.default
  };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _interpret = __webpack_require__(3);

  var _interpret2 = _interopRequireDefault(_interpret);

  var _math = __webpack_require__(6);

  var _math2 = _interopRequireDefault(_math);

  var _toString = __webpack_require__(4);

  var _toString2 = _interopRequireDefault(_toString);

  var _common = __webpack_require__(5);

  var _common2 = _interopRequireDefault(_common);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                             * dat-gui JavaScript Controller Library
                                                                                                                                                             * http://code.google.com/p/dat-gui
                                                                                                                                                             *
                                                                                                                                                             * Copyright 2011 Data Arts Team, Google Creative Lab
                                                                                                                                                             *
                                                                                                                                                             * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                             * you may not use this file except in compliance with the License.
                                                                                                                                                             * You may obtain a copy of the License at
                                                                                                                                                             *
                                                                                                                                                             * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                             */

  var Color = function () {
    function Color() {
      _classCallCheck(this, Color);

      this.__state = _interpret2.default.apply(this, arguments);

      if (this.__state === false) {
        throw new Error('Failed to interpret color arguments');
      }

      this.__state.a = this.__state.a || 1;
    }

    Color.prototype.toString = function toString() {
      return (0, _toString2.default)(this);
    };

    Color.prototype.toOriginal = function toOriginal() {
      return this.__state.conversion.write(this);
    };

    return Color;
  }();

  function defineRGBComponent(target, component, componentHexIndex) {
    Object.defineProperty(target, component, {
      get: function get() {
        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        Color.recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];
      },

      set: function set(v) {
        if (this.__state.space !== 'RGB') {
          Color.recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;
      }
    });
  }

  function defineHSVComponent(target, component) {
    Object.defineProperty(target, component, {
      get: function get() {
        if (this.__state.space === 'HSV') {
          return this.__state[component];
        }

        Color.recalculateHSV(this);

        return this.__state[component];
      },

      set: function set(v) {
        if (this.__state.space !== 'HSV') {
          Color.recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;
      }
    });
  }

  Color.recalculateRGB = function (color, component, componentHexIndex) {
    if (color.__state.space === 'HEX') {
      color.__state[component] = _math2.default.component_from_hex(color.__state.hex, componentHexIndex);
    } else if (color.__state.space === 'HSV') {
      _common2.default.extend(color.__state, _math2.default.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
    } else {
      throw new Error('Corrupted color state');
    }
  };

  Color.recalculateHSV = function (color) {
    var result = _math2.default.rgb_to_hsv(color.r, color.g, color.b);

    _common2.default.extend(color.__state, {
      s: result.s,
      v: result.v
    });

    if (!_common2.default.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (_common2.default.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }
  };

  Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {
    get: function get() {
      return this.__state.a;
    },

    set: function set(v) {
      this.__state.a = v;
    }
  });

  Object.defineProperty(Color.prototype, 'hex', {
    get: function get() {
      if (!this.__state.space !== 'HEX') {
        this.__state.hex = _math2.default.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;
    },

    set: function set(v) {
      this.__state.space = 'HEX';
      this.__state.hex = v;
    }
  });

  exports.default = Color;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _toString = __webpack_require__(4);

  var _toString2 = _interopRequireDefault(_toString);

  var _common = __webpack_require__(5);

  var _common2 = _interopRequireDefault(_common);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * dat-gui JavaScript Controller Library
   * http://code.google.com/p/dat-gui
   *
   * Copyright 2011 Data Arts Team, Google Creative Lab
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   */

  var INTERPRETATIONS = [
  // Strings
  {
    litmus: _common2.default.isString,
    conversions: {
      THREE_CHAR_HEX: {
        read: function read(original) {
          var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
          if (test === null) {
            return false;
          }

          return {
            space: 'HEX',
            hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
          };
        },

        write: _toString2.default
      },

      SIX_CHAR_HEX: {
        read: function read(original) {
          var test = original.match(/^#([A-F0-9]{6})$/i);
          if (test === null) {
            return false;
          }

          return {
            space: 'HEX',
            hex: parseInt('0x' + test[1].toString(), 0)
          };
        },

        write: _toString2.default
      },

      CSS_RGB: {
        read: function read(original) {
          var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
          if (test === null) {
            return false;
          }

          return {
            space: 'RGB',
            r: parseFloat(test[1]),
            g: parseFloat(test[2]),
            b: parseFloat(test[3])
          };
        },

        write: _toString2.default
      },

      CSS_RGBA: {
        read: function read(original) {
          var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
          if (test === null) {
            return false;
          }

          return {
            space: 'RGB',
            r: parseFloat(test[1]),
            g: parseFloat(test[2]),
            b: parseFloat(test[3]),
            a: parseFloat(test[4])
          };
        },

        write: _toString2.default
      }
    }
  },

  // Numbers
  {
    litmus: _common2.default.isNumber,

    conversions: {

      HEX: {
        read: function read(original) {
          return {
            space: 'HEX',
            hex: original,
            conversionName: 'HEX'
          };
        },

        write: function write(color) {
          return color.hex;
        }
      }

    }

  },

  // Arrays
  {
    litmus: _common2.default.isArray,
    conversions: {
      RGB_ARRAY: {
        read: function read(original) {
          if (original.length !== 3) {
            return false;
          }

          return {
            space: 'RGB',
            r: original[0],
            g: original[1],
            b: original[2]
          };
        },

        write: function write(color) {
          return [color.r, color.g, color.b];
        }
      },

      RGBA_ARRAY: {
        read: function read(original) {
          if (original.length !== 4) return false;
          return {
            space: 'RGB',
            r: original[0],
            g: original[1],
            b: original[2],
            a: original[3]
          };
        },

        write: function write(color) {
          return [color.r, color.g, color.b, color.a];
        }
      }
    }
  },

  // Objects
  {
    litmus: _common2.default.isObject,
    conversions: {

      RGBA_OBJ: {
        read: function read(original) {
          if (_common2.default.isNumber(original.r) && _common2.default.isNumber(original.g) && _common2.default.isNumber(original.b) && _common2.default.isNumber(original.a)) {
            return {
              space: 'RGB',
              r: original.r,
              g: original.g,
              b: original.b,
              a: original.a
            };
          }
          return false;
        },

        write: function write(color) {
          return {
            r: color.r,
            g: color.g,
            b: color.b,
            a: color.a
          };
        }
      },

      RGB_OBJ: {
        read: function read(original) {
          if (_common2.default.isNumber(original.r) && _common2.default.isNumber(original.g) && _common2.default.isNumber(original.b)) {
            return {
              space: 'RGB',
              r: original.r,
              g: original.g,
              b: original.b
            };
          }
          return false;
        },

        write: function write(color) {
          return {
            r: color.r,
            g: color.g,
            b: color.b
          };
        }
      },

      HSVA_OBJ: {
        read: function read(original) {
          if (_common2.default.isNumber(original.h) && _common2.default.isNumber(original.s) && _common2.default.isNumber(original.v) && _common2.default.isNumber(original.a)) {
            return {
              space: 'HSV',
              h: original.h,
              s: original.s,
              v: original.v,
              a: original.a
            };
          }
          return false;
        },

        write: function write(color) {
          return {
            h: color.h,
            s: color.s,
            v: color.v,
            a: color.a
          };
        }
      },

      HSV_OBJ: {
        read: function read(original) {
          if (_common2.default.isNumber(original.h) && _common2.default.isNumber(original.s) && _common2.default.isNumber(original.v)) {
            return {
              space: 'HSV',
              h: original.h,
              s: original.s,
              v: original.v
            };
          }
          return false;
        },

        write: function write(color) {
          return {
            h: color.h,
            s: color.s,
            v: color.v
          };
        }
      }
    }
  }];

  var result = void 0;
  var toReturn = void 0;

  var interpret = function interpret() {
    toReturn = false;

    var original = arguments.length > 1 ? _common2.default.toArray(arguments) : arguments[0];
    _common2.default.each(INTERPRETATIONS, function (family) {
      if (family.litmus(original)) {
        _common2.default.each(family.conversions, function (conversion, conversionName) {
          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return _common2.default.BREAK;
          }
        });

        return _common2.default.BREAK;
      }
    });

    return toReturn;
  };

  exports.default = interpret;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  exports.default = function (color) {
    if (color.a === 1 || _common2.default.isUndefined(color.a)) {
      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }
      return '#' + s;
    }

    return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';
  };

  var _common = __webpack_require__(5);

  var _common2 = _interopRequireDefault(_common);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 5 */
/***/ function(module, exports) {

  'use strict';

  exports.__esModule = true;
  /**
   * dat-gui JavaScript Controller Library
   * http://code.google.com/p/dat-gui
   *
   * Copyright 2011 Data Arts Team, Google Creative Lab
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   */

  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  var Common = {
    BREAK: {},

    extend: function extend(target) {
      this.each(ARR_SLICE.call(arguments, 1), function (obj) {
        var keys = this.isObject(obj) ? Object.keys(obj) : [];
        keys.forEach(function (key) {
          if (!this.isUndefined(obj[key])) {
            target[key] = obj[key];
          }
        }.bind(this));
      }, this);

      return target;
    },

    defaults: function defaults(target) {
      this.each(ARR_SLICE.call(arguments, 1), function (obj) {
        var keys = this.isObject(obj) ? Object.keys(obj) : [];
        keys.forEach(function (key) {
          if (this.isUndefined(target[key])) {
            target[key] = obj[key];
          }
        }.bind(this));
      }, this);

      return target;
    },

    compose: function compose() {
      var toCall = ARR_SLICE.call(arguments);
      return function () {
        var args = ARR_SLICE.call(arguments);
        for (var i = toCall.length - 1; i >= 0; i--) {
          args = [toCall[i].apply(this, args)];
        }
        return args[0];
      };
    },

    each: function each(obj, itr, scope) {
      if (!obj) {
        return;
      }

      if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
        obj.forEach(itr, scope);
      } else if (obj.length === obj.length + 0) {
        // Is number but not NaN
        var key = void 0;
        var l = void 0;
        for (key = 0, l = obj.length; key < l; key++) {
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
            return;
          }
        }
      } else {
        for (var _key in obj) {
          if (itr.call(scope, obj[_key], _key) === this.BREAK) {
            return;
          }
        }
      }
    },

    defer: function defer(fnc) {
      setTimeout(fnc, 0);
    },

    // call the function immediately, but wait until threshold passes to allow it to be called again
    debounce: function debounce(func, threshold) {
      var timeout = void 0;

      return function () {
        var obj = this;
        var args = arguments;
        function delayed() {
          timeout = null;
        }

        var allowCall = !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(delayed, threshold);

        if (allowCall) {
          func.apply(obj, args);
        }
      };
    },

    toArray: function toArray(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function isUndefined(obj) {
      return obj === undefined;
    },

    isNull: function isNull(obj) {
      return obj === null;
    },

    isNaN: function (_isNaN) {
      function isNaN(_x) {
        return _isNaN.apply(this, arguments);
      }

      isNaN.toString = function () {
        return _isNaN.toString();
      };

      return isNaN;
    }(function (obj) {
      return isNaN(obj);
    }),

    isArray: Array.isArray || function (obj) {
      return obj.constructor === Array;
    },

    isObject: function isObject(obj) {
      return obj === Object(obj);
    },

    isNumber: function isNumber(obj) {
      return obj === obj + 0;
    },

    isString: function isString(obj) {
      return obj === obj + '';
    },

    isBoolean: function isBoolean(obj) {
      return obj === false || obj === true;
    },

    isFunction: function isFunction(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }

  };

  exports.default = Common;

/***/ },
/* 6 */
/***/ function(module, exports) {

  "use strict";

  exports.__esModule = true;
  /**
   * dat-gui JavaScript Controller Library
   * http://code.google.com/p/dat-gui
   *
   * Copyright 2011 Data Arts Team, Google Creative Lab
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   */

  var tmpComponent = void 0;

  var ColorMath = {
    hsv_to_rgb: function hsv_to_rgb(h, s, v) {
      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - f * s);
      var t = v * (1.0 - (1.0 - f) * s);

      var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };
    },

    rgb_to_hsv: function rgb_to_hsv(r, g, b) {
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var delta = max - min;
      var h = void 0;
      var s = void 0;

      if (max !== 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function rgb_to_hex(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function component_from_hex(hex, componentIndex) {
      return hex >> componentIndex * 8 & 0xFF;
    },

    hex_with_component: function hex_with_component(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
    }
  };

  exports.default = ColorMath;

/***/ },
/* 7 */
/***/ function(module, exports) {

  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  /**
   * dat-gui JavaScript Controller Library
   * http://code.google.com/p/dat-gui
   *
   * Copyright 2011 Data Arts Team, Google Creative Lab
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   */

  /**
   * @class An "abstract" class that represents a given property of an object.
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var Controller = function () {
    function Controller(object, property) {
      _classCallCheck(this, Controller);

      this.initialValue = object[property];

      /**
       * Those who extend this class will put their DOM elements in here.
       * @type {DOMElement}
       */
      this.domElement = document.createElement('div');

      /**
       * The object to manipulate
       * @type {Object}
       */
      this.object = object;

      /**
       * The name of the property to manipulate
       * @type {String}
       */
      this.property = property;

      /**
       * The function to be called on change.
       * @type {Function}
       * @ignore
       */
      this.__onChange = undefined;

      /**
       * The function to be called on finishing change.
       * @type {Function}
       * @ignore
       */
      this.__onFinishChange = undefined;
    }

    /**
     * Specify that a function fire every time someone changes the value with
     * this Controller.
     *
     * @param {Function} fnc This function will be called whenever the value
     * is modified via this Controller.
     * @returns {Controller} this
     */


    Controller.prototype.onChange = function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    };

    /**
     * Specify that a function fire every time someone "finishes" changing
     * the value wih this Controller. Useful for values that change
     * incrementally like numbers or strings.
     *
     * @param {Function} fnc This function will be called whenever
     * someone "finishes" changing the value via this Controller.
     * @returns {Controller} this
     */


    Controller.prototype.onFinishChange = function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    };

    /**
     * Change the value of <code>object[property]</code>
     *
     * @param {Object} newValue The new value of <code>object[property]</code>
     */


    Controller.prototype.setValue = function setValue(newValue) {
      this.object[this.property] = newValue;
      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }

      this.updateDisplay();
      return this;
    };

    /**
     * Gets the value of <code>object[property]</code>
     *
     * @returns {Object} The current value of <code>object[property]</code>
     */


    Controller.prototype.getValue = function getValue() {
      return this.object[this.property];
    };

    /**
     * Refreshes the visual display of a Controller in order to keep sync
     * with the object's current value.
     * @returns {Controller} this
     */


    Controller.prototype.updateDisplay = function updateDisplay() {
      return this;
    };

    /**
     * @returns {Boolean} true if the value has deviated from initialValue
     */


    Controller.prototype.isModified = function isModified() {
      return this.initialValue !== this.getValue();
    };

    return Controller;
  }();

  exports.default = Controller;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _Controller2 = __webpack_require__(7);

  var _Controller3 = _interopRequireDefault(_Controller2);

  var _dom = __webpack_require__(9);

  var _dom2 = _interopRequireDefault(_dom);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * dat-gui JavaScript Controller Library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://code.google.com/p/dat-gui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Copyright 2011 Data Arts Team, Google Creative Lab
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */

  /**
   * @class Provides a checkbox input to alter the boolean property of an object.
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var BooleanController = function (_Controller) {
    _inherits(BooleanController, _Controller);

    function BooleanController(object, property) {
      _classCallCheck(this, BooleanController);

      var _this2 = _possibleConstructorReturn(this, _Controller.call(this, object, property));

      var _this = _this2;
      _this2.__prev = _this2.getValue();

      _this2.__checkbox = document.createElement('input');
      _this2.__checkbox.setAttribute('type', 'checkbox');

      function onChange() {
        _this.setValue(!_this.__prev);
      }

      _dom2.default.bind(_this2.__checkbox, 'change', onChange, false);

      _this2.domElement.appendChild(_this2.__checkbox);

      // Match original value
      _this2.updateDisplay();
      return _this2;
    }

    BooleanController.prototype.setValue = function setValue(v) {
      var toReturn = _Controller.prototype.setValue.call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      this.__prev = this.getValue();
      return toReturn;
    };

    BooleanController.prototype.updateDisplay = function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');
        this.__checkbox.checked = true;
      } else {
        this.__checkbox.checked = false;
      }

      return _Controller.prototype.updateDisplay.call(this);
    };

    return BooleanController;
  }(_Controller3.default);

  exports.default = BooleanController;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _common = __webpack_require__(5);

  var _common2 = _interopRequireDefault(_common);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var EVENT_MAP = {
    HTMLEvents: ['change'],
    MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
    KeyboardEvents: ['keydown']
  }; /**
      * dat-gui JavaScript Controller Library
      * http://code.google.com/p/dat-gui
      *
      * Copyright 2011 Data Arts Team, Google Creative Lab
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      * http://www.apache.org/licenses/LICENSE-2.0
      */

  var EVENT_MAP_INV = {};
  _common2.default.each(EVENT_MAP, function (v, k) {
    _common2.default.each(v, function (e) {
      EVENT_MAP_INV[e] = k;
    });
  });

  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

  function cssValueToPixels(val) {
    if (val === '0' || _common2.default.isUndefined(val)) {
      return 0;
    }

    var match = val.match(CSS_VALUE_PIXELS);

    if (!_common2.default.isNull(match)) {
      return parseFloat(match[1]);
    }

    // TODO ...ems? %?

    return 0;
  }

  /**
   * @namespace
   * @member dat.dom
   */
  var dom = {

    /**
     *
     * @param elem
     * @param selectable
     */
    makeSelectable: function makeSelectable(elem, selectable) {
      if (elem === undefined || elem.style === undefined) return;

      elem.onselectstart = selectable ? function () {
        return false;
      } : function () {};

      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
      elem.unselectable = selectable ? 'on' : 'off';
    },

    /**
     *
     * @param elem
     * @param horizontal
     * @param vert
     */
    makeFullscreen: function makeFullscreen(elem, hor, vert) {
      var vertical = vert;
      var horizontal = hor;

      if (_common2.default.isUndefined(horizontal)) {
        horizontal = true;
      }

      if (_common2.default.isUndefined(vertical)) {
        vertical = true;
      }

      elem.style.position = 'absolute';

      if (horizontal) {
        elem.style.left = 0;
        elem.style.right = 0;
      }
      if (vertical) {
        elem.style.top = 0;
        elem.style.bottom = 0;
      }
    },

    /**
     *
     * @param elem
     * @param eventType
     * @param params
     */
    fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
      var params = pars || {};
      var className = EVENT_MAP_INV[eventType];
      if (!className) {
        throw new Error('Event type ' + eventType + ' not supported.');
      }
      var evt = document.createEvent(className);
      switch (className) {
        case 'MouseEvents':
          {
            var clientX = params.x || params.clientX || 0;
            var clientY = params.y || params.clientY || 0;
            evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0, // screen X
            0, // screen Y
            clientX, // client X
            clientY, // client Y
            false, false, false, false, 0, null);
            break;
          }
        case 'KeyboardEvents':
          {
            var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
            _common2.default.defaults(params, {
              cancelable: true,
              ctrlKey: false,
              altKey: false,
              shiftKey: false,
              metaKey: false,
              keyCode: undefined,
              charCode: undefined
            });
            init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
            break;
          }
        default:
          {
            evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
            break;
          }
      }
      _common2.default.defaults(evt, aux);
      elem.dispatchEvent(evt);
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    bind: function bind(elem, event, func, newBool) {
      var bool = newBool || false;
      if (elem.addEventListener) {
        elem.addEventListener(event, func, bool);
      } else if (elem.attachEvent) {
        elem.attachEvent('on' + event, func);
      }
      return dom;
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    unbind: function unbind(elem, event, func, newBool) {
      var bool = newBool || false;
      if (elem.removeEventListener) {
        elem.removeEventListener(event, func, bool);
      } else if (elem.detachEvent) {
        elem.detachEvent('on' + event, func);
      }
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    addClass: function addClass(elem, className) {
      if (elem.className === undefined) {
        elem.className = className;
      } else if (elem.className !== className) {
        var classes = elem.className.split(/ +/);
        if (classes.indexOf(className) === -1) {
          classes.push(className);
          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
        }
      }
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    removeClass: function removeClass(elem, className) {
      if (className) {
        if (elem.className === className) {
          elem.removeAttribute('class');
        } else {
          var classes = elem.className.split(/ +/);
          var index = classes.indexOf(className);
          if (index !== -1) {
            classes.splice(index, 1);
            elem.className = classes.join(' ');
          }
        }
      } else {
        elem.className = undefined;
      }
      return dom;
    },

    hasClass: function hasClass(elem, className) {
      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
    },

    /**
     *
     * @param elem
     */
    getWidth: function getWidth(elem) {
      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
    },

    /**
     *
     * @param elem
     */
    getHeight: function getHeight(elem) {
      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
    },

    /**
     *
     * @param el
     */
    getOffset: function getOffset(el) {
      var elem = el;
      var offset = { left: 0, top: 0 };
      if (elem.offsetParent) {
        do {
          offset.left += elem.offsetLeft;
          offset.top += elem.offsetTop;
          elem = elem.offsetParent;
        } while (elem);
      }
      return offset;
    },

    // http://stackoverflow.com/posts/2684561/revisions
    /**
     *
     * @param elem
     */
    isActive: function isActive(elem) {
      return elem === document.activeElement && (elem.type || elem.href);
    }

  };

  exports.default = dom;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _Controller2 = __webpack_require__(7);

  var _Controller3 = _interopRequireDefault(_Controller2);

  var _dom = __webpack_require__(9);

  var _dom2 = _interopRequireDefault(_dom);

  var _common = __webpack_require__(5);

  var _common2 = _interopRequireDefault(_common);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * dat-gui JavaScript Controller Library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://code.google.com/p/dat-gui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Copyright 2011 Data Arts Team, Google Creative Lab
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */

  /**
   * @class Provides a select input to alter the property of an object, using a
   * list of accepted values.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object|string[]} options A map of labels to acceptable values, or
   * a list of acceptable string values.
   *
   * @member dat.controllers
   */
  var OptionController = function (_Controller) {
    _inherits(OptionController, _Controller);

    function OptionController(object, property, opts) {
      _classCallCheck(this, OptionController);

      var _this2 = _possibleConstructorReturn(this, _Controller.call(this, object, property));

      var options = opts;

      var _this = _this2;

      /**
       * The drop down menu
       * @ignore
       */
      _this2.__select = document.createElement('select');

      if (_common2.default.isArray(options)) {
        (function () {
          var map = {};
          _common2.default.each(options, function (element) {
            map[element] = element;
          });
          options = map;
        })();
      }

      _common2.default.each(options, function (value, key) {
        var opt = document.createElement('option');
        opt.innerHTML = key;
        opt.setAttribute('value', value);
        _this.__select.appendChild(opt);
      });

      // Acknowledge original value
      _this2.updateDisplay();

      _dom2.default.bind(_this2.__select, 'change', function () {
        var desiredValue = this.options[this.selectedIndex].value;
        _this.setValue(desiredValue);
      });

      _this2.domElement.appendChild(_this2.__select);
      return _this2;
    }

    OptionController.prototype.setValue = function setValue(v) {
      var toReturn = _Controller.prototype.setValue.call(this, v);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      return toReturn;
    };

    OptionController.prototype.updateDisplay = function updateDisplay() {
      if (_dom2.default.isActive(this.__select)) return this; // prevent number from updating if user is trying to manually update
      this.__select.value = this.getValue();
      return _Controller.prototype.updateDisplay.call(this);
    };

    return OptionController;
  }(_Controller3.default);

  exports.default = OptionController;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _Controller2 = __webpack_require__(7);

  var _Controller3 = _interopRequireDefault(_Controller2);

  var _dom = __webpack_require__(9);

  var _dom2 = _interopRequireDefault(_dom);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * dat-gui JavaScript Controller Library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://code.google.com/p/dat-gui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Copyright 2011 Data Arts Team, Google Creative Lab
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */

  /**
   * @class Provides a text input to alter the string property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var StringController = function (_Controller) {
    _inherits(StringController, _Controller);

    function StringController(object, property) {
      _classCallCheck(this, StringController);

      var _this2 = _possibleConstructorReturn(this, _Controller.call(this, object, property));

      var _this = _this2;

      function onChange() {
        _this.setValue(_this.__input.value);
      }

      function onBlur() {
        if (_this.__onFinishChange) {
          _this.__onFinishChange.call(_this, _this.getValue());
        }
      }

      _this2.__input = document.createElement('input');
      _this2.__input.setAttribute('type', 'text');

      _dom2.default.bind(_this2.__input, 'keyup', onChange);
      _dom2.default.bind(_this2.__input, 'change', onChange);
      _dom2.default.bind(_this2.__input, 'blur', onBlur);
      _dom2.default.bind(_this2.__input, 'keydown', function (e) {
        if (e.keyCode === 13) {
          this.blur();
        }
      });

      _this2.updateDisplay();

      _this2.domElement.appendChild(_this2.__input);
      return _this2;
    }

    StringController.prototype.updateDisplay = function updateDisplay() {
      // Stops the caret from moving on account of:
      // keyup -> setValue -> updateDisplay
      if (!_dom2.default.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }
      return _Controller.prototype.updateDisplay.call(this);
    };

    return StringController;
  }(_Controller3.default);

  exports.default = StringController;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _Controller2 = __webpack_require__(7);

  var _Controller3 = _interopRequireDefault(_Controller2);

  var _common = __webpack_require__(5);

  var _common2 = _interopRequireDefault(_common);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * dat-gui JavaScript Controller Library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://code.google.com/p/dat-gui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Copyright 2011 Data Arts Team, Google Creative Lab
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */

  function numDecimals(x) {
    var _x = x.toString();
    if (_x.indexOf('.') > -1) {
      return _x.length - _x.indexOf('.') - 1;
    }

    return 0;
  }

  /**
   * @class Represents a given property of an object that is a number.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */

  var NumberController = function (_Controller) {
    _inherits(NumberController, _Controller);

    function NumberController(object, property, params) {
      _classCallCheck(this, NumberController);

      var _this = _possibleConstructorReturn(this, _Controller.call(this, object, property));

      var _params = params || {};

      _this.__min = _params.min;
      _this.__max = _params.max;
      _this.__step = _params.step;

      if (_common2.default.isUndefined(_this.__step)) {
        if (_this.initialValue === 0) {
          _this.__impliedStep = 1; // What are we, psychics?
        } else {
          // Hey Doug, check this out.
          _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
        }
      } else {
        _this.__impliedStep = _this.__step;
      }

      _this.__precision = numDecimals(_this.__impliedStep);
      return _this;
    }

    NumberController.prototype.setValue = function setValue(v) {
      var _v = v;

      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }

      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }

      return _Controller.prototype.setValue.call(this, _v);
    };

    /**
     * Specify a minimum value for <code>object[property]</code>.
     *
     * @param {Number} minValue The minimum value for
     * <code>object[property]</code>
     * @returns {dat.controllers.NumberController} this
     */


    NumberController.prototype.min = function min(v) {
      this.__min = v;
      return this;
    };

    /**
     * Specify a maximum value for <code>object[property]</code>.
     *
     * @param {Number} maxValue The maximum value for
     * <code>object[property]</code>
     * @returns {dat.controllers.NumberController} this
     */


    NumberController.prototype.max = function max(v) {
      this.__max = v;
      return this;
    };

    /**
     * Specify a step value that dat.controllers.NumberController
     * increments by.
     *
     * @param {Number} stepValue The step value for
     * dat.controllers.NumberController
     * @default if minimum and maximum specified increment is 1% of the
     * difference otherwise stepValue is 1
     * @returns {dat.controllers.NumberController} this
     */


    NumberController.prototype.step = function step(v) {
      this.__step = v;
      this.__impliedStep = v;
      this.__precision = numDecimals(v);
      return this;
    };

    return NumberController;
  }(_Controller3.default);

  exports.default = NumberController;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _NumberController2 = __webpack_require__(12);

  var _NumberController3 = _interopRequireDefault(_NumberController2);

  var _dom = __webpack_require__(9);

  var _dom2 = _interopRequireDefault(_dom);

  var _common = __webpack_require__(5);

  var _common2 = _interopRequireDefault(_common);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * dat-gui JavaScript Controller Library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://code.google.com/p/dat-gui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Copyright 2011 Data Arts Team, Google Creative Lab
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */

  function roundToDecimal(value, decimals) {
    var tenTo = Math.pow(10, decimals);
    return Math.round(value * tenTo) / tenTo;
  }

  /**
   * @class Represents a given property of an object that is a number and
   * provides an input element with which to manipulate it.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */

  var NumberControllerBox = function (_NumberController) {
    _inherits(NumberControllerBox, _NumberController);

    function NumberControllerBox(object, property, params) {
      _classCallCheck(this, NumberControllerBox);

      var _this2 = _possibleConstructorReturn(this, _NumberController.call(this, object, property, params));

      _this2.__truncationSuspended = false;

      var _this = _this2;

      /**
       * {Number} Previous mouse y position
       * @ignore
       */
      var prevY = void 0;

      function onChange() {
        var attempted = parseFloat(_this.__input.value);
        if (!_common2.default.isNaN(attempted)) {
          _this.setValue(attempted);
        }
      }

      function onBlur() {
        onChange();
        if (_this.__onFinishChange) {
          _this.__onFinishChange.call(_this, _this.getValue());
        }
      }

      function onMouseDrag(e) {
        document.activeElement.blur();

        var diff = prevY - e.clientY;
        _this.setValue(_this.getValue() + diff * _this.__impliedStep);

        prevY = e.clientY;
      }

      function onMouseUp() {
        _dom2.default.unbind(window, 'mousemove', onMouseDrag);
        _dom2.default.unbind(window, 'mouseup', onMouseUp);
      }

      function onMouseDown(e) {
        _dom2.default.bind(window, 'mousemove', onMouseDrag);
        _dom2.default.bind(window, 'mouseup', onMouseUp);
        prevY = e.clientY;
      }

      _this2.__input = document.createElement('input');
      _this2.__input.setAttribute('type', 'text');

      // Makes it so manually specified values are not truncated.

      _dom2.default.bind(_this2.__input, 'change', onChange);
      _dom2.default.bind(_this2.__input, 'blur', onBlur);
      _dom2.default.bind(_this2.__input, 'mousedown', onMouseDown);
      _dom2.default.bind(_this2.__input, 'keydown', function (e) {
        // When pressing entire, you can be as precise as you want.
        if (e.keyCode === 13) {
          _this.__truncationSuspended = true;
          this.blur();
          _this.__truncationSuspended = false;
        }
      });

      _this2.updateDisplay();

      _this2.domElement.appendChild(_this2.__input);
      return _this2;
    }

    NumberControllerBox.prototype.updateDisplay = function updateDisplay() {
      if (_dom2.default.isActive(this.__input)) return this; // prevent number from updating if user is trying to manually update
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return _NumberController.prototype.updateDisplay.call(this);
    };

    return NumberControllerBox;
  }(_NumberController3.default);

  exports.default = NumberControllerBox;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _NumberController2 = __webpack_require__(12);

  var _NumberController3 = _interopRequireDefault(_NumberController2);

  var _dom = __webpack_require__(9);

  var _dom2 = _interopRequireDefault(_dom);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * dat-gui JavaScript Controller Library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://code.google.com/p/dat-gui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Copyright 2011 Data Arts Team, Google Creative Lab
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */

  function map(v, i1, i2, o1, o2) {
    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
  }

  /**
   * @class Represents a given property of an object that is a number, contains
   * a minimum and maximum, and provides a slider element with which to
   * manipulate it. It should be noted that the slider element is made up of
   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
   * <code>&lt;slider&gt;</code> element.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Number} minValue Minimum allowed value
   * @param {Number} maxValue Maximum allowed value
   * @param {Number} stepValue Increment by which to change value
   *
   * @member dat.controllers
   */

  var NumberControllerSlider = function (_NumberController) {
    _inherits(NumberControllerSlider, _NumberController);

    function NumberControllerSlider(object, property, min, max, step) {
      _classCallCheck(this, NumberControllerSlider);

      var _this2 = _possibleConstructorReturn(this, _NumberController.call(this, object, property, { min: min, max: max, step: step }));

      var _this = _this2;

      _this2.__background = document.createElement('div');
      _this2.__foreground = document.createElement('div');

      _dom2.default.bind(_this2.__background, 'mousedown', onMouseDown);

      _dom2.default.addClass(_this2.__background, 'slider');
      _dom2.default.addClass(_this2.__foreground, 'slider-fg');

      function onMouseDown(e) {
        document.activeElement.blur();

        _dom2.default.bind(window, 'mousemove', onMouseDrag);
        _dom2.default.bind(window, 'mouseup', onMouseUp);

        onMouseDrag(e);
      }

      function onMouseDrag(e) {
        e.preventDefault();

        var bgRect = _this.__background.getBoundingClientRect();

        _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));

        return false;
      }

      function onMouseUp() {
        _dom2.default.unbind(window, 'mousemove', onMouseDrag);
        _dom2.default.unbind(window, 'mouseup', onMouseUp);
        if (_this.__onFinishChange) {
          _this.__onFinishChange.call(_this, _this.getValue());
        }
      }

      _this2.updateDisplay();

      _this2.__background.appendChild(_this2.__foreground);
      _this2.domElement.appendChild(_this2.__background);
      return _this2;
    }

    NumberControllerSlider.prototype.updateDisplay = function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);
      this.__foreground.style.width = pct * 100 + '%';
      return _NumberController.prototype.updateDisplay.call(this);
    };

    return NumberControllerSlider;
  }(_NumberController3.default);

  exports.default = NumberControllerSlider;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _Controller2 = __webpack_require__(7);

  var _Controller3 = _interopRequireDefault(_Controller2);

  var _dom = __webpack_require__(9);

  var _dom2 = _interopRequireDefault(_dom);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * dat-gui JavaScript Controller Library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://code.google.com/p/dat-gui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Copyright 2011 Data Arts Team, Google Creative Lab
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */

  /**
   * @class Provides a GUI interface to fire a specified method, a property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var FunctionController = function (_Controller) {
    _inherits(FunctionController, _Controller);

    function FunctionController(object, property, text) {
      _classCallCheck(this, FunctionController);

      var _this2 = _possibleConstructorReturn(this, _Controller.call(this, object, property));

      var _this = _this2;

      _this2.__button = document.createElement('div');
      _this2.__button.innerHTML = text === undefined ? 'Fire' : text;

      _dom2.default.bind(_this2.__button, 'click', function (e) {
        e.preventDefault();
        _this.fire();
        return false;
      });

      _dom2.default.addClass(_this2.__button, 'button');

      _this2.domElement.appendChild(_this2.__button);
      return _this2;
    }

    FunctionController.prototype.fire = function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }
      this.getValue().call(this.object);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    };

    return FunctionController;
  }(_Controller3.default);

  exports.default = FunctionController;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _Controller2 = __webpack_require__(7);

  var _Controller3 = _interopRequireDefault(_Controller2);

  var _dom = __webpack_require__(9);

  var _dom2 = _interopRequireDefault(_dom);

  var _Color = __webpack_require__(2);

  var _Color2 = _interopRequireDefault(_Color);

  var _interpret = __webpack_require__(3);

  var _interpret2 = _interopRequireDefault(_interpret);

  var _common = __webpack_require__(5);

  var _common2 = _interopRequireDefault(_common);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * dat-gui JavaScript Controller Library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://code.google.com/p/dat-gui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Copyright 2011 Data Arts Team, Google Creative Lab
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */

  var ColorController = function (_Controller) {
    _inherits(ColorController, _Controller);

    function ColorController(object, property) {
      _classCallCheck(this, ColorController);

      var _this2 = _possibleConstructorReturn(this, _Controller.call(this, object, property));

      _this2.__color = new _Color2.default(_this2.getValue());
      _this2.__temp = new _Color2.default(0);

      var _this = _this2;

      _this2.domElement = document.createElement('div');

      _dom2.default.makeSelectable(_this2.domElement, false);

      _this2.__selector = document.createElement('div');
      _this2.__selector.className = 'selector';

      _this2.__saturation_field = document.createElement('div');
      _this2.__saturation_field.className = 'saturation-field';

      _this2.__field_knob = document.createElement('div');
      _this2.__field_knob.className = 'field-knob';
      _this2.__field_knob_border = '2px solid ';

      _this2.__hue_knob = document.createElement('div');
      _this2.__hue_knob.className = 'hue-knob';

      _this2.__hue_field = document.createElement('div');
      _this2.__hue_field.className = 'hue-field';

      _this2.__input = document.createElement('input');
      _this2.__input.type = 'text';
      _this2.__input_textShadow = '0 1px 1px ';

      _dom2.default.bind(_this2.__input, 'keydown', function (e) {
        if (e.keyCode === 13) {
          // on enter
          onBlur.call(this);
        }
      });

      _dom2.default.bind(_this2.__input, 'blur', onBlur);

      _dom2.default.bind(_this2.__selector, 'mousedown', function () /* e */{
        _dom2.default.addClass(this, 'drag').bind(window, 'mouseup', function () /* e */{
          _dom2.default.removeClass(_this.__selector, 'drag');
        });
      });

      var valueField = document.createElement('div');

      _common2.default.extend(_this2.__selector.style, {
        width: '122px',
        height: '102px',
        padding: '3px',
        backgroundColor: '#222',
        boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
      });

      _common2.default.extend(_this2.__field_knob.style, {
        position: 'absolute',
        width: '12px',
        height: '12px',
        border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
        boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
        borderRadius: '12px',
        zIndex: 1
      });

      _common2.default.extend(_this2.__hue_knob.style, {
        position: 'absolute',
        width: '15px',
        height: '2px',
        borderRight: '4px solid #fff',
        zIndex: 1
      });

      _common2.default.extend(_this2.__saturation_field.style, {
        width: '100px',
        height: '100px',
        border: '1px solid #555',
        marginRight: '3px',
        display: 'inline-block',
        cursor: 'pointer'
      });

      _common2.default.extend(valueField.style, {
        width: '100%',
        height: '100%',
        background: 'none'
      });

      linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');

      _common2.default.extend(_this2.__hue_field.style, {
        width: '15px',
        height: '100px',
        border: '1px solid #555',
        cursor: 'ns-resize',
        position: 'absolute',
        top: '3px',
        right: '3px'
      });

      hueGradient(_this2.__hue_field);

      _common2.default.extend(_this2.__input.style, {
        outline: 'none',
        //      width: '120px',
        textAlign: 'center',
        //      padding: '4px',
        //      marginBottom: '6px',
        color: '#fff',
        border: 0,
        fontWeight: 'bold',
        textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
      });

      _dom2.default.bind(_this2.__saturation_field, 'mousedown', fieldDown);
      _dom2.default.bind(_this2.__field_knob, 'mousedown', fieldDown);

      _dom2.default.bind(_this2.__hue_field, 'mousedown', function (e) {
        setH(e);
        _dom2.default.bind(window, 'mousemove', setH);
        _dom2.default.bind(window, 'mouseup', fieldUpH);
      });

      function fieldDown(e) {
        setSV(e);
        // document.body.style.cursor = 'none';
        _dom2.default.bind(window, 'mousemove', setSV);
        _dom2.default.bind(window, 'mouseup', fieldUpSV);
      }

      function fieldUpSV() {
        _dom2.default.unbind(window, 'mousemove', setSV);
        _dom2.default.unbind(window, 'mouseup', fieldUpSV);
        // document.body.style.cursor = 'default';
        onFinish();
      }

      function onBlur() {
        var i = (0, _interpret2.default)(this.value);
        if (i !== false) {
          _this.__color.__state = i;
          _this.setValue(_this.__color.toOriginal());
        } else {
          this.value = _this.__color.toString();
        }
      }

      function fieldUpH() {
        _dom2.default.unbind(window, 'mousemove', setH);
        _dom2.default.unbind(window, 'mouseup', fieldUpH);
        onFinish();
      }

      function onFinish() {
        if (_this.__onFinishChange) {
          _this.__onFinishChange.call(_this, _this.__color.toString());
        }
      }

      _this2.__saturation_field.appendChild(valueField);
      _this2.__selector.appendChild(_this2.__field_knob);
      _this2.__selector.appendChild(_this2.__saturation_field);
      _this2.__selector.appendChild(_this2.__hue_field);
      _this2.__hue_field.appendChild(_this2.__hue_knob);

      _this2.domElement.appendChild(_this2.__input);
      _this2.domElement.appendChild(_this2.__selector);

      _this2.updateDisplay();

      function setSV(e) {
        e.preventDefault();

        var fieldRect = _this.__saturation_field.getBoundingClientRect();
        var s = (e.clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
        var v = 1 - (e.clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

        if (v > 1) {
          v = 1;
        } else if (v < 0) {
          v = 0;
        }

        if (s > 1) {
          s = 1;
        } else if (s < 0) {
          s = 0;
        }

        _this.__color.v = v;
        _this.__color.s = s;

        _this.setValue(_this.__color.toOriginal());

        return false;
      }

      function setH(e) {
        e.preventDefault();

        var fieldRect = _this.__hue_field.getBoundingClientRect();
        var h = 1 - (e.clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

        if (h > 1) {
          h = 1;
        } else if (h < 0) {
          h = 0;
        }

        _this.__color.h = h * 360;

        _this.setValue(_this.__color.toOriginal());

        return false;
      }
      return _this2;
    }

    ColorController.prototype.updateDisplay = function updateDisplay() {
      var i = (0, _interpret2.default)(this.getValue());

      if (i !== false) {
        var mismatch = false;

        // Check for mismatch on the interpreted value.

        _common2.default.each(_Color2.default.COMPONENTS, function (component) {
          if (!_common2.default.isUndefined(i[component]) && !_common2.default.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {}; // break
          }
        }, this);

        // If nothing diverges, we keep our previous values
        // for statefulness, otherwise we recalculate fresh
        if (mismatch) {
          _common2.default.extend(this.__color.__state, i);
        }
      }

      _common2.default.extend(this.__temp.__state, this.__color.__state);

      this.__temp.a = 1;

      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;
      var _flip = 255 - flip;

      _common2.default.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });

      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';

      this.__temp.s = 1;
      this.__temp.v = 1;

      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());

      _common2.default.extend(this.__input.style, {
        backgroundColor: this.__input.value = this.__color.toString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    };

    return ColorController;
  }(_Controller3.default);

  var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];

  function linearGradient(elem, x, a, b) {
    elem.style.background = '';
    _common2.default.each(vendors, function (vendor) {
      elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
    });
  }

  function hueGradient(elem) {
    elem.style.background = '';
    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  }

  exports.default = ColorController;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                     * dat-gui JavaScript Controller Library
                                                                                                                                                                                                                                                     * http://code.google.com/p/dat-gui
                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                     * Copyright 2011 Data Arts Team, Google Creative Lab
                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                     * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                     */

  var _css = __webpack_require__(18);

  var _css2 = _interopRequireDefault(_css);

  var _saveDialogue = __webpack_require__(19);

  var _saveDialogue2 = _interopRequireDefault(_saveDialogue);

  var _ControllerFactory = __webpack_require__(20);

  var _ControllerFactory2 = _interopRequireDefault(_ControllerFactory);

  var _Controller = __webpack_require__(7);

  var _Controller2 = _interopRequireDefault(_Controller);

  var _BooleanController = __webpack_require__(8);

  var _BooleanController2 = _interopRequireDefault(_BooleanController);

  var _FunctionController = __webpack_require__(15);

  var _FunctionController2 = _interopRequireDefault(_FunctionController);

  var _NumberControllerBox = __webpack_require__(13);

  var _NumberControllerBox2 = _interopRequireDefault(_NumberControllerBox);

  var _NumberControllerSlider = __webpack_require__(14);

  var _NumberControllerSlider2 = _interopRequireDefault(_NumberControllerSlider);

  var _ColorController = __webpack_require__(16);

  var _ColorController2 = _interopRequireDefault(_ColorController);

  var _requestAnimationFrame = __webpack_require__(21);

  var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

  var _CenteredDiv = __webpack_require__(22);

  var _CenteredDiv2 = _interopRequireDefault(_CenteredDiv);

  var _dom = __webpack_require__(9);

  var _dom2 = _interopRequireDefault(_dom);

  var _common = __webpack_require__(5);

  var _common2 = _interopRequireDefault(_common);

  var _style = __webpack_require__(23);

  var _style2 = _interopRequireDefault(_style);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // CSS to embed in build

  _css2.default.inject(_style2.default);

  /** Outer-most className for GUI's */
  var CSS_NAMESPACE = 'dg';

  var HIDE_KEY_CODE = 72;

  /** The only value shared between the JS and SCSS. Use caution. */
  var CLOSE_BUTTON_HEIGHT = 20;

  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

  var SUPPORTS_LOCAL_STORAGE = function () {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  }();

  var SAVE_DIALOGUE = void 0;

  /** Have we yet to create an autoPlace GUI? */
  var autoPlaceVirgin = true;

  /** Fixed position div that auto place GUI's go inside */
  var autoPlaceContainer = void 0;

  /** Are we hiding the GUI's ? */
  var hide = false;

  /** GUI's which should be hidden */
  var hideableGuis = [];

  /**
   * A lightweight controller library for JavaScript. It allows you to easily
   * manipulate variables and fire functions on the fly.
   * @class
   *
   * @member dat.gui
   *
   * @param {Object} [params]
   * @param {String} [params.name] The name of this GUI.
   * @param {Object} [params.load] JSON object representing the saved state of
   * this GUI.
   * @param {Boolean} [params.auto=true]
   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
   * @param {Boolean} [params.closed] If true, starts closed
   */
  var GUI = function GUI(pars) {
    var _this = this;

    var params = pars || {};

    /**
     * Outermost DOM Element
     * @type DOMElement
     */
    this.domElement = document.createElement('div');
    this.__ul = document.createElement('ul');
    this.domElement.appendChild(this.__ul);

    _dom2.default.addClass(this.domElement, CSS_NAMESPACE);

    /**
     * Nested GUI's by name
     * @ignore
     */
    this.__folders = {};

    this.__controllers = [];

    /**
     * List of objects I'm remembering for save, only used in top level GUI
     * @ignore
     */
    this.__rememberedObjects = [];

    /**
     * Maps the index of remembered objects to a map of controllers, only used
     * in top level GUI.
     *
     * @private
     * @ignore
     *
     * @example
     * [
     *  {
       *    propertyName: Controller,
       *    anotherPropertyName: Controller
       *  },
     *  {
       *    propertyName: Controller
       *  }
     * ]
     */
    this.__rememberedObjectIndecesToControllers = [];

    this.__listening = [];

    // Default parameters
    params = _common2.default.defaults(params, {
      autoPlace: true,
      width: GUI.DEFAULT_WIDTH
    });

    params = _common2.default.defaults(params, {
      resizable: params.autoPlace,
      hideable: params.autoPlace
    });

    if (!_common2.default.isUndefined(params.load)) {
      // Explicit preset
      if (params.preset) {
        params.load.preset = params.preset;
      }
    } else {
      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
    }

    if (_common2.default.isUndefined(params.parent) && params.hideable) {
      hideableGuis.push(this);
    }

    // Only root level GUI's are resizable.
    params.resizable = _common2.default.isUndefined(params.parent) && params.resizable;

    if (params.autoPlace && _common2.default.isUndefined(params.scrollable)) {
      params.scrollable = true;
    }
    //    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;

    // Not part of params because I don't want people passing this in via
    // constructor. Should be a 'remembered' value.
    var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';

    var saveToLocalStorage = void 0;

    Object.defineProperties(this,
    /** @lends dat.gui.GUI.prototype */
    {
      /**
       * The parent <code>GUI</code>
       * @type dat.gui.GUI
       */
      parent: {
        get: function get() {
          return params.parent;
        }
      },

      scrollable: {
        get: function get() {
          return params.scrollable;
        }
      },

      /**
       * Handles <code>GUI</code>'s element placement for you
       * @type Boolean
       */
      autoPlace: {
        get: function get() {
          return params.autoPlace;
        }
      },

      /**
       * The identifier for a set of saved values
       * @type String
       */
      preset: {
        get: function get() {
          if (_this.parent) {
            return _this.getRoot().preset;
          }

          return params.load.preset;
        },

        set: function set(v) {
          if (_this.parent) {
            _this.getRoot().preset = v;
          } else {
            params.load.preset = v;
          }
          setPresetSelectIndex(this);
          _this.revert();
        }
      },

      /**
       * The width of <code>GUI</code> element
       * @type Number
       */
      width: {
        get: function get() {
          return params.width;
        },
        set: function set(v) {
          params.width = v;
          setWidth(_this, v);
        }
      },

      /**
       * The name of <code>GUI</code>. Used for folders. i.e
       * a folder's name
       * @type String
       */
      name: {
        get: function get() {
          return params.name;
        },
        set: function set(v) {
          // TODO Check for collisions among sibling folders
          params.name = v;
          if (titleRowName) {
            titleRowName.innerHTML = params.name;
          }
        }
      },

      /**
       * Whether the <code>GUI</code> is collapsed or not
       * @type Boolean
       */
      closed: {
        get: function get() {
          return params.closed;
        },
        set: function set(v) {
          params.closed = v;
          if (params.closed) {
            _dom2.default.addClass(_this.__ul, GUI.CLASS_CLOSED);
          } else {
            _dom2.default.removeClass(_this.__ul, GUI.CLASS_CLOSED);
          }
          // For browsers that aren't going to respect the CSS transition,
          // Lets just check our height against the window height right off
          // the bat.
          this.onResize();

          if (_this.__closeButton) {
            _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
          }
        }
      },

      /**
       * Contains all presets
       * @type Object
       */
      load: {
        get: function get() {
          return params.load;
        }
      },

      /**
       * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
       * <code>remember</code>ing
       * @type Boolean
       */
      useLocalStorage: {

        get: function get() {
          return useLocalStorage;
        },
        set: function set(bool) {
          if (SUPPORTS_LOCAL_STORAGE) {
            useLocalStorage = bool;
            if (bool) {
              _dom2.default.bind(window, 'unload', saveToLocalStorage);
            } else {
              _dom2.default.unbind(window, 'unload', saveToLocalStorage);
            }
            localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
          }
        }
      }
    });

    // Are we a root level GUI?
    if (_common2.default.isUndefined(params.parent)) {
      params.closed = false;

      _dom2.default.addClass(this.domElement, GUI.CLASS_MAIN);
      _dom2.default.makeSelectable(this.domElement, false);

      // Are we supposed to be loading locally?
      if (SUPPORTS_LOCAL_STORAGE) {
        if (useLocalStorage) {
          _this.useLocalStorage = true;

          var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

          if (savedGui) {
            params.load = JSON.parse(savedGui);
          }
        }
      }

      this.__closeButton = document.createElement('div');
      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
      _dom2.default.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
      this.domElement.appendChild(this.__closeButton);

      _dom2.default.bind(this.__closeButton, 'click', function () {
        _this.closed = !_this.closed;
      });
      // Oh, you're a nested GUI!
    } else {
      if (params.closed === undefined) {
        params.closed = true;
      }

      var _titleRowName = document.createTextNode(params.name);
      _dom2.default.addClass(_titleRowName, 'controller-name');

      var titleRow = addRow(_this, _titleRowName);

      var onClickTitle = function onClickTitle(e) {
        e.preventDefault();
        _this.closed = !_this.closed;
        return false;
      };

      _dom2.default.addClass(this.__ul, GUI.CLASS_CLOSED);

      _dom2.default.addClass(titleRow, 'title');
      _dom2.default.bind(titleRow, 'click', onClickTitle);

      if (!params.closed) {
        this.closed = false;
      }
    }

    if (params.autoPlace) {
      if (_common2.default.isUndefined(params.parent)) {
        if (autoPlaceVirgin) {
          autoPlaceContainer = document.createElement('div');
          _dom2.default.addClass(autoPlaceContainer, CSS_NAMESPACE);
          _dom2.default.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
          document.body.appendChild(autoPlaceContainer);
          autoPlaceVirgin = false;
        }

        // Put it in the dom for you.
        autoPlaceContainer.appendChild(this.domElement);

        // Apply the auto styles
        _dom2.default.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
      }

      // Make it not elastic.
      if (!this.parent) {
        setWidth(_this, params.width);
      }
    }

    this.__resizeHandler = function () {
      _this.onResize();
    };

    _dom2.default.bind(window, 'resize', this.__resizeHandler);
    _dom2.default.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
    _dom2.default.bind(this.__ul, 'transitionend', this.__resizeHandler);
    _dom2.default.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
    this.onResize();

    if (params.resizable) {
      addResizeHandle(this);
    }

    saveToLocalStorage = function saveToLocalStorage() {
      if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
        localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
      }
    };

    // expose this method publicly
    this.saveToLocalStorageIfPossible = saveToLocalStorage;

    function resetWidth() {
      var root = _this.getRoot();
      root.width += 1;
      _common2.default.defer(function () {
        root.width -= 1;
      });
    }

    if (!params.parent) {
      resetWidth();
    }
  };

  GUI.toggleHide = function () {
    hide = !hide;
    _common2.default.each(hideableGuis, function (gui) {
      gui.domElement.style.display = hide ? 'none' : '';
    });
  };

  GUI.CLASS_AUTO_PLACE = 'a';
  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
  GUI.CLASS_MAIN = 'main';
  GUI.CLASS_CONTROLLER_ROW = 'cr';
  GUI.CLASS_TOO_TALL = 'taller-than-window';
  GUI.CLASS_CLOSED = 'closed';
  GUI.CLASS_CLOSE_BUTTON = 'close-button';
  GUI.CLASS_DRAG = 'drag';

  GUI.DEFAULT_WIDTH = 245;
  GUI.TEXT_CLOSED = 'Close Controls';
  GUI.TEXT_OPEN = 'Open Controls';

  GUI._keydownHandler = function (e) {
    if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
      GUI.toggleHide();
    }
  };
  _dom2.default.bind(window, 'keydown', GUI._keydownHandler, false);

  _common2.default.extend(GUI.prototype,

  /** @lends dat.gui.GUI */
  {

    /**
     * @param object
     * @param property
     * @returns {dat.controllers.Controller} The new controller that was added.
     * @instance
     */
    add: function add(object, property) {
      return _add(this, object, property, {
        factoryArgs: Array.prototype.slice.call(arguments, 2)
      });
    },

    /**
     * @param object
     * @param property
     * @returns {dat.controllers.ColorController} The new controller that was added.
     * @instance
     */
    addColor: function addColor(object, property) {
      return _add(this, object, property, {
        color: true
      });
    },

    /**
     * @param controller
     * @instance
     */
    remove: function remove(controller) {
      // TODO listening?
      this.__ul.removeChild(controller.__li);
      this.__controllers.splice(this.__controllers.indexOf(controller), 1);
      var _this = this;
      _common2.default.defer(function () {
        _this.onResize();
      });
    },

    destroy: function destroy() {
      if (this.autoPlace) {
        autoPlaceContainer.removeChild(this.domElement);
      }

      _dom2.default.unbind(window, 'keydown', GUI._keydownHandler, false);
      _dom2.default.unbind(window, 'resize', this.__resizeHandler);

      if (this.saveToLocalStorageIfPossible) {
        _dom2.default.unbind(window, 'unload', this.saveToLocalStorageIfPossible);
      }
    },

    /**
     * @param name
     * @returns {dat.gui.GUI} The new folder.
     * @throws {Error} if this GUI already has a folder by the specified
     * name
     * @instance
     */
    addFolder: function addFolder(name) {
      // We have to prevent collisions on names in order to have a key
      // by which to remember saved values
      if (this.__folders[name] !== undefined) {
        throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
      }

      var newGuiParams = { name: name, parent: this };

      // We need to pass down the autoPlace trait so that we can
      // attach event listeners to open/close folder actions to
      // ensure that a scrollbar appears if the window is too short.
      newGuiParams.autoPlace = this.autoPlace;

      // Do we have saved appearance data for this folder?
      if (this.load && // Anything loaded?
      this.load.folders && // Was my parent a dead-end?
      this.load.folders[name]) {
        // Did daddy remember me?
        // Start me closed if I was closed
        newGuiParams.closed = this.load.folders[name].closed;

        // Pass down the loaded data
        newGuiParams.load = this.load.folders[name];
      }

      var gui = new GUI(newGuiParams);
      this.__folders[name] = gui;

      var li = addRow(this, gui.domElement);
      _dom2.default.addClass(li, 'folder');
      return gui;
    },

    open: function open() {
      this.closed = false;
    },

    close: function close() {
      this.closed = true;
    },

    onResize: _common2.default.debounce(function () {
      // we debounce this function to prevent performance issues when rotating on tablet/mobile
      var root = this.getRoot();
      if (root.scrollable) {
        var top = _dom2.default.getOffset(root.__ul).top;
        var h = 0;

        _common2.default.each(root.__ul.childNodes, function (node) {
          if (!(root.autoPlace && node === root.__save_row)) {
            h += _dom2.default.getHeight(node);
          }
        });

        if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
          _dom2.default.addClass(root.domElement, GUI.CLASS_TOO_TALL);
          root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
        } else {
          _dom2.default.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
          root.__ul.style.height = 'auto';
        }
      }

      if (root.__resize_handle) {
        _common2.default.defer(function () {
          root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
        });
      }

      if (root.__closeButton) {
        root.__closeButton.style.width = root.width + 'px';
      }
    }, 200),

    /**
     * Mark objects for saving. The order of these objects cannot change as
     * the GUI grows. When remembering new objects, append them to the end
     * of the list.
     *
     * @param {Object...} objects
     * @throws {Error} if not called on a top level GUI.
     * @instance
     */
    remember: function remember() {
      if (_common2.default.isUndefined(SAVE_DIALOGUE)) {
        SAVE_DIALOGUE = new _CenteredDiv2.default();
        SAVE_DIALOGUE.domElement.innerHTML = _saveDialogue2.default;
      }

      if (this.parent) {
        throw new Error('You can only call remember on a top level GUI.');
      }

      var _this = this;

      _common2.default.each(Array.prototype.slice.call(arguments), function (object) {
        if (_this.__rememberedObjects.length === 0) {
          addSaveMenu(_this);
        }
        if (_this.__rememberedObjects.indexOf(object) === -1) {
          _this.__rememberedObjects.push(object);
        }
      });

      if (this.autoPlace) {
        // Set save row width
        setWidth(this, this.width);
      }
    },

    /**
     * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
     * @instance
     */
    getRoot: function getRoot() {
      var gui = this;
      while (gui.parent) {
        gui = gui.parent;
      }
      return gui;
    },

    /**
     * @returns {Object} a JSON object representing the current state of
     * this GUI as well as its remembered properties.
     * @instance
     */
    getSaveObject: function getSaveObject() {
      var toReturn = this.load;
      toReturn.closed = this.closed;

      // Am I remembering any values?
      if (this.__rememberedObjects.length > 0) {
        toReturn.preset = this.preset;

        if (!toReturn.remembered) {
          toReturn.remembered = {};
        }

        toReturn.remembered[this.preset] = getCurrentPreset(this);
      }

      toReturn.folders = {};
      _common2.default.each(this.__folders, function (element, key) {
        toReturn.folders[key] = element.getSaveObject();
      });

      return toReturn;
    },

    save: function save() {
      if (!this.load.remembered) {
        this.load.remembered = {};
      }

      this.load.remembered[this.preset] = getCurrentPreset(this);
      markPresetModified(this, false);
      this.saveToLocalStorageIfPossible();
    },

    saveAs: function saveAs(presetName) {
      if (!this.load.remembered) {
        // Retain default values upon first save
        this.load.remembered = {};
        this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
      }

      this.load.remembered[presetName] = getCurrentPreset(this);
      this.preset = presetName;
      addPresetOption(this, presetName, true);
      this.saveToLocalStorageIfPossible();
    },

    revert: function revert(gui) {
      _common2.default.each(this.__controllers, function (controller) {
        // Make revert work on Default.
        if (!this.getRoot().load.remembered) {
          controller.setValue(controller.initialValue);
        } else {
          recallSavedValue(gui || this.getRoot(), controller);
        }

        // fire onFinishChange callback
        if (controller.__onFinishChange) {
          controller.__onFinishChange.call(controller, controller.getValue());
        }
      }, this);

      _common2.default.each(this.__folders, function (folder) {
        folder.revert(folder);
      });

      if (!gui) {
        markPresetModified(this.getRoot(), false);
      }
    },

    listen: function listen(controller) {
      var init = this.__listening.length === 0;
      this.__listening.push(controller);
      if (init) {
        updateDisplays(this.__listening);
      }
    },

    updateDisplay: function updateDisplay() {
      _common2.default.each(this.__controllers, function (controller) {
        controller.updateDisplay();
      });
      _common2.default.each(this.__folders, function (folder) {
        folder.updateDisplay();
      });
    }
  });

  /**
   * Add a row to the end of the GUI or before another row.
   *
   * @param gui
   * @param [newDom] If specified, inserts the dom content in the new row
   * @param [liBefore] If specified, places the new row before another row
   */
  function addRow(gui, newDom, liBefore) {
    var li = document.createElement('li');
    if (newDom) {
      li.appendChild(newDom);
    }

    if (liBefore) {
      gui.__ul.insertBefore(li, liBefore);
    } else {
      gui.__ul.appendChild(li);
    }
    gui.onResize();
    return li;
  }

  function markPresetModified(gui, modified) {
    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];

    // console.log('mark', modified, opt);
    if (modified) {
      opt.innerHTML = opt.value + '*';
    } else {
      opt.innerHTML = opt.value;
    }
  }

  function augmentController(gui, li, controller) {
    controller.__li = li;
    controller.__gui = gui;

    _common2.default.extend(controller, {
      options: function options(_options) {
        if (arguments.length > 1) {
          var nextSibling = controller.__li.nextElementSibling;
          controller.remove();

          return _add(gui, controller.object, controller.property, {
            before: nextSibling,
            factoryArgs: [_common2.default.toArray(arguments)]
          });
        }

        if (_common2.default.isArray(_options) || _common2.default.isObject(_options)) {
          var _nextSibling = controller.__li.nextElementSibling;
          controller.remove();

          return _add(gui, controller.object, controller.property, {
            before: _nextSibling,
            factoryArgs: [_options]
          });
        }
      },

      name: function name(v) {
        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
        return controller;
      },

      listen: function listen() {
        controller.__gui.listen(controller);
        return controller;
      },

      remove: function remove() {
        controller.__gui.remove(controller);
        return controller;
      }
    });

    // All sliders should be accompanied by a box.
    if (controller instanceof _NumberControllerSlider2.default) {
      (function () {
        var box = new _NumberControllerBox2.default(controller.object, controller.property, { min: controller.__min, max: controller.__max, step: controller.__step });

        _common2.default.each(['updateDisplay', 'onChange', 'onFinishChange', 'step'], function (method) {
          var pc = controller[method];
          var pb = box[method];
          controller[method] = box[method] = function () {
            var args = Array.prototype.slice.call(arguments);
            pb.apply(box, args);
            return pc.apply(controller, args);
          };
        });

        _dom2.default.addClass(li, 'has-slider');
        controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
      })();
    } else if (controller instanceof _NumberControllerBox2.default) {
      var r = function r(returned) {
        // Have we defined both boundaries?
        if (_common2.default.isNumber(controller.__min) && _common2.default.isNumber(controller.__max)) {
          // Well, then lets just replace this with a slider.

          // lets remember if the old controller had a specific name or was listening
          var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
          var wasListening = controller.__gui.__listening.indexOf(controller) > -1;

          controller.remove();
          var newController = _add(gui, controller.object, controller.property, {
            before: controller.__li.nextElementSibling,
            factoryArgs: [controller.__min, controller.__max, controller.__step]
          });

          newController.name(oldName);
          if (wasListening) newController.listen();

          return newController;
        }

        return returned;
      };

      controller.min = _common2.default.compose(r, controller.min);
      controller.max = _common2.default.compose(r, controller.max);
    } else if (controller instanceof _BooleanController2.default) {
      _dom2.default.bind(li, 'click', function () {
        _dom2.default.fakeEvent(controller.__checkbox, 'click');
      });

      _dom2.default.bind(controller.__checkbox, 'click', function (e) {
        e.stopPropagation(); // Prevents double-toggle
      });
    } else if (controller instanceof _FunctionController2.default) {
      _dom2.default.bind(li, 'click', function () {
        _dom2.default.fakeEvent(controller.__button, 'click');
      });

      _dom2.default.bind(li, 'mouseover', function () {
        _dom2.default.addClass(controller.__button, 'hover');
      });

      _dom2.default.bind(li, 'mouseout', function () {
        _dom2.default.removeClass(controller.__button, 'hover');
      });
    } else if (controller instanceof _ColorController2.default) {
      _dom2.default.addClass(li, 'color');
      controller.updateDisplay = _common2.default.compose(function (val) {
        li.style.borderLeftColor = controller.__color.toString();
        return val;
      }, controller.updateDisplay);

      controller.updateDisplay();
    }

    controller.setValue = _common2.default.compose(function (val) {
      if (gui.getRoot().__preset_select && controller.isModified()) {
        markPresetModified(gui.getRoot(), true);
      }

      return val;
    }, controller.setValue);
  }

  function recallSavedValue(gui, controller) {
    // Find the topmost GUI, that's where remembered objects live.
    var root = gui.getRoot();

    // Does the object we're controlling match anything we've been told to
    // remember?
    var matchedIndex = root.__rememberedObjects.indexOf(controller.object);

    // Why yes, it does!
    if (matchedIndex !== -1) {
      // Let me fetch a map of controllers for thcommon.isObject.
      var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];

      // Ohp, I believe this is the first controller we've created for this
      // object. Lets make the map fresh.
      if (controllerMap === undefined) {
        controllerMap = {};
        root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
      }

      // Keep track of this controller
      controllerMap[controller.property] = controller;

      // Okay, now have we saved any values for this controller?
      if (root.load && root.load.remembered) {
        var presetMap = root.load.remembered;

        // Which preset are we trying to load?
        var preset = void 0;

        if (presetMap[gui.preset]) {
          preset = presetMap[gui.preset];
        } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
          // Uhh, you can have the default instead?
          preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
        } else {
          // Nada.
          return;
        }

        // Did the loaded object remember thcommon.isObject? &&  Did we remember this particular property?
        if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
          // We did remember something for this guy ...
          var value = preset[matchedIndex][controller.property];

          // And that's what it is.
          controller.initialValue = value;
          controller.setValue(value);
        }
      }
    }
  }

  function _add(gui, object, property, params) {
    if (object[property] === undefined) {
      throw new Error('Object "' + object + '" has no property "' + property + '"');
    }

    var controller = void 0;

    if (params.color) {
      controller = new _ColorController2.default(object, property);
    } else {
      var factoryArgs = [object, property].concat(params.factoryArgs);
      controller = _ControllerFactory2.default.apply(gui, factoryArgs);
    }

    if (params.before instanceof _Controller2.default) {
      params.before = params.before.__li;
    }

    recallSavedValue(gui, controller);

    _dom2.default.addClass(controller.domElement, 'c');

    var name = document.createElement('span');
    _dom2.default.addClass(name, 'property-name');
    name.innerHTML = controller.property;

    var container = document.createElement('div');
    container.appendChild(name);
    container.appendChild(controller.domElement);

    var li = addRow(gui, container, params.before);

    _dom2.default.addClass(li, GUI.CLASS_CONTROLLER_ROW);
    if (controller instanceof _ColorController2.default) {
      _dom2.default.addClass(li, 'color');
    } else {
      _dom2.default.addClass(li, _typeof(controller.getValue()));
    }

    augmentController(gui, li, controller);

    gui.__controllers.push(controller);

    return controller;
  }

  function getLocalStorageHash(gui, key) {
    // TODO how does this deal with multiple GUI's?
    return document.location.href + '.' + key;
  }

  function addPresetOption(gui, name, setSelected) {
    var opt = document.createElement('option');
    opt.innerHTML = name;
    opt.value = name;
    gui.__preset_select.appendChild(opt);
    if (setSelected) {
      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
    }
  }

  function showHideExplain(gui, explain) {
    explain.style.display = gui.useLocalStorage ? 'block' : 'none';
  }

  function addSaveMenu(gui) {
    var div = gui.__save_row = document.createElement('li');

    _dom2.default.addClass(gui.domElement, 'has-save');

    gui.__ul.insertBefore(div, gui.__ul.firstChild);

    _dom2.default.addClass(div, 'save-row');

    var gears = document.createElement('span');
    gears.innerHTML = '&nbsp;';
    _dom2.default.addClass(gears, 'button gears');

    // TODO replace with FunctionController
    var button = document.createElement('span');
    button.innerHTML = 'Save';
    _dom2.default.addClass(button, 'button');
    _dom2.default.addClass(button, 'save');

    var button2 = document.createElement('span');
    button2.innerHTML = 'New';
    _dom2.default.addClass(button2, 'button');
    _dom2.default.addClass(button2, 'save-as');

    var button3 = document.createElement('span');
    button3.innerHTML = 'Revert';
    _dom2.default.addClass(button3, 'button');
    _dom2.default.addClass(button3, 'revert');

    var select = gui.__preset_select = document.createElement('select');

    if (gui.load && gui.load.remembered) {
      _common2.default.each(gui.load.remembered, function (value, key) {
        addPresetOption(gui, key, key === gui.preset);
      });
    } else {
      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
    }

    _dom2.default.bind(select, 'change', function () {
      for (var index = 0; index < gui.__preset_select.length; index++) {
        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
      }

      gui.preset = this.value;
    });

    div.appendChild(select);
    div.appendChild(gears);
    div.appendChild(button);
    div.appendChild(button2);
    div.appendChild(button3);

    if (SUPPORTS_LOCAL_STORAGE) {
      (function () {
        var explain = document.getElementById('dg-local-explain');
        var localStorageCheckBox = document.getElementById('dg-local-storage');
        var saveLocally = document.getElementById('dg-save-locally');

        saveLocally.style.display = 'block';

        if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
          localStorageCheckBox.setAttribute('checked', 'checked');
        }

        showHideExplain(gui, explain);

        // TODO: Use a boolean controller, fool!
        _dom2.default.bind(localStorageCheckBox, 'change', function () {
          gui.useLocalStorage = !gui.useLocalStorage;
          showHideExplain(gui, explain);
        });
      })();
    }

    var newConstructorTextArea = document.getElementById('dg-new-constructor');

    _dom2.default.bind(newConstructorTextArea, 'keydown', function (e) {
      if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
        SAVE_DIALOGUE.hide();
      }
    });

    _dom2.default.bind(gears, 'click', function () {
      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
      SAVE_DIALOGUE.show();
      newConstructorTextArea.focus();
      newConstructorTextArea.select();
    });

    _dom2.default.bind(button, 'click', function () {
      gui.save();
    });

    _dom2.default.bind(button2, 'click', function () {
      var presetName = prompt('Enter a new preset name.');
      if (presetName) {
        gui.saveAs(presetName);
      }
    });

    _dom2.default.bind(button3, 'click', function () {
      gui.revert();
    });

    // div.appendChild(button2);
  }

  function addResizeHandle(gui) {
    var pmouseX = void 0;

    gui.__resize_handle = document.createElement('div');

    _common2.default.extend(gui.__resize_handle.style, {

      width: '6px',
      marginLeft: '-3px',
      height: '200px',
      cursor: 'ew-resize',
      position: 'absolute'
      // border: '1px solid blue'

    });

    function drag(e) {
      e.preventDefault();

      gui.width += pmouseX - e.clientX;
      gui.onResize();
      pmouseX = e.clientX;

      return false;
    }

    function dragStop() {
      _dom2.default.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
      _dom2.default.unbind(window, 'mousemove', drag);
      _dom2.default.unbind(window, 'mouseup', dragStop);
    }

    function dragStart(e) {
      e.preventDefault();

      pmouseX = e.clientX;

      _dom2.default.addClass(gui.__closeButton, GUI.CLASS_DRAG);
      _dom2.default.bind(window, 'mousemove', drag);
      _dom2.default.bind(window, 'mouseup', dragStop);

      return false;
    }

    _dom2.default.bind(gui.__resize_handle, 'mousedown', dragStart);
    _dom2.default.bind(gui.__closeButton, 'mousedown', dragStart);

    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
  }

  function setWidth(gui, w) {
    gui.domElement.style.width = w + 'px';
    // Auto placed save-rows are position fixed, so we have to
    // set the width manually if we want it to bleed to the edge
    if (gui.__save_row && gui.autoPlace) {
      gui.__save_row.style.width = w + 'px';
    }
    if (gui.__closeButton) {
      gui.__closeButton.style.width = w + 'px';
    }
  }

  function getCurrentPreset(gui, useInitialValues) {
    var toReturn = {};

    // For each object I'm remembering
    _common2.default.each(gui.__rememberedObjects, function (val, index) {
      var savedValues = {};

      // The controllers I've made for thcommon.isObject by property
      var controllerMap = gui.__rememberedObjectIndecesToControllers[index];

      // Remember each value for each property
      _common2.default.each(controllerMap, function (controller, property) {
        savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
      });

      // Save the values for thcommon.isObject
      toReturn[index] = savedValues;
    });

    return toReturn;
  }

  function setPresetSelectIndex(gui) {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      if (gui.__preset_select[index].value === gui.preset) {
        gui.__preset_select.selectedIndex = index;
      }
    }
  }

  function updateDisplays(controllerArray) {
    if (controllerArray.length !== 0) {
      _requestAnimationFrame2.default.call(window, function () {
        updateDisplays(controllerArray);
      });
    }

    _common2.default.each(controllerArray, function (c) {
      c.updateDisplay();
    });
  }

  module.exports = GUI;

/***/ },
/* 18 */
/***/ function(module, exports) {

  'use strict';

  /**
   * dat-gui JavaScript Controller Library
   * http://code.google.com/p/dat-gui
   *
   * Copyright 2011 Data Arts Team, Google Creative Lab
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   */

  module.exports = {
    load: function load(url, indoc) {
      var doc = indoc || document;
      var link = doc.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      doc.getElementsByTagName('head')[0].appendChild(link);
    },

    inject: function inject(css, indoc) {
      var doc = indoc || document;
      var injected = document.createElement('style');
      injected.type = 'text/css';
      injected.innerHTML = css;
      var head = doc.getElementsByTagName('head')[0];
      try {
        head.appendChild(injected);
      } catch (e) {// Unable to inject CSS, probably because of a Content Security Policy
      }
    }
  };

/***/ },
/* 19 */
/***/ function(module, exports) {

  module.exports = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _OptionController = __webpack_require__(10);

  var _OptionController2 = _interopRequireDefault(_OptionController);

  var _NumberControllerBox = __webpack_require__(13);

  var _NumberControllerBox2 = _interopRequireDefault(_NumberControllerBox);

  var _NumberControllerSlider = __webpack_require__(14);

  var _NumberControllerSlider2 = _interopRequireDefault(_NumberControllerSlider);

  var _StringController = __webpack_require__(11);

  var _StringController2 = _interopRequireDefault(_StringController);

  var _FunctionController = __webpack_require__(15);

  var _FunctionController2 = _interopRequireDefault(_FunctionController);

  var _BooleanController = __webpack_require__(8);

  var _BooleanController2 = _interopRequireDefault(_BooleanController);

  var _common = __webpack_require__(5);

  var _common2 = _interopRequireDefault(_common);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var ControllerFactory = function ControllerFactory(object, property) {
    var initialValue = object[property];

    // Providing options?
    if (_common2.default.isArray(arguments[2]) || _common2.default.isObject(arguments[2])) {
      return new _OptionController2.default(object, property, arguments[2]);
    }

    // Providing a map?
    if (_common2.default.isNumber(initialValue)) {
      // Has min and max? (slider)
      if (_common2.default.isNumber(arguments[2]) && _common2.default.isNumber(arguments[3])) {
        // has step?
        if (_common2.default.isNumber(arguments[4])) {
          return new _NumberControllerSlider2.default(object, property, arguments[2], arguments[3], arguments[4]);
        }

        return new _NumberControllerSlider2.default(object, property, arguments[2], arguments[3]);
      }

      // number box
      if (_common2.default.isNumber(arguments[4])) {
        // has step
        return new _NumberControllerBox2.default(object, property, { min: arguments[2], max: arguments[3], step: arguments[4] });
      }
      return new _NumberControllerBox2.default(object, property, { min: arguments[2], max: arguments[3] });
    }

    if (_common2.default.isString(initialValue)) {
      return new _StringController2.default(object, property);
    }

    if (_common2.default.isFunction(initialValue)) {
      return new _FunctionController2.default(object, property, '');
    }

    if (_common2.default.isBoolean(initialValue)) {
      return new _BooleanController2.default(object, property);
    }

    return null;
  }; /**
      * dat-gui JavaScript Controller Library
      * http://code.google.com/p/dat-gui
      *
      * Copyright 2011 Data Arts Team, Google Creative Lab
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      * http://www.apache.org/licenses/LICENSE-2.0
      */

  exports.default = ControllerFactory;

/***/ },
/* 21 */
/***/ function(module, exports) {

  "use strict";

  exports.__esModule = true;
  /**
   * dat-gui JavaScript Controller Library
   * http://code.google.com/p/dat-gui
   *
   * Copyright 2011 Data Arts Team, Google Creative Lab
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   */

  function requestAnimationFrame(callback) {
    setTimeout(callback, 1000 / 60);
  }

  exports.default = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  exports.__esModule = true;

  var _dom = __webpack_require__(9);

  var _dom2 = _interopRequireDefault(_dom);

  var _common = __webpack_require__(5);

  var _common2 = _interopRequireDefault(_common);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                             * dat-gui JavaScript Controller Library
                                                                                                                                                             * http://code.google.com/p/dat-gui
                                                                                                                                                             *
                                                                                                                                                             * Copyright 2011 Data Arts Team, Google Creative Lab
                                                                                                                                                             *
                                                                                                                                                             * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                             * you may not use this file except in compliance with the License.
                                                                                                                                                             * You may obtain a copy of the License at
                                                                                                                                                             *
                                                                                                                                                             * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                             */

  var CenteredDiv = function () {
    function CenteredDiv() {
      _classCallCheck(this, CenteredDiv);

      this.backgroundElement = document.createElement('div');
      _common2.default.extend(this.backgroundElement.style, {
        backgroundColor: 'rgba(0,0,0,0.8)',
        top: 0,
        left: 0,
        display: 'none',
        zIndex: '1000',
        opacity: 0,
        WebkitTransition: 'opacity 0.2s linear',
        transition: 'opacity 0.2s linear'
      });

      _dom2.default.makeFullscreen(this.backgroundElement);
      this.backgroundElement.style.position = 'fixed';

      this.domElement = document.createElement('div');
      _common2.default.extend(this.domElement.style, {
        position: 'fixed',
        display: 'none',
        zIndex: '1001',
        opacity: 0,
        WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
        transition: 'transform 0.2s ease-out, opacity 0.2s linear'
      });

      document.body.appendChild(this.backgroundElement);
      document.body.appendChild(this.domElement);

      var _this = this;
      _dom2.default.bind(this.backgroundElement, 'click', function () {
        _this.hide();
      });
    }

    CenteredDiv.prototype.show = function show() {
      var _this = this;

      this.backgroundElement.style.display = 'block';

      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      //    this.domElement.style.top = '52%';
      this.domElement.style.webkitTransform = 'scale(1.1)';

      this.layout();

      _common2.default.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    };

    /**
     * Hide centered div
     */


    CenteredDiv.prototype.hide = function hide() {
      var _this = this;

      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';

        _dom2.default.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        _dom2.default.unbind(_this.domElement, 'transitionend', hide);
        _dom2.default.unbind(_this.domElement, 'oTransitionEnd', hide);
      };

      _dom2.default.bind(this.domElement, 'webkitTransitionEnd', hide);
      _dom2.default.bind(this.domElement, 'transitionend', hide);
      _dom2.default.bind(this.domElement, 'oTransitionEnd', hide);

      this.backgroundElement.style.opacity = 0;
      //    this.domElement.style.top = '48%';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    };

    CenteredDiv.prototype.layout = function layout() {
      this.domElement.style.left = window.innerWidth / 2 - _dom2.default.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - _dom2.default.getHeight(this.domElement) / 2 + 'px';
    };

    return CenteredDiv;
  }();

  exports.default = CenteredDiv;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(24)();
  // imports


  // module
  exports.push([module.id, ".dg {\n  /** Clear list styles */\n  /* Auto-place container */\n  /* Auto-placed GUI's */\n  /* Line items that don't contain folders. */\n  /** Folder names */\n  /** Hides closed items */\n  /** Controller row */\n  /** Name-half (left) */\n  /** Controller-half (right) */\n  /** Controller placement */\n  /** Shorter number boxes when slider is present. */\n  /** Ensure the entire boolean and function row shows a hand */ }\n  .dg ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    clear: both; }\n  .dg.ac {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 0;\n    z-index: 0; }\n  .dg:not(.ac) .main {\n    /** Exclude mains in ac so that we don't hide close button */\n    overflow: hidden; }\n  .dg.main {\n    -webkit-transition: opacity 0.1s linear;\n    -o-transition: opacity 0.1s linear;\n    -moz-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear; }\n    .dg.main.taller-than-window {\n      overflow-y: auto; }\n      .dg.main.taller-than-window .close-button {\n        opacity: 1;\n        /* TODO, these are style notes */\n        margin-top: -1px;\n        border-top: 1px solid #2c2c2c; }\n    .dg.main ul.closed .close-button {\n      opacity: 1 !important; }\n    .dg.main:hover .close-button,\n    .dg.main .close-button.drag {\n      opacity: 1; }\n    .dg.main .close-button {\n      /*opacity: 0;*/\n      -webkit-transition: opacity 0.1s linear;\n      -o-transition: opacity 0.1s linear;\n      -moz-transition: opacity 0.1s linear;\n      transition: opacity 0.1s linear;\n      border: 0;\n      position: absolute;\n      line-height: 19px;\n      height: 20px;\n      /* TODO, these are style notes */\n      cursor: pointer;\n      text-align: center;\n      background-color: #000; }\n      .dg.main .close-button:hover {\n        background-color: #111; }\n  .dg.a {\n    float: right;\n    margin-right: 15px;\n    overflow-x: hidden; }\n    .dg.a.has-save > ul {\n      margin-top: 27px; }\n      .dg.a.has-save > ul.closed {\n        margin-top: 0; }\n    .dg.a .save-row {\n      position: fixed;\n      top: 0;\n      z-index: 1002; }\n  .dg li {\n    -webkit-transition: height 0.1s ease-out;\n    -o-transition: height 0.1s ease-out;\n    -moz-transition: height 0.1s ease-out;\n    transition: height 0.1s ease-out; }\n  .dg li:not(.folder) {\n    cursor: auto;\n    height: 27px;\n    line-height: 27px;\n    overflow: hidden;\n    padding: 0 4px 0 5px; }\n  .dg li.folder {\n    padding: 0;\n    border-left: 4px solid transparent; }\n  .dg li.title {\n    cursor: pointer;\n    margin-left: -4px; }\n  .dg .closed li:not(.title),\n  .dg .closed ul li,\n  .dg .closed ul li > * {\n    height: 0;\n    overflow: hidden;\n    border: 0; }\n  .dg .cr {\n    clear: both;\n    padding-left: 3px;\n    height: 27px; }\n  .dg .property-name {\n    cursor: default;\n    float: left;\n    clear: left;\n    width: 40%;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dg .c {\n    float: left;\n    width: 60%; }\n  .dg .c input[type=text] {\n    border: 0;\n    margin-top: 4px;\n    padding: 3px;\n    width: 100%;\n    float: right; }\n  .dg .has-slider input[type=text] {\n    width: 30%;\n    /*display: none;*/\n    margin-left: 0; }\n  .dg .slider {\n    float: left;\n    width: 66%;\n    margin-left: -5px;\n    margin-right: 0;\n    height: 19px;\n    margin-top: 4px; }\n  .dg .slider-fg {\n    height: 100%; }\n  .dg .c input[type=checkbox] {\n    margin-top: 9px; }\n  .dg .c select {\n    margin-top: 5px; }\n  .dg .cr.function,\n  .dg .cr.function .property-name,\n  .dg .cr.function *,\n  .dg .cr.boolean,\n  .dg .cr.boolean * {\n    cursor: pointer; }\n  .dg .selector {\n    display: none;\n    position: absolute;\n    margin-left: -9px;\n    margin-top: 23px;\n    z-index: 10; }\n  .dg .c:hover .selector,\n  .dg .selector.drag {\n    display: block; }\n  .dg li.save-row {\n    padding: 0; }\n    .dg li.save-row .button {\n      display: inline-block;\n      padding: 0px 6px; }\n  .dg.dialogue {\n    background-color: #222;\n    width: 460px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 15px; }\n\n/* TODO Separate style and structure */\n#dg-new-constructor {\n  padding: 10px;\n  color: #222;\n  font-family: Monaco, monospace;\n  font-size: 10px;\n  border: 0;\n  resize: none;\n  box-shadow: inset 1px 1px 1px #888;\n  word-wrap: break-word;\n  margin: 12px 0;\n  display: block;\n  width: 440px;\n  overflow-y: scroll;\n  height: 100px;\n  position: relative; }\n\n#dg-local-explain {\n  display: none;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 3px;\n  background-color: #333;\n  padding: 8px;\n  margin-top: 10px; }\n  #dg-local-explain code {\n    font-size: 10px; }\n\n#dat-gui-save-locally {\n  display: none; }\n\n/** Main type */\n.dg {\n  color: #eee;\n  font: 11px 'Lucida Grande', sans-serif;\n  text-shadow: 0 -1px 0 #111;\n  /** Auto place */\n  /* Controller row, <li> */\n  /** Controllers */ }\n  .dg.main {\n    /** Scrollbar */ }\n    .dg.main::-webkit-scrollbar {\n      width: 5px;\n      background: #1a1a1a; }\n    .dg.main::-webkit-scrollbar-corner {\n      height: 0;\n      display: none; }\n    .dg.main::-webkit-scrollbar-thumb {\n      border-radius: 5px;\n      background: #676767; }\n  .dg li:not(.folder) {\n    background: #1a1a1a;\n    border-bottom: 1px solid #2c2c2c; }\n  .dg li.save-row {\n    line-height: 25px;\n    background: #dad5cb;\n    border: 0; }\n    .dg li.save-row select {\n      margin-left: 5px;\n      width: 108px; }\n    .dg li.save-row .button {\n      margin-left: 5px;\n      margin-top: 1px;\n      border-radius: 2px;\n      font-size: 9px;\n      line-height: 7px;\n      padding: 4px 4px 5px 4px;\n      background: #c5bdad;\n      color: #fff;\n      text-shadow: 0 1px 0 #b0a58f;\n      box-shadow: 0 -1px 0 #b0a58f;\n      cursor: pointer; }\n      .dg li.save-row .button.gears {\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\n        height: 7px;\n        width: 8px; }\n      .dg li.save-row .button:hover {\n        background-color: #bab19e;\n        box-shadow: 0 -1px 0 #b0a58f; }\n  .dg li.folder {\n    border-bottom: 0; }\n  .dg li.title {\n    padding-left: 16px;\n    background: #000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\n    cursor: pointer;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n  .dg .closed li.title {\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\n  .dg .cr.boolean {\n    border-left: 3px solid #806787; }\n  .dg .cr.color {\n    border-left: 3px solid; }\n  .dg .cr.function {\n    border-left: 3px solid #e61d5f; }\n  .dg .cr.number {\n    border-left: 3px solid #2FA1D6; }\n    .dg .cr.number input[type=text] {\n      color: #2FA1D6; }\n  .dg .cr.string {\n    border-left: 3px solid #1ed36f; }\n    .dg .cr.string input[type=text] {\n      color: #1ed36f; }\n  .dg .cr.function:hover, .dg .cr.boolean:hover {\n    background: #111; }\n  .dg .c input[type=text] {\n    background: #303030;\n    outline: none; }\n    .dg .c input[type=text]:hover {\n      background: #3c3c3c; }\n    .dg .c input[type=text]:focus {\n      background: #494949;\n      color: #fff; }\n  .dg .c .slider {\n    background: #303030;\n    cursor: ew-resize; }\n  .dg .c .slider-fg {\n    background: #2FA1D6;\n    max-width: 100%; }\n  .dg .c .slider:hover {\n    background: #3c3c3c; }\n    .dg .c .slider:hover .slider-fg {\n      background: #44abda; }\n", ""]);

  // exports


/***/ },
/* 24 */
/***/ function(module, exports) {

  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
    var list = [];

    // return the list of modules as css string
    list.toString = function toString() {
      var result = [];
      for(var i = 0; i < this.length; i++) {
        var item = this[i];
        if(item[2]) {
          result.push("@media " + item[2] + "{" + item[1] + "}");
        } else {
          result.push(item[1]);
        }
      }
      return result.join("");
    };

    // import a list of modules into the list
    list.i = function(modules, mediaQuery) {
      if(typeof modules === "string")
        modules = [[null, modules, ""]];
      var alreadyImportedModules = {};
      for(var i = 0; i < this.length; i++) {
        var id = this[i][0];
        if(typeof id === "number")
          alreadyImportedModules[id] = true;
      }
      for(i = 0; i < modules.length; i++) {
        var item = modules[i];
        // skip already imported module
        // this implementation is not 100% perfect for weird media query combinations
        //  when a module is imported multiple times with different media queries.
        //  I hope this will never occur (Hey this way we have smaller bundles)
        if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
          if(mediaQuery && !item[2]) {
            item[2] = mediaQuery;
          } else if(mediaQuery) {
            item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
          }
          list.push(item);
        }
      }
    };
    return list;
  };


/***/ }
/******/ ])
});
;
//# sourceMappingURL=dat.gui.js.map

(function(Blotter) {

  Blotter.ChannelSplitMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.ChannelSplitMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.ChannelSplitMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.PI,
        Blotter.Assets.Shaders.LineMath,
        Blotter.Assets.Shaders.Random,


        "const int MAX_STEPS = 200;",


        "// Fix a floating point number to two decimal places",
        "float toFixedTwo(float f) {",
        "    return float(int(f * 100.0)) / 100.0;",
        "}",


        "vec2 motionBlurOffsets(vec2 fragCoord, float deg, float spread) {",

        "    // Setup",
        "    // -------------------------------",

        "    vec2 centerUv = vec2(0.5);",
        "    vec2 centerCoord = uResolution.xy * centerUv;",

        "    deg = toFixedTwo(deg);",
        "    float slope = normalizedSlope(slopeForDegrees(deg), uResolution.xy);",


        "    // Find offsets",
        "    // -------------------------------",

        "    vec2 k = offsetsForCoordAtDistanceOnSlope(spread, slope);",
        "    if (deg <= 90.0 || deg >= 270.0) {",
        "        k *= -1.0;",
        "    }",


        "    return k;",
        "}",


        "float noiseWithWidthAtUv(float width, vec2 uv) {",
        "    float noiseModifier = 1.0;",
        "    if (uAnimateNoise > 0.0) {",
        "        noiseModifier = sin(uGlobalTime);",
        "    }",

        "    vec2 noiseRowCol = floor((uv * uResolution.xy) / width);",
        "    vec2 noiseFragCoord = ((noiseRowCol * width) + (width / 2.0));",
        "    vec2 noiseUv = noiseFragCoord / uResolution.xy;",

        "    return random(noiseUv * noiseModifier) * 0.125;",
        "}",


        "vec4 motionBlur(vec2 uv, vec2 blurOffset, float maxOffset) {",
        "    float noiseWidth = 3.0;",
        "    float randNoise = noiseWithWidthAtUv(noiseWidth, uv);",

        "    vec4 result = textTexture(uv);",

        "    float maxStepsReached = 0.0;",

        "    // Note: Step by 2 to optimize performance. We conceal lossiness here via applied noise.",
        "    //   If you do want maximum fidelity, change `i += 2` to `i += 1` below.",
        "    for (int i = 1; i <= MAX_STEPS; i += 2) {",
        "        if (abs(float(i)) > maxOffset) { break; }",
        "        maxStepsReached += 1.0;",

        "        // Divide blurOffset by 2.0 so that motion blur starts half way behind itself",
        "        //   preventing blur from shoving samples in any direction",
        "        vec2 offset = (blurOffset / 2.0) - (blurOffset * (float(i) / maxOffset));",
        "        vec4 stepSample = textTexture(uv + (offset / uResolution.xy));",,

        "        result += stepSample;",
        "    }",

        "    if (maxOffset >= 1.0) {",
        "        result /= maxStepsReached;",
        "        //result.a = pow(result.a, 2.0); // Apply logarithmic smoothing to alpha",
        "        result.a -= (randNoise * (1.0 - result.a)); // Apply noise to smoothed alpha",
        "    }",


        "    return result;",
        "}",


        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",

        "    // Setup",
        "    // -------------------------------",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    float offset = min(float(MAX_STEPS), uResolution.y * uOffset);",

        "    float slope = normalizedSlope(slopeForDegrees(uRotation), uResolution);",

        "    // We want the blur to be the full offset amount in each direction",
        "    //   and to adjust with our logarithmic adjustment made later, so multiply by 4",
        "    float adjustedOffset = offset;// * 4.0;",

        "    vec2 blurOffset = motionBlurOffsets(fragCoord, uRotation, adjustedOffset);",


        "    // Set Starting Points",
        "    // -------------------------------",

        "    vec2 rUv = uv;",
        "    vec2 gUv = uv;",
        "    vec2 bUv = uv;",

        "    vec2 k = offsetsForCoordAtDistanceOnSlope(offset, slope) / uResolution;",

        "    if (uRotation <= 90.0 || uRotation >= 270.0) {",
        "        rUv += k;",
        "        bUv -= k;",
        "    }",
        "    else {",
        "        rUv -= k;",
        "        bUv += k;",
        "    }",


        "    // Blur and Split Channels",
        "    // -------------------------------",

        "    vec4 resultR = vec4(0.0);",
        "    vec4 resultG = vec4(0.0);",
        "    vec4 resultB = vec4(0.0);",

        "    if (uApplyBlur > 0.0) {",
        "        resultR = motionBlur(rUv, blurOffset, adjustedOffset);",
        "        resultG = motionBlur(gUv, blurOffset, adjustedOffset);",
        "        resultB = motionBlur(bUv, blurOffset, adjustedOffset);",
        "    } else {",
        "        resultR = textTexture(rUv);",
        "        resultG = textTexture(gUv);",
        "        resultB = textTexture(bUv);",
        "    }",

        "    float a = resultR.a + resultG.a + resultB.a;",

        "    resultR = normalBlend(resultR, uBlendColor);",
        "    resultG = normalBlend(resultG, uBlendColor);",
        "    resultB = normalBlend(resultB, uBlendColor);",



        "    mainImage = vec4(resultR.r, resultG.g, resultB.b, a);",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.ChannelSplitMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
          uOffset : { type : "1f", value : 0.05 },
          uRotation : { type : "1f", value : 45.0 },
          uApplyBlur : { type : "1f", value : 1.0 },
          uAnimateNoise : { type : "1f", value : 1.0 }
        };
      }
    };

  })());

})(
  this.Blotter
);

(function(Blotter) {

  Blotter.FliesMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.FliesMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.FliesMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.Random,

        "vec2 random2(vec2 p) {",
        "    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);",
        "}",

        "float isParticle(out vec3 particleColor, vec2 fragCoord, float pointRadius, float pointCellWidth, float dodge, vec2 dodgePosition, float dodgeSpread, float speed) {    ",
        "    if (pointCellWidth == 0.0) { return 0.0; };",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    float pointRadiusOfCell = pointRadius / pointCellWidth;",

        "    vec2 totalCellCount = uResolution.xy / pointCellWidth;",
        "    vec2 cellUv = uv * totalCellCount;",

        "    // Tile the space",
        "    vec2 iUv = floor(cellUv);",
        "    vec2 fUv = fract(cellUv);",

        "    float minDist = 1.0;  // minimun distance",

        "    vec4 baseSample = textTexture(cellUv);",
        "    float maxWeight = 0.0;",
        "    particleColor = baseSample.rgb;",

        "    for (int y= -1; y <= 1; y++) {",
        "        for (int x= -1; x <= 1; x++) {",
        "            // Neighbor place in the grid",
        "            vec2 neighbor = vec2(float(x), float(y));",

        "            // Random position from current + neighbor place in the grid",
        "            vec2 point = random2(iUv + neighbor);",

        "            // Get cell weighting from cell's center alpha",
        "            vec2 cellRowCol = floor(fragCoord / pointCellWidth) + neighbor;",
        "            vec2 cellFragCoord = ((cellRowCol * pointCellWidth) + (pointCellWidth / 2.0));",
        "            vec4 cellSample = textTexture(cellFragCoord / uResolution.xy);",
        "            float cellWeight = cellSample.a;",

        "            if (cellWeight < 1.0) {",
        "               // If the cell is not fully within our text, we should disregard it",
        "               continue;",
        "            }",

        "            maxWeight = max(maxWeight, cellWeight);",
        "            if (cellWeight == maxWeight) {",
        "                particleColor = cellSample.rgb;",
        "            }",

        "            float distanceFromDodge = distance(dodgePosition * uResolution.xy, cellFragCoord) / uResolution.y;",
        "            distanceFromDodge = 1.0 - smoothstep(0.0, dodgeSpread, distanceFromDodge);",

        "            // Apply weighting to noise and dodge if dodge is set to 1.0",
        "            cellWeight = step(cellWeight, random(cellRowCol)) + (distanceFromDodge * dodge);",

        "            // Animate the point",
        "            point = 0.5 + 0.75 * sin((uGlobalTime * speed) + 6.2831 * point);",

        "            // Vector between the pixel and the point",
        "            vec2 diff = neighbor + point - fUv;",

        "            // Distance to the point",
        "            float dist = length(diff);",
        "            dist += cellWeight; // Effectively remove point",

        "            // Keep the closer distance",
        "            minDist = min(minDist, dist);",
        "        }",
        "    }",


        "    float pointEasing = pointRadiusOfCell - (1.0 / pointCellWidth);",

        "    float isParticle = 1.0 - smoothstep(pointEasing, pointRadiusOfCell, minDist);",

        "    return isParticle;",
        "}",

        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",
        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    // Convert uPointCellWidth to pixels, keeping it between 1 and the total y resolution of the text",
        "    // Note: floor uPointCellWidth here so that we dont have half pixel widths on retina displays",
        "    float pointCellWidth = floor(max(0.0, min(1.0, uPointCellWidth) * uResolution.y));",

        "    // Ensure uPointRadius allow points to exceed the width of their cells",
        "    float pointRadius = uPointRadius * 0.8;",
        "    pointRadius = min(pointRadius * pointCellWidth, pointCellWidth);",

        "    float dodge = ceil(uDodge);",

        "    vec3 outColor = vec3(0.0);",
        "    float point = isParticle(outColor, fragCoord, pointRadius, pointCellWidth, dodge, uDodgePosition, uDodgeSpread, uSpeed);",

        "    mainImage = vec4(outColor, point);",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.FliesMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
          uPointCellWidth : { type : "1f", value : 0.04 },
          uPointRadius : { type : "1f", value : 0.75 },
          uDodge : { type : "1f", value : 0.0 },
          uDodgePosition : { type : "2f", value : [0.5, 0.5] },
          uDodgeSpread : { type : "1f", value : 0.25 },
          uSpeed : { type : "1f", value : 1.0 }
        };
      }
    };

  })());

})(
  this.Blotter
);

(function(Blotter) {

  Blotter.LiquidDistortMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.LiquidDistortMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.LiquidDistortMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.Noise3D,

        "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
        "{",
        "    // Setup ========================================================================",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",
        "    float z = uSeed + uGlobalTime * uSpeed;",

        "    uv += snoise(vec3(uv, z)) * uVolatility;",

        "    mainImage = textTexture(uv);",

        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.LiquidDistortMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
          uSpeed : { type : "1f", value : 1.0 },
          uVolatility : { type : "1f", value : 0.15 },
          uSeed : { type : "1f", value : 0.1 }
        };
      }
    };

  })());

})(
  this.Blotter
);

(function(Blotter) {

  Blotter.RollingDistortMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.RollingDistortMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.RollingDistortMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.PI,
        Blotter.Assets.Shaders.LineMath,
        Blotter.Assets.Shaders.Noise,

        "// Fix a floating point number to two decimal places",
        "float toFixedTwo(float f) {",
        "    return float(int(f * 100.0)) / 100.0;",
        "}",

        "// Via: http://www.iquilezles.org/www/articles/functions/functions.htm",
        "float impulse(float k, float x) {",
        "    float h = k * x;",
        "    return h * exp(1.0 - h);",
        "}",

        "vec2 waveOffset(vec2 fragCoord, float sineDistortSpread, float sineDistortCycleCount, float sineDistortAmplitude, float noiseDistortVolatility, float noiseDistortAmplitude, vec2 distortPosition, float deg, float speed) {",

        "    // Setup",
        "    // -------------------------------",

        "    deg = toFixedTwo(deg);",

        "    float centerDistance = 0.5;",
        "    vec2 centerUv = vec2(centerDistance);",
        "    vec2 centerCoord = uResolution.xy * centerUv;",

        "    float changeOverTime = uGlobalTime * speed;",

        "    float slope = normalizedSlope(slopeForDegrees(deg), uResolution.xy);",
        "    float perpendicularDeg = mod(deg + 90.0, 360.0); // Offset angle by 90.0, but keep it from exceeding 360.0",
        "    float perpendicularSlope = normalizedSlope(slopeForDegrees(perpendicularDeg), uResolution.xy);",


        "    // Find intersects for line with edges of viewport",
        "    // -------------------------------",

        "    vec2 edgeIntersectA = vec2(0.0);",
        "    vec2 edgeIntersectB = vec2(0.0);",
        "    intersectsOnRectForLine(edgeIntersectA, edgeIntersectB, vec2(0.0), uResolution.xy, centerCoord, slope);",
        "    float crossSectionLength = distance(edgeIntersectA, edgeIntersectB);",

        "    // Find the threshold for degrees at which our intersectsOnRectForLine function would flip",
        "    //   intersects A and B because of the order in which it finds them. This is the angle at which",
        "    //   the y coordinate for the hypotenuse of a right triangle whose oposite adjacent edge runs from",
        "    //   vec2(0.0, centerCoord.y) to centerCoord and whose opposite edge runs from vec2(0.0, centerCoord.y) to",
        "    //   vec2(0.0, uResolution.y) exceeeds uResolution.y",
        "    float thresholdDegA = atan(centerCoord.y / centerCoord.x) * (180.0 / PI);",
        "    float thresholdDegB = mod(thresholdDegA + 180.0, 360.0);",

        "    vec2 edgeIntersect = vec2(0.0);",
        "    if (deg < thresholdDegA || deg > thresholdDegB) {",
        "        edgeIntersect = edgeIntersectA;",
        "    } else {",
        "        edgeIntersect = edgeIntersectB;",
        "    }",

        "    vec2 perpendicularIntersectA = vec2(0.0);",
        "    vec2 perpendicularIntersectB = vec2(0.0);",
        "    intersectsOnRectForLine(perpendicularIntersectA, perpendicularIntersectB, vec2(0.0), uResolution.xy, centerCoord, perpendicularSlope); ",
        "    float perpendicularLength = distance(perpendicularIntersectA, perpendicularIntersectA);",

        "    vec2 coordLineIntersect = vec2(0.0);",
        "    lineLineIntersection(coordLineIntersect, centerCoord, slope, fragCoord, perpendicularSlope);",


        "    // Define placement for distortion ",
        "    // -------------------------------",

        "    vec2 distortPositionIntersect = vec2(0.0);",
        "    lineLineIntersection(distortPositionIntersect, distortPosition * uResolution.xy, perpendicularSlope, edgeIntersect, slope);",
        "    float distortDistanceFromEdge = (distance(edgeIntersect, distortPositionIntersect) / crossSectionLength);// + sineDistortSpread;",

        "    float uvDistanceFromDistort = distance(edgeIntersect, coordLineIntersect) / crossSectionLength;",
        "    float noiseDistortVarianceAdjuster = uvDistanceFromDistort + changeOverTime;",
        "    uvDistanceFromDistort += -centerDistance + distortDistanceFromEdge + changeOverTime;",
        "    uvDistanceFromDistort = mod(uvDistanceFromDistort, 1.0); // For sine, keep distance between 0.0 and 1.0",


        "    // Define sine distortion ",
        "    // -------------------------------",

        "    float minThreshold = centerDistance - sineDistortSpread;",
        "    float maxThreshold = centerDistance + sineDistortSpread;",

        "    uvDistanceFromDistort = clamp(((uvDistanceFromDistort - minThreshold)/(maxThreshold - minThreshold)), 0.0, 1.0);",
        "    if (sineDistortSpread < 0.5) {",
        "        // Add smoother decay to sin distort when it isnt taking up the full viewport.",
        "        uvDistanceFromDistort = impulse(uvDistanceFromDistort, uvDistanceFromDistort);",
        "    }",

        "    float sineDistortion = sin(uvDistanceFromDistort * PI * sineDistortCycleCount) * sineDistortAmplitude;",


        "    // Define noise distortion ",
        "    // -------------------------------",

        "    float noiseDistortion = noise(noiseDistortVolatility * noiseDistortVarianceAdjuster) * noiseDistortAmplitude;",
        "    if (noiseDistortVolatility > 0.0) {",
        "        noiseDistortion -= noiseDistortAmplitude / 2.0; // Adjust primary distort so that it distorts in two directions.",
        "    }",
        "    noiseDistortion *= (sineDistortion > 0.0 ? 1.0 : -1.0); // Adjust primary distort to account for sin variance.",


        "    // Combine distortions to find UV offsets ",
        "    // -------------------------------",

        "    vec2 kV = offsetsForCoordAtDistanceOnSlope(sineDistortion + noiseDistortion, perpendicularSlope);",
        "    if (deg <= 0.0 || deg >= 180.0) {",
        "        kV *= -1.0;",
        "    }",


        "    return kV;",
        "}",


        "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
        "{",
        "    // Setup",
        "    // -------------------------------",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    // Minor hacks to ensure our waves start horizontal and animating in a downward direction by default.",
        "    uRotation = mod(uRotation + 270.0, 360.0);",
        "    uDistortPosition.y = 1.0 - uDistortPosition.y;",


        "    // Distortion",
        "    // -------------------------------",

        "    vec2 offset = waveOffset(fragCoord, uSineDistortSpread, uSineDistortCycleCount, uSineDistortAmplitude, uNoiseDistortVolatility, uNoiseDistortAmplitude, uDistortPosition, uRotation, uSpeed);",

        "    mainImage = textTexture(uv + offset);",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.RollingDistortMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
            uSineDistortSpread : { type : "1f", value : 0.05 },
            uSineDistortCycleCount : { type : "1f", value : 2.0 },
            uSineDistortAmplitude : { type : "1f", value : 0.25 },
            uNoiseDistortVolatility : { type : "1f", value : 20.0 },
            uNoiseDistortAmplitude : { type : "1f", value : 0.01 },
            uDistortPosition : { type : "2f", value : [0.5, 0.5] },
            uRotation : { type : "1f", value :  170.0 },
            uSpeed : { type : "1f", value : 0.08 }
        };
      }
    };

  })());

})(
  this.Blotter
);

(function(Blotter) {

  Blotter.SlidingDoorMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.SlidingDoorMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.SlidingDoorMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.PI,

        "float easingForPositionWithDeadzoneWidth(float position, float deadzoneWidth) {",
        "    // Offset position buy 0.25 so that sin wave begins on a downslope at 0.0",
        "    position += 0.25;",

        "    // Distance of adjusted position from 0.75, min of 0.0 and max of 0.5",
        "    float firstDist = distance(position, 0.75);",

        "    // Divide deadzoneWidth by two, as we will be working it out in either direction from the center position.",
        "    float halfDeadzoneWidth = deadzoneWidth / 2.0;",

        "    // Clamp distance of position from center (0.75) to something between 0.5 and the halfDeadzoneWidth from center.",
        "    float removedDistance = max(firstDist, halfDeadzoneWidth);",

        "    // Find the percentage of removedDistance within the range of halfDeadzoneWidth..0.5",
        "    float distanceOfRange = (removedDistance - halfDeadzoneWidth) / (0.5 - halfDeadzoneWidth);",

        "    // Convert distanceOfRange to a number between 0.0 and 0.5. This means that for any pixel +/- halfDeadzoneWidth from center, the value will be 0.5.",
        "    float offsetDist = (0.5 * (1.0 - (distanceOfRange)));",

        "    if (position < 0.75) {",
        "        position = 0.25 + offsetDist;",
        "    } else {",
        "        position = 1.25 - offsetDist;",
        "    }",


        "    return sin((position) * PI * 2.0) / 2.0;",
        "}",


        "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
        "{",
        "    // Setup ========================================================================",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    float time = uGlobalTime * uSpeed;",

        "    float directionalAdjustment = uFlipAnimationDirection > 0.0 ? -1.0 : 1.0;",


        "    if (uSpeed > 0.0) {",

        "       // Define Axis-Based Striping ===================================================",

        "       float divisions = uDivisions;",
        "       float effectPosition = fragCoord.y;",
        "       float effectDimension = uResolution.y;",
        "       if (uAnimateHorizontal > 0.0) {",
        "          effectPosition = fragCoord.x;",
        "          effectDimension = uResolution.x;",
        "          divisions = floor((divisions * (uResolution.x / uResolution.y)) + 0.5);",
        "       }",
        "       float stripe = floor(effectPosition / (effectDimension / divisions));",


        "       // Animate =====================================================================",

        "       float timeAdjustedForStripe = time - ((uDivisionWidth / divisions) * stripe) * directionalAdjustment;",
        "       float offsetAtTime = mod(timeAdjustedForStripe, 1.0);",

        "       // Divide sin output by 2 and add to 0.5 so that sin wave move between 0.0 and 1.0 rather than -1.0 and 1.0.",
        "       float easing = 0.5 + easingForPositionWithDeadzoneWidth(offsetAtTime, uDivisionWidth);",

        "       // Mulptiply offsetAtTime by 2.0 and subtract from 1.0 so that position changes over a range of -1.0 to 1.0 rather than 0.0 to 1.0.",
        "       if (uAnimateHorizontal > 0.0) {",
        "          uv.x -= ((1.0 - (offsetAtTime * 2.0)) * easing) * directionalAdjustment;",
        "       } else {",
        "          uv.y -= ((1.0 - (offsetAtTime * 2.0)) * easing) * directionalAdjustment;",
        "       }",
        "    }",

        "    mainImage = textTexture(uv);",

        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.SlidingDoorMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
          uDivisions : { type : "1f", value : 5.0 },
          uDivisionWidth : { type : "1f", value : 0.25 },
          uAnimateHorizontal : { type : "1f", value : 0.0 },
          uFlipAnimationDirection : { type : "1f", value : 0.0 },
          uSpeed : { type : "1f", value : 0.2 }
        };
      }
    };

  })());

})(
  this.Blotter
);

BlotterSite.Materials = {};

BlotterSite.Materials.Material = function (el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.Material.prototype = (function () {

  return {
    constructor : BlotterSite.Materials.Material,

    init : function (el, text) {
      this.el = el;
      this.text = text;

      this.prepare();
      this._setListeners();
    },

    _setListeners : function () {
      this.blotter.on("render", _.bind(this.render, this));
    },

    prepare : function () {
      this.material = new Blotter.Material();
      this.blotter = new Blotter(this.material, { texts : this.text });
      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);

      this.uniformDefinitions = [];
    },

    render : function () {
      // override
    }
  }
})();

BlotterSite.Materials.ChannelSplitMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.ChannelSplitMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.ChannelSplitMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.ChannelSplitMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);

      this.uniformDefinitions = [
        {
          name : "uOffset",
          value : 0.0175,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uOffset.value = value;
          }.bind(this),
          setImmediate : true
        },
        {
          name : "uRotation",
          value : this.material.uniforms.uRotation.value,
          min : 0.0,
          max : 360.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uRotation.value = value;
          }.bind(this)
        },
        {
          name : "uApplyBlur",
          value : !!this.material.uniforms.uApplyBlur.value,
          onChange : function (value) {
            this.material.uniforms.uApplyBlur.value = value ? 1.0 : 0.0;
          }.bind(this)
        },
        {
          name : "uAnimateNoise",
          value : !!this.material.uniforms.uAnimateNoise.value,
          onChange : function (value) {
            this.material.uniforms.uAnimateNoise.value = value ? 1.0 : 0.0;
          }.bind(this)
        }
      ];
    }
  }
})());

BlotterSite.Materials.FliesMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.FliesMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.FliesMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.FliesMaterial();
      this.material.uniforms.uPointCellWidth.value = 0.035;
      this.material.uniforms.uSpeed.value = 2.0;

      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);

      this.uniformDefinitions = [
        {
          name : "uPointCellWidth",
          value : 0.012,
          min : 0.0,
          max : 0.1,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uPointCellWidth.value = value;
          }.bind(this),
          setImmediate : true
        },
        {
          name : "uPointRadius",
          value : 0.85,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uPointRadius.value = value;
          }.bind(this),
          setImmediate : true
        },
        {
          name : "uDodge",
          value : !!this.material.uniforms.uDodge.value,
          onChange : function (value) {
            this.material.uniforms.uDodge.value = value ? 1.0 : 0.0;
          }.bind(this)
        },
        {
          name : "uDodgePosition (x)",
          value : this.material.uniforms.uDodgePosition.value[0],
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uDodgePosition.value = [value, this.material.uniforms.uDodgePosition.value[1]];
          }.bind(this)
        },
        {
          name : "uDodgePosition (y)",
          value : this.material.uniforms.uDodgePosition.value[1],
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uDodgePosition.value = [this.material.uniforms.uDodgePosition.value[0], value]
          }.bind(this)
        },
        {
          name : "uDodgeSpread",
          value : this.material.uniforms.uDodgeSpread.value,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uDodgeSpread.value = value;
          }.bind(this)
        },
        {
          name : "uSpeed",
          value : this.material.uniforms.uSpeed.value,
          min : 0.0,
          max : 10.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSpeed.value = value;
          }.bind(this)
        }
      ];
    }
  }
})());

BlotterSite.Materials.LiquidDistortMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.LiquidDistortMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.LiquidDistortMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.LiquidDistortMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);

      this.uniformDefinitions = [
        {
          name : "uSpeed",
          value : this.material.uniforms.uSpeed.value,
          min : 0.0,
          max : 5.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSpeed.value = value;
          }.bind(this)
        },
        {
          name : "uVolatility",
          value : this.material.uniforms.uVolatility.value,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uVolatility.value = value;
          }.bind(this)
        },
        {
          name : "uSeed",
          value : this.material.uniforms.uSeed.value,
          min : 0.0,
          max : 20.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSeed.value = value;
          }.bind(this)
        },
      ];
    }
  }
})());

BlotterSite.Materials.RollingDistortMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.RollingDistortMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.RollingDistortMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.RollingDistortMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);

      this.uniformDefinitions = [
        {
          name : "uSineDistortSpread",
          value : 0.025,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSineDistortSpread.value = value;
          }.bind(this),
          setImmediate : true
        },
        {
          name : "uSineDistortCycleCount",
          value : this.material.uniforms.uSineDistortCycleCount.value,
          min : 0.0,
          max : 7.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSineDistortCycleCount.value = value;
          }.bind(this)
        },
        {
          name : "uSineDistortAmplitude",
          value : 0.125,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSineDistortAmplitude.value = value;
          }.bind(this),
          setImmediate : true
        },
        {
          name : "uNoiseDistortVolatility",
          value : this.material.uniforms.uNoiseDistortVolatility.value,
          min : 0.0,
          max : 250.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uNoiseDistortVolatility.value = value;
          }.bind(this)
        },
        {
          name : "uNoiseDistortAmplitude",
          value : this.material.uniforms.uNoiseDistortAmplitude.value,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uNoiseDistortAmplitude.value = value;
          }.bind(this)
        },
        {
          name : "uDistortPosition (x)",
          value : this.material.uniforms.uDistortPosition.value[0],
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uDistortPosition.value = [value, this.material.uniforms.uDistortPosition.value[1]];
          }.bind(this)
        },
        {
          name : "uDistortPosition (y)",
          value : this.material.uniforms.uDistortPosition.value[1],
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uDistortPosition.value = [this.material.uniforms.uDistortPosition.value[0], value]
          }.bind(this)
        },
        {
          name : "uRotation",
          value : this.material.uniforms.uRotation.value,
          min : 0.0,
          max : 360.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uRotation.value = value;
          }.bind(this)
        },
        {
          name : "uSpeed",
          value : this.material.uniforms.uSpeed.value,
          min : 0.0,
          max : 10.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSpeed.value = value;
          }.bind(this)
        }
      ];
    }
  }
})());

BlotterSite.Materials.SlidingDoorMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.SlidingDoorMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.SlidingDoorMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.SlidingDoorMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);

      this.uniformDefinitions = [
        {
          name : "uDivisions",
          value : 11,
          min : 0.0,
          max : 30.0,
          step : 1.0,
          onChange : function (value) {
            this.material.uniforms.uDivisions.value = value;
          }.bind(this),
          setImmediate : true
        },
        {
          name : "uDivisionWidth",
          value : this.material.uniforms.uDivisionWidth.value,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uDivisionWidth.value = value;
          }.bind(this)
        },
        {
          name : "uAnimateHorizontal",
          value : !!this.material.uniforms.uAnimateHorizontal.value,
          onChange : function (value) {
            this.material.uniforms.uAnimateHorizontal.value = value ? 1.0 : 0.0;
          }.bind(this)
        },
        {
          name : "uFlipAnimationDirection",
          value : !!this.material.uniforms.uFlipAnimationDirection.value,
          onChange : function (value) {
            this.material.uniforms.uFlipAnimationDirection.value = value ? 1.0 : 0.0;
          }.bind(this)
        },
        {
          name : "uSpeed",
          value : this.material.uniforms.uSpeed.value,
          min : 0.0,
          max : 10.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSpeed.value = value;
          }.bind(this)
        }
      ];
    }
  }
})());

BlotterSite.HeroExamples = {};

BlotterSite.HeroExamples.ChannelSplitMaterial = Marionette.ItemView.extend((function () {

  function angleBetweenPointsInDegrees(x1, y1, x2, y2) {
    var angle = Math.atan2(y2 - y1, x2 - x1) * 180.0 / Math.PI;

    angle = 180 + angle;

    return angle;
  }

  function distanceBetweenPoints(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt((a * a) + (b * b));
  }

  return {
    template : _.template("<div></div>")(),

    initialize : function () {
      this._prepareBlotter();
    },

    _setListeners : function () {
      $(document).mousemove(_.bind(this._handleMousemove, this));
    },

    onRender : function () {
      this.blotter.on("ready", _.bind(function() {
        this._setListeners();

        _.each(this.scopes, _.bind(function (scope) {
          scope.appendTo(this.el);
        }, this));

        this._setRandomPositions(_.pluck(this.scopes, "domElement"));
        this._setInitialCenter();
      }, this));
    },

    onDestroy : function () {
      this.blotter.stop();
      this.blotter.teardown();
    },

    _prepareBlotter : function () {
      this.blotterTexts = this._blotterTexts();
      this.material = new Blotter.ChannelSplitMaterial();
      this.blotter = new Blotter(this.material, { texts : this.blotterTexts });
      this.scopes =_.map(this.blotterTexts, _.bind(function(blotterText) {
        return this.blotter.forText(blotterText);
      }, this));
    },

    _blotterTexts : function () {
      var texts = ["A", "B", "C", "D", "E", "F", "G", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; // Note: I dont like 'Q' with this typeface, so it's absent.
      var textProperties = {
        family :  "'AvenirLTStd-Heavy', 'Helvetica Neue', 'Helvetica', Arial, sans-serif",
        leading : 1.0,
        weight : 800,
        paddingLeft : 60,
        paddingRight : 60,
        paddingTop : 50,
        paddingBottom : 50,
        fill : "#202020"
      };
      var sizes = [17, 17, 26, 26, 26, 26, 78, 78, 78, 104, 104, 156, 208];

      return _.map(_.shuffle(texts).slice(0, 13), function(text, i) {
        var properties = _.clone(textProperties);
        properties.size = sizes[i];

        return new Blotter.Text(text, properties);
      });
    },

    _setRandomPositions : function (elements) {
      var positions = [
        [["41.9943820225618%","54.967948717769225%"],["66.99438202256181%","76.60256410238462%"],["31.882022472%","10.256410256230767%"],["20.646067415820223%","32.6923076921282%"],["35.252808988853936%","0%"],["50.28089887649438%","37.82051282033333%"],["67.97752808997754%","30.929487179307692%"],["0%","13.621794871615387%"],["52.668539325932585%","0%"],["55.617977528179786%","58.49358974341025%"],["0.1404494382921353%","26.442307692128203%"],["23.45505617986517%","53.36538461520513%"],["65.02808988773035%","0%"]],
        [["45.365168539415734%","0%"],["23.314606741662917%","78.68589743571796%"],["0%","39.42307692289743%"],["22.752808988853936%","20.673076922897437%"],["25.140449438292134%","59.775641025461546%"],["35.39325842705618%","0%"],["17.83707865177528%","25.16025641007692%"],["34.69101123604495%","23.237179487%"],["10.393258427056178%","7.211538461358973%"],["15.73033707874157%","62.66025641007693%"],["0%","0%"],["45.78651685402247%","8.653846153666665%"],["69.6742%","34%"]],
        [["6.741573033797752%","32.6923076921282%"],["63.62359550570787%","52.40384615366666%"],["15.73033707874157%","78.04487179469231%"],["45.64606741582022%","0%"],["17.696629213573033%","11.217948717769234%"],["0%","25.480769230589743%"],["21.7696629214382%","73.0769230767436%"],["83.98876404503372%","66.18589743571796%"],["1.264044943910113%","5.769230769051283%"],["46.06741573042697%","0%"],["4.213483146157304%","41.82692307674359%"],["70.6348%","9.134615384435898%"],["38.90449438211236%","30.28846153828205%"]],
        [["18.82022471919101%","0%"],["69.94382022480899%","53.20512820494872%"],["1.6853932585168536%","68.10897435879487%"],["78.51123595514608%","9.615384615205128%"],["83.14606741582023%","28.685897435717948%"],["45.92696629222472%","31.24999999982051%"],["0%","29.487179487%"],["12.640449438292134%","70.51282051264103%"],["75.56179775289888%","16.66666666648718%"],["3.370786516943821%","1.442307692128205%"],["73.87640449447191%","42.307692307512816%"],["22.47191011244944%","0%"],["13.764044943910111%","20.833333333153846%"]],
        [["28.511235955146066%","62.66025641007693%"],["62.64044943829214%","11.057692307512818%"],["22.191011236044943%","45.1923076921282%"],["82.1629213484045%","0%"],["41.853932584359555%","26.121794871615386%"],["37.50000000008989%","79.3269230767436%"],["50.14044943829213%","17.307692307512816%"],["58.98876404503372%","33.493589743410254%"],["44.662921348404495%","3.2051282049487195%"],["73.03370786525844%","43.269230769051276%"],["54.63483146076404%","0%"],["2.2471910113258424%","48.39743589725641%"],["0%","0%"]]
      ];

      var selectedPostions = _.sample(positions);

      _.each(elements, _.bind(function (el, i) {

        var position = selectedPostions[i];
        $(el).css({
          left : position[0],
          position : "absolute",
          top : position[1]
        });
      }, this));
    },

    _setInitialCenter : function () {
      var parentWidth = $(document).width(),
          parentHeight = $(document).height(),
          exampleWidth = this.$el.width(),
          exampleHeight = this.$el.height();
          examplePosition = this.$el.offset();

      this._handleNewCenter(
        (examplePosition.left + (exampleWidth / 2.0)) / parentWidth,
        (examplePosition.top + (exampleHeight / 2.0)) / parentHeight
      )
    },

    _handleMousemove : function (e) {
      var parentWidth = $(document).width(),
          parentHeight = $(document).height();

      var posX = e.pageX / parentWidth;
      var posY = e.pageY / parentHeight;

      this._handleNewCenter(posX, posY);
    },

    _handleNewCenter : function (posX, posY) {
      var parentWidth = $(document).width(),
          parentHeight = $(document).height();

      _.each(this.scopes, _.bind(function (scope) {
        var element = $(scope.domElement),
            position = element.offset(),
            x = (position.left + (element.width() / 2.0)) / parentWidth,
            y = (position.top + (element.height() / 2.0)) / parentHeight;

        var angle = angleBetweenPointsInDegrees(x, y, posX, posY);
        var blur = Math.min(0.2, distanceBetweenPoints(x, y, posX, posY));

        scope.material.uniforms.uRotation.value = angle;
        scope.material.uniforms.uOffset.value = blur;

      }, this));
    }
  }
})());

BlotterSite.HeroExamples.LiquidDistortMaterial = Marionette.ItemView.extend((function () {

  function distanceBetweenPoints(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt((a * a) + (b * b));
  }

  return {
    template : _.template("<div></div>")(),

    initialize : function () {
      this._prepareBlotter();
      this._setListeners();
    },

    onRender : function () {
      this.blotter.on("ready", _.bind(function() {
        this.scope.appendTo(this.el);
      }, this));
    },

    onDestroy : function () {
      this.blotter.stop();
      this.blotter.teardown();
    },

    _setListeners : function () {
      $(document).mousemove(_.bind(this._handleMousemove, this));
    },

    _prepareBlotter : function () {
      this.blotterText = this._blotterText();

      this.material = new Blotter.LiquidDistortMaterial();
      this.material.uniforms.uSpeed.value = 0.25;

      this.blotter = new Blotter(this.material, { texts : this.blotterText });
      this.scope = this.blotter.forText(this.blotterText);
    },

    _blotterText : function () {
      var textProperties = {
        family :  "'AvenirLTStd-Heavy', 'Helvetica Neue', 'Helvetica', Arial, sans-serif",
        leading : 1.0,
        weight : 800,
        size : 104,
        paddingLeft : 60,
        paddingRight : 60,
        paddingTop : 50,
        paddingBottom : 50,
        fill : "#202020"
      };

      return new Blotter.Text("3", textProperties);
    },

    _handleMousemove : function (e) {
      var parentWidth = $(document).width(),
          parentHeight = $(document).height();

      var posX = e.pageX / parentWidth;
      var posY = e.pageY / parentHeight;

      this._handleNewCenter(posX, posY);
    },

    _handleNewCenter : function (posX, posY) {
      var parentWidth = $(document).width(),
          parentHeight = $(document).height();

      var element = $(this.scope.domElement),
          position = element.offset(),
          x = (position.left + (element.width() / 2.0)) / parentWidth,
          y = (position.top + (element.height() / 2.0)) / parentHeight;

      this.scope.material.uniforms.uVolatility.value = Math.min(0.15, distanceBetweenPoints(x, y, posX, posY));
    }
  }
})());


$(document).ready(function () {


  /*  Initialization
    ------------------------------------- */

  _.extend(window.BlotterSite, {
    Views : {},
    Models : {},
    Collections : {},
    Helpers : {},
    Utils : {},
    Components : {},
    Extensions : {},
    Router : null,

    init : function () {
      this.instance = new BlotterSite.Views.App();

      this.marginaliaManager = new BlotterSite.Helpers.GlitchMarginaliaCanvasManager($("#marginalia-container"));

      Backbone.history.start();

      this.initRoute = Backbone.history.fragment;

      this.setListeners();
    },

    setListeners : function () {
      $("body").on("navReady", _.bind(this.handleNavReady, this));
    },

    handleNavReady : function () {
      $("body").trigger("pathChange", this.initRoute);
    }
  });

  $(function() {
    window.BlotterSite.init();
  });


  /*  Router
    ------------------------------------- */

  BlotterSite.Router = Backbone.Router.extend({
    routes : {
      "basics" : "basics",
      "overview" : "overview",
      "materials" : "materials",
      "materials/:materialName" : "material",
      "documentation" : "documentation",
      "" : "home"
    },

    home : function () {
      var view = new BlotterSite.Views.Home();

      $("body").trigger("pathChange");

      BlotterSite.instance.goto(view);
    },

    overview : function () {
      var view = new BlotterSite.Views.Overview();

      $("body").trigger("pathChange", ["overview"]);

      BlotterSite.instance.goto(view);
    },

    basics : function () {
      var view = new BlotterSite.Views.Basics();

      $("body").trigger("pathChange", ["basics"]);

      BlotterSite.instance.goto(view);
    },

    materials : function () {
      var view = new BlotterSite.Views.Materials();

      $("body").trigger("pathChange", ["materials"]);

      BlotterSite.instance.goto(view);
    },

    material : function (materialName) {
      var view = new BlotterSite.Views.Material({ materialName : materialName });

      $("body").trigger("pathChange");

      BlotterSite.instance.goto(view, {
        navView : new BlotterSite.Views.BackNavigation()
      });
    },

    documentation : function () {
      var view = new BlotterSite.Views.Documentation();

      $("body").trigger("pathChange", ["documentation"]);

      BlotterSite.instance.goto(view);
    }
  });


  /*  Utilities
    ------------------------------------- */

  BlotterSite.Utils.renderFromUrl = function (templateUrl, templateData) {
    if (!BlotterSite.Utils.renderFromUrl.tmplCache) {
      BlotterSite.Utils.renderFromUrl.tmplCache = {};
    }

    if (!BlotterSite.Utils.renderFromUrl.tmplCache[templateUrl]) {
      var templateStr;

      $.ajax({
        url: templateUrl,
        method: "GET",
        dataType: "html",
        async: false,
        success: function (data) {
          templateStr = data;
        }
      });

      BlotterSite.Utils.renderFromUrl.tmplCache[templateUrl] = _.template(templateStr);
    }

    return BlotterSite.Utils.renderFromUrl.tmplCache[templateUrl](templateData);
  }


  /*  Helpers
    ------------------------------------- */

  BlotterSite.Helpers.DropdownSelect = function (el) {
    this.init.apply(this, arguments);
  };

  BlotterSite.Helpers.DropdownSelect.prototype = (function () {

    return {
      constructor : BlotterSite.Helpers.DropdownSelect,

      init : function (el) {
        this.el = el;
        this.titleEl = this.el.find(".dropdown-title");
        this.dropdownEl = this.el.find(".dropdown-options");

        this.title = this.titleEl.html();

        this.setupListeners();
      },

      setupListeners : function () {
        this.titleEl.on("click", _.bind(this.handleToggleClick, this));
        this.dropdownEl.find("li").on("mouseover", _.bind(this.handleSelectionHover, this));
        this.dropdownEl.find("li").on("click", _.bind(this.handleSelectionClick, this));
        this.on("selectionMade", _.bind(this.handleSelectionMade, this));
      },

      handleToggleClick : function (e) {
        e.preventDefault();

        var hidden = !this.dropdownEl.is(":visible");

        hidden ? this.showDropdown() : this.hideDropdown();
      },

      showDropdown : function () {
        if (!this.dropdownEl.is(":visible")) {
          this.dropdownEl.velocity('transition.slideDownIn', {
            duration : 150,
            easing : [0.645, 0.045, 0.355, 1.0]
          });

          this.boundBodyListener = this.boundBodyListener || _.bind(this.bodyListener, this);
          $("html").on("mousedown", this.boundBodyListener);
        }
      },

      hideDropdown : function () {
        this.dropdownEl.velocity("reverse", {
          display : "none"
        });

        this.boundBodyListener && $("html").off("mousedown", this.boundBodyListener);
        this.boundBodyListener = null;

        this.titleEl.html(this.title);
      },

      handleSelectionHover : function (e) {
        var target = $(e.currentTarget);

        this.titleEl.html(target.data("title"));
      },

      handleSelectionClick : function (e) {
        e.preventDefault;
        var target = $(e.currentTarget);

        this.trigger("selectionMade", [target.data("value"), target.data("title")]);
      },

      handleSelectionMade : function (value, title) {
        this.value = value;
        this.title = title;

        this.hideDropdown();
      },

      bodyListener : function (e) {
        var target = $(e.target);

        if (!target.parents(".dropdown-select").length) {
          this.hideDropdown();
        }
      }
    }
  })();
  _.extend(BlotterSite.Helpers.DropdownSelect.prototype, EventEmitter.prototype);


  BlotterSite.Helpers.Notation = function ($el, options) {
    this.init.apply(this, arguments);
  }

  BlotterSite.Helpers.Notation.prototype = (function () {

    return {
      constructor : BlotterSite.Helpers.Notation,

      arrowImageSrc : "images/right_arrow.png",

      init : function ($el, options) {
        _.defaults(this, options, {
          baseWidth : 26,
          lineHeight : 0,
          entranceSpace : 26,
          pixelRatio : Blotter.CanvasUtils.pixelRatio
        });

        this.$el = $el;

        this.$ul = this.$el.find("> ul");
        this.$li = this.$ul.find("> li");

        this._setContent();
        this._setCanvasSize();
        this._setStrokeProperties();

        this._readyImage(_.bind(function () {
          this._setListeners();
          this._setImageOffsets();

          this._handleResize();
        }, this));
      },

      _setListeners : function () {
        BlotterSite.instance.on("resize", _.bind(this._handleResize, this));
      },

      _handleResize : function () {
        this._setCanvasSize();
        this._drawArrows();
      },

      _setContent : function () {
        this.$canvas = $("<canvas>");
        this.ctx = this.$canvas[0].getContext("2d");
        this.$el.prepend(this.$canvas);
      },

      _setImageOffsets : function () {
        var arrowHeight = 10,
            ratio = this.arrowImage.width / this.arrowImage.height;

        this.arrowImageOffsets = {
          w : arrowHeight * ratio,
          h : arrowHeight,
          x : -((arrowHeight * ratio) / 2),
          y : -(arrowHeight / 2)
        };
      },

      _setCanvasSize : function () {
        this.width = this.baseWidth * this.pixelRatio;
        this.height = this.$ul.height() * this.pixelRatio;

        this.$canvas.attr("width", this.width);
        this.$canvas.attr("height", this.height);
        this.$canvas.css({
          height : this.$ul.height(),
          left : -this.baseWidth + "px",
          position : "absolute",
          top : -this.entranceSpace,
          width : this.baseWidth,
        });
        this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
      },

      _setStrokeProperties : function () {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "black";
      },

      _readyImage : function (callback) {
        this.arrowImage = new Image();

        this.arrowImage.onload = callback;

        this.arrowImage.src = this.arrowImageSrc;
      },

      _clearContext : function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
      },

      _drawArrows : function () {
        var curveVariance = this.baseWidth,
            origin = {
              x : curveVariance / 4,
              y : 0
            };

        this._clearContext();
        this._setStrokeProperties();

        _.each(this.$li, _.bind(function (li) {
          var $li = $(li),
              position = $li.position(),
              destination = {
                x : this.baseWidth - (this.arrowImageOffsets.w / 2),
                y : position.top + (this.lineHeight / 2) + this.entranceSpace
              },
              length = destination.y - origin.y,
              c1 = {
                x : origin.x + origin.x,
                y : destination.y - (length / 4)
              },
              c2 = {
                x : origin.x - curveVariance,
                y : destination.y - (length / 12)
              };

          // Begin Path
          this.ctx.beginPath();
          this.ctx.moveTo(origin.x, origin.y);

          // Define Curve
          this.ctx.bezierCurveTo(
            c1.x,
            c1.y,
            c2.x,
            c2.y,
            destination.x,
            destination.y
          );

          // Draw Line
          this.ctx.stroke();

          // Draw arrow head
          this.ctx.drawImage(
            this.arrowImage,
            destination.x + this.arrowImageOffsets.x,
            destination.y + this.arrowImageOffsets.y,
            this.arrowImageOffsets.w,
            this.arrowImageOffsets.h
          );

        }, this));
      }
    }
  })();


  /*  Components
    ------------------------------------- */

  BlotterSite.Components.Editor = function (el) {
    this.init.apply(this, arguments);
  };

  BlotterSite.Components.Editor.prototype = (function () {

    function _buildJSMirror (el, code) {
      return CodeMirror(el, {
        value: code,
        mode: "javascript",
        tabSize: 2,
        lineWrapping: true,
        lineNumbers: true
      });
    }

    function _buildHTMLMirror (el, code) {
      return CodeMirror(el, {
        value: code,
        mode: "html",
        tabSize: 2,
        lineWrapping: true,
        lineNumbers: true
      });
    }

    return {

      constructor : BlotterSite.Components.Editor,

      init : function (el) {
        this.el = el;
        this.outputEl = el.find(".output");

        this.jsCode = el.find("script.js-code").html().trim();
        this.htmlCode = this.outputEl.html().trim();
        this.jsContent = el.find(".js-content");
        this.htmlContent = el.find(".html-content");

        this.jsMirror = _buildJSMirror(this.jsContent[0], this.jsCode);
        this.htmlMirror = _buildHTMLMirror(this.htmlContent[0], this.htmlCode);

        this.jsMirror.on("change", _.bind(_.debounce(this.update, 1000), this));
        this.htmlMirror.on("change", _.bind(_.debounce(this.update, 1000), this));

        this.htmlDoc = this.htmlMirror.getDoc();
        this.jsDoc = this.jsMirror.getDoc();

        this.setupListeners();
        this.update();
        this.showJSContent();
      },

      setupListeners : function () {
        this.el.find(".js-tab").on("click", _.bind(this.showJSContent, this));
        this.el.find(".html-tab").on("click", _.bind(this.showHTMLContent, this));
      },

      update : function() {
        this.htmlMirror.setSize("auto", "auto");
        this.htmlCode = this.htmlDoc.getValue();
        try {
          this.outputEl.html(unescape(this.htmlCode));
        } catch (e) {
          console.log(e);
        }

        this.jsMirror.setSize("auto", "auto");
        this.jsCode = this.jsDoc.getValue();
        try {
          eval(this.jsCode); // yikes!
        } catch (e) {
          console.log(e);
        }
      },

      showJSContent : function () {
        this.htmlContent.hide();
        this.jsContent.show();
      },

      showHTMLContent : function () {
        this.jsContent.hide();
        this.htmlContent.show();
      },

      largestSize : function () {
        var htmlMirrorSize = this.htmlMirror.getScrollInfo(),
            jsMirrorSize = this.jsMirror.getScrollInfo(),
            size = {};

        size.width = Math.max(jsMirrorSize.width, htmlMirrorSize.width);
        size.height = Math.max(jsMirrorSize.height, htmlMirrorSize.height);

        return size;
      }
    }
  })();


  BlotterSite.Helpers.GlitchMarginalia = function (canvas) {
    this.init.apply(this, arguments);
  }

  BlotterSite.Helpers.GlitchMarginalia.prototype = (function () {
    var rtVertexSrc = [

      "varying vec2 _vTexCoord;",

      "void main() {",

      "  _vTexCoord = uv;",
      "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",

      "}"

    ].join("\n");

    var rtFragmentSrc = [

      "// Based heavily on https://thebookofshaders.com/13/ by Patricio Gonzalez Vivo",
      "// and https://www.shadertoy.com/view/MslGR8 by Hornet",

      "uniform vec2 uResolution;",
      "uniform vec2 uSamplerResolution;",
      "uniform sampler2D uSampler;",
      "uniform float uTime;",
      "uniform float uTimeOffset;",

      "varying vec2 _vTexCoord;",

      "float random (in vec2 st) {",
      "    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);",
      "}",

      "// Based on Morgan McGuire @morgan3d",
      "// https://www.shadertoy.com/view/4dS3Wd",
      "float noise (in vec2 st) {",
      "    vec2 i = floor(st);",
      "    vec2 f = fract(st);",

      "    // Four corners in 2D of a tile",
      "    float a = random(i);",
      "    float b = random(i + vec2(1.0, 0.0));",
      "    float c = random(i + vec2(0.0, 1.0));",
      "    float d = random(i + vec2(1.0, 1.0));",

      "    vec2 u = f * f * (3.0 - 2.0 * f);",

      "    return mix(a, b, u.x) + ",
      "            (c - a)* u.y * (1.0 - u.x) + ",
      "            (d - b) * u.x * u.y;",
      "}",

      "float fbm (in vec2 st, in float speed) {",
      "    // Initial values",
      "    float value = 0.0;",
      "    float amplitud = .5;",
      "    float frequency = 0.;",
      "    float offsetTime = (uTime + uTimeOffset);",

      "    // Loop of octaves",
      "    for (int i = 0; i < 6; i++) {",
      "        value += amplitud * noise(st + speed * offsetTime);",
      "        st *= 2.;",
      "        amplitud *= .5;",
      "    }",
      "    return value;",
      "}",

      "void combineColors( out vec4 adjustedColor, in vec4 bg, in vec4 color ) {",
      "    float a = color.a;",

      "    float r = (1.0 - a) * bg.r + a * color.r;",
      "    float g = (1.0 - a) * bg.g + a * color.g;",
      "    float b = (1.0 - a) * bg.b + a * color.b;",

      "    adjustedColor = vec4(r, g, b, 1.0);",
      "}",

      "void main () {",
      "    vec2 uv = _vTexCoord;",

      "    const float c0 = 128.0;",

      "    float offsetTime = (uTime + uTimeOffset);",
      "    float ditherSpeed = 0.5;",
      "    float fogSpeed = 0.7;",
      "    float spread = 2.0;",
      "    float mipLevel = 0.0;",

      "    float its = mix(0.0, 1.0 / c0, 0.985 + (0.015 * sin(ditherSpeed * offsetTime)));",
      "    float ofs = texture2D(uSampler, gl_FragCoord.xy / uSamplerResolution / spread, mipLevel).r;",

      "    vec3 ditherColor;",
      "    ditherColor = vec3(its + (ofs / 255.0));",
      "    ditherColor.rgb = floor(ditherColor.rgb * 255.0) / 255.0;",
      "    ditherColor.rgb *= c0;",

      "    vec2 st = uv;",
      "    st.x *= (uResolution.x / uResolution.y) / 2.0;",
      "    vec3 noise = vec3(0.0);",
      "    noise += fbm(st * 3.344, fogSpeed);",

      "    float alphaModifier = smoothstep(0.0, 1.0, (noise.r + noise.g + noise.b) / 3.0) - 0.185;",

      "    vec4 outColor = vec4(vec3(0.0), smoothstep(0.0, 0.65, (1.0 - min(ditherColor.r, min(ditherColor.g, ditherColor.b))) * alphaModifier));",
      "    combineColors(gl_FragColor, vec4(1.0), outColor);",
      "}"

    ].join("\n");

    var vertexSrc = [

      "varying vec2 _vTexCoord;",

      "void main() {",

      "  _vTexCoord = uv;",
      "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",

      "}"

    ].join("\n");

    var fragmentSrc = [
      "// Based on https://www.shadertoy.com/view/Md2GDw by Kusma",

      "uniform vec2 uResolution;",
      "uniform sampler2D uSampler;",
      "uniform float uTime;",
      "uniform float uTimeOffset;",

      "varying vec2 _vTexCoord;",

      "void rgbaFromRgb( out vec4 rgba, in vec3 rgb ) {",
      "  float a = 1.0 - min(rgb.r, min(rgb.g, rgb.b));",

      "  float r = 1.0 - (1.0 - rgb.r) / a;",
      "  float g = 1.0 - (1.0 - rgb.g) / a;",
      "  float b = 1.0 - (1.0 - rgb.b) / a;",

      "  rgba = vec4(r, g, b, a);",
      "}",

      "vec3 gamma(vec3 value, float param) {",
      "  return vec3(pow(abs(value.r), param),pow(abs(value.g), param),pow(abs(value.b), param));",
      "}",

      "vec4 invert(vec4 color) {",
      "  return vec4(",
      "    1.0 - color.r,",
      "    1.0 - color.g,",
      "    1.0 - color.b,",
      "    color.a",
      "  );",
      "}",

      "void main () {",
      "    vec2 uv = _vTexCoord;",
      "    float offsetTime = (uTime + uTimeOffset);",

      "    vec2 block = floor(gl_FragCoord.xy / vec2(64));",
      "    vec2 uv_noise = block / vec2(64);",
      "    uv_noise += floor(vec2(offsetTime)) / vec2(128);",

      "    float block_thresh = pow(fract((offsetTime * 0.5) * 1236.0453), 2.0) * 1.15;",

      "    vec2 uv_r = uv, uv_g = uv, uv_b = uv;",

      "    if (texture2D(uSampler, uv_noise).r < block_thresh ) {",
      "      vec2 dist = (fract(uv_noise) / uResolution.xy) * 8.25;",
      "      uv_r += dist * 1.65;",
      "      uv_g += dist * 1.05;",
      "      uv_b += dist * 1.795;",
      "    }",

      "    vec4 outColor;",
      "    outColor.r = texture2D(uSampler, uv_r).r;",
      "    outColor.g = texture2D(uSampler, uv_g).g;",
      "    outColor.b = texture2D(uSampler, uv_b).b;",

      "    rgbaFromRgb(outColor, outColor.rgb);",
      "    gl_FragColor = outColor;",

      "    // Uncomment to invert.",
      "    //rgbaFromRgb(outColor, gamma(outColor.rgb, 10.0));",
      "    //gl_FragColor = invert(outColor);",
      "}"

    ].join("\n");

    return {
      constructor : BlotterSite.Helpers.GlitchMarginalia,

      init : function (canvas) {
        this.canvas = canvas;
        this.$canvas = $(canvas);
        this.width = this.$canvas.width();
        this.height = this.$canvas.height();

        this.imageSrc = "images/glitch_marginalia_texture.png";
        this.imageWidth = 8;
        this.imageHeight = 8;

        this.rtVertexSrc = rtVertexSrc;
        this.rtFragmentSrc = rtFragmentSrc;

        this.vertexSrc = vertexSrc;
        this.fragmentSrc = fragmentSrc;

        this.startTime = new Date().getTime();
        this.timeOffset = _.random(0, 42);
      },

      build : function (callback) {
        this.texture = new THREE.TextureLoader().load(this.imageSrc, _.bind(function () {
          this.texture.wrapS = THREE.RepeatWrapping;
          this.texture.wrapT = THREE.RepeatWrapping;
          this.texture.minFilter = THREE.NearestMipMapNearestFilter;
          this.texture.magFilter = THREE.NearestFilter;
          this.texture.generateMipmaps = true;


          // Prepare Render Target scene.
          this.rtScene = new THREE.Scene();
          this.rtPlane =  new THREE.PlaneGeometry(1, 1);
          this.rtTexture = new THREE.WebGLRenderTarget(this.width, this.height);
          this.rtUniforms = {
            uResolution : { type : "2f", value : [this.width, this.height] },
            uSamplerResolution : { type : "2f", value : [this.imageWidth, this.imageHeight] },
            uTime : { type : "f", value : 0.0 },
            uTimeOffset : { type : "f", value : this.timeOffset },
            uSampler: { type: "t", value: this.texture }
          };
          this.rtMaterial = new THREE.ShaderMaterial({
            uniforms : this.rtUniforms,
            vertexShader : this.rtVertexSrc,
            fragmentShader : this.rtFragmentSrc,
          });
          this.rtMesh = new THREE.Mesh(this.rtPlane, this.rtMaterial);
          this.rtScene.add(this.rtMesh);


          // Prepare main scene.
          this.scene = new THREE.Scene();
          this.plane =  new THREE.PlaneGeometry(1, 1);
          this.uniforms = {
            uResolution : { type : "2f", value : [this.width, this.height] },
            uTime : { type : "f", value : 0.0 },
            uTimeOffset : { type : "f", value : this.timeOffset },
            uSampler: { type: "t", value: this.rtTexture.texture }
          };
          this.material = new THREE.ShaderMaterial({
            uniforms : this.uniforms,
            vertexShader : this.vertexSrc,
            fragmentShader : this.fragmentSrc,
          });
          this.mesh = new THREE.Mesh(this.plane, this.material);
          this.scene.add(this.mesh);

          this.camera = new THREE.OrthographicCamera(0.5, 0.5, 0.5, 0.5, 0, 100);
          this.renderer = new THREE.WebGLRenderer( { canvas : this.canvas, alpha : true } );
          this.renderer.autoClear = false;

          this._establishSize();
          this.animate();

          callback && callback();
        }, this));
      },

      animate : function () {
        requestAnimationFrame(_.bind(this.animate, this));
        this.render();
      },

      render : function () {
        var time = (new Date().getTime() - this.startTime) / 1000;
        this.rtMaterial.uniforms.uTime.value = time;
        this.material.uniforms.uTime.value = time;

        this.renderer.render(this.rtScene,this.camera, this.rtTexture, true);
        this.renderer.render(this.scene, this.camera);
      },

      resetSize : function () {
        this.width = this.$canvas.width();
        this.height = this.$canvas.height();
        this._establishSize();
      },

      _establishSize : function () {
        this.renderer.setSize(this.width, this.height);
        this.rtTexture.setSize(this.width, this.height);

        this.camera.left = this.width / - 2;
        this.camera.right = this.width / 2;
        this.camera.top = this.height / 2;
        this.camera.bottom = this.height / - 2;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        this.rtMesh.scale.set(this.width, this.height, 1);
        this.mesh.scale.set(this.width, this.height, 1);

        this.rtMaterial.uniforms.uResolution.value = [this.width, this.height];
        this.material.uniforms.uResolution.value = [this.width, this.height];

        if (this.height <= 26) {
          this.texture.wrapT = THREE.ClampToEdgeWrapping;
          this.texture.needsUpdate = true;
          this.textureNeedsWrapUpdate = true;
        } else if (this.textureNeedsWrapUpdate == true) {
          this.texture.wrapT = THREE.RepeatWrapping;
          this.texture.needsUpdate = true;
          this.textureNeedsWrapUpdate = false;
        }
      }
    }
  })();


  BlotterSite.Helpers.GlitchMarginaliaCanvas = function (generator, rect) {
    this.init.apply(this, arguments);
  }

  BlotterSite.Helpers.GlitchMarginaliaCanvas.prototype = (function () {

    function _buildCanvas () {
      var canvas = document.createElement("canvas");

      $(canvas).addClass("marginalia");

      return canvas;
    }

    return {
      constructor : BlotterSite.Helpers.GlitchMarginaliaCanvas,

      set rect (rect) {
        this.width = rect.w;
        this.height = rect.h;
        this.x = rect.x;
        this.y = rect.y;
        this._rect = rect;

        this._updateDomElement();
      },

      get rect () {
        return this._rect;
      },

      init : function (generator, rect) {
        this.generator = generator;
        this.pixelRatio = Blotter.CanvasUtils.pixelRatio;
        this.rect = rect;

        return this.domElement;
      },

      resetRect : function (appendToContainer) {
        this.rect = this.generator.randomRect();

        if (appendToContainer) {
          this.generator.container.append($(this.domElement));
        }
      },

      _updateDomElement : function () {
        this.domElement = this.domElement || _buildCanvas();

        this.domElement.width = this.width * this.pixelRatio;
        this.domElement.height = this.height * this.pixelRatio;
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";

        this.domElement.style.left = this.x + "px";
        this.domElement.style.top = this.y + "px";
      }
    }
  })();


  BlotterSite.Helpers.GlitchMarginaliaCanvasGenerator = function (container) {
    this.init.apply(this, arguments);
  }

  BlotterSite.Helpers.GlitchMarginaliaCanvasGenerator.prototype = (function () {

    return {
      constructor : BlotterSite.Helpers.GlitchMarginaliaCanvasGenerator,

      get padding () {
        return this._padding;
      },

      set padding (value) {
        this._padding = value;
        this._updateMinMax();
      },

      init : function (container) {
        this.container = $(container);
        this.width = container.width();
        this.height = container.height();

        this.padding = 52;

        this.sizes = [
          [26, 26],
          [26, 104],
          [26, 208],
          [26, 260],
          [26, 312],
          [26, 364],
          [26, 416],
          [52, 104],
          [52, 208],
          [52, 260],
          [52, 312],
          [52, 364],
          [52, 416],
          [104, 104],
          [104, 208],
          [104, 260],
          [104, 312],
          [104, 364],
          [104, 416]
        ];

        this.setListeners();
      },

      setListeners : function () {
        BlotterSite.instance.on("resize", _.bind(this.handleResize, this));
      },

      handleResize : function () {
        this.width = this.container.width();
        this.height = this.container.height();
        this._updateMinMax();
      },

      generate : function (append) {
        var marginaliaCanvas = new BlotterSite.Helpers.GlitchMarginaliaCanvas(this, this.randomRect());

        if (true) {
          this.container.append($(marginaliaCanvas.domElement));
        }

        return marginaliaCanvas;
      },

      randomRect : function () {
        var sizeChoice = this.sizes[_.random(0, this.sizes.length - 1)],
            iX = _.random(0, 1),
            iY = 1 - iX, // 0 or 1, opposite of iX
            width = sizeChoice[iX],
            height = sizeChoice[iY],
            maxOriginX = this.maxX - width,
            maxOriginY = this.maxY - height,
            originX = _.random(this.minX, maxOriginX),
            originY = _.random(this.minY, maxOriginY);

        return {
          x : originX,
          y : originY,
          w : width,
          h : height
        }
      },

      _updateMinMax : function () {
        this.minX = this._padding;
        this.minY = this._padding;
        this.maxX = this.width - this._padding;
        this.maxY = this.height - this._padding;
      }
    }
  })();


  BlotterSite.Helpers.GlitchMarginaliaCanvasManager = function($container, canvasCount) {
    this.init.apply(this, arguments);
  }

  BlotterSite.Helpers.GlitchMarginaliaCanvasManager.prototype = (function () {
    return {
      constructor: BlotterSite.Helpers.GlitchMarginaliaCanvasManager,

      init : function ($container, canvasCount) {
        this.$container = $container;
        this.canvasCount = canvasCount || 2;

        this.lifecycles = [1000, 1500, 2000, 2500, 3000, 4000];
        this.deathcycles = [0, 500, 1000, 1500, 2000, 2500, 3000, 4000, 6000, 6500, 7000, 7500, 8000, 9000, 9500];
        this.generator = new BlotterSite.Helpers.GlitchMarginaliaCanvasGenerator(this.$container);

        this.generateMarginalia();
      },

      updateSize : function () {
        this.generator.handleResize();
      },

      generateMarginalia : function () {
        this.generateMarginalia = _.reduce(new Array(this.canvasCount), _.bind(function (memo, nothing) {
          var canvas = this.generator.generate(true),
              glitch = new BlotterSite.Helpers.GlitchMarginalia(canvas.domElement);

          var marginalia = { canvas : canvas, glitch : glitch };

          glitch.build(_.bind(function () {
            this.applyMarginalia(marginalia);
          }, this));

          memo.push(marginalia);
          return memo;
        }, this), []);
      },

      applyMarginalia : function (marginalia) {
        var lifecycle = this.lifecycles[_.random(0, this.lifecycles.length - 1)];
        $(marginalia.canvas.domElement).show();
        marginalia.canvas.resetRect();
        marginalia.glitch.resetSize();

        (_.bind(function (marginalia, lifecycle) {
          _.delay(_.bind(function () {
            var deathcycle = this.deathcycles[_.random(0, this.deathcycles.length - 1)];
            $(marginalia.canvas.domElement).hide();

            (_.bind(function (marginalia, deathcycle) {
              _.delay(_.bind(function () {
                this.applyMarginalia(marginalia);
              }, this), deathcycle);
            }, this))(marginalia, deathcycle);
          }, this), lifecycle);
        }, this))(marginalia, lifecycle);
      }
    }
  })();


  /*  Models
    ------------------------------------- */

  BlotterSite.Models.Material = Backbone.Model.extend({
    defaults : {
      materialName : ""
    },

    material : function () {
      return window["BlotterSite"]["Materials"][this.get("materialName")];
    },

    path : function () {
      return "#/materials/" + this.get("materialName");
    }
  });


  /*  Collections
    ------------------------------------- */

  BlotterSite.Collections.Materials = Backbone.Collection.extend({
    model : BlotterSite.Models.Material
  })


  /*  Views
    ------------------------------------- */

  BlotterSite.Views.App = Marionette.LayoutView.extend({
    el : "#content",

    regions : {
      "navigationRegion" : ".navigation-region",
      "contentRegion" : ".content-region"
    },

    initialize : function () {
      this.router = new BlotterSite.Router();

      this.setListeners();

      this.render();
    },

    setListeners : function () {
      window.addEventListener("resize", _.bind(this._triggerResize, this), false);
    },

    render : function () {
      this.navigationView = new BlotterSite.Views.Navigation();
      this.navigationRegion.show(this.navigationView);
    },

    detachNav : function () {
      this.navigationRegion.empty({
        preventDestroy : true
      });
    },

    reattachNav : function () {
      this.navigationRegion.show(this.navigationView);
    },

    goto : function (view, options) {
      options = options || {};

      var previous = this.currentPage || null,
          next = view;

      $(window).scrollTop(0);

      this.showSpecifiedNavView(options.navView);
      this.contentRegion.show(next);

      BlotterSite.marginaliaManager.updateSize();
    },

    showSpecifiedNavView : function (navView) {
      if (navView) {
        this.detachNav();
        this.navigationRegion.show(navView);
      } else {
        this.reattachNav();
      }
    },

    _triggerResize : _.debounce(function(e) {
      this.trigger("resize");
    }, 250)
  });


  BlotterSite.Views.Navigation = Marionette.ItemView.extend((function () {
    var _logoMainImage = [
      "#ifdef GL_ES",
      "precision mediump float;",
      "#endif",


      "float rand(vec2 co){",
      "    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
      "}",


      "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
      "{",


      "    // Setup ========================================================================",

      "    vec2 uv = fragCoord.xy / uResolution.xy;",
      "    float time = uTime / 4.0;",

      "    vec4 finalColour = vec4(0.0);",


      "    // Create Heat Points ===========================================================",

      "    float heatDistanceScale = 35.0; // Larger value equates to smaller spread",

      "    // Define 2 heat points",
      "    float heatPoint1X = 0.5 - (sin(time) / 2.0);",
      "    float heatPoint1Y = 0.5 - ((cos(time) * abs(cos(time))) / 1.5);",
      "    vec2 heatPoint1Uv = vec2(heatPoint1X, heatPoint1Y) * uResolution.xy;",

      "    float heatPoint2X = 0.5 - (sin(time - 1.0) / 2.0);",
      "    float heatPoint2Y = 0.5 - ((cos(time - 1.0) * abs(cos(time))) / 1.0);",
      "    vec2 heatPoint2Uv = vec2(heatPoint2X, heatPoint2Y) * uResolution.xy;",

      "    // Calculate distances from current UV and combine",
      "    float heatPoint1Dist = smoothstep(0.0, 1.4, distance(fragCoord, heatPoint1Uv) / uResolution.y);",
      "    float heatPoint2Dist = smoothstep(0.0, 1.25, distance(fragCoord, heatPoint2Uv) / uResolution.y);",
      "    float combinedDist = (heatPoint1Dist * heatPoint2Dist);",

      "    // Invert and scale",
      "    float amount = 1.0 - smoothstep(0.15, 25.0, combinedDist * heatDistanceScale);",
      "    amount = smoothstep(-1.0, 1.0, amount);",


      "    // Create Darkness ==============================================================",

      "    const int darknessRadius = 10;",

      "    vec2 stepCoord = vec2(0.0);",
      "    vec2 stepUV = vec2(0.0);",

      "    vec4 stepSample = vec4(1.0);",
      "    vec4 darkestSample = vec4(1.0);",

      "    float stepDistance = 1.0;",

      "    vec2 maxDistanceCoord = fragCoord.xy + vec2(float(darknessRadius), 0.0);",
      "    vec2 maxDistanceUV = maxDistanceCoord.xy / uResolution.xy;",
      "    float maxDistance = distance(fragCoord, maxDistanceCoord);",

      "    float randNoise = rand(uv * sin(time * 0.025)) * 0.15;",

      "    // Find the darkest sample and some relevant meta data within a radius.",
      "    //   Note: You may notice some artifacts in our darkness. This is due to",
      "    //   us making steps on a `+=2` basis in the interest of performance. Play!",
      "    for (int i = -darknessRadius; i <= darknessRadius; i += 1) {",
      "        for (int j = -darknessRadius; j <= darknessRadius; j += 1) {",
      "            stepCoord = fragCoord + vec2(float(i), float(j));",
      "            stepUV = stepCoord / uResolution.xy;",
      "            stepSample = textTexture(stepUV);",
      "            vec4 sampleOnWhite = normalBlend(stepSample, vec4(1.0));",
      "            stepDistance = distance(fragCoord, stepCoord) / smoothstep(-1.0, 1.0, amount);",

      "            float stepDarkestSampleWeight = 1.0 - clamp((stepDistance / maxDistance), 0.0, 1.0) + randNoise;",
      "            stepDarkestSampleWeight *= smoothstep(0.0, 7.5, amount);",

      "            vec4 mixedStep = mix(darkestSample, sampleOnWhite, stepDarkestSampleWeight);",

      "            if (mixedStep == min(mixedStep, darkestSample) && stepDistance <= maxDistance) {",
      "                darkestSample = mixedStep;",
      "            }",
      "        }",
      "    }",

      "    float a = 1.0 - min(darkestSample.r, min(darkestSample.g, darkestSample.b));",

      "    float r = 1.0 - (1.0 - darkestSample.r) / a;",
      "    float g = 1.0 - (1.0 - darkestSample.g) / a;",
      "    float b = 1.0 - (1.0 - darkestSample.b) / a;",
      "    vec3 outRGB = vec3(r, g, b);",

      "    // Uncomment to add gradient coloring to logo",
      "    //vec3 leftColor = vec3(1.0, 0.6235294118, 0.09411764706); // Red",
      "    //vec3 rightColor = vec3(0.8470588235, 0.1215686275, 0.0); // Yellow",
      "    //outRGB += uv.x * leftColor;",
      "    //outRGB += (1.0 - uv.x) * rightColor;",

      "    mainImage = vec4(outRGB, a);",
      "}"
    ].join("\n");

    var _navMainImage = [
      "float when_gt(float x, float y) {",
      "  return max(sign(x - y), 0.0);",
      "}",

      "float when_lt(float x, float y) {",
      "  return max(sign(y - x), 0.0);",
      "}",

      "void mainImage(out vec4 mainImage, in vec2 fragCoord) {",
      "    vec2 uv = fragCoord.xy / uResolution.xy;",
      "    vec2 p = vec2(1.0) / uResolution.xy;",

      "    float stepDistance = 6.5 * p.y;",

      "    vec2 thresholdCenter = vec2(0.5);",
      "    float slope = 0.1;",
      "    float threshold = (slope * (uv.x - thresholdCenter.x)) + (thresholdCenter.y);",

      "    uv.x += (stepDistance * when_gt(uv.y, threshold) * hovering); // Shift right",
      "    uv.x -= (stepDistance * when_lt(uv.y, threshold) * hovering); // Shift left",

      "    mainImage = textTexture(uv);",
      "}"
    ].join("\n");

    return {
      template : _.template($("template[name=navigation]").html())(),

      navPathWhitelist : ["overview", "basics", "materials"],

      initialize : function (options) {
        _.defaults(this, options);

        this.startTime = new Date().getTime();
      },

      onRender : function () {
        this.prepareLogo();
        this.prepareNav();

        this.setListeners();
      },

      setListeners : function () {
        this.logoScope.on("render", _.bind(this.updateLogo, this));

        $("body").on("pathChange", _.bind(this.handlePathChange, this));
      },

      updateLogo : function () {
        var time = (new Date().getTime() - this.startTime) / 1000;

        this.logoScope.material.uniforms.uTime.value = time;
      },

      handlePathChange : function (e, dataId) {
        var nextPath = _.include(this.navPathWhitelist, dataId) ? dataId : false;

        this.dataId = nextPath;
        this.setNavForDataId();
      },

      setNavForDataId : function () {
        this.navEls.removeClass("active");
        this.navBlotter.material.uniforms.hovering.value = 0.0;

        if (this.dataId && this.navBlotterReady) {
          var el = this.$(".nav li a[data-reference-id='" + this.dataId + "']"),
              li = el.parent("li"),
              i = this.$(".nav li").index(li);

          el.addClass("active");

          this.navBlotter.forText(this.navTexts[i]).material.uniforms.hovering.value = 1.0;
        }
      },

      prepareLogo : function () {
        if (!this.logoBlotter) {
          var text = new Blotter.Text("Blotter", {
            family : "'SerapionPro', serif",
            size : 48,
            weight : 100,
            leading : "52px",
            paddingTop : 14,
            paddingLeft : 14,
            paddingRight : 14,
            fill : "#202020"
          });

          var material = new Blotter.ShaderMaterial(_logoMainImage, {
            uniforms : {
              uTime : { type : "1f", value : 0.0 }
            }
          });

          this.logoBlotter = new Blotter(material, {
            texts : text
          });

          this.logoScope = this.logoBlotter.forText(text);

          this.logoBlotter.on("ready", _.bind(function () {
            this.displayLogo();
          }, this));
        } else {
          this.displayLogo();
        }
      },

      prepareNav : function () {
        var navEls = this.$(".main-nav li a");

        if (!this.navBlotter || this.navEls != navEls) {
          this.navEls = navEls;

          var properties = {
            family : "'AvenirLTStd-Book', 'Helvetica', Arial, sans-serif",
            size : 14,
            weight : 100,
            leading : "50px",
            paddingLeft : 13,
            paddingRight : 13,
            paddingTop : 2,
            fill : "#202020"
          };

          this.navTexts = _.reduce(this.navEls, function(m, elem) {
            var text = new Blotter.Text($(elem).data("text"), properties);

            m.push(text);
            return m;
          }, []);

          var material = new Blotter.ShaderMaterial(_navMainImage, {
            uniforms : {
              hovering : { type : "1f", value : 0.0 }
            }
          });

          this.navBlotter = new Blotter(material, {
            texts : this.navTexts
          });

          this.navScopes = _.reduce(this.navEls, _.bind(function (m, elem) {
            var scope = this.navBlotter.forText(this.navTexts[m.length]);
            m.push(scope);
            return m;
          }, this), []);

          this.navBlotter.on("ready", _.bind(function () {
            this.displayNav();

            $("body").trigger("navReady");
          }, this));
        } else {
          this.displayNav();
        }
      },

      displayLogo : function () {
        this.logoScope.appendTo(this.$("#logo"));
      },

      displayNav : function () {
        _.each(this.navScopes, _.bind(function (scope, i) {
          var el = this.navEls[i];

          scope.appendTo(el);

          scope.on("mouseenter", (function (scope) {
            return function () {
              scope.material.uniforms.hovering.value = 1.0;
            }
          })(scope));

          scope.on("mouseleave", (function (scope) {
            return function () {
              var anchor = $(scope.domElement).parent("a");

              if (!anchor.hasClass("active")) {
                scope.material.uniforms.hovering.value = 0.0;
              }
            }
          })(scope));
        }, this));

        this.navBlotterReady = true;

        this.setNavForDataId();
      }
    }
  })());


  BlotterSite.Views.BackNavigation = Marionette.ItemView.extend({
    template : _.template("<div><div class='inner-navigation-wrap'><ul class='nav back-nav'><li><a href='#'><span class='arrow-left'></span> FULL BLOTTER DOCUMENTATION</a></li></ul></div></div>")(),
    events : {
      "click a" : "handleBackArrowClicked"
    },

    handleBackArrowClicked : function (e) {
      e.preventDefault();

      if (Backbone.history.history.length > 2) {
        Backbone.history.history.back();
      } else {
        Backbone.history.navigate("#/", true);
      }
    }
  })

  BlotterSite.Views.Home = Marionette.LayoutView.extend({
    className : "home",
    template : _.template($("template[name=home]").html())(),
    regions : {
      "heroBlotterRegion" : ".hero-blotter"
    },

    onRender : function () {
      this.dropwdownEl = this.$el.find(".dropdown-select");
      this.dropdownSelect = new BlotterSite.Helpers.DropdownSelect(this.dropwdownEl);

      this.downloadBtn = this.$el.find(".download-btn");

      this._setExample();

      this.setupListeners();
    },

    onShow : function () {
      this.heroBlotterRegion.show(this.exampleView);
    },

    _setExample : function () {
      var materialName = "LiquidDistortMaterial";

      var $container = this.$el.find(".hero-blotter"),
          Example = window["BlotterSite"]["HeroExamples"][materialName];

      this.exampleView= new Example($container);
    },

    setupListeners : function () {
      this.dropdownSelect.on("selectionMade", _.bind(this.handleSelectionMade, this));
    },

    handleSelectionMade : function (value, title) {
      this.downloadBtn.attr("href", value);
    }
  });


  BlotterSite.Views.Overview = Marionette.ItemView.extend({
    className : "overview",
    template : _.template($("template[name=overview]").html())()
  });


  BlotterSite.Views.Basics = Marionette.ItemView.extend({
    className : "basics",
    template : _.template($("template[name=basics]").html())(),

    onShow : function () {
      _.delay(_.bind(this.setupEditors, this), 100);
    },

    setupEditors : function () {
      this.editors = _.reduce(this.$el.find(".tabbed-editor"), function (m, el) {
        m.push(new BlotterSite.Components.Editor($(el)));
        return m;
      }, []);
    }
  });


  BlotterSite.Views.MaterialListItem = Marionette.ItemView.extend({
    tagName : "li",
    events : {
      "click" : "handleClick"
    },

    initialize : function (options) {
      _.extend(this, options);

      var templateHTMLStr = [
        "<div>",
        "  <div class='material-overlay'>",
        "    <span class='material-name'><%= materialName %></span>",
        "  </div>",
        "</div>"
      ].join("");

      this.template = _.template(templateHTMLStr)(this.model.toJSON());

      this.text = new Blotter.Text(this.textStr, this.textProperties);
    },

    onRender : function () {
      var Material = this.model.material();
      this.materialInstance = new Material(this.$el, this.text);
    },

    onDestroy : function () {
      this.materialInstance.blotter.stop();
      this.materialInstance.blotter.teardown();
    },

    handleClick : function (e) {
      e && e.preventDefault();

      Backbone.history.navigate(this.model.path());
    }
  });


  BlotterSite.Views.MaterialsList = Marionette.CompositeView.extend({
    childView : BlotterSite.Views.MaterialListItem,
    childViewContainer : "ul.materials-list",
    template : _.template("<div><ul class='materials-list'></ul></div>")(),

    childViewOptions : function () {
      return {
        textStr : this.textStr,
        textProperties : this.textProperties
      };
    },

    initialize : function (options) {
      _.extend(this, options);

      this.textStr = "B";
      this.textProperties = {
        family : "'SerapionPro', serif",
        size : 68,
        leading : "68px",
        paddingBottom : 6,
        paddingLeft : 40,
        paddingRight : 40,
        paddingTop : 26,
        fill : "#202020"
      };

      this.collection = new BlotterSite.Collections.Materials([
        { materialName : "ChannelSplitMaterial" },
        { materialName : "FliesMaterial" },
        { materialName : "LiquidDistortMaterial" },
        { materialName : "RollingDistortMaterial" },
        { materialName : "SlidingDoorMaterial" }
      ]);
    }
  });


  BlotterSite.Views.Materials = Marionette.LayoutView.extend({
    className : "materials",
    template : _.template($("template[name=materials]").html())(),
    regions : {
      "materialsListRegion" : ".materials-list-region"
    },

    onRender : function () {
      this.materialsListView = new BlotterSite.Views.MaterialsList();
      this.materialsListRegion.show(this.materialsListView);
    }
  });

  BlotterSite.Views.Material = Marionette.ItemView.extend({
    className : "materials",

    initialize : function (options) {
      _.defaults(this, options);

      this.template = BlotterSite.Utils.renderFromUrl("./materials/" + this.materialName + ".html", this.templateOptions);

      this.textStr = "B";

      this.textProperties = {
        family : "'SerapionPro', serif",
        size : 68,
        leading : "68px",
        paddingBottom : 126,
        paddingLeft : 140,
        paddingRight : 140,
        paddingTop : 126,
        fill : "#202020"
      };
    },

    onRender : function () {
      this._setBlotter();
      this._setNotation();
    },

    onDestroy : function () {
      this.materialInstance.blotter.stop();
      this.materialInstance.blotter.teardown();
      this.gui.destroy();
    },

    _setBlotter : function () {
      var Material = window["BlotterSite"]["Materials"][this.materialName],
          $container = $("<div class='material-example-wrap'></div>");

      this.$(".content").prepend($container);

      this.blotterText = new Blotter.Text(this.textStr, this.textProperties);

      this.materialInstance = new Material($container, this.blotterText);

      this.gui = new dat.GUI();

      var controls = _.reduce(this.materialInstance.uniformDefinitions, function (memo, uniformObj) {
        memo[uniformObj.name] = uniformObj.value;
        return memo;
      }, {});

      _.each(this.materialInstance.uniformDefinitions, function (uniformObj) {
        this.gui.add(controls, uniformObj.name, uniformObj.min, uniformObj.max).onChange(uniformObj.onChange);
        if (uniformObj.setImmediate) {
          uniformObj.onChange(uniformObj.value);
        }
      }.bind(this));
    },

    _setNotation : function () {
      var $notation = this.$(".notated-list");

      _.each($notation, _.bind(function (el) {
        new BlotterSite.Helpers.Notation($(el), {
          lineHeight: 26
        });
      }, this));
    }
  });


  BlotterSite.Views.Documentation = Marionette.ItemView.extend({
    className : "documentation",
    template : _.template($("template[name=documentation]").html())(),

    onRender : function () {
      this._setNotation();
    },

    _setNotation : function () {
      var $notation = this.$(".notated-list");

      _.each($notation, _.bind(function (el) {
        new BlotterSite.Helpers.Notation($(el), {
          lineHeight: 26
        });
      }, this));
    }
  });
}());
