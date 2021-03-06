from flask import Flask, request,render_template,redirect,url_for,make_response
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import loads, dumps
from unique_id import get_unique_id as uniq
from passlib.hash import sha256_crypt as sha
import os
import time
import json
import secrets
import requests as req
load_dotenv()

dbe=os.getenv('DB')
client=MongoClient(dbe) #mongo_url
db=client.Cluster0['multiple']

app = Flask(__name__,template_folder='./client/build', static_folder='./client/build/static')
UPLOAD_FOLDER = '/client/src/assets'
app.config['UPLOAD_FOLDER']=UPLOAD_FOLDER
ALLOWED_EXTENSIONS= set(['png','jpg','jpeg','svg'])

secret=os.getenv('PAYSTACK')

def allowed(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS


def bank_code():
    r=req.get('https://api.paystack.co/bank')
    return r.json()['data']

def verify(acct,bank):
    banks=bank_code()
    sort=0
    for i in banks:
        if all(x in bank.lower() for x in i['name'].lower().split(' ')) or all(x in i['name'].lower() for x in bank.lower().split(' ')):
            sort=str(i['code'])
            break
    headers={'Authorization':'Bearer '+secret}
    r=req.get('https://api.paystack.co/bank/resolve?account_number='+acct+'&bank_code='+sort, headers=headers)
    return {**r.json(),'sort_code':sort}

def trans(acct,bank,name):
    very=verify(acct,bank)
    if not (all(x in name.lower() for x in very['data']['account_name'].lower().split(' ')) or all(x in very['data']['account_name'].lower() for x in name.lower().split(' '))):
        print('1')
        return False
    data={'type':'nuban','name':very['data']['account_name'],'account_number':very['data']['account_number'],
    'bank_code':very['sort_code'],"currency": "NGN"}
    data=json.dumps(data)
    if very['message']=='Account number resolved':
        headers={'Authorization':'Bearer '+secret,'Content-Type': 'application/json'}
        r=req.post('https://api.paystack.co/transferrecipient', data=data, headers=headers)
        return r.json()

def initiate(acct,bank,payment,name):
    #if payment == '0' or payment=='000':
        #return 'failed'
    then=trans(acct,bank,name)
    if not then:
        print('2')
        return 'faileddis'
    data={'source':'balance','amount':payment,'recipient':then['data']['recipient_code'],'reason':'payout'}
    headers={'Authorization':'Bearer '+secret,'Content-Type': 'application/json'}
    data=json.dumps(data)
    r=req.post('https://api.paystack.co/transfer',headers=headers,data=data)
    if r.json()['status'] :
        id=r.json()['data']['reference']
        if check_pay(id)=='success':
            return 'success'
        else:
            time.sleep(30)
            if check_pay(id)=='success':
                return 'success'
            else:
                time.sleep(60)
                if check_pay(id)=='success':
                    return 'success'
                else:
                    return 'failed'
    else:
        return 'failed'

def check_pay(id):
    headers={
        'Authorization':'Bearer '+secret
    }
    r=req.get('https://api.paystack.co/transfer/verify/'+id,headers=headers)
    return r.json()['data']['status']

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def home(path):
    return render_template('index.html')

@app.route('/newUser',methods=['POST'])
def user():
    #id=request.args.get('id') query strings
    if request.method=='POST':
        data=request.json
        password=sha.encrypt(data['password'])
        res=db.find_one({'email':data['email']})
        if res != None:
            return {'status':'Failed'}
        else:
            result=db.insert_one({'name':data['name'],'email':data['email'],'username':data['username'],'password':password,'check':data['check'],'text':'','fileData':[],'bankName':'','bankNo':'','temp':'','template':'','payment':'0','website':'','company':'','customers':[],'paid':False,'first':'','second':'','third':'','fourth':[]})
            id=str(result.inserted_id)
            response={'status':'success','id':str(id)}
            return response

@app.route('/login',methods=['POST'])
def log():
    if request.method=='POST':
        data=request.json
        result=db.find_one({'email':data['name']})
        if result== None:
            result=db.find_one({'username':data['name']})
            if result == None:
                response={'status':'Failed'}
            else:
                try:
                    if sha.verify(data['password'],result['password']):
                        response={'status':'success','id':str(result['_id'])}
                    else:
                        response={'status':'Failed'} 
                except:
                    response={'status':'Error'}
        else:
            try:
                if sha.verify(data['password'],result['password']):
                    response={'status':'success','id':str(result['_id'])}
                else:
                    response={'status':'Failed'}
            except:
                response={'status':'Error'}

        return response

@app.route('/getData',methods=['POST'])
def userData():
     if request.method=='POST':
         data=request.json
         result=db.find_one({'_id':ObjectId(data['id'])})
         if result == None:
             response={'status':'Failed'}
         else:
             resin={key:val for key, val in result.items() if key != '_id' and key !='password'} 
             response={'status':'success',"dat":resin}

         return response

@app.route('/getFirstData',methods=['POST'])
def firstData():
    if request.method=='POST':
        data=request.json
        result=db.find_one({'_id':ObjectId(data['id'])})
        if result == None:
            response={'status':'Failed'}
        else:
            response={'status':'success','info':result['first'],'fullName':result['name'],'email':result['email'],
            'temp':result['temp'],'company':result['company'],'text':result['text'],'website':result['website'],'paid':result['paid']}

        return response

@app.route('/getSecondData',methods=['POST'])
def secondData():
    if request.method=='POST':
        data=request.json
        result=db.find_one({'_id':ObjectId(data['id'])})
        if result == None:
            response={'status':'Failed'}
        else:
            response={'status':'success','dat':result['second']}

        return response

@app.route('/getThirdData',methods=['POST'])
def thirdData():
    if request.method=='POST':
        data=request.json
        result=db.find_one({'_id':ObjectId(data['id'])})
        if result == None:
            response={'status':'Failed'}
        else:
            response={'status':'success','dat':result['third']}

        return response

@app.route('/getFourthData',methods=['POST'])
def fourthData():
    if request.method=='POST':
        data=request.json
        result=db.find_one({'_id':ObjectId(data['id'])})
        if result == None:
            response={'status':'Failed'}
        else:
            response={'status':'success','dat':result['fourth'], 'alt':result['fileData'] }

        return response

@app.route('/getCustomerData',methods=['POST'])
def customerData():
    if request.method=='POST':
        data=request.json
        result=db.find_one({'_id':ObjectId(data['id'])})
        if result ==None or not data['custId']:
            response={'status':'Failed'}
        else:
            customer=[i for i in result['customers'] if i['id']==data['custId']]
            if len(customer) >0:
                customer=customer[0]
                resulted={key:val for key,val in result.items() if key !='_id' and key !='password' }
                resd={'data':customer,**resulted}
                response={'status':'success','dat':resd}
            else:
                response={'status':'empty'}
        return response

@app.route('/getUserData',methods=['POST'])
def getUserData():
    if request.method=='POST':
        data=request.json
        result=db.find_one({'_id':ObjectId(data['id'])})
        if result ==None:
            response={'status':'Failed'}
        else:
            resulted={key:val for key,val in result.items() if key !='_id' and key !='password' }
            response={'status':'success','dat':resulted}
        
        return response

@app.route('/saveCart',methods=['POST'])
def cart_saver():
    if request.method=='POST':
        data=request.json
        result=db.find_one({'_id':ObjectId(data['id'])})
        if result ==None or not data['custId']:
            response={'status':'Failed'}
        else:
            try:
                customers=result['customers']
                ind=-1
                customer={}
                for i in range(len(customers)):
                    if customers[i]['id'] == data['custId']:
                        customer= customers[i]
                        ind=i
                        break
                
                customer['cart']=data['cart']
                customers[ind]=customer
                print(customers)
                db.find_one_and_update({'_id':ObjectId(data['id'])}, {'$set':{'customers':customers} })
                response={'status':'success'}
            except:
                print('failed')
                response={'status':'Failed'}

        return response

@app.route('/saveData',methods=['POST'])
def saveData():
    if request.method=='POST':
        data=request.json
        result=db.find_one({'_id':ObjectId(data['id'])})
        if result ==None:
            response={'status':'Failed'}
        else:
            if data['level']=='first':
                db.find_one_and_update({'_id':ObjectId(data['id'])}, { '$set':{'first': data['data']} })
            elif data['level']=='second':
                db.find_one_and_update({'_id':ObjectId(data['id'])}, { '$set':{'second': data['data']} })
            elif data['level']=='third':
                db.find_one_and_update({'_id':ObjectId(data['id'])}, { '$set':{'third': data['data']} })
            elif data['level']=='fourth':
                db.find_one_and_update({'_id':ObjectId(data['id'])}, { '$set':{'fourth': data['data']} })

            response={'status':'success'}

        return response

@app.route('/customerPaid',methods=['POST'])
def customer_paid():
    if request.method=='POST':
        data=request.json
        result=db.find_one({'_id':ObjectId(data['id'])})
        if result ==None:
            response={'status':'Failed'}
        else:
            
            customers=result['customers']
            ind=-1
            customer={}
            for i in range(len(customers)):
                if customers[i]['id'] == data['custId']:
                    customer= customers[i]
                    ind=i
                    break
            rem = result['fileData']
            for i in customer['cart']:
                rem[i].number=rem[i].number-1
            customer['cart']=[]
            date=datetime.today().strftime('%Y-%m-%d-%H:%M:%S')
            customer['bought'].append({'items':data['cart'],'date':date, 'fulfilled':False})
            customers[ind]=customer
            db.find_one_and_update({'_id':ObjectId(data['id'])}, {'$set':{'customers':customers, 'fileData':rem} })
            response={'status':'success'}     
        return response

@app.route('/withdraw',methods=["POST"])
def withdraw():
    if request.method=='POST':
         data=request.json
         result=db.find_one({'_id':ObjectId(data['id'])})
         if result == None:
             response={'status':'Failed'}
         else:
             then=initiate(str(result['bankNo']),str(result['bankName']),str(int(data['payment'])*100),result['name'])
             if then =='success':
                 rem=int(result['payment'])-int(data['payment'])
                 db.find_one_and_update({'_id':ObjectId(data['id'])},{'$set':{'payment':rem}})
                 response={'status':'success','payment':rem}
             elif then =='faileddis':
                 print('3')
                 response={'status':'Faileddis'}
             else:
                 response={'status':'Failed'}
         return response

@app.route('/banks',methods=['POST'])
def saved():
     if request.method=='POST':
         data=request.json
         db.find_one_and_update({'_id':ObjectId(data['id'])},{'$set':{'bankName':data['bankName'],'bankNo':data['bankNo']}})
         response={'status':'success'}
         return response

@app.route('/personal',methods=['POST'])
def savers():
     if request.method=='POST':
         data=request.json
         db.find_one_and_update({'_id':ObjectId(data['id'])},{'$set':{'name':data['name'],'email':data['email'],'password':data['password'],'text':data['address']}})
         response={'status':'success'}
         return response


@app.route('/publish',methods=['POST'])
def publish():
    if request.method=='POST':
        data=request.json
        company=data['company']
        temp = data['temp']
        fileData=data['fileData']
        ide=data['id']
        res = db.find_one_and_update({'_id':ObjectId(ide)},{'$set':{'temp':temp,'company':company,'fileData':fileData,'fourth':fileData } },upsert=True)
        if res:
            response={'status':'success'}
        else:
            response={'status':'Failed'}
        return response

@app.route('/paid',methods=['POST'])
def paid():
    if request.method=='POST':
         data=request.json
         result=db.find_one_and_update({'_id':ObjectId(data['id'])},{'$set':{'paid':True,'website':data.website}})
         if result == None:
             response={'status':'Failed'}
         else:
            response={'status':'success','website':data.website}
         return response

@app.route('/minilogin',methods=['POST'])
def minilogin():
    if request.method=='POST':
        data=request.json
        result=db.find_one({'_id':ObjectId(data['id'])})
        if result != None:
            filt={}
            for i in result['customers']:
                if i['email']==data['username'] or i['username']==data['username']:
                    filt=i
                    break
            if sha.verify(data['password'],filt['password']):
                    #session['id']=
                    idd=filt['id']
                    response=make_response({'status':'success',**filt})
                    response.set_cookie('id',idd)
            else:
                response={'status':'Failed'}
        else:
            response={'status':'Failed'}
        return response
            
@app.route('/mininewuser',methods=['POST'])
def mininew():
    if request.method=='POST':
        data=request.json
        password=sha.encrypt(data['form'][4])
        user=db.find_one({'_id':ObjectId(data['id'])})
        user=[i for i in user['customers'] if i==data['form'][3]]
        if(len(user) <1):
            idd=uniq()
            db.find_one_and_update({'_id':ObjectId(data['id'])},{'$push':{'customers':{'id':idd,'email':data['form'][3],'name':data['form'][0]+" "+ data['form'][1],'username':data['form'][0][0:4]+data['form'][1][0:4],'number':data['form'][2],'password':password,'cart':[],'bought':[]}}})
            res=make_response({'status':'success'})
            res.set_cookie('id',idd)
            return res
        else:
            return ({'status':'Failed'})     

@app.route('/resetting',methods=["POST"])
def reset():
    if request.method=="POST":
        data = request.json
        token = data["token"]
        idd = data["id"]
        if idd != None:
            ress= db.find_one({"_id":ObjectId(idd)})
            if ress != None:
                ress=ress["customers"]
                ressy=[i for i in ress if i["token"]==token]
                if len(ressy) >0:
                    res=ressy[0]
                else:
                    res = None
            else:
                res = None
        else:
            res=db.findOne({"token":token,"expires":{"$gt": datetime.now()} })
        
        if res !=None:
            return {'status':'success', 'user':res["email"]}
        else:
            return {'status':'Failed'}

@app.route('/resetted',methods=["POST"])
def resetted():
    if request.method=="POST":
        data = request.json
        email = data["user"]
        password = data["password"]
        idd = data['id']
        if idd != None:
            ress=db.find_one({"_id":ObjectId(idd)})
            ress=ress["customers"]
            ressy=[i for i in ress if i["email"]==email]
            k = [i for i in range(len(ress)) if ress[i]["email"]==email][0]
            res=ressy[0]
        else:
            res=db.find_one({"email":email})

        if not sha.verify(password,res['password']):
            password = sha.encrypt(password)
            if idd != None:
                res["password"]=password
                ress[k]=res
                db.find_one_and_update({"_id":ObjectId(idd)}, {"$set": {"customers":ress} })
            else:
                db.find_one_and_update({"email":email}, {"$set": {"password": password} })
            
            return {'status':'success'}
        else:
            return {'status':'Failed'}
        
@app.route('/forgotten',methods=["POST"])
def forgot():
    if request.method=="POST":
        data=request.json
        idd = data['id']
        email = data['email']
        if idd != None:
            ress=db.find_one({"_id":ObjectId(idd)})
            if ress != None:
                ress=ress["customers"]
                ressy=[i for i in ress if i["email"]==email]
                k = [i for i in range(len(ress)) if ress[i]["email"]==email]
                if len(ressy) >0:
                    res=ressy[0]
                    k=k[0]
                else:
                    res = None
                    
            else:
                res=None

        else:
            res=db.find_one({"email":email})

        if res != None:
            token = secrets.token_hex(24)
            if idd !=None:
                res["customers"]={**res["customers"],"token":token, "expires":datetime.now()+timedelta(hours=24)}
                ress[k]=res
                db.find_one_and_update({"_id":ObjectId(idd)}, {"$set": {"customers":ress} })
            else:    
                db.find_one_and_update({'email':email}, {"$set": {"token":token, "expires":datetime.now()+timedelta(hours=24)} })
            
            fromm=os.getenv("USER")
            to=email
            subject="Password Reset"
            # alt request.host_url
            messages = MIMEMultipart()
            if idd != None:
                messages['From']=res["email"]
                website= request.remote_addr+"?id="+idd+"/reset/"+token
            else:
                messages['From'] = fromm
                website= request.remote_addr+"/reset/"+token
            
            messages['To'] = to
            messages['Subject'] = subject
           
            message= "Hey "+res["username"] + ", /n You're receiving this email because you requested for\
                the reset of your password. Please click this link or paste in your browser"+ website +"/n /n Link expires in 24 hours and If you did \
                    not request this, please ignore this email and your password will remain unchanged."

            #The body and the attachments for the mail
            messages.attach(MIMEText(message, 'plain'))
            s = smtplib.SMTP('smtp.gmail.com', 587)
            s.ehlo()
            s.starttls() 
            s.login(os.getenv("USER"), os.getenv("PASS"))
            text = messages.as_string()
            s.sendmail(fromm, to, text)
            s.quit()
            response={'status':'success'}
        else:
            response={'status':'Failed'}
        return response

@app.route('/api/',defaults={'ide':'none'},methods=['GET','POST'])
@app.route('/api/<ide>',methods=['GET','POST'])
def apper(ide='none'):
    result=db.find_one({'_id':ObjectId(ide)})
    if result == None:
        response={'status':'Failed'}
        return response
    else:
        if result['paid']:
           return render_template('index.html')
        else:
            return ({'ERROR':"NOT AVAILABLE"})

#error message: 'You cannot initiate third party payouts as a starter business'

if __name__=='__main__':
    app.run(debug=False)