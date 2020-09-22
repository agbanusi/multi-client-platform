import React, { Component, useState } from 'react'
import {Redirect} from 'react-router-dom'
import './custom.css'
import Creative from '../customer/Creative';
import {temps} from '../temps'

const cloudinary=window.cloudinary;
var ident
class Custom extends Component {
    constructor(props){
        super(props)
        this.image=''
        this.state={
            loading:true,
            redirect:false,
            background:'',
            backImg:'',
            backCol:'',
            containerOne:"",
            containerTwo:"",
            containerThree:"",
            last1:"image",
            last2:"text",
            last3:"text",
            container1:{color:'black',backgroundColor:"inherit",image:"",backgroundImage:"",text:""},
            container2:{color:'black',backgroundColor:"inherit",image:"",backgroundImage:"",text:""},
            container3:{color:'black',backgroundColor:"inherit",image:"",backgroundImage:"",text:""}
        }
    }
    async componentDidMount(){
        //server path attention 
        alert('Hey, you can choose the input of text, color or pictures for each section of your custom home page by choosing the appropriate option from the dropdown menu and click NEXT to move to the next page.')
        ident=this.getUrlParameter('id')
        const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident})}
        const dot =await fetch('/getFirstData',method)
        var data =await dot.json()
        console.log(data.info, temps[data.temp], data.info.backImg==`url(${''})`, data.info.backImg=="")
        if (data.status ==='success'){
            this.setState({name:data.username,email:data.email, fullName:data.name,
                text:data.text,fileData:data.fileData,
                selectTemp:temps[data.temp], website:data.website, company:data.company,paid:data.paid,loading:false
            })

            if(data.info.container1 && data.info.container2 && data.info.container3){
                this.setState({
                    containerOne:data.info.containerOne,containerTwo:data.info.containerTwo,containerThree:data.info.containerThree,
                    last1:data.info.last1, last2:data.info.last2, last3: data.info.last3, container1: data.info.container1,
                    container2: data.info.container2, container3: data.info.container3, background:data.info.background,backImg:data.temp==""?  data.info.backImg : `url(${temps[data.temp]})` ,backCol:data.info.backCol,
                })
            }
        }else{
            window.location.href='/'
        }
    }
    widget=(num,type)=>(
        cloudinary.createUploadWidget({
            cloudName: 'johnny11',
            uploadPreset: 'q1bjjs9hgr5h'}, (error, result) => { 
              if (!error && result && result.event === "success") {
                  if(num===2 ){
                      let container2=this.state.container2
                      if(type==='main'){
                        container2.image=result.info.secure_url
                      }else{
                        container2.backgroundImage=result.info.secure_url
                      }
                      this.setState({container2})
                  }else if(num===1){
                    let container2=this.state.container1
                    if(type==='main'){
                      container2.image=result.info.secure_url
                    }else{
                      container2.backgroundImage=result.info.secure_url
                    }
                    this.setState({container1:container2})
                  }else if(num===3){
                    let container2=this.state.container3
                    if(type==='main'){
                      container2.image=result.info.secure_url
                    }else{
                      container2.backgroundImage=result.info.secure_url
                    }
                    this.setState({container3:container2})
                  }else if(num==4){
                    this.setState({backImg:`url(${result.info.secure_url})`})
                  }
              }
            }
        ).open()
    )
    
    backWidget=()=>{
        const wid=this.widget(4,'one').open()
        //this.setState({backImg:wid})
    }
    change=(e)=>{
        this.setState({backCol: e.target.value})
    }
    getUrlParameter=(name)=>{
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    background=(e)=>{
        this.setState({background:e.target.value})
    }

    container=(e)=>{
        var cont
        if(e.target.value==='text' || e.target.value==='image'){
            cont= e.target.value
        }
        this.setState({containerOne:e.target.value, last1:cont|| this.state.last1})
    }
    container2=(e)=>{
        var cont
        if(e.target.value==='text' || e.target.value==='image'){
            cont= e.target.value
        }
        this.setState({containerTwo:e.target.value, last2:cont|| this.state.last2})
    }
    container3=(e)=>{
        var cont
        if(e.target.value==='text' || e.target.value==='image'){
            cont= e.target.value
        }
        this.setState({containerThree:e.target.value, last3:cont|| this.state.last3})
    }
    Container1=()=>{
        switch(this.state.containerOne){
            case "color":
            case "backColor":
                return <input className='contRes' type='color' onChange={this.cont1} />
            case "backImage":
            case "image":
                return <button className='buttonsHome contRes' onClick={this.cont1}>Upload</button>
            case "text":
                return <textarea className='contRes' onChange={this.cont1} value={this.state.container1.text} />
            default:
                return null
        }
    }
    Container2=()=>{
        switch(this.state.containerTwo){
            case "color":
            case "backColor":
                return <input className='contRes' type='color' onChange={this.cont2} />
            case "backImage":
            case "image":
                return <button className='buttonsHome contRes' onClick={this.cont2}>Upload</button>
            case "text":
                return <textarea className='contRes' onChange={this.cont2} value={this.state.container2.text} />
            default:
                return null
        }
    }
    Container3=()=>{
        switch(this.state.containerThree){
            case "color":
            case "backColor":
                return <input className='contResDow' type='color' onChange={this.cont3} />
            case "backImage":
            case "image":
                return <button className='buttonsHome contResDow' onClick={this.cont3}>Upload</button>
            case "text":
                return <textarea className='contResDown' onChange={this.cont3} value={this.state.container3.text} />
            default:
                return null
        }
    }
    cont1=(e)=>{
        var container1=this.state.container1
        switch(this.state.containerOne){
            case "backColor":
                container1.backgroundColor=e.target.value
                break;
            case "color":
                container1.color=e.target.value
                break;
            case "backImage":
                this.widget(1,'back')
                break;
            case "image":
                container1.last="image"
                this.widget(1,'main')
                break;
            case "text":
                container1.last="text"
                container1.text=e.target.value
                break;

        }
        this.setState({container1})
    }
    cont2=(e)=>{
        var container2=this.state.container2
        switch(this.state.containerTwo){
            case "backColor":
                container2.backgroundColor=e.target.value
                break;
            case "color":
                container2.color=e.target.value
                break;
            case "backImage":
                this.widget(2,'back')
                break;
            case "image":
                container2.last="image"
                this.widget(2,'main')
                break;
            case "text":
                container2.last="text"
                container2.text=e.target.value
                break;

        }
        this.setState({container2})
    }
    cont3=(e)=>{
        var container3=this.state.container3
        switch(this.state.containerThree){
            case "backColor":
                container3.backgroundColor=e.target.value
                break;
            case "color":
                container3.color=e.target.value
                break;
            case "backImage":
                this.widget(3,'back')
                break;
            case "image":
                container3.last="image"
                this.widget(3,'main')
                break;
            case "text":
                container3.last="text"
                container3.text=e.target.value
                break;

        }
        this.setState({container3})
    }
    save=async()=>{
        this.props.changy(1)
        this.props.refChange(this.state)
        if((this.state.container1.text==='' && this.state.container1.image=='')){
            document.getElementById('lastContainer1').innerHTML='<p style="color:red;">At least a text or image is needed in this space</p>'
        }else if((this.state.container2.text==='' && this.state.container2.image=='')){
            document.getElementById('lastContainer2').innerHTML='<p style="color:red;">At least a text or image is needed in this space</p>'
        }else{
            //server path attention
            ident=this.getUrlParameter('id')
            const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,level:'first',data:this.state})}
            const dot =await fetch('/saveData',method)
            var dat =await dot.json()
            if (dat.status ==='success'){
                this.props.changy(1)
                this.props.refChange(this.state)
            }
        }
        
    }
    render() {
        const {redirect,backImg, backCol,container1,container2,container3 }=this.state
        if(redirect){
            return <Redirect to={'/user?id='+ident} />
        }
        console.log(backImg)
        return (
            <div className='custom' style={{backgroundImage: backImg || this.state.selectTemp,backgroundColor: backCol}}>
               <select className='dropCustom' value={this.state.background} onChange={this.background}>
                <option value="" selected="selected">--</option>
                <option value="color">Change background Color</option>
                <option value="image">Change background Image</option>
               </select>
               {this.state.background==='color'?
               <input type='color' className='backColor' value={backCol} onChange={this.change} />
               : this.state.background?
               <button onClick={this.backWidget} className='backImg'>Upload Background Image</button>
               : <></>
                }
                <div className='beautCustom' >
                 <div  style={{border:'1px solid',backgroundImage:'url('+container1.backgroundImage+')',backgroundSize:'100% 100%', backgroundColor:container1.backgroundColor, color:container1.color}}>
                    <select className='dropCustom' value={this.state.containerOne} onChange={this.container} >
                    <option value="">--</option>
                    <option value="color">Change Text Color</option>
                    <option value="backColor">Change background Color</option>
                    <option value="backImage">Change background Image</option>
                    <option value='text'>Add Text</option>
                    <option value='image'>Add Image</option>
                    </select>
                    <this.Container1 />
                    {container1.last==='image' && container1.image!==""?
                    <img className='resImg' src={container1.image} />:
                    <h3 className='resText' id='lastContainer1' style={{color:container1.color}}>{container1.text}</h3>
                    }
                 </div>
                 <div  style={{border:'1px solid',backgroundImage:'url('+container2.backgroundImage+')',backgroundSize:'100% 100%', backgroundColor:container2.backgroundColor, color:container2.color}}>
                    <select className='dropCustom' value={this.state.containerTwo} onChange={this.container2} >
                    <option value="">--</option>
                    <option value="color">Change Text Color</option>
                    <option value="backColor">Change background Color</option>
                    <option value="backImage">Change background Image</option>
                    <option value='text'>Add Text</option>
                    <option value='image'>Add Image</option>
                    </select>
                    <this.Container2 />
                    {container2.last==='image' && container2.image!==""?
                    <img className='resImg' src={container2.image} />:
                    <h3 id='lastContainer2' className='resText' style={{color:container2.color}}>{container2.text}</h3>
                    }
                 </div>
                </div>
                <div className='down' style={{border:'1px solid',backgroundImage:'url('+container3.backgroundImage+')',backgroundSize:'100% 100%', backgroundColor:container3.backgroundColor, color:container3.color}}>
                    <select className='dropCustom' value={this.state.containerThree} onChange={this.container3} >
                    <option value="">--</option>
                    <option value="color">Change Text Color</option>
                    <option value="backColor">Change background Color</option>
                    <option value="backImage">Change background Image</option>
                    <option value='text'>Add Text</option>
                    <option value='image'>Add Image</option>
                    </select>
                    <this.Container3 />
                    {container3.last==='image' && container3.image!==""?
                    <img className='resImgDown' src={container3.image} />:
                    <h3 className='resTextDown' style={{color:container3.color}}>{container3.text}</h3>
                    }
                 </div>
                 <button className='buttonsHome homeRem' onClick={this.save}>NEXT</button>
            </div>
        )
    }
}

