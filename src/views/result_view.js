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
        console.log(crime.category);
    });
}



module.exports = ResultView;