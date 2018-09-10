# Passport-lately-client

This is a simple web application demonstrating [Passport](https://github.com/jaredhanson/passport) authentication against Lately and invocation of passport protected API's.  

## Requirements

* Recent versions of node.js and npm

## Install

* Create a directory for the installation and cd to that directory
* Obtain the sample app: `npm install lately-passport-example`
* Install all nodejs modules: `npm install` 

## Usage

### Create Application in Lately and configure client

* Signup for a Lately account on dev.trylately.com; this will be the user account by which you administer your application definitions in development. 
* Send an email to brian@trylately.com requesting Aplication Partner status; include the Lately username you wish to use for administering your Apps.
* When you receive a response sign-in to your Lately account and navigate to the Application page via the User menu (hover your user avatar at top right and select Applications)
* Create an Application record with the callback url http://localhost:8080/auth/lately/callback (matching the sample app config).
* From the applications list copy your Application ID and Secret to ./config.js in the sample app.

### Running the App

* From the installation directory run `node app.js`
* Open a web browser and visit: `http://localhost:8080` . Select Login to start the OAuth flow with the configured Lately server (dev.trylately.com); login and allow the requested permissions. 
* On completion the server shows the user profile returned by Lately, with a list of Dashboards and Campaigns accessible by that user. 
* The Generate link in the sample app top menu links to a simple app that will guide you through a selection of Dashboard, Campaign and Link for exercising the 'content/generate' api. 

### API Invocation

* Lately authentiation returns an access token which must be provided as an Authorization header to access server API's.

```
   headers: {'Authorization': 'Bearer <accessToken>'}
``` 

## Available Apis:

### Fetch User Profile

* Includes the Dashboards and Campaigns the logged in user has permission to post to. 

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

### Generate Content

* Generate Content from url to Dashboard & Campaign:

POST `<lately server>/v1/apps/content/generate`

* Sample Body Parameters 

```
{ dashboardId: '5b1009fa580fc1118c108d0f',
  campaignId: '5b1009fb580fc1118c108d12',
  url: 'https://venturebeat.com/2018/08/22/ibm-ai-transparency-factsheets/' }
```

* Sample Response

 200 {"status":"success","generated":30}

## Passport-Lately in Production 

* By default this application access dev.trylately.com for OAuth authentication and authorization; to access the production server at www.trylately.com remove the following entries from ./config.js: 

  serverBaseURL
  authorizationURL
  userProfileURL
  tokenURL

* Note that the development and production servers do not share a common database - therefore when accessing the production server at www.trylately.com a separate Application definition will be required there.


## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2018 Lately Inc. <[https://trylately.com](https://trylately.com)>


