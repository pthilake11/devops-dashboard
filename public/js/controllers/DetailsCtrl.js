// public/js/controllers/MainCtrl.js
angular.module('DetailsCtrl', []).controller('DetailsController',['$scope','$location','ApiService','$rootScope',function($scope,$location,ApiService,$rootScope) {

    $scope.applicationId = '';

    $scope.applications = [];

    $scope.trends = false;

    //code to initialize data on details page
    $scope.getDetails = function()
    {
        console.log($rootScope.userid);
        if($rootScope.userid === undefined) {
           $location.path("/");
        }
        var id = $location.path().split("/")[2] || "Unknown";

        $scope.applicationId = id;
        $scope.applications = $rootScope.applications;

        angular.forEach($scope.applications, function (application, key) {
            if (application.id === $scope.applicationId) {
                var allMetrics = application.metricsSummary;
                angular.forEach(allMetrics, function (metric, key) {
                    var metricId = metric.metricId;
                    var metricName = metric.metricName;
                    $scope.getEachStatData(id, metricId, metricName);
                });
            }
        });
    };

    //function to fetch the different metrics details based on application
    $scope.getEachStatData = function (appId, statId, statname) {
        var unformatted;

        ApiService.getStatsById(appId, statId).then(function(statistic) {
            unformatted = statistic.data;
            $scope.mapStats(statId, statname, unformatted);
        });
    };

    $scope.fetchTrends = function () {
        var unformatted;
        var appId = $scope.applicationId;
        var trendId = 'MTRC101';//@todo - for now this is hardcoded to available stub trend.
        ApiService.getTrendsById(appId,trendId).then(function(trend){
            unformatted = trend.data;
            trendId = 'T-' + trendId;
            $scope.mapStats(trendId,'', unformatted);
        });
    }

    //function handler to handle response from different metrics and route to specific
    //charting function
    $scope.mapStats = function(statId , statname, data)
    {
        switch(statId) {
            case "MTRC103":
                $scope.bugtitle = statname;
                $scope.generateBugsReport(data);
                break;
            case "MTRC101":
                $scope.coveragetitle = statname;
                $scope.generateCoverageReport(data);
                //do something with coverage report;
            case "T-MTRC101":
                $scope.coverageTrend = 'code coverage historical plot';
                $scope.generateHistoricalCoverage(data);
            default:
                break;
        }
    };

    //function to format bugs report
    $scope.generateBugsReport = function(data)
    {
        var report = {P1: 0, P2: 0, P3: 0, P4: 0, P5:0};
        angular.forEach(data.priorities, function(element, key) {
            switch(element.name) {
                case 'P1':
                    report.P1 = element.count;
                    break;
                case 'P2':
                    report.P2 = element.count;
                    break;
                case 'P3':
                    report.P3 = element.count;
                    break;
                case 'P4':
                    report.P4 = element.count;
                    break;
                default:
                    report.P5 = element.count;
            }
        });
        $scope._plotBugChart(report);
    };

    //function to plot bug report
    $scope._plotBugChart = function(report)
    {
        $scope.bugReport = {
            chart: {
                type: 'pieChart',
                height: 300,
                width: 350,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.bugReportData = [
            {
                key: 'P1  ',
                y: report.P1,
                color : "red"
            },
            {
                key: 'P2  ',
                y: report.P2,
                color: "yellow"
            },
            {
                key: 'P3  ',
                y: report.P3,
                color: "lightgreen"
            },
            {
                key: 'P4  ',
                y: report.P4,
                color: "green"
            }
        ];
    };


    $scope.generateCoverageReport = function(data) {
        var report = {coveredLines: 0, uncoveredLines: 0};
        report.coveredLines = data.linesCovered;
        report.uncoveredLines = data.totalValidLines -  data.linesCovered;
        $scope._plotCoverageReport(report);
    };

    $scope._plotCoverageReport = function(report) {
        $scope.coverageReport = {
            chart: {
                type: 'pieChart',
                height: 300,
                width: 500,
                donut: true,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,

                pie: {
                    startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                    endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
                },
                duration: 500,
                legend: {
                    margin: {
                        top: 5,
                        right: 140,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.coverageData = [
            {
                key: "covered Lines ",
                y: report.coveredLines,
                color :"green"
            },
            {
                key: "uncovered Lines ",
                y: report.uncoveredLines,
                color : "lightgreen"
            }
        ];

    };

    $scope.generateHistoricalCoverage = function(data){

        var values = [];
        var reportData =[];
        angular.forEach(data, function (element, key) {
            var plotdata = {label: '', value: 0};
            plotdata.label = element.lastUpdated;
            plotdata.value = element.percentCovered;
            values.push(plotdata);
        });
        var dataObj = {"key": "Cumulative Return", "values" : values};
        reportData.push(dataObj);
        $scope._plotHistoricalCoverage(reportData);

    };

    $scope._plotHistoricalCoverage = function(data) {

        $scope.trendcoverage = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'Build date'
                },
                yAxis: {
                    axisLabel: 'Code coverage percentage',
                    axisLabelDistance: -10
                }
            }
        };

        $scope.trenddata = data;
        $scope.trends = true;

    };
}]);