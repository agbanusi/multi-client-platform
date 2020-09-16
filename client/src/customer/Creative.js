import React, { Component, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { PaystackButton } from 'react-paystack'
import './Creative.css'
import img from '../assets/undraw_online_video_ivvq.svg'
import img1 from '../assets/undraw_web_search_eetr.svg'
import img2 from '../assets/undraw_business_shop_qw5t.png'
import img3 from '../assets/undraw_group_selfie_ijc6.png'
import img4 from '../assets/undraw_selfie_time_cws4.png'
import img5 from '../assets/Repeating-Triangles.svg'
import img6 from '../assets/Diamond-Sunset.svg'
import img7 from '../assets/Liquid-Cheese.svg'
import img8 from '../assets/Rainbow-Vortex.svg'
import Loader from 'react-loader-spinner';

var ident
var custIdent
export default class Creative extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            selectTemp:'',
            temp:[img1,img2,img3,img4,img,img5,img6,img7,img8],
            fileData:[],
            cart:[],
            index:0,
            type:false,
            data:'',
            loading:true,
            first:[],
            second:[],
            third:[],
            fourth:[],
            fifth:[]
        }
    }
    componentDidMount(){
        if(this.props.info){
            let info=this.props.info
            this.setState({name:info.name,fourth:info.fileData,fileData:info.fileData,selectTemp:this.state.temp[info.temp],index:3,loading:false})
        }
        else if(this.props.total){
            let total=this.props.total
            document.getElementById('diddyCreate').style.opacity=1
            this.setState({first:total.first,second:total.second,third:total.third,fourth:total.fourth.items, loading:false})
            document.getElementById('diddyCreate').style.opacity=1
        }
        else{
            //server path attention
            ident=this.getUrlParameter('id')
            custIdent=this.getCookie('id')
            fetch('/getCustomerData',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,custId:custIdent})}).then(res=>res.json()).then(dat=>{
                if(dat.status ==='success'){
                    let data=dat.dat
                    document.getElementById('diddyCreate').style.opacity=1
                    this.setState({email:data.email,fileData:data.fileData, name:data.company,loading:false,
                    first:data.first, second:data.second, third:data.third,fourth:data.fourth, data:data.data})
                }
                else{
                    window.location.href='/'
                }
            })
        }
    }
    getCookie=(name)=>{
        var ident
        let t = decodeURIComponent(document.cookie).split(';')
        t.map(i => {
            let b = i.trim().split('=')
            if (b[0] === name) {
                ident = b[1]
            }
        })
        return ident
    };
    getUrlParameter=(name)=>{
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    render() {
        const show={
            0:<Item1 {...this.props} total={this.props.total} first={this.state.first} change={(num)=>{this.setState({index:num})}}/>,
            1:<Item2 {...this.props} total={this.props.total} second={this.state.second} first={{backImg:this.state.first.backImg,backCol:this.state.first.backCol}} change={(num)=>{this.setState({index:num})}} changeData={(data)=>{this.setState({data})}} />,
            2:<Item3 {...this.props} total={this.props.total} third={this.state.third} first={{backImg:this.state.first.backImg,backImg2:this.state.selectTemp,backCol:this.state.first.backCol}} change={(num)=>{this.setState({index:num})}} changeData={(data)=>{this.setState({data})}} />,
            3:<Item4 {...this.props} total={this.props.total} data={{name:this.state.data.name, email:this.state.data.email}} fileData={this.state.fourth} cart={this.state.cart} first={{backImg:this.state.selectTemp || this.state.first.backImg,backCol:this.state.first.backCol || 'rgb(223, 234, 247)'}} change={(num)=>{this.setState({index:num})}} carter={(cart)=>{this.setState({cart})}} />,
            4:<Item5 {...this.props} total={this.props.total} data={{name:this.state.data.name, email:this.state.data.email}} cart={this.state.cart} change={(num)=>{this.setState({index:num})}} carter={(cart)=>{this.setState({cart})}} />
        }
        return (
            <div style={{opacity:0.5}} className='diddy' id='diddyCreate' >
               {this.state.loading? <Loader type="ThreeDots" color="Green" height="100" width="100" className="tryi" />:show[this.state.index]} 
            </div>
        )
    }
}

