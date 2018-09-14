const CreateHtmlElem = function (){}

CreateHtmlElem.prototype.createOption = function(container, content, value){
    const tempElement = document.createElement('option');
    tempElement.textContent = content;
    tempElement.value = value;
    container.appendChild(tempElement);
}

CreateHtmlElem.prototype.createGenericElem = function (tag, container, content, classType, id) {
    const tempElement = document.createElement(tag);
    tempElement.textContent = content;
    if (classType) { tempElement.classList.add(classType);};
    if (id) { tempElement.id = (id);}
    container.appendChild(tempElement);
}




module.exports = CreateHtmlElem;