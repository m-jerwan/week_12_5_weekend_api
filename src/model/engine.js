const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');

const Engine = function () { };

Engine.bindEvents = function () {
    this.getAndPublishNeighbourhoods();

};


Engine.prototype.getAndPublishNeighbourhoods = function () {
    // https://data.police.uk/api/forces    //to get all forces
    const forceId = 'merseyside';                   //GET AN DROPDOWN for this
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
                const includePolygonsInrequest = this.includePolygonsInrequest(reducePolygonData);
                const requestOfCrimesBasedOnPoly = new RequestHelper(`https://data.police.uk/api/crimes-street/all-crime?poly=${includePolygonsInrequest}`);
                requestOfCrimesBasedOnPoly.get()
                .then((data)=>{
                    PubSub.publish('Engine:crimes-in-the-area', data);
                })
            })
    })
};


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