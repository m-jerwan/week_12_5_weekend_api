const Engine = require('./model/engine');
const ChooseView = require('./views/choose_view');
// const ResultMap = require('./views/result_map');
const ResultChart = require('./views/result_chart');
const ResultNeigbDescript = require('./views/result-neigb-descrip');


document.addEventListener('DOMContentLoaded', () => {

    const selectContainer = document.querySelector('#select-dropdown');
    const chooseView = new ChooseView(selectContainer);
    chooseView.bindEvents();

    const engine = new Engine();
    engine.bindEvents();

    const chartElement = document.querySelector('#result-chart');
    const resultChart = new ResultChart(chartElement);
    resultChart.bindEvents();

    const descriptionElement = document.querySelector('#neighbourhoodDescription');
    const resultNeigbDescript = new ResultNeigbDescript(descriptionElement);
    resultNeigbDescript.bindEvents();

    neighbourhoodDescription
})