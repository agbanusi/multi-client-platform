import React from 'react'
import {Link} from 'react-router-dom'
import './Unfound.css'

const NotFound=()=>{
    return(
        <div className='coverNot'>
        <div>
            <h2>Ouch the Page you're looking for does not exist</h2>
            <p><h4>You can go back to home here</h4> <Link className='returnNot' to='/'>Home</Link></p>
        </div>
        </div>
    )
}

export default NotFound;