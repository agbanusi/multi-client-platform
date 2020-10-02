import React, { useEffect, useState } from 'react'
var ident

export default function Reset(props) {
    const [start,setStart]=useState(true)
    const [loading, setLoading]=useState(true)
    const [user, setUser] = useState("")
    const [message,setMessage]=useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")

    useEffect(async(props)=>{
        ident = getUrlParameter('id')
        async function fetchData(){
            const id =ident? ident : null
            const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:props.match.params.token, id})}
            const dot =await fetch('/resetting',method)
            const data = dot.json()
            if(data.status=='success'){
                setLoading(false)
                setUser(data.user)
            }else{
                setTimeout(()=>{props.history.push('/')},3000)
            }
            setStart(false)
        }
        if(start){
            fetchData();
        }
    })

    const getUrlParameter=(name)=>{
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const submit=async(e)=>{
        e.preventDefault()
        if(pass1 !== pass2){
            setMessage("Password don't match.")
        }else{
            const id = ident?ident:null
            const method= {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user:user, password:pass1, id})}
            const dot =await fetch('/resetted',method)
            const data = dot.json()
            if(data.status=='success'){
                setMessage("Password successfully resetted redirecting in 3 seconds.")
                setTimeout(()=>{props.history.push('/')},3000)
            }else{
                setMessage("An error occured, new password cannot be previous password.")
            }
        }
    }

    return (
        <div className="coverReset">
            {loading?<h5>Incorrect or expired token, will redirect you in 3 seconds.</h5>
            :<form onSubmit={(e)=>submit(e)}>
                <h5>{message}</h5>
                <div><h4>New Password</h4><input value={pass1} onChange={((e)=>setPass1(e.target.value))} /></div>
                <div><h4>Retype New Password</h4><input value={pass2} onChange={((e)=>setPass2(e.target.value))} /></div>
                <button type='submit'>Submit</button>
            </form>}
        </div>
    )
}
