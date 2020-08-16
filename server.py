from flask import Flask, request,render_template,redirect,url_for,make_response
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import loads, dumps
from passlib.hash import sha256_crypt as sha
import os
import time
import json
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
        result=db.insert_one({'name':data['name'],'email':data['email'],'username':data['username'],'password':password,'check':data['check'],'text':'','files':[],'fileData':[],'bankName':'','bankNo':'','temp':'','template':'','payment':'0','website':'','company':'','customers':[],'paid':False})
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
        file=data['files']
        company=data['company']
        temp = data['temp']
        template=data['template']
        fileData=data['fileData']
        ide=data['id']
        db.find_one_and_update({'_id':ObjectId(ide)},{'$set':{'temp':temp,'template':template,'company':company,'files':file,'fileData':fileData}},upsert=True)
        response={'status':'success'}
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
            for i in result.customers:
                if i['email']==data['username'] or i['username']==data['username']:
                    filt=i
            if sha.verify(data['password'],filt['password']):
                    response={'status':'success',**filt}
            else:
                response={'status':'Failed'}
        else:
            response={'status':'Failed'}

        return response
            
@app.route('/mininewuser',methods=['POST'])
def mininew():
    if request.method=='POST':
        data=request.json
        password=sha.encrypt(data['password'])
        db.find_one_and_update({'_id':ObjectId(data['id'])},{'$push':{'customers':{'email':data['email'],'name':data['name'],'username':data['username'],'password':password}}})
        return{'status':'success'}      


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

if __name__=='__main__':
    app.run(debug=False)