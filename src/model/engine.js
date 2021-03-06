const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');

const Engine = function () { };

Engine.prototype.bindEvents = function () {
    PubSub.subscribe('ChooseView:Force-choosen', (event)=>{
        this.getAndPublishNeighbourhoods(event.detail);
    })
};

Engine.prototype.getAndPublishNeighbourhoods = function (forceId) {
    const requestForAllNeighb = new RequestHelper(`https://data.police.uk/api/${forceId}/neighbourhoods`);
    requestForAllNeighb.get()
        .then((data) => {
            const dataincludingForceId = {
                "forceId": forceId,
                "data": data
            }
            PubSub.publish('Engine:array-of-neighbourhoods', dataincludingForceId);
        })

        //TODO: refactor so this method is in bindEvents
    PubSub.subscribe('ChooseView:chosen-id-and-force', (event) => {
        const requestForNeighPoly = new RequestHelper(`https://data.police.uk/api/${event.detail.forceId}/${event.detail.id}/boundary`);
        requestForNeighPoly.get()
            .then((data) => {
                const reducePolygonData = this.reducePolygonNumber(100,data);
                PubSub.publish('Engine:reducedPolyData', reducePolygonData);      
                const includePolygonsInrequest = this.includePolygonsInrequest(reducePolygonData);
                const requestOfCrimesBasedOnPoly = new RequestHelper(`https://data.police.uk/api/crimes-street/all-crime?poly=${includePolygonsInrequest}`);
                requestOfCrimesBasedOnPoly.get()
                .then((data)=>{
                    PubSub.publish('Engine:crimes-in-the-area', data);
                    const crimeDataUniqueCounted = this.constructUniqueDataCounted(data);
                    PubSub.publish('Engine:crimes-in-the-area-unique', crimeDataUniqueCounted);
                })
                .then((forceId) =>{
                    const requestForForceDescription = new RequestHelper(`https://data.police.uk/api/${event.detail.forceId}/${event.detail.id}`);
                    requestForForceDescription.get()
                    .then((data)=>{
                        PubSub.publish('Engine:neigbourhood-data', data);
                    })
                })
            })
    })
};


Engine.prototype.getForcesListIds = function(){
    const forcesList = new ForcesList();
    return forcesList.getForcesIds();
}

Engine.prototype.constructUniqueDataCounted = function (crimeData) {
    let uniqueDataWithCounters = {}
    crimeData.forEach(crime => {
        let category = crime.category;
        uniqueDataWithCounters[category] = (uniqueDataWithCounters[category] || 0) + 1;
    });
    return uniqueDataWithCounters;
}

Engine.prototype.reducePolygonNumber = function(number, polygonData){
    if (polygonData.length > number){
        polygonData.forEach((polygon, counter) => {
            if (counter %2 ===0){
                polygonData.splice(counter,1);
            }  
        });
        this.reducePolygonNumber(number, polygonData);
    }
    return polygonData;
}

Engine.prototype.includePolygonsInrequest = function (polygonData) {
    let polyParamString = "";
    polygonData.forEach(object => {
        polyParamString += object.latitude + ',' + object.longitude + ':';
    });
    const newLengthInNeed = polyParamString.slice(0, -1)
    return newLengthInNeed;
}

module.exports = Engine;