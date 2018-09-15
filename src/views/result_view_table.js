const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');



const ResultViewTable = function (head, body) {
    this.head = head;
    this.body = body;
};

ResultViewTable.prototype.bindEvents = function(){
    PubSub.subscribe('Engine:crimes-in-the-area-unique', (event)=>{
        this.renderCrimes(event.detail);
    })
}

ResultViewTable.prototype.renderCrimes = function (crimeData) {
    this.body.textContent = '';
    for (key in crimeData){
        const createHtmlElem = new CreateHtmlElem();
        const tableRow = createHtmlElem.createGenericElem('tr', this.body);
        createHtmlElem.createGenericElem('td', tableRow, `${key}:  `, 't-body-crime');
        createHtmlElem.createGenericElem('td', tableRow, crimeData[key], 't-body-occurence');
    }
}


module.exports = ResultViewTable;