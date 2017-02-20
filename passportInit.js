var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var users = mongoose.model('users');
console.log('application running');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        console.log('serialize user', user);
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        console.log('deserialize user');
        users.findById(id, function(err, user) {
            if (err) {
                return done('deserializer error', false)
            }
            if (!user) {
                return done('user not found', false)
            }
            return done(null, user);
        });
    });

    passport.use('login', new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, userName, password, done) {
            users.findOne({username: userName}, function(err, user) {
                if (err) {
                    return done('DB exception', false);
                }
                if (!user) {
                    return done('user not found',null, false)
                }
                console.log(11111);
                if (!isValidPassword(user, password)) {
                    return done('invalid password', false);
                }
                return done(null, user);
            });
        }
    ));

    var isValidPassword = function (user, password) {
        if (password === user.password) {
            return true;
        }
        return false;
    };
}