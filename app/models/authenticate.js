/**
 * Created by Praveen_T on 2/17/2017.
 */
module.exports = function(passport){

    module.exports.login = function(req,res) {
        console.log(req.body);
        passport.authenticate('login', function(req, res) {
            console.log('inside here');
        });
    };
}