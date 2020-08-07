import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import './Signin.css'
import img from './undraw_Online_page_re_lhgx.svg'

export default class Signin extends Component {
    constructor(props){
        super(props);
        this.state={
            second:false,
            type: false,
            username:'',
            password:'',
            redirect:false,
            data:{}
        }
        
        this.firster=
            <div className='pass'><h2> Choose to serve your customers better, build a webpage to showcase your products in a matter of seconds.</h2>
        <div><h5> Want to know what it means to be a Magentite?</h5><button className='signup'><a href='/signup'>Sign Up</a></button></div>
        <div><h5>Already a Magentite? </h5><button onClick={this.replace} className='signin'>Sign In</button></div>
        </div>
        
    }
    replace=()=>{
        this.setState({second:true})
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
    change =(e)=>{
        switch(e.target.id){
            case 'userFirst':
                this.setState({username:e.target.value})
                break;
            default:
                this.setState({password:e.target.value})
                break;
        }
    }
    loginin=()=>{
        console.log('here')
        fetch('/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:this.state.username,password:this.state.password})}).then(res=>res.json()).then(data=>{
            if(data.status == 'success'){
                this.setState({redirect:true,data:data})
            }
            else{
                document.getElementById('checked').innerHTML=this.state.username.includes('.com')?"Email or Password Incorrect" : "Username or Password Incorrect"
            }
        })
    }
    render() {
        if(this.state.redirect){
            return <Redirect to={'/landing?id='+this.state.data.id} />
        }
        return (
            <div className='signinjs'>
              <div className='lefty'>
              <h1>Magento</h1>
              <img id='cojoined' src={img} />
              </div>  
              <div className='righty'>
              {this.state.second? (
                <div className='noPass'><div className='forms yes1'><i class="fa fa-envelope" aria-hidden="true"></i><input id='userFirst' value={this.state.username} onChange={this.change} placeholder='Please enter your email or username' required /></div>
                <div className='forms'><i class="fa fa-lock" aria-hidden="true"></i><input type='password' id='passFirst' value={this.state.password} onChange={this.change} placeholder='Enter your password' required /><button className='yum' onClick={this.typeChange}>{!this.state.type? <i class="fa fa-eye-slash" aria-hidden="true"></i>: <i class="fa fa-eye"></i>}</button></div>
                <p id='checked'></p>
                <button className='loggy' onClick={this.loginin}>Sign In</button><p className='forgot'><a href='/forgot'>Forgot your Password?</a></p></div>        
              ) : this.firster}
              </div>
            </div>
        )
    }
}
