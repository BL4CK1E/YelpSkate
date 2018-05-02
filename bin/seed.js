const fake      =   require('faker');
const db        =   require('../mongoose');
const models    =   require('../models/index');
const seed      =   module.exports = {};

let eventData = [
    {
        name: fake.random.word() + " " + fake.random.word(),
        city: fake.address.city(),
        state: fake.address.stateAbbr(),
        streetNumber: fake.address.streetAddress(),
        eventDate: "6th MAY 2018",
        shortOverview: fake.lorem.paragraph(),
        picture: "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1467521552000/photosp/4258b647-2b37-4d29-9951-3f35f0025e71/stock-photo-seaside-philippines-wheels-amusementpark-nikond90-manila-pixlr-moa-mallofasia-4258b647-2b37-4d29-9951-3f35f0025e71.jpg",
        comments: [] 
    },{
        name: fake.random.word() + " " + fake.random.word(),
        city: fake.address.city(),
        state: fake.address.stateAbbr(),
        streetNumber: fake.address.streetAddress(),
        eventDate: "26th AUG 2018",
        shortOverview: fake.lorem.paragraph(),
        picture: "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1467521951000/photosp/f07362f3-bb4b-4cb4-b97d-f5e27ce9c658/stock-photo-seaside-philippines-amusementpark-nikond90-manila-pixlr-moa-mallofasia-manilaphilippines-f07362f3-bb4b-4cb4-b97d-f5e27ce9c658.jpg",
        comments: [] 
    },{
        name: fake.random.word() + " " + fake.random.word(),
        city: fake.address.city(),
        state: fake.address.stateAbbr(),
        streetNumber: fake.address.streetAddress(),
        eventDate: "16th DEC 2018",
        shortOverview: fake.lorem.paragraph(),
        picture: "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1467519722000/photosp/0d0875c1-f9d1-40fb-9e9f-16aee51a6dc1/stock-photo-philippines-nikon-nikond90-hardwork-manila-pixlr-moa-mallofasia-everydayphillippines-0d0875c1-f9d1-40fb-9e9f-16aee51a6dc1.jpg",
        comments: [] 
    }
];

let commentData = {
    author: fake.name.findName(),
    comment: fake.lorem.paragraph()
};


seed.seed = function seed() {

    // Purge Database
    models.eventModel.remove({}, function(err) { 
        console.log('---> Collection Emptied') 
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