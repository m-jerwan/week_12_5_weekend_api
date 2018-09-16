const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');

const ChooseView = function (htmlElement) {
    this.htmlElement = htmlElement;
};
const createHtmlElem = new CreateHtmlElem(); //all functions are using this.

ChooseView.prototype.bindEvents = function () {
    const allGridLands = document.querySelectorAll('.land');

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
        this.fillGridItemWithTextAndId(gridItem, counter);
        this.giveClassToLandGridItmes(gridItem);
        this.addEventLisener(gridItem);
        gridContainer.appendChild(gridItem);
    }
}

ChooseView.prototype.resetOptions = function () {
    this.htmlElement.textContent = '';
    const emptyOption = document.createElement('option');
    emptyOption.textContent = 'Please choose...';
    this.htmlElement.appendChild(emptyOption);
}

ChooseView.prototype.fillGridItemWithTextAndId = function (gridItem, counter) {

    if (counter === 4) {
        gridItem.textContent = 'CUMB';
        gridItem.id = 'cumbria';
    }
    if (counter === 5) {
        gridItem.textContent = 'NRHH';
        gridItem.id = 'northumbria';
        gridItem.id = '';
    }
    if (counter === 12) {
        gridItem.textContent = 'DRHM';
        gridItem.id = 'durham';
    }
    if (counter === 13) {
        gridItem.textContent = 'CLVL';
        gridItem.id = 'cleveland';
    }
    if (counter === 17) {
        gridItem.textContent = 'NIRL';
        gridItem.id = 'northern-ireland';
    }
    if (counter === 20) {
        gridItem.textContent = 'LANC';
        gridItem.id = 'lancashire';
    }
    if (counter === 21) {
        gridItem.textContent = 'NRTY';
        gridItem.id = 'north-yorkshire';
    }
    if (counter === 28) {
        gridItem.textContent = 'WESY';
        gridItem.id = 'west-yorkshire';
    }
    if (counter === 29) {
        gridItem.textContent = 'HUMB';
        gridItem.id = 'humberside';
    }
    if (counter === 34) {
        gridItem.textContent = 'LVRP';
        gridItem.id = 'merseyside';
    }
    if (counter === 35) {
        gridItem.textContent = 'CHES';
        gridItem.id = 'cheshire';
    }
    if (counter === 36) {
        gridItem.textContent = 'MANR';
        gridItem.id = 'greater-manchester';
    }
    if (counter === 37) {
        gridItem.textContent = 'STHY';
        gridItem.id = 'south-yorkshire';
    }
    if (counter === 42) {
        gridItem.textContent = 'NRTW';
        gridItem.id = 'north-wales';
    }
    if (counter === 43) {
        gridItem.textContent = 'STAF';
        gridItem.id = 'staffordshire';
    }
    if (counter === 44) {
        gridItem.textContent = 'DERB';
        gridItem.id = 'derbyshire';
    }
    if (counter === 45) {
        gridItem.textContent = 'NOTT';
        gridItem.id = 'nottinghamshire';
    }
    if (counter === 46) {
        gridItem.textContent = 'LINC';
        gridItem.id = 'lincolnshire';
    }
    if (counter === 51) {
        gridItem.textContent = 'DYFP';
        gridItem.id = 'dyfed-powys';
    }
    if (counter === 52) {
        gridItem.textContent = 'WESD';
        gridItem.id = 'west-midlands';
    }
    if (counter === 53) {
        gridItem.textContent = 'LEIC';
        gridItem.id = 'leicestershire';
    }
    if (counter === 54) {
        gridItem.textContent = 'NRFL';
        gridItem.id = 'norfolk';
    }
    if (counter === 58) {
        gridItem.textContent = 'WESM';
        gridItem.id = 'west-mercia';
    }
    if (counter === 59) {
        gridItem.textContent = 'WARW';
        gridItem.id = 'warwickshire';
    }
    if (counter === 60) {
        gridItem.textContent = 'NRTH';
        gridItem.id = 'northamptonshire';
    }
    if (counter === 61) {
        gridItem.textContent = 'BDFR';
        gridItem.id = 'bedfordshire';
    }
    if (counter === 62) {
        gridItem.textContent = 'CMBR';
        gridItem.id = 'cambridgeshire';
    }
    if (counter === 63) {
        gridItem.textContent = 'SUFK';
        gridItem.id = 'suffolk';
    }
    if (counter === 65) {
        gridItem.textContent = 'STHW';
        gridItem.id = 'south-wales';
    }
    if (counter === 66) {
        gridItem.textContent = 'GWNT';
        gridItem.id = 'gwent';
    }
    if (counter === 67) {
        gridItem.textContent = 'GLCT';
        gridItem.id = 'gloucestershire';
    }
    if (counter === 68) {
        gridItem.textContent = 'THMS';
        gridItem.id = 'thames-valley';
    }
    if (counter === 69) {
        gridItem.textContent = 'HRTF';
        gridItem.id = 'hertfordshire';
    }
    if (counter === 70) {
        gridItem.textContent = 'ESSX';
        gridItem.id = 'essex';
    }
    if (counter === 75) {
        gridItem.textContent = 'AVON';
        gridItem.id = 'avon-and-somerset';
    }
    if (counter === 76) {
        gridItem.textContent = 'WILT';
        gridItem.id = 'wiltshire';
    }
    if (counter === 77) {
        gridItem.textContent = 'SURY';
        gridItem.id = 'surrey';
    }
    if (counter === 78) {
        gridItem.textContent = 'LNDN';
        gridItem.id = 'metropolitan';
    }
    if (counter === 82) {
        gridItem.textContent = 'DEVN';
        gridItem.id = 'devon-and-cornwall';
    }
    if (counter === 83) {
        gridItem.textContent = 'DRST';
        gridItem.id = 'dorset';
    }
    if (counter === 84) {
        gridItem.textContent = 'HPSH';
        gridItem.id = 'hampshire';
    }
    if (counter === 86) {
        gridItem.textContent = 'SUSX';
        gridItem.id = 'sussex';
    }
    if (counter === 87) {
        gridItem.textContent = 'KENT';
        gridItem.id = 'kent';
    }
}

ChooseView.prototype.giveClassToLandGridItmes = function (gridItem) {
    if (gridItem.textContent === 'NIRL') {
        gridItem.classList.add('nirl');
    } else if (gridItem.textContent === 'NRTW' ||
        gridItem.textContent === 'DYFP' ||
        gridItem.textContent === 'WESM' ||
        gridItem.textContent === 'STHW' ||
        gridItem.textContent === 'GWNT') {
        gridItem.classList.add('wales');
    } else if (gridItem.textContent) gridItem.classList.add('engl');
}

ChooseView.prototype.addEventLisener = function (gridItem) {
    gridItem.addEventListener('click', (event) => {
        PubSub.publish('ChooseView:Force-choosen', event.target.id)
    })
}

module.exports = ChooseView;