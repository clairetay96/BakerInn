const mongo = require('mongodb')
const uri = "mongodb://localhost:27017"


const myClient = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

//dummy listing data
let dummyListings = [{name: "ice cream machine", description: "Hardly used", location: "West", category: "equipment", state: "available"},{name: "dutch oven", description: "Great for sourdough", location: "East", category: "equipment", state: "available"},{name: "Flour 900g", description: "Self raising", location: "East", category: "ingredients", state: "available"}]

//dummy user data
let dummyUsers = [{username: "seinfeld", password: "123456", email: "223@456.com"}, {username: "mulaney", password: "123456", email: "123@456.com"}]

//connect to mongo client to perform operations
myClient.connect((err,db)=>{
    if(err){
        throw err
    }
    //refer to bakerInn db
    const bakerInnDB = db.db("bakerInn_db")

    let seedingPromises = []

    //fill users with dummy data
    seedingPromises.push(
        bakerInnDB.collection("users").insertMany(dummyUsers)
            .then(res => res)
            .catch(err => {throw err})
        )


    //fill listings with dummy data
    seedingPromises.push(
        bakerInnDB.collection("listings").insertMany(dummyListings)
            .then(res => res)
            .catch(err => {throw err})
        )

    //when both users and listings seeded, return message.
    Promise.all(seedingPromises)
        .then(res => {
            db.close()
            console.log("Tables successfully seeded.")})
        .catch(err => {console.log(err)})
})