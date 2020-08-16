import React, { Component } from 'react'
import {Redirect,Link} from 'react-router-dom'
import './Signup.css'
import img from './2860933.jpg'
export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            username:'',
            email:'',
            password:'',
            password2:'',
            check:false,
            real:false,
            redirect:false,
            data:''
        }
    }
    change=(e)=>{
        switch(e.target.id){
            case 'name':
                this.setState({name:e.target.value})
                break;
            case 'username':
                this.setState({username:e.target.value})
                break;
            case 'email':
                this.setState({email:e.target.value})
                break;
            case 'password':
                this.setState({password:e.target.value})
                let arr=[0,1,2,3,4,5,6,7,8,9]
                let stat=false
                arr.map(i=>{
                    if(e.target.value.includes(i)){
                        stat=true
                    }
                })
                if(!stat){
                    document.getElementById('check').innerText='Password not strong enough'
                }
                else{
                    document.getElementById('check').innerText=''
                }
                break;
            case 'password2':
                this.setState({password2:e.target.value})
                if(e.target.value !== this.state.password){
                    document.getElementById('check').innerText='Passwords don\'t match'
                }
                else{
                    this.setState({real:true})
                    document.getElementById('check').innerText=''  
                }
                break;
            default:
                this.setState({check:!this.state.check})
                break;
        }
    }
    submit=()=>{
        if(this.state.check && this.state.real){
            fetch('/newUser',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:this.state.name,email:this.state.email,username:this.state.username,password:this.state.password,check:this.state.check}) }).then(res=>res.json()).then(data=>{
                if(data.status == 'success'){
                    this.setState({redirect:true,data:data})
                }
                else{
                    document.getElementById('check').innerText='An error occured try again'
                }
            })
        }
        else{
            document.getElementById('check').innerText='Fill all boxes and accept the terms and conditions'
        }
        
    }
    render() {
        if(this.state.redirect){
            return <Redirect to={'/landing?id='+this.state.data.id} />
        }
        return (
            <div id='signed'>
                <div className='left'>
                    <h1>Welcome to Magento</h1>
                    <h3>Build and customise your site to attract your customers without stress.</h3>
                    <img className='img1' src={img} />
                    </div>
                <div className='right'>
                    <p className='log'>Already a member? <Link to='/?sign=signed'>Sign In.</Link></p>
                    <div className='form'>
                    <h2 className='namer'>Sign up to Magento.</h2>
                    <hr/>
                    <div className='names'>
                    <div><h3>Full Name</h3><input id='name' value={this.state.name} onChange={this.change} required /></div>
                    <div><h3>Username</h3><input id='username' value={this.state.username} onChange={this.change} required /></div>
                    </div>
                    <div className='mail'><h3>Email Address</h3><input id='email' type='email' value={this.state.email} onChange={this.change} required/></div>
                    <div className='mail'><h3>Password</h3><input id='password' type='password' minLength='6' value={this.state.password} required onChange={this.change} placeholder='At least 6 characters and must contain at least one number' /></div>
                    <p id='check' style={{color:'red'}}></p>
                    <div className='mail'><h3>Repeat Password</h3><input id='password2' value={this.state.password2} onChange={this.change} type='password' required /></div>
                    <input type='checkbox' className='id' id='checkbox' onChange={this.change} name='checkbox' value={this.state.check} required />
                    <label for='checkbox' className='id' >Creating an account means you're okay with our <a href='/terms'>terms and conditions</a>.</label><br />
                    <button className='but' onClick={this.submit}> Create Account</button>
                    </div>
                    <p id='copywrite'> ©{new Date().getFullYear()}</p>
                </div>
            </div>
        )
    }
}
