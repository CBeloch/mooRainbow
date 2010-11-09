// MooTools: the javascript framework.
// Load this file's selection again by visiting: http://mootools.net/more/f1f839f988abcf30b1c8b43d4fa34891 
// Or build this file again with packager using: packager build More/Slider More/Color
/*
---
copyrights:
  - [MooTools](http://mootools.net)

Slider, Drag, Color

licenses:
  - [MIT License](http://mootools.net/license.txt)
...
*/
MooTools.More={version:"1.3.0.1",build:"6dce99bed2792dffcbbbb4ddc15a1fb9a41994b5"};Class.Mutators.Binds=function(a){return a;};Class.Mutators.initialize=function(a){return function(){Array.from(this.Binds).each(function(b){var c=this[b];
if(c){this[b]=c.bind(this);}},this);return a.apply(this,arguments);};};var Drag=new Class({Implements:[Events,Options],options:{snap:6,unit:"px",grid:false,style:true,limit:false,handle:false,invert:false,preventDefault:false,stopPropagation:false,modifiers:{x:"left",y:"top"}},initialize:function(){var b=Array.link(arguments,{options:Type.isObject,element:function(c){return c!=null;
}});this.element=document.id(b.element);this.document=this.element.getDocument();this.setOptions(b.options||{});var a=typeOf(this.options.handle);this.handles=((a=="array"||a=="collection")?$$(this.options.handle):document.id(this.options.handle))||this.element;
this.mouse={now:{},pos:{}};this.value={start:{},now:{}};this.selection=(Browser.ie)?"selectstart":"mousedown";if(Browser.ie&&!Drag.ondragstartFixed){document.ondragstart=Function.from(false);
Drag.ondragstartFixed=true;}this.bound={start:this.start.bind(this),check:this.check.bind(this),drag:this.drag.bind(this),stop:this.stop.bind(this),cancel:this.cancel.bind(this),eventStop:Function.from(false)};
this.attach();},attach:function(){this.handles.addEvent("mousedown",this.bound.start);return this;},detach:function(){this.handles.removeEvent("mousedown",this.bound.start);
return this;},start:function(a){var k=this.options;if(a.rightClick){return;}if(k.preventDefault){a.preventDefault();}if(k.stopPropagation){a.stopPropagation();
}this.mouse.start=a.page;this.fireEvent("beforeStart",this.element);var c=k.limit;this.limit={x:[],y:[]};var j=this.element.getStyles("left","right","top","bottom");
this._invert={x:k.modifiers.x=="left"&&j.left=="auto"&&!isNaN(j.right.toInt())&&(k.modifiers.x="right"),y:k.modifiers.y=="top"&&j.top=="auto"&&!isNaN(j.bottom.toInt())&&(k.modifiers.y="bottom")};
var e,g;for(e in k.modifiers){if(!k.modifiers[e]){continue;}var b=this.element.getStyle(k.modifiers[e]);if(b&&!b.match(/px$/)){if(!g){g=this.element.getCoordinates(this.element.getOffsetParent());
}b=g[k.modifiers[e]];}if(k.style){this.value.now[e]=(b||0).toInt();}else{this.value.now[e]=this.element[k.modifiers[e]];}if(k.invert){this.value.now[e]*=-1;
}if(this._invert[e]){this.value.now[e]*=-1;}this.mouse.pos[e]=a.page[e]-this.value.now[e];if(c&&c[e]){var d=2;while(d--){var f=c[e][d];if(f||f===0){this.limit[e][d]=(typeof f=="function")?f():f;
}}}}if(typeOf(this.options.grid)=="number"){this.options.grid={x:this.options.grid,y:this.options.grid};}var h={mousemove:this.bound.check,mouseup:this.bound.cancel};
h[this.selection]=this.bound.eventStop;this.document.addEvents(h);},check:function(a){if(this.options.preventDefault){a.preventDefault();}var b=Math.round(Math.sqrt(Math.pow(a.page.x-this.mouse.start.x,2)+Math.pow(a.page.y-this.mouse.start.y,2)));
if(b>this.options.snap){this.cancel();this.document.addEvents({mousemove:this.bound.drag,mouseup:this.bound.stop});this.fireEvent("start",[this.element,a]).fireEvent("snap",this.element);
}},drag:function(b){var a=this.options;if(a.preventDefault){b.preventDefault();}this.mouse.now=b.page;for(var c in a.modifiers){if(!a.modifiers[c]){continue;
}this.value.now[c]=this.mouse.now[c]-this.mouse.pos[c];if(a.invert){this.value.now[c]*=-1;}if(this._invert[c]){this.value.now[c]*=-1;}if(a.limit&&this.limit[c]){if((this.limit[c][1]||this.limit[c][1]===0)&&(this.value.now[c]>this.limit[c][1])){this.value.now[c]=this.limit[c][1];
}else{if((this.limit[c][0]||this.limit[c][0]===0)&&(this.value.now[c]<this.limit[c][0])){this.value.now[c]=this.limit[c][0];}}}if(a.grid[c]){this.value.now[c]-=((this.value.now[c]-(this.limit[c][0]||0))%a.grid[c]);
}if(a.style){this.element.setStyle(a.modifiers[c],this.value.now[c]+a.unit);}else{this.element[a.modifiers[c]]=this.value.now[c];}}this.fireEvent("drag",[this.element,b]);
},cancel:function(a){this.document.removeEvents({mousemove:this.bound.check,mouseup:this.bound.cancel});if(a){this.document.removeEvent(this.selection,this.bound.eventStop);
this.fireEvent("cancel",this.element);}},stop:function(b){var a={mousemove:this.bound.drag,mouseup:this.bound.stop};a[this.selection]=this.bound.eventStop;
this.document.removeEvents(a);if(b){this.fireEvent("complete",[this.element,b]);}}});Element.implement({makeResizable:function(a){var b=new Drag(this,Object.merge({modifiers:{x:"width",y:"height"}},a));
this.store("resizer",b);return b.addEvent("drag",function(){this.fireEvent("resize",b);}.bind(this));}});(function(){var a=function(d,c){var e=[];Object.each(c,function(f){Object.each(f,function(g){d.each(function(h){e.push(h+"-"+g+(h=="border"?"-width":""));
});});});return e;};var b=function(e,d){var c=0;Object.each(d,function(g,f){if(f.test(e)){c=c+g.toInt();}});return c;};Element.implement({measure:function(h){var d=function(j){return !!(!j||j.offsetHeight||j.offsetWidth);
};if(d(this)){return h.apply(this);}var g=this.getParent(),i=[],e=[];while(!d(g)&&g!=document.body){e.push(g.expose());g=g.getParent();}var f=this.expose();
var c=h.apply(this);f();e.each(function(j){j();});return c;},expose:function(){if(this.getStyle("display")!="none"){return function(){};}var c=this.style.cssText;
this.setStyles({display:"block",position:"absolute",visibility:"hidden"});return function(){this.style.cssText=c;}.bind(this);},getDimensions:function(c){c=Object.merge({computeSize:false},c);
var h={x:0,y:0};var g=function(i,e){return(e.computeSize)?i.getComputedSize(e):i.getSize();};var d=this.getParent("body");if(d&&this.getStyle("display")=="none"){h=this.measure(function(){return g(this,c);
});}else{if(d){try{h=g(this,c);}catch(f){}}}return Object.append(h,(h.x||h.x===0)?{width:h.x,height:h.y}:{x:h.width,y:h.height});},getComputedSize:function(c){c=Object.merge({styles:["padding","border"],planes:{height:["top","bottom"],width:["left","right"]},mode:"both"},c);
var e={},d={width:0,height:0};if(c.mode=="vertical"){delete d.width;delete c.planes.width;}else{if(c.mode=="horizontal"){delete d.height;delete c.planes.height;
}}a(c.styles,c.planes).each(function(f){e[f]=this.getStyle(f).toInt();},this);Object.each(c.planes,function(g,f){var h=f.capitalize();e[f]=this.getStyle(f).toInt();
d["total"+h]=e[f];g.each(function(j){var i=b(j,e);d["computed"+j.capitalize()]=i;d["total"+h]+=i;});},this);return Object.append(d,e);}});})();var Slider=new Class({Implements:[Events,Options],Binds:["clickedElement","draggedKnob","scrolledElement"],options:{onTick:function(a){if(this.options.snap){a=this.toPosition(this.step);
}this.knob.setStyle(this.property,a);},initialStep:0,snap:false,offset:0,range:false,wheel:false,steps:100,mode:"horizontal"},initialize:function(f,a,e){this.setOptions(e);
this.element=document.id(f);this.knob=document.id(a);this.previousChange=this.previousEnd=this.step=-1;var g,b={},d={x:false,y:false};switch(this.options.mode){case"vertical":this.axis="y";
this.property="top";g="offsetHeight";break;case"horizontal":this.axis="x";this.property="left";g="offsetWidth";}this.full=this.element.measure(function(){this.half=this.knob[g]/2;
return this.element[g]-this.knob[g]+(this.options.offset*2);}.bind(this));this.setRange(this.options.range);this.knob.setStyle("position","relative").setStyle(this.property,-this.options.offset);
d[this.axis]=this.property;b[this.axis]=[-this.options.offset,this.full-this.options.offset];var c={snap:0,limit:b,modifiers:d,onDrag:this.draggedKnob,onStart:this.draggedKnob,onBeforeStart:(function(){this.isDragging=true;
}).bind(this),onCancel:function(){this.isDragging=false;}.bind(this),onComplete:function(){this.isDragging=false;this.draggedKnob();this.end();}.bind(this)};
if(this.options.snap){c.grid=Math.ceil(this.stepWidth);c.limit[this.axis][1]=this.full;}this.drag=new Drag(this.knob,c);this.attach();if(this.options.initialStep!=null){this.set(this.options.initialStep);
}},attach:function(){this.element.addEvent("mousedown",this.clickedElement);if(this.options.wheel){this.element.addEvent("mousewheel",this.scrolledElement);
}this.drag.attach();return this;},detach:function(){this.element.removeEvent("mousedown",this.clickedElement);this.element.removeEvent("mousewheel",this.scrolledElement);
this.drag.detach();return this;},set:function(a){if(!((this.range>0)^(a<this.min))){a=this.min;}if(!((this.range>0)^(a>this.max))){a=this.max;}this.step=Math.round(a);
this.checkStep();this.fireEvent("tick",this.toPosition(this.step));this.end();return this;},setRange:function(a,b){this.min=Array.pick([a[0],0]);this.max=Array.pick([a[1],this.options.steps]);
this.range=this.max-this.min;this.steps=this.options.steps||this.full;this.stepSize=Math.abs(this.range)/this.steps;this.stepWidth=this.stepSize*this.full/Math.abs(this.range);
this.set(Array.pick([b,this.step]).floor(this.min).max(this.max));return this;},clickedElement:function(c){if(this.isDragging||c.target==this.knob){return;
}var b=this.range<0?-1:1;var a=c.page[this.axis]-this.element.getPosition()[this.axis]-this.half;a=a.limit(-this.options.offset,this.full-this.options.offset);
this.step=Math.round(this.min+b*this.toStep(a));this.checkStep();this.fireEvent("tick",a);this.end();},scrolledElement:function(a){var b=(this.options.mode=="horizontal")?(a.wheel<0):(a.wheel>0);
this.set(b?this.step-this.stepSize:this.step+this.stepSize);a.stop();},draggedKnob:function(){var b=this.range<0?-1:1;var a=this.drag.value.now[this.axis];
a=a.limit(-this.options.offset,this.full-this.options.offset);this.step=Math.round(this.min+b*this.toStep(a));this.checkStep();},checkStep:function(){if(this.previousChange!=this.step){this.previousChange=this.step;
this.fireEvent("change",this.step);}},end:function(){if(this.previousEnd!==this.step){this.previousEnd=this.step;this.fireEvent("complete",this.step+"");
}},toStep:function(a){var b=(a+this.options.offset)*this.stepSize/this.full*this.steps;return this.options.steps?Math.round(b-=b%this.stepSize):b;},toPosition:function(a){return(this.full*Math.abs(this.min-a))/(this.steps*this.stepSize)-this.options.offset;
}});(function(){var d=this.Color=new Type("Color",function(f,g){if(arguments.length>=3){g="rgb";f=Array.slice(arguments,0,3);}else{if(typeof f=="string"){if(f.match(/rgb/)){f=f.rgbToHex().hexToRgb(true);
}else{if(f.match(/hsb/)){f=f.hsbToRgb();}else{f=f.hexToRgb(true);}}}}g=g||"rgb";switch(g){case"hsb":var e=f;f=f.hsbToRgb();f.hsb=e;break;case"hex":f=f.hexToRgb(true);
break;}f.rgb=f.slice(0,3);f.hsb=f.hsb||f.rgbToHsb();f.hex=f.rgbToHex();return Object.append(f,this);});d.implement({mix:function(){var e=Array.slice(arguments);
var g=(typeOf(e.getLast())=="number")?e.pop():50;var f=this.slice();e.each(function(h){h=new d(h);for(var j=0;j<3;j++){f[j]=Math.round((f[j]/100*(100-g))+(h[j]/100*g));
}});return new d(f,"rgb");},invert:function(){return new d(this.map(function(e){return 255-e;}));},setHue:function(e){return new d([e,this.hsb[1],this.hsb[2]],"hsb");
},setSaturation:function(e){return new d([this.hsb[0],e,this.hsb[2]],"hsb");},setBrightness:function(e){return new d([this.hsb[0],this.hsb[1],e],"hsb");
}});var b=function(h,f,e){return new d([h,f,e],"rgb");};var a=function(g,f,e){return new d([g,f,e],"hsb");};var c=function(e){return new d(e,"hex");};Array.implement({rgbToHsb:function(){var f=this[0],g=this[1],n=this[2],k=0;
var m=Math.max(f,g,n),i=Math.min(f,g,n);var o=m-i;var l=m/255,j=(m!=0)?o/m:0;if(j!=0){var h=(m-f)/o;var e=(m-g)/o;var p=(m-n)/o;if(f==m){k=p-e;}else{if(g==m){k=2+h-p;
}else{k=4+e-h;}}k/=6;if(k<0){k++;}}return[Math.round(k*360),Math.round(j*100),Math.round(l*100)];},hsbToRgb:function(){var h=Math.round(this[2]/100*255);
if(this[1]==0){return[h,h,h];}else{var e=this[0]%360;var j=e%60;var k=Math.round((this[2]*(100-this[1]))/10000*255);var i=Math.round((this[2]*(6000-this[1]*j))/600000*255);
var g=Math.round((this[2]*(6000-this[1]*(60-j)))/600000*255);switch(Math.floor(e/60)){case 0:return[h,g,k];case 1:return[i,h,k];case 2:return[k,h,g];case 3:return[k,i,h];
case 4:return[g,k,h];case 5:return[h,k,i];}}return false;}});String.implement({rgbToHsb:function(){var e=this.match(/\d{1,3}/g);return(e)?e.rgbToHsb():null;
},hsbToRgb:function(){var e=this.match(/\d{1,3}/g);return(e)?e.hsbToRgb():null;}});})();