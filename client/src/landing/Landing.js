import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import './Landing.css'
import { PaystackButton } from 'react-paystack'
import Creative from './Creative'
import fileUpload from 'fuctbase64'
//import all images and templates here for test
import img from './undraw_online_video_ivvq.svg'
import img1 from './undraw_web_search_eetr.svg'
import img2 from './undraw_business_shop_qw5t.png'
import img3 from './undraw_group_selfie_ijc6.png'
import img4 from './undraw_selfie_time_cws4.png'
import img5 from './Repeating-Triangles.svg'
import img6 from './Diamond-Sunset.svg'
import img7 from './Liquid-Cheese.svg'
import img8 from './Rainbow-Vortex.svg'
import img9 from './white-headphones-3394650.jpg'
import img10 from './transport-3366391_640.jpg'
import img11 from './semi-opened-laptop-computer-turned-on-on-table-2047905.jpg'
var ident
export default class Landing extends Component {
    constructor(props){
        super(props);
        this.state={
            payment:'0.00',
            name:'',
            index:0,
            bankName:'',
            bankNo:'',
            fullName:'',
            email:'',
            text:'',
            password:'',
            password2:'',
            selectTemp:'',
            selectTemplate:'',
            files:[],
            fileData:[],
            temp:[img1,img2,img3,img4,img],
            templates:[img5,img6,img7,img8],
            company:'',
            website:'',
            showCase:'',
            redirect:false
        }
            
    }
    componentDidMount(){
        ident=this.getUrlParameter('id')
        fetch('/getData',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident})}).then(res=>res.json()).then(dat=>{
            if(dat.status =='success'){
                let data=dat.dat
                console.log(data.files)
                console.log(data.fileData)
                this.setState({name:data.username,email:data.email, fullName:data.name,
                    text:data.text,files:data.files,fileData:data.fileData, bankName:data.bankName,
                    bankNo:data.bankNo, selectTemp:data.temp,selectTemplate:data.template, payment:data.payment, website:data.website, company:data.company
                })
            
            }
            else{
                this.setState({redirect:'2'})
            }
        })
    }
    getUrlParameter=(name)=>{
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    change3 =(e)=>{
        this.setState({company:e.target.value})
    }
    converted=(img)=>{
        console.log(img)
        return URL.createObjectURL(img)
    }

    files=(e)=>{
        //store them in the server
        let add=[]
        let tt=[...e.target.files].map((i)=>{
            add.push({name:'',price:'',des:''})
            this.down(i).then(kk=>{
                this.setState({files:[...this.state.files,kk]})
                return tt
            })
        })
        this.setState({fileData:[...this.state.fileData,...add]})
        
    }
    web=()=>{
        //setup page
        this.setState({index:1})
    }
    bank=()=>{
        //get former bank info from server+db and display by setting states
        this.setState({index:2})
    }
    edit=()=>{
        //get personal data info from server and display
        this.setState({index:3})
    }
    preview=()=>{
        //preview site
        this.setState({redirect:'1'})
    }
    withdraw=()=>{
        //setup the payment and redirect
        let acctNo=this.state.bankNo
        let acctName=this.state.bankName
        fetch('/withdraw',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,acctName,acctNo})}).then(res=>res.json()).then(data=>{
            if(data.status=='success'){
                this.setState({payment:data.payment})
                alert('Money sent to your account')
            }
            else{
                alert('Please try again')
            }
        })
    }
    selectTemp=(e)=>{
        if(this.state.selectTemp !=''){
            document.getElementById(this.state.selectTemp+'p').style.border='none'
        }
        document.getElementById(e.target.id).style.border='3px solid orange'
        console.log(e.target.id.slice(0,-1))
        this.setState({selectTemp:e.target.id.slice(0,-1)})
    }
    selectTemplate=(e)=>{
        if(this.state.selectTemplate !=''){
            document.getElementById(this.state.selectTemp+'o').style.border='none'
        }
        document.getElementById(e.target.id).style.border='3px solid orange'
        this.setState({selectTemplate:e.target.id.slice(0,-1)})
    }
    
    change=(e)=>{
        if(e.target.id == 'bankName'){
            this.setState({bankName:e.target.value})
        }
        else{
            if(Number(e.target.value) || e.target.value==''){
                this.setState({bankNo:e.target.value})
            }
            
        }
    }
    change2=(e)=>{
        switch(e.target.id){
            case 'fullName':
                this.setState({fullName:e.target.value})
                break;
            case 'email':
                this.setState({email:e.target.value})
                break;
            case 'address':
                this.setState({text:e.target.value})
                break;
            case 'password':
                this.setState({password:e.target.value})
                break;
            case 'password2':
                this.setState({password2:e.target.value})
                break;
        }
    }
    personal=()=>{
        //send to database
        fetch('/personal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,name:this.state.fullName,email:this.state.email,password:this.state.password,address:this.state.text})})
        document.getElementById('status').innerHTML="Details Saved"
    }
    bankDone=()=>{
        //send to database
        fetch('/banks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,bankName:this.state.bankName,bankNo:this.state.bankNo})}).then(res=>res.json()).then(data=>{
            document.getElementById('status').innerHTML="Banking Details Saved"
        })
        
    }
    publish=()=>{
        //send to database
        let bod={'company':this.state.company,'files':this.state.files,temp:this.state.selectTemp,template:this.state.selectTemplate,'id':ident, 'fileData':this.state.fileData}
        fetch('/publish',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(bod) }).then(res=>res.json()).then(data=>{
            if(data.status=='success'){
                this.setState({showCase:<Creative id='dent' info={{name:this.state.name,files:this.state.files,fileData:this.state.fileData,
                    temp:this.state.selectTemp,template:this.state.selectTemplate}} />, index:4})
            }
            else{
                this.publish()
            }
        })
        
    }
    nameChange=(e)=>{
        let ind=Number(e.target.id[0])
        let fileData=this.state.fileData
        if(e.target.id.slice(1,)=='p'){
            fileData[ind].name=e.target.value
        }
        else if(e.target.id.slice(1,)=='pr'){
            fileData[ind].price=e.target.value
        }
        else if(e.target.id.slice(1,)=='des'){
            fileData[ind].des=e.target.value
        }
        this.setState({fileData:fileData})
    }

    down=(file)=>{
        return new Promise((resolve, reject) => {
        if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener("load", function () {
              resolve(reader.result)
            }, false);
        }
    })
    }
    
    done=()=>{
        //send to server and setState
        fetch('/paid',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:ident,website:window.location.hostname+'/api/'+ident})}).then(res=>res.json()).then(data=>{
            if(data.status=='success'){
                this.setState({website:window.location.hostname+'/api/'+ident})
            }
            else{
                document.getElementById('downer').innerHTML='<p>One or more  files is not a picture</p>'
            }
        })
    }
    render() {
        console.log(window.location.hostname)
        var componentProps = {
            email:this.state.email,
            amount:500000,
            metadata: {
              name:this.state.fullName,
              phone: '08012345678',
            },
            text: "Pay 5000 to host",
            publicKey:'pk_live_9d3b45fa5d4ea9a2ba0a4ee95906fbda1d50fe37',
            onSuccess: () =>{
                this.done();
                return alert("Thanks for doing business with us! Your site is live at "+this.state.website)
            },
            onClose: () => alert("Wait! You need this, don't go!!!!"),
        
          }
          
        var show={
            0:<h2 style={{opacity:0.5}}><i>Preview Not Available</i></h2>,
            1:(<div className='web'>
            <div className='webber'><h4>Company Name(Name of your site)</h4><input id='company' onChange={this.change3} value={this.state.company} /></div>
            <div className='webber'><h4 id='downer'>Upload your product pictures</h4><input type='file' name='files[]' multiple='true' onChange={this.files} /></div>
            <div className='webber'><h4>Choose a background SVG to make your website attractive.</h4>
            <div className='webbed1'>{this.state.temp.map((i,k)=>
                <img id={k+'p'} className='svgs' onClick={this.selectTemp} src={i} />
            )}</div>
            </div>
            <div className='webber'><h4>Choose a template for your website.</h4>
            <div className='webbed2'>{this.state.templates.map((i,k)=>
                <img id={k+'o'} className='imgs' onClick={this.selectTemplate} src={i} />
            )}</div>
            </div>
            <h4>Customise your Products</h4>
            {this.state.files.map((i,k)=>
             <div className='items'>
             <img src={i} />
             <div><input id={k+'p'} onChange={this.nameChange} placeholder='Enter Name of Product' value={this.state.fileData[k].name} required/>
             <input id={k+ 'pr'} onChange={this.nameChange} placeholder='Enter Price, NUMBERS ONLY!' value={this.state.fileData[k].price} required/>
             <input id={k+ 'des'} onChange={this.nameChange} maxLength='30' value={this.state.fileData[k].des} placeholder='Enter a short description' /></div>
             </div>
             )}
             <button onClick={this.publish}>Save</button>
            </div>), 
            2:<div className='bank'>
            <h3>We will only pay if this account matches the name used to register.</h3>
            <div className='banking'><h4>Bank Name</h4><input id='bankName' value={this.state.bankName} onChange={this.change} required/></div>
            <div className='banking'><h4>Account Number</h4><input id='acctNo' value={this.state.bankNo} onChange={this.change} /></div>
            <button onClick={this.bankDone}>Submit</button>
            </div>,
            3:<div className='person'>
            <h3>{this.state.userName}</h3>
            <div className='personal'><h5>Full Name</h5><input id='fullName' onChange={this.change2} value={this.state.fullName} /></div>
            <div className='personal'><h5>Email Address</h5><input id='email' type='email' onChange={this.change2} value={this.state.email} /></div>
            <div className='personal'><h5>Home Address</h5><textarea id='address' onChange={this.change2} value={this.state.text} /></div>
            <div className='personal'><h5>Old Password</h5><input id='password' type='password' onChange={this.change2} value={this.state.password} /></div>
            <div className='personal'><h5>New Password</h5><input id='password2' type='password' onChange={this.change2} value={this.state.password2} /></div>
            <button onClick={this.personal}>Save</button>
            </div>,
            4:<div className='showOff'>
                {this.state.showCase}
            </div>
         }
         if(document.getElementById('live') && this.state.website !==''){
            document.getElementById('live').style.display='block'
         }
         if(this.state.redirect=='2'){
             return <Redirect to={'/landing?id='+ident} />
         }
         else if(this.state.redirect=='1'){
             return <Redirect to={'/user?id='+ident} />
         }
        return (
            <div className='landing'>
                <div className='topper'>
                    <h3>WELCOME {this.state.name}</h3>
                    <h3>Account Balance: {this.state.payment}</h3>
                </div>
                <div className='mainer'>
                    <div className='Lefti'>
                        <h4 style={{display:'none'}} id='live'>Your Website is at <a href={this.state.website}>{this.state.website}</a></h4>
                        <h3>Magento is all about expressing yourself to your customers and showing you're more than they think you are.
                        Show your products to them in the most expressive and way and do it just as fast too. Magento handles the payment and it is credited to you with payment information and customer information, so you
                        can deliver your products any way you want to. Magento takes away the stress of building a website and trying to handle the payment, organisation of customer database for free!. You only pay for hosting and handle the delivery.</h3>
                        <div className='tens'><h5>Setup/Edit your Webpage</h5><button onClick={this.web}>SetUp!</button></div>
                        <div className='tens'><h5>It is advisable to set up your banking information</h5><button onClick={this.bank}>Banking Info</button></div>
                        <div className='tens'><h5>Edit your personal Information</h5><button onClick={this.edit}>Edit</button></div>
                        <div className='tens'><h5>Preview Site</h5><button onClick={this.preview}>Preview</button></div>
                        <div className='tens'><h5>Host Site</h5><PaystackButton id='kk' {...componentProps} /></div>
                        <div className='tens'><h5>Withdraw Payments</h5><button onClick={this.withdraw}>Withdraw</button></div>
                        
                    </div>
                    <div className='Righti'>
                        <h5 id='status'></h5>
                        {show[this.state.index]}
                    </div>
                </div>  
            </div>
        )
    }
}
