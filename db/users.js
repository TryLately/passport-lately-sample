var users = {};

exports.clear = function() {
	Object.keys(users).forEach(function(key) {
		delete users[key];
	});
};

exports.find = function(id, done) {
  return done(null, users[id]);
};

exports.updateOrCreate = function (profile, accessToken, refreshToken, done) {

  console.log('updateOrCreateUser', profile)
  var user = users[profile.id];
  if ( !user ) {
    user = users[profile.id] = profile;
  }
  
  user.accessToken = accessToken;
  user.refreshToken = refreshToken;

  done(null, user);
};
