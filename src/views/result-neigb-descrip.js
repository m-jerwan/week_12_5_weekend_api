const PubSub = require('../helpers/pub_sub');
const CreateHtmlElem = require('../helpers/createHtmlElem');

const ResultNeigbourghoodDescription = function (htmlElement) {
    this.htmlElement = htmlElement;
}


ResultNeigbourghoodDescription .prototype.bindEvents = function () {
    PubSub.subscribe('Engine:neigbourhood-data', (event) => {
        this.render(event.detail);
    })
}

ResultNeigbourghoodDescription.prototype.render= function (neighbourhoodData) {
    this.htmlElement.textContent = '';
    const descriptionWithTags = neighbourhoodData.description;
    descriptionWithNoTags = '';
    if (descriptionWithTags ==  null){
        descriptionWithNoTags = 'No description available';
    }else{
        descriptionWithNoTags = descriptionWithTags.replace(/<[^>]*>/g, '');
    }
    const descriptionHtml = new CreateHtmlElem();
    descriptionHtml.createGenericElem('p', this.htmlElement, descriptionWithNoTags, 'neighb-description');
}
module.exports = ResultNeigbourghoodDescription ;