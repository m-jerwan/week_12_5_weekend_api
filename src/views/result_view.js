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
    crimeData.forEach(crime => {
        const tempHtmlElement  = new CreateHtmlElem();
        let crimeStatus = '';
        if (crime.outcome_status){
             crimeStatus = crime.outcome_status.category;
        }else{
            crimeStatus = 'unknown';
        }
        tempHtmlElement.createGenericElem('p', this.htmlElement, `${crime.category}: ${crimeStatus}`, 'crime-category');
    });
}



module.exports = ResultView;