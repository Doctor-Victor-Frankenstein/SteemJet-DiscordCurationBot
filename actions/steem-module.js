const Discord = require("discord.js");
const steem = require("steem");
const db = require('./db.js');
const config = require("./../config.json");
const bot = new Discord.Client();


bot.login(config.token);

module.exports = {

  upvoteWithAllAccounts: function(message, weight){
    if(weight == undefined){
      return message.channel.send("The vote weight has not been defined by the admins. Please contact them in order to solve this issue.");
    }
    else{
      let element = message.content.split(" ");     
      var link = element[1];
      var ope = link.split("/");
      if (ope.length == 6){ //If Steemit Link
        permLink = ope[5];
        ope1 = link.split("@");         
        useless2 = ope1.shift();         
        ope2 = ope1.shift();  
        ope3 = ope2.split("/");
        author = ope3.shift();
        voteWithAllAccounts(message, weight, permLink, author);
      }
      if (ope.length == 5){ //If Busy Link
        permLink = ope[4];
        ope1 = link.split("@");         
        useless2 = ope1.shift();         
        ope2 = ope1.shift();  
        ope3 = ope2.split("/");
        author = ope3.shift();
        voteWithAllAccounts(message, weight, permLink, author);
      }
    }   
  } 
}

function voteWithAllAccounts(message, weight, permLink, author){
  var osef;
  db.checkSubscription(author, function(out){
    if(out.length > 0){
      if(weight == 0 || weight > 10000 || weight == null || permLink == null || author == null) {
        message.channel.send("Error : Bad request");
      }
      else{
        db.checkIfBlacklisted(author, function(output){
          console.log("is blacklisted : " + output)
          if(output == false){
            steem.api.getContent(author, permLink, function(err1, result1) {
              var timestamp       = Date.parse(result1.created);
              var relativeTime    = Date.now() - timestamp;
              console.log("relative time : " + relativeTime);
              if(relativeTime >= 17400000){
                db.checkIfAlreadyReceivedDailyUpvote(author, function(o){
                  console.log("already upvoted today : " + o);
                  if(o == false){
                    steem.api.getAccounts([config.owner], function(error, res){
                      osef = res[0].voting_power;
                        if(osef > config.minimumVotingPower){
                          console.log(res[0].voting_power)
                          for(var x = 0;x < config.accounts.length;x++){
                            var testing = config.accounts[x];                
                            steem.broadcast.vote(testing.key, testing.name, author, permLink, weight, function(err, result) {
                              console.log(err, result);
                              db.addVote(author);
                              return message.channel.send("The post was successfully upvoted !");                  
                            });
                          }
                        }
                        else{
                          console.log("error")
                          return message.channel.send("Voting Power too low ("+osef+"%)");
                        }
                    });
                  }
                  else{
                    return message.channel.send("You already claimed your free upvote for today. Please come back tomorrow!");
                  }
                })
              }
              else{
                return message.channel.send("You must wait 30 minutes before we can upvote your post !");
              }
              
            })
          }
          else{
            return message.channel.send("The user @"+author+" is blacklisted, therefore no upvote for this user.");
          }
        });
        
          
      }
    }       
    else{
      return message.channel.send("Your account hasn't been validated. Please send 0.002 STEEM/SBD to @"+config.owner+" account, or use this link : https://steemconnect.com/sign/transfer?from="+author+"&to="+config.owner+"&amount=0.002%20STEEM");
    }
  });
  
}
