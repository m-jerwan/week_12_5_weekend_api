const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');



const ResultViewTable = function (head, body) {
    this.head = head;
    this.body = body;
};

ResultViewTable.prototype.bindEvents = function(){
    PubSub.subscribe('Engine:crimes-in-the-area', (event)=>{
        this.renderCrimes(event.detail);
    })
}

ResultViewTable.prototype.renderCrimes = function (crimeData) {
    this.body.textContent = '';
    const crimeDataUniqueCounted = this.constructUniqueDataCounted(crimeData);
    for (key in crimeDataUniqueCounted){
        const createHtmlElem = new CreateHtmlElem();
        const tableRow = createHtmlElem.createGenericElem('tr', this.body);
        createHtmlElem.createGenericElem('td', tableRow, `${key}:  `, 't-body-crime');
        createHtmlElem.createGenericElem('td', tableRow, crimeDataUniqueCounted[key] , 't-body-occurence');
    }
}

ResultViewTable.prototype.constructUniqueDataCounted = function (crimeData) {
    let uniqueDataWithCounters = {}
    crimeData.forEach(crime => {
        let category = crime.category;
        uniqueDataWithCounters[category] = (uniqueDataWithCounters[category] || 0 ) +1;
    });
    return uniqueDataWithCounters;
}



module.exports = ResultViewTable;