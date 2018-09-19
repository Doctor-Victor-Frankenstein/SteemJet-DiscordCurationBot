const mongo = require('mongodb').MongoClient;
const config = require('./../config.json');

const url = process.env.MONGO_URI || config.db;


mongo.connect(url, function(err, db){
    if(err){
        console.log(err);
    }
    else {
        console.log('MongoDB connected...');
    }


    var subscriptions = db.collection('subscriptions');

    exports.setSubscription = function(data){
        subscriptions.insert({"user": data.user});    
    }

    exports.checkSubscription = function(data, out){
        var query = subscriptions.find({user: data});
        query.limit(1).sort({timestamp:1}).toArray(function(err,res){
            out(res);
        });
    }

    
});
