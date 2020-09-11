import React, { Component, useState, useEffect } from 'react'
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
            this.setState({name:info.name,fileData:info.fileData,selectTemp:this.state.temp[info.temp],index:3,loading:false})

        }
        else if(this.props.total){
            let total=this.props.total
            console.log(total)
            this.setState({first:total.first,second:total.second,third:total.third,fourth:total.fourth, fifth:total.fifth, loading:false})
        }
        else{
            ident=this.getUrlParameter('id')
            custIdent=this.getCookie('id')
            fetch('/getData',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,custId:custIdent})}).then(res=>res.json()).then(dat=>{
                if(dat.status ==='success'){
                    let data=dat.dat
                    console.log(data)
                    this.setState({email:data.email,fileData:data.fileData, name:data.company,loading:false,
                    first:data.first, second:data.second, third:data.third,fourth:data.fourth,fifth:data.fifth, data:data.data})
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
            0:<Item1 {...this.props} first={this.state.first} change={(num)=>{this.setState({index:num})}}/>,
            1:<Item2 {...this.props} second={this.state.second} first={{backImg:this.state.first.backImg,backCol:this.state.first.backCol}} change={(num)=>{this.setState({index:num})}} changeData={(data)=>{this.setState({data})}} />,
            2:<Item3 {...this.props} third={this.state.third} first={{backImg:this.state.first.backImg,backImg2:this.state.selectTemp,backCol:this.state.first.backCol}} change={(num)=>{this.setState({index:num})}} changeData={(data)=>{this.setState({data})}} />,
            3:<Item4 {...this.props} fileData={this.state.fileData} cart={this.state.cart} first={{backImg:this.state.selectTemp || this.state.first.backImg,backCol:this.state.first.backCol || 'rgb(223, 234, 247)'}} change={(num)=>{this.setState({index:num})}} carter={(cart)=>{this.setState({cart})}} />,
            4:<Item5 {...this.props} data={{name:this.state.data.name, email:this.state.data.email}} cart={this.state.cart} change={(num)=>{this.setState({index:num})}} carter={(cart)=>{this.setState({cart})}} />
        }
        return (
            <div style={{opacity:0.5}} className='diddy' >
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
                props.first.container1.image: 
                props.first.container1.text}
                {!(props.first.last1==='image' && props.first.container1.image!=="") && <div className='showFirst'><h5>Already a member? </h5><button onClick={()=>props.change(1)} className='signin'>Sign In</button></div>}
                {!(props.first.last1==='image' && props.first.container1.image!=="") && <div className='showFirst'><h5>Go to Products Page</h5><button onClick={()=>props.change(3)} className='signin'>Products</button></div>}
            </div>  
                <div className='firstCont' style={{backgroundImage:'url('+props.first.container2.backgroundImage+')',backgroundSize:'100% 100%', backgroundColor:props.first.container2.backgroundColor, color:props.first.container2.color}} >
                {props.first.last2==='text' && props.first.container2.text!==""?
                props.first.container2.text:
                props.first.container2.image}
                {(props.first.last2==='text' && props.first.container2.text!=="") && <div className='showFirst'><h5>Already a member? </h5><button onClick={()=>props.change(1)} className='signin'>Sign In</button></div>}
                {(props.first.last2==='text' && props.first.container2.text!=="") && <div className='showFirst'><h5>Go to Products Page</h5><button onClick={()=>props.change(3)} className='signin'>Products</button></div>}
            </div>
        </div>
        <div className='downCreate' style={{backgroundImage:'url('+props.first.container3.backgroundImage+')',backgroundSize:'100% 100%', backgroundColor:props.first.container3.backgroundColor, color:props.first.container3.color}}>
            {props.first.last3==='text' && props.first.container3.text!==""?
            props.first.container3.text:
            props.first.container3.image}
        </div>
    </div>
)
const Item2=(props)=>{
    const [emails,setEmail]=useState('')
    const [passwords,setPassword]=useState('')
    const [arbtr, setArbtr]=useState([])
    const [type,setType]=useState(true)

    useEffect(()=>{
        props.second.form.map(i=>{
            if(!(i.name==='UserName/Email' || i.name==='Password')){
                let newt=[...arbtr]
                newt.push({name:i.name,type:i.type,value:''})
                setArbtr(newt)
            }
        })
    },props.second)

    const changer=(e,i)=>{
        let new_ = [...arbtr]
        new_[i].value=e.target.value
        setArbtr(new_)
    }
    const login=()=>{
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

    const Email=(props)=><div className='forms yes1'><i class="fa fa-envelope" aria-hidden="true"></i><input id='userFirst' value={props.emails} onChange={(e)=>props.change(e.target.value)} placeholder='Please enter your email or username' required/></div>
    const Password=(props)=><div className='forms'><i class="fa fa-lock" aria-hidden="true"></i><input type='password' id='passFirst' value={props.password} onChange={(e)=>props.change(e.target.value)} placeholder='Enter your password' required /><button className='yum' onClick={()=>props.typeChange()}>{!props.type? <i class="fa fa-eye-slash" aria-hidden="true"></i>: <i class="fa fa-eye"></i>}</button></div>
    
    return(
    <div className='mainSignIn' style={{backgroundImage:props.first.backImg,backgroundColor:props.first.backCol}}>
        <div className='signIn noPass'>
            {props.second.form.map((i,k)=>{
                if(i.name==='UserName/Email'){
                    return <Email key={k} emails={emails} change={(new_)=>{setEmail(new_)}} />
                }else if(i.name==='Password'){
                    return <Password key={k} password={passwords} change={(new_)=>setPassword(new_)} type={type} typeChange ={()=>{setType(!type)}} />
                }else{
                    return <div key={k} className='signDivForm'><h5>{i.name}</h5><input className='inputSignIn' type={i.type} value={arbtr[k].value || ''} onChange={(e)=>changer(e,k)} /></div> 
                }
            })}
            <p id='checked'></p>
            <button className='loggy' onClick={()=>login()} >Sign In</button><p className='forgot'><a href='/forgot'>Forgot your Password?</a></p><div className='helf'>Not a member?<button onClick={()=>{props.change(2)}}>Sign Up</button></div>
        </div>
    </div>
    )
}

const Item3=(props)=>{
    const [form,setForm]=useState([])
    const [check, setCheck]=useState(false)

    useEffect(()=>{
        let newt=[...form]
        props.third.map(i=>{
            newt=[...newt,{name:i.name,type:i.type,value:''}]
        })
        setForm(newt)
    },props.third)

    const change=(e,i)=>{
        let old=[...form]
        old[i].value=e.target.value
        setForm(old)
    }
    const submit=()=>{
        let filt=[...new Set(form.filter(i=>i.type==='password'))]
        let skip = form.filter(i=> i.value='')
        if(check){
            if(filt.length ===1 && skip.length <= 0){
                fetch('/mininewuser',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,custId:custIdent, form})}).then(res=>res.json()).then(data=>{
                    if(data.status==='success'){
                        props.change(3)
                        props.changeData(data)
                    }
                    else{
                        document.getElementById('checkdi').innerText='An error occured try again'
                    }
                })
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
            <h1>Welcome to {props.third.name}</h1>
        </div>
        <p className='log'>Already a member? <button onClick={()=>{this.setState({index:1})}}>Sign In.</button></p>
        <div className='right' >
            <h2 className='namer'>Register on {this.state.name}.</h2>
            <hr/>
            <div className='names'>
            {props.third.form.map((i,k)=>{
                if(i.type==='password'){
                    return (<div><h3>{i.name}</h3><input key={k} type={i.type} placeholder='Must contain at least 6 characters and at least one number' value={form[k].value} onChange={(e)=>change(e,k)} required /></div>)
                }
                return (<div><h3>{i.name}</h3><input key={k} type={i.type} value={form[k].value || ''} onChange={(e)=>change(e,k)} required /></div>)
            })}
            </div>
            <p id='checkdi' style={{color:'red'}}></p>
            <input type='checkbox' className='id' id='checkbox' onChange={()=>{setCheck(!check)}} name='checkbox' value={check} required />
            <label for='checkbox' className='id' >Creating an account means you're okay with our terms and conditions.</label><br />
            <button className='but' onClick={()=>{submit()}}> Create Account</button>
        </div>
        <p id='copywrite'> ©{new Date().getFullYear()}</p>
    </div>
    )
}

const Item4=(props)=>{
    const[cart, setCart]=useState([])

    useEffect(()=>{
        setCart(props.cart)
    },[props.cart])

    const add=(item,id)=>{
        if(!cart.includes(item)){
            setCart([...cart,{...item,id}])
            props.carter(cart)
            save()
            document.getElementById('mess').innerHTML='Added to Cart'
        }
        else{
            document.getElementById('mess').innerHTML='Already added to Cart, you can increase the number of a particular item at the checkout.'
        }
    }
    const save=()=>{
        const method={method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,custId:custIdent,cart})}
        fetch('saveCart',method).then(res=>res.json())
    }

    return(
    <div className='total' style={{backgroundImage:props.first.backImg,backgroundColor:props.first.backCol}} >
        <div className='head'>
            <div className='butonn'>
            <p className='cart'>{cart.length}</p>
            <p className='homer' onClick={()=>{if(cart.length>0){props.change(4)}
                                                else if(props.data.name){props.change(1)}}}>🛒</p>
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
                    <p  className='describe'>{i.des}</p>
                    <button id='hover' onClick={()=>{add({'path':i.url,'price':i.price,'content':i.des},k)}}>BUY NOW</button>
                </div>)
            })}
        </div>
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
    const[cart, setCart]=useState([])

    useEffect(()=>{
        setCart(props.cart)
    })

    const componentProps = {
        email:props.data.email,
        amount:props.cart.map(i=>Number(i.price)).reduce((acc,value)=>acc+value,0),
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

    const done=()=>{
        //send to server and setState
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
        {props.cart.map(i=>(
            <div className='seeny'>
            <img className='deen' src={i.path} />
            <p>{i.content}</p>
            <h5>NGN {i.price}</h5>
            </div>)
        )}
        <h5 id='downi'></h5>
        <div className='biggy'>
            <button className='shop' onClick={()=>{props.change(3)}}>Back</button> 
            <PaystackButton id='kkk' {...componentProps} /> 
            <h3>Sub-Total: {props.cart.map(i=>Number(i.price)).reduce((acc,value)=>acc+value,0)}</h3>
        </div>
    </div>
    )
}
// add and add twitter acct, facebook acct, email done, instagram acct