import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

var ident
export default class Custom extends Component {
    constructor(props){
        super(props)
        this.state={
            redirect:false
        }
    }
    componentDidMount(){
        ident=this.props.match.params.id
        this.setState({redirect:true})
    }
    render() {
        if(this.state.redirect){
            return <Redirect to={'/user?id='+ident} />
        }
        return (
            <div>
               Loading... 
            </div>
        )
    }
}

