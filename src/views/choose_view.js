const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');

const ChooseView = function(htmlElement){
    this.htmlElement = htmlElement;
};


ChooseView.prototype.bindEvents = function(){
    const allGridLands = document.querySelectorAll('.land');
    this.addEventLisenerToAll(allGridLands);

    PubSub.subscribe('Engine:array-of-neighbourhoods', (event)=>{
        this.htmlElement.textContent = '';
        const forceId = event.detail.forceId;
        event.detail.data.forEach(element => {
            const createHtmlElem = new CreateHtmlElem();
            const id = `${element.id}`
            createHtmlElem.createOption(this.htmlElement, element.name, id);
        });   
        this.htmlElement.addEventListener('change', (event)=>{
            const chosenIdAndForce = {
                "id":event.target.value,
                "forceId": forceId
            }
            PubSub.publish('ChooseView:chosen-id-and-force', chosenIdAndForce)
        })
    })
}

ChooseView.prototype.addEventLisenerToAll = function(allGrids){
    allGrids.forEach(grid => {
        grid.addEventListener('click', (event)=>{
            PubSub.publish('ChooseView:Force-choosen', event.target.id)
        })
    });
}


module.exports = ChooseView;