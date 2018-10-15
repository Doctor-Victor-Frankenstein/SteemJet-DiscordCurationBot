const fs = require("fs")
const mongo = require('mongodb').MongoClient;


const url = process.env.MONGO_URI || "mongodb://admin:hlddka7e7bVwfvZ@ds251902.mlab.com:51902/steemjet"

mongo.connect(url, function(err, db){
	if(err){
		console.log(err);
	}
	else {
		console.log('MongoDB connected...');
	}

	var leakedKeys = db.collection('blacklist');

	console.log("Reading the file...");

	fs.readFile('./blacklist', 'utf8', function (error,data) {
		if (error) {
			return console.log(error);
		}
		var keysList = data.split('\n');

		for(var x = 0;x < keysList.length;x++){
			console.log("Saving key n° " + x + " to blacklist collection");
			var line = keysList[x];
			leakedKeys.insert({"user": line});
		}

		console.log("Done!")
	});
});
