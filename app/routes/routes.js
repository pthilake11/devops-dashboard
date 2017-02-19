var express = require('express');
var router = express.Router();
//backend routing
 module.exports = function(passport) {
    // get all applications data
     router.get('/api/applications', function(req, res) {
         //send stub
         res.json(
             [
                 {
                     "id": "101",
                     "name": "application1",
                     "status": "pass",
                     "percentage": 80,
                     "totalBuilds": 10,
                     "successBuilds": 8
                 },
                 {
                     "id": "102",
                     "name": "application2",
                     "status": "pass",
                     "percentage": 100,
                     "totalBuilds": 10,
                     "successBuilds": 10
                 },
                 {
                     "id": "103",
                     "name": "application3",
                     "status": "fail",
                     "percentage": 100,
                     "totalBuilds": 10,
                     "successBuilds": 9
                 }
             ]
         );
     });

     //get application data by id
     router.get('/api/application/:id', function(req, res) {
         //send stub mode
         var data1 = {
             "statid": "1001",
             "statname": "name1",
             "trendid": "2001",
             "trendname": "trend1"
         };

         var data2 = {
             "statid": "1002",
             "statname": "name2",
             "trendid": "2002",
             "trendname": "trend2"
         };

         var data2 = {
             "statid": "1003",
             "statname": "name2",
             "trendid": "2002",
             "trendname": "trend2"
         };

         var data = {};
         if(req.params.id === "101") {
             data = data1;
         } else if(req.params.id === "102") {
             data = data2;
         } else {
             data = data3;
         }
         res.json(data);
     });

     //get application stat data by id, for specific application id
     router.get('/api/application/:id/stat/:statid', function(req, res) {

     });

     //get application trend data by id, for specific application id
     router.get('/api/application/:id/trend/:trendid', function(req, res) {

     });

    //  router.get('*', function(req, res) {
    //     res.sendfile('./public/views/index.html'); // load our public/index.html file
    // });
     router.post('/login',passport.authenticate('login', {
         successRedirect: '/api/success',
         failureRedirect: '/api/failure',
         session: false
     }));

     router.get('/success', function(req, res) {
         res.send({state:'success'} );
     });
     router.get('/failure', function(req, res) {
         res.send({state:'failure', user: null, message: 'invalid username'});
     });

     return router;
}