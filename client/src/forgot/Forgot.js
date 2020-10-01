import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Forgot.css"

const ForgotPassword=()=>{
    const [email, setEmail]=useState("")
    const [loading, setLoading]=useState(false)
    const [message, setMessage]=useState("")
    const [revel, setRevel]=useState("")

    useEffect(()=>{
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

    const change=(text)=>{
        setEmail(text)
    }
    const submit=async()=>{
        setLoading(true)
        const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})}
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
                    <input className='inputForgot' value={email} onChange={(e)=>change(e.target.value)} />
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