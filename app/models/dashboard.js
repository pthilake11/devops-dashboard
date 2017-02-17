var mongoose = require('mongoose');
var bugs = mongoose.model('Bugs');
var xmlToJs = require('xml2js');
var fs = require('fs');
var Promise = require('promise');

module.exports.insertBugs = function() {
    parseXml(function (result) {
        var bugsInstances = result.BugCollection.BugInstance;
        var bugInstance = 0;
        var bugInstance = 0;
        for (var bugInstance in bugsInstances) {
            var newBugs = new bugs();
            var classDetails = bugsInstances[bugInstance].Class[0];
            if (classDetails.$.primary == 'true') {
                newBugs.className = classDetails.$.classname;
            } else {
                continue;
            }
            newBugs.sourceLine.start = classDetails.SourceLine[0].$.start;
            newBugs.sourceLine.end = classDetails.SourceLine[0].$.end;
            newBugs.reportId = "repo-" + bugsInstances[bugInstance].$.type;
            newBugs.category = bugsInstances[bugInstance].$.category;
            newBugs.priority = bugsInstances[bugInstance].$.priority;
            newBugs.ShortMessage = bugsInstances[bugInstance].ShortMessage;
            newBugs.LongMessage = bugsInstances[bugInstance].LongMessage;
            if (bugsInstances[bugInstance].Method) {
                newBugs.methodName = bugsInstances[bugInstance].Method[0].$.name;
            }
            newBugs.save(function (err, postData) {
                if (err) {
                    return ;
                }
                if (!postData) {
                    return false;
                }
            });
        }
    });
    return true;
};
// }
module.exports.fetchBugs = function() {
    return new Promise(function(resolve,reject) {
        bugs.aggregate(([{$sort : {priority: 1}}]
        ), function(err, details){
            if (err) {
               reject(err);
            }
            // var response = parseResponseForPriority(details);
            resolve(details);
        });
    });
};

var parseXml = function(response) {
    var xml = 'C:\\Users\\nihit_baluni\\PhpstormProjects\\MEAN-Test\\nihit\\new_hackathon\\dashboard-hackathon\\data\\findbugs.xml';
    var parser = new xmlToJs.Parser();
    fs.readFile(xml, function (err, data) {
        parser.parseString(data, function (err, result) {
            response(result);
        })
    });
}
var parseResponseForPriority = function(response) {
    var details = {};
    var priorities = []
    for (var id in response) {
        var priority = response[id].priority;
        if (priorities.indexOf(priority) == 0) {
            priorities.push(priority);
        }
        // if (priorities.find(priority)) {
        //     continue;
        // } else {
        //     priorities.push(priority);
        // }
    }
    console.log(priorities);
    // for (var id in response) {
    //     details[priority] = [];
    //     details[priority].push(response[id]);
    // }
    return details;

}


// module.exports.insertBugs = insertBugs;