Lately Oauth Sample
===========================

Oauth sample application demonstrating api integration with Lately

Installation

* Create a directory for the sample app and cd to that directory
* Obtain the application: `npm install Lately-passport-sample`
* Install all nodejs modules: `npm install` 

Configuration

* If you don't already have a Lately account signup at www.trylately.com; you will use this account to create your Passport application definition.
* Send an email to brian@trylately.com with your Lately username requesting Aplication Partner status; 
* When you receive a response sign-in to your Lately account and navigate to the Application page via the User menu (hover your user avatar at top right and select Applications)
* Create an Application record. The callback URL provided must identically match the URL that is provided by your app when authenticating with Lately. 
* From the applications list copy your Application ID and Secret to ./config.js and run the sample app 

Running the Sample

```
node app.js
```

* Open a web browser and visit: `http://localhost:8080/login` and the oAuth2 flow will start. First the user log in the oAuth2 server, after must allow the consumer application's grants.

Available Apis:

* Fetch user profile. Includes the Dashboards and Campaigns the logged in user has permission to post to. 

GET `<lately server>/v1/apps/user/profile`

```json
{
  "id": "1",
  "name": "Bob Smith",
  "provider": "Lately",  
  _json: {
    "dashboards": [{
    	_id:"d1",
    	"name":"Dashboard1",
    	"campaigns":[{
  	  	  "_id":"c1",
  	  	  "name":"Dashboard1-Campaign1",
  	  	  "shortName":"Campaign1"
    	  },{
    	  	"_id":"c2",
  	  	  "name":"Dashboard1-Campaign2",
  	  	  "shortName":"Campaign2"
    	  }
    	]
    }]
  }
}
```

* Generate Content from url to Dashboard & Campaign:

POST `<lately server>/v1/apps/content/generate`

Sample Body Parameters 
```
{ dashboardId: '5b1009fa580fc1118c108d0f',
  campaignId: '5b1009fb580fc1118c108d12',
  url: 'https://venturebeat.com/2018/08/22/ibm-ai-transparency-factsheets/' }
```

Sample Response

 200 {"status":"success","generated":30}




