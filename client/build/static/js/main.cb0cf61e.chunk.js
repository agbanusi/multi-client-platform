(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,a){e.exports=a.p+"static/media/undraw_online_video_ivvq.532cde0d.svg"},function(e,t,a){e.exports=a.p+"static/media/undraw_web_search_eetr.d5872f4a.svg"},function(e,t,a){e.exports=a.p+"static/media/undraw_business_shop_qw5t.b0c11510.png"},function(e,t,a){e.exports=a.p+"static/media/undraw_group_selfie_ijc6.d554b7d2.png"},function(e,t,a){e.exports=a.p+"static/media/undraw_selfie_time_cws4.f73c5c4e.png"},function(e,t,a){e.exports=a.p+"static/media/Repeating-Triangles.3eb74d6f.svg"},function(e,t,a){e.exports=a.p+"static/media/Diamond-Sunset.f66c1ef5.svg"},function(e,t,a){e.exports=a.p+"static/media/Liquid-Cheese.4f96b4e8.svg"},function(e,t,a){e.exports=a.p+"static/media/Rainbow-Vortex.4469b7be.svg"},,,,,,,,function(e,t,a){e.exports=a.p+"static/media/2860933.33a2d2e6.jpg"},,function(e,t,a){e.exports=a.p+"static/media/undraw_Online_page_re_lhgx.7a14df2a.svg"},function(e,t,a){e.exports=a(54)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},,function(e,t,a){e.exports=a.p+"static/media/white-headphones-3394650.bdca546f.jpg"},function(e,t,a){e.exports=a.p+"static/media/transport-3366391_640.5d62a91c.jpg"},function(e,t,a){e.exports=a.p+"static/media/semi-opened-laptop-computer-turned-on-on-table-2047905.5afc248f.jpg"},function(e,t,a){"use strict";a.r(t);var n,s,r,i=a(0),l=a.n(i),c=a(30),o=a.n(c),m=(a(39),a(40),a(11)),d=a(1),u=a(6),h=a(7),p=a(9),f=a(8),g=(a(41),a(31)),E=a.n(g),b=function(e){Object(p.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).change=function(e){switch(e.target.id){case"name":n.setState({name:e.target.value});break;case"username":n.setState({username:e.target.value});break;case"email":n.setState({email:e.target.value});break;case"password":n.setState({password:e.target.value});var t=!1;[0,1,2,3,4,5,6,7,8,9].map((function(a){e.target.value.includes(a)&&(t=!0)})),document.getElementById("check").innerText=t?"":"Password not strong enough";break;case"password2":n.setState({password2:e.target.value}),e.target.value!==n.state.password?document.getElementById("check").innerText="Passwords don't match":(n.setState({real:!0}),document.getElementById("check").innerText="");break;default:n.setState({check:!n.state.check})}},n.submit=function(){n.state.check&&n.state.real?fetch("/newUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n.state.name,email:n.state.email,username:n.state.username,password:n.state.password,check:n.state.check})}).then((function(e){return e.json()})).then((function(e){"success"==e.status?n.setState({redirect:!0,data:e}):document.getElementById("check").innerText="An error occured try again"})):document.getElementById("check").innerText="Fill all boxes and accept the terms and conditions"},n.state={name:"",username:"",email:"",password:"",password2:"",check:!1,real:!1,redirect:!1,data:""},n}return Object(h.a)(a,[{key:"render",value:function(){return this.state.redirect?l.a.createElement(d.a,{to:"/landing?id="+this.state.data.id}):l.a.createElement("div",{id:"signed"},l.a.createElement("div",{className:"left"},l.a.createElement("h1",null,"Welcome to Magento"),l.a.createElement("h3",null,"Build and customise your site to attract your customers without stress."),l.a.createElement("img",{className:"img1",src:E.a})),l.a.createElement("div",{className:"right"},l.a.createElement("p",{className:"log"},"Already a member? ",l.a.createElement("a",{href:"/sign"},"Sign In.")),l.a.createElement("div",{className:"form"},l.a.createElement("h2",{className:"namer"},"Sign up to Magento."),l.a.createElement("hr",null),l.a.createElement("div",{className:"names"},l.a.createElement("div",null,l.a.createElement("h3",null,"Full Name"),l.a.createElement("input",{id:"name",value:this.state.name,onChange:this.change,required:!0})),l.a.createElement("div",null,l.a.createElement("h3",null,"Username"),l.a.createElement("input",{id:"username",value:this.state.username,onChange:this.change,required:!0}))),l.a.createElement("div",{className:"mail"},l.a.createElement("h3",null,"Email Address"),l.a.createElement("input",{id:"email",type:"email",value:this.state.email,onChange:this.change,required:!0})),l.a.createElement("div",{className:"mail"},l.a.createElement("h3",null,"Password"),l.a.createElement("input",{id:"password",type:"password",minLength:"6",value:this.state.password,required:!0,onChange:this.change,placeholder:"At least 6 characters and must contain at least one number"})),l.a.createElement("p",{id:"check",style:{color:"red"}}),l.a.createElement("div",{className:"mail"},l.a.createElement("h3",null,"Repeat Password"),l.a.createElement("input",{id:"password2",value:this.state.password2,onChange:this.change,type:"password",required:!0})),l.a.createElement("input",{type:"checkbox",className:"id",id:"checkbox",onChange:this.change,name:"checkbox",value:this.state.check,required:!0}),l.a.createElement("label",{for:"checkbox",className:"id"},"Creating an account means you're okay with our ",l.a.createElement("a",{href:"/terms"},"terms and conditions"),"."),l.a.createElement("br",null),l.a.createElement("button",{className:"but",onClick:this.submit}," Create Account")),l.a.createElement("p",{id:"copywrite"}," \xa9",(new Date).getFullYear())))}}]),a}(i.Component),v=(a(47),a(33)),y=a.n(v),w=function(e){Object(p.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).replace=function(){n.setState({second:!0})},n.typeChange=function(){n.state.type?document.getElementById("passFirst").type="password":document.getElementById("passFirst").type="text",n.setState({type:!n.state.type})},n.change=function(e){switch(e.target.id){case"userFirst":n.setState({username:e.target.value});break;default:n.setState({password:e.target.value})}},n.loginin=function(){console.log("here"),fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n.state.username,password:n.state.password})}).then((function(e){return e.json()})).then((function(e){"success"==e.status?n.setState({redirect:!0,data:e}):document.getElementById("checked").innerHTML=n.state.username.includes(".com")?"Email or Password Incorrect":"Username or Password Incorrect"}))},n.state={second:!1,type:!1,username:"",password:"",redirect:!1,data:{}},n.firster=l.a.createElement("div",{className:"pass"},l.a.createElement("h2",null," Choose to serve your customers better, build a webpage to showcase your products in a matter of seconds."),l.a.createElement("div",null,l.a.createElement("h5",null," Want to know what it means to be a Magentite?"),l.a.createElement("button",{className:"signup"},l.a.createElement("a",{href:"/signup"},"Sign Up"))),l.a.createElement("div",null,l.a.createElement("h5",null,"Already a Magentite? "),l.a.createElement("button",{onClick:n.replace,className:"signin"},"Sign In"))),n}return Object(h.a)(a,[{key:"render",value:function(){return this.state.redirect?l.a.createElement(d.a,{to:"/landing?id="+this.state.data.id}):l.a.createElement("div",{className:"signinjs"},l.a.createElement("div",{className:"lefty"},l.a.createElement("h1",null,"Magento"),l.a.createElement("img",{id:"cojoined",src:y.a})),l.a.createElement("div",{className:"righty"},this.state.second?l.a.createElement("div",{className:"noPass"},l.a.createElement("div",{className:"forms yes1"},l.a.createElement("i",{class:"fa fa-envelope","aria-hidden":"true"}),l.a.createElement("input",{id:"userFirst",value:this.state.username,onChange:this.change,placeholder:"Please enter your email or username",required:!0})),l.a.createElement("div",{className:"forms"},l.a.createElement("i",{class:"fa fa-lock","aria-hidden":"true"}),l.a.createElement("input",{type:"password",id:"passFirst",value:this.state.password,onChange:this.change,placeholder:"Enter your password",required:!0}),l.a.createElement("button",{className:"yum",onClick:this.typeChange},this.state.type?l.a.createElement("i",{class:"fa fa-eye"}):l.a.createElement("i",{class:"fa fa-eye-slash","aria-hidden":"true"}))),l.a.createElement("p",{id:"checked"}),l.a.createElement("button",{className:"loggy",onClick:this.loginin},"Sign In"),l.a.createElement("p",{className:"forgot"},l.a.createElement("a",{href:"/forgot"},"Forgot your Password?"))):this.firster))}}]),a}(i.Component),N=a(12),k=(a(48),a(14)),S=a(27),C=(a(49),a(15)),x=a.n(C),T=a(16),j=a.n(T),O=a(17),P=a.n(O),I=a(18),D=a.n(I),B=a(19),_=a.n(B),q=a(20),A=a.n(q),M=a(21),U=a.n(M),F=a(22),L=a.n(F),W=a(23),R=a.n(W),J=function(e){Object(p.a)(a,e);var t=Object(f.a)(a);function a(e){var s;return Object(u.a)(this,a),(s=t.call(this,e)).typeChange=function(){s.state.type?document.getElementById("passFirst").type="password":document.getElementById("passFirst").type="text",s.setState({type:!s.state.type})},s.add=function(e,t){s.state.cart.includes(e)?document.getElementById("mess").innerHTML="Already added to Cart.":(s.setState({cart:[].concat(Object(N.a)(s.state.cart),[Object(S.a)(Object(S.a)({},e),{},{id:t})])}),document.getElementById("mess").innerHTML="Added to Cart")},s.change=function(e){switch(e.target.id){case"userFirst":case"username":s.setState({username:e.target.value});break;case"passFirst":case"password":s.setState({password:e.target.value});break;case"name":s.setState({fullName:e.target.value});break;case"email":s.setState({emailer:e.target.value});break;case"password2":s.setState({password2:e.target.value});break;case"checkbox":s.setState({check:!s.state.check})}},s.login=function(){fetch("/minilogin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:n,username:s.state.username,password:s.state.password})}).then((function(e){return e.json()})).then((function(e){"success"==e.status?s.setState({index:3,data:e}):document.getElementById("checked").innerHTML=s.state.username.includes(".com")?"Email or Password Incorrect":"Username or Password Incorrect"}))},s.submit=function(){s.state.checked&&s.state.password==s.state.password2?fetch("/mininewuser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:n,name:s.state.name,email:s.state.email,username:s.state.username,password:s.state.password})}).then((function(e){return e.json()})).then((function(e){"success"==e.status?s.setState({index:3}):document.getElementById("checkdi").innerText="An error occured try again"})):document.getElementById("checkdi").innerText="Your passwords don't match and you haven't checked the box"},s.getUrlParameter=function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(s.props.location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))},s.state={name:"",email:"",selectTemp:"",selectTemplate:"",temp:[j.a,P.a,D.a,_.a,x.a],templates:[A.a,U.a,L.a,R.a],files:[],fileData:[],cart:[],index:0,username:"",password:"",emailer:"",fullName:"",password2:"",check:!1,type:!1,data:""},s}return Object(h.a)(a,[{key:"componentDidMount",value:function(){var e=this;if(n=this.getUrlParameter("id"),this.props.info){var t=this.props.info;this.setState({name:t.name,files:t.files,fileData:t.fileData,selectTemp:this.state.temp[t.temp],selectTemplate:this.state.templates[t.template],index:3})}else fetch("/getData",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:n})}).then((function(e){return e.json()})).then((function(t){if("success"==t.status){var a=t.dat;console.log(a),e.setState({email:a.email,files:a.files,fileData:a.fileData,selectTemp:e.state.temp[a.temp],selectTemplate:e.state.templates[a.template],name:a.company})}}))}},{key:"render",value:function(){var e=this,t={email:this.state.email,amount:this.state.cart.map((function(e){return Number(e.price)})).reduce((function(e,t){return e+t}),0),metadata:{name:this.state.name,phone:"08012345678"},text:"Pay Now",publicKey:"pk_live_9d3b45fa5d4ea9a2ba0a4ee95906fbda1d50fe37",onSuccess:function(){return e.done(),alert("Thanks for doing business with us! Your item is on the way ")},onClose:function(){return alert("Wait! You need this, don't go!!!!")}},a={0:l.a.createElement("div",{className:"passid"},l.a.createElement("h2",null," Welcome to ",this.state.name),l.a.createElement("div",null,l.a.createElement("h5",null,"Get Access to our magnificient products and get free delivery"),l.a.createElement("button",{className:"signup",onClick:function(){e.setState({index:2})}},"Sign Up")),l.a.createElement("div",null,l.a.createElement("h5",null,"Already a member? "),l.a.createElement("button",{onClick:function(){e.setState({index:1})},className:"signin"},"Sign In"))),1:l.a.createElement("div",{className:"noPass"},l.a.createElement("div",{className:"forms yes1"},l.a.createElement("i",{class:"fa fa-envelope","aria-hidden":"true"}),l.a.createElement("input",{id:"userFirst",value:this.state.username,onChange:this.change,placeholder:"Please enter your email or username",required:!0})),l.a.createElement("div",{className:"forms"},l.a.createElement("i",{class:"fa fa-lock","aria-hidden":"true"}),l.a.createElement("input",{type:"password",id:"passFirst",value:this.state.password,onChange:this.change,placeholder:"Enter your password",required:!0}),l.a.createElement("button",{className:"yum",onClick:this.typeChange},this.state.type?l.a.createElement("i",{class:"fa fa-eye"}):l.a.createElement("i",{class:"fa fa-eye-slash","aria-hidden":"true"}))),l.a.createElement("p",{id:"checked"}),l.a.createElement("button",{className:"loggy",onClick:this.login},"Sign In"),l.a.createElement("p",{className:"forgot"},l.a.createElement("a",{href:"/forgot"},"Forgot your Password?")),l.a.createElement("div",{className:"helf"},"Not a member?",l.a.createElement("button",{onClick:function(){e.setState({index:2})}},"Sign Up"))),2:l.a.createElement("div",{id:"signedd"},l.a.createElement("div",{className:"leftin",style:{backgroundImage:"url("+this.state.selectTemplate+")"}},l.a.createElement("h1",null,"Welcome to ",this.state.name)),l.a.createElement("div",{className:"right"},l.a.createElement("p",{className:"log"},"Already a member?",l.a.createElement("button",{onClick:function(){e.setState({index:1})}},"Sign In.")),l.a.createElement("div",{className:"form"},l.a.createElement("h2",{className:"namer"},"Register on ",this.state.name,"."),l.a.createElement("hr",null),l.a.createElement("div",{className:"names"},l.a.createElement("div",null,l.a.createElement("h3",null,"Full Name"),l.a.createElement("input",{id:"name",value:this.state.fullName,onChange:this.change,required:!0})),l.a.createElement("div",null,l.a.createElement("h3",null,"Username"),l.a.createElement("input",{id:"username",value:this.state.username,onChange:this.change,required:!0}))),l.a.createElement("div",{className:"mail"},l.a.createElement("h3",null,"Email Address"),l.a.createElement("input",{id:"email",type:"email",value:this.state.emailer,onChange:this.change,required:!0})),l.a.createElement("div",{className:"mail"},l.a.createElement("h3",null,"Password"),l.a.createElement("input",{id:"password",type:"password",minLength:"6",value:this.state.password,required:!0,onChange:this.change,placeholder:"At least 6 characters and must contain at least one number"})),l.a.createElement("p",{id:"checkdi",style:{color:"red"}}),l.a.createElement("div",{className:"mail"},l.a.createElement("h3",null,"Repeat Password"),l.a.createElement("input",{id:"password2",value:this.state.password2,onChange:this.change,required:!0})),l.a.createElement("input",{type:"checkbox",className:"id",id:"checkbox",onChange:this.change,name:"checkbox",value:this.state.check,required:!0}),l.a.createElement("label",{for:"checkbox",className:"id"},"Creating an account means you're okay with our terms and conditions."),l.a.createElement("br",null),l.a.createElement("button",{className:"but",onClick:this.submit}," Create Account")),l.a.createElement("p",{id:"copywrite"}," \xa9",(new Date).getFullYear()))),3:l.a.createElement("div",{className:"total"},l.a.createElement("div",{className:"head"},l.a.createElement("div",{className:"butonn"},l.a.createElement("p",{className:"cart"},this.state.cart.length),l.a.createElement("p",{className:"homer",onClick:function(){e.state.cart.length>0&&e.setState({index:4})}},"\ud83d\uded2")),l.a.createElement("button",{className:"home buton",onClick:function(){e.setState({index:0})}},"Welcome Page")),l.a.createElement("h1",{id:"messy"}),l.a.createElement("h5",{id:"mess"}," "),l.a.createElement("div",{className:"bodyLin"},this.state.files.map((function(t,a){return l.a.createElement("div",{id:a,key:a,className:"show"},l.a.createElement("img",{className:"displayid",src:t,alt:"logo"}),l.a.createElement("h2",null,e.state.fileData[a].name),l.a.createElement("h3",{className:"price"},e.state.fileData[a].price),l.a.createElement("p",{className:"describe"},e.state.fileData[a].des),l.a.createElement("button",{id:"hover",onClick:function(){e.add({path:t,price:e.state.fileData[a].price,content:e.state.fileData[a].des},a)}},"BUY NOW"))}))),l.a.createElement("footer",{class:"footer"},l.a.createElement("div",{class:"media"},l.a.createElement("i",{class:"fa fa-facebook-official","aria-hidden":"true"},l.a.createElement("a",{href:"facebook"})),l.a.createElement("i",{class:"fa fa-whatsapp","aria-hidden":"true"},l.a.createElement("a",{href:"whatsapp"})),l.a.createElement("i",{class:"fa fa-twitter","aria-hidden":"true"},l.a.createElement("a",{href:"twitter"})),l.a.createElement("i",{class:"fa fa-instagram","aria-hidden":"true"},l.a.createElement("a",{href:"instagram"}))),l.a.createElement("p",null,"\xa9 ",(new Date).getFullYear()))),4:l.a.createElement("div",{className:"cati"},this.state.cart.map((function(e){return l.a.createElement("div",{className:"seeny"},l.a.createElement("img",{className:"deen",src:e.path}),l.a.createElement("p",null,e.content),l.a.createElement("h5",null,"NGN ",e.price))})),l.a.createElement("div",{className:"biggy"},l.a.createElement("button",{className:"shop",onClick:function(){e.setState({index:3})}},"Back")," ",l.a.createElement(k.a,Object.assign({id:"kkk"},t))," ",l.a.createElement("h3",null,"Sub-Total: ",this.state.cart.map((function(e){return Number(e.price)})).reduce((function(e,t){return e+t}),0))))};return l.a.createElement("div",{className:"diddy",style:{backgroundImage:"url("+this.state.selectTemp+")"}},a[this.state.index])}}]),a}(i.Component),Y=(a(50),a(51),a(52),a(53),function(e){Object(p.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).getUrlParameter=function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(n.props.location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))},n.change3=function(e){n.setState({company:e.target.value})},n.converted=function(e){return console.log(e),URL.createObjectURL(e)},n.files=function(e){var t=[],a=Object(N.a)(e.target.files).map((function(e){t.push({name:"",price:"",des:""}),n.down(e).then((function(e){return n.setState({files:[].concat(Object(N.a)(n.state.files),[e])}),a}))}));n.setState({fileData:[].concat(Object(N.a)(n.state.fileData),t)})},n.web=function(){n.setState({index:1})},n.bank=function(){n.setState({index:2})},n.edit=function(){n.setState({index:3})},n.preview=function(){n.setState({redirect:"1"})},n.withdraw=function(){var e=n.state.bankNo,t=n.state.bankName;fetch("/withdraw",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:s,acctName:t,acctNo:e})}).then((function(e){return e.json()})).then((function(e){"success"==e.status?(n.setState({payment:e.payment}),alert("Money sent to your account")):alert("Please try again")}))},n.selectTemp=function(e){""!=n.state.selectTemp&&(document.getElementById(n.state.selectTemp+"p").style.border="none"),document.getElementById(e.target.id).style.border="3px solid orange",console.log(e.target.id.slice(0,-1)),n.setState({selectTemp:e.target.id.slice(0,-1)})},n.selectTemplate=function(e){""!=n.state.selectTemplate&&(document.getElementById(n.state.selectTemp+"o").style.border="none"),document.getElementById(e.target.id).style.border="3px solid orange",n.setState({selectTemplate:e.target.id.slice(0,-1)})},n.change=function(e){"bankName"==e.target.id?n.setState({bankName:e.target.value}):(Number(e.target.value)||""==e.target.value)&&n.setState({bankNo:e.target.value})},n.change2=function(e){switch(e.target.id){case"fullName":n.setState({fullName:e.target.value});break;case"email":n.setState({email:e.target.value});break;case"address":n.setState({text:e.target.value});break;case"password":n.setState({password:e.target.value});break;case"password2":n.setState({password2:e.target.value})}},n.personal=function(){fetch("/personal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:s,name:n.state.fullName,email:n.state.email,password:n.state.password,address:n.state.text})}),document.getElementById("status").innerHTML="Details Saved"},n.bankDone=function(){fetch("/banks",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:s,bankName:n.state.bankName,bankNo:n.state.bankNo})}).then((function(e){return e.json()})).then((function(e){document.getElementById("status").innerHTML="Banking Details Saved"}))},n.publish=function(){var e={company:n.state.company,files:n.state.files,temp:n.state.selectTemp,template:n.state.selectTemplate,id:s,fileData:n.state.fileData};fetch("/publish",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){"success"==e.status?n.setState({showCase:l.a.createElement(J,{id:"dent",info:{name:n.state.name,files:n.state.files,fileData:n.state.fileData,temp:n.state.selectTemp,template:n.state.selectTemplate}}),index:4}):n.publish()}))},n.nameChange=function(e){var t=Number(e.target.id[0]),a=n.state.fileData;"p"==e.target.id.slice(1)?a[t].name=e.target.value:"pr"==e.target.id.slice(1)?a[t].price=e.target.value:"des"==e.target.id.slice(1)&&(a[t].des=e.target.value),n.setState({fileData:a})},n.down=function(e){return new Promise((function(t,a){if(/\.(jpe?g|png|gif)$/i.test(e.name)){var n=new FileReader;n.readAsDataURL(e),n.addEventListener("load",(function(){t(n.result)}),!1)}}))},n.done=function(){fetch("/paid",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:s,website:window.location.hostname+"/api/"+s})}).then((function(e){return e.json()})).then((function(e){"success"==e.status?n.setState({website:window.location.hostname+"/api/"+s}):document.getElementById("downer").innerHTML="<p>One or more  files is not a picture</p>"}))},n.state={payment:"0.00",name:"",index:0,bankName:"",bankNo:"",fullName:"",email:"",text:"",password:"",password2:"",selectTemp:"",selectTemplate:"",files:[],fileData:[],temp:[j.a,P.a,D.a,_.a,x.a],templates:[A.a,U.a,L.a,R.a],company:"",website:"",showCase:"",redirect:!1},n}return Object(h.a)(a,[{key:"componentDidMount",value:function(){var e=this;s=this.getUrlParameter("id"),fetch("/getData",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:s})}).then((function(e){return e.json()})).then((function(t){if("success"==t.status){var a=t.dat;console.log(a.files),console.log(a.fileData),e.setState({name:a.username,email:a.email,fullName:a.name,text:a.text,files:a.files,fileData:a.fileData,bankName:a.bankName,bankNo:a.bankNo,selectTemp:a.temp,selectTemplate:a.template,payment:a.payment,website:a.website,company:a.company})}else e.setState({redirect:"2"})}))}},{key:"render",value:function(){var e=this;console.log(window.location.hostname);var t={email:this.state.email,amount:5e5,metadata:{name:this.state.fullName,phone:"08012345678"},text:"Pay 5000 to host",publicKey:"pk_live_9d3b45fa5d4ea9a2ba0a4ee95906fbda1d50fe37",onSuccess:function(){return e.done(),alert("Thanks for doing business with us! Your site is live at "+e.state.website)},onClose:function(){return alert("Wait! You need this, don't go!!!!")}},a={0:l.a.createElement("h2",{style:{opacity:.5}},l.a.createElement("i",null,"Preview Not Available")),1:l.a.createElement("div",{className:"web"},l.a.createElement("div",{className:"webber"},l.a.createElement("h4",null,"Company Name(Name of your site)"),l.a.createElement("input",{id:"company",onChange:this.change3,value:this.state.company})),l.a.createElement("div",{className:"webber"},l.a.createElement("h4",{id:"downer"},"Upload your product pictures"),l.a.createElement("input",{type:"file",name:"files[]",multiple:"true",onChange:this.files})),l.a.createElement("div",{className:"webber"},l.a.createElement("h4",null,"Choose a background SVG to make your website attractive."),l.a.createElement("div",{className:"webbed1"},this.state.temp.map((function(t,a){return l.a.createElement("img",{id:a+"p",className:"svgs",onClick:e.selectTemp,src:t})})))),l.a.createElement("div",{className:"webber"},l.a.createElement("h4",null,"Choose a template for your website."),l.a.createElement("div",{className:"webbed2"},this.state.templates.map((function(t,a){return l.a.createElement("img",{id:a+"o",className:"imgs",onClick:e.selectTemplate,src:t})})))),l.a.createElement("h4",null,"Customise your Products"),this.state.files.map((function(t,a){return l.a.createElement("div",{className:"items"},l.a.createElement("img",{src:t}),l.a.createElement("div",null,l.a.createElement("input",{id:a+"p",onChange:e.nameChange,placeholder:"Enter Name of Product",value:e.state.fileData[a].name,required:!0}),l.a.createElement("input",{id:a+"pr",onChange:e.nameChange,placeholder:"Enter Price, NUMBERS ONLY!",value:e.state.fileData[a].price,required:!0}),l.a.createElement("input",{id:a+"des",onChange:e.nameChange,maxLength:"30",value:e.state.fileData[a].des,placeholder:"Enter a short description"})))})),l.a.createElement("button",{onClick:this.publish},"Save")),2:l.a.createElement("div",{className:"bank"},l.a.createElement("h3",null,"We will only pay if this account matches the name used to register."),l.a.createElement("div",{className:"banking"},l.a.createElement("h4",null,"Bank Name"),l.a.createElement("input",{id:"bankName",value:this.state.bankName,onChange:this.change,required:!0})),l.a.createElement("div",{className:"banking"},l.a.createElement("h4",null,"Account Number"),l.a.createElement("input",{id:"acctNo",value:this.state.bankNo,onChange:this.change})),l.a.createElement("button",{onClick:this.bankDone},"Submit")),3:l.a.createElement("div",{className:"person"},l.a.createElement("h3",null,this.state.userName),l.a.createElement("div",{className:"personal"},l.a.createElement("h5",null,"Full Name"),l.a.createElement("input",{id:"fullName",onChange:this.change2,value:this.state.fullName})),l.a.createElement("div",{className:"personal"},l.a.createElement("h5",null,"Email Address"),l.a.createElement("input",{id:"email",type:"email",onChange:this.change2,value:this.state.email})),l.a.createElement("div",{className:"personal"},l.a.createElement("h5",null,"Home Address"),l.a.createElement("textarea",{id:"address",onChange:this.change2,value:this.state.text})),l.a.createElement("div",{className:"personal"},l.a.createElement("h5",null,"Old Password"),l.a.createElement("input",{id:"password",type:"password",onChange:this.change2,value:this.state.password})),l.a.createElement("div",{className:"personal"},l.a.createElement("h5",null,"New Password"),l.a.createElement("input",{id:"password2",type:"password",onChange:this.change2,value:this.state.password2})),l.a.createElement("button",{onClick:this.personal},"Save")),4:l.a.createElement("div",{className:"showOff"},this.state.showCase)};return document.getElementById("live")&&""!==this.state.website&&(document.getElementById("live").style.display="block"),"2"==this.state.redirect?l.a.createElement(d.a,{to:"/landing?id="+s}):"1"==this.state.redirect?l.a.createElement(d.a,{to:"/user?id="+s}):l.a.createElement("div",{className:"landing"},l.a.createElement("div",{className:"topper"},l.a.createElement("h3",null,"WELCOME ",this.state.name),l.a.createElement("h3",null,"Account Balance: ",this.state.payment)),l.a.createElement("div",{className:"mainer"},l.a.createElement("div",{className:"Lefti"},l.a.createElement("h4",{style:{display:"none"},id:"live"},"Your Website is at ",l.a.createElement("a",{href:this.state.website},this.state.website)),l.a.createElement("h3",null,"Magento is all about expressing yourself to your customers and showing you're more than they think you are. Show your products to them in the most expressive and way and do it just as fast too. Magento handles the payment and it is credited to you with payment information and customer information, so you can deliver your products any way you want to. Magento takes away the stress of building a website and trying to handle the payment, organisation of customer database for free!. You only pay for hosting and handle the delivery."),l.a.createElement("div",{className:"tens"},l.a.createElement("h5",null,"Setup/Edit your Webpage"),l.a.createElement("button",{onClick:this.web},"SetUp!")),l.a.createElement("div",{className:"tens"},l.a.createElement("h5",null,"It is advisable to set up your banking information"),l.a.createElement("button",{onClick:this.bank},"Banking Info")),l.a.createElement("div",{className:"tens"},l.a.createElement("h5",null,"Edit your personal Information"),l.a.createElement("button",{onClick:this.edit},"Edit")),l.a.createElement("div",{className:"tens"},l.a.createElement("h5",null,"Preview Site"),l.a.createElement("button",{onClick:this.preview},"Preview")),l.a.createElement("div",{className:"tens"},l.a.createElement("h5",null,"Host Site"),l.a.createElement(k.a,Object.assign({id:"kk"},t))),l.a.createElement("div",{className:"tens"},l.a.createElement("h5",null,"Withdraw Payments"),l.a.createElement("button",{onClick:this.withdraw},"Withdraw"))),l.a.createElement("div",{className:"Righti"},l.a.createElement("h5",{id:"status"}),a[this.state.index])))}}]),a}(i.Component)),H=function(e){Object(p.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={redirect:!1},n}return Object(h.a)(a,[{key:"componentDidMount",value:function(){r=this.props.match.params.id,this.setState({redirect:!0})}},{key:"render",value:function(){return this.state.redirect?l.a.createElement(d.a,{to:"/user?id="+r}):l.a.createElement("div",null,"Loading...")}}]),a}(i.Component);var G=function(){return l.a.createElement("div",{className:"App"},l.a.createElement(m.a,null,l.a.createElement(d.d,null,l.a.createElement(d.b,{exact:!0,path:"/",component:w}),l.a.createElement(d.b,{path:"/signup",component:b}),l.a.createElement(d.b,{path:"/landing",component:Y}),l.a.createElement(d.b,{path:"/redUser",component:H}),l.a.createElement(d.b,{path:"/api/:id",component:H}),l.a.createElement(d.b,{path:"/user",component:J}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(G,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[34,1,2]]]);
//# sourceMappingURL=main.cb0cf61e.chunk.js.map