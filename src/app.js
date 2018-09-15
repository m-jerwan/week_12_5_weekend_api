const Engine = require('./model/engine');
const ChooseView = require('./views/choose_view');
const ResultViewTable = require('./views/result_view_table');
// const ResultMap = require('./views/result_map');
const ResultChart = require('./views/result_chart');


document.addEventListener('DOMContentLoaded', () => {

    const engine = new Engine();
    engine.getAndPublishNeighbourhoods();


    const selectContainer = document.querySelector('#select-dropdown');
    const chooseView = new ChooseView(selectContainer);
    chooseView.bindEvents();

        
    const result_table_head = document.querySelector('#result-table-head');
    const result_table_body = document.querySelector('#result-table-body');
    const resultViewTable = new ResultViewTable(result_table_head, result_table_body);
    resultViewTable.bindEvents();

    const chartElement = document.querySelector('#result-chart');
    const resultChart = new ResultChart(chartElement);
    resultChart.bindEvents();
})