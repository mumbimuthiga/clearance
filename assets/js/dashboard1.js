/*
Template Name: Admin Pro Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: js
*/
$(function () {
    "use strict";
    // ============================================================== 
    // Our Visitor
    // ============================================================== 
    

    // ============================================================== 
    // Our Income
    // ==============================================================
    var chart = c3.generate({
        bindto: '#income',
        data: {
            columns: [
                ['Growth Income', 0, 0, 0, 0],
                ['Net Income', 0, 0, 0, 0]
            ],
            type: 'bar'
        },
         bar: {
            space: 0.2,
            // or
            width: 15 // this makes bar width 100px
        },
        axis: {
            y: {
            tick: {
                count : 4,
                
                outer: false
                }
            }
        },
        legend: {
          hide: true
          //or hide: 'data1'
          //or hide: ['data1', 'data2']
        },
        grid: {
        x: {
            show: false
        },
        y: {
            show: true
        }
    },
        size: {
            height: 290
        },
        color: {
              pattern: [ '#2f0857', '#898989']
        }
    });
    
    // ============================================================== 
    // Issues Raised
    // ============================================================== 
    
    var chart = c3.generate({
        bindto: '#issues-raised',
        data: {
            columns: [
                ['Resolved', 50],
                ['Pending', 60],
                ['Raides', 20],
                
            ],
            
            type : 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            label: {
                show: false
              },
            title:"",
            width:18,
            
        },
        size: {
            height: 150
        },
        legend: {
          hide: true
          //or hide: 'data1'
          //or hide: ['data1', 'data2']
        },
        color: {
              pattern: ['#eceff1', '#898989', '#bbbbbb', '#5d0c5d']
        }
    });


    // ============================================================== 
    // Issues Resolved
    // ============================================================== 

    var chart = c3.generate({
        bindto: '#issues-resolved',
        data: {
            columns: [
                ['Priority: Low', 50],
                ['Priority: Medium', 60],
                ['Priority: Urgent', 20],

            ],

            type : 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            label: {
                show: false
            },
            title:"",
            width:18,

        },
        size: {
            height: 150
        },
        legend: {
            hide: true
            //or hide: 'data1'
            //or hide: ['data1', 'data2']
        },
        color: {
            pattern: ['#eceff1', '#898989', '#2f0857', '#9d1700']
        }
    });
    
    // ============================================================== 
    // Sales chart
    // ============================================================== 
    Morris.Area({
        element: 'sales-chart',
        data: [{
                period: '2011',
                Sales: 50,
                Earning: 80,
                Marketing: 20
            }, {
                period: '2012',
                Sales: 130,
                Earning: 100,
                Marketing: 80
            }, {
                period: '2013',
                Sales: 80,
                Earning: 60,
                Marketing: 70
            }, {
                period: '2014',
                Sales: 70,
                Earning: 200,
                Marketing: 140
            }, {
                period: '2015',
                Sales: 180,
                Earning: 150,
                Marketing: 140
            }, {
                period: '2016',
                Sales: 105,
                Earning: 100,
                Marketing: 80
            },
            {
                period: '2017',
                Sales: 250,
                Earning: 150,
                Marketing: 200
            }
        ],
        xkey: 'period',
        ykeys: ['Sales', 'Earning', 'Marketing'],
        labels: ['Site A', 'Site B', 'Site C'],
        pointSize: 0,
        fillOpacity: 0,
        pointStrokeColors: ['#7B15E3', '#2f0857', '#21063D'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 3,
        hideHover: 'auto',
        lineColors: ['#20aee3', '#24d2b5', '#6772e5'],
        resize: true

    });

    // ============================================================== 
    // This is for the popup message while page load
    // ============================================================== 
        $.toast({
            heading: 'Welcome to Gated',
            text: 'A powerful community management plaftorm',
            position: 'top-right',
            loaderBg: '#f33c49',
            icon: 'info',
            hideAfter: 8000,
            stack: 6
        })
    


// ==============================================================
// Collection
// ==============================================================
var sparklineLogin = function() {
    $('.spark-count').sparkline([4, 5, 0, 10, 9, 12, 4, 9, 4, 5, 3, 10, 9, 12, 10, 9], {
        type: 'bar',
        width: '100%',
        height: '120',
        barWidth: '2',
        resize: true,
        barSpacing: '6',
        barColor: 'rgba(255, 255, 255, 0.3)'
    });
}
var sparkResize;

sparklineLogin();

    console.clear()
    var $carousel = $('.carousel').flickity({
        // selectedAttraction: 0.3,
        // friction: 0.6
    });

});

