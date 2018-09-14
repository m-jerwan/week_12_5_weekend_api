const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');

const ChooseView = function(container){
    this.container = container;
};


ChooseView.prototype.bindEvents = function(){
    PubSub.subscribe('Engine:array-of-neighbourhoods', (event)=>{
        console.log(event.detail); // expandendable
        const forceId = event.detail.forceId;
        event.detail.data.forEach(element => {
            const createHtmlElem = new CreateHtmlElem();
            const idAndForceId = `${forceId}_${element.id}`
            createHtmlElem.createOption(this.container, element.name, idAndForceId);
        });   
        this.container.addEventListener('change', (event)=>{

        })
    })




}


module.exports = ChooseView;