class SignIn extends Component {
    constructor(props){
        super(props)
        this.state={
            form:[{name:'Username/Email',type:'text'},{name:'Password',type:'password'}],
            name:'',
            first:'',
            type:'text',
            short:true
        }
    }
    async componentDidMount(){
        //server path attention
        ident=this.getUrlParameter('id')
        const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident})}
        const dot =await fetch('/getSecondData',method)
        var dat =await dot.json()
        if (dat.status ==='success'){
            let data = dat.dat
            if(data.form){
                this.setState({form:data.form, first:data.first})
            }
        }
    }
    getUrlParameter=(name)=>{
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    add=()=>{
        this.setState({short:!this.state.short})
        if(this.state.short){
            document.getElementById('extraSignIn').style.display='block'
        }else{
            document.getElementById('extraSignIn').style.display='none'
        }
    }
    submit=()=>{
        this.setState((state)=>({form:[...state.form,{name:state.name,type:state.type}], name:'', type:'',short:true}))
        document.getElementById('extraSignIn').style.display='none'
    }
    change=(e)=>{
        if(e.target.id==='name'){
            this.setState({name:e.target.value})
        }else{
            this.setState({type: e.target.value})
        }
    }
    back=async()=>{
        this.props.changy(0)
        this.props.refChange(this.state)
        ident=this.getUrlParameter('id')
        //server path attention
        const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,level:'second',data:this.state})}
        const dot =await fetch('/saveData',method)
        var dat =await dot.json()
        if (dat.status ==='success'){
            this.props.changy(0)
            this.props.refChange(this.state)
        }
        
    }
    save=async()=>{
        this.props.changy(2)
        this.props.refChange(this.state)
        ident=this.getUrlParameter('id')
        //server path attention
        const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,level:'second',data:this.state})}
        const dot =await fetch('/saveData',method)
        var dat =await dot.json()
        if (dat.status ==='success'){
            this.props.changy(2)
            this.props.refChange(this.state)
        }
        
    }
    render() {
        const {form}=this.state
        return (
            <div className='signIn'>
                <h3>Sign In Page</h3>
                <div>
                    {form.map((i,k)=>(
                     <div key={k} className='contSignIn'><h5>{i.name}</h5><input className='inputSignIn' type={i.type} disabled={true} /></div>   
                    ))}
                </div>
                <p className='addSign' onClick={this.add}>Add more fields + </p>
                <div id='extraSignIn' style={{display:'none'}}>
                    <div><h5>Name of Field</h5><input id='name' value={this.state.name} onChange={this.change} required /></div>
                    <div><h5>Type of Field</h5><input id='type' value={this.state.type} onChange={this.change} placeholder='Input password, text or number as type of field' required /></div>
                    <button className='subInp' onClick={this.submit}>Submit</button>
                </div>
                <div className='endButtons'>
                    <button className='buttonsHome' onClick={this.back}>BACK</button>
                    <button className='buttonsHome' onClick={this.save}>NEXT</button>
                </div>
            </div>
        )
    }
}


