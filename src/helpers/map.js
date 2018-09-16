const PubSub = require('../helpers/pub_sub');

const Map = function(){
}

Map.prototype.bindEvents = function(){
    PubSub.subscribe('Engine:reducedPolyData', (event)=>{
        const deconstructedPolyArray = this.constructPolyArray(event.detail);
        this.showMap(deconstructedPolyArray);
    })
}





Map.prototype.showMap = function (deconstructedPolyArray){

    var mymap = L.map('mapid').setView(deconstructedPolyArray[0], 10);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    var polygon = L.polygon(deconstructedPolyArray
    ).addTo(mymap);
}

Map.prototype.constructPolyArray = function(rawPolyData){
    const rawPolyArray = [];
    rawPolyData.forEach(point => {
        const tempArray = []
        tempArray.push(point.latitude);
        tempArray.push(point.longitude);
        rawPolyArray.push(tempArray);
    });
    return rawPolyArray;
}


module.exports = Map;