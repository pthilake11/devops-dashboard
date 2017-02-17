var express = require('express');
var router = express.Router();
//backend routing
 module.exports = function(app, login) {
    // get all applications data
     app.get('/api/applications', function(req, res) {
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
     app.get('/api/application/:id', function(req, res) {
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
     app.get('/api/application/:id/stat/:statid', function(req, res) {

     });

     //get application trend data by id, for specific application id
     app.get('/api/application/:id/trend/:trendid', function(req, res) {

     });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

     app.post('/api/login', function(req, res) {
         console.log(login);
         res.json(login(req, res));
     });

     app.put('/bugs', function(req, res) {
         res.json()
     });

}