function lineList(val, type) {
    // var dataBox = document.getElementsByClassName('line-wrap');
    // var dataDot = document.getElementsByClassName('line-wrap-list');
    // var dataInfo = document.getElementsByClassName('line-overflow');

    // var liChild = dataDot[0].firstElementChild.children;
    // var boxActive = dataInfo[0].children;

    // // clear active
    // for (var i = 0; i < liChild.length; i++) {
    //  var aActive = liChild[i].children[0].classList;
    //  if(aActive.contains('active')){
    //      aActive.remove('active');
    //  }
    // }
    // for (var i = 0; i < boxActive.length; i++) {
    //  if(boxActive[i].classList.contains('active')){
    //      boxActive[i].classList.remove('active');
    //  }
    // }

    // if (type == 'PR') {
    //  dataBox[0].scrollLeft = 0;
    //  val.classList.add('active');
    //  boxActive[0].classList.add('active');
    // }
    // else if (type == 'PO') {
    //  dataBox[0].scrollLeft = boxActive[1].scrollWidth - 25;
    //  val.classList.add('active');
    //  boxActive[1].classList.add('active');

    // }
    // else if (type == 'GR') {
    //  dataBox[0].scrollLeft = boxActive[2].scrollWidth + 900;
    //  val.classList.add('active');
    //  boxActive[2].classList.add('active');
    // }

    var dataBox = document.getElementsByClassName('line-wrap');
    var dataInfo = document.getElementsByClassName('line-overflow');
    var boxActive = dataInfo[0].children;

    for (var i = 0; i < boxActive.length; i++) {
        if (boxActive[i].classList.contains('active')) {
            boxActive[i].classList.remove('active');
        }
    }

    if (type == 'PR') {
        dataBox[0].scrollLeft = 0;
        val.classList.add('active');
    } else if (type == 'PO') {
        dataBox[0].scrollLeft = boxActive[1].scrollWidth - 25;
        val.classList.add('active');

    } else if (type == 'GR') {
        dataBox[0].scrollLeft = boxActive[2].scrollWidth + 900;
        val.classList.add('active');
    }
}
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    lightblue: '#4A90E2',
    lightgreen: '#50E3C2',
    lightblueo: 'rgba(74,144,226,.2)',
    empty: '#FAFAFC'
};

var Months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
    draw: function(ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
            var activePoint = this.chart.tooltip._active[0],
                ctx = this.chart.ctx,
                x = activePoint.tooltipPosition().x,
                topY = this.chart.scales['y-axis-0'].top,
                bottomY = this.chart.scales['y-axis-0'].bottom;

            // draw line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#07C';
            ctx.setLineDash([10, 5]);
            ctx.stroke();
            ctx.restore();
        }
    }
});

window.onload = function() {
    var ppp = document.getElementById("piePoPR").getContext("2d");
    // var pic = document.getElementById("pieCat").getContext("2d");
    window.myPie1 = new Chart(ppp, {
        type: 'doughnut',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            cutoutPercentage: 65
        },
        data: {
            datasets: [{
                data: [0.01],
                backgroundColor: [
                    window.chartColors.empty
                ],
                hoverBackgroundColor: [
                    window.chartColors.empty
                    ],
                borderWidth: 0
            }]
        }
    });
    // window.myPie2 = new Chart(pic, {
    //     type: 'doughnut',
    //     options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         legend: {
    //             display: false
    //         },
    //         tooltips: {
    //             enabled: false,
    //         },
    //         cutoutPercentage: 30
    //     },
    //     data: {
    //         datasets: [{
    //             data: [0.01],
    //             backgroundColor: [
    //                 window.chartColors.empty
    //             ],
    //             hoverBackgroundColor: [
    //                 window.chartColors.empty
    //                 ],
    //             borderWidth: 0
    //         }]
    //     }
    // });
};

    