const CreateHtmlElem = function (){}

CreateHtmlElem.prototype.createOption = function(container, content, index){
    const tempElement = document.createElement('option');
    tempElement.textContent = content;
    // tempElement.classList.add(typeClass);
    // tempElement.id= (id);
    tempElement.value = index;
    container.appendChild(tempElement);
}

module.exports = CreateHtmlElem;