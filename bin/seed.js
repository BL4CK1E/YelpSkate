const fake      =   require('faker');
const db        =   require('../mongoose');
const models    =   require('../models/index');
const seed      =   module.exports = {};

let eventData = [];

for (let i = 0; i < 300; i++) {
    let obj = {
        name: fake.random.word() + " " + fake.random.word(),
        city: fake.address.city(),
        state: fake.address.stateAbbr(),
        streetNumber: fake.address.streetAddress(),
        eventDate: "6th MAY 2018",
        shortOverview: fake.lorem.paragraph(),
        picture: "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1467521552000/photosp/4258b647-2b37-4d29-9951-3f35f0025e71/stock-photo-seaside-philippines-wheels-amusementpark-nikond90-manila-pixlr-moa-mallofasia-4258b647-2b37-4d29-9951-3f35f0025e71.jpg",
        comments: [],
        author: fake.name.findName()
    };
    eventData.push(obj);
};



let commentData = {
    author: fake.name.findName(),
    comment: fake.lorem.paragraph()
};


seed.seed = function seed() {

    // Purge Database
    models.eventModel.remove({}, function(err) { 
        console.log('---> Event Collection Emptied') 
    });    
    
    models.commentModel.remove({}, function(err) { 
        console.log('---> Comment Collection Emptied') 
    });

    // Create Events, Add Comments and Save Events
    eventData.forEach( function(eventData){

        models.eventModel.create(eventData)
        .then(function(data){
            event = data;
            console.log("---> Saved Event: "  + event.name);
            return event;
        })
        .then(async function(event){
            await models.commentModel.create(commentData, function(err, comment) {
                event.comments.push(comment);
                console.log("---> Created Comment & added this to Event: " + event.name);
                event.save();
            })      
        })
        .catch(function(err){
            console.log(err);
        })

    });

}