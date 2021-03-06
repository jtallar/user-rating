const { MongoClient } = require("mongodb");
const objectFunctions = require('../utils/objects');
const mongoFun = require('../utils/mongoQueries');
const mongoAnalFun = require('../utils/mongoAnalyticsQueries');

const uri = "mongodb://localhost:27017";

const mClient = new MongoClient(uri, { useUnifiedTopology: true });


async function runMongo(queryFunction, ...params) {
    try {
        await mClient.connect();
        const database = mClient.db('nosedive');
        const collection = database.collection('users');

        // Call query function with params
        await queryFunction(collection, ...params);
    } finally {
        // Ensures that the client will close when you finish/error
        await mClient.close();
    }
}

// runMongo(mongoFun.findOneUser).catch(console.dir);
// runMongo(mongoFun.countAll).catch(console.dir);
var user1 = objectFunctions.newUserJson("person-id-14", "Jota Te", 
"Calle Falsa 123", Date.UTC(1998, 1, 15), "Delfin", "url");
var user2 = objectFunctions.newUserJson("person-id-15", "Jota Te", 
"Calle Falsa 123", Date.UTC(1998, 1, 15), "Delfin", "url");
var user3 = objectFunctions.newUserJson("person-id-16", "Jota Te", 
"Calle Falsa 123", Date.UTC(1998, 1, 15), "Delfin", "url");
// runMongo(mongoFun.insertOneUser, user1).catch(console.dir);
// runMongo(mongoFun.findUserById, "person-id-3").catch(console.dir);

// runMongo(mongoFun.testParams, "person-id-3", {_id: 1}).catch(console.dir);
// runMongo(mongoFun.rateUser, objectFunctions.newRatingJson(4, "person-id-4", "person-id-3", -73, 40)).catch(console.dir);

// runMongo(mongoFun.insertManyUsers, [user1, user2, user3]).catch(console.dir);

// runMongo(mongoFun.findManyUsersById, ["person-id-31", "person-id-1"]).catch(console.dir);

var rating1 = objectFunctions.newRatingJson(4, "person-id-4", "person-id-5", -73, 40);
var rating2 = objectFunctions.newRatingJson(4, "person-id-4", "person-id-6", -73, 40);
var rating3 = objectFunctions.newRatingJson(4, "person-id-4", "person-id-7", -73, 40);

// runMongo(mongoFun.rateManyUsers, [rating1, rating2, rating3]).catch(console.dir);
// runMongo(mongoFun.dropAll).catch(console.dir);
runMongo(mongoAnalFun.bestUsers, 5)