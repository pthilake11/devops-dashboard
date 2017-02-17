//backend routing
var stub = require("./stubs/stat1.json");

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
             "stats" : [
                 {
                     "id" : "01",
                     "name" : "current bugs report"
                 }
             ],
             "trends" : []
         };

         var data2 = {
             "stats" : [
                 {
                     "id" : "01",
                     "name" : "current bugs report"
                 }
             ],
             "trends" : [
                 {
                     "id" : "10",
                     "name" : "bug report history"
                 }
             ]
         };

         var data = data1;
         res.json(data);
     });

     //get application stat data by id, for specific application id
     app.get('/api/application/:id/stat/:statid', function(req, res) {

           res.json(stub);
     });

     //get application trend data by id, for specific application id
     app.get('/api/application/:id/trend/:trendid', function(req, res) {

     });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

     app.post('/api/login', function(req, res) {
         return login.signin(req);
     });

}