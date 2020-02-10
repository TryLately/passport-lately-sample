'use strict'

var express = require('express'),
    passport = require('passport'),
    PassportLately = require('passport-lately'),
    partials = require('express-partials'),
    encryptor = require('./encryptor'),
    config = require('./config'),
    users = require('./db/users.js'),
    config = require('./config');

var LatelyStrategy = PassportLately.Strategy
var LatelyApi = PassportLately.Api    

/**
PASSPORT CONFIG
**/

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
      users.updateOrCreate(profile, encryptor.encrypt(accessToken), encryptor.encrypt(refreshToken), function(err, user) {
        if(err) { throw err; }
        done(null, user);
      });    
    });    
  }
));

/**
EXPRESS CONFIG
**/

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/app/login');
}

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

/**
PASSPORT ROUTES
**/

// GET /auth/appexample
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in appexample authentication will involve
//   redirecting the user to appexample.com.  After authorization, appexample
//   will redirect the user back to this application at /auth/appexample/callback
app.get('/auth/lately',
  
  passport.authenticate('Lately', {  
    scope: ['lately:user/profile','lately:user/dashboards','lately:content/generate'] 
  }));

// GET /auth/appexample/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/lately/callback', passport.authenticate('Lately', { 
  failureRedirect: '/app/login' }),
    function(req, res) {
      //console.log('callback with arguments',arguments);
      res.redirect('/app/profile');
    }
);

/**
API ROUTES
**/
app.get('/api/profile',ensureAuthenticated, function(req,res,next) {
  var api = new LatelyApi( encryptor.decrypt(req.user.accessToken), config )
  api.get('/user/profile',function(err,results) {
    if ( err ) return next(err)
    else res.json(results)
  })
})

app.get('/api/dashboards',ensureAuthenticated, function(req,res,next) {
  var api = new LatelyApi( encryptor.decrypt(req.user.accessToken), config )
  api.get('/user/dashboards',function(err,results) {
    if ( err ) return next(err)
    else res.json(results)
  })
})

// generate content via api
app.post('/api/content/generate', ensureAuthenticated, function (req, res) {
  var api = new LatelyApi( encryptor.decrypt(req.user.accessToken), config )  
  api.post('/content/generate', req.body, function (err,result) {
    if (err) {
      res.status(err.statusCode).json(err.body||err.statusMessage)
    } else res.send(result);
  });
});

// generate posts via api
app.post('/api/posts/generate', ensureAuthenticated, function (req, res) {
  var api = new LatelyApi( encryptor.decrypt(req.user.accessToken), config )  
  api.post('/posts/generate', req.body, function (err,result) {
    if (err) {
      res.status(err.statusCode).json(err.body||err.statusMessage)
    } else res.send(result);
  });
});

/** 
VIEW ROUTES
**/


app.get('/app/*', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/logout', function(req, res){
  users.clear();
  req.logout();
  res.redirect('/app/login');
});

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.listen(8080);

console.log("Lately OAuth Sample listening on http://localhost:8080");
