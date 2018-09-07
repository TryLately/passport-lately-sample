
module.exports = {

	// Your Application config (required)
	clientID :"5b92e1e0b3bcee35ed11b640",
	clientSecret :"THFaByIFH1hsr9CGMorJugIOvfaelSP3OznEb17RCN",
	callbackURL :'http://localhost:8080/auth/lately/callback',

	// passport-lately config defaults to https://www.trylately.com,
	// but for development override to access dev.trylately.com
	serverBaseURL:'https://dev.trylately.com',
	authorizationURL:'https://dev.trylately.com/v1/apps/oauth/authorize',
	userProfileURL:'https://dev.trylately.com/v1/apps/user/profile',
	tokenURL:'https://dev.trylately.com/v1/apps/oauth/token',

}; 