const Item1=(props)=>(
    <div className='passid' style={{backgroundImage:props.first.backImg,backgroundColor:props.first.backCol}}>
        <div className='beautCustom beauterCustom'>
            <div className='firstCont' style={{backgroundImage:'url('+props.first.container1.backgroundImage+')',backgroundSize:'100% 100%', backgroundColor:props.first.container1.backgroundColor, color:props.first.container1.color}}>
                {props.first.last1==='image' && props.first.container1.image!==""?
                <img className='nittyCreateImg' src={props.first.container1.image} />: 
                <h3 className='nittyCreate'>{props.first.container1.text}</h3>}
                {!(props.first.last1==='image' && props.first.container1.image!=="") && <div className='showFirst'><h5>Already a member? </h5><button onClick={()=>props.change(1)} className='signin'>Sign In</button></div>}
                {!(props.first.last1==='image' && props.first.container1.image!=="") && <div className='showFirst'><h5>Go to Products Page</h5><button onClick={()=>props.change(3)} className='signin'>Products</button></div>}
            </div>  
                <div className='firstCont' style={{backgroundImage:'url('+props.first.container2.backgroundImage+')',backgroundSize:'100% 100%', backgroundColor:props.first.container2.backgroundColor, color:props.first.container2.color}} >
                {props.first.last2==='text' && props.first.container2.text!==""?
                <h3 className='nittyCreate'>{props.first.container2.text}</h3>:
                <img className='nittyCreateImg' src={props.first.container2.image} />}
                {(props.first.last2==='text' && props.first.container2.text!=="") && <div className='showFirst'><h5>Already a member? </h5><button onClick={()=>props.change(1)} className='signin'>Sign In</button></div>}
                {(props.first.last2==='text' && props.first.container2.text!=="") && <div className='showFirst'><h5>Go to Products Page</h5><button onClick={()=>props.change(3)} className='signin'>Products</button></div>}
            </div>
        </div>
        <div className='downCreate' style={{backgroundImage:'url('+props.first.container3.backgroundImage+')',backgroundSize:'100% 100%', backgroundColor:props.first.container3.backgroundColor, color:props.first.container3.color}}>
            {props.first.last3==='text' && props.first.container3.text!==""?
            <h3 className='nittyCreateDown'>{props.first.container3.text}</h3>:
            <img className='nittyCreateImgDown' src={props.first.container3.image} />}
        </div>
        {props.total?<div className='nextDivCreate'><button className='nextCreate' onClick={()=>props.change(1)}>NEXT</button></div>:<></>}
    </div>
)
const Item2=(props)=>{
    const [emails,setEmail]=useState('')
    const [passwords,setPassword]=useState('')
    const [arbtr, setArbtr]=useState([])
    const [type,setType]=useState(true)

    useEffect(()=>{
        console.log(props.second)
        props.second.form.map(i=>{
            let newt=[...arbtr]
            newt.push('')
            setArbtr(newt)
        })
    },[props.second])

    const changer=(e,i)=>{
        let new_ = [...arbtr]
        new_[i]=e.target.value
        setArbtr(new_)
    }
    const login=()=>{
        //server path attention
        fetch('/minilogin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,custId:custIdent, username:emails,password:passwords,arbtr})}).then(res=>res.json()).then(data=>{
            if(data.status==='success'){
                props.change(3)
                props.changeData(data)
            }
            else{
                document.getElementById('checked').innerHTML=this.state.username.includes('.com')?"Email or Password Incorrect" : "Username or Password Incorrect"
            }
        })
    }
    
    return(
    <div className='mainSignIn' style={{backgroundImage:props.first.backImg,backgroundColor:props.first.backCol}}>
        <div className='signIn noPass'>
            {props.second.form.map((i,k)=>{
                if(i.name==='Username/Email'){
                    return <div key={k} className='forms yes1'><i class="fa fa-envelope" aria-hidden="true"></i><input id='userFirst' value={emails} onChange={(e)=>setEmail(e.target.value)} placeholder='Please enter your email or username' required/></div>
                }else if(i.name==='Password'){
                    return <div key={k} className='forms'><i class="fa fa-lock" aria-hidden="true"></i><input type={!type?'text':'password'} id='passFirst' value={passwords} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' required /><button className='yum' onClick={()=>setType(!type)}>{!type? <i class="fa fa-eye-slash" aria-hidden="true"></i>: <i class="fa fa-eye"></i>}</button></div>
                }else{
                    return <div key={k+'form'} className='signDivForm'><h5>{i.name}</h5><input className='inputSignIn' type={i.type} value={arbtr[k] || ''} onChange={(e)=>changer(e,k)} /></div> 
                }
            })}
            <p id='checked'></p>
            <button className='loggy' onClick={()=>login()} >Sign In</button><p className='forgot'><a href='/forgot'>Forgot your Password?</a></p><div className='helf'>Not a member?<button onClick={()=>{props.change(2)}}>Sign Up</button></div>
        </div>
        {props.total?<div className='nextDivCreate'><button className='nextCreate' onClick={()=>props.change(2)}>NEXT</button>
        <button className='nextCreate' onClick={()=>props.change(0)}>BACK</button></div>:<></>}
    </div>
    )
}

