const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');

const ChooseView = function (htmlElement) {
    this.htmlElement = htmlElement;
};
const createHtmlElem = new CreateHtmlElem(); //all functions are using this.

ChooseView.prototype.bindEvents = function () {
    const allGridLands = document.querySelectorAll('.land');
    this.addEventLisenerToAll(allGridLands);

    PubSub.subscribe('Engine:array-of-neighbourhoods', (event) => {
        const forceId = event.detail.forceId;
        this.htmlElement.className = ('vissible');
        console.log(this.htmlElement)
        this.resetOptions()
        event.detail.data.forEach(element => {

            const id = `${element.id}`
            createHtmlElem.createOption(this.htmlElement, element.name, id);
        });
        this.htmlElement.addEventListener('change', (event) => {
            const chosenIdAndForce = {
                "id": event.target.value,
                "forceId": forceId
            }
            PubSub.publish('ChooseView:chosen-id-and-force', chosenIdAndForce)
        })
    })
}

ChooseView.prototype.buildGrid = function () {
    const gridContainer = document.querySelector('.grid-container');
    for (let counter = 1; counter < 89; counter++) {
        const gridItem = createHtmlElem.createGridElement('div', 'gr-item');
        this.fillGridItemWithText(gridItem, counter);
        this.giveClassToLandGridItmes(gridItem);
        gridContainer.appendChild(gridItem);
    }
}


ChooseView.prototype.fillGridItemWithText = function (gridItem, counter) {
            if (counter === 4) gridItem.textContent = 'CUMB';
            if (counter === 5) gridItem.textContent = 'NRHH';
            if (counter === 12) gridItem.textContent = 'DRHM';
            if (counter === 13) gridItem.textContent = 'CLVL';
            if (counter === 17) gridItem.textContent = 'NIRL';
            if (counter === 20) gridItem.textContent = 'LANC';
            if (counter === 21) gridItem.textContent = 'NRTY';
            if (counter === 28) gridItem.textContent = 'WESY';
            if (counter === 29) gridItem.textContent = 'HUMB';
            if (counter === 34) gridItem.textContent = 'LVRP';
            if (counter === 35) gridItem.textContent = 'CHES';
            if (counter === 36) gridItem.textContent = 'MANR';
            if (counter === 37) gridItem.textContent = 'STHY';
            if (counter === 42) gridItem.textContent = 'NRTW';
            if (counter === 43) gridItem.textContent = 'STAF';
            if (counter === 44) gridItem.textContent = 'DERB';
            if (counter === 45) gridItem.textContent = 'NOTT';
            if (counter === 46) gridItem.textContent = 'LINC';
            if (counter === 51) gridItem.textContent = 'DYFP';
            if (counter === 52) gridItem.textContent = 'WESD';
            if (counter === 53) gridItem.textContent = 'LEIC';
            if (counter === 54) gridItem.textContent = 'NRFL';
            if (counter === 58) gridItem.textContent = 'WESM';
            if (counter === 59) gridItem.textContent = 'WARW';
            if (counter === 60) gridItem.textContent = 'NRTH';
            if (counter === 61) gridItem.textContent = 'BDFR';
            if (counter === 62) gridItem.textContent = 'CMBR';
            if (counter === 63) gridItem.textContent = 'SUFK';
            if (counter === 65) gridItem.textContent = 'STHW';
            if (counter === 66) gridItem.textContent = 'GWNT';
            if (counter === 67) gridItem.textContent = 'GLCT';
            if (counter === 68) gridItem.textContent = 'THMS';
            if (counter === 69) gridItem.textContent = 'HRTF';
            if (counter === 70) gridItem.textContent = 'ESSX';
            if (counter === 75) gridItem.textContent = 'AVON';
            if (counter === 76) gridItem.textContent = 'WILT';
            if (counter === 77) gridItem.textContent = 'SURY';
            if (counter === 78) gridItem.textContent = 'LNDN';
            if (counter === 82) gridItem.textContent = 'DEVN';
            if (counter === 83) gridItem.textContent = 'DRST';
            if (counter === 84) gridItem.textContent = 'HPSH';
            if (counter === 86) gridItem.textContent = 'SUSX';
            if (counter === 87) gridItem.textContent = 'KENT';
}



ChooseView.prototype.resetOptions = function () {
    this.htmlElement.textContent = '';
    const emptyOption = document.createElement('option');
    emptyOption.textContent = 'Please choose...';
    this.htmlElement.appendChild(emptyOption);
}

ChooseView.prototype.giveClassToLandGridItmes = function (gridItem) {
    if (gridItem.textContent === 'NIRL') {
        gridItem.classList.add('nirl');
    } else if (gridItem.textContent === 'NRTW' ||
        gridItem.textContent === 'DYFP' ||
        gridItem.textContent === 'WESM' ||
        gridItem.textContent === 'STHW' ||
        gridItem.textContent === 'GWNT' ) {
        gridItem.classList.add('wales');
    }else if (gridItem.textContent) gridItem.classList.add('engl');
}


ChooseView.prototype.addEventLisenerToAll = function (allGrids) {
    allGrids.forEach(grid => {
        grid.addEventListener('click', (event) => {
            PubSub.publish('ChooseView:Force-choosen', event.target.id)
        })
    });
}


module.exports = ChooseView;