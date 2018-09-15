const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');

const ResultChart = function(chartElement){
    this.chartElement = chartElement;
}


ResultChart.prototype.bindEvents = function(){
    PubSub.subscribe('Engine:crimes-in-the-area', (event) => {
        this.renderChart(event.detail);
    })
}

ResultChart.prototype.renderChart = function(crimeData){
    console.log(crimeData)
$(function () {
    $('#result-chart').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }],
    });
});
}

module.exports = ResultChart;