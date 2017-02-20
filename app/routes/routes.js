var express = require('express');
var router = express.Router();
//backend routing
 module.exports = function(passport) {

     router.post('/login',passport.authenticate('login', {
         successRedirect: '/success',
         failureRedirect: '/failure',
         session: false
     }));

     return router;
}