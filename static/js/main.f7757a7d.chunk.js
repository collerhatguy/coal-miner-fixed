(this["webpackJsonpcoal-miner-fixed"]=this["webpackJsonpcoal-miner-fixed"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n(1),r=n.n(i),o=n(5),s=n.n(o),a=n(2);var l=n(3),u="UpgradeWorker",O="BuyWorker";function d(e,t){switch(t.type){case u:return Object(l.a)(Object(l.a)({},e),{},{productionRate:e.productionRate+1,productionRateUpgradeCost:2*e.productionRateUpgradeCost,level:e.level+1});case O:return Object(l.a)(Object(l.a)({},e),{},{owned:e.owned+t.payload,cost:e.cost+t.payload});default:return e}}function j(e){var t=e.worker,n=e.money,r=e.setMoney,o=e.multiplier,s=function(){var e=Object(i.useState)(!0),t=Object(a.a)(e,2),n=t[0],c=t[1],r=Object(i.useCallback)((function(){c((function(e){return!e}))}),[]),o=Object(i.useRef)();return Object(i.useEffect)((function(){n&&(o.current.style.display="block"),n||(o.current.style.display="none"),console.log(o)}),[n]),[o,n,r]}(),l=Object(a.a)(s,3),j=l[0],b=l[1],p=l[2],h=function(e,t,n,c){var r=Object(i.useReducer)(d,e),o=Object(a.a)(r,2),s=o[0],l=o[1],j=Object(i.useCallback)((function(){var e=s.cost*c;n<e||(t((function(t){return t-e})),l({type:O,payload:c}))}),[s,c,n]),b=Object(i.useCallback)((function(){n<s.productionRateUpgradeCost||(t((function(e){return e-s.productionRateUpgradeCost})),l({type:u}))}),[s,n]);return Object(i.useEffect)((function(){setInterval((function(){console.log("mined"),console.log(s.owned),t((function(e){return e+s.owned*s.productionRate}))}),3e3)}),[s]),[s,j,b]}(t,r,n,o),C=Object(a.a)(h,3),R=C[0],_=C[1],f=C[2],m=Object(i.useState)(!1),E=Object(a.a)(m,2),x=E[0],g=E[1];return Object(i.useEffect)((function(){t.cost<=n&&g(!0)}),[n]),Object(c.jsxs)("div",{className:x?"worker":"unaffordable",children:[Object(c.jsx)("h2",{className:"worker-name",children:R.name}),Object(c.jsxs)("div",{ref:j,children:[Object(c.jsx)("img",{className:"worker-image",src:R.img}),Object(c.jsxs)("h2",{children:["Owned: ",Object(c.jsx)("span",{children:R.owned})]}),Object(c.jsxs)("h2",{children:["Cost: ",Object(c.jsx)("span",{children:R.cost*o}),"$"]}),Object(c.jsxs)("h2",{children:["Production Rate: ",Object(c.jsx)("span",{children:R.productionRate}),"$"]}),Object(c.jsxs)("h2",{children:["Upgrade Cost: ",Object(c.jsx)("span",{children:R.productionRateUpgradeCost})]}),Object(c.jsxs)("h2",{children:["Level: ",Object(c.jsx)("span",{children:R.level})]}),Object(c.jsxs)("button",{onClick:function(){return _()},children:["Buy ",Object(c.jsx)("span",{children:o}),"?"]}),Object(c.jsx)("button",{onClick:function(){return f()},children:"Upgrade?"})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{tabIndex:"0",onClick:function(){return p()},children:b?"Hide?":"Reveal?"})})]})}var b=n(6),p=n(7),h=n.p+"static/media/drill.1a13da94.png",C=n.p+"static/media/worker.5a8cd7ac.png",R=n.p+"static/media/monky.16a653ef.png",_=function(){function e(t,n,c,i,r){Object(b.a)(this,e),this.OWNED_LOCAL_STORAGE_KEY="Coalminer.".concat(i,"Owned"),this.COST_LOCAL_STORAGE_KEY="Coalminer.".concat(i,"Cost"),this.UPGRADE_CAP_LOCAL_STORAGE_KEY="Coalminer.".concat(i,"CapLimit"),this.CURRENT_PRODUCTION_RATE_LOCAL_STORAGE_KEY="Coalminer.".concat(i,"CurrentProductionRate"),this.CURRENT_PRODUCTION_RATE_UPGRADE_COST_LOCAL_STORAGE_KEY="Coalminer.".concat(i,"CurrentProductionRateUpgradeCost"),this.name=i,this.owned=JSON.parse(localStorage.getItem(this.OWNED_LOCAL_STORAGE_KEY))||0,this.cost=JSON.parse(localStorage.getItem(this.COST_LOCAL_STORAGE_KEY))||t,this.productionRate=JSON.parse(localStorage.getItem(this.CURRENT_PPRODUCTION_RATE_LOCAL_STORAGE_KEY))||n,this.productionRateUpgradeCost=JSON.parse(localStorage.getItem(this.CURRENT_PRODUCTION_RATE_UPGRADE_COST_LOCAL_STORAGE_KEY))||c,this.level=0,this.img=r,this.saveFiles=[{key:this.OWNED_LOCAL_STORAGE_KEY,value:this.owned},{key:this.COST_LOCAL_STORAGE_KEY,value:this.cost},{key:this.CURRENT_PRODUCTION_RATE_LOCAL_STORAGE_KEY,value:this.productionRate},{key:this.CURRENT_PRODUCTION_RATE_UPGRADE_COST_LOCAL_STORAGE_KEY,value:this.productionRateUpgradeCost}]}return Object(p.a)(e,[{key:"save",value:function(){this.saveFiles.forEach((function(e){localStorage.setItem(e.key,JSON.stringify(e.value))}))}}]),e}(),f=[new _(10,1,100,"Miners",C),new _(100,2,1e3,"Drills",h),new _(150,3,1500,"Monkey Miners",R)];function m(e){var t=e.money,n=e.setMoney,i=e.multiplier;return Object(c.jsx)("div",{id:"worker-list",children:f.map((function(e,r){return Object(c.jsx)(j,{worker:e,money:t,setMoney:n,multiplier:i},r)}))})}n(13);function E(e){var t=e.amount,n=e.setMultiplier;return Object(c.jsxs)("label",{for:"".concat(t,"-multiplier"),children:[t,"x",Object(c.jsx)("input",{type:"radio",value:t,id:"".concat(t,"-multiplier"),name:"multiplier",onClick:function(){n(t)}})]})}function x(e){var t=e.setMultiplier;return Object(c.jsx)("div",{id:"multiplierContainer",children:Object(c.jsxs)("fieldset",{children:[Object(c.jsx)("legend",{children:"Multipliers for buying in mass:"}),Object(c.jsx)(E,{amount:1,setMultiplier:t},"1"),Object(c.jsx)(E,{amount:10,setMultiplier:t},"10"),Object(c.jsx)(E,{amount:100,setMultiplier:t},"100")]})})}var g=function(){var e=Object(i.useState)(10),t=Object(a.a)(e,2),n=t[0],r=t[1],o=Object(i.useState)(1),s=Object(a.a)(o,2),l=s[0],u=s[1];return Object(i.useEffect)((function(){localStorage.setItem("GoldMiner.money",JSON.stringify(n))}),[n]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("h2",{children:["Current Money: ",n]}),Object(c.jsx)(m,{money:n,setMoney:r,multiplier:l}),Object(c.jsx)(x,{setMultiplier:u})]})};s.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(g,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.f7757a7d.chunk.js.map