class SignUp extends Component {
    constructor(props){
        super(props)
        this.state={
            form:[{name:'First Name',type:'text'},{name:'Last Name',type:'text'},{name:'Email Address',type:'email'},{name:'Phone Number',type:'tel'},{name:'Password',type:'password'}],
            name:'',
            type:'text',
            companyName:'Test',
            short:true,
            ele:0
        }
    }
    async componentDidMount(){
        //server path attention
        ident=this.getUrlParameter('id')
        alert('You can click on a form attribute and drag to exchange the position with another attribute, you can also add new attributes')
        const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident})}
        const dot =await fetch('/getThirdData',method)
        var dat =await dot.json()
        if (dat.status ==='success'){
            let data = dat.dat
            if(data.form){
                this.setState({form:data.form,companyName:data.name})
            }
        }
    }
    getUrlParameter=(name)=>{
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    add=()=>{
        this.setState({short:!this.state.short})
        if(this.state.short){
            document.getElementById('extraSignIn').style.display='block'
        }else{
            document.getElementById('extraSignIn').style.display='none'
        }
    }
    submit=()=>{
        this.setState((state)=>({form:[...state.form,{name:state.name,type:state.type}], name:'', type:'',short:true}))
        document.getElementById('extraSignIn').style.display='none'
    }
    change=(e)=>{
        if(e.target.id==='name'){
            this.setState({name:e.target.value})
        }else{
            this.setState({type: e.target.value})
        }
    }
    down=(e)=>{
        let elem=document.getElementById(e.target.id)
        elem.style.opacity=0.5
        this.setState({ele:e.target.id})
    }
    move=(e)=>{
        e.preventDefault()
        if(Number(e.target.id)){
            document.getElementById(e.target.id).style.backgroundColor='grey'
        }
    }
    leave=(e)=>{
        e.preventDefault()
        if(Number(e.target.id)){
            document.getElementById(e.target.id).style.backgroundColor='inherit'
        }
    }
    up=(e)=>{
        let {form,ele} = this.state
        if(Number(e.target.id)){
            [form[e.target.id],form[ele]]=[form[ele],form[e.target.id]]
            document.getElementById(ele).style.opacity=1.0
            document.getElementById(ele).style.backgroundColor='inherit'
            document.getElementById(e.target.id).style.backgroundColor='inherit'
            this.setState({form})
        }
    }
    back=async()=>{
        //server path attention
        this.props.changy(1)
        this.props.refChange(this.state)
        ident=this.getUrlParameter('id')
        const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,level:'third',data:this.state})}
        const dot =await fetch('/saveData',method)
        var dat =await dot.json()
        if (dat.status ==='success'){
            this.props.changy(1)
            this.props.refChange(this.state)
        }
        
    }
    save=async()=>{
        //server path attention
        this.props.changy(3)
        this.props.refChange(this.state)
        ident=this.getUrlParameter('id')
        const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,level:'third',data:this.state})}
        const dot =await fetch('/saveData',method)
        var dat =await dot.json()
        if (dat.status ==='success'){
            this.props.changy(3)
            this.props.refChange(this.state)
        }
        
    }
    render() {
        const {form}=this.state
        return (
            <div className='signIn'>
                <h3>Sign Up Page</h3>
                <div>
                    {form.map((i,k)=>(
                     <div key={k} id={k} draggable className='contSignIn' onDragStart={this.down} onDragOver={this.move} onDrop={this.up} onDragLeave={this.leave}><h5>{i.name}</h5><input className='inputSignIn' type={i.type} disabled={true}  /></div>   
                    ))}
                </div>
                <p className='addSign' onClick={this.add}>Add more fields + </p>
                <div id='extraSignIn' style={{display:'none'}}>
                    <div><h5>Name of Field</h5><input id='name' value={this.state.name} onChange={this.change} required /></div>
                    <div><h5>Type of Field</h5><input id='type' value={this.state.type} onChange={this.change} placeholder='Input password, text or number as type of field' required /></div>
                    <button className='subInp' onClick={this.submit}>Submit</button>
                </div>
                <div className='endButtons'>
                    <button className='buttonsHome' onClick={this.back}>BACK</button>
                    <button className='buttonsHome' onClick={this.save}>NEXT</button>
                </div>
            </div>
        )
    }
}

