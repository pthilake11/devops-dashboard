//backend routing
var portfolioStub = require("./stubs/user-portfolios.json");
var bugsSummaryStub = require("./stubs/bugs-summary.json");
var coverageSummaryStub = require('./stubs/coverage-summary.json');
var coverageDetailsStub = require('./stubs/coverage-details.json');
var coverTrendStub = require('./stubs/coverage-trend.json');


 module.exports = function(app) {

     //get portfolio
     app.get('/api/portfolio/:userid', function(req, res) {

         res.json(portfolioStub);
     });

     //get application stat data by id, for specific application id
     app.get('/api/application/:id/stat/:statid', function(req, res) {
         if (req.params.statid === 'MTRC103') {
             res.json(bugsSummaryStub);
         } else if (req.params.statid === 'MTRC101' || req.params.statid === 'MTRC102') {
             res.json(coverageSummaryStub);
         }
     });

     //get application trend data by id, for specific application id
     app.get('/api/application/:id/trend/:trendid', function(req, res) {
            if (req.params.trendid == 'MTRC101') {
                res.json(coverTrendStub);
            }
     });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

    /* app.post('/api/login', function(req, res) {
         return login.signin(req);
     });*/

}