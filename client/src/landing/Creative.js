import React, { Component } from 'react'
import { PaystackButton } from 'react-paystack'
import './Creative.css'
import img from './undraw_online_video_ivvq.svg'
import img1 from './undraw_web_search_eetr.svg'
import img2 from './undraw_business_shop_qw5t.png'
import img3 from './undraw_group_selfie_ijc6.png'
import img4 from './undraw_selfie_time_cws4.png'
import img5 from './Repeating-Triangles.svg'
import img6 from './Diamond-Sunset.svg'
import img7 from './Liquid-Cheese.svg'
import img8 from './Rainbow-Vortex.svg'
import Loader from 'react-loader-spinner';

var ident
export default class Creative extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            selectTemp:'',
            selectTemplate:'',
            temp:[img1,img2,img3,img4,img],
            templates:[img5,img6,img7,img8],
            files:[],
            fileData:[],
            cart:[],
            index:0,
            username:'',
            password:'',
            emailer:'',
            fullName:'',
            password2:'',
            check:false,
            type:false,
            data:'',
            loading:true
        }
    }
    componentDidMount(){
        if(this.props.info){
            let info=this.props.info
            this.setState({name:info.name,files:info.files,fileData:info.fileData,selectTemp:this.state.temp[info.temp],selectTemplate:this.state.templates[info.template],index:3})

        }
        else{
            ident=this.getUrlParameter('id')
            fetch('/getData',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident})}).then(res=>res.json()).then(dat=>{
                if(dat.status =='success'){
                    let data=dat.dat
                    console.log(data)
                    this.setState({email:data.email,files:data.files,fileData:data.fileData,selectTemp:this.state.temp[data.temp],selectTemplate:this.state.templates[data.template], name:data.company})
                }
                else{
                    //reload page
                }
            })
        }
    }
    typeChange=()=>{
        if(!this.state.type){
            document.getElementById('passFirst').type='text'
        }
        else{
            document.getElementById('passFirst').type='password'
        }
        this.setState({type:!this.state.type})
    }
    add=(item,id)=>{
        if(!this.state.cart.includes(item)){
            this.setState({cart:[...this.state.cart,{...item,id}]})
            document.getElementById('mess').innerHTML='Added to Cart'
        }
        else{
            document.getElementById('mess').innerHTML='Already added to Cart.'
        }
        
    }
    change=(e)=>{
        switch(e.target.id){
            case 'userFirst':
            case 'username':
                this.setState({username:e.target.value})
                break;
            case 'passFirst':
            case 'password':
                this.setState({password:e.target.value})
                break;
            case 'name':
                this.setState({fullName:e.target.value})
                break;
            case 'email':
                this.setState({emailer:e.target.value})
                break;
            case 'password2':
                this.setState({password2:e.target.value})
                break;
            case 'checkbox':
                this.setState({check:!this.state.check})
                break;

        }
    }
    login=()=>{
        fetch('/minilogin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident, username:this.state.username,password:this.state.password})}).then(res=>res.json()).then(data=>{
            if(data.status=='success'){
                this.setState({index:3,data:data})
            }
            else{
                document.getElementById('checked').innerHTML=this.state.username.includes('.com')?"Email or Password Incorrect" : "Username or Password Incorrect"
            }
        })
    }
    submit=()=>{
        if(this.state.checked && this.state.password==this.state.password2){
            fetch('/mininewuser',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,name:this.state.name,email:this.state.email,username:this.state.username,password:this.state.password}) }).then(res=>res.json()).then(data=>{
                if(data.status == 'success'){
                    this.setState({index:3})
                }
                else{
                    document.getElementById('checkdi').innerText='An error occured try again'
                }
            })
        }
        else{
            document.getElementById('checkdi').innerText='Your passwords don\'t match and you haven\'t checked the box'
        }
    }
    getUrlParameter=(name)=>{
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    render() {
        var componentProps = {
            email:this.state.email,
            amount:this.state.cart.map(i=>Number(i.price)).reduce((acc,value)=>acc+value,0),
            metadata: {
              name:this.state.name,
              phone: '08012345678',
            },
            text: "Pay Now",
            publicKey:'pk_live_9d3b45fa5d4ea9a2ba0a4ee95906fbda1d50fe37',
            onSuccess: () =>{
                this.done();
                return alert("Thanks for doing business with us! Your item is on the way ")
            },
            onClose: () => alert("Wait! You need this, don't go!!!!"),
        
          }
        const item1=(
            <div className='passid' ><h2> Welcome to {this.state.name}</h2>
        <div><h5>Get Access to our magnificient products and get free delivery</h5><button className='signup' onClick={()=>{this.setState({index:2})}}>Sign Up</button></div>
        <div><h5>Already a member? </h5><button onClick={()=>{this.setState({index:1})}} className='signin'>Sign In</button></div>
        </div>
        )
        const item2=(
            <div className='noPass' ><div className='forms yes1'><i class="fa fa-envelope" aria-hidden="true"></i><input id='userFirst' value={this.state.username} onChange={this.change} placeholder='Please enter your email or username' required/></div>
            <div className='forms'><i class="fa fa-lock" aria-hidden="true"></i><input type='password' id='passFirst' value={this.state.password} onChange={this.change} placeholder='Enter your password' required /><button className='yum' onClick={this.typeChange}>{!this.state.type? <i class="fa fa-eye-slash" aria-hidden="true"></i>: <i class="fa fa-eye"></i>}</button></div>
            <p id='checked'></p>
            <button className='loggy' onClick={this.login}>Sign In</button><p className='forgot'><a href='/forgot'>Forgot your Password?</a></p><div className='helf'>Not a member?<button onClick={()=>{this.setState({index:2})}}>Sign Up</button></div></div> 
        )
        const item3=(
            <div id='signedd' >
                <div className='leftin' style={{backgroundImage:'url('+this.state.selectTemplate+')'}}>
                    <h1>Welcome to {this.state.name}</h1>
                    </div>
                <div className='right' >
                    <p className='log'>Already a member?<button onClick={()=>{this.setState({index:1})}}>Sign In.</button></p>
                    <div className='form'>
                    <h2 className='namer'>Register on {this.state.name}.</h2>
                    <hr/>
                    <div className='names'>
                    <div><h3>Full Name</h3><input id='name' value={this.state.fullName} onChange={this.change} required /></div>
                    <div><h3>Username</h3><input id='username' value={this.state.username} onChange={this.change} required /></div>
                    </div>
                    <div className='mail'><h3>Email Address</h3><input id='email' type='email' value={this.state.emailer} onChange={this.change} required/></div>
                    <div className='mail'><h3>Password</h3><input id='password' type='password' minLength='6' value={this.state.password} required onChange={this.change} placeholder='At least 6 characters and must contain at least one number' /></div>
                    <p id='checkdi' style={{color:'red'}}></p>
                    <div className='mail'><h3>Repeat Password</h3><input id='password2' value={this.state.password2} onChange={this.change} required /></div>
                    <input type='checkbox' className='id' id='checkbox' onChange={this.change} name='checkbox' value={this.state.check} required />
                    <label for='checkbox' className='id' >Creating an account means you're okay with our terms and conditions.</label><br />
                    <button className='but' onClick={this.submit}> Create Account</button>
                    </div>
                    <p id='copywrite'> ©{new Date().getFullYear()}</p>
                </div>
            </div>
        )
        const item4=(
            <div className='total' >
                <div className='head'>
                    <div className='butonn'>
                    <p className='cart'>{this.state.cart.length}</p>
                    <p className='homer' onClick={()=>{if(this.state.cart.length>0){this.setState({index:4})}}}>🛒</p>
                    </div>
                    <button className='home buton' onClick={()=>{this.setState({index:0})}}>Welcome Page</button>
                </div>
                <h1 id='messy'></h1>
                <h5 id='mess'> </h5>
                <div className='bodyLin'>
                    {this.state.files.map((i,k)=>{
                    return(<div id={k} key={k} className='show'>
                            <img className='displayid' src={i}  alt='logo' />
                            <h2>{this.state.fileData[k].name}</h2>
                            <h3 className='price'>{this.state.fileData[k].price}</h3>
                            <p  className='describe'>{this.state.fileData[k].des}</p>
                            <button id='hover' onClick={()=>{this.add({'path':i,'price':this.state.fileData[k].price,'content':this.state.fileData[k].des},k)}}>BUY NOW</button>
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

        const item5=(
            <div className='cati'>
                {this.state.cart.map(i=>(
                    <div className='seeny'>
                    <img className='deen' src={i.path} />
                    <p>{i.content}</p>
                    <h5>NGN {i.price}</h5>
                    </div>)
                )}
                <div className='biggy'><button className='shop' onClick={()=>{this.setState({index:3})}}>Back</button> <PaystackButton id='kkk' {...componentProps} /> <h3>Sub-Total: {this.state.cart.map(i=>Number(i.price)).reduce((acc,value)=>acc+value,0)}</h3></div>
            </div>
        )
        
        const show={
            0:item1,
            1:item2,
            2:item3,
            3:item4,
            4:item5
        }
        return (
            <div style={{opacity:0.5}} className='diddy' style={{backgroundImage:'url('+this.state.selectTemp+')'}}>
               {this.state.loading? <Loader type="ThreeDots" color="Green" height="100" width="100" className="tryi" />:show[this.state.index]} 
            </div>
        )
    }
}
// add and add twitter acct, facebook acct, email done, instagram acct