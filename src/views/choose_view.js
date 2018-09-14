const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');

const ChooseView = function(container){
    this.container = container;
};


ChooseView.prototype.bindEvents = function(){
    PubSub.subscribe('Engine:array-of-neighbourhoods', (event)=>{
        console.log(event.detail); // expandendable
        const force = event.detail.force;
        event.detail.data.forEach(element => {
            const createHtmlElem = new CreateHtmlElem();
            const idAndForce = `${force}_${element.id}`
            createHtmlElem.createOption(this.container, element.name, idAndForce);
        });   
        this.container.addEventListener('change', (event)=>{
        })
    })




}


module.exports = ChooseView;