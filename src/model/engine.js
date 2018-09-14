const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');

const Engine = function () { };

Engine.bindEvents = function () {
    this.getAndPublishNeighbourhoods();

};


Engine.prototype.getAndPublishNeighbourhoods = function () {
    // https://data.police.uk/api/forces    //to get all forces
    const forceId = 'leicestershire';                   //GET AN DROPDOWN for this
    const requestForAllNeighb = new RequestHelper(`https://data.police.uk/api/${forceId}/neighbourhoods`);
    requestForAllNeighb.get()
        .then((data) => {
            const dataincludingForceId = {
                "forceId": forceId,
                "data": data
            }
            PubSub.publish('Engine:array-of-neighbourhoods', dataincludingForceId);
        })


    PubSub.subscribe('ChooseView:chosen-id-and-force', (event) => {
        const requestForNeighPoly = new RequestHelper(`https://data.police.uk/api/${event.detail.forceId}/${event.detail.id}/boundary`);
        requestForNeighPoly.get()
            .then((data) => {
                let polyParamString = "";
                data.forEach(object => {
                    polyParamString += object.latitude + ',' + object.longitude + ':';
                });
                const newLengthInNeed = polyParamString.slice(0, -1)
                const requestForCrimesOfAreaOfPoly = new RequestHelper(`https://data.police.uk/api/crimes-street/all-crime?poly=${newLengthInNeed}`);
                console.log(newLengthInNeed.length);
                requestForCrimesOfAreaOfPoly.get()
                .then((data)=>{
                    console.log(data)
                    PubSub.publish('Engine:crimes-in-the-area', data);
                })

            })


    })


};





module.exports = Engine;