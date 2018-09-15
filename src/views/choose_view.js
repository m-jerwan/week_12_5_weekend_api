const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');

const ChooseView = function(htmlElement){
    this.htmlElement = htmlElement;
};


ChooseView.prototype.bindEvents = function(){
    const allGridLands = document.querySelectorAll('.land');
    this.addEventLisenerToAll(allGridLands);

    PubSub.subscribe('Engine:array-of-neighbourhoods', (event)=>{
        const forceId = event.detail.forceId;
        this.htmlElement.className = ('vissible');
        console.log(this.htmlElement)
        this.resetOptions()
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

ChooseView.prototype.resetOptions = function () {
    this.htmlElement.textContent = '';
    const emptyOption = document.createElement('option');
    emptyOption.textContent = 'Please choose...';
    this.htmlElement.appendChild(emptyOption);
}



ChooseView.prototype.addEventLisenerToAll = function(allGrids){
    allGrids.forEach(grid => {
        grid.addEventListener('click', (event)=>{
            PubSub.publish('ChooseView:Force-choosen', event.target.id)
        })
    });
}


module.exports = ChooseView;