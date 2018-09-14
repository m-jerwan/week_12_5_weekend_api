const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');


const ResultView = function (htmlElement) {
    this.htmlElement = htmlElement;
};

ResultView.prototype.bindEvents = function(){
    PubSub.subscribe('Engine:crimes-in-the-area', (event)=>{
        console.log(event.detail)
    })
}





module.exports = ResultView;