class Landings extends Component {
    constructor(props){
        super(props)
        this.state={
            items:[],
        }
    }
    async componentDidMount(){
        //server path attention
        const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident})}
        const dot =await fetch('/getFourthData',method)
        var data =await dot.json()
        if (data.status ==='success'){
            if(data.dat){
                this.setState({items:data.dat})
            }else if(data.alt){
                this.setState({items:data.alt})
            }
        }
    }
    save=async()=>{
        //server path attention
        this.props.changy(4)
        this.props.refChange(this.state.items)
        const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,level:'fourth',data:this.state.items})}
        const dot =await fetch('/saveData',method)
        var dat =await dot.json()
        if (dat.status ==='success'){
            this.props.changy(4)
            this.props.refChange(this.state.items)
        }
    }
    back=async()=>{
        //server path attention
        this.props.changy(2)
        this.props.refChange(this.state.items)
        const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,level:'fourth',data:this.state.items})}
        const dot =await fetch('/saveData',method)
        var dat =await dot.json()
        if (dat.status ==='success'){
            this.props.changy(2)
            this.props.refChange(this.state.items)
        }
        
    }
    remove=(e)=>{
        let {items}=this.state
        items=[...items.slice(0,e.target.id),...items.slice(e.target.id+1)]
        this.setState({items})
    }
    change=(e)=>{
        let {items}=this.state
        let id =e.target.id.slice(0,-1)
        let num=e.target.id.slice(-1)
        switch(id){
            case 'nameLands':
                items[num].name=e.target.value
                break;
            case 'priceLands':
                if(Number(e.target.value) || e.target.value.includes('.') || e.target.value==='' || e.target.value==='0.'){
                    items[num].price=e.target.value
                }
                break;
            case 'numberLands':
                if(Number(e.target.value) || e.target.value===''){
                    items[num].number=e.target.value
                }
                break;
            case 'desLands':
                items[num].des=e.target.value
                break;
        }
        this.setState({items})
    }
    widget=()=>(
        cloudinary.createUploadWidget({
            cloudName: 'johnny11',
            uploadPreset: 'q1bjjs9hgr5h'}, (error, result) => { 
              if (!error && result && result.event === "success") {
                    this.setState({items:[...this.state.items,{name:'',price:'0.00',des:'',number:'0',url:result.info.secure_url}]})
              }
            }).open()
    )
    render() {
        let {items} =this.state
        return (
            <div className='lands'>
                <button className='butLands' onClick={this.widget}>Add Product to sell</button>
                {items.map((i,k)=>(
                    <div className='itemLands'>
                        <img src={i.url} className='imageLands' />
                        <div>
                            <h3>Name of products</h3>
                            <input id={'nameLands'+k} value={i.name} onChange={this.change} />
                            <h3>Input the price of the product</h3>
                            <input id={'priceLands'+k} value={i.price} onChange={this.change} />
                            <h3>Number of items available</h3>
                            <input id={'numberLands'+k} value={i.number} onChange={this.change} />
                            <h3>Describe your products in a few words</h3>
                            <textarea id={'desLands'+k} value={i.des} onChange={this.change} />
                            <button id={k} className='remButLands' onClick={this.remove}>Remove</button>
                        </div>
                    </div>
                ))}
                <div className='endButtons'>
                <button className='buttonsHome' onClick={this.back} >Back</button>
                <button className='buttonsHome' style={{backgroundColor:'green'}} onClick={this.save}>Review</button>
                </div>
            </div>
        );
    }
}


const App=(props)=>{
    const [index,setIndex]=useState(0)
    const [first,setFirst]=useState({})
    const [second,setSecond]=useState({})
    const [third,setThird]=useState({})
    const [fourth,setFourth]=useState({})
    const changy=(aid)=>{
        setIndex(aid)
    }
    const refChange=(data,num)=>{
        if(num===1){
            setFirst(data)
        }else if(num===2){
            setSecond(data)
        }else if(num===3){
            setThird(data)
        }else if(num ===4){
            setFourth(data)
        }
    }
    if(index===3){
        return <Landings {...props} refChange={(data)=>{refChange(data,4)}} changy={(num)=>changy(num)} />
    }
    else if(index===1){
        return <SignIn {...props} refChange={(data)=>{refChange(data,2)}} changy={(num)=>changy(num)} />
    }
    else if(index===2){
        return <SignUp {...props} refChange={(data)=>{refChange(data,3)}} changy={(num)=>changy(num)} />
    }else if(index===4){
        return <Creative {...props} total={{first,second,third,fourth,changy:(num)=>changy(num)}} />
    }
    else {
        return <Custom {...props} refChange={(data)=>{refChange(data,1)}} changy={(num)=>changy(num)} />
    }
}

export default App