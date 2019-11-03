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
{ dashboardId: '5b1009fa580fc1118c108d0f', // Your dashboard if API only
  campaignId: '5b1009fb580fc1118c108d12',  // Your default campaign if API only
  alt_link: 'https://my.url.to.appear.in.post',
  link: 'https://venturebeat.com/2018/08/22/ibm-ai-transparency-factsheets/',
  keywords: ["AI", "Machine Learning", "robust", "training data"],
  enforce_keywords: false,
  return_posts: true,

}
```

* Sample Response

```
{ relation_match: '0',
  completion_time: '2303ms',
  extracted_keywords:
   [ 'Won t be Trusted',
     'Adversarial Attacks',
     'Natural Language Processing',
     'Systems Aren',
     'Issue',
     'Google',
     'Operate',
     'Companies',
     'People',
     'Understand',
     'Percent',
     'IBM',
     'Pillar',
     'Developers' ],
  matching_keywords:
   [ { numFound: 25, relevancy: 100, keyword: 'AI services' },
     { numFound: 14, relevancy: 100, keyword: 'system' },
     { numFound: 2,
       relevancy: 44,
       keyword: 'natural language processing' },
     { numFound: 6, relevancy: 42, keyword: 'algorithm' } ],
  analyzed_match: '0',
  tweets:
   [ 
    { filtered: false,
       keywords: [],
       content: 'We’re at a pivotal moment in the path to mass adoption of artificial intelligence (AI).' },
     { filtered: false,
       keywords: [],
       content: 'Google subsidiary DeepMind is leveraging AI to determine how to refer optometry patients .' },
     { filtered: false,
       keywords: [],
       content: 'Haven Life is using AI to extend life insurance policies to people who wouldn’t traditionally be eligible, such as people with chronic illnesses and non-U.S. citizens.' },
     { filtered: false,
       keywords: [],
       content: 'And Google self-driving car spinoff Waymo is tapping it to provide mobility to elderly and disabled people.' },
     { filtered: false,
       keywords: [],
       content: 'But despite the good AI is clearly capable of doing, doubts abound over its safety, transparency, and bias.' },
     { filtered: false,
       keywords: [],
       content: 'There’s no consistent, agreed-upon way AI services should be “created, tested, trained, deployed, and evaluated,” Aleksandra Mojsilovic, head of AI foundations at IBM Research and codirector of the AI Science for Social Good program, today said in a blog post .' },
     { filtered: false,
       keywords: [],
       content: 'Just as unclear is how those systems should operate, and how they should (or shouldn’t) be used.' },
     { filtered: false,
       keywords: [],
       content: 'Mojsilovic thinks that such factsheets could give a competitive advantage to companies in the marketplace, similar to how appliance companies get products Energy Star-rated for power efficiency.' },
     { filtered: false,
       keywords: [],
       content: '“Like nutrition labels for foods or information sheets for appliances, factsheets for AI services would provide information about the product’s important characteristics,” Mojsilovic wrote.' },
     { filtered: false,
       keywords: [],
       content: '“The issue of trust in AI is top of mind for IBM and many other technology developers and providers.' },
     { filtered: false,
       keywords: [],
       content: 'AI-powered systems hold enormous potential to transform the way we live and work but also exhibit some vulnerabilities, such as exposure to bias, lack of explainability, and susceptibility to adversarial attacks.' },
     { filtered: false,
       keywords: [],
       content: 'These issues must be addressed in order for AI services to be trusted.”' },
     { filtered: false,
       keywords: [],
       content: 'Several core pillars form the basis for trust in AI systems, Mojsilovic explained: fairness, robustness, and explainability.' },
     { filtered: false,
       keywords: [],
       content: 'Impartial AI systems can be credibly believed not to contain biased algorithms or datasets, or to contribute to the unfair treatment of certain groups.' },
     { filtered: false,
       keywords: [],
       content: 'Robust AI systems are presumed safe from adversarial attacks and manipulation.' },
     { filtered: false,
       keywords: [],
       content: 'And explainable AI systems aren’t a “black box” — their decisions are understandable by both researchers and developers.' },
     { filtered: false,
       keywords: [],
       content: '“Just like a physical structure, trust can’t be built on one pillar alone.' },
     { filtered: false,
       keywords: [],
       content: 'If it’s secure but we can’t understand its output, it won’t be trusted.' },
     { filtered: false,
       keywords: [],
       content: 'To build AI systems that are truly trusted, we need to strengthen all the pillars together.' },
     { filtered: false,
       keywords: [],
       content: 'Our comprehensive research and product strategy is designed to do just that, advancing on all fronts to lift the mantle of trust into place.”' },
     { filtered: false,
       keywords: [],
       content: 'Documentation should shed light on algorithms’ “development, deployment, and maintenance” so that they can be audited throughout their lifecycle, Mojsilovic said.' },
     { filtered: false,
       keywords: [],
       content: 'That’s where the factsheets come in — they would answer questions ranging from system operation and training data to underlying algorithms, test setups and results, performance benchmarks, fairness and robustness checks, intended uses, maintenance, and retraining.' },
     { filtered: false,
       keywords: [],
       content: 'More granular topics might include governance strategies used to track the AI service’s data workflow, the methodologies used in testing, and bias mitigations performed on the dataset.' },
     { filtered: false,
       keywords: [],
       content: 'For natural language processing algorithms specifically, the researchers propose “data statements” that would show how an algorithm might be generalized, how it might be deployed, and what biases it might contain.' },
     { filtered: false,
       keywords: [],
       content: 'Natural language processing systems aren’t as fraught with controversy as, say, facial recognition, but they’ve come under fire for their susceptibility to bias .' },
     { filtered: false,
       keywords: [],
       content: 'A recent study commissioned by the Washington Post found that smart speakers made by Google and Amazon were 30 percent less likely to understand non-American accents than those of native-born users.' },
     { filtered: false,
       keywords: [],
       content: 'Mojsilovic and the team at IBM certainly have their work cut out for them.' },
     { filtered: false,
       keywords: [],
       content: 'Well-publicized incidents like racially biased recidivism algorithms, highly inaccurate facial detection systems, and crash-prone autonomous cars haven’t done AI any favors.' },
     { filtered: false,
       keywords: [],
       content: 'A survey by InsideSales.com in September found that 41.5 percent of respondents “couldn’t cite a single example of AI that they trust.”' },
     { filtered: false,
       keywords: [],
       content: 'But in Mojsilovic’s view, documents detailing the ins and outs of systems would go a long way to restoring the public’s faith in AI.' },
     { filtered: false,
       keywords: [],
       content: '“Fairness, safety, reliability, explainability, robustness, accountability — we all agree that they are critical.' },
     { filtered: false,
       keywords: [],
       content: 'Yet, to achieve trust in AI, making progress on these issues will not be enough; it must be accompanied with the ability to measure and communicate the performance levels of a system on each of these dimensions,” she wrote.' },
     { filtered: false,
       keywords: [],
       content: '“Understanding and evaluating AI systems is an issue of utmost importance for the AI community, an issue we believe the industry, academia, and AI practitioners should be working on together.”' } ],
}
```
If keywords are sent, you have the option to "Enforce Keywords" and only return posts that contain the keywords sent. If that's true, you will see "filtered: true" and each post will have an array of the keywords contained. 

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2018 Lately Inc. <[https://trylately.com](https://trylately.com)>


