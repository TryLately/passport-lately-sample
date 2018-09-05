Lately Oauth Sample
===========================

Oauth sample application demonstrating api integration with Lately

Installation
* Install all nodejs modules: `npm install` 

Configuration
* If you don't already have a Lately account signup at www.trylately.com
* Send an email to brian@trylately.com with your Lately username requesting Aplication Partner status; this will be the lately username by which you manage your application definitions.
* After you receive a response sign-in to your Lately account and navigate to the Application page via the User menu
* Create an Application record. The callback URL must identically match the URL that is provided by your app when authenticating with Lately. 
* Copy your Application ID and Secret to ./config.js and run the sample app

Running the Sample

```
node app.js
```

* Open a web browser and visit: `http://localhost:8080/login` and the oAuth2 flow will start. First the user log in the oAuth2 server, after must allow the consumer application's grants.

Available Scopes:

* Returns user profile information, including the Dashboards and Campaigns the logged in user has permission to post to. 
`http://trylately.com/user/profile`

```json
{
  "provider": "Lately",
  "user_id": "1",
  "name": "Bob Smith",
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
```

* Generate Content from url to Dashboard & Campaign:
`http://localhost:8080/content/generate`
```json
TODO
```

You can change the requested scopes in `./config.js`:


