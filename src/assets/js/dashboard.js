function lineList(val, type) {
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

var Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
Chart.defaults.doughnut.tooltips.custom = function(tooltip) {
    // Tooltip Element
    var isIdOftooltip = this._chart.canvas.parentElement.children[2].id;
    var tooltipEl = document.getElementById(isIdOftooltip);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
    } else {
        tooltipEl.classList.add('no-transform');
    }

    function getBody(bodyItem) {
        return bodyItem.lines;
    }

    // Set Text
    if (tooltip.body) {
        var titleLines = tooltip.title || [];
        var bodyLines = tooltip.body.map(getBody);

        var innerHtml = '<thead>';

        titleLines.forEach(function(title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';

        bodyLines.forEach(function(body, i) {
            var colors = tooltip.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
            innerHtml += '<tr><td>'+span+'</td><td>'+body+'</td></tr>'
        });
        innerHtml += '</tbody>';

        var tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
    }

    var positionY = this._chart.canvas.offsetTop;
    var positionX = this._chart.canvas.offsetLeft;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
};

window.onload = function() {
    var ppp = document.getElementById("piePoPR").getContext("2d");
    var pic = document.getElementById("pieCat").getContext("2d");
    var lg = document.getElementById("lineG").getContext("2d");
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
                data: [25, 75],
                backgroundColor: [
                    window.chartColors.lightblue,
                    window.chartColors.lightgreen
                ],
                borderWidth: 0
            }],
            labels: [
                "Red",
                "Orange"
            ]
        }
    });
    window.myPie2 = new Chart(pic, {
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
            cutoutPercentage: 30
        },
        data: {
            datasets: [{
                data: [25, 75],
                backgroundColor: [
                    window.chartColors.lightgreen,
                    window.chartColors.lightblue
                ],
                borderWidth: 0
            }],
            labels: [
                "Red",
                "Orange This is for Long nameing naja eiei"
            ]
        }
    });
    window.myLine1 = new Chart(lg, {
        type: 'LineWithLine',
        data: {
            labels: Months,
            datasets: [{
                label: "My First dataset",
                backgroundColor: window.chartColors.lightblueo,
                borderColor: window.chartColors.lightblue,
                data: [5000, 2000, 3000, 7500, 20000, 4500, 1500, 7000, 7000, 35000, 420, 9000],
                fill: true,
                pointDotRadius: 1,
                pointDotStrokeWidth: 8,
                pointHitDetectionRadius: 20,
                pointBackgroundColor: window.chartColors.lightblue
            }]
        },
        options: {
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true,
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Value'
                    },
                    ticks: {
                        min: 500,
                        max: 50000,
                        beginAtZero: true
                    }
                }]
            },
            elements: {
                line: {
                    tension: 0
                }
            }
        }
    });
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Redjhljfhlfdshlgshlghlsgjhsflg", "Blue", "Yellow"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            tooltips: {
                backgroundColor: 'red',
                titleFontSize: 16,
                titleFontColor: '#0066ff',
                bodyFontColor: '#000',
                bodyFontSize: 14,
                displayColors: false
            }
        }
    });
};