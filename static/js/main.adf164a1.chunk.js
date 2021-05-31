(this["webpackJsonpreact-maze"]=this["webpackJsonpreact-maze"]||[]).push([[0],{10:function(e,t,n){"use strict";n.r(t);var i=n(2),a=n.n(i),r=n(7),s=n(3),c=n(4),o=n(6),u=n(5),h=n(1),d=n.n(h),l=n(9),p=n.n(l),f=(n(16),n(0)),v=function(e){Object(o.a)(n,e);var t=Object(u.a)(n);function n(e){var i;Object(s.a)(this,n);var a=(i=t.call(this,e)).generateMaze(40,30);return i.state={size:40,complextiy:30,maze:a,visited:[],path:[],futureSize:40,futureComplexity:30,abort:2},i}return Object(c.a)(n,[{key:"generateMaze",value:function(e,t){for(;;){for(var n=e*e,i=[],a=1;a<n-1;a++)i.push(a);(i=this.randomlySortArray(i)).push(i[0]),i[0]=n,i.push(n);for(var r=Array(n).fill(null),s=0;s<n;s++)if(!(i[s]<n*t/100)){var c=new m(s);s%e!==0&&null!==r[s-1]&&(c.connect(r[s-1],1),r[s-1].connect(c,1)),s>=e&&null!==r[s-e]&&(c.connect(r[s-e],1),r[s-e].connect(c,1)),r[s]=c}if(0!==r[0].getConnections().length||0!==r[n-1].getConnections().length)if(null!==this.aStar(r[0],r[n-1],(function(t,n){var i=t.getKey(),a=n.getKey();return 2*(Math.abs(a%e-i%e)+Math.abs(Math.floor(a/e)-Math.floor(i/e)))})))return r}}},{key:"randomlySortArray",value:function(e){for(var t,n,i=e.length;i>0;)t=Math.floor(Math.random()*i),n=e[--i],e[i]=e[t],e[t]=n;return e}},{key:"aStar",value:function(e,t,n){var i,a=[],r=[];for(e.getConnections().forEach((function(t){a.push({vertex:t.vertex,distance:t.distance,path:[e,t[0]]})}));a.length>0;){if((i=a[0]).vertex===t)return{distance:i.distance,path:i.path};i.vertex.getConnections().forEach((function(e){var s=a.find((function(t){return t.vertex===e.vertex}));if(void 0!==s){if(s.distance>i.distance+e.distance){s.distance=i.distance+e.distance,s.path=i.path.concat([e.vertex]);var c=a.findIndex((function(a){return a.distance+n(a.vertex,t)>=i.distance+e.distance+n(e.vertex,t)}));c=void 0===c?a.length-1:c,a.splice(a.indexOf(s),1),a.splice(c,0,s)}}else if(void 0!==(s=r.find((function(t){return t.vertex===e.vertex})))){if(s.distance>i.distance+e.distance){s.distance=i.distance+e.distance,s.path=i.path.concat([e.vertex]);var o=a.findIndex((function(a){return a.distance+n(a.vertex,t)>=i.distance+e.distance+n(e.vertex,t)}));o=void 0===o?a.length-1:o,a.splice(o,0,s),r.splice(r.indexOf(s),1)}}else{var u=a.findIndex((function(a){return a.distance+n(a.vertex,t)>=i.distance+e.distance+n(e.vertex,t)}));u=void 0===u?a.length-1:u,a.splice(u,0,{vertex:e.vertex,distance:i.distance+e.distance,path:i.path.concat([e.vertex])})}})),r.push(i),a.splice(a.indexOf(i),1)}return null}},{key:"aStarVisualised",value:function(){var e=Object(r.a)(a.a.mark((function e(t,n,i){var r,s,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=[],s=[],t.getConnections().forEach((function(e){r.push({vertex:e.vertex,distance:e.distance,path:[t,e.vertex]})}));case 3:if(!(r.length>0)){e.next=18;break}if((c=r[0]).vertex!==n){e.next=9;break}return this.visualise(s.map((function(e){return e.vertex})),c.path),this.abort(),e.abrupt("return",{distance:c.distance,path:c.path});case 9:if(c.vertex.getConnections().forEach((function(e){var t=r.find((function(t){return t.vertex===e.vertex}));if(void 0!==t){if(t.distance>c.distance+e.distance){t.distance=c.distance+e.distance,t.path=c.path.concat([e.vertex]);var a=r.findIndex((function(t){return t.distance+i(t.vertex,n)>=c.distance+e.distance+i(e.vertex,n)}));a=void 0===a?r.length-1:a,r.splice(r.indexOf(t),1),r.splice(a,0,t)}}else if(void 0!==(t=s.find((function(t){return t.vertex===e.vertex})))){if(t.distance>c.distance+e.distance){t.distance=c.distance+e.distance,t.path=c.path.concat([e.vertex]);var o=r.findIndex((function(t){return t.distance+i(t.vertex,n)>=c.distance+e.distance+i(e.vertex,n)}));o=void 0===o?r.length-1:o,r.splice(o,0,t),s.splice(s.indexOf(t),1)}}else{var u=r.findIndex((function(t){return t.distance+i(t.vertex,n)>=c.distance+e.distance+i(e.vertex,n)}));u=void 0===u?r.length-1:u,r.splice(u,0,{vertex:e.vertex,distance:c.distance+e.distance,path:c.path.concat([e.vertex])})}})),s.push(c),r.splice(r.indexOf(c),1),1!==this.visualise(s.map((function(e){return e.vertex})),c.path)){e.next=14;break}return e.abrupt("return",null);case 14:return e.next=16,new Promise((function(e){return setTimeout(e,20)}));case 16:e.next=3;break;case 18:return this.abort(),e.abrupt("return",null);case 20:case"end":return e.stop()}}),e,this)})));return function(t,n,i){return e.apply(this,arguments)}}()},{key:"visualise",value:function(e,t){return void 0!==this.state&&1===this.state.abort?(this.abort(),1):(this.setState({visited:e,path:t}),0)}},{key:"abort",value:function(){this.setState({abort:2})}},{key:"heuristic",value:function(e,t){var n=e.getKey(),i=t.getKey();return 2*(Math.abs(i%this.state.size-n%this.state.size)+Math.abs(Math.floor(i/this.state.size)-Math.floor(n/this.state.size)))}},{key:"restart",value:function(){var e=Object(r.a)(a.a.mark((function e(){var t,n=this;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==this.state.abort){e.next=5;break}this.setState({abort:1});case 2:return e.next=4,new Promise((function(e){return setTimeout(e,10)}));case 4:if(1===this.state.abort){e.next=2;break}case 5:this.setState({abort:0}),t=this.state.maze,this.aStarVisualised(t[0],t[t.length-1],(function(e,t){return n.heuristic(e,t)}));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"regenerate",value:function(){var e=Object(r.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==this.state.abort){e.next=5;break}this.setState({abort:1});case 2:return e.next=4,new Promise((function(e){return setTimeout(e,10)}));case 4:if(1===this.state.abort){e.next=2;break}case 5:this.setState({abort:2}),t=this.generateMaze(this.state.futureSize,this.state.futureComplexity),this.setState({maze:t,size:this.state.futureSize,complexity:this.state.futureComplexity,path:[],visited:[]});case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(f.jsxs)("div",{className:"game",children:[Object(f.jsx)("div",{className:"gamemaze",children:Object(f.jsx)(j,{maze:this.state.maze,mazeSize:this.state.size,visited:this.state.visited,path:this.state.path})}),Object(f.jsxs)("div",{className:"options",children:[Object(f.jsx)("div",{className:"buttons",children:Object(f.jsx)(b,{restart:function(){e.restart()},regenerate:function(){e.regenerate()}})}),Object(f.jsx)("div",{className:"sliders",children:Object(f.jsx)(x,{complexity:this.state.futureComplexity,size:this.state.futureSize,changeSize:function(t){e.setState({futureSize:t})},changeComplexity:function(t){e.setState({futureComplexity:t})}})})]})]})}}]),n}(d.a.Component),x=function(e){Object(o.a)(n,e);var t=Object(u.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{className:"sizeslider, slidercontainer",children:[Object(f.jsx)("label",{children:"Size:       "}),Object(f.jsx)("input",{type:"range",min:"20",max:"60",value:this.props.size,className:"slider",onInput:function(t){e.props.changeSize(t.target.value)}}),Object(f.jsx)("span",{children:this.props.size})]}),Object(f.jsxs)("div",{className:"complexityslider, slidercontainer",children:[Object(f.jsx)("label",{children:"Complexity: "}),Object(f.jsx)("input",{type:"range",min:"20",max:"40",value:this.props.complexity,className:"slider",onInput:function(t){e.props.changeComplexity(t.target.value)}}),Object(f.jsx)("span",{children:this.props.complexity})]})]})}}]),n}(d.a.Component),b=function(e){Object(o.a)(n,e);var t=Object(u.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return Object(f.jsx)("div",{children:Object(f.jsxs)("div",{className:"buttoncontainer",children:[Object(f.jsx)("input",{type:"button",value:"Start",className:"button",onClick:function(){return e.props.restart()}}),Object(f.jsx)("input",{type:"button",value:"Regenerate",className:"button",onClick:function(){return e.props.regenerate()}})]})})}}]),n}(d.a.Component),j=function(e){Object(o.a)(n,e);var t=Object(u.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){for(var e=this.props.mazeSize,t=this.props.maze,n=this.props.visited,i=this.props.path,a=[],r=0;r<e;r++){for(var s=[],c=0;c<e;c++){var o=null===t[r*e+c]?"blocked":"unfilled";n.indexOf(t[r*e+c])>-1&&(o="visited"),i.indexOf(t[r*e+c])>-1&&(o="path"),0===r&&0===c&&(o="start"),r===e-1&&c===e-1&&(o="end");var u=window.innerHeight/3/e+"px",h="none";null===t[r*e+c]&&(u="",h="",r>0&&null===t[(r-1)*e+c]?(u+=window.innerHeight/3/e+"px ",h+="none "):(u+=window.innerHeight/3/e-2+"px ",h+="solid "),c<e-1&&null===t[r*e+c+1]?(u+=window.innerHeight/3/e+"px ",h+="none "):(u+=window.innerHeight/3/e-2+"px ",h+="solid "),r<e-1&&null===t[(r+1)*e+c]?(u+=window.innerHeight/3/e+"px ",h+="none "):(u+=window.innerHeight/3/e-2+"px ",h+="solid "),c>0&&null===t[r*e+c-1]?(u+=window.innerHeight/3/e+"px ",h+="none "):(u+=window.innerHeight/3/e-2+"px ",h+="solid ")),s.push(Object(f.jsx)("td",{className:o,style:{padding:u,borderStyle:h}},r*e+c))}a.push(Object(f.jsx)("tr",{children:s},r))}return Object(f.jsx)("table",{className:"maze",children:Object(f.jsx)("tbody",{children:a})})}}]),n}(d.a.Component),m=function(){function e(t){Object(s.a)(this,e),this.key=t,this.connections=[]}return Object(c.a)(e,[{key:"connect",value:function(e,t){this.connections.push({vertex:e,distance:t})}},{key:"getKey",value:function(){return this.key}},{key:"getConnections",value:function(){return this.connections}}]),e}();p.a.render(Object(f.jsx)(v,{}),document.getElementById("root"))},16:function(e,t,n){}},[[10,1,2]]]);
//# sourceMappingURL=main.adf164a1.chunk.js.map