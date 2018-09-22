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
    var votes         = db.collection('votes')

    exports.setSubscription = function(data){
        subscriptions.insert({"user": data.user});    
    }

    exports.checkSubscription = function(data, out){
        var query = subscriptions.find({user: data});
        query.limit(1).sort({timestamp:1}).toArray(function(err,res){
            out(res);
        });
    }

    exports.checkIfBlacklisted = function(author, out){
        fs.readFile('./blacklist', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            else{
                var testing = data.indexOf(author);

                if(testing != -1){
                    return out(true);
                }
                else{
                    return out(false);
                }
                
            }
        });
    }

    exports.addVote = function(author){
        votes.insert({
                                "user": author, 
                                "timestamp": Date.now()
                            });  
    }

    exports.checkIfAlreadyReceivedDailyUpvote = function(author, out){
        var query = votes.find({user: author});
        query.limit(1).sort({timestamp:1}).toArray(function(err,res){
            if(res.timestamp != undefined){
                var operation = Date.now() - res.timestamp;
                if(operation >= 86400000){
                    out(false);
                }
                else{
                    out(true);
                } 
            }
            else{
                out(false);
            }
            
        });
    }






    
});
