var express = require('express');
var router = express.Router();


module.exports = function(model) {
    router.get('/success', function(req, res) {
        console.log(1111);
        res.send({state:'success', user: req.user ? req.user : null} );
    });
    router.get('/failure', function(req, res) {
        console.log(222222);
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
        var data = {};
        model.fetchBugs().then(function(response) {
            res.json(response);
        });
    });
    return router;
}
