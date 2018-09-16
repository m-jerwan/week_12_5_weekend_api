const Engine = require('./model/engine');
const ChooseView = require('./views/choose_view');
const Map = require('./helpers/map');
const ResultChart = require('./views/result_chart');
const ResultNeigbDescript = require('./views/result-neigb-descrip');


document.addEventListener('DOMContentLoaded', () => {
    const selectContainer = document.querySelector('#select-dropdown');
    const chooseView = new ChooseView(selectContainer);
    chooseView.buildGrid();
    chooseView.bindEvents();

    const engine = new Engine();
    engine.bindEvents();

    const chartElement = document.querySelector('#result-chart');
    const resultChart = new ResultChart(chartElement);
    resultChart.bindEvents();

    const descriptionElement = document.querySelector('#neighbourhoodDescription');
    const resultNeigbDescript = new ResultNeigbDescript(descriptionElement);
    resultNeigbDescript.bindEvents();

    const map = new Map();
    map.bindEvents();

})