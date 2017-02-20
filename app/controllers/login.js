/**
 * Created by Praveen_T on 2/17/2017.
 */

var express = require('express');

module.exports = function(authenticate){

     var signin = function(req) {
         return authenticate.login(req);
     };
}
