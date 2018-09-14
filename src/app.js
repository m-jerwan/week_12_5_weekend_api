const Engine = require('./model/engine');
const ChooseView = require('./views/choose_view');
const ResultView = require('./views/result_view');



document.addEventListener('DOMContentLoaded', () => {

const engine = new Engine();
engine.getAndPublishNeighbourhoods();


const selectContainer = document.querySelector('#select-dropdown');
const chooseView = new ChooseView(selectContainer);
chooseView.bindEvents();

    const showContainer = document.querySelector('#result_view');
const resultView = new ResultView(showContainer);
resultView.bindEvents;
})