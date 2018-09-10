const db = require('./db.js');
const steem = require("steem");
const config = require("./../config.json")

exports.start = function(){
	streamBlockchain();
}

function streamBlockchain(){
	steem.api.streamOperations("head", function(err, result) {
		try {
			if(result){
		        if (result[0] == 'transfer') {
		            var memoContent = result[1].memo;
					var sender = result[1].from;
					var account = result[1].to;
					var amount = result[1].amount;
					if (account == config.owner){
						if (amount == config.fee.SBD || amount == config.fee.STEEM){
							db.setSubscription({user: sender});
						}
					}
		        }
	    	}
	    }    
	    catch(err) {
	    	console.log(err);
	    }
	});	
};
