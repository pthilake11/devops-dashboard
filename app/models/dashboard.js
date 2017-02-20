var mongoose = require('mongoose');
var bugs = mongoose.model('Bugs');
var coverage = mongoose.model('Coverage');
var xmlToJs = require('xml2js');
var fs = require('fs');
var Promise = require('promise');
var fileName = 'findbugs.xml';
const path = require('path');

module.exports.insertBugs = function() {
    return new Promise(function(resolve,reject) {
        parseXml('/bugs', function (response) {
            return parseBugs(response);
        });
    });
};

var parseBugs = function(data) {

    var result = parseXml(fileName);
    var bugsInstances = data.BugCollection.BugInstance;
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
    // });
    return true;
}
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

var parseXml = function(fileName, response) {
    // new Promise(function(resolve,reject) {
    var parsedDatas = {};
    var folderPath = path.join(__dirname, '../data/', fileName);
    new Promise(function (resolve, reject) {
        fs.readdir(folderPath, function (err, files) {
            new Promise(function (resolve, reject) {
                var parsedData = {};
                for (var fileCount in files) {
                    var xml = path.join(folderPath, files[fileCount]);
                    var parser = new xmlToJs.Parser();
                    new Promise(function (resolve, reject) {
                        fs.readFile(xml, function (err, data) {
                            parser.parseString(data, function (err, result) {
                                resolve(result);
                            });

                        });
                    }).then(function (result) {
                        resolve(result);
                    });
                }
                if (!isEmptyObject(parsedData)) {
                    resolve(parsedData);
                }
            }).then(function (result) {
                parsedDatas = result;
                resolve(parsedDatas);
            });
        })
    }).then(function(result) {
        response(parsedDatas);
    });
}

function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

module.exports.fetchCoverage = function(appId) {
    return new Promise(function(resolve,reject) {
        coverage.find({APPID: appId}, function(err, details){
            if (err) {
                reject(err);
            }
            if (!isEmptyObject(details)) {
                resolve(details);
            }
        });
    });
};

module.exports.insertCoverage = function(appId) {
    return new Promise(function(resolve,reject) {
        parseXml('/coverage', function (response) {
            return parseCoverage(appId, response);
        });
    });
};

var parseCoverage = function(appId, data) {
    var coverageReport = new coverage();
    coverageReport.APPID = appId;
    coverageReport.LASTUPDATED = data.coverage.$.timestamp;
    coverageReport.TOTALLINES = data.coverage.$['lines-valid'];
    coverageReport.LINESCOVERED = data.coverage.$['lines-covered'];
    var packages = data.coverage.packages[0].package;
    var parsedPackages = [];
    for (var package in packages) {
        var parsedPackage = {};
        parsedPackage.NAME =packages[package].$.name;
        var classes = packages[package].classes[0].class;
        var parsedClasses = [];
        for (var classCount in classes) {
            var parsedClass = {};
            parsedClass.Name = classes[classCount].$.name;
            var methods = classes[classCount].methods[0].method;
            var parsedMethods = [];
            for (var methodCount in methods) {
                var parsedMethod = {};
                parsedMethod.NAME = methods[methodCount].$.name;
                var lines = methods[methodCount].lines[0].line;
                var parsedLines = [];
                for(var linesCount in lines) {
                    var parsedLine = {};
                    parsedLine.NUMBER = lines[linesCount].$.number;
                    parsedLine.HITS = lines[linesCount].$.hits;
                    parsedLines.push(parsedLine);
                }
                parsedMethod.LINES = parsedLines;
                parsedMethods.push(parsedMethod);
            }
            parsedClass.METHODS = parsedMethod;
            parsedClasses.push(parsedClass);
        }
        parsedPackage.CLASSES = parsedClasses;
        parsedPackages.push(parsedPackage);
    }
    coverageReport.PACKAGES = parsedPackages;
    coverageReport.save(function (err, postData) {
        if (err) {
            return ;
        }
        if (!postData) {
            return false;
        }
    });
    return true;
}