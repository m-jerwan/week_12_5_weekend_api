const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');



const ResultView = function (htmlElement) {
    this.htmlElement = htmlElement;
};

ResultView.prototype.bindEvents = function(){
    PubSub.subscribe('Engine:crimes-in-the-area', (event)=>{
        this.renderCrimes(event.detail);
    })
}

ResultView.prototype.renderCrimes = function (crimeData) {
    this.htmlElement.textContent = '';
    const crimeDataUniqueCounted = this.constructUniqueDataCounted(crimeData);
    
    for (key in crimeDataUniqueCounted){
        const createHtmlElem = new CreateHtmlElem();
        createHtmlElem.createGenericElem('h2', this.htmlElement, `${key}:${crimeDataUniqueCounted[key]}`, 'crime-container')
    }
}

ResultView.prototype.constructUniqueDataCounted = function (crimeData) {
    let uniqueDataWithCounters = {}
    crimeData.forEach(crime => {
        let category = crime.category;
        uniqueDataWithCounters[category] = (uniqueDataWithCounters[category] || 0 ) +1;
    });
    return uniqueDataWithCounters;
}



module.exports = ResultView;