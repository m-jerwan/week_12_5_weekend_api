const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');

const ResultChart = function(chartElement){
    this.chartElement = chartElement;
}


ResultChart.prototype.bindEvents = function(){
    PubSub.subscribe('Engine:crimes-in-the-area-unique', (event) => {
        this.renderChart(event.detail);
    })
}



ResultChart.prototype.renderChart = function(uniqueCrimeData){
    const arrayOfCrimes = this.createArrayOfCrimes(uniqueCrimeData);
    const arrayOfOccurences = this.createArrayOfOccurences(uniqueCrimeData);
    $(function () {
        $('#result-chart').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'All reported neighbourghood crimes last month'
            },
            xAxis: {
                categories: arrayOfCrimes
            },
            yAxis: {
            },
            series: [{
                name: 'Number of occurences of crime',
                data: arrayOfOccurences
            }],
        });
    });
}

ResultChart.prototype.createArrayOfCrimes = function (uniqueCrimeData) {
    arrayOfCrimes = [];
    for (crime in uniqueCrimeData){
        arrayOfCrimes.push(crime)
    }
    return arrayOfCrimes;
}

ResultChart.prototype.createArrayOfOccurences = function (uniqueCrimeData) {
    arrayOfOccurences = [];
    for (crime in uniqueCrimeData) {
        arrayOfOccurences.push(uniqueCrimeData[crime])
    }
    return arrayOfOccurences;
}




// $(function () {
//     $('#result-chart').highcharts({
//         chart: {
//             type: 'bar'
//         },
//         title: {
//             text: 'Crimes in the area'
//         },
//         xAxis: {
//             categories: ['Apples', 'Bananas', 'Oranges']
//         },
//         yAxis: {
//             title: {
//                 text: 'Fruit eaten'
//             }
//         },
//         series: [{
//             name: 'Jane',
//             data: [1, 0, 4]
//         }, {
//             name: 'John',
//             data: [5, 7, 3]
//         }],
//     });
// });
// }

module.exports = ResultChart;