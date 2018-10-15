const mongo = require('mongodb').MongoClient;
const config = require('./../config.json');
const fs = require('fs');

const url = process.env.MONGO_URI || config.db;


mongo.connect(url, function(err, db){
    if(err){
        console.log(err);
    }
    else {
        console.log('MongoDB connected...');
    }

    var subscriptions = db.collection('subscriptions');
    var blacklist     = db.collection('blacklist');
    var votes         = db.collection('votes');

    exports.setSubscription = function(data){
        subscriptions.insert({"user": data.user});    
    }

    exports.checkSubscription = function(data, out){
        var query = subscriptions.find({user: data});
        query.limit(1).sort({timestamp:1}).toArray(function(err,res){
            out(res);
        });
    }

    exports.addToBlacklist = function(data){
        blacklist.insert({"user": data.user});    
    }

    exports.removeFromBlacklist = function(data){
        blacklist.remove({"user": data.user});    
    }

    exports.checkIfBlacklisted = function(author, out){
        var query = blacklist.find({user: author});
        query.toArray(function(error, res){
            if(res.length){
                if(res[0].user == author){
                    return out(true)
                }
                else{
                    return out(false)
                }
            }
            else{
                out(false)
            }
        })
    }

    exports.addVote = function(author){
        votes.insert({
                                "user": author, 
                                "timestamp": Date.now()
                            });  
    }

    exports.checkIfAlreadyReceivedDailyUpvote = function(author, out){
        var query = votes.find({user: author});
        query.limit(1).sort({timestamp:-1}).toArray(function(err,res){
            console.log(res)
            if(res.length){
                if(res[0].timestamp != undefined){
                    var operation = Date.now() - res[0].timestamp;
                    console.log("time since last upvote : " + operation)
                    if(operation >= 86400000){ 
                        out(false);
                    }
                    else{
                        out(true);
                    } 
                }
            }
            
            else{
                out(false);
            }
            
        });
    }






    
});
