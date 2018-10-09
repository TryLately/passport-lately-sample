# Passport-lately-sample

This is a simple web application demonstrating [Passport](https://github.com/jaredhanson/passport) authentication against Lately and invocation of passport protected API's.  

## Requirements

* Recent versions of node.js and npm

## Install

* Create a directory for the installation and cd to that directory
* Obtain the sample app: `npm install lately-passport-example`
* Install all nodejs modules: `npm install` 

## Usage

### Create Application in Lately and configure client

* If you don't already have one, signup for a Lately account on https://www.trylately.com; this will be the user account by which you administer your application definitions. 
* Send an email to brian@trylately.com with your Lately username and one or more github usernames for your developers;  we'll enable Applications integration for you in Lately and add the git users to the sample repo.   
* Sign-in to your Lately account and navigate to the Application page via the User menu (hover your user avatar at top right and select Applications)
* Create an Application record for the sample app with any name, but specify the callback url http://localhost:8080/auth/lately/callback to match the sample app listen route. Save the record, and make note of the clientID and secret for your app in the list. 
* Obtain the sample application using git clone https://github.com/TryLately/passport-lately-sample , this will create a directory named passport-lately-sample. Change to that directory and run `npm install` to install dependencies. 
* Copy your clientID and secret from step 4 to the ./config.js file in the sample app.

### Running the App

* In the installation directory run `node app.js` 
* Open the sample app in a brower at http://localhost:8080 and select Login to authenticate against Lately; then allow the requested permissions to grant your Application access to our api's.  
* After login the sample app displays the user profile, which includes the Dashboards and Campaigns they have access to. You will also see a Generate option in the sample app - this links to a simple wizard that will guide you through content generation by selecting a Dashboard, Campaign and URL for the content source.  

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
  alt_link: 'https://my.url.to.appear.in.post',
  link: 'https://venturebeat.com/2018/08/22/ibm-ai-transparency-factsheets/' 
}
```

* Sample Response

 200 {"statusCode":200,"statusMessage":"generated 32 posts","generated":32}

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2018 Lately Inc. <[https://trylately.com](https://trylately.com)>


