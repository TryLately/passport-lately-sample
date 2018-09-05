'use strict'

var express = require('express'),
    passport = require('passport'),
    LatelyStrategy = require('passport-lately'),
    partials = require('express-partials'),
    http = require('http'),
    URL = require('url').URL,
    querystring = require('querystring'),
    config = require('./config'),
    users = require('./db/users.js'),
    request = require('request'),
    config = require('./config');

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

function accessProtectedResource( method, path, values, accessToken, cb) {

  var options = {
    form: values,
    method: method,         
    url:  config.serverBaseURL + '/v1/apps' + path,
    headers: {'Authorization': 'Bearer ' + accessToken}
  };

  request( options, function(error, response, body) {
    console.log(options, error, body );
    if ( response.statusCode != 200 ) {
      return cb({statusCode:response.statusCode,statusMessage:response.statusMessage, body:body});
    } else {
      try {
        return cb( false, JSON.parse(body) );        
      } catch(err) { 
        return cb( new Error(`Failed to parse response ${body} : ${err}` ) );
      }
    }
  });

}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete appexample profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user.id); // id stored in a delicious cookie
});

passport.deserializeUser(function(id, done) {
  users.find(id, function (err, user) {
    done(null, user); // Now req.user == user
  });
});

// Use the AppStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and appexample
//   profile), and invoke a callback with a user object.
passport.use('Lately',new LatelyStrategy(config, function(accessToken, refreshToken, profile, done) {

    console.log("Auth Completed :) | accessToken[" + accessToken + "] refreshToken[" + refreshToken + "] profile[", profile, "]");

    // asynchronous verification, for effect...
    // http://howtonode.org/understanding-process-next-tick
    process.nextTick(function () {
      users.updateOrCreate(profile, accessToken, refreshToken, function(err, user) {
        if(err) { throw err; }
        done(null, user);
      });    
    });    
  }
));

var app = express();

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

/** view routes **/
app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/profile', ensureAuthenticated, function(req, res){
  res.render('profile', { user: req.user });
});

app.get('/generate', ensureAuthenticated, function(req, res){
  res.render('generate', { user: req.user });
});

app.get('/logout', function(req, res){
  users.clear();
  req.logout();
  res.redirect('/login');
});

// protected server api
app.post('/generate', ensureAuthenticated, function (req, res) {
  console.log('generate',req.body)
  accessProtectedResource( 'POST', '/content/generate', req.body, req.user.accessToken, function (err,result) {
    if (err) {
      console.log('returning', err )
      res.status(err.statusCode).json(err.body||err.statusMessage)
    } else res.send(result);
  });
});

// GET /auth/appexample
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in appexample authentication will involve
//   redirecting the user to appexample.com.  After authorization, appexample
//   will redirect the user back to this application at /auth/appexample/callback
app.get('/auth/lately',
  passport.authenticate('Lately', {  
    scope: ['lately:user/profile','lately:content/generate'] 
  }));

// GET /auth/appexample/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/lately/callback', passport.authenticate('Lately', { 
  //scope: ['lately:user/profile','lately:content/generate'],
  failureRedirect: '/login' }),
    function(req, res) {
      //console.log('callback with arguments',arguments);
      res.redirect('/profile');
    }
);

//
// Refresh token
//
app.get('/refresh_token', ensureAuthenticated, function (req, res) {

  var post_data = querystring.stringify({
    grant_type : 'refresh_token',    
    client_id : config.clientID,
    client_secret : config.clientSecret,
    refresh_token : req.user.refreshToken
  });

  var frags = new URL(config.tokenURL);

  var options = {
    host: frags.hostname,
    path: frags.pathname,
    port: frags.port,
    method: 'POST',
    headers: {
      'Content-Length': post_data.length,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  var post_req = http.request(options, function (response) {
    var str = '';

    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      
      var data = JSON.parse(str);
      req.user.accessToken = data.access_token;
      req.user.refreshToken = data.refresh_token;

      res.send(str);
    });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

});

app.listen(8080);

console.log("client listening on http://localhost:8080");
