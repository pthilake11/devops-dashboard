/**
 * Created by Praveen_T on 2/17/2017.
 */
module.exports = function(passport){

    var login = function(req) {
        passport.authenticate('login', {
            successRedirect: '/portfolio',
            failureRedirect: '/'
        });
    };
}