const Item3=(props)=>{
    const [form,setForm]=useState([])
    const [check, setCheck]=useState(false)

    useEffect(()=>{
        let newt=[...form]
        props.third.form.map(i=>{
            newt=[...newt,'']
        })
        setForm(newt)
    },props.third)

    const change=(e,i)=>{
        let old=[...form]
        old[i]=e.target.value
        setForm(old)
    }
    const submit=()=>{
        //server path attention
        let indexes= props.third.form.map((i,k)=> i.type==='password'?k:'').filter(String)
        let values = indexes.map(i=> form[i])
        let filt=[...new Set(values)]
        let skip = form.filter(i=> i=='')
        if(check){
            if(filt.length ===1 && skip.length <= 0){
                if(filt[0].length>=7 && (/\d/g).test(filt[0])){
                    fetch('/mininewuser',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,custId:custIdent, form})}).then(res=>res.json()).then(data=>{
                        if(data.status==='success'){
                            props.change(3)
                            props.changeData(data)
                        }
                        else{
                            document.getElementById('checkdi').innerText='An error occured try again'
                        }
                    })
                }else{
                    document.getElementById('checkdi').innerText="Password not strong enough."
                }
                
            }else if(filt.length < 0 || skip.length > 0){
                document.getElementById('checkdi').innerText='One or more field are unfilled, Please fill them before submitting.'
            }else{
                document.getElementById('checkdi').innerText='Your passwords don\'t match'
            }
        }
        else{
            document.getElementById('checkdi').innerText='You haven\'t checked the box for terms and services.'
        }
        
    }

    return(
    <div id='signedd' style={{backgroundImage:props.first.backImg,backgroundColor:props.first.backCol}} >
        <div className='leftin' style={{backgroundImage:''}} >
            <h1>Welcome to {props.third.companyName}</h1>
        </div>
        <p className='log'>Already a member? <button onClick={()=>{props.change(1)}}>Sign In.</button></p>
        <div className='right' >
            <h2 className='namer'>Register on {props.third.companyName}.</h2>
            <hr/>
            <div className='names'>
            {props.third.form.map((i,k)=>{
                if(i.type==='password'){
                    return (<div><h3>{i.name}</h3><input key={k} type={i.type} placeholder='Must contain at least 6 letters characters and at least one number' value={form[k]} onChange={(e)=>change(e,k)} required /></div>)
                }
                return (<div><h3>{i.name}</h3><input key={k} type={i.type} value={form[k] || ''} onChange={(e)=>change(e,k)} required /></div>)
            })}
            </div>
            <p id='checkdi' style={{color:'red'}}></p>
            <div className='ideaCreate'>
            <input type='checkbox' className='id' id='checkbox' onChange={()=>{setCheck(!check)}} name='checkbox' value={check} required />
            <label for='checkbox' className='id' >Creating an account means you're okay with our terms and conditions.</label>
            </div>
            <button className='but' onClick={()=>{submit()}}> Create Account</button>
        </div>
        {props.total?<div className='nextDivCreate'><button className='nextCreate' onClick={()=>props.change(3)}>NEXT</button>
        <button className='nextCreate' onClick={()=>props.change(1)}>BACK</button></div>:<></>}
        <p id='copywrite'> ©{new Date().getFullYear()}</p>
    </div>
    )
}

