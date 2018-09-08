
module.exports = {

	// Application config (required)
	clientID :'',
	clientSecret :'',
	callbackURL :'http://localhost:8080/auth/lately/callback',

	// override passport-lately defaults to access dev.trylately.com 
	serverBaseURL:'https://dev.trylately.com',
	authorizationURL:'https://dev.trylately.com/v1/apps/oauth/authorize',
	userProfileURL:'https://dev.trylately.com/v1/apps/user/profile',
	tokenURL:'https://dev.trylately.com/v1/apps/oauth/token',

}; 


