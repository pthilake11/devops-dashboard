// public/js/controllers/MainCtrl.js
angular.module('DetailsCtrl', []).controller('DetailsController', function($scope) {

    $scope.copyright = '© Copyright 2017. AutoBots Team';

    $scope.chart1 = {
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

    $scope.chart2 = {
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
            key: "lines covered",
            y: 700,
            color : "green"
        },
        {
            key: "lines ignored",
            y: 300,
            color: "lightgreen"
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
    }];


});