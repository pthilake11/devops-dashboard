// public/js/controllers/MainCtrl.js
angular.module('DetailsCtrl', []).controller('DetailsController',function($scope,$location,ApiService) {

    $scope.applicationId = '';

    $scope.getDetails = function()
    {

        var id = $location.path().split("/")[2]||"Unknown";

        ApiService.getApplicationById(id).then(function(application) {
            $scope.applicationId = id;
            var masterdata = application.data;
            var stats = masterdata.stats;
            angular.forEach(stats, function(stat, key) {
                $scope.getEachStatData(stat.id, stat.name);
            });

         });
    };

    $scope.getEachStatData = function (statId, statname) {
        var unformatted;

        ApiService.getStatsById(statId).then(function(statistic) {
            unformatted = statistic.data;
            $scope.mapStats(statId, statname, unformatted);
        });
    }

    $scope.mapStats = function(statId , statname, data)
    {
        switch(statId) {
            case "01":
                $scope.bugtitle = statname;
                $scope.getBugsReport(data);
                break;
            case "02":
                //do something;
            case "03":
                //do something else
            default:
                break;
        }
    }

    $scope.getBugsReport = function(data)
    {
        var report = {P1: 0, P2: 0, P3: 0};
        angular.forEach(data, function(element, key) {
            if (element.priority == "1") {
                report.P1 ++;
            } else if (element.priority == "2") {
                report.P2 ++;
            }
        });
        $scope._initBugChart(report);
    }

    $scope._initBugChart = function(report)
    {
        $scope.bugReport = {
            chart: {
                type: 'pieChart',
                height: 450,
                width: 600,
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

        //$scope.bugReportData = data;
        $scope.bugReportData = [
            {
                key: "P1",
                y: report.P1,
                color : "red"
            },
            {
                key: "P2",
                y: report.P2,
                color: "yellow"
            }
        ];
    }


   /* $scope.chart2 = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            width: 400,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.4f')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'test run'
            },
            yAxis: {
                axisLabel: 'No. of bugs',
                axisLabelDistance: 10
            }
        }
    };


    $scope.data = [
        {
            key: "P1",
            y: 3,
            color : "red"
        },
        {
            key: "P2",
            y: 2,
            color: "yellow"
        },
        {
            key: "P3",
            y: 5,
            color : "lightgreen"
        },
        {
            key: "P4",
            y: 10,
            color: "green"
        }
    ];

    $scope.data2 = [{
        key: "number of bugs",
        values: [
            { "label" : "build1" , "value" : 15 },
            { "label" : "build2" , "value" : 10 },
            { "label" : "build3" , "value" : 5 },
            { "label" : "build4" , "value" : 0 }
        ]
    }];*/


});