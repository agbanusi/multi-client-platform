import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Forgot.css"

var ident

const ForgotPassword=(props)=>{
    const [email, setEmail]=useState("")
    const [loading, setLoading]=useState(false)
    const [message, setMessage]=useState("")
    const [revel, setRevel]=useState("")

    useEffect(()=>{
        ident=getUrlParameter('id')
        if(loading){
            const root = setInterval(()=>{
                let tint=revel
                if(tint.length>2){
                    tint=""
                }else{
                    tint +="."
                }
                setRevel(tint)
            },750)
        return ()=> clearInterval(root)
        }
        
    })

    const getUrlParameter=(name)=>{
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const change=(text)=>{
        setEmail(text)
    }
    const submit=async()=>{
        setLoading(true)
        let id=ident?ident:null
        const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email, id})}
        const dot =await fetch('/forgotten',method)
        const data = await dot.json()
        if(data.status==='success'){ 
            setMessage("Recovery email sent.")
        }else{
            setMessage("This email does not seem registered.")
        }
        setLoading(false)
    }

    return(
        <div className='coverForgot'>
            {!loading?
                <div className='insideForgot'>
                    <h3>Password Reset</h3>
                    <h5>{message}</h5>
                    <h4>Enter your email address</h4>
                    <input className='inputForgot' value={email} onChange={(e)=>change(e.target.value)} placeholder="Enter your Email address." />
                    <button className='resetedButton' onClick={()=>submit()}>submit</button>
                    {message==="Recovery email sent."?<Link to='\' className='signnedOff'>Sign In</Link>:<></>}
                </div>
                :
                <div>Loading{revel}</div>
            }
        </div>
    )
}

export default ForgotPassword