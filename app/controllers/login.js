/**
 * Created by Praveen_T on 2/17/2017.
 */

module.exports = function(authenticate){
    console.log('im here');
     var signin = function(req) {
         console.log(1231231);
         return authenticate.login(req);
     };
}
