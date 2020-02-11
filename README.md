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

### Generate Posts

* Generate posts from a link, without creating content in Lately:

POST `<lately server>/v1/apps/posts/generate`

* Sample Body Parameters 

```
{ 
  dashboardId: '5b1009fa580fc1118c108d0f', // Lately dashboard ID tagged with api_generate_posts (contact brian@trylately.com)
  link: 'https://venturebeat.com/2018/08/22/ibm-ai-transparency-factsheets/',
}
```

* Sample Response

```
{ 
  posts:
   [
 "FLUSHING, N.Y. , Aug. 29, 2018 / PRNewswire / --  IBM today announced that IBM Watson will now partner with tennis players and coaches to enhance their game strategy and better prepare for matches more efficiently. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "As a partner of the US Open tournament for more than 25 years, IBM innovations have positioned the US Open as a tournament at the forefront of the modern digital experience with technology that fans have come to know and love. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "This year, IBM and the USTA will integrate its AI Highlights technology into player performance as the tournament enters the next phase of its technology journey. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "For the past year, IBM has been working with the USTA Player Development's performance team to develop a technology solution that will help coaches and players analyze and improve their performance. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "The new player development solution uses AI Highlights, the same technology IBM built to support the USTA's US Open Digital Team, enabling them to create real-time content to engage their fans. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "The new player development solution will review hours of match footage and automatically identify and index key points and stats, allowing coaches to quickly design detailed reports for subsequent matches. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "This enables coaches to reference and review a comprehensive database of players' indexed match video that they otherwise would not have been able to access. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "\"Coaches and tennis players look to video as a useful resource that helps to evaluate players and develop scouting reports before and during tournaments. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "Working with IBM enables us to process and index video using AI to free up valuable intellectual capital that we can re-allocate to more interpretive and customized analysis,\" said Martin Blackman , General Manager, USTA Player Development. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "\"Analyzing footage of previous matches is normally very time-intensive, involving many hours of manual 'match-tagging.' http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "Video tagging that used to take hours can now take Watson minutes to execute. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "We are excited that working together with IBM we can create a new solution that will revolutionize our ability to pair analytics with coaching expertise to drive performance.\" http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "IBM will also continue to evolve the digital fan experience, designed by IBM iX, one of the world's largest digital agencies and global business design partners, for attendees of the US Open and the millions of people around the world who follow the tournament. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "After launching last year, AI Highlights is expanding at this year's tournament to include match and player-specific highlights, giving the USTA Digital Team the ability to quickly create highlights of a match or player within minutes. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "Two new AI Highlights solutions will be available for the USTA Digital Team: IBM has built an AI Highlight dashboard that will populate in near real-time every shot of a match and its excitement level. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "The US Open Digital Team will be able to view and find the most exciting shot of the day or the match and leverage this content across all their digital channels, including social media. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "IBM's AI Highlight builder will allow the US Open Digital Team to generate a highlight video for any match played on one of the seven show courts. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "The system will generate a list of proposed points to be included in the highlights package. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "Once the US Open Digital Team selects shots from the list, the system generates the highlights package for the USTA Digital Team to publish. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "Enabled by Watson services, the chatbot answers questions about scoring, schedules, transportation, dining options and more. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "Depending on the question, the Virtual Concierge may also direct users to their points of interest within an interactive map of the venue, which will also indicate an attendee's current location. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "For fans of SlamTracker , the experience will now include a \"momentum\" feature, so at a glance, fans can see who has advantage as well as the shifts in momentum over the course of all live matches. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "SlamTracker will continue to provide scores, stats and insights for all matches in progress, giving US Open fans an unprecedented level of analysis and engagement. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "\"The US Open offers an enormous amount of tennis across multiple courts over the two weeks of the tournament. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "We're proud to be able offer multiple fan experiences both on-site at the USTA Billie Jean King Tennis Center, and on the official US Open digital platforms that serve millions of fans around the world,\" said Noah Syken , VP of Sports & Entertainment Partnerships, IBM. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "\"To ensure fans are keeping pace throughout the tournament, IBM's AI technology will help fans follow matches and navigate their time on the US Open grounds. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "While we're seeing this type of technology come to life through tennis, these AI-powered solutions also are impacting many other industries.\" http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "Experience Watson at the USTA Billie Jean King Tennis Center Fans who attend the US Open will have the opportunity to go to The IBM Experience , an on-site fan experience space new this year at the USTA Billie Jean King Tennis Center. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "The space is designed to introduce fans to the technology that powers the digital experience of the US Open for more than 10 million fans around the world. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "It will feature stunning visuals of SlamTracker, the IBM Cloud and Watson . http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "Guests will be able to test Watson's ability to recognize the sights and sounds of the game, and create their own AI Highlights in the process that they can share on social media. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "About IBM Watson Watson represents a new era in computing, where systems understand the world in a way more similar to humans: through senses, learning, and experience. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "With the help of Watson , organizations are harnessing the power of AI to transform industries, help professionals do their jobs better, and solve important challenges. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships",
 "Visit the Apple and  Android app stores to download the US Open apps for mobile devices. http://newsroom.ibm.com/2018-08-29-IBM-Gives-Tennis-Players-a-Competitive-Edge-with-Watson-at-the-2018-US-Open-Tennis-Championships"
]
}
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2018 Lately Inc. <[https://trylately.com](https://trylately.com)>


