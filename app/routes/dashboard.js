var express = require('express');
var router = express.Router();
var portfolioStub = require("./stubs/user-portfolios.json");

module.exports = function(model) {

    router.get('/api/portfolio/:userid', function(req, res) {

         res.json(portfolioStub);
     });
    
    router.post('/bugs', function(req, res) {
        var success = model.insertBugs(req.body.APPID, req.body.STATID);
        if(success) {
            res.send({code: 200, state:'success', description: 'data inserted successfully'} );
        } else {
            res.send({code: 500, state: 'failure', user: null, message: 'data insertion failed'});
        }
    });


    router.get('/api/application/:APPID/STAT/:STATID/', function(req, res) {
    
    if (req.params.STATID === 'MTRC103') {
        model.fetchBugs(req.params.APPID, req.params.STATID).then(function(response) {
            res.json(response);
        });
    } else if (req.params.STATID === 'MTRC101') {
          model.fetchCoverage(req.params.APPID).then(function(response) {
            res.json(response);
        });
    }
    });


    router.post('/coverage', function(req, res) {
        var success = model.insertCoverage(req.body.APPID);
        if(success) {
            res.send({code: 200, state:'success', description: 'data inserted successfully'} );
        } else {
            res.send({code: 500, state: 'failure', user: null, message: 'data insertion failed'});
        }

    });
    
    router.get('/success', function(req, res) {
         res.send({state:'success'} );
     });
     
     router.get('/failure', function(req, res) {
         res.send({state:'failure', user: null, message: 'invalid username'});
     });
     
    
     router.get('*', function(req, res) {
         res.sendfile('./public/views/index.html'); // load our public/index.html file
     });

    return router;
}