const Item4=(props)=>{
    const[cart, setCart]=useState(props.cart)

    const add=(item,id)=>{
        if(!cart.includes(item)){
            setCart([...cart,{...item,id}])
            props.carter([...cart,{...item,id}])
            save()
            document.getElementById('mess').innerHTML='Added to Cart'
        }
        else{
            document.getElementById('mess').innerHTML='Already added to Cart, you can increase the number of a particular item at the checkout.'
        }
    }
    const save=()=>{
        //server path attention
        const method={method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,custId:custIdent,cart})}
        fetch('/saveCart',method).then(res=>res.json())
    }

    return(
    <div className='total' style={{backgroundImage:props.first.backImg,backgroundColor:props.first.backCol}} >
        <div className='head'>
            <div className='butonn'>
            <p className='cart'>{cart.length}</p>
            <p className='homer' onClick={()=>{if(cart.length>0){props.change(4)}
                                                else if(props.data.name){props.change(1)}else{props.change(4)}}}>🛒</p>
            </div>
            <button className='home buton' onClick={()=>{props.change(0)}}>Welcome Page</button>
        </div>
        <h1 id='messy'>Welcome {props.data.name || 'Guest'} to Our Store</h1>
        <h5 id='mess'> </h5>
        <div className='bodyLin'>
            {props.fileData.map((i,k)=>{
            return(<div id={k} key={k} className='show'>
                    <img className='displayid' src={i.url}  alt='logo' />
                    <h2>{i.name}</h2>
                    <h3 className='price'>{i.price}</h3>
                    <h4>{Number(i.number)} items remaining</h4>
                    <p  className='describe'>{i.des}</p>
                    <button id='hover' onClick={()=>{add({'path':i.url,'price':i.price,'content':i.des},k)}} disabled={i.numbers<1? true:false}>BUY NOW</button>
                </div>)
            })}
        </div>
        {props.total?<div className='nextDivCreate'><button className='nextCreate' onClick={()=>props.change(4)}>NEXT</button>
        <button className='nextCreate' onClick={()=>props.change(2)}>BACK</button></div>:<></>}
        <footer class='footer'>
        <div class='media'>
        <i class="fa fa-facebook-official" aria-hidden="true"><a href='facebook' /></i>
        <i class="fa fa-whatsapp" aria-hidden="true"><a href='whatsapp' /></i>
        <i class="fa fa-twitter" aria-hidden="true"><a href='twitter' /></i>
        <i class="fa fa-instagram" aria-hidden="true"><a href='instagram' /></i>
        </div>
        <p>© {new Date().getFullYear()}</p>
        </footer>
    </div>
    )
}

const Item5=(props)=>{
    const[cart, setCart]=useState(props.cart)
    const [no, setNo] = useState(props.cart.map(i=>1))

    const componentProps = {
        email:props.data.email,
        amount:(props.cart.map(i=>Number(i.price)).reduce((acc,value)=>acc+value,0))*100,
        metadata: {
          name:props.data.name,
          phone: '08012345678',
        },
        text: "Pay Now",
        publicKey:'pk_live_9d3b45fa5d4ea9a2ba0a4ee95906fbda1d50fe37',
        onSuccess: () =>{
            done();
            return alert("Thanks for doing business with us! Your item is on the way ")
        },
        onClose: () => alert("Wait! You need this, don't go!!!!"),
    
    }
    const remove=(k)=>{
        let carted=[...cart.slice(0,k),...cart.slice(k+1)]
        setCart(carted)
    }
    const add=(k)=>{
        let numb = no
        numb[k] +=1
        setNo(numb)
    }
    const done=()=>{
        //send to server and setState
        //server path attention
        fetch('/customerPaid',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,custId:custIdent,cart})}).then(res=>res.json()).then(data=>{
            if(data.status=='success'){
                document.getElementById('downi').innerHTML='Payment verified and order sent!'
                setCart([])
                props.carter([])
            }
            else{
                document.getElementById('downi').innerHTML='An Error Occured, please wait as we verify your payment and confirm your order.'
            }
        })
    }
    return(
    <div className='cati'>
        {props.cart.map((i,k)=>(
            <div className='falseSeeny'>
                <div className='seeny'>
                <img className='deen' src={i.path} />
                <h4>{i.name}</h4>
                <p>{no[k]}</p>
                <h5>NGN {i.price*no[k]}</h5>
                </div>
                <div className='bottomSeeny'>
                <button className='removeCartItem' onClick={()=>remove(k)}>Remove</button>
                <button className='removeCartItem' onClick={()=>add(k)}>Add More</button>
                </div>
            </div>)
        )}
        <h5 id='downi'></h5>
        <div className='biggy'>
            <button className='shop' onClick={()=>{props.change(3)}}>Back</button> 
            <PaystackButton className='kkk' id='kkk' {...componentProps} /> 
            <h3>Sub-Total: NGN {(props.cart.map(i=>Number(i.price)).reduce((acc,value)=>acc+value,0)).toFixed(2)}</h3>
        </div>
        {props.total?<div className='nextDivCreate'><button className='nextCreate' onClick={()=>props.total.changy(0)}>Change</button>
        <button className='nextCreate' onClick={()=>props.change(3)}>BACK</button></div>:<></>}
    </div>
    )
}
// add and add twitter acct, facebook acct, email done, instagram acct