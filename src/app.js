const Engine = require('./model/engine');
const ChooseView = require('./views/choose_view');

document.addEventListener('DOMContentLoaded', () => {

const engine = new Engine();
engine.getAndPublishNeighbourhoods();


const container = document.querySelector('#select-dropdown')
    const chooseView = new ChooseView(container);
chooseView.bindEvents();



})