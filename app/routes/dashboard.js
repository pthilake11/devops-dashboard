var express = require('express');
var router = express.Router();


module.exports = function(model) {
    router.get('/success', function(req, res) {
        res.send({state:'success', user: req.user ? req.user : null} );
    });
    router.get('/failure', function(req, res) {
        res.send({state:'failure', user: null, message: 'invalid username'});
    });
    router.post('/bugs', function(req, res) {
        var success = model.insertBugs();
        if(success) {
            res.send({code: 200, state:'success', description: 'data inserted successfully'} );
        } else {
            res.send({code: 500, state: 'failure', user: null, message: 'data insertion failed'});
        }
    });
    router.get('/bugs', function(req, res) {
        model.fetchBugs().then(function(response) {
            res.json(response);
        });
    });

    router.get('/coverage/:APPID/', function(req, res) {
        model.fetchCoverage(req.params.APPID).then(function(response) {
            res.json(response);
        });

    });

    router.post('/coverage', function(req, res) {
        var success = model.insertCoverage(req.body.APPID);
        if(success) {
            res.send({code: 200, state:'success', description: 'data inserted successfully'} );
        } else {
            res.send({code: 500, state: 'failure', user: null, message: 'data insertion failed'});
        }

    });

    return router;
}
