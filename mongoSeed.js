const mongo = require('mongodb')
const ObjectId = mongo.ObjectId
const uri = "mongodb://localhost:27017"


const myClient = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

//dummy listing data
let dummyListings = [{ "_id" : ObjectId("5f658546a4be83df4ea3f41d"), "item" : "cake tin", "description" : "6 inch diameter", "price" : "5.00", "category" : "equipment", "location" : "west", "owner_id" : "5f6579eb326e83dde969ebd9" }, { "_id" : ObjectId("5f65855ea4be83df4ea3f41e"), "item" : "nutmeg", "description" : "5g", "price" : "free", "category" : "ingredient", "location" : "south", "owner_id" : "5f6579eb326e83dde969ebd9", "interested" : [ "5f657ecba4be83df4ea3f41b", "5f657a32326e83dde969ebdb" ] }]

//dummy user data
let dummyUsers = [{ "_id" : ObjectId("5f6579eb326e83dde969ebd9"), "email" : "seinfeld@hello", "username" : "seinfeld", "password" : "$2b$10$zTGrRNCWvYmzKj6hPX/9deLAGFtVdkNz1IoRclH5QAHw6.KzN6ubK", "listings" : [ ObjectId("5f657a03326e83dde969ebda"), ObjectId("5f658546a4be83df4ea3f41d"), ObjectId("5f65855ea4be83df4ea3f41e") ], "chats" : [ ObjectId("5f657cce17ee27df12b5c01b"), ObjectId("5f657ed8a4be83df4ea3f41c"), ObjectId("5f6585b01d3053e0d534b852"), ObjectId("5f65871cd1d90ee137152e9b"), ObjectId("5f6587f68690f4e15a2e540c") ] }, { "_id" : ObjectId("5f657a32326e83dde969ebdb"), "email" : "mulaney@goodbye", "username" : "mulaney", "password" : "$2b$10$hFN/4rh01rpF.tkTJj59/ujIEhi3RC.XtN6K6tYcE5pKlYTPcsePe", "chats" : [ ObjectId("5f657cce17ee27df12b5c01b"), ObjectId("5f65871cd1d90ee137152e9b"), ObjectId("5f6587f68690f4e15a2e540c") ] }, { "_id" : ObjectId("5f657ecba4be83df4ea3f41b"), "email" : "ali@wong", "username" : "aliwong", "password" : "$2b$10$FyRrwqESCkPiM98ehN99JuSxbKwQnAv5sDSL9ToUcBz.hoNTFpOQS", "chats" : [ ObjectId("5f657ed8a4be83df4ea3f41c"), ObjectId("5f6585b01d3053e0d534b852") ] }]

let dummyChats = [{ "_id" : ObjectId("5f657cce17ee27df12b5c01b"), "listing_id" : "5f657a03326e83dde969ebda", "owner_id" : "5f6579eb326e83dde969ebd9", "buyer_id" : "5f657a32326e83dde969ebdb" }, { "_id" : ObjectId("5f657ed8a4be83df4ea3f41c"), "listing_id" : "5f657a03326e83dde969ebda", "owner_id" : "5f6579eb326e83dde969ebd9", "buyer_id" : "5f657ecba4be83df4ea3f41b" }, { "_id" : ObjectId("5f6585b01d3053e0d534b852"), "listing_id" : "5f65855ea4be83df4ea3f41e", "owner_id" : "5f6579eb326e83dde969ebd9", "buyer_id" : "5f657ecba4be83df4ea3f41b" }, { "_id" : ObjectId("5f65871cd1d90ee137152e9b"), "listing_id" : "5f65855ea4be83df4ea3f41e", "owner_id" : "5f6579eb326e83dde969ebd9", "buyer_id" : "5f657a32326e83dde969ebdb" }, { "_id" : ObjectId("5f6587f68690f4e15a2e540c"), "listing_id" : "5f658546a4be83df4ea3f41d", "owner_id" : "5f6579eb326e83dde969ebd9", "buyer_id" : "5f657a32326e83dde969ebdb" }]

let dummyMessages = [ { "_id" : ObjectId("5f657e05a4be83df4ea3f418"), "message" : "hello", "user_id" : "5f6579eb326e83dde969ebd9", "chat_id" : "5f657cce17ee27df12b5c01b" }, { "_id" : ObjectId("5f657e11a4be83df4ea3f419"), "message" : "I'm interested in buying this", "user_id" : "5f657a32326e83dde969ebdb", "chat_id" : "5f657cce17ee27df12b5c01b" }, { "_id" : ObjectId("5f657e2fa4be83df4ea3f41a"), "message" : "hello", "user_id" : "5f6579eb326e83dde969ebd9", "chat_id" : "5f657cce17ee27df12b5c01b" }, { "_id" : ObjectId("5f6585e9d310c7e0e5b554f3"), "message" : "it's me", "user_id" : "5f657ecba4be83df4ea3f41b", "chat_id" : "5f6585b01d3053e0d534b852" } ]

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

    //fill listings with dummy data
    seedingPromises.push(
        bakerInnDB.collection("chats").insertMany(dummyChats)
            .then(res => res)
            .catch(err => {throw err})
        )

    //fill listings with dummy data
    seedingPromises.push(
        bakerInnDB.collection("messages").insertMany(dummyMessages)
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