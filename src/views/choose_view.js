const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');

const ChooseView = function(container){
    this.container = container;
};


ChooseView.prototype.bindEvents = function(){
    PubSub.subscribe('Engine:array-of-neighbourhoods', (event)=>{
        const forceId = event.detail.forceId;
        event.detail.data.forEach(element => {
            const createHtmlElem = new CreateHtmlElem();
            const id = `${element.id}`
            createHtmlElem.createOption(this.container, element.name, id);
        });   
        this.container.addEventListener('change', (event)=>{
            const chosenIdAndForce = {
                "id":event.target.value,
                "forceId": forceId
            }
            PubSub.publish('ChooseView:chosen-id-and-force', chosenIdAndForce)
        })
    })




}


module.exports = ChooseView;