const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');

const Engine = function(){};

Engine.bindEvents = function(){
    this.getAndPublishNeighbourhoods();

};


Engine.prototype.getAndPublishNeighbourhoods = function(){
    // https://data.police.uk/api/forces    //to get all forces
    const force = 'leicestershire';
    const url = `https://data.police.uk/api/${force}/neighbourhoods`;
    const request = new RequestHelper(url);
    request.get()
        .then((data)=>{
            const dataincludingForce = {
                "force": force,
                "data": data
            }
            PubSub.publish('Engine:array-of-neighbourhoods', dataincludingForce);
        })



};





module.exports = Engine;